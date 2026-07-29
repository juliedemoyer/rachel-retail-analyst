/**
 * lib/extract/ir-extract.ts
 *
 * Server-side orchestrator for the LLM field-extraction pipeline.
 * Called by /api/cron?job=ir-extract (and future ingest webhooks).
 *
 * Reads the PDF manifest from Redis (written there by the upload script),
 * groups by slug, and calls proposeFields() for each company that needs it.
 *
 * Skips companies that already have a pending candidate created within
 * SKIP_IF_RECENT_DAYS days (to avoid duplicate proposals on re-runs).
 *
 * Runs sequentially (not parallel) to stay within Vercel's 300 s
 * maxDuration and avoid hammering the Anthropic API.
 */

import { redis } from "@/lib/redis";
import {
  proposeFields,
  buildSystemPrompt,
  buildUserPrompt,
  parseExtractionResponse,
} from "./propose-fields";
import { proposeFieldsBatch, type BatchInput } from "./batch-extract";
import { writeCandidate, readPendingCandidates, readAllCandidates } from "@/lib/profiles/store";

// ── Manifest types (mirrors upload-pdfs-to-blob.ts) ─────────────────────────

interface ManifestEntry {
  slug: string;
  filename: string;
  localPath: string;
  blobUrl: string;
  docType: string;
  period: string;
  uploadedAt: string;
}

interface Manifest {
  updatedAt: string;
  files: ManifestEntry[];
}

const MANIFEST_KEY = "rachel:pdf-manifest";
const CALENDAR_KEY = "rachel:calendar";
const SKIP_IF_RECENT_DAYS = 90; // fallback when no earnings date available

// ── Helpers ───────────────────────────────────────────────────────────────────

async function loadManifest(): Promise<Manifest | null> {
  return redis.get<Manifest>(MANIFEST_KEY);
}

function groupBySlug(entries: ManifestEntry[]): Map<string, ManifestEntry[]> {
  const map = new Map<string, ManifestEntry[]>();
  for (const e of entries) {
    const list = map.get(e.slug) ?? [];
    list.push(e);
    map.set(e.slug, list);
  }
  return map;
}

interface CalendarEntry { slug: string; last_earnings: string; next_earnings_date: string }
interface Calendar { entries: CalendarEntry[] }

async function loadEarningsMap(): Promise<Map<string, string>> {
  const cal = await redis.get<Calendar>(CALENDAR_KEY);
  const map = new Map<string, string>();
  for (const e of cal?.entries ?? []) {
    if (e.slug && e.last_earnings) map.set(e.slug, e.last_earnings);
  }
  return map;
}

/**
 * Skip extraction if we already have a candidate produced AFTER the company's
 * last earnings date (meaning we already ran for this reporting cycle).
 * Falls back to the 90-day rolling window when no calendar entry exists.
 */
async function hasRecentCandidate(
  slug: string,
  allCandidates: Awaited<ReturnType<typeof readAllCandidates>>,
  earningsMap: Map<string, string>,
): Promise<boolean> {
  const lastEarnings = earningsMap.get(slug);
  if (lastEarnings) {
    const cutoff = new Date(lastEarnings);
    return allCandidates.some((c) => c.slug === slug && new Date(c.ts) > cutoff);
  }
  // Fallback: 90-day rolling window
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - SKIP_IF_RECENT_DAYS);
  return allCandidates.some((c) => c.slug === slug && new Date(c.ts) > cutoff);
}

// ── Public interface ──────────────────────────────────────────────────────────

export interface IrExtractOptions {
  /** If provided, only extract these slugs. Otherwise extract all in manifest. */
  slugs?: string[];
  /** Re-extract even if a recent candidate exists. */
  force?: boolean;
}

export interface IrExtractResult {
  processed: string[];
  skipped: string[];
  failed: { slug: string; error: string }[];
}

/**
 * Run LLM extraction for one or more companies.
 * Designed to be called from the cron route or post-ingest webhook.
 */
export async function runIrExtract(
  options: IrExtractOptions = {},
): Promise<IrExtractResult> {
  const { slugs: onlySlugs, force = false } = options;

  const manifest = await loadManifest();
  if (!manifest) {
    throw new Error(
      "PDF manifest not found in Redis. Run scripts/upload-pdfs-to-blob.ts and then scripts/push-manifest-to-redis.ts.",
    );
  }

  const bySlug = groupBySlug(manifest.files);
  const targetSlugs = onlySlugs
    ? onlySlugs.filter((s) => bySlug.has(s))
    : [...bySlug.keys()].sort();

  if (onlySlugs) {
    const missing = onlySlugs.filter((s) => !bySlug.has(s));
    if (missing.length) {
      console.warn(
        `[ir-extract] slugs not found in manifest: ${missing.join(", ")}`,
      );
    }
  }

  const pending = await readPendingCandidates();
  const allCandidates = await readAllCandidates();
  const earningsMap = await loadEarningsMap();
  const result: IrExtractResult = { processed: [], skipped: [], failed: [] };

  // Build the work list (deduped against recent candidates).
  const workList: Array<{ slug: string; companyName: string; sources: string[] }> = [];
  for (const slug of targetSlugs) {
    const entries = bySlug.get(slug)!;

    if (!force && (await hasRecentCandidate(slug, allCandidates, earningsMap))) {
      console.log(
        `[ir-extract] ${slug}: skipped — pending candidate < ${SKIP_IF_RECENT_DAYS} days old`,
      );
      result.skipped.push(slug);
      continue;
    }

    const sources = entries
      .map((e) => (e.blobUrl?.startsWith("http") ? e.blobUrl : e.localPath))
      .filter(Boolean);

    const companyName = entries[0]?.filename.split("_")[0] ?? slug;
    workList.push({ slug, companyName, sources });
  }

  // Branch on feature flag: batch (50% discount, async) vs sync.
  const useBatch = process.env.IR_EXTRACT_USE_BATCH === "true";

  if (useBatch && workList.length > 0) {
    console.log(
      `[ir-extract] using BATCH path (IR_EXTRACT_USE_BATCH=true) for ${workList.length} companies`,
    );
    try {
      const batchInputs: BatchInput[] = workList.map((w) => ({
        slug: w.slug,
        companyName: w.companyName,
        pdfSources: w.sources,
      }));
      const batchResult = await proposeFieldsBatch(
        batchInputs,
        buildSystemPrompt,
        buildUserPrompt,
        parseExtractionResponse,
      );

      if (batchResult.status === "completed" && batchResult.candidates) {
        for (const candidate of batchResult.candidates) {
          await writeCandidate(candidate);
          result.processed.push(candidate.slug);
        }
        for (const failure of batchResult.failures ?? []) {
          result.failed.push(failure);
        }
      } else if (batchResult.status === "in_progress") {
        // Submitted but timed out our poll. Treat as "pending" — a follow-up
        // poller cron will collect later. For this run, mark as skipped with
        // the batch ID in the error field so it shows up in logs.
        for (const slug of batchResult.pendingSlugs ?? []) {
          result.failed.push({
            slug,
            error: `batch ${batchResult.batchId} still in_progress — will poll later`,
          });
        }
      } else {
        for (const failure of batchResult.failures ?? []) {
          result.failed.push(failure);
        }
      }
    } catch (err) {
      // Batch path failed — record all slugs as failed. Caller can retry
      // with IR_EXTRACT_USE_BATCH=false to fall back to sync.
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[ir-extract] BATCH PATH FAILED: ${message}`);
      for (const w of workList) {
        result.failed.push({ slug: w.slug, error: `batch path failed: ${message}` });
      }
    }
  } else {
    // Original sync path — one LLM call per company, sequentially.
    for (const w of workList) {
      try {
        console.log(
          `[ir-extract] ${w.slug}: extracting from ${w.sources.length} PDF(s)…`,
        );
        const candidate = await proposeFields({
          slug: w.slug,
          companyName: w.companyName,
          pdfSources: w.sources,
        });
        await writeCandidate(candidate);
        console.log(
          `[ir-extract] ${w.slug}: candidate written — ${Object.keys(candidate.proposedFields).length} fields`,
        );
        result.processed.push(w.slug);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const errType = err instanceof Error ? err.constructor.name : typeof err;
        const errStack =
          err instanceof Error && err.stack
            ? err.stack.split("\n").slice(0, 5).join(" | ")
            : "";
        console.error(
          `[ir-extract] ${w.slug}: FAILED type=${errType} msg=${message} stack=${errStack}`,
        );
        result.failed.push({ slug: w.slug, error: message });
      }
    }
  }

  console.log(
    `[ir-extract] done — processed=${result.processed.length} skipped=${result.skipped.length} failed=${result.failed.length}`,
  );
  return result;
}
