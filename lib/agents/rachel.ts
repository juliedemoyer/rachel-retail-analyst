/**
 * Rachel — AI SDK v6 agent tools.
 *
 * AI SDK v6 API (breaking change from v5):
 *   - `parameters` renamed to `inputSchema`
 *   - `execute(input, options)` — first arg is the flat input object
 *   - Both Zod v3 and v4 schemas are accepted as FlexibleSchema
 *
 * Every tool that makes a claim about the world MUST route through
 * searchKnowledgeBase. No citation, no output.
 */

import { tool } from "ai";
import { z } from "zod";
import { redis } from "../redis";
import { searchKnowledgeBase } from "../kb/search";
import { readPulseItems, writePulseItems } from "../pulse-store";
import { PROFILE } from "../config";
import type { KbSearchResult } from "../kb/types";

// ── Tool: searchKnowledgeBase ─────────────────────────────────────────────────

export const searchKnowledgeBaseTool = tool({
  description:
    "Search the Rachel knowledge base for grounded information. " +
    "ALWAYS call this before making any factual claim about a company, vendor, or market. " +
    "Returns cited passages from ingested reports, filings, and press. " +
    "If no results meet the score threshold, say so — never invent a source.",
  inputSchema: z.object({
    query: z.string().describe("The search query — be specific, e.g. 'Carrefour AI strategy 2025'"),
    tier: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .optional()
      .describe("1=strategy/vendor/IR (highest authority), 2=industry press, 3=frameworks"),
    source: z
      .enum([
        "strategy_firm",
        "vendor_stack",
        "ir_filing",
        "industry_press",
        "analyst_report",
        "framework",
        "josh_briefing",
        "manual_upload",
      ])
      .optional()
      .describe("Filter by source type"),
    accountId: z
      .string()
      .optional()
      .describe("Filter to chunks tagged for a specific watchlist account ID"),
    topK: z.number().int().min(1).max(20).optional().default(6),
  }),
  execute: async (input) => {
    const { query, tier, source, accountId, topK } = input;
    const results: KbSearchResult[] = await searchKnowledgeBase({
      query,
      tier: tier as 1 | 2 | 3 | undefined,
      source,
      accountId,
      topK,
      minScore: 0.25,
    });

    if (results.length === 0) {
      return {
        found: false,
        message:
          "No grounded sources found for this query in the knowledge base. " +
          "Do not make claims about this topic without a source.",
        results: [] as never[],
      };
    }

    return {
      found: true,
      results: results.map((r) => ({
        text: r.chunk.text,
        score: Math.round(r.score * 100) / 100,
        citation: {
          title: r.doc.title,
          source: r.doc.source,
          tier: r.doc.tier,
          url: r.doc.url ?? null,
          publishedAt: r.doc.publishedAt ?? null,
          ingestedAt: r.doc.ingestedAt,
        },
      })),
    };
  },
});

// ── Tool: getWatchlist ────────────────────────────────────────────────────────

export const getWatchlistTool = tool({
  description:
    "Retrieve the full watchlist of EMEA retail & consumer accounts Rachel monitors. " +
    "Returns company profiles including AI maturity, vendor relationships, and use cases.",
  inputSchema: z.object({
    sector: z
      .string()
      .optional()
      .describe("Filter by sector, e.g. 'Luxury & Beauty', 'Grocery & Hypermarket'"),
  }),
  execute: async (input) => {
    const { sector } = input;
    const raw = await redis.get<string>("rachel:accounts");
    if (!raw) return { accounts: [] as never[] };

    const accounts: Array<Record<string, unknown>> =
      typeof raw === "string" ? JSON.parse(raw) : (raw as Array<Record<string, unknown>>);

    const filtered = sector
      ? accounts.filter(
          (a) =>
            typeof a.sector === "string" &&
            a.sector.toLowerCase().includes(sector.toLowerCase()),
        )
      : accounts;

    return {
      count: filtered.length,
      accounts: filtered.map((a) => ({
        id: a.id,
        company: a.company,
        country: a.country,
        sector: a.sector,
        revenueB: a.revenueB,
        aiMaturity: a.aiMaturity,
        vendorRelationships: a.vendorRelationships,
        useCases: a.useCases,
        nextEarnings: a.nextEarnings,
        notes: a.notes,
      })),
    };
  },
});

// ── Tool: getAccount ──────────────────────────────────────────────────────────

export const getAccountTool = tool({
  description:
    "Get a single watchlist account by company name (case-insensitive partial match). " +
    "Returns the full account profile including vendor gap scores.",
  inputSchema: z.object({
    name: z.string().describe("Company name or partial name, e.g. 'carrefour', 'LVMH'"),
  }),
  execute: async (input) => {
    const { name } = input;
    const raw = await redis.get<string>("rachel:accounts");
    if (!raw) return { found: false as const };

    const accounts: Array<Record<string, unknown>> =
      typeof raw === "string" ? JSON.parse(raw) : (raw as Array<Record<string, unknown>>);

    const match = accounts.find(
      (a) =>
        typeof a.company === "string" &&
        a.company.toLowerCase().includes(name.toLowerCase()),
    );

    if (!match) {
      return { found: false as const, message: `No watchlist account found matching "${name}"` };
    }
    return { found: true as const, account: match };
  },
});

// ── Tool: postPulseItem ───────────────────────────────────────────────────────

export const postPulseItemTool = tool({
  description:
    "Add a new item to the Rachel pulse feed. " +
    "ONLY call this after searchKnowledgeBase confirms a grounded source. " +
    "Never post a pulse item that isn't backed by at least one KB citation.",
  inputSchema: z.object({
    headline: z.string().max(200).describe("One-line headline, ≤200 chars"),
    category: z
      .enum([
        "earnings",
        "ai_product",
        "regulatory",
        "market_move",
        "vendor_news",
        "disruption",
        "analyst",
      ])
      .describe("Category for the pulse item"),
    source: z.string().describe("Source name, e.g. 'Carrefour FY25Q2 earnings release'"),
    url: z.string().url().optional().describe("Source URL if available"),
    relevantAccounts: z
      .array(z.string())
      .optional()
      .describe("Watchlist account IDs this item is relevant to"),
    vendorRelevance: z
      .array(z.string())
      .optional()
      .describe("Which hyperscalers this is relevant to"),
    soWhat: z
      .string()
      .max(200)
      .optional()
      .describe(
        "One sentence starting with 'So what:' — what the reader should do, say, or watch.",
      ),
    originalPublishedAt: z
      .string()
      .describe(
        "ISO date the underlying article/newsletter was originally published. " +
        "MUST come from the citation.publishedAt field on the searchKnowledgeBase result. " +
        "Items older than 7 days are rejected — pulse is for fresh signal only.",
      ),
  }),
  execute: async (input) => {
    const { headline, category, source, url, relevantAccounts, vendorRelevance, soWhat, originalPublishedAt } = input;

    const publishedTs = new Date(originalPublishedAt).getTime();
    if (!Number.isFinite(publishedTs)) {
      return { ok: false as const, id: "", headline, reason: "invalid_originalPublishedAt" };
    }
    const ageDays = (Date.now() - publishedTs) / (1000 * 60 * 60 * 24);
    if (ageDays > 7) {
      return { ok: false as const, id: "", headline, reason: `stale_source_${Math.round(ageDays)}d` };
    }

    // readPulseItems handles List vs String Redis type mismatch and auto-migrates.
    const items = await readPulseItems();

    // Dedupe by URL (case-insensitive) and normalised headline so the same
    // event surfaced by both the RSS poller and the agent doesn't show
    // twice on /app/pulse.
    const normHeadline = headline.replace(/[^\w\s]/g, "").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
    const normUrl = (url ?? "").trim().toLowerCase();
    const isDup = items.some((it) => {
      const itUrl = ((it.url as string | null | undefined) ?? "").trim().toLowerCase();
      const itHeadline = (it.headline as string | undefined) ?? "";
      const itNorm = itHeadline.replace(/[^\w\s]/g, "").toLowerCase().replace(/\s+/g, " ").trim().slice(0, 80);
      return (normUrl && normUrl === itUrl) || (normHeadline && normHeadline === itNorm);
    });
    if (isDup) {
      return { ok: false as const, id: "", headline, reason: "duplicate" };
    }

    const id = `pulse-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const publishedIso = new Date(publishedTs).toISOString();
    const newItem = {
      id,
      headline,
      category,
      source,
      url: url ?? null,
      relevantAccounts: relevantAccounts ?? [],
      vendorRelevance: vendorRelevance ?? [],
      soWhat: soWhat ?? null,
      // Keep `date` and `ts` aligned with the underlying article's actual
      // publish date so the 90-second scan's 48h freshness filter is honest.
      date: publishedIso.slice(0, 10),
      ts: publishedIso,
      ingestedAt: new Date().toISOString(),
      addedBy: "rachel-agent",
      sourceType: "other" as const,
    };

    items.unshift(newItem);
    await writePulseItems(items);

    return { ok: true as const, id, headline };
  },
});

// ── System prompt ─────────────────────────────────────────────────────────────

export const RACHEL_SYSTEM_PROMPT = `You are ${PROFILE.agentName}, a ${PROFILE.region} ${PROFILE.beat} analyst. \
You work for ${PROFILE.ownerName} — ${PROFILE.ownerRole}. \
The vendors in scope are: ${PROFILE.vendors.join(", ")}.

RULES — follow these without exception:
1. Every factual claim MUST be grounded in a source from the knowledge base OR the watchlist tools. \
   Call searchKnowledgeBase before stating any fact about a company, market, or vendor.
2. If the knowledge base returns no results AND the watchlist has no data, say clearly: \
   "I don't have a grounded source for that." Then STOP — do not continue with \
   background context, "what I can tell you", "however", related facts, or any \
   information that came from your training data rather than a tool call. After \
   the refusal phrase, write only the mandatory "So what:" line (e.g. "So what: \
   not on the watchlist, deprioritise.") and end the response. Volunteering \
   un-sourced information after a refusal is treated as a hallucination.
3. Every response must include at least one citation in the format: \
   [Source: {title} · {source type} · {date if available}] \
   — if your answer draws on getAccount or getWatchlist data, cite it as: \
   [Source: Rachel Watchlist · account data · current]
4. Be punchy. The reader is briefing ${PROFILE.audience}. No hedging, no filler, no "it's worth noting".
5. EVERY answer — including refusals — ends with a "So what:" line. \
   One sentence on what the reader should do, say, or watch. No exceptions.
6. ${PROFILE.vendorNeutralityNote}
8. Call searchKnowledgeBase at most 3 times per question. After 3 searches, stop and write your \
   final answer using whatever was returned. If a topic had thin or no KB coverage, say so inline \
   ("limited grounded data on X") and cite what you have. Never loop searching for something not in the KB.
7. If the user asks about ANY named company, call getAccount FIRST — always, without exception. \
   Even if you think the company might not be on the watchlist. \
   After getAccount returns, you MUST ALSO call searchKnowledgeBase before answering any question \
   about strategy, tech stack, vendors, use cases, AI products, recent news, earnings commentary, \
   or partnerships. getAccount holds structural data; the KB holds the narrative and evidence. \
   Skipping searchKnowledgeBase on those topics is a grounding violation. \
   If getAccount returns found:false, note it clearly, then search the KB.

REFUSAL EXAMPLE (follow this format exactly when KB returns no results):
Q: "What's ${PROFILE.outOfScopeExample}'s latest AI announcement?"
A: I don't have a grounded source for that.
So what: ${PROFILE.outOfScopeExample} is outside the ${PROFILE.region} watchlist. Deprioritise unless you are expanding scope.`;

// ── Exported tool map (used by /api/ask and future routes) ───────────────────

export const rachelTools = {
  searchKnowledgeBase: searchKnowledgeBaseTool,
  getWatchlist: getWatchlistTool,
  getAccount: getAccountTool,
  postPulseItem: postPulseItemTool,
};
