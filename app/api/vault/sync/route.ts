/**
 * /api/vault/sync — Agent-side vault note push.
 *
 * Agents (Rachel, Josh, Holy, Wally, Leonie) POST their EOD vault entry here
 * after writing the local file. Stored under rachel:vault:{agent}:{date} and
 * rachel:vault:{agent}:latest in Upstash.
 *
 * The vault-to-pulse cron reads these snapshots and surfaces "Signal for
 * other agents" lines targeted at Rachel into the pulse feed.
 *
 * Auth: CRON_SECRET bearer.
 */

import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const VALID_AGENTS = new Set(["rachel", "josh", "holy", "wally", "leonie"]);

interface VaultPayload {
  agent: string;
  date: string;
  content: string;
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<VaultPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { agent, date, content } = body;
  if (!agent || !date || !content) {
    return NextResponse.json(
      { error: "Missing agent, date, or content" },
      { status: 400 },
    );
  }

  const normalizedAgent = agent.toLowerCase();
  if (!VALID_AGENTS.has(normalizedAgent)) {
    return NextResponse.json(
      { error: `Unknown agent: ${agent}. Valid: ${[...VALID_AGENTS].join(", ")}` },
      { status: 400 },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Date must be YYYY-MM-DD" },
      { status: 400 },
    );
  }

  const entry = {
    agent: normalizedAgent,
    date,
    content,
    receivedAt: new Date().toISOString(),
  };

  await Promise.all([
    redis.set(`rachel:vault:${normalizedAgent}:${date}`, JSON.stringify(entry)),
    redis.set(`rachel:vault:${normalizedAgent}:latest`, JSON.stringify(entry)),
  ]);

  return NextResponse.json({
    ok: true,
    agent: normalizedAgent,
    date,
    bytes: content.length,
  });
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const hasCookie = false; // legacy cookie gate removed
  if (auth !== `Bearer ${process.env.CRON_SECRET}` && !hasCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const agent = url.searchParams.get("agent");
  if (!agent || !VALID_AGENTS.has(agent.toLowerCase())) {
    return NextResponse.json(
      { error: "Missing or invalid ?agent" },
      { status: 400 },
    );
  }

  const raw = await redis.get(`rachel:vault:${agent.toLowerCase()}:latest`);
  if (!raw) {
    return NextResponse.json({ agent, latest: null });
  }
  const entry = typeof raw === "string" ? JSON.parse(raw) : raw;
  return NextResponse.json({ agent, latest: entry });
}
