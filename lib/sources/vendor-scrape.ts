/**
 * Vendor Retail Stack Diff — Phase 2, Pillar 2.
 *
 * Weekly scrape of Microsoft Retail Industry Cloud, Google Cloud Retail,
 * and Anthropic's retail/enterprise pages. Diffs against last week's
 * snapshot; if anything changed, ingests the new content and posts a
 * pulse item flagging the change.
 *
 * Called by Monday cron at /api/cron/vendor-diff.
 */

import { redis } from "../redis";
import { ingestDocument } from "../kb/embed";
import type { DocSource } from "../kb/types";

// ── Vendor page registry ──────────────────────────────────────────────────────

export interface VendorPage {
  vendor: "microsoft" | "google" | "anthropic";
  id: string;
  name: string;
  url: string;
  /** Minimum character change to flag as material */
  changeThreshold: number;
}

export const VENDOR_PAGES: VendorPage[] = [
  // Microsoft
  {
    vendor: "microsoft",
    id: "ms_retail_industry_cloud",
    name: "Microsoft Cloud for Retail",
    url: "https://www.microsoft.com/en-us/industry/retail/microsoft-cloud-for-retail",
    changeThreshold: 200,
  },
  {
    vendor: "microsoft",
    id: "ms_copilot_retail",
    name: "Microsoft Copilot for Retail",
    url: "https://www.microsoft.com/en-us/industry/retail/store-operations",
    changeThreshold: 150,
  },
  {
    vendor: "microsoft",
    id: "ms_dynamics365_commerce",
    name: "Microsoft Dynamics 365 Commerce",
    url: "https://www.microsoft.com/en-us/dynamics-365/products/commerce",
    changeThreshold: 150,
  },
  // Google
  {
    vendor: "google",
    id: "google_vertex_search_commerce",
    name: "Google Vertex AI Search for Commerce",
    url: "https://cloud.google.com/solutions/retail",
    changeThreshold: 200,
  },
  {
    vendor: "google",
    id: "google_recommendations_ai",
    name: "Google Recommendations AI",
    url: "https://cloud.google.com/recommendations",
    changeThreshold: 150,
  },
  // Anthropic
  {
    vendor: "anthropic",
    id: "anthropic_enterprise",
    name: "Claude for Enterprise",
    url: "https://www.anthropic.com/enterprise",
    changeThreshold: 150,
  },
  {
    vendor: "anthropic",
    id: "anthropic_retail_case_studies",
    name: "Anthropic Customer Stories",
    url: "https://www.anthropic.com/customers",
    changeThreshold: 100,
  },
];

// ── Text extraction ───────────────────────────────────────────────────────────

function extractVisibleText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 20_000); // cap at 20k chars for diffing
}

async function fetchPageText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RachelIntelBot/1.0; +https://your-deployment.vercel.app)",
        "Accept": "text/html",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return extractVisibleText(html);
  } catch {
    return null;
  }
}

// ── Simple text diff ──────────────────────────────────────────────────────────

function simpleDiff(
  prev: string,
  curr: string,
): { changed: boolean; addedChars: number; removedChars: number } {
  const addedChars = Math.max(0, curr.length - prev.length);
  const removedChars = Math.max(0, prev.length - curr.length);
  const netChange = Math.abs(curr.length - prev.length);
  return { changed: netChange > 0, addedChars, removedChars };
}

// ── Per-page scrape ───────────────────────────────────────────────────────────

export interface VendorDiffResult {
  vendor: string;
  page: string;
  changed: boolean;
  addedChars: number;
  docId?: string;
  error?: string;
}

const SOURCE_MAP: Record<string, DocSource> = {
  microsoft: "vendor_stack",
  google: "vendor_stack",
  anthropic: "vendor_stack",
};

export async function scrapeVendorPage(page: VendorPage): Promise<VendorDiffResult> {
  const snapshotKey = `rachel:vendor-snapshot:${page.id}`;

  try {
    const currentText = await fetchPageText(page.url);
    if (!currentText) {
      return { vendor: page.vendor, page: page.id, changed: false, addedChars: 0, error: "Fetch failed" };
    }

    const prevSnapshot = (await redis.get<string>(snapshotKey)) ?? "";
    const { changed, addedChars, removedChars } = simpleDiff(prevSnapshot, currentText);

    const isMaterial = addedChars >= page.changeThreshold || removedChars >= page.changeThreshold;

    // Always update snapshot
    await redis.set(snapshotKey, currentText, { ex: 30 * 86400 });

    if (!isMaterial) {
      return { vendor: page.vendor, page: page.id, changed: false, addedChars };
    }

    // Material change — ingest
    const result = await ingestDocument({
      title: `${page.name} — weekly update`,
      text: currentText,
      source: SOURCE_MAP[page.vendor],
      tier: 1,
      url: page.url,
      publishedAt: new Date().toISOString(),
      tags: ["vendor_diff", page.vendor, page.id],
    });

    // Update vendor catalog metadata
    await redis.hset(`rachel:vendor-catalog-meta:${page.vendor}:${page.id}`, {
      lastDiffAt: new Date().toISOString(),
      lastDocId: result.docId,
      addedChars,
      removedChars,
    });

    console.log(
      JSON.stringify({
        level: "info",
        msg: "vendor_diff_material_change",
        vendor: page.vendor,
        page: page.id,
        addedChars,
        removedChars,
        docId: result.docId,
      }),
    );

    return { vendor: page.vendor, page: page.id, changed: true, addedChars, docId: result.docId };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    return { vendor: page.vendor, page: page.id, changed: false, addedChars: 0, error };
  }
}

export async function diffAllVendorPages(): Promise<{
  total: number;
  changed: number;
  results: VendorDiffResult[];
}> {
  const results: VendorDiffResult[] = [];
  const chunks: VendorPage[][] = [];
  for (let i = 0; i < VENDOR_PAGES.length; i += 3) {
    chunks.push(VENDOR_PAGES.slice(i, i + 3));
  }

  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk.map(scrapeVendorPage));
    results.push(...chunkResults);
  }

  const changed = results.filter((r) => r.changed).length;
  return { total: results.length, changed, results };
}
