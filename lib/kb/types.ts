/**
 * Rachel v2 Knowledge Base — shared types.
 *
 * The KB is the grounding layer for every agentic output. Anything that
 * lands on a dashboard surface (pulse, brief, memo, provocation) MUST cite
 * at least one chunk retrieved through this layer. No source, no output.
 */

export type DocTier = 1 | 2 | 3;

export type DocSource =
  | "strategy_firm" // BCG / McKinsey / Bain / Deloitte public exec summary
  | "vendor_stack" // Microsoft / Google / Anthropic retail product pages
  | "ir_filing" // Investor relations page: earnings, deck, transcript
  | "industry_press" // Retail Dive, BoF, Modern Retail, etc.
  | "analyst_report" // Forrester / Gartner / eMarketer public
  | "framework" // Evergreen executive frameworks
  | "josh_briefing" // Gmail morning briefing from Josh
  | "manual_upload"; // Fallback for off-cycle material

export interface DocMetadata {
  id: string;
  title: string;
  source: DocSource;
  tier: DocTier;
  url?: string;
  blobKey?: string;
  ingestedAt: string; // ISO
  publishedAt?: string; // ISO — when the doc was published by its source
  /** Watchlist account IDs this doc is about. */
  accountIds?: string[];
  /** Free-form tags: "earnings", "Q2FY25", "personalization", etc. */
  tags?: string[];
  chunkCount: number;
  /** SHA-256 of the raw text — idempotency key for re-ingestion. */
  contentHash: string;
}

export interface KbChunk {
  id: string; // `${docId}::${index}`
  docId: string;
  index: number;
  text: string;
  /** Character offsets in the source doc, for "jump back to the passage" UX. */
  startOffset: number;
  endOffset: number;
}

export interface KbSearchResult {
  chunk: KbChunk;
  doc: DocMetadata;
  /** Cosine similarity in [0, 1]. Higher is better. */
  score: number;
}

export interface KbSearchQuery {
  query: string;
  tier?: DocTier;
  source?: DocSource;
  accountId?: string;
  topK?: number;
  /** Minimum score (0–1). Defaults to 0.25 — filters embedding noise. */
  minScore?: number;
}
