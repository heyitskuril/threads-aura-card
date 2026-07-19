import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { v2 as cloudinary } from 'cloudinary';

const USERNAME_RE = /^[a-zA-Z0-9._]+$/;

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';

interface ProfileResult {
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  source: 'public-profile' | 'unavailable';
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

async function fetchPublicProfile(username: string): Promise<ProfileResult | null> {
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

    if (!ogImage) return null;

    const displayName = ogTitle?.trim() || null;
    const avatarUrl = await downloadAndRehost(ogImage, username);

    return {
      displayName,
      bio: null,
      avatarUrl,
      source: 'public-profile',
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

  const result = await fetchPublicProfile(username);

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
