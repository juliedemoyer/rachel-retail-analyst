/**
 * /api/newsletter/ingest — Agent-side newsletter → pulse bridge.
 *
 * Gmail OAuth is only available via Claude's Gmail MCP at agent runtime, not
 * from a Vercel cron. So this endpoint accepts a batch of newsletter items
 * the agent extracted from Gmail (Retail Brew, BoF Daily, Jing Daily, Jing
 * Beauty, etc.) and pushes them into rachel:pulse with dedup.
 *
 * Idempotent: items are deduped by source + headline content hash.
 *
 * Auth: CRON_SECRET bearer.
 */

import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface NewsletterItem {
  source: string;        // e.g. "Retail Brew", "Business of Fashion"
  headline: string;
  summary?: string;
  url?: string;
  publishedAt?: string;  // ISO date
  priority?: "HIGH" | "MED" | "LOW";
}

interface IngestPayload {
  items: NewsletterItem[];
}

function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 8);
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 20);
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<IngestPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }

  const pulseRaw = await redis.get("rachel:pulse");
  const pulse: Array<Record<string, unknown>> =
    typeof pulseRaw === "string"
      ? JSON.parse(pulseRaw)
      : Array.isArray(pulseRaw)
        ? (pulseRaw as Array<Record<string, unknown>>)
        : [];

  let ingested = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const item of items) {
    if (!item.headline || !item.source) {
      skipped++;
      errors.push(`missing headline/source: ${JSON.stringify(item).slice(0, 80)}`);
      continue;
    }
    const id = `newsletter-${slugify(item.source)}-${hash(item.headline)}`;
    if (pulse.some((p) => p.id === id)) {
      skipped++;
      continue;
    }
    pulse.unshift({
      id,
      headline: item.headline,
      summary: item.summary?.slice(0, 280) ?? "",
      source: item.source,
      url: item.url ?? null,
      category: "ai_retail",
      ts: item.publishedAt ?? new Date().toISOString(),
      priority: item.priority ?? "MED",
      surfaced_via: [`Newsletter: ${item.source}`],
    });
    ingested++;
  }

  if (ingested > 0) {
    if (pulse.length > 100) pulse.length = 100;
    await redis.set("rachel:pulse", JSON.stringify(pulse));
  }

  return NextResponse.json({
    ok: true,
    ingested,
    skipped,
    total: items.length,
    errors: errors.slice(0, 5),
  });
}
