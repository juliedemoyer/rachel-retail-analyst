/**
 * POST /api/export/demand
 *
 * Records "which export matters most to you?" votes from /app/export.
 * Atomic HINCRBY into `rachel:export:demand`.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { redis } from "@/lib/redis";
import { rateLimit, ipFromReq } from "@/lib/ratelimit";

const Options = z.enum(["csv", "api", "salesforce", "hubspot", "slack", "email"]);
const Body = z.object({ option: Options });

export async function POST(req: Request) {
  const ip = ipFromReq(req);
  const ok = await rateLimit({
    key: `exp:${ip}`,
    limit: 20,
    windowSec: 86_400,
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
  await redis.hincrby("rachel:export:demand", parsed.data.option, 1);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const tally = (await redis.hgetall<Record<string, number>>(
    "rachel:export:demand",
  )) ?? {};
  return NextResponse.json({ tally });
}
