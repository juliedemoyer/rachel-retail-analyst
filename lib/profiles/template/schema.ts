// Schema for the LVMH-style company profile template.
// Every section is optional: the template renders only the parts a company
// has data for and skips the rest with a graceful "no data yet" pill where
// helpful. The full LVMH record is the canonical example of all fields
// populated; stubs for other companies fill in what we have from the
// static cards in app/(product)/app/companies/_section.ts and leave the
// rest to be filled in by Rachel over time.

export type Source = { label: string; url?: string };

export type Quadrant = "performer" | "narrative_led" | "silent" | "not_visible" | "native";
export type EvidenceTier = "confirmed" | "estimated";

export type Cadence = {
  baseline?: { label: string; date: string };
  lastReported?: { label: string; date: string };
  next?: { label: string; date: string };
  blurb?: string;
};

export type InvestorMetric = {
  value: string;
  reported?: string;
  organic?: string;
  note?: string;
  // OP growth vs prior FY (absolute and %), e.g. { absolute: "+€0.3B", pct: "+2.4%", basis: "vs FY2024" }
  growth?: { absolute?: string; pct?: string; basis?: string; estimated?: boolean };
};

export type InvestorSnapshot = {
  fiscalYearLabel?: string;
  headline?: {
    revenue?: InvestorMetric;
    opMargin?: InvestorMetric;
    netDebt?: InvestorMetric;
    employees?: InvestorMetric;
  };
  operatingComplexity?: {
    brands?: InvestorMetric;
    stores?: InvestorMetric;
    countries?: InvestorMetric;
    hq?: InvestorMetric;
    languages?: InvestorMetric;
  };
  whyMatters?: string;
  revenueStreams?: { label: string; pct: string }[];
  source?: Source;
  quarterlyUpdate?: {
    label: string;
    date: string;
    blurb: string;
    metrics: { label: string; value: string; trend?: string }[];
    reading?: string;
    source?: Source;
  };
};

export type AiPerceptionScore = {
  quadrant: Quadrant;
  label: string; // "Silent Builder · 3.0"
  rhetoric: number;
  production: number;
  evidence: EvidenceTier;
  lastScored?: string;
  rubric?: string;
  trend?: {
    rhetoric?: string;
    production?: string;
    tools?: string;
    vendors?: string;
  };
};

export type Quote = {
  eyebrow: string; // "Q1 2026 · 13 Apr 2026 — most recent"
  htmlQuote: string; // body of quote, may contain <strong> tags
  speaker: string;
  sources?: Source[];
};

export type Narrative = {
  quoteLatest?: Quote;
  quoteAnnual?: Quote;
  framing?: { headline: string; body: string };
  dedicatedSection?: { headline: string; body: string };
};

export type Leadership = {
  presenter?: { html: string; source?: Source };
  sectorAppointments?: { html: string }[];
  appointmentsNote?: string;
};

export type Production = {
  namedTools?: { tools: { html: string; source?: Source }[]; sources?: Source[] };
  consumerFacing?: string;
  quantifiedROI?: { html: string; source?: Source };
  genAI?: {
    mentioned: boolean;
    mentionCount?: number;
    vendors?: { name: string; url?: string }[];
    note?: string;
  };
  stackTable?: { layer: string; product: string; use: string; source: Source }[];
};

export type VendorStack = {
  namedPartners?: {
    name: string;
    status?: "confirmed" | "absent";
    // Featured case study (Microsoft customer story, Google Cloud customers,
    // Anthropic case study, OpenAI customer page, Mistral customer page).
    // When present, the partner row shows a click-through link plus a short
    // one-line note. Per ADDING_A_COMPANY.md rule #6 / #4: every confirmed
    // hyperscaler / foundation-model partnership with a public case study
    // must be featured in 2D Vendor Stack.
    caseStudy?: Source;
    note?: string;
  }[];
  partnersNote?: string;
};

export type Maison = {
  brand: string;
  description: string;
  source?: Source;
};

export type ByMaison = {
  maisons: Maison[];
  note?: string;
};

export type RachelNote = { lead: string; body: string };
export type PeerComparison = { peer: string; note: string; accent?: "rust" | "border" };

// EU AI Act readiness assessment for the 2 Aug 2026 high-risk deadline.
//   ready        — disclosed governance, low high-risk exposure, on track
//   in_progress  — material exposure but stated mitigation in flight
//   exposed      — high-risk systems running with no public mitigation plan
//   limited      — limited-risk only (consumer GenAI assistants etc.)
//   not_applicable — non-EU domiciled and no EU-facing high-risk systems
export type AIActStatus = "ready" | "in_progress" | "exposed" | "limited" | "not_applicable";

export type AIActReadiness = {
  status: AIActStatus;
  jurisdiction: string;          // "EU AI Act primary" / "EEA-facing only" / etc.
  oneLiner: string;              // What they've disclosed / what the gap is
  highRiskAreas?: string[];      // ["in-store CV", "BNPL credit scoring"]
  source?: Source;
};

export type CompanyTemplateData = {
  slug: string;
  shortName: string; // "LVMH"
  displayName: string; // "LVMH Moët Hennessy Louis Vuitton"
  sectorPath: string[]; // ["Companies", "Luxury", "LVMH"]
  isPrivate?: boolean; // private/cooperative company, annual results only

  cadence?: Cadence;
  investor?: InvestorSnapshot;
  aiPerception?: AiPerceptionScore;
  aiAct?: AIActReadiness;
  narrative?: Narrative;
  leadership?: Leadership;
  production?: Production;
  vendorStack?: VendorStack;
  byMaison?: ByMaison;

  furtherReading?: Source[];
  rachelNotes?: RachelNote[];
  peerComparison?: PeerComparison[];
  sources?: Source[];
  askPrompts?: string[];
};
