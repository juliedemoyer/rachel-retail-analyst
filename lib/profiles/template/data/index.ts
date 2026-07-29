import type { CompanyTemplateData } from "../schema";
import calendarJson from "../../../../data/earnings-calendar.json";
import { lvmh } from "./lvmh";
import { stubs } from "./stubs";
import { enriched } from "./enriched";
import { batch2 } from "./batch2";
import { batch3 } from "./batch3";
import { batch4 } from "./batch4";
import { batch5 } from "./batch5";
import { batch6_peers } from "./batch6_peers";
import { final } from "./final";
import { aiActReadiness } from "./ai-act-readiness";
import { autoMdSync } from "./auto-md-sync.generated";

// Single source of truth for the LVMH-style profile template.
//
// Layering, lowest priority first:
//   1. stubs    — header data scraped from app.html company cards (50 records,
//                 minus LVMH which ships separately).
//   2. batch2   — partial overlay for the 38 unsourced companies. Adds
//                 narrative.framing (quadrant-derived), peerComparison
//                 (same-sector + different-quadrant), IR/news source links,
//                 askPrompts.
//   3. batch3   — partial overlay for the same 38 companies. Adds
//                 cadence (FY + last-updated date), investor.whyMatters
//                 (sector heuristic), narrative.dedicatedSection
//                 (quadrant-hedged), production.consumerFacing (picked from
//                 use-case keywords), production.genAI.mentioned (derived),
//                 production.stackTable (built from vendor chips on cards),
//                 byMaison.maisons (only for known portfolios),
//                 furtherReading, rachelNotes (expanded from single card-note
//                 into 3-4 structured paragraphs).
//   4. enriched — full record per company for the 11 first-batch profiles
//                 ported from data/companies/*.md (ASOS, Carrefour, H&M,
//                 Inditex, Kering, L'Oréal, Nestlé, Ocado, Tesco, Unilever,
//                 Zalando). These records overwrite earlier layers wholesale.
//   5. lvmh     — canonical worked example, every section populated.
//
// Each partial overlay is **deep-merged** into the running profile so that a
// nested key like `production.consumerFacing` (added by batch3) does not
// clobber `production.namedTools` (set by stubs). Top-level keys recurse one
// level into nested objects; arrays and primitives replace.

type AnyObj = Record<string, unknown>;

function isPlainObject(v: unknown): v is AnyObj {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMergeOne(base: AnyObj, overlay: AnyObj): AnyObj {
  const out: AnyObj = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (value === undefined) continue;
    const existing = out[key];
    if (isPlainObject(existing) && isPlainObject(value)) {
      out[key] = deepMergeOne(existing, value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function applyPartials(
  base: Record<string, CompanyTemplateData>,
  partials: Record<string, Partial<CompanyTemplateData>>,
): Record<string, CompanyTemplateData> {
  const out: Record<string, CompanyTemplateData> = { ...base };
  for (const [slug, partial] of Object.entries(partials)) {
    if (!out[slug]) continue;
    out[slug] = deepMergeOne(out[slug] as unknown as AnyObj, partial as unknown as AnyObj) as unknown as CompanyTemplateData;
  }
  return out;
}

// Drop stack-table rows whose source has no clickable URL or carries the
// banned "From vendor footprint" label. Per ADDING_A_COMPANY.md rule #4:
// every source must point at a real article / IR doc / vendor case study.
// "From vendor footprint" was a placeholder used in batch3 to fill out the
// AI & analytics stack double-click table for companies where the cloud /
// productivity stack was inferred but unsourced. Showing those rows breaks
// the "5+ clickable sources" promise on the page, so we strip them at build
// time. If after stripping there's nothing left, drop the table entirely.
function stripUnsourcedStackRows(profile: CompanyTemplateData): CompanyTemplateData {
  const stack = profile.production?.stackTable;
  if (!stack || stack.length === 0) return profile;
  const cleaned = stack.filter((row) => {
    const label = row.source?.label ?? "";
    if (/from vendor footprint/i.test(label)) return false;
    if (!row.source?.url) return false;
    return true;
  });
  if (cleaned.length === stack.length) return profile;
  const newProduction = { ...profile.production };
  if (cleaned.length === 0) {
    delete newProduction.stackTable;
  } else {
    newProduction.stackTable = cleaned;
  }
  return { ...profile, production: newProduction };
}

// Override cadence.next.date with the exact date from earnings-calendar.json
// (generated from 07_shared_sources.md §3). Only fires when is_tbc is false.
// Leaves the label unchanged — it carries the event description ("H1 2026 full
// results", "Next milestone", etc.) which the calendar doesn't store.
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmtDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTH_ABBR[month - 1]} ${year}`;
}

function applyCalendarDates(
  profiles: Record<string, CompanyTemplateData>,
): Record<string, CompanyTemplateData> {
  const out = { ...profiles };
  for (const entry of calendarJson.entries) {
    const profile = out[entry.slug];
    if (!profile?.cadence?.next) continue;
    if (entry.is_tbc || !entry.next_earnings_date) continue;
    out[entry.slug] = {
      ...profile,
      cadence: {
        ...profile.cadence,
        next: { ...profile.cadence.next, date: fmtDate(entry.next_earnings_date) },
      },
    };
  }
  return out;
}

// Demote stale "next" cadence dates so we never display a date that has
// already passed. If `cadence.next.date` parses to a calendar date before
// today, promote it to `cadence.lastReported` and replace `next` with a
// "TBD" label. Strings that don't parse as dates (already "TBD",
// "Late July 2026", etc.) are left alone.
function refreshCadence(profile: CompanyTemplateData): CompanyTemplateData {
  if (!profile.cadence?.next?.date) return profile;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next = profile.cadence.next;
  const parsed = new Date(next.date);
  if (Number.isNaN(parsed.valueOf())) return profile;
  if (parsed >= today) return profile;

  const newCadence = { ...profile.cadence };
  newCadence.lastReported = next;
  newCadence.next = { label: next.label, date: "TBD" };
  return { ...profile, cadence: newCadence };
}

function buildProfiles(): Record<string, CompanyTemplateData> {
  let merged: Record<string, CompanyTemplateData> = { ...stubs };
  merged = applyPartials(merged, batch2);
  merged = applyPartials(merged, batch3);
  // batch4 layers AFTER batch3 so its concrete cadence ("Late July 2026")
  // wins over batch3's generic "TBD". Both still defer to enriched/lvmh.
  merged = applyPartials(merged, batch4);
  // Hand-curated records also deep-merge so they keep batch2/batch3 fillers
  // (peer comparison, whyMatters, furtherReading, etc.) for any field they
  // didn't explicitly specify, while their own values still win on conflict.
  merged = applyPartials(merged, enriched as Record<string, Partial<CompanyTemplateData>>);
  // batch5 sets real multi-brand counts (operatingComplexity.brands) with
  // citations to each company's brand-portfolio page. Layered AFTER enriched
  // because the auto-derived "+N maisons" from the markdown YAML is wrong
  // for companies with rich brand portfolios (L'Oréal has 36 brands, not 6).
  // The numbers in batch5 are the public-record source of truth.
  merged = applyPartials(merged, batch5);
  // batch6_peers replaces the cross-sector peerComparison entries shipped in
  // batch2 (e.g. Adidas vs H&M) with same-subsector peers built from
  // peer-map.ts. Loaded after enriched/lvmh because peer comparison is
  // sector-driven, not company-driven, and same-vertical peers are a hard
  // requirement per ADDING_A_COMPANY.md.
  merged = applyPartials(merged, batch6_peers);
  // final layer: hand-rebuilt records that meet the page-quality rules in
  // ADDING_A_COMPANY.md (real OP delta, real leadership, 5+ clickable
  // sources, per-tool source URLs, fresh cadence). Loads after batch6_peers
  // so it inherits the same-subsector peer comparison automatically.
  merged = applyPartials(merged, final);
  merged.lvmh = lvmh;
  // EU AI Act readiness overlay layered last so curated assessments
  // override anything earlier layers may have inferred.
  merged = applyPartials(merged, aiActReadiness);
  // auto-md-sync.generated.ts is regenerated at the end of every
  // `tsx scripts/seed-profiles.ts` run from data/companies/*.md.
  // Layered absolute-last so anything you write into an MD's
  // recentSources / namedProductionTools / cSuiteAIPresenter shows up
  // on /app/companies/<slug> on the next deploy without hand-editing
  // any of the curated overlays above.
  merged = applyPartials(merged, autoMdSync);

  // Override cadence.next.date with exact dates from earnings-calendar.json
  // (source of truth: 07_shared_sources.md §3, synced via sync-calendar.ts).
  merged = applyCalendarDates(merged);

  // Last pass: refresh stale `next` dates AND strip unsourced stack rows.
  for (const slug of Object.keys(merged)) {
    merged[slug] = stripUnsourcedStackRows(refreshCadence(merged[slug]));
  }
  return merged;
}

export const ALL_PROFILES: Record<string, CompanyTemplateData> = buildProfiles();

export function getProfile(slug: string): CompanyTemplateData | null {
  return ALL_PROFILES[slug] ?? null;
}

export function listProfileSlugs(): string[] {
  return Object.keys(ALL_PROFILES);
}
