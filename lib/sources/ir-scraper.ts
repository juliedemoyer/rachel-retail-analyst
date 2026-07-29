/**
 * IR Auto-Scraper — Phase 2, Pillar 1b.
 *
 * Visits each watchlist company's investor-relations page, discovers newly
 * published PDFs (earnings releases, presentations, transcripts, annual
 * reports), downloads them to Vercel Blob, and hands off to the existing
 * ingestDocument pipeline. You never upload a PDF by hand again.
 *
 * Key flows:
 *   scrapeAllAccounts()  — nightly cron: visits every account in parallel
 *   scrapeAccount(id)    — manual trigger for one company (POST /api/ir/scrape)
 *   learnSelectors(id)   — given a company + IR URL, learn page structure
 *   getIRStatus()        — returns per-company health snapshot for the UI
 *
 * Data stored in Upstash Redis:
 *   rachel:ir:{accountId}   → IRAccountData
 *   rachel:ir:urls:{accountId} → [already-ingested PDF URLs] (SET)
 */

import { parse as parseHTML } from "node-html-parser";
import { put as blobPut } from "@vercel/blob";
import { extractText, getDocumentProxy } from "unpdf";
import { redis } from "../redis";
import { ingestDocument } from "../kb/embed";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ReportType =
  | "earnings_release"
  | "presentation"
  | "transcript"
  | "annual_report"
  | "half_year_report"
  | "other_filing";

export type ReportingPattern = "quarterly" | "semi-annual" | "annual";

export interface IRReport {
  period: string; // "FY25Q2"
  type: ReportType;
  date: string; // ISO date
  url: string;
  blobKey?: string;
  docId?: string;
}

export interface IRNextReport {
  expectedPeriod: string;
  expectedDate: string; // ISO date
  confidence: "high" | "medium" | "low";
}

export interface IRSelector {
  /** CSS-like description of where reports are listed */
  reportsContainer: string;
  /** Regex pattern for link text that indicates a report */
  linkPattern: string;
  /** Last time the selectors were verified to work */
  verifiedAt: string;
}

export interface IRAccountData {
  accountId: string;
  company: string;
  irUrl: string;
  reportingPattern: ReportingPattern;
  latestReport?: IRReport;
  nextReport?: IRNextReport;
  irSelector?: IRSelector;
  lastScrapedAt?: string;
  lastScrapeStatus?: "ok" | "error" | "stale";
  lastError?: string;
  ingestedCount: number;
}

export type IRStatus = Pick<
  IRAccountData,
  | "accountId"
  | "company"
  | "irUrl"
  | "latestReport"
  | "nextReport"
  | "lastScrapedAt"
  | "lastScrapeStatus"
  | "ingestedCount"
>;

// ── Curated IR URL map ────────────────────────────────────────────────────────
// Maintained here, supplemented by redis. Values here are the ground truth;
// they can be overridden per-account by storing irUrl in IRAccountData.

const CURATED_IR_URLS: Record<string, { irUrl: string; pattern: ReportingPattern; company: string }> = {
  "carrefour": {
    irUrl: "https://www.carrefour.com/en/finance/regulated-information",
    pattern: "semi-annual",
    company: "Carrefour",
  },
  "lvmh": {
    irUrl: "https://www.lvmh.com/investors/publications-and-regulated-information/",
    pattern: "semi-annual",
    company: "LVMH",
  },
  "loreal": {
    irUrl: "https://www.loreal-finance.com/en/press-releases-publications/",
    pattern: "semi-annual",
    company: "L'Oréal",
  },
  "kering": {
    irUrl: "https://www.kering.com/en/finance/publications/",
    pattern: "semi-annual",
    company: "Kering",
  },
  "ahold": {
    irUrl: "https://www.aholddelhaize.com/investors/reports/",
    pattern: "quarterly",
    company: "Ahold Delhaize",
  },
  "inditex": {
    irUrl: "https://www.inditex.com/en/investors/investors_relations/financial_information",
    pattern: "semi-annual",
    company: "Inditex",
  },
  "hm": {
    irUrl: "https://hmgroup.com/investors/financial-reporting/interim-reports/",
    pattern: "quarterly",
    company: "H&M",
  },
  "unilever": {
    irUrl: "https://www.unilever.com/investors/results-and-presentations/",
    pattern: "semi-annual",
    company: "Unilever",
  },
  "tesco": {
    irUrl: "https://www.tescoplc.com/investors/reports-and-results/",
    pattern: "semi-annual",
    company: "Tesco",
  },
  "zalando": {
    irUrl: "https://corporate.zalando.com/en/investor-relations/financial-reports",
    pattern: "semi-annual",
    company: "Zalando",
  },
  "asos": {
    irUrl: "https://www.asosplc.com/investors/results-reports-and-presentations",
    pattern: "semi-annual",
    company: "ASOS",
  },
  "nestle": {
    irUrl: "https://www.nestle.com/investors/publications",
    pattern: "semi-annual",
    company: "Nestlé",
  },
  "nike": {
    irUrl: "https://investors.nike.com/investors/financial-information/sec-filings/default.aspx",
    pattern: "quarterly",
    company: "Nike",
  },
  "adidas": {
    irUrl: "https://www.adidas-group.com/en/investors/financial-reports/",
    pattern: "semi-annual",
    company: "Adidas",
  },
};

// ── PDF link detection ────────────────────────────────────────────────────────

/** Keywords that suggest a link is a financial report worth ingesting */
const REPORT_KEYWORDS = [
  "annual report",
  "annual-report",
  "half year",
  "half-year",
  "quarterly",
  "earnings",
  "results",
  "press release",
  "financial report",
  "investor presentation",
  "investor day",
  "full year",
  "full-year",
  "interim report",
  "q1", "q2", "q3", "q4",
  "fy2", "fy1",
  "rapport annuel",
  "résultats",
  "document de référence",
];

/** Keywords that indicate non-report PDFs to skip */
const SKIP_KEYWORDS = [
  "corporate governance",
  "proxy",
  "shareholder letter",
  "sustainability report",
  "csr report",
  "esg",
  "notice of",
  "agenda",
];

interface DiscoveredLink {
  url: string;
  text: string;
  type: ReportType;
}

function classifyReportType(text: string, url: string): ReportType {
  const combined = (text + " " + url).toLowerCase();
  if (combined.match(/annual|full.?year|rapport.?annuel|document.?r[eé]f[eé]rence/)) return "annual_report";
  if (combined.match(/half.?year|semi.?annual|interim|h1|h2|six.?month/)) return "half_year_report";
  if (combined.match(/earnings|results|r[eé]sultats|press.?release/)) return "earnings_release";
  if (combined.match(/presentation|deck|slides|investor.?day/)) return "presentation";
  if (combined.match(/transcript|call|webcast/)) return "transcript";
  return "other_filing";
}

function extractPdfLinks(html: string, baseUrl: string): DiscoveredLink[] {
  const root = parseHTML(html);
  const links: DiscoveredLink[] = [];
  const seen = new Set<string>();

  const anchors = root.querySelectorAll("a[href]");
  for (const a of anchors) {
    const href = a.getAttribute("href") ?? "";
    const text = a.textContent.trim().toLowerCase();

    // Must be a PDF or direct download link
    const isPdf = href.toLowerCase().includes(".pdf") || href.toLowerCase().includes("download");
    if (!isPdf) continue;

    // Must match at least one report keyword
    const combined = text + " " + href.toLowerCase();
    const isReport = REPORT_KEYWORDS.some((k) => combined.includes(k));
    if (!isReport) continue;

    // Skip governance, CSR, etc.
    const isSkip = SKIP_KEYWORDS.some((k) => combined.includes(k));
    if (isSkip) continue;

    // Resolve relative URLs
    let resolvedUrl = href;
    if (href.startsWith("/")) {
      const base = new URL(baseUrl);
      resolvedUrl = `${base.protocol}//${base.host}${href}`;
    } else if (!href.startsWith("http")) {
      resolvedUrl = new URL(href, baseUrl).toString();
    }

    if (seen.has(resolvedUrl)) continue;
    seen.add(resolvedUrl);

    links.push({
      url: resolvedUrl,
      text: a.textContent.trim(),
      type: classifyReportType(text, href),
    });
  }

  return links;
}

// ── Period estimation ─────────────────────────────────────────────────────────

function guessPeriod(url: string, text: string, date: Date): string {
  const combined = (url + " " + text).toLowerCase();
  const year = date.getFullYear();
  const q = Math.ceil((date.getMonth() + 1) / 3);

  if (combined.match(/q1/)) return `FY${year}Q1`;
  if (combined.match(/q2/)) return `FY${year}Q2`;
  if (combined.match(/q3/)) return `FY${year}Q3`;
  if (combined.match(/q4/)) return `FY${year}Q4`;
  if (combined.match(/h1|half.?year.*first|first.?half/)) return `FY${year}H1`;
  if (combined.match(/h2|half.?year.*second|second.?half/)) return `FY${year}H2`;
  if (combined.match(/annual|full.?year/)) return `FY${year}`;
  return `FY${year}Q${q}`;
}

function predictNextReport(
  latest: IRReport,
  pattern: ReportingPattern,
): IRNextReport {
  const lastDate = new Date(latest.date);
  const next = new Date(lastDate);

  switch (pattern) {
    case "quarterly":
      next.setDate(next.getDate() + 92); // ~3 months
      break;
    case "semi-annual":
      next.setDate(next.getDate() + 182); // ~6 months
      break;
    case "annual":
      next.setDate(next.getDate() + 365);
      break;
  }

  const year = next.getFullYear();
  const m = next.getMonth() + 1;

  let period: string;
  if (pattern === "quarterly") {
    period = `FY${year}Q${Math.ceil(m / 3)}`;
  } else if (pattern === "semi-annual") {
    period = m <= 6 ? `FY${year}H1` : `FY${year}H2`;
  } else {
    period = `FY${year}`;
  }

  return {
    expectedPeriod: period,
    expectedDate: next.toISOString().slice(0, 10),
    confidence: "medium",
  };
}

// ── Core scrape logic ─────────────────────────────────────────────────────────

async function isAlreadyIngested(url: string, accountId: string): Promise<boolean> {
  return (await redis.sismember(`rachel:ir:urls:${accountId}`, url)) === 1;
}

async function markIngested(url: string, accountId: string): Promise<void> {
  await redis.sadd(`rachel:ir:urls:${accountId}`, url);
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RachelIntelBot/1.0; +https://your-deployment.vercel.app)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function downloadAndIngestPdf(
  link: DiscoveredLink,
  accountId: string,
  company: string,
): Promise<{ blobKey: string; docId: string; period: string } | null> {
  try {
    const res = await fetch(link.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RachelIntelBot/1.0)",
      },
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;

    const buffer = await res.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Extract text from PDF
    const pdfDoc = await getDocumentProxy(bytes);
    const { text } = await extractText(pdfDoc, { mergePages: true });
    if (!text || text.trim().length < 100) return null;

    // Upload to Blob for archival
    const filename = link.url.split("/").pop() ?? `${accountId}-report.pdf`;
    const blob = await blobPut(`ir/${accountId}/${filename}`, new Blob([bytes], { type: "application/pdf" }), {
      access: "public",
      addRandomSuffix: true,
    });

    const now = new Date();
    const period = guessPeriod(link.url, link.text, now);

    // Ingest into KB
    const result = await ingestDocument({
      title: `${company} — ${link.text || period} (${link.type.replace(/_/g, " ")})`,
      text,
      source: "ir_filing",
      tier: 1,
      url: link.url,
      blobKey: blob.url,
      publishedAt: now.toISOString(),
      accountIds: [accountId],
      tags: [link.type, period, "earnings"],
    });

    return { blobKey: blob.url, docId: result.docId, period };
  } catch (e) {
    console.error(
      JSON.stringify({
        level: "error",
        msg: "ir_pdf_ingest_error",
        url: link.url,
        accountId,
        error: e instanceof Error ? e.message : String(e),
      }),
    );
    return null;
  }
}

export async function scrapeAccount(
  accountId: string,
  options?: { irUrl?: string },
): Promise<{ added: number; reports: IRReport[]; nextReport?: IRNextReport }> {
  const stored = (await redis.get<IRAccountData>(`rachel:ir:${accountId}`)) ?? null;
  const config =
    stored ??
    CURATED_IR_URLS[accountId.toLowerCase()] ??
    (options?.irUrl ? { irUrl: options.irUrl, pattern: "quarterly" as ReportingPattern, company: accountId } : null);

  if (!config) {
    throw new Error(`No IR URL configured for account: ${accountId}`);
  }

  const irUrl = options?.irUrl ?? (stored?.irUrl ?? config.irUrl);
  const pattern: ReportingPattern = stored?.reportingPattern ?? (config as { pattern: ReportingPattern }).pattern ?? "quarterly";
  const company = stored?.company ?? (config as { company: string }).company ?? accountId;

  const t0 = Date.now();
  console.log(JSON.stringify({ level: "info", msg: "ir_scrape_start", accountId, irUrl }));

  const html = await fetchPage(irUrl);
  if (!html) {
    const update: Partial<IRAccountData> = {
      lastScrapedAt: new Date().toISOString(),
      lastScrapeStatus: "error",
      lastError: "Failed to fetch IR page",
    };
    await redis.set(`rachel:ir:${accountId}`, { ...(stored ?? {}), ...update, accountId, company, irUrl, pattern, ingestedCount: stored?.ingestedCount ?? 0 }, { ex: 90 * 86400 });
    throw new Error(`Failed to fetch IR page for ${company}: ${irUrl}`);
  }

  const links = extractPdfLinks(html, irUrl);
  const newLinks = [];
  for (const link of links) {
    if (!(await isAlreadyIngested(link.url, accountId))) {
      newLinks.push(link);
    }
  }

  const addedReports: IRReport[] = [];
  for (const link of newLinks.slice(0, 5)) { // cap at 5 per run
    const result = await downloadAndIngestPdf(link, accountId, company);
    if (result) {
      await markIngested(link.url, accountId);
      addedReports.push({
        period: result.period,
        type: link.type,
        date: new Date().toISOString().slice(0, 10),
        url: link.url,
        blobKey: result.blobKey,
        docId: result.docId,
      });
    }
  }

  const latestReport = addedReports[0] ?? stored?.latestReport;
  const nextReport = latestReport ? predictNextReport(latestReport, pattern) : stored?.nextReport;

  const data: IRAccountData = {
    accountId,
    company,
    irUrl,
    reportingPattern: pattern,
    latestReport,
    nextReport,
    lastScrapedAt: new Date().toISOString(),
    lastScrapeStatus: "ok",
    ingestedCount: (stored?.ingestedCount ?? 0) + addedReports.length,
    irSelector: stored?.irSelector,
  };

  await redis.set(`rachel:ir:${accountId}`, data, { ex: 90 * 86400 });

  console.log(
    JSON.stringify({
      level: "info",
      msg: "ir_scrape_done",
      accountId,
      company,
      added: addedReports.length,
      ms: Date.now() - t0,
    }),
  );

  return { added: addedReports.length, reports: addedReports, nextReport };
}

export async function scrapeAllAccounts(slugFilter?: string[]): Promise<{
  total: number;
  added: number;
  errors: number;
  skipped: number;
  results: Record<string, { added: number; error?: string }>;
}> {
  const accountIds = Object.keys(CURATED_IR_URLS);

  // Also pick up any accounts stored in redis that aren't in the curated map
  const redisKeys = await redis.keys("rachel:ir:*");
  const redisIds = redisKeys
    .filter((k) => !k.includes(":urls:"))
    .map((k) => k.replace("rachel:ir:", ""))
    .filter((id) => !accountIds.includes(id));
  accountIds.push(...redisIds);

  // Apply slug filter if provided (earnings-window throttle).
  const filtered = slugFilter
    ? accountIds.filter((id) => slugFilter.includes(id))
    : accountIds;
  const skipped = accountIds.length - filtered.length;

  const results: Record<string, { added: number; error?: string }> = {};
  let totalAdded = 0;
  let errors = 0;

  // Scrape with a concurrency limit of 3 to avoid hammering IR pages
  const chunks: string[][] = [];
  for (let i = 0; i < filtered.length; i += 3) {
    chunks.push(filtered.slice(i, i + 3));
  }

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (id) => {
        try {
          const r = await scrapeAccount(id);
          results[id] = { added: r.added };
          totalAdded += r.added;
        } catch (e) {
          errors++;
          results[id] = { added: 0, error: e instanceof Error ? e.message : String(e) };
        }
      }),
    );
  }

  return { total: filtered.length, added: totalAdded, errors, skipped, results };
}

export async function getIRStatus(): Promise<IRStatus[]> {
  const accountIds = Object.keys(CURATED_IR_URLS);
  const statuses: IRStatus[] = [];

  for (const id of accountIds) {
    const stored = await redis.get<IRAccountData>(`rachel:ir:${id}`);
    const config = CURATED_IR_URLS[id];

    statuses.push({
      accountId: id,
      company: stored?.company ?? config.company,
      irUrl: stored?.irUrl ?? config.irUrl,
      latestReport: stored?.latestReport,
      nextReport: stored?.nextReport,
      lastScrapedAt: stored?.lastScrapedAt,
      lastScrapeStatus: stored?.lastScrapeStatus ?? (stored ? "ok" : "stale"),
      ingestedCount: stored?.ingestedCount ?? 0,
    });
  }

  return statuses;
}

export async function learnSelectors(
  accountId: string,
  irUrl: string,
  company: string,
  pattern: ReportingPattern = "quarterly",
): Promise<{ learned: boolean; linkCount: number }> {
  const html = await fetchPage(irUrl);
  if (!html) return { learned: false, linkCount: 0 };

  const links = extractPdfLinks(html, irUrl);

  // Derive a simple "selector" description from what we found
  const hasTable = html.toLowerCase().includes("<table");
  const hasList = html.toLowerCase().includes("<ul") || html.toLowerCase().includes("<ol");
  const containerDesc = hasTable ? "table" : hasList ? "list" : "page";

  const selector: IRSelector = {
    reportsContainer: containerDesc,
    linkPattern: REPORT_KEYWORDS.slice(0, 5).join("|"),
    verifiedAt: new Date().toISOString(),
  };

  const existing = await redis.get<IRAccountData>(`rachel:ir:${accountId}`);
  const data: IRAccountData = {
    accountId,
    company,
    irUrl,
    reportingPattern: pattern,
    irSelector: selector,
    lastScrapedAt: existing?.lastScrapedAt,
    lastScrapeStatus: existing?.lastScrapeStatus ?? "ok",
    ingestedCount: existing?.ingestedCount ?? 0,
    latestReport: existing?.latestReport,
    nextReport: existing?.nextReport,
  };
  await redis.set(`rachel:ir:${accountId}`, data, { ex: 90 * 86400 });

  return { learned: true, linkCount: links.length };
}
