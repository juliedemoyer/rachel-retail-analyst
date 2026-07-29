/**
 * /api/sources — CRUD over rachel:sources:{id}.
 * Powers the Sources pop-up (Pillar 3b-i).
 *
 * GET    — list all sources with health metadata
 * POST   — add a new source (test-fetches before persisting)
 * DELETE — remove a source by id (query param ?id=...)
 */

import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { CURATED_FEEDS } from "@/lib/sources/rss";
import { VENDOR_PAGES } from "@/lib/sources/vendor-scrape";
import { getIRStatus } from "@/lib/sources/ir-scraper";

export interface SourceRecord {
  id: string;
  name: string;
  url: string;
  tier: 1 | 2 | 3;
  kind: "rss" | "ir" | "vendor_scrape" | "manual";
  cadence: string;
  addedBy: string;
  addedAt: string;
  lastPollAt?: string;
  lastPollStatus?: "ok" | "error" | "stale";
  itemsIngested?: number;
}

/** Build the static sources from curated feed/page lists. All Redis fan-out
 *  runs in parallel; the previous sequential await loops were the cause of
 *  the 3s+ response time flagged in CODY's report. */
async function buildSourceList(): Promise<SourceRecord[]> {
  const customKeysPromise = redis.keys("rachel:sources:custom:*");

  const rssPromise = Promise.all(
    CURATED_FEEDS.map(async (feed): Promise<SourceRecord> => {
      const meta = await redis.hgetall<{
        lastPollAt?: string;
        lastPollStatus?: string;
        itemsIngested?: string;
      }>(`rachel:sources:rss:${feed.id}`);
      return {
        id: `rss:${feed.id}`,
        name: feed.name,
        url: feed.url,
        tier: feed.tier,
        kind: "rss",
        cadence: "Every 30 min (weekdays)",
        addedBy: "system",
        addedAt: "2026-01-01T00:00:00Z",
        lastPollAt: meta?.lastPollAt,
        lastPollStatus: (meta?.lastPollStatus as "ok" | "error") ?? "stale",
        itemsIngested: meta?.itemsIngested ? Number(meta.itemsIngested) : 0,
      };
    }),
  );

  const vendorPromise = Promise.all(
    VENDOR_PAGES.map(async (page): Promise<SourceRecord> => {
      const meta = await redis.hgetall<{ lastDiffAt?: string }>(
        `rachel:vendor-catalog-meta:${page.vendor}:${page.id}`,
      );
      return {
        id: `vendor:${page.id}`,
        name: `${page.name} (${page.vendor})`,
        url: page.url,
        tier: 1,
        kind: "vendor_scrape",
        cadence: "Weekly (Monday)",
        addedBy: "system",
        addedAt: "2026-01-01T00:00:00Z",
        lastPollAt: meta?.lastDiffAt,
        lastPollStatus: meta?.lastDiffAt ? "ok" : "stale",
      };
    }),
  );

  const irPromise = getIRStatus().then((statuses) =>
    statuses.map((ir): SourceRecord => ({
      id: `ir:${ir.accountId}`,
      name: `${ir.company} IR`,
      url: ir.irUrl,
      tier: 1,
      kind: "ir",
      cadence: "Nightly",
      addedBy: "system",
      addedAt: "2026-01-01T00:00:00Z",
      lastPollAt: ir.lastScrapedAt,
      lastPollStatus: ir.lastScrapeStatus ?? "stale",
      itemsIngested: ir.ingestedCount,
    })),
  );

  const customPromise = customKeysPromise.then(async (keys) => {
    const records = await Promise.all(keys.map((k) => redis.get<SourceRecord>(k)));
    return records.filter((r): r is SourceRecord => r != null);
  });

  const [rss, vendor, ir, custom] = await Promise.all([
    rssPromise,
    vendorPromise,
    irPromise,
    customPromise,
  ]);

  return [...rss, ...vendor, ...ir, ...custom];
}

export async function GET() {
  console.log(JSON.stringify({ level: "info", msg: "sources_get", route: "/api/sources" }));
  try {
    const sources = await buildSourceList();

    // Coverage counts by tier
    const coverage: Record<1 | 2 | 3, { count: number }> = { 1: { count: 0 }, 2: { count: 0 }, 3: { count: 0 } };
    for (const s of sources) {
      const t = s.tier as 1 | 2 | 3;
      if (coverage[t]) coverage[t].count++;
    }

    return NextResponse.json({ sources, coverage });
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  console.log(JSON.stringify({ level: "info", msg: "sources_post_start", route: "/api/sources", requestId }));
  const userId = "default";

  const body = await req.json().catch(() => ({})) as Partial<SourceRecord>;
  if (!body.name || !body.url || !body.kind) {
    return NextResponse.json({ error: "name, url, kind are required" }, { status: 400 });
  }

  // Test-fetch the URL before persisting
  try {
    const testRes = await fetch(body.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(8_000),
    });
    if (!testRes.ok) {
      return NextResponse.json(
        { error: `Source URL returned ${testRes.status} — cannot add` },
        { status: 422 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Source URL is unreachable" }, { status: 422 });
  }

  const id = `custom-${crypto.randomUUID().slice(0, 8)}`;
  const record: SourceRecord = {
    id,
    name: body.name,
    url: body.url,
    tier: body.tier ?? 2,
    kind: body.kind,
    cadence: body.cadence ?? "Manual",
    addedBy: userId,
    addedAt: new Date().toISOString(),
    lastPollStatus: "stale",
  };
  await redis.set(`rachel:sources:custom:${id}`, record);

  return NextResponse.json({ ok: true, source: record }, { status: 201 });
}

export async function DELETE(req: Request) {
  const requestId = crypto.randomUUID();
  console.log(JSON.stringify({ level: "info", msg: "sources_delete_start", route: "/api/sources", requestId }));

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id query param required" }, { status: 400 });

  // Only custom sources can be deleted; system sources are curated
  if (!id.startsWith("custom-")) {
    return NextResponse.json({ error: "System sources cannot be deleted" }, { status: 403 });
  }

  await redis.del(`rachel:sources:custom:${id}`);
  return NextResponse.json({ ok: true });
}
