import type { CompanyTemplateData } from "../schema";

// EU AI Act readiness overlay. Layered after every other partial so that
// hand-curated AI Act assessments are authoritative on the profile page.
//
// Curated for ~10 marquee EMEA accounts. The other 40 profiles render no
// pill yet; that data fills in over time as Rachel does the research.
//
// Deadline anchor: 2 Aug 2026 — high-risk AI systems become enforceable
// under the EU AI Act. In-store biometric / behavioural computer vision
// is the single biggest retail exposure; consumer GenAI assistants fall
// under the lighter "limited risk" tier (transparency obligations only).

export const aiActReadiness: Record<string, Partial<CompanyTemplateData>> = {
  lvmh: {
    aiAct: {
      status: "in_progress",
      jurisdiction: "EU AI Act primary (FR-domiciled)",
      oneLiner:
        "75 maisons each running their own AI stack means governance is decentralised. No group-level CDO/AI seat yet — Arnault has not appointed one, and AGM 2026 did not feature an AI-specific keynote. Material exposure on Sephora in-store biometrics; mitigation plan not public.",
      highRiskAreas: ["in-store biometric CV (Sephora, DFS)", "VIP clienteling profiling"],
      source: { label: "LVMH FY2025 annual + AGM 2026", url: "https://www.lvmh.com/investors/" },
    },
  },

  loreal: {
    aiAct: {
      status: "ready",
      jurisdiction: "EU AI Act primary (FR-domiciled)",
      oneLiner:
        "Samuel du Retail (GM AI – Data – Shared Services) named at the 24 April 2026 AGM as the executive accountable for AI acceleration. ModiFace and Beauty Genius are limited-risk consumer GenAI; biometric uses run with explicit consent flows. The strongest disclosed governance posture in EMEA luxury/beauty.",
      highRiskAreas: ["ModiFace AR try-on (limited risk, transparency obligations)"],
      source: { label: "L'Oréal AGM 24 April 2026", url: "https://www.loreal-finance.com/eng/press-release/annual-general-meeting-24-april-2026" },
    },
  },

  kering: {
    aiAct: {
      status: "ready",
      jurisdiction: "EU AI Act primary (FR-domiciled)",
      oneLiner:
        "Pierre Houlès appointed Chief Digital, AI & IT Officer (ExCom) effective 17 March 2026, reporting directly to the CEO. First group-level AI seat in EMEA luxury. Governance posture is now ahead of LVMH on disclosure.",
      highRiskAreas: ["clienteling profiling (limited to high risk depending on use)"],
      source: { label: "Kering ExCom announcement (Mar 2026)", url: "https://www.globenewswire.com/news-release/2026/03/17/3257505/0/en/Pierre-Houl%C3%A8s-appointed-Chief-Digital-AI-IT-Officer-at-Kering.html" },
    },
  },

  carrefour: {
    aiAct: {
      status: "in_progress",
      jurisdiction: "EU AI Act primary (FR-domiciled)",
      oneLiner:
        "Carrefour 2030 plan names AI/data as a pillar. ChatGPT-shopping flow live since 27 March 2026 is limited-risk (transparency obligations only). In-store CV via Vusion partnership and shelf-audit pilots fall in the high-risk band — compliance approach not yet publicly detailed.",
      highRiskAreas: ["in-store shelf-audit CV", "Vusion ESL behavioural analytics"],
      source: { label: "Carrefour 2030 strategic plan", url: "https://www.carrefour.com/en/news/2026/carrefour-2030" },
    },
  },

  zalando: {
    aiAct: {
      status: "limited",
      jurisdiction: "EU AI Act primary (DE-domiciled)",
      oneLiner:
        "Fashion Assistant and Size & Fit are limited-risk consumer GenAI (transparency obligations only — clear AI labelling, opt-out). No biometric or behavioural high-risk surface. Governance disclosure already meets August 2026 readiness for the surfaces that exist today.",
      highRiskAreas: [],
      source: { label: "Zalando AI assistant rollout (corporate.zalando.com)", url: "https://corporate.zalando.com/en/technology/zalando-brings-its-ai-powered-assistant-all-markets-and-adds-four-new-cities-its-trend" },
    },
  },

  unilever: {
    aiAct: {
      status: "ready",
      jurisdiction: "UK-domiciled, EU-facing (limited)",
      oneLiner:
        "AI deployment is concentrated on marketing creative productivity (limited-risk — synthetic content disclosure obligations). Fernando Fernandez owns AI direction at CEO level; no high-risk consumer surfaces disclosed. Q1 2026 (30 April) reaffirmed Fit for the AI Age as a CEO-level strategy.",
      highRiskAreas: [],
      source: { label: "Unilever Q1 2026 trading statement", url: "https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf" },
    },
  },

  nestle: {
    aiAct: {
      status: "in_progress",
      jurisdiction: "Swiss HQ, EU AI Act applies to EU-facing systems",
      oneLiner:
        "Fuel for Growth restructuring (16K roles, ~12K white-collar) explicitly names AI productivity as a savings lever. Internal HR/recruiting and performance-management automation likely falls in the AI Act's high-risk band; mitigation plan not public.",
      highRiskAreas: ["AI-driven HR/talent scoring (employment Annex III)"],
      source: { label: "Nestlé Fuel for Growth announcement", url: "https://www.nestle.com/media/news" },
    },
  },

  tesco: {
    aiAct: {
      status: "ready",
      jurisdiction: "UK-domiciled, EU-facing (Republic of Ireland stores only)",
      oneLiner:
        "Multi-cloud AI footprint (Azure + GCP) with named governance. Clubcard Pay+ AI uses fall in the limited-risk tier (transparency obligations). Limited EU-facing high-risk exposure — only Tesco Ireland operations are in scope.",
      highRiskAreas: [],
      source: { label: "Tesco AI/data disclosures", url: "https://www.tescoplc.com/" },
    },
  },

  inditex: {
    aiAct: {
      status: "ready",
      jurisdiction: "EU AI Act primary (ES-domiciled)",
      oneLiner:
        "In-house AI stack with no biometric or behavioural high-risk surfaces disclosed. The anti-cloud posture means data residency is already EU. Governance follows from existing platform engineering, not a new function.",
      highRiskAreas: [],
      source: { label: "Inditex FY2025 results", url: "https://www.inditex.com/itxcomweb/en/press" },
    },
  },

  "ahold-delhaize": {
    aiAct: {
      status: "in_progress",
      jurisdiction: "EU AI Act primary (NL-domiciled)",
      oneLiner:
        "Albert Heijn AI-assisted self-checkout deflection is the watch metric for Q1 2026 (results due 6 May). Deflection systems combine CV + behavioural inference — high-risk if deployed at scale. Compliance approach not yet publicly detailed.",
      highRiskAreas: ["Albert Heijn AI-assisted checkout (CV + inference)"],
      source: { label: "Ahold Delhaize Q1 2026 (6 May)", url: "https://newsroom.aholddelhaize.com/" },
    },
  },

  hm: {
    aiAct: {
      status: "limited",
      jurisdiction: "EU AI Act primary (SE-domiciled)",
      oneLiner:
        "Q1 2026 call featured AI mentions but no named production tools beyond marketing creative. No biometric or behavioural surfaces disclosed. Limited-risk posture by default until deployments materialise.",
      highRiskAreas: [],
      source: { label: "H&M Q1 2026 transcript", url: "https://hmgroup.com/investors/" },
    },
  },
};
