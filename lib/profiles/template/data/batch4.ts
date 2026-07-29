// Batch 4: cadence + quarterlyUpdate stub for every non-flagship profile.
// Every page now surfaces the same FY → Q1 → H1 reporting cadence and
// a Q1 2026 update banner pointing at the company's IR page. Concrete
// segment numbers are intentionally not fabricated — they fill in as
// editorial research lands. Companies with a fuller hand-curated
// cadence (LVMH, Carrefour) keep theirs via deep-merge precedence.

import type { CompanyTemplateData } from "../schema";

// AB InBev — batch 4 cadence + Q1 stub (generic, honest)
export const ab_inbev_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-27" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Adidas — batch 4 cadence + Q1 stub (generic, honest)
export const adidas_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-04" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Ahold Delhaize — batch 4 cadence + Q1 stub (generic, honest)
export const ahold_delhaize_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "Q4",               date: "2026-02-11" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "Q4 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Arla Foods — batch 4 cadence + Q1 stub (generic, honest)
export const arla_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-03" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// ASOS — batch 4 cadence + Q1 stub (generic, honest)
export const asos_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the GMV + AOV read for digital pure-plays. Watch for AI-led personalisation share of activity, customer service automation, and AI cost commentary.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Barilla — batch 4 cadence + Q1 stub (generic, honest)
export const barilla_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Beiersdorf — batch 4 cadence + Q1 stub (generic, honest)
export const beiersdorf_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-26" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Burberry — batch 4 cadence + Q1 stub (generic, honest)
export const burberry_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2024",               date: "2025-05-14" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2024 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Campari Group — batch 4 cadence + Q1 stub (generic, honest)
export const campari_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-10" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Carlsberg — batch 4 cadence + Q1 stub (generic, honest)
export const carlsberg_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-12" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Carrefour — batch 4 cadence + Q1 stub (generic, honest)
export const carrefour_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Colruyt Group — batch 4 cadence + Q1 stub (generic, honest)
export const colruyt_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2025-12-04" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Danone — batch 4 cadence + Q1 stub (generic, honest)
export const danone_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-20" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Decathlon — batch 4 cadence + Q1 stub (generic, honest)
export const decathlon_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Diageo — batch 4 cadence + Q1 stub (generic, honest)
export const diageo_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2026-02-04" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Essity — batch 4 cadence + Q1 stub (generic, honest)
export const essity_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-04" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Estée Lauder — batch 4 cadence + Q1 stub (generic, honest)
export const estee_lauder_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "Q2",               date: "2026-02-03" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "Q2 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Ferrero — batch 4 cadence + Q1 stub (generic, honest)
export const ferrero_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2024",               date: "2025-11-01" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2024 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Fnac Darty — batch 4 cadence + Q1 stub (generic, honest)
export const fnac_darty_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-03" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the GMV + AOV read for digital pure-plays. Watch for AI-led personalisation share of activity, customer service automation, and AI cost commentary.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// H&M — batch 4 cadence + Q1 stub (generic, honest)
export const hm_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Haleon — batch 4 cadence + Q1 stub (generic, honest)
export const haleon_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-05" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Heineken — batch 4 cadence + Q1 stub (generic, honest)
export const heineken_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-11" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// HelloFresh — batch 4 cadence + Q1 stub (generic, honest)
export const hellofresh_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-11" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the GMV + AOV read for digital pure-plays. Watch for AI-led personalisation share of activity, customer service automation, and AI cost commentary.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Henkel — batch 4 cadence + Q1 stub (generic, honest)
export const henkel_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-05" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Hermès — batch 4 cadence + Q1 stub (generic, honest)
export const hermes_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-12" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// IKEA / Ingka — batch 4 cadence + Q1 stub (generic, honest)
export const ikea_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2025-10" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Inditex — batch 4 cadence + Q1 stub (generic, honest)
export const inditex_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Jeronimo Martins — batch 4 cadence + Q1 stub (generic, honest)
export const jeronimo_martins_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-26" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Kering — batch 4 cadence + Q1 stub (generic, honest)
export const kering_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Kingfisher — batch 4 cadence + Q1 stub (generic, honest)
export const kingfisher_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-25" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// L'Oréal — batch 4 cadence + Q1 stub (generic, honest)
export const loreal_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Lavazza — batch 4 cadence + Q1 stub (generic, honest)
export const lavazza_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// LEGO Group — batch 4 cadence + Q1 stub (generic, honest)
export const lego_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-04" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Lotus Bakeries — batch 4 cadence + Q1 stub (generic, honest)
export const lotus_bakeries_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-20" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Mango — batch 4 cadence + Q1 stub (generic, honest)
export const mango_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Marks & Spencer — batch 4 cadence + Q1 stub (generic, honest)
export const marks_spencer_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2025-11-05" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Nespresso — batch 4 cadence + Q1 stub (generic, honest)
export const nespresso_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Nestlé — batch 4 cadence + Q1 stub (generic, honest)
export const nestle_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Ocado — batch 4 cadence + Q1 stub (generic, honest)
export const ocado_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// On Running — batch 4 cadence + Q1 stub (generic, honest)
export const on_running_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "Q3",               date: "2025-11-12" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "Q3 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales tell you whether AI inventory and personalisation are translating into sell-through. Read the Q1 to-FY guide spread for confidence.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Pernod Ricard — batch 4 cadence + Q1 stub (generic, honest)
export const pernod_ricard_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2026-02" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Puig — batch 4 cadence + Q1 stub (generic, honest)
export const puig_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-03-06" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Reckitt — batch 4 cadence + Q1 stub (generic, honest)
export const reckitt_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "2026-02-11" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Richemont — batch 4 cadence + Q1 stub (generic, honest)
export const richemont_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the demand-elasticity check: comparable-store growth by region and any GenAI / clienteling commentary from the maisons.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Sainsbury's — batch 4 cadence + Q1 stub (generic, honest)
export const sainsburys_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2025-11-06" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Sodexo — batch 4 cadence + Q1 stub (generic, honest)
export const sodexo_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "H1",               date: "2025-04-10" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "H1 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Tesco — batch 4 cadence + Q1 stub (generic, honest)
export const tesco_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 sales is a top-line read: watch for like-for-like growth and any explicit AI productivity callouts. Margin lands at H1.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Unilever — batch 4 cadence + Q1 stub (generic, honest)
export const unilever_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 organic growth and price/mix are the headline reads. AI commentary tends to live in the supply-chain and creative-productivity sections.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

// Zalando — batch 4 cadence + Q1 stub (generic, honest)
export const zalando_b4: Partial<CompanyTemplateData> = {
  cadence: {
    baseline:     { label: "FY2025",               date: "TBD" },
    lastReported: { label: "Q1 2026 sales window",  date: "Late April 2026" },
    next:         { label: "H1 2026 results",        date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales window in late April. Full H1 results with margin land late July 2026.",
  },
  investor: {
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "Late April 2026",
      blurb: "Quarterly sales window. See company IR for actual release date and segment numbers; Rachel will populate concrete metrics as the data lands.",
      metrics: [
        { label: "Reporting cadence", value: "Quarterly sales", trend: "Sales-only window, margin at H1" },
        { label: "Sector read",        value: "Watch for AI commentary", trend: "See Rachel's read" },
        { label: "Next milestone",     value: "H1 2026",         trend: "Late July 2026" },
      ],
      reading: "Q1 is the GMV + AOV read for digital pure-plays. Watch for AI-led personalisation share of activity, customer service automation, and AI cost commentary.",
      source: { label: "Company IR — quarterly releases" },
    },
  },
};

export const batch4: Record<string, Partial<CompanyTemplateData>> = {
  "ab-inbev": ab_inbev_b4,
  "adidas": adidas_b4,
  "ahold-delhaize": ahold_delhaize_b4,
  "arla": arla_b4,
  "asos": asos_b4,
  "barilla": barilla_b4,
  "beiersdorf": beiersdorf_b4,
  "burberry": burberry_b4,
  "campari": campari_b4,
  "carlsberg": carlsberg_b4,
  "carrefour": carrefour_b4,
  "colruyt": colruyt_b4,
  "danone": danone_b4,
  "decathlon": decathlon_b4,
  "diageo": diageo_b4,
  "essity": essity_b4,
  "estee-lauder": estee_lauder_b4,
  "ferrero": ferrero_b4,
  "fnac-darty": fnac_darty_b4,
  "hm": hm_b4,
  "haleon": haleon_b4,
  "heineken": heineken_b4,
  "hellofresh": hellofresh_b4,
  "henkel": henkel_b4,
  "hermes": hermes_b4,
  "ikea": ikea_b4,
  "inditex": inditex_b4,
  "jeronimo-martins": jeronimo_martins_b4,
  "kering": kering_b4,
  "kingfisher": kingfisher_b4,
  "loreal": loreal_b4,
  "lavazza": lavazza_b4,
  "lego": lego_b4,
  "lotus-bakeries": lotus_bakeries_b4,
  "mango": mango_b4,
  "marks-spencer": marks_spencer_b4,
  "nespresso": nespresso_b4,
  "nestle": nestle_b4,
  "ocado": ocado_b4,
  "on-running": on_running_b4,
  "pernod-ricard": pernod_ricard_b4,
  "puig": puig_b4,
  "reckitt": reckitt_b4,
  "richemont": richemont_b4,
  "sainsburys": sainsburys_b4,
  "sodexo": sodexo_b4,
  "tesco": tesco_b4,
  "unilever": unilever_b4,
  "zalando": zalando_b4,
};
