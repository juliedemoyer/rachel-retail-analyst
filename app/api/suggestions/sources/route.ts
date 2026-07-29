/**
 * POST /api/suggestions/sources
 *
 * "Know a public source Rachel is missing?" form on /app/sources.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { rateLimit, ipFromReq } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";

const Body = z.object({
  url: z.string().min(2).max(500),
  signal: z.string().max(500).optional(),
});

export async function POST(req: Request) {
  const ip = ipFromReq(req);
  const ok = await rateLimit({
    key: `sugs:${ip}`,
    limit: 5,
    windowSec: 3600,
  });
  if (!ok)
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const session = await auth().catch(() => null);
  await redis.lpush("rachel:suggestions:sources", {
    ...parsed.data,
    userId: session?.userId ?? null,
    ts: new Date().toISOString(),
    ip,
  });
  await redis.ltrim("rachel:suggestions:sources", 0, 499);
  return NextResponse.json({ ok: true });
}
