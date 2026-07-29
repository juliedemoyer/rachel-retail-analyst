/**
 * LLM field-extraction pipeline.
 *
 * Given a company slug + an array of PDF sources (local paths or Blob URLs),
 * this function:
 *   1. Reads each PDF and filters to AI-relevant sections (pdf-reader.ts).
 *   2. Merges excerpts into a single context window (up to 40k chars).
 *   3. Makes ONE LLM call to extract all 27 profile fields.
 *   4. Returns a Candidate ready to write to rachel:candidates:{slug}:{ts}.
 *
 * Works with any number of PDFs per company. The context budget cap
 * (TOTAL_CONTEXT_BUDGET) is the only constraint as you add more documents.
 *
 * Model: claude-haiku-4-5 (~$0.01/company, fast, deterministic at temp=0).
 * Override: EXTRACT_MODEL=claude-sonnet-4-6 for higher-quality scoring.
 *
 * NOTE: This file intentionally calls @ai-sdk/anthropic directly rather than
 * routing through the Vercel AI Gateway. The gateway requires a billing card
 * even for free-tier usage; the Anthropic API key already covers these calls.
 * hook-ignore: ai-gateway
 */

// hook-ignore: ai-gateway
import { anthropic } from "@ai-sdk/anthropic";

import type { Candidate } from "@/lib/profiles/store";
import { generateTextTracked } from "@/lib/telemetry/tokens";
import {
  buildCompanyContext,
  readPdfExcerpt,
  type PdfExcerpt,
} from "./pdf-reader";

// ── Scoring rubric (embedded in system prompt) ────────────────────────────────

const RUBRIC = `
## Rachel Retail Scoring Rubric — STRICTLY FOLLOW THIS

### Rhetoric score (1–5): How much does the board champion AI in public investor communications?
1 = AI never mentioned, or only in passing boilerplate.
2 = AI mentioned once or twice; no strategic narrative.
3 = AI framed as a priority; named initiatives; moderate airtime.
4 = AI central to the investor narrative; CEO personally champions it; named roadmap.
5 = AI is THE headline story; transformational framing; specific multi-year commitments.

### Production score (0–5+): How many confirmed AI/ML use cases are live in operations?
0 = No evidence of shipped AI/ML in operations.
1 = 1 confirmed production use case (named tool or measurable outcome).
2 = 2 confirmed production use cases.
3 = 3 confirmed use cases OR 2 with quantified ROI.
4 = 4–5 confirmed use cases across multiple functions.
5+ = 6+ confirmed use cases; enterprise-wide deployment pattern.

### Quadrant (derived — do not override the derivation):
- rhetoric ≥ 3 AND production ≥ 3 → "performer"
- rhetoric ≥ 3 AND production < 3  → "narrative_led"
- rhetoric < 3 AND production ≥ 3  → "silent_builder"
- rhetoric < 3 AND production < 3  → "not_visible"
- (set "native" only for Ocado or pure-tech companies built on AI)

### Evidence rules:
- evidenceTier: "confirmed" = direct quote, named tool, or published figure from the source docs.
- evidenceTier: "estimated" = inferred, paraphrased, or based on indirect evidence.
- NEVER fabricate figures, names, or URLs. If a field cannot be populated from the source docs, omit it.
- For sourceUrl: use the IR homepage URL for the company (e.g. https://r.lvmh.com) if no specific URL is evident. Do not invent URLs.
`.trim();

// ── Extraction prompt ─────────────────────────────────────────────────────────

export function buildSystemPrompt(): string {
  return `You are Rachel, an expert EMEA retail and consumer goods AI intelligence analyst.

Your task is to extract structured data from investor relations documents for a single company.
You will receive filtered excerpts from one or more earnings reports, transcripts, and annual reports.

${RUBRIC}

## Output format

Respond with a single JSON object — NO markdown, NO prose, just raw JSON.
The object must have exactly three top-level keys: "earningsDate", "fields", "citations".

"earningsDate": the date of the MOST RECENT earnings event in these docs (YYYY-MM-DD).
  Use the document date if explicit, else infer from the period (e.g. FY2025 full-year results → late Jan or early Feb of the following year).

"fields": an object where each key is a dot-notation path and the value is the proposed data.
  Include ONLY fields you can populate from the source docs. Omit fields with no evidence.

"citations": an object mapping field path → { "sourceUrl": string, "quote": string }.
  "quote" should be a verbatim short excerpt (≤ 40 words) from the source that supports the field.
  "sourceUrl" should be the company's IR page or the most specific URL available from the docs.

## Fields to extract

### Investor Snapshot
investorSnapshot.revenue          → { absolute: number, currency: "€B"|"£B"|"$B"|"CHF B"|"SEK B"|"NOK B", yoyOrganicPct?: number|null, yoyPublishedPct?: number|null, evidenceTier: "confirmed"|"estimated" }
investorSnapshot.operatingProfit  → { absolute: number, currency: string, marginPct?: number|null, yoyPct?: number|null, evidenceTier: "confirmed"|"estimated" }
investorSnapshot.netCash          → { absolute: number, currency: string, netDebtToEbitda?: number|null, evidenceTier: "confirmed"|"estimated" }
  (negative absolute = net debt)
investorSnapshot.employees        → { headcount: integer, evidenceTier: "confirmed"|"estimated" }
investorSnapshot.retailStores     → { total?: integer, byType: [{ type: string, count: integer }], evidenceTier: "confirmed"|"estimated" }
investorSnapshot.countries        → { count?: integer, regions: ["EMEA"|"AMER"|"APAC"|"MEA"|"LATAM"|"WORLDWIDE"] }
investorSnapshot.reporting        → { latestReportDate: "YYYY-MM-DD", nextTradingUpdate?: "YYYY-MM-DD"|null }
investorSnapshot.revenueStreams   → [{ stream: string, sharePct: number }]  (top business segments by revenue share)

### AI Perception
aiPerception.score                → { rhetoric: 1-5, production: 0-10, quadrant: "performer"|"narrative_led"|"silent_builder"|"not_visible"|"native", rubricVersion: "1.0" }
aiPerception.keyEarningsQuote     → { text: string, speaker: string, role?: string, date: "YYYY-MM-DD" }
  (most compelling AI-related quote from a board member or C-suite executive)
aiPerception.namedProductionTools → [{ name: string, category: "consumer"|"merchandising"|"supply_chain"|"marketing"|"ops"|"creative"|"analytics"|"security"|"other", roi?: string, evidenceTier: "confirmed"|"estimated" }]
  (only CONFIRMED live tools — not roadmap items)
aiPerception.aiFraming            → { value: "moat"|"efficiency"|"cost_reduction"|"not_mentioned", evidenceTier: "confirmed"|"estimated" }
  (moat = "competitive advantage/differentiator"; efficiency = "doing more with less"; cost_reduction = "saving money")
aiPerception.quantifiedROI        → { stated: boolean, figure?: string, evidenceTier: "confirmed"|"estimated" }
  (e.g. "15% uplift in basket size", "€50M savings")
aiPerception.consumerFacingAIProduct → { exists: boolean, name?: string, evidenceTier: "confirmed"|"estimated" }
aiPerception.vendorPartners       → [{ name: string, evidenceTier: "confirmed"|"estimated" }]
  (confirmed: named in docs; estimated: inferred from product names)
aiPerception.aiAnalyticsStack     → [{ tech: string, layer: "cloud"|"data"|"ml"|"llm"|"app", evidenceTier: "confirmed"|"estimated" }]
aiPerception.cSuiteAIPresenter    → { exists: boolean, name?: string, role?: string, sourceType?: "earnings_call"|"leadership_page"|"press_release", evidenceTier: "confirmed"|"estimated" }
aiPerception.genAIMentioned       → { value: boolean, mentions?: integer, evidenceTier: "confirmed"|"estimated" }
  (count occurrences of "generative AI", "GenAI", "LLM", "large language model" across all source docs)
aiPerception.dedicatedAISection   → { value: boolean, evidenceTier: "confirmed"|"estimated" }
  (does the annual report or investor deck have a dedicated AI/digital section?)
aiPerception.maisonHighlights     → [{ brand: string, aiInitiative: string, sourceType?: "earnings_call"|"press_release"|"vendor_case"|"annual_report" }]
  (for groups only — AI initiatives per individual brand/subsidiary)

## Hard rules
- DO NOT include maisons/brands list (investorSnapshot.maisons) — that is maintained separately.
- DO NOT include HQ or languages fields — those are static and maintained separately.
- DO NOT include notes or sectorAppointments.
- composite score is derived automatically — do not include it.
- If rhetoric = 1 and production = 0, quadrant must be "not_visible". Apply rubric strictly.
- Only include vendorPartners and aiAnalyticsStack entries you can justify from the text.`;
}

export function buildUserPrompt(companyName: string, context: string): string {
  return `Extract structured data for: ${companyName}

${context}

Remember: respond with RAW JSON only. No markdown fences, no prose.`;
}

// ── JSON parsing with repair ───────────────────────────────────────────────────

/**
 * Parse the LLM response. The model is instructed to return raw JSON but may
 * occasionally wrap it in a markdown code block — strip that first.
 */
export function parseExtractionResponse(raw: string): ExtractionResult {
  // Strip optional markdown code fence
  const stripped = raw
    .replace(/^```(?:json)?\n?/i, "")
    .replace(/\n?```$/i, "")
    .trim();

  return JSON.parse(stripped) as ExtractionResult;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ExtractionResult {
  earningsDate: string;
  fields: Record<string, unknown>;
  citations: Record<string, { sourceUrl?: string; quote?: string }>;
}

export interface ProposeFieldsInput {
  slug: string;
  companyName: string;
  /** Local file paths OR Vercel Blob https:// URLs. Mix is fine. */
  pdfSources: string[];
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Propose field values for a company profile from its investor-relations PDFs.
 *
 * Works with any number of PDFs — the context budget cap handles scale.
 * On every new earnings cycle, just add the new PDF paths to `pdfSources`
 * and re-run; the function will automatically prioritise the most recent docs.
 *
 * Returns a `Candidate` ready to pass to `writeCandidate()`.
 */
export async function proposeFields(
  input: ProposeFieldsInput,
): Promise<Candidate> {
  const { slug, companyName, pdfSources } = input;

  if (pdfSources.length === 0) {
    throw new Error(`proposeFields: no PDF sources provided for ${slug}`);
  }

  // 1. Extract text from all PDFs (in parallel, IO-bound).
  console.log(
    `[extract] ${slug}: reading ${pdfSources.length} PDF(s)…`,
  );
  const excerpts: PdfExcerpt[] = [];
  for (const src of pdfSources) {
    try {
      const ex = await readPdfExcerpt(src);
      if (ex.text.length > 100) excerpts.push(ex);
      else console.warn(`[extract] ${slug}: skipping ${ex.filename} (too short after filtering)`);
    } catch (err) {
      console.warn(
        `[extract] ${slug}: failed to read ${src} — ${(err as Error).message}`,
      );
    }
  }

  if (excerpts.length === 0) {
    throw new Error(
      `proposeFields: all PDFs for ${slug} produced empty excerpts — PDFs may be image-only`,
    );
  }

  // 2. Merge excerpts into a single context window.
  const context = buildCompanyContext(companyName, excerpts);
  console.log(
    `[extract] ${slug}: context built — ${context.length.toLocaleString()} chars from ${excerpts.length} PDF(s)`,
  );

  // 3. Single LLM call — direct Anthropic SDK (bypasses Vercel AI Gateway).
  // Uses ANTHROPIC_API_KEY from env. Model IDs use hyphenated scheme.
  // Default: claude-haiku-4-5 (~$0.01/company). Override for higher quality:
  //   EXTRACT_MODEL=claude-sonnet-4-6
  // Prompt caching: the system prompt (rubric + extraction schema, ~3K tokens)
  // is identical for every company. We mark it with an ephemeral cache
  // breakpoint so when ir-extract runs N companies back-to-back, the second
  // through Nth calls read the system prompt from cache at ~10% of normal
  // input cost. Earnings-season ingest processes 5-15 companies sequentially
  // within minutes, so the 5-minute default TTL is enough; we set 1h to be
  // generous in case of retries or slow batches.
  //
  // Storage: Anthropic charges 1.25× normal input price to write the cache,
  // then 0.1× for cache reads. Break-even at 2 calls; everything after is pure
  // savings. With ~3K cached tokens × 10 daily companies, that's ~$0.03/day
  // saved on Haiku, but ~30-50% reduction in ir_extract input-token billing
  // overall once stacked with the dynamic PDF context.
  const modelId = process.env.EXTRACT_MODEL ?? "claude-haiku-4-5";
  const { text: rawResponse } = await generateTextTracked({
    workflow: "ir_extract",
    model: anthropic(modelId),
    // Caching strategy: AI SDK v6 doesn't accept multi-part content on system
    // messages, and a plain string system prompt is sent without cache_control.
    // So we put the static system prompt as the FIRST user-message text part
    // with an ephemeral cache breakpoint, then the dynamic company context as
    // the second part. Anthropic caches the prefix up to and including the
    // marked part, so calls 2..N read the rubric + schema (~3K tokens) from
    // cache at 0.1× input cost instead of 1×.
    system: "You are Rachel — see instructions in the user message.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text" as const,
            text: buildSystemPrompt(),
            providerOptions: {
              anthropic: { cacheControl: { type: "ephemeral" as const, ttl: "1h" as const } },
            },
          },
          {
            type: "text" as const,
            text: buildUserPrompt(companyName, context),
          },
        ],
      },
    ],
    temperature: 0,           // deterministic extraction, not creative
    maxOutputTokens: 3_000,
  });

  // 4. Parse + validate.
  let extraction: ExtractionResult;
  try {
    extraction = parseExtractionResponse(rawResponse);
  } catch (err) {
    throw new Error(
      `proposeFields: JSON parse failed for ${slug}: ${(err as Error).message}\nRaw response (first 500 chars):\n${rawResponse.slice(0, 500)}`,
    );
  }

  if (!extraction.earningsDate || !extraction.fields) {
    throw new Error(
      `proposeFields: response missing required keys for ${slug}`,
    );
  }

  // 5. Build and return the Candidate.
  const ts = new Date().toISOString();
  // Normalise citations: sourceUrl is required in Candidate; default to "" when absent.
  const citations: Candidate["citations"] = Object.fromEntries(
    Object.entries(extraction.citations ?? {}).map(([k, v]) => [
      k,
      { sourceUrl: v.sourceUrl ?? "", quote: v.quote },
    ]),
  );

  const candidate: Candidate = {
    id: `${slug}:${ts}`,
    slug,
    ts,
    earningsDate: extraction.earningsDate,
    proposedFields: extraction.fields,
    citations,
    status: "pending",
  };

  console.log(
    `[extract] ${slug}: candidate ready — ${Object.keys(extraction.fields).length} fields, earningsDate=${extraction.earningsDate}`,
  );

  return candidate;
}
