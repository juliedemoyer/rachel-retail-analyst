/**
 * Prompt library — the 50 GTM/brand-exec questions that drive both the
 * eval suite and the in-product prompt library UI. Single canonical list.
 */

export type PromptCategory =
  | "watchlist-factual"
  | "vendor-footprint"
  | "recent-earnings"
  | "cross-company"
  | "trend-topic"
  | "unknown-refusal";

export interface PromptEntry {
  id: string;
  question: string;
  category: PromptCategory;
  /** Document class(es) the answer must cite, or [] for refusal expected. */
  expectedCitationClasses: string[];
}

export const CATEGORY_LABEL: Record<PromptCategory, string> = {
  "watchlist-factual": "Watchlist factual",
  "vendor-footprint": "AI / cloud vendor footprint",
  "recent-earnings": "Recent earnings",
  "cross-company": "Cross-company synthesis",
  "trend-topic": "Trend / topic",
  "unknown-refusal": "Out of scope (Rachel will refuse)",
};

const C = (
  category: PromptCategory,
  expected: string[],
): Pick<PromptEntry, "category" | "expectedCitationClasses"> => ({
  category,
  expectedCitationClasses: expected,
});

export const PROMPT_LIBRARY: PromptEntry[] = [
  // A. Watchlist company factual
  { id: "a1", question: "What was LVMH's FY24 revenue and operating profit?", ...C("watchlist-factual", ["investor-filing"]) },
  { id: "a2", question: "What's Inditex's stated AI investment focus for 2025?", ...C("watchlist-factual", ["investor-filing", "company-profile"]) },
  { id: "a3", question: "Who chairs Carrefour and what was the latest reported earnings figure?", ...C("watchlist-factual", ["investor-filing", "company-profile"]) },
  { id: "a4", question: "What is Nestlé's most recent revenue split by geography?", ...C("watchlist-factual", ["investor-filing"]) },
  { id: "a5", question: "What did L'Oréal say about Beauty Tech in its last annual report?", ...C("watchlist-factual", ["investor-filing"]) },
  { id: "a6", question: "What's Ahold Delhaize's stance on private-label vs branded?", ...C("watchlist-factual", ["investor-filing", "company-profile"]) },
  { id: "a7", question: "What is Inditex's store count and growth strategy?", ...C("watchlist-factual", ["investor-filing", "company-profile"]) },
  { id: "a8", question: "Summarise Kering's H1 2025 results.", ...C("watchlist-factual", ["investor-filing"]) },
  { id: "a9", question: "What are Tesco's stated digital and loyalty priorities?", ...C("watchlist-factual", ["company-profile", "investor-filing"]) },
  { id: "a10", question: "What's Unilever's progress on AI-led marketing transformation?", ...C("watchlist-factual", ["investor-filing", "company-profile"]) },

  // B. AI / cloud vendor footprint
  { id: "b1", question: "Which luxury houses are publicly partnered with Microsoft?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b2", question: "Which grocers in EMEA name Google Cloud as a partner?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b3", question: "Which CPG companies have public Anthropic / Claude deployments?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b4", question: "Who in EMEA retail uses Databricks for their data platform?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b5", question: "Which fashion retailers have named Salesforce in recent press?", ...C("vendor-footprint", ["company-profile", "pulse-item"]) },
  { id: "b6", question: "Which retailers are using generative AI for product copy at scale?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b7", question: "Who in beauty has invested in virtual try-on or AR?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b8", question: "Which grocers are piloting computer vision for shelf monitoring?", ...C("vendor-footprint", ["company-profile", "rachel-domain"]) },
  { id: "b9", question: "Which apparel retailers have named SAP S/4HANA migrations?", ...C("vendor-footprint", ["company-profile", "investor-filing"]) },
  { id: "b10", question: "Who in CPG has named AWS as their primary cloud?", ...C("vendor-footprint", ["company-profile"]) },

  // C. Recent earnings / signals
  { id: "c1", question: "What did Inditex say about Q1 2026 margin?", ...C("recent-earnings", ["investor-filing"]) },
  { id: "c2", question: "What did LVMH flag about Asia performance in their last earnings call?", ...C("recent-earnings", ["investor-filing"]) },
  { id: "c3", question: "Which watchlist companies missed expectations in the last 30 days?", ...C("recent-earnings", ["rachel-brief", "investor-filing"]) },
  { id: "c4", question: "What did Nestlé say about pricing in their most recent print?", ...C("recent-earnings", ["investor-filing"]) },
  { id: "c5", question: "Which luxury names guided down for H2 2025?", ...C("recent-earnings", ["investor-filing", "rachel-brief"]) },
  { id: "c6", question: "What did Ahold Delhaize report on US vs EU split last quarter?", ...C("recent-earnings", ["investor-filing"]) },
  { id: "c7", question: "Summarise Tesco's last trading update.", ...C("recent-earnings", ["investor-filing"]) },
  { id: "c8", question: "What did Unilever say about marketing spend efficiency recently?", ...C("recent-earnings", ["investor-filing"]) },

  // D. Cross-company synthesis
  { id: "d1", question: "Compare Carrefour and Ahold Delhaize on data and AI maturity.", ...C("cross-company", ["company-profile", "rachel-domain"]) },
  { id: "d2", question: "Which 3 luxury houses are most aggressive on AI per recent disclosures?", ...C("cross-company", ["investor-filing", "company-profile"]) },
  { id: "d3", question: "Compare Inditex and H&M on supply chain AI.", ...C("cross-company", ["company-profile", "rachel-domain"]) },
  { id: "d4", question: "Which CPG firms named generative AI in their FY2024 annual reports?", ...C("cross-company", ["investor-filing"]) },
  { id: "d5", question: "Who in the watchlist most often mentions personalization in recent filings?", ...C("cross-company", ["investor-filing"]) },
  { id: "d6", question: "Which retailers are reporting earnings in the next 2 weeks?", ...C("cross-company", ["market-calendar"]) },
  { id: "d7", question: "Which watchlist companies have flagged EU AI Act readiness?", ...C("cross-company", ["investor-filing", "rachel-domain"]) },
  { id: "d8", question: "Compare Kering and LVMH on AI client-experience strategy.", ...C("cross-company", ["investor-filing", "rachel-domain"]) },

  // E. Trend / topic
  { id: "e1", question: "What's the state of AI in luxury client clienteling in 2025?", ...C("trend-topic", ["rachel-domain", "rachel-brief"]) },
  { id: "e2", question: "How is the EU AI Act affecting retail technology decisions?", ...C("trend-topic", ["rachel-domain", "rachel-brief"]) },
  { id: "e3", question: "What's the dominant AI-in-grocery use case in EMEA right now?", ...C("trend-topic", ["rachel-domain"]) },
  { id: "e4", question: "Which retail-AI use cases have moved from pilot to production this year?", ...C("trend-topic", ["rachel-domain", "rachel-brief"]) },
  { id: "e5", question: "How is computer vision being deployed in EMEA grocery?", ...C("trend-topic", ["rachel-domain"]) },
  { id: "e6", question: "What are the biggest barriers to retail AI adoption flagged by EMEA execs?", ...C("trend-topic", ["rachel-domain", "rachel-brief"]) },
  { id: "e7", question: "What's the prevailing vendor narrative for retail AI in 2026?", ...C("trend-topic", ["rachel-domain"]) },

  // F. Unknown / refusal — expect zero citations
  { id: "f1", question: "What's Walmart doing on AI?", ...C("unknown-refusal", []) },
  { id: "f2", question: "Should I buy LVMH stock right now?", ...C("unknown-refusal", []) },
  { id: "f3", question: "What's Target's Q2 outlook?", ...C("unknown-refusal", []) },
  { id: "f4", question: "What was discussed at the LVMH board meeting yesterday?", ...C("unknown-refusal", []) },
  { id: "f5", question: "What's Costco's AI strategy?", ...C("unknown-refusal", []) },
  { id: "f6", question: "Will Kering's stock price rise next month?", ...C("unknown-refusal", []) },
  { id: "f7", question: "What's in the leaked Inditex internal memo?", ...C("unknown-refusal", []) },
];

/** Curated rotating chips for the chat input — top one per answerable category. */
export const SUGGESTED_PROMPTS: PromptEntry[] = [
  PROMPT_LIBRARY.find((p) => p.id === "c2")!,
  PROMPT_LIBRARY.find((p) => p.id === "b1")!,
  PROMPT_LIBRARY.find((p) => p.id === "d6")!,
  PROMPT_LIBRARY.find((p) => p.id === "e2")!,
  PROMPT_LIBRARY.find((p) => p.id === "d1")!,
];

export function promptsByCategory(): Record<PromptCategory, PromptEntry[]> {
  const out = {} as Record<PromptCategory, PromptEntry[]>;
  for (const p of PROMPT_LIBRARY) {
    (out[p.category] ??= []).push(p);
  }
  return out;
}
