/**
 * POST /api/suggestions/companies
 *
 * "Suggest a company" form submissions from /app/companies.
 * Stored in `rachel:suggestions:companies` (newest-first, capped 500).
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { rateLimit, ipFromReq } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";

const Body = z.object({
  companyName: z.string().min(2).max(120),
  ticker: z.string().max(20).optional(),
  hq: z.string().max(80).optional(),
  sector: z.string().max(80).optional(),
  why: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const ip = ipFromReq(req);
  const ok = await rateLimit({
    key: `sugc:${ip}`,
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
  await redis.lpush("rachel:suggestions:companies", {
    ...parsed.data,
    userId: session?.userId ?? null,
    ts: new Date().toISOString(),
    ip,
  });
  await redis.ltrim("rachel:suggestions:companies", 0, 499);
  return NextResponse.json({ ok: true });
}
