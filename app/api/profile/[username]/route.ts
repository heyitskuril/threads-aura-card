import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { v2 as cloudinary } from 'cloudinary';
import {
  METRICS_CATALOG,
  TITLES_CATALOG,
  BADGES_CATALOG,
  INSIGHTS_CATALOG,
} from '@/app/data/catalog';
import { AuraTier } from '@/app/types';
import type { AuraCardData, AuraMetric, AuraTitle, AuraBadge, ProfileData } from '@/app/types';

const USERNAME_RE = /^[a-zA-Z0-9._]+$/;

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

function getRedis(): Redis | null {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;
  return new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN });
}

function isCloudinaryConfigured(): boolean {
  return !!(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
}

async function uploadToCloudinary(
  imageUrl: string,
  publicId: string,
): Promise<string | null> {
  if (!isCloudinaryConfigured()) return null;
  try {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: 'threads-aura-card/profiles',
      public_id: publicId,
      overwrite: true,
    });
    return result.secure_url;
  } catch {
    return null;
  }
}

async function downloadAndRehost(
  imageUrl: string,
  username: string,
): Promise<string | null> {
  try {
    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ThreadsAuraCard/1.0; +https://threads-aura-card.vercel.app)',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    const dataUri = `data:${contentType};base64,${base64}`;

    const cloudinaryUrl = await uploadToCloudinary(dataUri, `profile_${username}`);
    return cloudinaryUrl || dataUri;
  } catch {
    return null;
  }
}

function extractMetaTag(html: string, property: string): string | null {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractRealAvatar(html: string): string | null {
  const avatarPattern = /scontent\.cdninstagram\.com\/[^"'\s]+(?:profile|avatar|pfpic|a_a)[^"'\s]*/i;
  const match = html.match(avatarPattern);
  if (match) return match[0].replace(/&amp;/g, '&');

  const imgPattern = /"profile_pic_url"\s*:\s*"([^"]+)"/;
  const jsonMatch = html.match(imgPattern);
  if (jsonMatch) return jsonMatch[1].replace(/\\u002d/g, '-').replace(/\\\//g, '/');

  const hdProfile = /"hd_profile_pic_url_info"\s*:\s*\{[^}]*"url"\s*:\s*"([^"]+)"/;
  const hdMatch = html.match(hdProfile);
  if (hdMatch) return hdMatch[1].replace(/\\u002d/g, '-').replace(/\\\//g, '/');

  return null;
}

function extractBio(html: string): string | null {
  const bioPatterns = [
    /"biography"\s*:\s*"([^"]+)"/,
    /"bio"\s*:\s*"([^"]+)"/,
    /"description"\s*:\s*"([^"]+)"/,
    /<meta[^>]+name="description"[^>]+content="([^"]+)"/i,
    /<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i,
  ];
  for (const pattern of bioPatterns) {
    const match = html.match(pattern);
    if (match) {
      const bio = match[1]
        .replace(/\\u[\dA-Fa-f]{4}/g, '')
        .replace(/\\n/g, ' ')
        .replace(/\\\//g, '/')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
      if (bio && bio.length > 5 && bio.length < 500) return bio;
    }
  }
  return null;
}

function deriveTier(metrics: { score: number }[]): string {
  const avg = metrics.reduce((s, m) => s + m.score, 0) / metrics.length;
  const highCount = metrics.filter((m) => m.score >= 78).length;

  if (highCount >= 7) {
    const r = Math.random();
    if (r < 0.02) return 'Secret';
    if (r < 0.15) return 'Mythic';
    return 'Legendary';
  }
  if (highCount >= 5) return 'Epic';
  if (highCount >= 4) return 'Rare';
  if (highCount >= 2) return 'Uncommon';
  return 'Common';
}

async function generateAuraWithGemini(
  html: string,
  username: string,
  isReroll: boolean,
): Promise<{
  metrics: { id: string; score: number }[];
  debug?: string;
} | { error: string; debug: string }> {
  if (!GEMINI_API_KEY) return { error: 'GEMINI_API_KEY not set', debug: 'env var missing' };

  const truncated = html.slice(0, 10000);

  const metricList = METRICS_CATALOG.map((m) => `${m.id}: ${m.emoji} ${m.label}`).join('\n');

    const prompt = `You are analyzing a Threads profile (@${username}). Based on the profile HTML, score this user on 10 different aura metrics from 0-100.

Available metrics:
${metricList}

${isReroll ? 'Pick DIFFERENT metrics than last time.' : ''}

Return ONLY a JSON object with exactly 10 metrics (no other text):
{"metrics":[{"id":"metric_id","score":number},{"id":"metric_id","score":number}]}

- Score each metric independently. Be critical: use 30-50 for most metrics, 55-70 for genuinely good fits, 75-90 only for exceptional fits
- Most scores should be between 30-70. Only 1-2 metrics should be above 75 if the profile is truly outstanding
- No scores above 100, no scores below 20
- Use metric IDs exactly as listed

Profile HTML:
${truncated}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        signal: AbortSignal.timeout(25000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: isReroll ? 0.9 : 0.3, maxOutputTokens: 1000 },
        }),
      },
    );

    if (!res.ok) {
      const errBody = await res.text().catch(() => '');
      return { error: `Gemini API returned ${res.status}`, debug: errBody.slice(0, 500) };
    }

    const body = await res.json();
    const text: string | undefined = body?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return { error: 'No text in Gemini response', debug: JSON.stringify(body).slice(0, 500) };
    }

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) {
      return { error: 'No JSON object in response', debug: text.slice(0, 500) };
    }

    const cleaned = text.slice(start, end + 1);

    let parsed: any;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e: any) {
      return { error: 'JSON parse failed', debug: `error: ${e.message}, text: ${cleaned.slice(0, 500)}` };
    }

    if (!parsed.metrics || !Array.isArray(parsed.metrics) || parsed.metrics.length < 4) {
      return { error: `Invalid metrics array (got ${parsed.metrics?.length || 0})`, debug: cleaned.slice(0, 500) };
    }

    return {
      metrics: parsed.metrics.slice(0, 10).map((m: any) => ({
        id: String(m.id || '').trim(),
        score: Math.max(20, Math.min(100, Math.round(Number(m.score) || 50))),
      })),
    };
  } catch (e: any) {
    return { error: `Exception: ${e.message}`, debug: e.stack?.slice(0, 500) || '' };
  }
}

async function analyzeProfile(username: string, isReroll: boolean): Promise<{
  cardData: AuraCardData | null;
  profileData: ProfileData | null;
  html: string | null;
  status: number;
  debug?: string;
}> {
  try {
    const res = await fetch(`https://www.threads.com/@${username}`, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; ThreadsAuraCard/1.0; +https://threads-aura-card.vercel.app)',
      },
    });

    if (!res.ok) {
      return { cardData: null, profileData: null, html: null, status: 404 };
    }

    const html = await res.text();

    const rawTitle = extractMetaTag(html, 'og:title');
    const ogImage = extractMetaTag(html, 'og:image');

    let avatarUrl: string | null = null;
    let displayName: string | null = null;

    if (rawTitle) {
      displayName = rawTitle
        .replace(/&amp;|&/g, '')
        .replace(/\s*\(.*?\)\s*/g, ' ')
        .replace(/\s*#\S+/g, '')
        .replace(/@\S+/g, '')
        .replace(/[•·]/g, ' ')
        .replace(/Threads.*$/gi, '')
        .replace(/Say\s+more.*$/gi, '')
        .replace(/\s+on\s+/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (!displayName || displayName.length > 50) displayName = username;
    } else {
      displayName = username;
    }

    const realAvatar = extractRealAvatar(html);
    const imageUrl = realAvatar || ogImage;

    if (imageUrl) {
      const rehosted = await downloadAndRehost(imageUrl, username);
      avatarUrl = rehosted || imageUrl;
    }

    const bio = extractBio(html);

    if (!GEMINI_API_KEY) {
      return { cardData: null, profileData: null, html: null, status: 503 };
    }

    const geminiResult = await generateAuraWithGemini(html, username, isReroll);

    if ('error' in geminiResult) {
      return { cardData: null, profileData: null, html: null, status: 502, debug: `${geminiResult.error}: ${geminiResult.debug}` };
    }

    const metrics: AuraMetric[] = geminiResult.metrics
      .map((m) => {
        const catalogItem = METRICS_CATALOG.find((c) => c.id === m.id);
        if (!catalogItem) return null;
        return {
          id: catalogItem.id,
          emoji: catalogItem.emoji,
          label: catalogItem.label,
          description: catalogItem.description,
          score: m.score,
        };
      })
      .filter((m): m is AuraMetric => m !== null)
      .sort((a, b) => b.score - a.score);

    const tierName = deriveTier(metrics);
    const tier = Object.values(AuraTier).includes(tierName as AuraTier)
      ? (tierName as AuraTier)
      : AuraTier.COMMON;

    const matchingTitles = TITLES_CATALOG.filter((t) => t.tier === tier);
    const titlePool = matchingTitles.length > 0 ? matchingTitles : TITLES_CATALOG.filter((t) => t.tier === AuraTier.COMMON);
    const title = titlePool[Math.floor(Math.random() * titlePool.length)];

    const badgesPool = [...BADGES_CATALOG];
    const selectedBadges: AuraBadge[] = [];
    const badgeCount = Math.min(4, Math.floor(Math.random() * 2) + 3);
    for (let i = 0; i < badgeCount; i++) {
      const idx = Math.floor(Math.random() * badgesPool.length);
      selectedBadges.push(badgesPool.splice(idx, 1)[0]);
    }

    const insight = INSIGHTS_CATALOG[Math.floor(Math.random() * INSIGHTS_CATALOG.length)];

    const cardData: AuraCardData = {
      username: `@${username}`,
      title,
      tier,
      metrics,
      badges: selectedBadges,
      insight,
      generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      profile: {
        displayName,
        bio,
        avatarUrl,
        source: 'ai-generated',
      },
    };

    return { cardData, profileData: cardData.profile!, html, status: 200 };
  } catch {
    return { cardData: null, profileData: null, html: null, status: 500 };
  }
}

async function getFromCache(
  redis: Redis | null,
  cacheKey: string,
): Promise<AuraCardData | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get<any>(cacheKey);
    if (!cached) return null;
    if (!cached.title || !cached.metrics || !Array.isArray(cached.metrics)) return null;
    return cached as AuraCardData;
  } catch {
    return null;
  }
}

async function setCache(
  redis: Redis | null,
  cacheKey: string,
  data: AuraCardData,
): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(cacheKey, data, { ex: 86400 });
  } catch {
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username: rawUsername } = await params;
  const username = rawUsername.trim().toLowerCase();

  if (!USERNAME_RE.test(username)) {
    return NextResponse.json(
      { error: 'Invalid username. Only letters, numbers, periods, and underscores are allowed.' },
      { status: 400 },
    );
  }

  const isReroll = request.nextUrl.searchParams.get('reroll') === '1';

  const cacheKey = `profile:${username}`;
  const redis = getRedis();

  if (!isReroll) {
    const cached = await getFromCache(redis, cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }
  }

  const { cardData, status, debug } = await analyzeProfile(username, isReroll);

  if (!cardData) {
    if (status === 404) {
      return NextResponse.json(
        { error: `We couldn't find a Threads profile for "@${username}". Double-check the username and try again.` },
        { status: 404 },
      );
    }
    if (status === 503) {
      return NextResponse.json(
        { error: 'Gemini AI is not configured. Set GEMINI_API_KEY in your environment variables to enable real aura analysis.' },
        { status: 503 },
      );
    }
    if (status === 502) {
      const isQuota = debug?.includes('429') || debug?.includes('quota') || debug?.includes('rate limit');
      const friendly = isQuota
        ? 'AI analysis is temporarily unavailable — Gemini API quota exceeded. Try again later or check your billing at https://ai.google.dev.'
        : 'AI analysis failed. Try again later.';
      return NextResponse.json(
        { error: friendly, debug },
        { status: 502 },
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong while analyzing the profile. Please try again.' },
      { status: 500 },
    );
  }

  await setCache(redis, cacheKey, cardData);
  return NextResponse.json(cardData);
}
