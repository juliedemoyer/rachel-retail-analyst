/**
 * POST /api/feedback
 *
 * "Spotted something off?" submissions from the floating button.
 * Stored in `rachel:feedback` (newest-first list, capped 1000).
 * Includes auto-context: path, slug, viewport, optional screenshot dataUrl.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { rateLimit, ipFromReq } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";

const Body = z.object({
  what: z.string().min(3).max(2000),
  path: z.string().max(500),
  slug: z.string().max(200).optional(),
  viewport: z.string().max(50).optional(),
  screenshotDataUrl: z.string().max(800_000).optional(), // ~600KB cap
});

export async function POST(req: Request) {
  const ip = ipFromReq(req);
  const ok = await rateLimit({ key: `fb:${ip}`, limit: 10, windowSec: 3600 });
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
  const entry = {
    ...parsed.data,
    userId: session?.userId ?? null,
    ts: new Date().toISOString(),
    ip,
  };
  await redis.lpush("rachel:feedback", entry);
  await redis.ltrim("rachel:feedback", 0, 999);
  return NextResponse.json({ ok: true });
}
