/**
 * Rachel Retail — Company Profile schema (v1).
 *
 * Source of truth for the 27-field shape rendered on /app/companies/[slug]:
 * 11 Investor Snapshot fields + 16 AI Perception fields. Authored as YAML
 * front-matter in data/companies/{slug}.md, validated here, persisted into
 * Upstash, and rendered by every product surface.
 *
 * Snapshot rule: every field below EXCEPT `aiPerception.notes` and
 * `aiPerception.sectorAppointments` is captured per-earnings into an
 * immutable snapshot. Notes are mutable; sector appointments live at the
 * sector level.
 */

import { z } from "zod";

// ── Shared atoms ──────────────────────────────────────────────────────────────

export const RUBRIC_VERSION = "1.0" as const;

export const EvidenceTier = z.enum(["confirmed", "estimated"]);
export type EvidenceTier = z.infer<typeof EvidenceTier>;

// ── Investor Snapshot (11 fields) ─────────────────────────────────────────────

export const RevenueField = z.object({
  absolute: z.number(),
  currency: z.string(), // e.g. "€B", "£B", "$B"
  yoyOrganicPct: z.number().nullable().optional(),
  yoyPublishedPct: z.number().nullable().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const OperatingProfitField = z.object({
  absolute: z.number(),
  currency: z.string(),
  marginPct: z.number().nullable().optional(),
  yoyPct: z.number().nullable().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const NetCashField = z.object({
  absolute: z.number(), // negative = net debt
  currency: z.string(),
  netDebtToEbitda: z.number().nullable().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const EmployeesField = z.object({
  headcount: z.number().int(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const MaisonField = z.object({
  name: z.string(),
  sourceUrl: z.string().url().optional(),
});

export const RetailStoresField = z.object({
  total: z.number().int().nullable().optional(),
  byType: z.array(z.object({ type: z.string(), count: z.number().int() })).default([]),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const CountriesField = z.object({
  count: z.number().int().nullable().optional(),
  regions: z.array(z.enum(["EMEA", "AMER", "APAC", "MEA", "LATAM", "WORLDWIDE"])).default([]),
  sourceUrl: z.string().url().optional(),
});

export const HQField = z.object({
  city: z.string(),
  country: z.string(), // ISO-2: FR, UK, NL, DE, ES, CH, SE
  aiActApplies: z.boolean(),
  jurisdictionNote: z.string().optional(),
});

export const ReportingTimelineField = z.object({
  latestReportDate: z.string(), // YYYY-MM-DD
  latestReportBlobUrl: z.string().url().optional(),
  nextTradingUpdate: z.string().nullable().optional(), // YYYY-MM-DD
});

export const RevenueStreamField = z.object({
  stream: z.string(),
  sharePct: z.number().min(0).max(100),
  sourceUrl: z.string().url().optional(),
});

export const InvestorSnapshot = z.object({
  revenue: RevenueField,
  operatingProfit: OperatingProfitField,
  netCash: NetCashField,
  employees: EmployeesField,
  maisons: z.array(MaisonField).default([]),
  retailStores: RetailStoresField,
  countries: CountriesField,
  hq: HQField,                            // doubles as #8 (HQ + AI Act)
  languages: z.array(z.string()).default(["en"]), // #9
  reporting: ReportingTimelineField,      // #10
  revenueStreams: z.array(RevenueStreamField).default([]), // #11
});
export type InvestorSnapshot = z.infer<typeof InvestorSnapshot>;

// ── AI Perception (16 fields) ─────────────────────────────────────────────────

export const Quadrant = z.enum([
  "performer",       // high rhetoric, high production
  "narrative_led",          // high rhetoric, low production
  "silent_builder",  // low rhetoric, high production
  "not_visible",         // low rhetoric, low production
  "native",          // off-matrix (e.g. Ocado)
]);
export type Quadrant = z.infer<typeof Quadrant>;

export const AiImpressionScore = z.object({
  rhetoric: z.number().int().min(1).max(5),
  production: z.number().int().min(0).max(10),
  composite: z.number().min(1).max(5).optional(), // derived if missing
  quadrant: Quadrant,
  rubricVersion: z.literal(RUBRIC_VERSION).default(RUBRIC_VERSION),
});
export type AiImpressionScore = z.infer<typeof AiImpressionScore>;

export const KeyEarningsQuote = z.object({
  text: z.string(),
  speaker: z.string(),
  role: z.string().optional(),
  date: z.string(), // YYYY-MM-DD
  sourceUrl: z.string().url().optional(),
});

export const ProductionTool = z.object({
  name: z.string(),
  category: z.enum([
    "consumer", "merchandising", "supply_chain", "marketing",
    "ops", "creative", "analytics", "security", "other",
  ]),
  roi: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const AiFraming = z.object({
  value: z.enum(["moat", "efficiency", "cost_reduction", "not_mentioned"]),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const QuantifiedROI = z.object({
  stated: z.boolean(),
  figure: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const ConsumerFacingProduct = z.object({
  exists: z.boolean(),
  name: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const VendorPartner = z.object({
  name: z.string(), // "Microsoft" | "Google Cloud" | "Anthropic" | "OpenAI" | "AWS" | etc.
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const StackEntry = z.object({
  tech: z.string(),
  layer: z.enum(["cloud", "data", "ml", "llm", "app"]),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const CSuiteAIPresenter = z.object({
  exists: z.boolean(),
  name: z.string().optional(),
  role: z.string().optional(),
  sourceType: z.enum(["earnings_call", "leadership_page", "press_release"]).optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const SectorAppointment = z.object({
  company: z.string(),
  name: z.string(),
  role: z.string(),
  dateAnnounced: z.string(), // YYYY-MM-DD
  sourceUrl: z.string().url().optional(),
});
export type SectorAppointment = z.infer<typeof SectorAppointment>;

export const GenAIMention = z.object({
  value: z.boolean(),
  mentions: z.number().int().optional(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const DedicatedAISection = z.object({
  value: z.boolean(),
  sourceUrl: z.string().url().optional(),
  evidenceTier: EvidenceTier.default("estimated"),
});

export const MaisonHighlight = z.object({
  brand: z.string(),
  aiInitiative: z.string(),
  sourceUrl: z.string().url().optional(),
  sourceType: z.enum(["earnings_call", "press_release", "vendor_case", "annual_report"]).optional(),
});

export const AiPerception = z.object({
  // #1 Scores  /  #2 Category (derived from quadrant) / #3 Counts (derived)
  score: AiImpressionScore,
  // #4
  keyEarningsQuote: KeyEarningsQuote.optional(),
  // #5
  namedProductionTools: z.array(ProductionTool).default([]),
  // #6
  aiFraming: AiFraming,
  // #7
  quantifiedROI: QuantifiedROI,
  // #8
  consumerFacingAIProduct: ConsumerFacingProduct,
  // #9
  vendorPartners: z.array(VendorPartner).default([]),
  // #10
  aiAnalyticsStack: z.array(StackEntry).default([]),
  // #11 Rachel's notes — Markdown body of the profile file (not snapshotted)
  notes: z.string().default(""),
  // #12
  cSuiteAIPresenter: CSuiteAIPresenter,
  // #13 sector-scoped — denormalised in here for convenience but lives at sector level
  sectorAppointments: z.array(SectorAppointment).default([]),
  // #14
  genAIMentioned: GenAIMention,
  // #15
  dedicatedAISection: DedicatedAISection,
  // #16
  maisonHighlights: z.array(MaisonHighlight).default([]),
});
export type AiPerception = z.infer<typeof AiPerception>;

// ── Profile (the unified shape) ───────────────────────────────────────────────

export const CompanyMeta = z.object({
  company: z.string(),
  ticker: z.string().optional(),
  hq: HQField,
  sector: z.enum([
    "Luxury & Beauty",
    "Grocery",
    "Apparel & E-commerce",
    "CPG",
    "Sports & Outdoor",
    "Home & DIY",
  ]),
  isGroup: z.boolean().default(false),
  isAINative: z.boolean().default(false), // Ocado renders off-matrix
  isPrivate: z.boolean().optional(), // private/cooperative company, annual results only
});
export type CompanyMeta = z.infer<typeof CompanyMeta>;

// Free-form recent stories (Pulse items, case studies, exec changes, AGM
// notes) attached at profile level. Auto-synced into the Vercel profile
// page by scripts/sync-template-overlays.ts on every reseed so editing
// the MD is the only step needed end-to-end.
export const RecentSource = z.object({
  label: z.string(),
  url: z.string().url(),
  date: z.string().optional(), // YYYY-MM-DD
  kind: z.enum(["case_study", "press_release", "earnings", "leadership", "vendor_news", "regulatory", "other"]).optional(),
});
export type RecentSource = z.infer<typeof RecentSource>;

export const CompanyProfile = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  meta: CompanyMeta,
  investorSnapshot: InvestorSnapshot,
  aiPerception: AiPerception,
  recentSources: z.array(RecentSource).default([]),
});
export type CompanyProfile = z.infer<typeof CompanyProfile>;

// ── Snapshot (immutable per-earnings record) ──────────────────────────────────

export const Snapshot = z.object({
  slug: z.string(),
  earningsDate: z.string(), // YYYY-MM-DD
  rubricVersion: z.literal(RUBRIC_VERSION).default(RUBRIC_VERSION),
  capturedAt: z.string(), // ISO
  // Everything except aiPerception.notes and aiPerception.sectorAppointments
  investorSnapshot: InvestorSnapshot,
  aiPerception: AiPerception.omit({ notes: true, sectorAppointments: true }),
});
export type Snapshot = z.infer<typeof Snapshot>;

export const TrendPoint = z.object({
  date: z.string(),       // YYYY-MM-DD = earningsDate
  rhetoric: z.number(),
  production: z.number(),
  composite: z.number(),
  quadrant: Quadrant,
  rubricVersion: z.string(),
});
export type TrendPoint = z.infer<typeof TrendPoint>;

// ── Derived helpers ───────────────────────────────────────────────────────────

export function deriveComposite(score: Pick<AiImpressionScore, "rhetoric" | "production">): number {
  // Production is 0–5+ but in practice capped at ~6 for normalisation.
  const normProd = Math.min(score.production, 5);
  return Math.round(((score.rhetoric + normProd) / 2) * 10) / 10;
}

export function deriveQuadrant(
  score: Pick<AiImpressionScore, "rhetoric" | "production">,
  isAINative = false,
): Quadrant {
  if (isAINative) return "native";
  const highR = score.rhetoric >= 3;
  const highP = score.production >= 3;
  if (highR && highP) return "performer";
  if (highR && !highP) return "narrative_led";
  if (!highR && highP) return "silent_builder";
  return "not_visible";
}

export function quadrantLabel(q: Quadrant): string {
  return ({
    performer: "AI Performer",
    narrative_led: "Narrative-led",
    silent_builder: "Silent Builder",
    not_visible: "Not yet visible",
    native: "AI Native",
  })[q];
}

