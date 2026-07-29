/**
 * Demo mode.
 *
 * Append `?demo=1` to any URL and the app runs with no backend at all:
 * Clerk auth is skipped, every read is served from `config/demo-companies.json`,
 * and every write is a no-op that never reaches Redis. The proxy drops a
 * short-lived `rachel_demo` cookie so client-side navigation stays in demo
 * once you are in it.
 *
 * All companies, figures, quotes and people in the demo data are invented.
 *
 * To leave demo mode, append `?demo=0` or clear the cookie.
 */

import { cookies } from "next/headers";
import demoData from "../config/demo-companies.json";
import { RUBRIC_VERSION, deriveComposite, type CompanyProfile, type Quadrant } from "./profiles/schema";

export const DEMO_COOKIE = "rachel_demo";

/** Server-side demo check. Safe to call from any server component or route. */
export async function isDemo(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(DEMO_COOKIE)?.value === "1";
  } catch {
    return false;
  }
}

type DemoCompany = (typeof demoData.companies)[number];

function toProfile(c: DemoCompany): CompanyProfile {
  const rhetoric = c.rhetoric;
  const production = c.production;
  const tools = (c.tools ?? []) as Array<{ name: string; category: string }>;

  return {
    slug: c.slug,
    meta: {
      company: c.company,
      ticker: c.ticker,
      hq: { city: c.city, country: c.country, aiActApplies: true },
      sector: c.sector as CompanyProfile["meta"]["sector"],
      isGroup: Boolean((c as { isGroup?: boolean }).isGroup),
      isAINative: Boolean((c as { isAINative?: boolean }).isAINative),
      isPrivate: Boolean((c as { isPrivate?: boolean }).isPrivate),
    },
    investorSnapshot: {
      revenue: {
        absolute: c.revenueB,
        currency: c.currency,
        yoyPublishedPct: c.yoyPct,
        evidenceTier: "confirmed",
      },
      operatingProfit: {
        absolute: Math.round(c.revenueB * (c.opMarginPct / 100) * 10) / 10,
        currency: c.currency,
        marginPct: c.opMarginPct,
        evidenceTier: "confirmed",
      },
      netCash: { absolute: 0, currency: c.currency, evidenceTier: "estimated" },
      employees: { headcount: c.employees, evidenceTier: "confirmed" },
      maisons: [],
      retailStores: { byType: [], evidenceTier: "estimated" },
      countries: { regions: ["EMEA"] },
      hq: { city: c.city, country: c.country, aiActApplies: true },
      languages: ["en"],
      reporting: { latestReportDate: "2026-02-11", nextTradingUpdate: null },
      revenueStreams: [],
    },
    aiPerception: {
      score: {
        rhetoric,
        production,
        composite: deriveComposite({ rhetoric, production }),
        quadrant: c.quadrant as Quadrant,
        rubricVersion: RUBRIC_VERSION,
      },
      keyEarningsQuote: (c as { quote?: { text: string; speaker: string; role?: string; date: string } }).quote,
      namedProductionTools: tools.map((t) => ({
        name: t.name,
        category: t.category as "consumer",
        evidenceTier: "confirmed" as const,
      })),
      aiFraming: {
        value: c.framing as "moat",
        evidenceTier: "confirmed",
      },
      quantifiedROI: {
        stated: Boolean((c as { roiFigure?: string }).roiFigure),
        figure: (c as { roiFigure?: string }).roiFigure,
        evidenceTier: "confirmed",
      },
      consumerFacingAIProduct: {
        exists: Boolean(c.consumerProduct),
        name: c.consumerProduct ?? undefined,
        evidenceTier: "confirmed",
      },
      vendorPartners: (c.vendors ?? []).map((name) => ({
        name,
        evidenceTier: "confirmed" as const,
      })),
      aiAnalyticsStack: [],
      notes: c.notes ?? "",
      cSuiteAIPresenter: { exists: rhetoric >= 4, evidenceTier: "estimated" },
      sectorAppointments: [],
      genAIMentioned: { value: rhetoric >= 3, evidenceTier: "confirmed" },
      dedicatedAISection: { value: rhetoric >= 4, evidenceTier: "confirmed" },
      maisonHighlights: [],
    },
    recentSources: [],
  } as CompanyProfile;
}

/** Fictional profiles, sorted the same way the real store sorts them. */
export function demoProfiles(): CompanyProfile[] {
  return demoData.companies
    .map(toProfile)
    .sort((a, b) => a.meta.company.localeCompare(b.meta.company));
}

export function demoProfile(slug: string): CompanyProfile | null {
  return demoProfiles().find((p) => p.slug === slug) ?? null;
}

/** Fictional pulse feed, timestamped relative to now so it never looks stale. */
export function demoPulse(): Array<Record<string, unknown>> {
  return demoData.pulse.map((p, i) => {
    const ts = new Date(Date.now() - p.ageHours * 3600e3).toISOString();
    return {
      id: `demo-pulse-${i}`,
      headline: p.headline,
      category: p.category,
      source: p.source,
      url: null,
      relevantAccounts: p.relevantAccounts ?? [],
      vendorRelevance: [],
      soWhat: p.soWhat,
      date: ts.slice(0, 10),
      ts,
      ingestedAt: ts,
      addedBy: "demo",
      sourceType: "other",
    };
  });
}
