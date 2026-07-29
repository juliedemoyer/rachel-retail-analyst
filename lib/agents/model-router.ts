/**
 * Model router — picks the cheapest model that can answer the question well.
 *
 * Rachel's principle: Haiku for retrieval-shaped lookups (single-doc factual,
 * vendor lookup, calendar lookup), Sonnet for reasoning (cross-company
 * synthesis, trend interpretation, multi-document earnings synthesis), and an
 * opt-in deep tier for the genuinely hard comparisons — ranking a whole
 * sector, or reasoning across many companies and several quarters at once.
 *
 * Token efficiency: Haiku at ~$1/MTok input vs Sonnet at ~$3/MTok input.
 * Routing 60% of questions to Haiku → ~50% cost saving with no quality
 * loss on the categories evaluated as Haiku-suitable.
 */

export type RachelModelTier = "haiku" | "sonnet" | "deep";

export interface ModelChoice {
  tier: RachelModelTier;
  modelId: string;
  priceKey: string;
  label: string;
  reason: string;
}

export const MODELS: Record<RachelModelTier, Omit<ModelChoice, "reason">> = {
  haiku: {
    tier: "haiku",
    modelId: "claude-haiku-4-5",
    priceKey: "anthropic/claude-haiku-4.5",
    label: "Claude Haiku 4.5 · fast lookup",
  },
  sonnet: {
    tier: "sonnet",
    modelId: "claude-sonnet-4-6",
    priceKey: "anthropic/claude-sonnet-4.6",
    label: "Claude Sonnet 4.6 · reasoning",
  },
  // Opt-in only. Set DEEP_ANALYSIS_MODEL to enable; unset, `deep` never fires
  // and the router stays a two-tier system. Reserved for whole-sector ranking
  // and multi-company, multi-quarter synthesis, where a shallow answer is
  // worse than a slow one.
  deep: {
    tier: "deep",
    modelId: process.env.DEEP_ANALYSIS_MODEL ?? "claude-opus-4-6",
    priceKey: "anthropic/claude-opus-4.6",
    label: "Deep analysis · sector-wide synthesis",
  },
};

/** Questions that span many companies at once, where Sonnet goes shallow. */
const DEEP_TRIGGERS = [
  /\b(rank|ranking|league table|leaderboard)\b.*\b(sector|watchlist|all|every)\b/i,
  /\ball (companies|brands)\b/i,
  /\bacross the (whole )?(sector|watchlist|market)\b/i,
  /\bwho('s| is) (winning|ahead|behind)\b.*\b(sector|market|overall)\b/i,
];

const REASONING_TRIGGERS = [
  /\bcompare\b/i,
  /\bversus\b/i,
  /\bvs\.?\b/i,
  /\bwhich\b.*\b(most|best|aggressive|advanced|leading)\b/i,
  /\b(synthes|analyse|analyz|interpret|implications|impact|why|how does|what does .* mean)\b/i,
  /\b(trend|landscape|state of|outlook|narrative)\b/i,
  /\bacross\b/i,
  /\bsummari[sz]e\b.*\b(quarter|earnings|H[12]|FY)/i, // earnings synthesis
];

const SIMPLE_LOOKUP_TRIGGERS = [
  /^who\b/i,
  /^what is\b/i,
  /^what was\b/i,
  /^when\b/i,
  /^where\b/i,
  /\bstore count\b/i,
  /\brevenue\b/i,
  /\breporting (today|this week|next)\b/i,
  /\bnext earnings\b/i,
  /\bcalendar\b/i,
];

/**
 * Pick the cheapest model that can plausibly answer the question well.
 *
 * Routing tuned 2026-05-11 after the Anthropic API credit-burn audit:
 * default flipped from Sonnet to Haiku. Rationale: telemetry showed 81/30d
 * ask_rachel calls all on Sonnet (~$3.30/mo at list), but every spot-check
 * of Haiku on the same questions returned a passable answer. Sonnet is now
 * reserved for explicit reasoning triggers, multi-part / long questions,
 * and an OVERRIDE_TO_SONNET escape valve (env-controlled) so we can A/B if
 * answer quality regresses.
 *
 * Estimated saving: ~60% of ask_rachel input-token cost (Sonnet $3/MTok →
 * Haiku $1/MTok) for the ~60% of questions that don't hit reasoning
 * triggers. Stacked with prompt caching on system prompts (Phase 2),
 * total ask_rachel spend drops ~70% with no eval-detectable quality loss
 * on simple-lookup, single-entity, and timeline questions.
 */
export function routeModel(question: string): ModelChoice {
  const q = question.trim();

  // Manual override — set ASK_RACHEL_FORCE_SONNET=true to revert to old behaviour
  // during eval or if a specific user reports degradation.
  if (process.env.ASK_RACHEL_FORCE_SONNET === "true") {
    return { ...MODELS.sonnet, reason: "ASK_RACHEL_FORCE_SONNET env override" };
  }

  // Deep tier — opt-in, and only for genuinely sector-wide questions.
  // Unset DEEP_ANALYSIS_MODEL keeps Rachel a strict two-tier router.
  if (process.env.DEEP_ANALYSIS_MODEL) {
    for (const re of DEEP_TRIGGERS) {
      if (re.test(q)) {
        return { ...MODELS.deep, reason: `deep trigger: ${re.source}` };
      }
    }
  }

  // Multi-clause / long questions → Sonnet (reasoning likely required).
  if (q.length > 240 || /\?.*\?/.test(q)) {
    return { ...MODELS.sonnet, reason: "long / multi-part question" };
  }

  // Reasoning triggers always win — these regexes are the curated set of
  // question shapes where Haiku has been observed to give shallow or
  // missing-detail answers. Bias toward Sonnet here, not in the default.
  for (const re of REASONING_TRIGGERS) {
    if (re.test(q)) {
      return { ...MODELS.sonnet, reason: `reasoning trigger: ${re.source}` };
    }
  }

  // Everything else → Haiku (cheaper). Lookup-shaped questions, follow-ups,
  // and short factual asks all handle fine. Lookup triggers below are kept
  // for logged-reason clarity even though Haiku would be picked anyway.
  for (const re of SIMPLE_LOOKUP_TRIGGERS) {
    if (re.test(q)) {
      return { ...MODELS.haiku, reason: `simple lookup: ${re.source}` };
    }
  }

  return { ...MODELS.haiku, reason: "default (no reasoning trigger matched)" };
}
