/**
 * Simple in-memory login rate limit for sole-owner admin.
 * Resets on server restart — enough to slow bots on a public /api/admin/login.
 */

type AttemptBucket = {
  count: number;
  windowStart: number;
};

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const buckets = new Map<string, AttemptBucket>();

function prune(now: number) {
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  prune(now);

  const bucket = buckets.get(ip);
  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    return { allowed: true, retryAfterSec: 0 };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    const retryAfterSec = Math.ceil(
      (WINDOW_MS - (now - bucket.windowStart)) / 1000
    );
    return { allowed: false, retryAfterSec };
  }

  return { allowed: true, retryAfterSec: 0 };
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    return;
  }

  bucket.count += 1;
}

export function clearLoginFailures(ip: string): void {
  buckets.delete(ip);
}
