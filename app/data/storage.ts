import type { AuraCardData } from '../types';

const STORAGE_PREFIX = 'aura_cache_';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface CachedResult {
  data: AuraCardData;
  cachedAt: number;
}

export function saveResult(username: string, data: AuraCardData): void {
  const key = STORAGE_PREFIX + username.toLowerCase().replace(/^@/, '');
  const entry: CachedResult = { data, cachedAt: Date.now() };
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
  }
}

export function getResult(username: string): AuraCardData | null {
  const key = STORAGE_PREFIX + username.toLowerCase().replace(/^@/, '');
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CachedResult = JSON.parse(raw);
    if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

export function clearCache(): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(STORAGE_PREFIX)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
}

export function getAllCachedUsernames(): string[] {
  const usernames: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(STORAGE_PREFIX)) {
      usernames.push(k.replace(STORAGE_PREFIX, ''));
    }
  }
  return usernames;
}
