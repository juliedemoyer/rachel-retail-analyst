/**
 * Tiny IP-keyed sliding-window rate limit using Upstash Redis.
 *
 * Not a substitute for Upstash @upstash/ratelimit — kept dependency-free
 * because the only feature we need is "N requests per window per IP" and
 * the existing `redis` client already has INCR/EXPIRE.
 *
 * Usage:
 *   const ok = await rateLimit({ key: `feedback:${ip}`, limit: 10, windowSec: 3600 });
 *   if (!ok) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

import { redis } from "./redis";

export interface RateLimitArgs {
  key: string;
  limit: number;
  windowSec: number;
}

export async function rateLimit({
  key,
  limit,
  windowSec,
}: RateLimitArgs): Promise<boolean> {
  const fullKey = `rachel:rl:${key}`;
  // INCR returns the new value
  const count = (await redis.incr(fullKey)) as number;
  if (count === 1) {
    // First hit in window — set expiry
    await redis.expire(fullKey, windowSec);
  }
  return count <= limit;
}

/** Best-effort IP extraction from a Next.js request. */
export function ipFromReq(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
