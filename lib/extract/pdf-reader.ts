/**
 * PDF text extraction with AI-relevance filtering.
 *
 * Design goal: scale gracefully with N PDFs per company.
 *
 * For each PDF we:
 *   1. Infer doc type and reporting period from the filename.
 *   2. Extract full text via unpdf (pdfjs, zero native deps).
 *   3. Filter to AI-relevant sections within a per-doc-type character budget.
 *
 * The caller (propose-fields.ts) then merges excerpts from all PDFs for a
 * company into a single context window, sorted by recency + signal priority,
 * capped at TOTAL_CONTEXT_BUDGET chars before handing off to the LLM.
 */

import { readFile } from "node:fs/promises";
import { extractText, getDocumentProxy } from "unpdf";
import { get as blobGet } from "@vercel/blob";

// ── Document type taxonomy ─────────────────────────────────────────────────────

export const DOC_TYPES = [
  "transcript",           // earnings call Q&A transcript — highest AI signal density
  "results_presentation", // slides / investor day deck
  "press_release",        // RNS, earnings release, aide-memoire
  "annual_report",        // full annual/sustainability report — long, use AI sections only
  "fact_sheet",           // financial supplement, summary report
  "other",
] as const;

export type DocType = (typeof DOC_TYPES)[number];

/** Lower = higher priority in context building. */
export const DOC_PRIORITY: Record<DocType, number> = {
  transcript:           1,
  results_presentation: 2,
  press_release:        3,
  annual_report:        4,
  fact_sheet:           5,
  other:                6,
};

/**
 * Max characters extracted per document type.
 *
 * Tightened 2026-05-11 alongside TOTAL_CONTEXT_BUDGET cut. Transcripts dropped
 * from 15K → 11K (the front of the call already concentrates the AI signal).
 * Other types untouched — they were already lean. Each can be tuned via env
 * var if eval reveals a regression (e.g. IR_EXTRACT_BUDGET_TRANSCRIPT=15000).
 */
function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  if (!v) return fallback;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const DOC_CHAR_BUDGET: Record<DocType, number> = {
  transcript:           envInt("IR_EXTRACT_BUDGET_TRANSCRIPT", 11_000),
  results_presentation: envInt("IR_EXTRACT_BUDGET_PRESENTATION", 8_000),
  press_release:        envInt("IR_EXTRACT_BUDGET_PRESS_RELEASE", 5_000),
  annual_report:        envInt("IR_EXTRACT_BUDGET_ANNUAL_REPORT", 5_000),
  fact_sheet:           envInt("IR_EXTRACT_BUDGET_FACT_SHEET", 2_500),
  other:                envInt("IR_EXTRACT_BUDGET_OTHER", 1_500),
};

/**
 * Total chars fed to the LLM per company regardless of how many PDFs exist.
 *
 * Cut 40K → 25K on 2026-05-11 as part of the Anthropic credit-burn optimization.
 * Rationale: the per-doc-type filtering already concentrates AI-relevant
 * paragraphs at the top of the budget. Spot-checks on LVMH and L'Oréal show
 * that fields beyond char ~25K are mostly filler or repeats of earlier
 * content. Override via env if eval shows extraction quality regression.
 */
export const TOTAL_CONTEXT_BUDGET = envInt("IR_EXTRACT_TOTAL_BUDGET", 25_000); // ~6 k tokens

// ── Relevance filtering ────────────────────────────────────────────────────────

const AI_KEYWORDS = [
  "artificial intelligence",
  " ai ",
  " ai,",
  " ai.",
  " ai\n",
  "(ai)",
  "machine learning",
  "generative",
  "genai",
  "gen ai",
  "large language model",
  "llm",
  "digital transformation",
  "automation",
  "data science",
  "recommendation",
  "personalisation",
  "personalization",
  "neural network",
  "computer vision",
  "natural language",
  "chatbot",
  "co-pilot",
  "copilot",
  "azure openai",
  "google cloud ai",
  "vertex ai",
  "microsoft ai",
  "anthropic",
  "openai",
  "foundation model",
  "deep learning",
  "predictive",
  "algorithm",
  "data-driven",
  "analytics platform",
];

function countKeywords(text: string): number {
  const lower = text.toLowerCase();
  let hits = 0;
  for (const kw of AI_KEYWORDS) {
    let pos = 0;
    while ((pos = lower.indexOf(kw, pos)) !== -1) {
      hits++;
      pos += kw.length;
    }
  }
  return hits;
}

/**
 * Filter text to AI-relevant sections within a character budget.
 *
 * Transcripts are returned verbatim (trimmed to budget) — they are already
 * dense with signal and require sequential reading.
 *
 * All other document types are paragraph-ranked: paragraphs with AI keyword
 * hits come first; a small structural prefix (first 3 paragraphs) is appended
 * to preserve document context.
 */
export function extractRelevantSections(
  raw: string,
  docType: DocType,
  budget: number,
): string {
  const text = raw.trim();
  if (!text) return "";

  // Transcripts: sequential reading preserves speaker attribution. Take from
  // the start (budget-limited). The full transcript is already AI-filtered
  // by the subject matter.
  if (docType === "transcript") {
    return text.slice(0, budget);
  }

  // All other types: paragraph-level relevance ranking.
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 40);

  const scored = paragraphs.map((p) => ({ text: p, score: countKeywords(p) }));

  // High-relevance paragraphs first, then a short structural prefix.
  const relevant = scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score);

  const structural = scored.filter((p) => p.score === 0).slice(0, 3);

  const sections: string[] = [];
  let used = 0;

  for (const p of relevant) {
    if (used + p.text.length > budget) break;
    sections.push(p.text);
    used += p.text.length;
  }

  // Add structural context only if budget allows (max 20% of budget).
  const structBudget = Math.floor(budget * 0.2);
  for (const p of structural) {
    if (used + p.text.length > budget || p.text.length > structBudget) break;
    sections.push(p.text);
    used += p.text.length;
  }

  // FALLBACK: if AI-keyword filtering produced very little content but the
  // raw document has substantial text, fall back to the full raw text (within
  // budget). This ensures financial fields (revenue, profit, employees, stores)
  // are captured from docs that do not heavily discuss AI — which is most
  // press releases, fact sheets, and non-English annual reports. The LLM
  // extraction prompt handles both AI and investor-snapshot fields, so
  // financial-only context is still valuable.
  if (used < 400 && text.length > 400) {
    return text.slice(0, budget);
  }

  return sections.join("\n\n");
}

// ── Period parsing ─────────────────────────────────────────────────────────────

/**
 * Infer reporting period from filename.
 * "LVMH_full-year-results-presentation-fy2025.pdf" → "fy2025"
 * "Diageo_interim-results-h1-fy26.pdf" → "h1-fy26"
 */
export function inferPeriod(filename: string): string {
  const lower = (filename.split("/").pop() ?? filename)
    .toLowerCase()
    .replace(/\.pdf$/i, "");

  // Match period tokens in order of specificity.
  const m = lower.match(
    /(q[1-4]-fy\d{2,4}|h[12]-fy\d{2,4}|fy\d{4}-q[1-4]|fy\d{2,4}|q[1-4]-\d{4}|\d{4}-q[1-4])/,
  );
  return m ? m[1] : "unknown";
}

/**
 * Convert a period string to a sortable integer (higher = more recent).
 * fy2025 → 20250, h1-fy26 → 20261, q2-fy26 → 20262
 */
export function periodSortKey(period: string): number {
  const lower = period.toLowerCase();

  // fy2025 or fy25 → base year
  const fyFull = lower.match(/^fy(\d{4})$/);
  if (fyFull) return parseInt(fyFull[1]) * 10;

  const fyShort = lower.match(/^fy(\d{2})$/);
  if (fyShort) return (2000 + parseInt(fyShort[1])) * 10;

  // h1-fy26 → 20261, h2-fy26 → 20262
  const half = lower.match(/^h([12])-fy(\d{2,4})$/);
  if (half) {
    const yr = half[2].length === 2 ? 2000 + parseInt(half[2]) : parseInt(half[2]);
    return yr * 10 + parseInt(half[1]);
  }

  // q2-fy26 → 20262, q4-fy25 → 20254
  const qtr = lower.match(/^q([1-4])-fy(\d{2,4})$/);
  if (qtr) {
    const yr = qtr[2].length === 2 ? 2000 + parseInt(qtr[2]) : parseInt(qtr[2]);
    return yr * 10 + parseInt(qtr[1]);
  }

  return 0;
}

// ── Doc type inference ─────────────────────────────────────────────────────────

export function inferDocType(filename: string): DocType {
  const lower = (filename.split("/").pop() ?? filename).toLowerCase();

  if (
    lower.includes("transcript") ||
    lower.includes("q-and-a") ||
    lower.includes("prepared-remarks") ||
    lower.includes("management-prepared")
  ) {
    return "transcript";
  }
  if (
    lower.includes("presentation") ||
    lower.includes("investor-call") ||
    lower.includes("analyst-presentation") ||
    lower.includes("investor-day")
  ) {
    return "results_presentation";
  }
  if (
    lower.includes("press-release") ||
    lower.includes("rns") ||
    lower.includes("earnings-release") ||
    lower.includes("aide-memoire") ||
    lower.includes("trading-update") ||
    lower.includes("trading-statement")
  ) {
    return "press_release";
  }
  if (
    lower.includes("annual-report") ||
    lower.includes("annual-summary") ||
    lower.includes("urd-") ||
    lower.includes("10-k") ||
    lower.includes("10q") ||
    lower.includes("10-q")
  ) {
    return "annual_report";
  }
  if (
    lower.includes("fact-sheet") ||
    lower.includes("financial-supplement") ||
    lower.includes("summary-report") ||
    lower.includes("definitions") ||
    lower.includes("abridged")
  ) {
    return "fact_sheet";
  }
  return "other";
}

// ── Public interface ───────────────────────────────────────────────────────────

export interface PdfExcerpt {
  /** Original filename (no directory path). */
  filename: string;
  docType: DocType;
  period: string;
  /** AI-relevant text, within per-doc-type budget. */
  text: string;
  charCount: number;
}

/**
 * Read bytes from either a local path or a Vercel Blob URL (public or private).
 *
 * For https:// URLs we use @vercel/blob's get() which handles private-store
 * authentication via BLOB_READ_WRITE_TOKEN automatically. Falls back to
 * plain fetch for non-Blob URLs (unlikely in practice).
 */
async function readPdfBytes(source: string): Promise<Uint8Array> {
  if (source.startsWith("http://") || source.startsWith("https://")) {
    // Use @vercel/blob get() so private-store auth is handled automatically.
    const result = await blobGet(source, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error(`Blob get failed for ${source}`);
    }
    const chunks: Uint8Array[] = [];
    const reader = result.stream.getReader();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const total = chunks.reduce((n, c) => n + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }
  const buf = await readFile(source);
  return new Uint8Array(buf);
}

/**
 * Extract an AI-relevant excerpt from a PDF.
 *
 * `source` can be a local filesystem path or a Vercel Blob https:// URL.
 */
export async function readPdfExcerpt(source: string): Promise<PdfExcerpt> {
  const filename = (source.split("/").pop() ?? source).split("?")[0]; // strip query params
  const docType = inferDocType(filename);
  const period = inferPeriod(filename);
  const budget = DOC_CHAR_BUDGET[docType];

  const bytes = await readPdfBytes(source);
  const pdf = await getDocumentProxy(bytes);
  const { text } = await extractText(pdf, { mergePages: true });
  const raw = Array.isArray(text) ? text.join("\n\n") : (text ?? "");

  const filtered = extractRelevantSections(raw, docType, budget);

  return {
    filename,
    docType,
    period,
    text: filtered,
    charCount: filtered.length,
  };
}

/**
 * Build a single context string from N excerpts for one company.
 *
 * Sorts excerpts: recency DESC, then priority ASC (transcript before report).
 * Stops adding excerpts once TOTAL_CONTEXT_BUDGET is reached.
 *
 * Safe to call with 1 PDF or 20 PDFs — the budget cap is the only constraint.
 */
export function buildCompanyContext(
  companyName: string,
  excerpts: PdfExcerpt[],
): string {
  // Sort: newest period first; break ties by doc priority (lower = more important).
  const sorted = [...excerpts].sort((a, b) => {
    const periodDiff = periodSortKey(b.period) - periodSortKey(a.period);
    if (periodDiff !== 0) return periodDiff;
    return DOC_PRIORITY[a.docType] - DOC_PRIORITY[b.docType];
  });

  const included: PdfExcerpt[] = [];
  let used = 0;

  for (const ex of sorted) {
    if (!ex.text) continue;
    if (used >= TOTAL_CONTEXT_BUDGET) break;
    const available = TOTAL_CONTEXT_BUDGET - used;
    if (ex.text.length > available) {
      // Include a truncated slice rather than skipping entirely.
      included.push({ ...ex, text: ex.text.slice(0, available), charCount: available });
      used = TOTAL_CONTEXT_BUDGET;
    } else {
      included.push(ex);
      used += ex.charCount;
    }
  }

  if (included.length === 0) return "";

  const header = `## ${companyName} — Source Documents (${included.length} of ${excerpts.length} PDFs, ${used.toLocaleString()} chars)`;

  const sections = included.map(
    (ex, i) =>
      `### [${i + 1}/${included.length}] ${ex.period.toUpperCase()} — ${ex.docType.replace(/_/g, " ")} (${ex.filename})\n\n${ex.text}`,
  );

  return [header, ...sections].join("\n\n---\n\n");
}
