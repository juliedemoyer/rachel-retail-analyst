/**
 * 50-question eval set for Ask Rachel.
 *
 * Each question is tagged with:
 *  - category: which class of failure mode it probes
 *  - difficulty: easy (single-doc lookup) | medium (cross-doc) | hard (synthesis)
 *  - expects: heuristic flags for grading (must-cite, must-refuse, must-mention, etc.)
 *
 * Categories chosen to expose the *specific* breakdown:
 *   1. watchlist_lookup    — should call getAccount / getWatchlist
 *   2. kb_factual          — should call searchKnowledgeBase, return citation
 *   3. cross_company       — multi-account synthesis
 *   4. vendor_ai           — Microsoft / Google / Anthropic positioning
 *   5. unknown_refusal     — KB has nothing; correct answer is "no grounded source"
 */

export type Difficulty = "easy" | "medium" | "hard";
export type Category =
  | "watchlist_lookup"
  | "kb_factual"
  | "cross_company"
  | "vendor_ai"
  | "unknown_refusal";

export interface EvalQuestion {
  id: string;
  category: Category;
  difficulty: Difficulty;
  q: string;
  /** Substrings the answer SHOULD mention if grounded correctly. Lowercase. */
  shouldMention?: string[];
  /** If true, correct behaviour is to refuse for lack of source. */
  mustRefuse?: boolean;
  /** Tools the agent should plausibly invoke. */
  expectTools?: Array<"searchKnowledgeBase" | "getAccount" | "getWatchlist">;
}

export const QUESTIONS: EvalQuestion[] = [
  // ── 1. watchlist_lookup (10) — single-account fact retrieval ────────────────
  { id: "wl-01", category: "watchlist_lookup", difficulty: "easy",
    q: "What sector is Carrefour in?",
    shouldMention: ["grocery", "hypermarket"], expectTools: ["getAccount"] },
  { id: "wl-02", category: "watchlist_lookup", difficulty: "easy",
    q: "Which AI vendors does LVMH use?",
    shouldMention: ["lvmh"], expectTools: ["getAccount"] },
  { id: "wl-03", category: "watchlist_lookup", difficulty: "easy",
    q: "What's L'Oréal's AI maturity score?",
    shouldMention: ["l'oréal", "loreal"], expectTools: ["getAccount"] },
  { id: "wl-04", category: "watchlist_lookup", difficulty: "easy",
    q: "When are Kering's next earnings?",
    shouldMention: ["kering"], expectTools: ["getAccount"] },
  { id: "wl-05", category: "watchlist_lookup", difficulty: "easy",
    q: "What are Inditex's main AI use cases?",
    shouldMention: ["inditex"], expectTools: ["getAccount"] },
  { id: "wl-06", category: "watchlist_lookup", difficulty: "easy",
    q: "Tell me about Tesco.",
    shouldMention: ["tesco"], expectTools: ["getAccount"] },
  { id: "wl-07", category: "watchlist_lookup", difficulty: "easy",
    q: "What country is Ocado headquartered in?",
    // shouldMention is ALL-must-be-present; "UK" and "United Kingdom" are
    // both correct so we keep only the entity-name check here. Country
    // correctness is implicit in the question-answer pair.
    shouldMention: ["ocado"], expectTools: ["getAccount"] },
  { id: "wl-08", category: "watchlist_lookup", difficulty: "easy",
    q: "What is Zalando's revenue?",
    shouldMention: ["zalando"], expectTools: ["getAccount"] },
  { id: "wl-09", category: "watchlist_lookup", difficulty: "medium",
    q: "List all luxury & beauty companies on the watchlist.",
    shouldMention: ["lvmh", "kering", "l'oréal"], expectTools: ["getWatchlist"] },
  { id: "wl-10", category: "watchlist_lookup", difficulty: "medium",
    q: "Show me every grocery & hypermarket account you track.",
    shouldMention: ["carrefour", "tesco"], expectTools: ["getWatchlist"] },

  // ── 2. kb_factual (10) — single-claim KB grounded retrieval ────────────────
  { id: "kb-01", category: "kb_factual", difficulty: "easy",
    q: "What's LVMH's stated position on generative AI?",
    shouldMention: ["lvmh"], expectTools: ["searchKnowledgeBase"] },
  { id: "kb-02", category: "kb_factual", difficulty: "easy",
    q: "Has Carrefour announced any AI partnerships in 2025?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-03", category: "kb_factual", difficulty: "easy",
    q: "What AI products has L'Oréal launched recently?",
    shouldMention: ["l'oréal", "loreal"], expectTools: ["searchKnowledgeBase"] },
  { id: "kb-04", category: "kb_factual", difficulty: "easy",
    q: "What did Inditex say about AI in their last earnings call?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-05", category: "kb_factual", difficulty: "medium",
    q: "What is H&M doing with AI in supply chain or merchandising?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-06", category: "kb_factual", difficulty: "medium",
    q: "What's Nestlé's data and AI strategy?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-07", category: "kb_factual", difficulty: "medium",
    q: "Has Unilever named a Chief AI Officer or equivalent role?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-08", category: "kb_factual", difficulty: "medium",
    q: "What does Ocado's tech stack look like for retail AI?",
    expectTools: ["getAccount"] },  // searchKnowledgeBase optional — watchlist vendor data is sufficient ground
  { id: "kb-09", category: "kb_factual", difficulty: "hard",
    q: "Summarise ASOS's most recent results commentary on AI investment.",
    expectTools: ["searchKnowledgeBase"] },
  { id: "kb-10", category: "kb_factual", difficulty: "hard",
    q: "What strategic narrative is Kering using publicly around AI?",
    expectTools: ["searchKnowledgeBase"] },

  // ── 3. cross_company (10) — synthesis across watchlist ─────────────────────
  { id: "cc-01", category: "cross_company", difficulty: "medium",
    q: "Compare LVMH and Kering's AI approach.",
    shouldMention: ["lvmh", "kering"] },
  { id: "cc-02", category: "cross_company", difficulty: "medium",
    q: "Which European retailers are furthest ahead on generative AI?",
    expectTools: ["getWatchlist", "searchKnowledgeBase"] },
  { id: "cc-03", category: "cross_company", difficulty: "medium",
    q: "Which companies on the watchlist are Microsoft customers?",
    shouldMention: ["microsoft"], expectTools: ["getWatchlist"] },
  { id: "cc-04", category: "cross_company", difficulty: "medium",
    q: "Which watchlist accounts use Google Cloud?",
    shouldMention: ["google"], expectTools: ["getWatchlist"] },
  { id: "cc-05", category: "cross_company", difficulty: "hard",
    q: "Rank the watchlist by AI maturity, top 5.",
    expectTools: ["getWatchlist"] },
  { id: "cc-06", category: "cross_company", difficulty: "hard",
    q: "Where is the biggest AI vendor whitespace among luxury brands?",
    expectTools: ["getWatchlist"] },  // searchKnowledgeBase optional — watchlist vendor gaps sufficient for synthesis
  { id: "cc-07", category: "cross_company", difficulty: "hard",
    q: "Compare Tesco's and Carrefour's AI strategies.",
    shouldMention: ["tesco", "carrefour"] },
  { id: "cc-08", category: "cross_company", difficulty: "medium",
    q: "Which fashion retailers have shipped customer-facing AI?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "cc-09", category: "cross_company", difficulty: "medium",
    q: "What's the average revenue across the watchlist?",
    expectTools: ["getWatchlist"] },
  { id: "cc-10", category: "cross_company", difficulty: "hard",
    q: "Which 3 accounts should Microsoft target first for retail AI deals and why?",
    expectTools: ["getWatchlist", "searchKnowledgeBase"] },

  // ── 4. vendor_ai (10) — hyperscaler positioning ────────────────────────────
  { id: "vd-01", category: "vendor_ai", difficulty: "easy",
    q: "What is Microsoft's retail AI value proposition?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-02", category: "vendor_ai", difficulty: "easy",
    q: "How is Google positioning Gemini for European retail?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-03", category: "vendor_ai", difficulty: "easy",
    q: "Where is Anthropic showing up in retail use cases?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-04", category: "vendor_ai", difficulty: "medium",
    q: "What recent Microsoft retail moves matter for LVMH?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-05", category: "vendor_ai", difficulty: "medium",
    q: "Has Anthropic announced any retail customers in EMEA?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-06", category: "vendor_ai", difficulty: "medium",
    q: "What did Google Cloud Next reveal that's relevant to grocery?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-07", category: "vendor_ai", difficulty: "hard",
    q: "Which hyperscaler is winning in luxury and why?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-08", category: "vendor_ai", difficulty: "hard",
    q: "How do Microsoft Copilot, Gemini, and Claude differ for a CPG buyer?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-09", category: "vendor_ai", difficulty: "medium",
    q: "What regulatory exposure does Microsoft have under the EU AI Act?",
    expectTools: ["searchKnowledgeBase"] },
  { id: "vd-10", category: "vendor_ai", difficulty: "medium",
    q: "Which vendor is Carrefour most likely to standardise on?",
    expectTools: ["getAccount", "searchKnowledgeBase"] },

  // ── 5. unknown_refusal (10) — KB has nothing, must refuse ──────────────────
  { id: "uk-01", category: "unknown_refusal", difficulty: "easy", mustRefuse: true,
    q: "What's Walmart's latest AI announcement?" },
  { id: "uk-02", category: "unknown_refusal", difficulty: "easy", mustRefuse: true,
    q: "How is Target using generative AI in the US?" },
  { id: "uk-03", category: "unknown_refusal", difficulty: "easy", mustRefuse: true,
    q: "What's Amazon's Rufus assistant doing in Q4?" },
  { id: "uk-04", category: "unknown_refusal", difficulty: "medium", mustRefuse: true,
    q: "What did Carrefour's CEO say in last week's all-hands?" },
  { id: "uk-05", category: "unknown_refusal", difficulty: "medium", mustRefuse: true,
    q: "What's the internal headcount of LVMH's AI team?" },
  { id: "uk-06", category: "unknown_refusal", difficulty: "easy", mustRefuse: true,
    q: "Will the EU AI Act be amended in 2027?" },
  { id: "uk-07", category: "unknown_refusal", difficulty: "medium", mustRefuse: true,
    q: "What's Aldi's AI roadmap?" },
  { id: "uk-08", category: "unknown_refusal", difficulty: "medium", mustRefuse: true,
    q: "How much did L'Oréal pay for its last AI acquisition?" },
  { id: "uk-09", category: "unknown_refusal", difficulty: "hard", mustRefuse: true,
    q: "What's the consensus 2030 EBITDA for Kering?" },
  { id: "uk-10", category: "unknown_refusal", difficulty: "hard", mustRefuse: true,
    q: "What did Anthropic's CFO say at last week's private retail roundtable?" },

  // ── LVMH profile-page sample questions (rendered on /app/companies/lvmh) ───
  { id: "lvmh-01", category: "kb_factual", difficulty: "medium",
    q: "Which LVMH maisons have live AI products?",
    shouldMention: ["dior"], expectTools: ["getAccount", "searchKnowledgeBase"] },  // sephora removed — not yet in KB
  { id: "lvmh-02", category: "kb_factual", difficulty: "medium",
    q: "Any hints at an LVMH Chief AI Officer?",
    shouldMention: ["lvmh"], expectTools: ["getAccount", "searchKnowledgeBase"] },
];
