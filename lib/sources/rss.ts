/**
 * RSS Poller — Phase 2, Pillar 2.
 *
 * Polls a curated list of retail & AI industry RSS feeds, deduplicates
 * against already-ingested content, and routes new items through the KB
 * ingestion pipeline. Called by the nightly cron at /api/cron/rss-poll.
 *
 * Sources (10 feeds): Retail Dive, Modern Retail, Grocery Gazette, Business of Fashion,
 * RetailDetail.eu, Microsoft Blog, Google Cloud Retail, AI Daily Brief,
 * AWS for Industries, Databricks Blog.
 * Vogue Business, Anthropic, FashionNetwork removed — no working public RSS.
 * Snowflake removed — retail-specific feed URL does not resolve.
 */

import { XMLParser } from "fast-xml-parser";
import { redis } from "../redis";
import { ingestDocument } from "../kb/embed";
import { readPulseItems, writePulseItems } from "../pulse-store";

// ── Feed definitions ──────────────────────────────────────────────────────────

export interface RSSFeed {
  id: string;
  name: string;
  url: string;
  tier: 1 | 2 | 3;
  source: "industry_press" | "vendor_stack" | "analyst_report" | "strategy_firm";
  /** Company names to filter for — empty = ingest all items */
  watchlist?: string[];
}

export const CURATED_FEEDS: RSSFeed[] = [
  {
    id: "retail_dive",
    name: "Retail Dive",
    url: "https://www.retaildive.com/feeds/news/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "modern_retail",
    name: "Modern Retail",
    url: "https://www.modernretail.co/feed/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "grocery_gazette",
    name: "Grocery Gazette",
    url: "https://grocerygazette.co.uk/feed/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "bof",
    name: "Business of Fashion",
    url: "https://www.businessoffashion.com/feed/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "retaildetail",
    name: "RetailDetail.eu",
    url: "https://www.retaildetail.eu/feed/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "ms_blog",
    name: "Microsoft Blog",
    url: "https://blogs.microsoft.com/feed/",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },
  {
    id: "google_cloud_retail",
    name: "Google Cloud Retail Blog",
    url: "https://cloudblog.withgoogle.com/topics/retail/rss/",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },
  {
    id: "ai_daily_brief",
    name: "AI Daily Brief",
    url: "https://aidailybrief.substack.com/feed",
    tier: 2,
    source: "vendor_stack",
    watchlist: [],
  },
  {
    id: "aws_industries",
    name: "AWS for Industries",
    url: "https://aws.amazon.com/blogs/industries/feed/",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },
  {
    id: "databricks_blog",
    name: "Databricks Blog",
    url: "https://www.databricks.com/feed",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },

  // ── Strategy / culture / AI newsletters configured in config/sources.json. These post
  //    almost daily and are the freshest pulse signal we have on EMEA luxury,
  //    consumer narrative and AI tooling. Wired here so /app/pulse stays
  //    current between earnings cycles.
  //
  //    URLs verified live 2026-05-04. Jing Daily intentionally NOT here —
  //    they no longer publish a working public RSS feed (jingdaily.com/feed
  //    and jingdaily.com/feed/ both 404 / 308 to a placeholder). For Jing
  //    Daily we'll need a Phase 2 Gmail-import pipeline.
  {
    id: "no_mercy_no_malice",
    name: "No Mercy / No Malice",
    url: "https://www.profgalloway.com/feed/",
    tier: 2,
    source: "strategy_firm",
    watchlist: [],
  },
  {
    id: "alphasignal",
    name: "AlphaSignal",
    url: "https://alphasignal.substack.com/feed",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },
  {
    id: "bay_area_times",
    name: "Bay Area Times",
    url: "https://www.bayareatimes.com/feed/",
    tier: 2,
    source: "industry_press",
    watchlist: [],
  },
  {
    id: "superhuman_ai",
    name: "Superhuman AI",
    url: "https://superhuman.beehiiv.com/feed",
    tier: 1,
    source: "vendor_stack",
    watchlist: [],
  },
];

// ── Watchlist keyword filter ──────────────────────────────────────────────────

const WATCHLIST_KEYWORDS = [
  // Watchlist companies
  "lvmh", "kering", "l'oréal", "loreal", "carrefour", "ahold", "inditex",
  "zara", "h&m", "h and m", "unilever", "tesco", "zalando", "asos",
  "nestlé", "nestle", "adidas", "burberry", "hermes", "hermès",
  "richemont", "estee lauder", "estée lauder", "heineken", "diageo", "pernod",
  "ab inbev", "beiersdorf", "marks spencer", "sainsbury", "ocado",
  "lidl", "kaufland", "schwarz group", "migros", "boots", "walgreens boots",
  "el corte inglés", "el corte ingles", "chanel", "prada", "moncler",
  "jde peet", "jacobs douwe", "givaudan", "bel group", "babybel",
  "ikea", "decathlon", "on running", "lego", "fnac",
  // Retail & consumer sector terms
  "retail", "grocery", "fashion", "luxury", "e-commerce", "ecommerce",
  "omnichannel", "consumer goods", "fmcg", "cpg", "apparel", "department store",
  "supply chain retail", "last mile", "click and collect", "curbside",
  "store associate", "checkout", "loyalty programme", "loyalty program",
  // AI in retail
  "retail ai", "ai retail", "generative ai retail", "microsoft retail",
  "google retail", "emea retail", "european retail",
  "personalization", "demand forecasting", "assortment", "merchandising",
  "clienteling", "visual search", "chatbot retail", "conversational commerce",
];

// Industry press feeds (Retail Dive, BoF, Modern Retail, etc.) cover retail
// exclusively — skip keyword filter so all articles surface in pulse.
// Vendor blogs (MS, Google, AWS) publish broadly; keep filter to catch
// only retail-relevant posts.
function isRelevant(title: string, description: string, source: RSSFeed["source"]): boolean {
  if (source === "industry_press" || source === "strategy_firm") return true;
  const combined = (title + " " + description).toLowerCase();
  return WATCHLIST_KEYWORDS.some((kw) => combined.includes(kw));
}

// ── RSS parsing ───────────────────────────────────────────────────────────────

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  content?: string;
}

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

async function fetchFeed(feed: RSSFeed): Promise<RSSItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: {
        // Browser-like UA so beehiiv (Superhuman AI) and the bayareatimes.com
        // CDN don't 403 us. Plain bot UAs were getting blocked.
        "User-Agent":
          "Mozilla/5.0 (compatible; RachelIntelBot/1.0; +https://your-domain.example)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml; q=0.9, */*; q=0.8",
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return [];
    const text = await res.text();
    const parsed = xmlParser.parse(text);

    // Handle both RSS 2.0 and Atom formats
    const channel = parsed?.rss?.channel ?? parsed?.feed ?? null;
    if (!channel) return [];

    const rawItems: unknown[] = Array.isArray(channel.item)
      ? channel.item
      : Array.isArray(channel.entry)
        ? channel.entry
        : channel.item
          ? [channel.item]
          : channel.entry
            ? [channel.entry]
            : [];

    return rawItems.map((i) => {
      const item = i as Record<string, unknown>;
      return {
        title: String(item.title ?? ""),
        link: String(
          (typeof item.link === "string"
            ? item.link
            : (typeof item.link === "object" && item.link !== null)
              ? (item.link as Record<string, string>)?.["@_href"]
              : "") ?? ""
        ),
        description: String(item.description ?? item.summary ?? ""),
        pubDate: String(item.pubDate ?? item.published ?? item.updated ?? ""),
        content: String(item["content:encoded"] ?? item.content ?? ""),
      };
    });
  } catch {
    return [];
  }
}

async function isAlreadyIngested(url: string): Promise<boolean> {
  return (await redis.sismember("rachel:rss:seen", url)) === 1;
}

async function markSeen(url: string): Promise<void> {
  await redis.sadd("rachel:rss:seen", url);
  // Trim the seen set to last 10k URLs to avoid unbounded growth
  // (Redis SPOP is random, so we can't trim by recency — rely on the hash
  //  dedup in ingestDocument's contentHash for duplicate prevention instead)
}

// ── Main poller ───────────────────────────────────────────────────────────────

export interface PollResult {
  feed: string;
  fetched: number;
  ingested: number;
  skipped: number;
  error?: string;
  /** Pulse items collected by this feed, to be merged by the caller. */
  pulseItems?: Array<Record<string, unknown>>;
}

export async function pollFeed(feed: RSSFeed): Promise<PollResult> {
  let fetched = 0;
  let ingested = 0;
  let skipped = 0;
  const pulseItems: Array<Record<string, unknown>> = [];

  try {
    const items = await fetchFeed(feed);
    fetched = items.length;

    // Process items from the last 96 hours (4 days) — covers the Mon→Fri→Mon
    // weekend gap where Saturday articles would otherwise fall outside a 48h window.
    // The rachel:rss:seen dedup set prevents re-ingesting already-processed URLs.
    const cutoff = new Date(Date.now() - 96 * 60 * 60 * 1000);

    for (const item of items) {
      if (!item.link || !item.title) { skipped++; continue; }

      // Date filter: skip articles older than 96h. If pubDate is missing we
      // let the item through (the grounded refresh applies its own freshness gate).
      if (item.pubDate) {
        const d = new Date(item.pubDate);
        if (!isNaN(d.getTime()) && d < cutoff) { skipped++; continue; }
      }

      // Relevance filter (bypassed for curated industry_press / strategy_firm feeds)
      if (!isRelevant(item.title, item.description, feed.source)) { skipped++; continue; }

      // Dedupe
      if (await isAlreadyIngested(item.link)) { skipped++; continue; }

      // Build ingestion text
      const text = [
        item.title,
        item.description.replace(/<[^>]+>/g, ""), // strip HTML tags
        item.content?.replace(/<[^>]+>/g, "") ?? "",
      ]
        .filter(Boolean)
        .join("\n\n")
        .trim();

      if (text.length < 80) { skipped++; continue; }

      await ingestDocument({
        title: item.title,
        text,
        source: feed.source,
        tier: feed.tier,
        url: item.link,
        publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : undefined,
        tags: ["rss", feed.id],
      });

      // Collect pulse item locally. The actual write to rachel:pulse happens
      // in pollAllFeeds AFTER all concurrent feeds finish, to avoid concurrent
      // read-modify-write overwrites between feeds running in parallel.
      const summary = item.description.replace(/<[^>]+>/g, "").trim().slice(0, 280);
      pulseItems.push({
        id: `rss-${feed.id}-${Buffer.from(item.link).toString("base64").slice(0, 16)}`,
        headline: item.title,
        summary,
        source: feed.name,
        url: item.link,
        category: feed.source === "vendor_stack" ? "ai_models" : "ai_retail",
        ts: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        priority: feed.tier === 1 ? "HIGH" : feed.tier === 2 ? "MED" : "LOW",
        surfaced_via: [feed.name],
      });

      await markSeen(item.link);
      ingested++;
    }

    // Update feed metadata
    await redis.hset(`rachel:sources:rss:${feed.id}`, {
      lastPollAt: new Date().toISOString(),
      lastPollStatus: "ok",
      itemsIngested: ingested,
    });

    return { feed: feed.id, fetched, ingested, skipped, pulseItems };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    await redis.hset(`rachel:sources:rss:${feed.id}`, {
      lastPollAt: new Date().toISOString(),
      lastPollStatus: "error",
      lastError: error,
    });
    return { feed: feed.id, fetched, ingested, skipped, error };
  }
}

export async function pollAllFeeds(): Promise<PollResult[]> {
  // Poll feeds with concurrency 4
  const results: PollResult[] = [];
  const chunks: RSSFeed[][] = [];
  for (let i = 0; i < CURATED_FEEDS.length; i += 4) {
    chunks.push(CURATED_FEEDS.slice(i, i + 4));
  }
  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk.map(pollFeed));
    results.push(...chunkResults);
  }

  // Merge all collected pulse items into rachel:pulse in one atomic write.
  // This avoids the concurrent read-modify-write race condition that would
  // occur if each pollFeed wrote directly while others ran in parallel.
  const allNewItems = results.flatMap((r) => r.pulseItems ?? []);
  if (allNewItems.length > 0) {
    try {
      const existing = await readPulseItems();
      const existingIds = new Set(existing.map((i) => i.id));
      const toAdd = allNewItems.filter((item) => !existingIds.has(item.id));
      if (toAdd.length > 0) {
        const merged = [...toAdd.reverse(), ...existing]; // newest first within toAdd
        if (merged.length > 100) merged.length = 100;
        await writePulseItems(merged);
      }
    } catch {
      // Non-fatal: KB ingest is the source of truth, pulse is a UI nicety.
    }
  }

  return results;
}
