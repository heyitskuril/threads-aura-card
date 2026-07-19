import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { v2 as cloudinary } from 'cloudinary';

const USERNAME_RE = /^[a-zA-Z0-9._]+$/;

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const THREADS_ACCESS_TOKEN = process.env.THREADS_ACCESS_TOKEN || '';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

interface ProfileResult {
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  source: 'cache' | 'api' | 'fallback' | 'unavailable';
}

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
    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const dataUri = `data:${contentType};base64,${base64}`;
    return await uploadToCloudinary(dataUri, `profile_${username}`);
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

async function officialLookup(username: string): Promise<ProfileResult | null> {
  if (!THREADS_ACCESS_TOKEN) return null;
  try {
    const url = new URL('https://graph.threads.net/v1.0/profile_lookup');
    url.searchParams.set('username', username);
    url.searchParams.set('access_token', THREADS_ACCESS_TOKEN);

    const res = await fetch(url.toString(), { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      if (res.status === 400 || res.status === 404) return null;
      return null;
    }
    const body = await res.json();

    const id: string | undefined = body.id || body.data?.id;
    const displayName: string | undefined = body.name || body.data?.name;
    const bio: string | undefined = body.biography || body.data?.biography;
    const pictureUrl: string | undefined = body.picture || body.data?.picture;

    if (!id) return null;

    let avatarUrl: string | null = null;
    if (pictureUrl) {
      avatarUrl = await downloadAndRehost(pictureUrl, username);
    }

    return {
      displayName: displayName || null,
      bio: bio || null,
      avatarUrl,
      source: 'api',
    };
  } catch {
    return null;
  }
}

async function fallbackFetch(username: string): Promise<ProfileResult | null> {
  try {
    const res = await fetch(`https://www.threads.net/@${username}`, {
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; ThreadsAuraCard/1.0; +https://threadsauracard.app)',
      },
    });
    if (!res.ok) return null;

    const html = await res.text();

    const ogTitle = extractMetaTag(html, 'og:title');
    const ogImage = extractMetaTag(html, 'og:image');

    const displayName = ogTitle?.trim() || null;

    let avatarUrl: string | null = null;
    if (ogImage) {
      avatarUrl = await downloadAndRehost(ogImage, username);
    }

    return {
      displayName,
      bio: null,
      avatarUrl,
      source: 'fallback',
    };
  } catch {
    return null;
  }
}

async function getFromCache(
  redis: Redis | null,
  cacheKey: string,
): Promise<ProfileResult | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get<ProfileResult>(cacheKey);
    return cached || null;
  } catch {
    return null;
  }
}

async function setCache(
  redis: Redis | null,
  cacheKey: string,
  data: ProfileResult,
): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(cacheKey, data, { ex: 86400 });
  } catch {
  }
}

async function incrementDailyQuota(redis: Redis | null): Promise<number> {
  if (!redis) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const quotaKey = `quota:profile_lookup:${today}`;
  try {
    const count = await redis.incr(quotaKey);
    if (count === 1) {
      await redis.expire(quotaKey, 86400);
    }
    return count;
  } catch {
    return 0;
  }
}

async function getDailyQuota(redis: Redis | null): Promise<number> {
  if (!redis) return 0;
  const today = new Date().toISOString().slice(0, 10);
  const quotaKey = `quota:profile_lookup:${today}`;
  try {
    const val = await redis.get<number>(quotaKey);
    return val || 0;
  } catch {
    return 0;
  }
}

export async function GET(
  _request: Request,
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

  const cacheKey = `profile:${username}`;
  const redis = getRedis();

  const cached = await getFromCache(redis, cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  let result: ProfileResult | null = null;

  const dailyQuota = await getDailyQuota(redis);
  const canUseOfficial = dailyQuota < 950 && !!THREADS_ACCESS_TOKEN;

  if (canUseOfficial) {
    result = await officialLookup(username);
    await incrementDailyQuota(redis);
  }

  if (!result) {
    result = await fallbackFetch(username);
  }

  if (!result) {
    const unavailable: ProfileResult = {
      displayName: null,
      bio: null,
      avatarUrl: null,
      source: 'unavailable',
    };
    await setCache(redis, cacheKey, unavailable);
    return NextResponse.json(unavailable);
  }

  await setCache(redis, cacheKey, result);
  return NextResponse.json(result);
}
