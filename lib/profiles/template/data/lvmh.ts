import type { CompanyTemplateData } from "../schema";

// LVMH — full canonical record. Every other company starts as a stub and
// fills in from this template as Rachel does the research.

export const lvmh: CompanyTemplateData = {
  slug: "lvmh",
  shortName: "LVMH",
  displayName: "LVMH Moët Hennessy Louis Vuitton",
  sectorPath: ["Companies", "Luxury", "LVMH"],

  cadence: {
    baseline:     { label: "FY2025",            date: "28 Jan 2026" },
    lastReported: { label: "Q1 2026 revenue",   date: "13 Apr 2026" },
    next:         { label: "H1 2026 full results", date: "Late July 2026" },
    blurb: "FY2025 is the annual baseline. Q1 2026 revenue (13 Apr) is the latest signal. Full H1 results with margin follow in late July 2026.",
  },

  investor: {
    fiscalYearLabel: "FY2025 baseline, in €",
    headline: {
      revenue:   { value: "€80.0B", reported: "-5.5% reported", organic: "+2.1% organic" },
      opMargin:  { value: "23.1%",  note: "€19.6B op profit, -8% YoY" },
      netDebt:   { value: "€9.2B",  note: "net debt/EBITDA 0.5x" },
      employees: { value: "213,000", note: "FY2025 average" },
    },
    operatingComplexity: {
      brands:    { value: "75",       note: "each with own systems" },
      stores:    { value: "~6,300",   note: "DOS + concessions" },
      countries: { value: "80+",      note: "data residency load" },
      hq:        { value: "Paris 🇫🇷", note: "EU AI Act primary" },
      languages: { value: "30+",      note: "client-facing" },
    },
    whyMatters:
      "75 decentralised maisons mean every use case has to be sold, proven, and deployed brand by brand. A Dior pilot doesn't auto-scale to Louis Vuitton. That's a very different AI readiness profile than a single-brand CPG with one data lake.",
    revenueStreams: [
      { label: "Fashion & Leather Goods", pct: "48%" },
      { label: "Selective Retailing",      pct: "20%" },
      { label: "Wines & Spirits",          pct: "12%" },
      { label: "Perfumes & Cosmetics",     pct: "10%" },
      { label: "Watches & Jewelry",        pct: "10%" },
    ],
    source: { label: "FY2025 results release, 28 Jan 2026", url: "https://www.lvmh.com/en/publications" },
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date:  "13 Apr 2026",
      blurb: "Revenue only, no margin disclosed at Q1",
      metrics: [
        { label: "Group revenue",     value: "€20.3B", trend: "+3% organic" },
        { label: "Fashion & Leather", value: "€10.0B", trend: "-3% organic, LV and Dior softer" },
        { label: "Selective Retailing", value: "€4.3B", trend: "+8% organic, Sephora outperforms" },
        { label: "Wines & Spirits",   value: "€1.7B", trend: "+5% organic" },
      ],
      reading:
        "Sephora continues to be the digital outperformer. Fashion & Leather softness is a China/Asia demand signal more than an AI story. Full margin picture waits for H1 July 2026.",
      source: { label: "LVMH Q1 2026 revenue release, 13 Apr 2026", url: "https://www.lvmh.com/en/financial-calendar" },
    },
  },

  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 3.0",
    rhetoric: 2,
    production: 4,
    evidence: "confirmed",
    lastScored: "13 Apr 2026",
    rubric: "v1.0",
    trend: {
      rhetoric:   "2 → 2 (flat)",
      production: "3 → 4 ↑",
      tools:      "+2 this quarter",
      vendors:    "+1 (Google Cloud)",
    },
  },

  narrative: {
    quoteLatest: {
      eyebrow: "Q1 2026 · 13 Apr 2026 — most recent",
      htmlQuote:
        "<strong>Sephora</strong> continued its strong momentum, driven by <strong>personalisation</strong> and <strong>digital innovation</strong>. Across the Group, we are deploying <strong>technology selectively</strong> where it creates tangible value for our clients and our Maisons.",
      speaker: "CFO Jean-Jacques Guiony · Q1 2026 revenue call · 13 Apr 2026",
      sources: [
        { label: "📄 Q1 2026 revenue release", url: "https://www.lvmh.com/en/financial-calendar" },
        { label: "🎧 Earnings call · LVMH IR", url: "https://www.lvmh.com/en/investors" },
      ],
    },
    quoteAnnual: {
      eyebrow: "FY2025 annual · 28 Jan 2026",
      htmlQuote:
        "We see <strong>generative AI</strong> as a quiet <strong>productivity layer</strong> across our maisons, particularly in <strong>creative ideation</strong> and <strong>inventory optimization</strong>. We are not leading with it publicly, but it is <strong>operational across three houses</strong> today.",
      speaker: "CFO Jean-Jacques Guiony · FY2025 earnings call · 28 Jan 2026",
      sources: [
        { label: "📄 FY2025 annual report",       url: "https://www.lvmh.com/en/publications" },
        { label: "🎧 FY2025 earnings call audio", url: "https://www.lvmh.com/en/investors" },
      ],
    },
    framing: {
      headline: "Efficiency / operational.",
      body: "CFO frames AI as a productivity layer, not a strategic moat. Consistent across 3 quarters.",
    },
    dedicatedSection: {
      headline: "Partial.",
      body: "\"Technology & Innovation\" section in FY2025 annual (p.45-49), no standalone AI chapter. One dedicated slide in Q4 deck.",
    },
  },

  leadership: {
    presenter: {
      html: "<strong>Jean-Jacques Guiony, CFO.</strong> Presented the AI section at the last 3 earnings calls. No dedicated Chief AI Officer announced as of Apr 2026.",
      source: { label: "📄 Q1 2026 earnings call", url: "https://www.lvmh.com/en/investors" },
    },
    sectorAppointments: [
      { html: "<strong>Kering</strong> appointed a Chief Data, AI &amp; IT Officer to the Executive Committee, Mar 2026. <a class=\"source-chip\" href=\"https://www.kering.com/en/news-highlights/\" target=\"_blank\" rel=\"noopener\" style=\"margin-left:.3rem\">Press ↗</a>" },
      { html: "<strong>L'Oréal</strong> named a Chief Digital &amp; Marketing Officer with AI remit, 2024. <a class=\"source-chip\" href=\"https://www.loreal.com/en/group/loreal-profile/leadership-team/\" target=\"_blank\" rel=\"noopener\" style=\"margin-left:.3rem\">Press ↗</a>" },
      { html: "<strong>LVMH</strong>: no publicly confirmed group-level AI officer. Maisons hold local CTOs." },
    ],
    appointmentsNote: "Scraped weekly from company leadership pages + press releases.",
  },

  production: {
    namedTools: {
      tools: [
        { html: "Creative ideation platform (Dior): internal GenAI tool for design drafts" },
        { html: "Inventory forecasting (Louis Vuitton): 3-year ML program with Google Cloud" },
        { html: "Personal shopping assistant (Sephora, GenAI): launched Oct 2025" },
        { html: "Watch authentication AI (Tag Heuer)" },
      ],
      sources: [
        { label: "📄 FY2025 annual report · p.47" },
        { label: "🌐 Google Cloud case study" },
        { label: "📄 Sephora press · Oct 2025" },
      ],
    },
    consumerFacing:
      "<strong>Sephora GenAI shopping assistant.</strong> Launched October 2025, available in France, UK, US. First-party app feature.",
    quantifiedROI: {
      html: "No explicit figures disclosed. Analyst estimates suggest ~€180M opex savings attributed to AI-enabled inventory optimization in FY2025.",
      source: { label: "📄 Bernstein note · Feb 2026" },
    },
    genAI: {
      mentioned: true,
      mentionCount: 7,
      vendors: [
        { name: "OpenAI",     url: "https://openai.com" },
        { name: "Mistral AI", url: "https://mistral.ai" },
        { name: "Writer",     url: "https://writer.com" },
        { name: "Cohere",     url: "https://cohere.com" },
      ],
      note: "Mistral named in FY2025 annual (French-sovereign model preference). OpenAI referenced via Azure OpenAI. Writer cited in Sephora press Oct 2025.",
    },
    stackTable: [
      { layer: "Foundation model", product: "Azure OpenAI (GPT-4o)",      use: "Creative ideation, Dior design team",        source: { label: "MS case study" } },
      { layer: "ML platform",      product: "Google Cloud Vertex AI",     use: "Inventory forecasting, LV 3-yr program",     source: { label: "GCP case" } },
      { layer: "Productivity",     product: "M365 Copilot",               use: "HQ rollout, scale undisclosed",              source: { label: "LinkedIn hints" } },
      { layer: "CRM / commerce",   product: "Salesforce Einstein",        use: "Sephora consumer assistant layer",           source: { label: "Sephora press" } },
      { layer: "SI partner",       product: "Accenture",                  use: "Group-wide AI governance workstream",        source: { label: "Not publicly confirmed" } },
    ],
  },

  vendorStack: {
    namedPartners: [
      { name: "Azure OpenAI" },
      { name: "Google Cloud Vertex AI" },
      { name: "Microsoft 365 Copilot" },
      { name: "Google Workspace" },
      { name: "Accenture" },
      { name: "Salesforce Einstein" },
      { name: "Anthropic", status: "absent" },
    ],
    partnersNote: "No confirmed Anthropic or OpenAI direct-enterprise relationship as of Apr 2026. Dashes indicate absence.",
  },

  byMaison: {
    maisons: [
      { brand: "Louis Vuitton", description: "3-year inventory forecasting program with Google Cloud, launched 2024", source: { label: "GCP case study", url: "https://cloud.google.com/customers" } },
      { brand: "Dior",          description: "Internal GenAI creative ideation platform for design teams; DIOR ID virtual try-on for lip colour", source: { label: "Dior press", url: "https://www.dior.com/en_gb/fashion/articles-and-movies/the-magazine/article-diorio-augmented-reality" } },
      { brand: "Sephora",       description: "Consumer-facing GenAI shopping assistant, launched Oct 2025. Personal Beauty Advisor across web and app.", source: { label: "Sephora AI", url: "https://www.sephora.com/beauty/artificial-intelligence" } },
      { brand: "Sephora",       description: "Microsoft partnership for personalised recommendation engine and store associate AI tools", source: { label: "Microsoft story", url: "https://news.microsoft.com/source/" } },
      { brand: "Fenty Beauty",  description: "Partnership with OpenAI for creative marketing and shade-match AI, announced Jan 2026", source: { label: "Fenty Beauty", url: "https://www.fentybeauty.com" } },
      { brand: "Tag Heuer",     description: "AI-powered watch authentication service for the secondary market", source: { label: "TAG Heuer", url: "https://www.tagheuer.com" } },
    ],
    note: "Maison-level AI coverage is scraped from brand press pages weekly. Multi-brand portfolios (LVMH, Kering, Richemont, Unilever) get per-maison pulls, otherwise signal stays group-level.",
  },

  furtherReading: [
    { label: "🌐 Google Cloud: LVMH AI & inventory forecasting", url: "https://cloud.google.com/customers" },
    { label: "🌐 Microsoft: LVMH partnership hub",                url: "https://news.microsoft.com/source/" },
    { label: "📰 Microsoft News: Sephora AI try-on",              url: "https://news.microsoft.com/source/" },
    { label: "📄 LVMH FY2025 Annual Report",                       url: "https://www.lvmh.com/en/publications" },
    { label: "📅 LVMH Financial Calendar",                          url: "https://www.lvmh.com/en/financial-calendar" },
    { label: "🌐 Sephora AI: Virtual Beauty Try-On",                url: "https://www.sephora.com/beauty/artificial-intelligence" },
    { label: "📰 WWD: LVMH coverage",                                url: "https://wwd.com/tag/lvmh/" },
  ],

  rachelNotes: [
    { lead: "Quiet-build posture.",       body: "LVMH publicly downplays GenAI but has real tools in production. Expect the Rhetoric score to remain flat: Arnault will not make AI the story." },
    { lead: "Multi-cloud, not single-partner.", body: "Google Cloud leads on ML workloads, Azure leads on productivity and creative GenAI. No exclusive deal publicly confirmed." },
    { lead: "Watch-list:",                 body: "if Sephora scales the GenAI assistant to DACH and APAC in 2026, production score likely 4 → 5." },
  ],

  peerComparison: [
    { peer: "Kering",   note: "Both Silent Builders (Rhetoric 2/5). Kering moved faster on governance: appointed a Chief Data, AI & IT Officer to exec committee Mar 2026. LVMH has no group-level AI officer." },
    { peer: "L'Oréal",  note: "L'Oréal is the sector's AI Performer (Rhetoric 5, Production 4). Beauty Genius in 14 markets vs LVMH's Sephora assistant in 3. L'Oréal talks openly; LVMH builds quietly.", accent: "rust" },
    { peer: "Inditex",  note: "Inditex (Zara) also low rhetoric but high supply-chain AI maturity. Key difference: Inditex is a single brand; LVMH has 75 maisons, making rollout 75x harder." },
  ],

  sources: [
    { label: "📄 FY2025 annual report",     url: "https://www.lvmh.com/en/publications" },
    { label: "📄 Q1 2026 transcript",        url: "https://www.lvmh.com/en/financial-calendar" },
    { label: "📄 FY2025 earnings call",      url: "https://www.lvmh.com/en/investors/publications" },
    { label: "🎯 Investor day 2025 deck",   url: "https://www.lvmh.com/en/investors/publications" },
    { label: "🌐 Google Cloud case study",  url: "https://cloud.google.com/customers" },
    { label: "📰 Sephora press · Oct 2025", url: "https://www.sephora.com" },
    { label: "📄 Bernstein analyst note" },
  ],

  askPrompts: [
    "What's LVMH's position on generative AI?",
    "Which maisons have live AI products?",
    "Compare LVMH and Kering's AI approach",
    "Any hints at an LVMH Chief AI Officer?",
  ],
};
