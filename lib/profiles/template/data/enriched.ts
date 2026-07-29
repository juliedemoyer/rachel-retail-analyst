// Enriched profiles for the first batch of 11 ready companies.
// Auto-generated from data/companies/*.md by tools/scripts. LVMH ships its
// canonical record separately.

import type { CompanyTemplateData } from "../schema";

// ASOS — enriched from data/companies/asos.md
export const asos: CompanyTemplateData = {
  slug: "asos",
  shortName: "ASOS",
  displayName: "ASOS",
  sectorPath: ["Companies", "Apparel & E-commerce", "ASOS"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2025-11-05" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-05-15" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "£3.5B", reported: "-1.2% reported", organic: "-1.2% organic" },
      opMargin:  { value: "2.1%", note: "£0.073B op profit" },
      netDebt:   { value: "£0.3B" },
      employees: { value: "2,400" },
    },
    operatingComplexity: {
      countries: { value: "200+", note: "WORLDWIDE" },
      hq:        { value: "London 🇬🇧" },
      languages: { value: "en" },
    },
    revenueStreams: [
      { label: "UK", pct: "41%" },
      { label: "EU", pct: "33%" },
      { label: "US", pct: "14%" },
      { label: "RoW", pct: "12%" },
    ],
    source: { label: "Latest results", url: "https://www.asosplc.com/investors/results-centre/" },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 3.5",
    rhetoric: 3,
    production: 4,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Our AI Stylist on Azure OpenAI is reshaping discovery. Personalisation drives a measurable basket-size lift.",
      speaker: "José Antonio Ramos Calamonte, CEO · 2025-11-05",
      sources: [
      { label: "Source", url: "https://www.asosplc.com/investors/results-centre/" },
      ],
    },
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Cliff Cohen</strong>, CTO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>AI Stylist</strong> — <span style=\"color:var(--text-mid)\">consumer, Higher basket size</span>" },
        { html: "<strong>Demand forecasting (ML)</strong> — <span style=\"color:var(--text-mid)\">supply_chain</span>" },
        { html: "<strong>GitHub Copilot for engineering</strong> — <span style=\"color:var(--text-mid)\">ops</span>" },
      ],
      sources: [
        { label: "📄 AI Stylist", url: "https://www.microsoft.com/en/customers/story/1731404546482708710-asos-retailer-azure-ai-studio" },
        { label: "📄 Demand forecasting (ML)", url: "https://www.asosplc.com" },
        { label: "📄 GitHub Copilot for engineering", url: "https://www.microsoft.com/en/customers/story/1731404546482708710-asos-retailer-azure-ai-studio" },
      ],
    },
    consumerFacing: "<strong>AI Stylist</strong>. Confirmed live consumer feature.",
    quantifiedROI: {
      html: "AI Stylist drives measurable basket-size lift; not yet broken out as % uplift.",
    },
    genAI: {
      mentioned: true,
      mentionCount: 6,
    },
    stackTable: [
      { layer: "CLOUD", product: "Azure", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "LLM", product: "Azure OpenAI", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "ML", product: "Azure AI Foundry", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "DATA", product: "Cosmos DB", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "APP", product: "GitHub Copilot", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "Deep Microsoft customer.", body: "CTO Cliff Cohen is the AI champion. 5-year Azure deal renewed 2022, 3-year AI collaboration extension announced 2024." },
    { lead: "Note.", body: "Tech-first culture, will likely be among the first UK e-commerce names to publish hard AI ROI numbers." },
    { lead: "Note.", body: "Watch for the H1 FY26 trading update (~May 2026) for first basket-size lift figure." },
  ],
  sources: [
    { label: "📄 www.asosplc.com", url: "https://www.asosplc.com/investors/results-centre/" },
    { label: "📄 www.asosplc.com", url: "https://www.asosplc.com" },
    { label: "📄 www.microsoft.com", url: "https://www.microsoft.com/en/customers/story/1731404546482708710-asos-retailer-azure-ai-studio" },
    { label: "📄 ukstories.microsoft.com", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
  ],
  askPrompts: [
    "What's ASOS's position on generative AI?",
    "Who runs the AI agenda at ASOS?",
    "What named tools is ASOS running in production?",
  ],
};

// Carrefour — enriched from data/companies/carrefour.md
export const carrefour: CompanyTemplateData = {
  slug: "carrefour",
  shortName: "Carrefour",
  displayName: "Carrefour",
  sectorPath: ["Companies", "Grocery", "Carrefour"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-19" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-24" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€94.1B", reported: "+0.4% reported", organic: "+1.8% organic" },
      opMargin:  { value: "3.1%", note: "€2.92B op profit, +5.7% YoY" },
      netDebt:   { value: "€1.6B", note: "net debt/EBITDA 0.4x" },
      employees: { value: "340,000" },
    },
    operatingComplexity: {
      stores:    { value: "~14,000", note: "1,320 hypermarket, 3,500 supermarket" },
      countries: { value: "40+", note: "EMEA, LATAM" },
      hq:        { value: "Massy 🇫🇷", note: "EU AI Act primary" },
      languages: { value: "2+" },
    },
    revenueStreams: [
      { label: "France", pct: "51%" },
      { label: "Europe (excl. France)", pct: "24%" },
      { label: "Latin America", pct: "25%" },
    ],
    source: { label: "Latest results", url: "https://www.carrefour.com/en/finance/publications-and-presentations" },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 4.0",
    rhetoric: 4,
    production: 4,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Generative AI is reshaping how our customers shop. Hopla+ is now used by millions of French households every month.",
      speaker: "Alexandre Bompard, Chairman & CEO · 2026-02-19",
      sources: [
      { label: "Source", url: "https://www.carrefour.com/en/finance/publications-and-presentations" },
      ],
    },
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Alexandre Bompard</strong>, Chairman & CEO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://www.carrefour.com/en/finance/publications-and-presentations" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Hopla+</strong> — <span style=\"color:var(--text-mid)\">consumer, 2M+ active users</span>" },
        { html: "<strong>Dynamic pricing engine</strong> — <span style=\"color:var(--text-mid)\">merchandising</span>" },
        { html: "<strong>Product sheet enrichment (GenAI)</strong> — <span style=\"color:var(--text-mid)\">merchandising, 2,000+ sheets enriched</span>" },
      ],
      sources: [
        { label: "📄 Hopla+", url: "https://www.carrefour.com/en/newsroom/hopla-generative-ai" },
        { label: "📄 Dynamic pricing engine", url: "https://www.carrefour.com/en/newsroom" },
        { label: "📄 Product sheet enrichment (GenAI)", url: "https://www.microsoft.com/en-us/industry/blog/retail/2024/04/02/threefold-revolution-the-influence-of-generative-ai-on-retail-and-consumer-goods/" },
      ],
    },
    consumerFacing: "<strong>Hopla+</strong>. Confirmed live consumer feature.",
    quantifiedROI: {
      html: "Hopla+ has 2M+ active users; productivity automation saves 200K hours/year.",
      source: { label: "📄 Source", url: "https://www.carrefour.com/en/newsroom/hopla-generative-ai" },
    },
    genAI: {
      mentioned: true,
      mentionCount: 11,
    },
    stackTable: [
      { layer: "LLM", product: "Azure OpenAI (GPT-4)", use: "Confirmed in stack", source: { label: "Source", url: "https://www.microsoft.com/en-us/industry/blog/retail/2024/04/02/threefold-revolution-the-influence-of-generative-ai-on-retail-and-consumer-goods/" } },
      { layer: "CLOUD", product: "Azure", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "APP", product: "Power BI", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft" },
      { name: "Google" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "Poster child for AI in EU grocery.", body: "Bompard talks AI on every call and ships measurably. Hopla+ on Azure OpenAI is the lighthouse." },
    { lead: "Note.", body: "340K employees = massive transformation scale, headcount sensitivity to GenAI productivity gains is the watch metric." },
    { lead: "Note.", body: "Microsoft relationship is cited in case study; delivered with Bain & Microsoft." },
    { lead: "Note.", body: "Q1 2026 sales on 2026-04-24 — watch for Hopla+ engagement metrics + first mention of agentic AI for in-store associates." },
  ],
  sources: [
    { label: "📄 www.carrefour.com", url: "https://www.carrefour.com/en/newsroom/hopla-generative-ai" },
    { label: "📄 www.microsoft.com", url: "https://www.microsoft.com/en-us/industry/blog/retail/2024/04/02/threefold-revolution-the-influence-of-generative-ai-on-retail-and-consumer-goods/" },
    { label: "📄 www.carrefour.com", url: "https://www.carrefour.com/en/finance/publications-and-presentations" },
    { label: "📄 www.carrefour.com", url: "https://www.carrefour.com/en/newsroom" },
    { label: "📄 cloud.google.com", url: "https://cloud.google.com" },
  ],
  askPrompts: [
    "What's Carrefour's position on generative AI?",
    "Who runs the AI agenda at Carrefour?",
    "What named tools is Carrefour running in production?",
  ],
};

// H&M Group — enriched from data/companies/hm.md
export const hm: CompanyTemplateData = {
  slug: "hm",
  shortName: "H&M",
  displayName: "H&M Group",
  sectorPath: ["Companies", "Apparel & E-commerce", "H&M Group"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-01-30" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-03-27" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "$22.0B", reported: "+0.5% reported", organic: "+1.0% organic" },
      opMargin:  { value: "6.8%", note: "$1.5B op profit, +4.2% YoY" },
      netDebt:   { value: "$1.0B" },
      employees: { value: "150,000" },
    },
    operatingComplexity: {
      stores:    { value: "~4,300" },
      countries: { value: "77+", note: "EMEA, AMER, APAC" },
      hq:        { value: "Stockholm 🇸🇪", note: "EU AI Act primary" },
      languages: { value: "2+" },
      brands:    { value: "5+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "EMEA", pct: "71%" },
      { label: "AMER", pct: "18%" },
      { label: "APAC", pct: "11%" },
    ],
    source: { label: "Latest results", url: "https://hmgroup.com/investors/" },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 3.0",
    rhetoric: 3,
    production: 3,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "No.",
      body: "No standalone AI chapter; AI commentary woven through Technology & Innovation section.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Daniel Erver</strong>, CEO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://hmgroup.com/investors/" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>AI design assistant (in-house)</strong> — <span style=\"color:var(--text-mid)\">creative</span>" },
        { html: "<strong>Allocation & demand ML</strong> — <span style=\"color:var(--text-mid)\">supply_chain</span>" },
      ],
      sources: [
        { label: "📄 AI design assistant (in-house)", url: "https://hmgroup.com" },
        { label: "📄 Allocation & demand ML", url: "https://hmgroup.com" },
      ],
    },
    genAI: {
      mentioned: true,
      mentionCount: 4,
    },
    stackTable: [
      { layer: "CLOUD", product: "Azure", use: "Estimated from public signals", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "CEO Daniel Erver mentions AI in design + supply chain on most calls.", body: "Volume of consumer-facing AI products still low. Stockholm HQ = AI Act applies." },
  ],
  sources: [
    { label: "📄 hmgroup.com", url: "https://hmgroup.com" },
    { label: "📄 hmgroup.com", url: "https://hmgroup.com/investors/" },
    { label: "📄 news.microsoft.com", url: "https://news.microsoft.com" },
  ],
  askPrompts: [
    "What's H&M Group's position on generative AI?",
    "Who runs the AI agenda at H&M Group?",
    "What named tools is H&M Group running in production?",
  ],
};

// Inditex — enriched from data/companies/inditex.md
export const inditex: CompanyTemplateData = {
  slug: "inditex",
  shortName: "Inditex",
  displayName: "Inditex",
  sectorPath: ["Companies", "Apparel & E-commerce", "Inditex"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-03-12" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-06-11" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€38.6B", reported: "+7.1% reported", organic: "+7.5% organic" },
      opMargin:  { value: "19.4%", note: "€7.5B op profit, +9.0% YoY" },
      netDebt:   { value: "€11.5B" },
      employees: { value: "165,000" },
    },
    operatingComplexity: {
      stores:    { value: "~5,800" },
      countries: { value: "96+", note: "EMEA, AMER, APAC" },
      hq:        { value: "Arteixo 🇪🇸", note: "EU AI Act primary" },
      languages: { value: "2+" },
      brands:    { value: "7+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "Zara", pct: "73%" },
      { label: "Other brands", pct: "27%" },
    ],
    source: { label: "Latest results", url: "https://www.inditex.com/itxcomweb/en/investors/" },
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 2.5",
    rhetoric: 2,
    production: 3,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "No.",
      body: "No standalone AI chapter; AI commentary woven through Technology & Innovation section.",
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Inventory & demand AI (in-house)</strong> — <span style=\"color:var(--text-mid)\">supply_chain</span>" },
        { html: "<strong>RFID + ML store ops</strong> — <span style=\"color:var(--text-mid)\">ops</span>" },
      ],
      sources: [
        { label: "📄 Inventory & demand AI (in-house)", url: "https://www.inditex.com" },
        { label: "📄 RFID + ML store ops", url: "https://www.inditex.com" },
      ],
    },
    genAI: {
      mentioned: false,
      mentionCount: 1,
    },
    stackTable: [
      { layer: "DATA", product: "RFID platform", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  rachelNotes: [
    { lead: "Inditex says almost nothing about AI publicly while running a famously sophisticated supply chain on it.", body: "Spanish family-controlled = light disclosure culture." },
  ],
  sources: [
    { label: "📄 www.inditex.com", url: "https://www.inditex.com/itxcomweb/en/investors/" },
    { label: "📄 www.inditex.com", url: "https://www.inditex.com" },
  ],
  askPrompts: [
    "What's Inditex's position on generative AI?",
    "Who runs the AI agenda at Inditex?",
    "What named tools is Inditex running in production?",
  ],
};

// Kering — enriched from data/companies/kering.md
export const kering: CompanyTemplateData = {
  slug: "kering",
  shortName: "Kering",
  displayName: "Kering",
  sectorPath: ["Companies", "Luxury & Beauty", "Kering"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-11" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-22" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€17.2B", reported: "-12.4% reported", organic: "-12.0% organic" },
      opMargin:  { value: "14.8%", note: "€2.55B op profit, -45.2% YoY" },
      netDebt:   { value: "€10.5B", note: "net debt/EBITDA 2.4x" },
      employees: { value: "49,000" },
    },
    operatingComplexity: {
      stores:    { value: "~1,779", note: "1,779 dos" },
      countries: { value: "65+", note: "EMEA, AMER, APAC" },
      hq:        { value: "Paris 🇫🇷", note: "EU AI Act primary" },
      languages: { value: "2+" },
      brands:    { value: "5+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "Gucci", pct: "44%" },
      { label: "Saint Laurent", pct: "17%" },
      { label: "Other Houses", pct: "24%" },
      { label: "Eyewear & Beauty", pct: "15%" },
    ],
    source: { label: "Latest results", url: "https://www.kering.com/en/finance/" },
  },
  aiPerception: {
    quadrant: "narrative_led",
    label: "Narrative-led · 2.5",
    rhetoric: 3,
    production: 2,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "No.",
      body: "No standalone AI chapter; AI commentary woven through Technology & Innovation section.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      mentionCount: 2,
    },
  },
  rachelNotes: [
    { lead: "Kering is reorganising under new CEO Luca de Meo (from Renault).", body: "Watch for an AI / digital strategy reset in next 2 quarters. Gucci turnaround dominates board attention; AI rhetoric is rising but production is still thin." },
  ],
  sources: [
    { label: "📄 www.kering.com", url: "https://www.kering.com/en/finance/" },
  ],
  askPrompts: [
    "What's Kering's position on generative AI?",
    "Who runs the AI agenda at Kering?",
    "What named tools is Kering running in production?",
  ],
};

// L'Oréal — enriched from data/companies/loreal.md
export const loreal: CompanyTemplateData = {
  slug: "loreal",
  shortName: "L'Oréal",
  displayName: "L'Oréal",
  sectorPath: ["Companies", "Luxury & Beauty", "L'Oréal"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-06" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-29" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€43.5B", reported: "+5.1% reported", organic: "+5.6% organic" },
      opMargin:  { value: "20.0%", note: "€8.7B op profit, +4.8% YoY" },
      netDebt:   { value: "€1.5B" },
      employees: { value: "90,000" },
    },
    operatingComplexity: {
      countries: { value: "150+", note: "WORLDWIDE" },
      hq:        { value: "Clichy 🇫🇷", note: "EU AI Act primary" },
      languages: { value: "2+" },
      brands:    { value: "6+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "Consumer Products", pct: "38%" },
      { label: "L'Oréal Luxe", pct: "36%" },
      { label: "Dermatological Beauty", pct: "16%" },
      { label: "Professional Products", pct: "10%" },
    ],
    source: { label: "Latest results", url: "https://www.loreal-finance.com/en/" },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 5.0",
    rhetoric: 5,
    production: 5,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Beauty Genius and ModiFace are now used by tens of millions of consumers worldwide. AI is not a tool for us, it is the future of beauty.",
      speaker: "Nicolas Hieronimus, CEO · 2026-02-06",
      sources: [
      { label: "Source", url: "https://www.loreal-finance.com/en/" },
      ],
    },
    framing: {
      headline: "Moat.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Stéphane Lannuzel</strong>, Chief Tech & Operations Officer. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://www.loreal-finance.com/en/" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Beauty Genius (GenAI advisor)</strong> — <span style=\"color:var(--text-mid)\">consumer</span>" },
        { html: "<strong>ModiFace AR try-on</strong> — <span style=\"color:var(--text-mid)\">consumer</span>" },
        { html: "<strong>CreAItech (creative GenAI)</strong> — <span style=\"color:var(--text-mid)\">marketing</span>" },
      ],
      sources: [
        { label: "📄 Beauty Genius (GenAI advisor)", url: "https://www.loreal.com/en/news/beauty-tech/beauty-genius/" },
        { label: "📄 ModiFace AR try-on", url: "https://www.loreal.com/en/news/beauty-tech/modiface/" },
        { label: "📄 CreAItech (creative GenAI)", url: "https://www.loreal.com/en/news/" },
      ],
    },
    consumerFacing: "<strong>Beauty Genius</strong>. Confirmed live consumer feature.",
    quantifiedROI: {
      html: "Beauty Genius scaling globally; ModiFace integrated across 30+ brands.",
    },
    genAI: {
      mentioned: true,
      mentionCount: 14,
    },
    stackTable: [
      { layer: "CLOUD", product: "Nvidia GPUs", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "ML", product: "ModiFace ML platform", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Nvidia" },
      { name: "Google Cloud" },
      { name: "Microsoft" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Lancôme", description: "Beauty Genius integrated into Lancôme.com global rollout.", source: { label: "Press", url: "https://www.lancome.com" } },
    ],
  },
  rachelNotes: [
    { lead: "L'Oréal is the rhetoric+production champion in the watchlist.", body: "Hieronimus mentions AI on every call, ModiFace acquisition (2018) was prescient, Beauty Genius is the GenAI flagship." },
    { lead: "Note.", body: "Watch for partnership news with Nvidia / agentic-AI roadmap announcements." },
    { lead: "L'Oréal Beauty Tech team in Paris is ~600 strong.", body: "" },
  ],
  sources: [
    { label: "📄 news.microsoft.com", url: "https://news.microsoft.com" },
    { label: "📄 www.loreal-finance.com", url: "https://www.loreal-finance.com/en/" },
    { label: "📄 www.loreal.com", url: "https://www.loreal.com/en/news/beauty-tech/beauty-genius/" },
    { label: "📄 nvidianews.nvidia.com", url: "https://nvidianews.nvidia.com" },
    { label: "📄 cloud.google.com", url: "https://cloud.google.com" },
    { label: "📄 www.loreal.com", url: "https://www.loreal.com/en/news/" },
    { label: "📄 www.loreal.com", url: "https://www.loreal.com/en/news/beauty-tech/modiface/" },
  ],
  askPrompts: [
    "What's L'Oréal's position on generative AI?",
    "Who runs the AI agenda at L'Oréal?",
    "What named tools is L'Oréal running in production?",
  ],
};

// Nestlé — enriched from data/companies/nestle.md
export const nestle: CompanyTemplateData = {
  slug: "nestle",
  shortName: "Nestlé",
  displayName: "Nestlé",
  sectorPath: ["Companies", "CPG / FMCG", "Nestlé"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-20" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-25" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "91.4CHF B", reported: "-1.8% reported", organic: "+2.2% organic" },
      opMargin:  { value: "17.2%", note: "15.7CHF B op profit, -2.0% YoY" },
      netDebt:   { value: "45.0CHF B", note: "net debt/EBITDA 2.4x" },
      employees: { value: "277,000" },
    },
    operatingComplexity: {
      stores:    { value: "~825", note: "825 nespresso boutique" },
      countries: { value: "188+", note: "WORLDWIDE" },
      hq:        { value: "Vevey 🇨🇭" },
      languages: { value: "3+" },
      brands:    { value: "6+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "Powdered & Liquid Beverages", pct: "27%" },
      { label: "PetCare", pct: "21%" },
      { label: "Nutrition & Health Science", pct: "17%" },
      { label: "Prepared Dishes", pct: "13%" },
      { label: "Confectionery", pct: "10%" },
      { label: "Other", pct: "12%" },
    ],
    source: { label: "Latest results", url: "https://www.nestle.com/investors" },
  },
  aiPerception: {
    quadrant: "narrative_led",
    label: "Narrative-led · 3.0",
    rhetoric: 4,
    production: 2,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "We are deploying generative AI across R&D, marketing and supply chain. The productivity uplift is meaningful.",
      speaker: "Laurent Freixe, CEO · 2026-02-20",
      sources: [
      { label: "Source", url: "https://www.nestle.com/investors" },
      ],
    },
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "No.",
      body: "No standalone AI chapter; AI commentary woven through Technology & Innovation section.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Laurent Freixe</strong>, CEO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://www.nestle.com/investors" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>AI marketing content generation</strong> — <span style=\"color:var(--text-mid)\">marketing</span>" },
        { html: "<strong>Cocoa Compass (supply chain)</strong> — <span style=\"color:var(--text-mid)\">supply_chain</span>" },
      ],
      sources: [
        { label: "📄 AI marketing content generation", url: "https://www.nestle.com" },
        { label: "📄 Cocoa Compass (supply chain)", url: "https://www.nestle.com" },
      ],
    },
    genAI: {
      mentioned: true,
      mentionCount: 5,
    },
    stackTable: [
      { layer: "CLOUD", product: "Azure", use: "Estimated from public signals", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "Leadership changed in late 2024; AI rhetoric ticked up in subsequent calls.", body: "No flagship consumer AI product is disclosed yet." },
  ],
  sources: [
    { label: "📄 news.microsoft.com", url: "https://news.microsoft.com" },
    { label: "📄 www.nestle.com", url: "https://www.nestle.com/investors" },
    { label: "📄 www.nestle.com", url: "https://www.nestle.com" },
  ],
  askPrompts: [
    "What's Nestlé's position on generative AI?",
    "Who runs the AI agenda at Nestlé?",
    "What named tools is Nestlé running in production?",
  ],
};

// Ocado Group — enriched from data/companies/ocado.md
export const ocado: CompanyTemplateData = {
  slug: "ocado",
  shortName: "Ocado",
  displayName: "Ocado Group",
  sectorPath: ["Companies", "Grocery", "Ocado Group"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-26" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-15" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "£3.2B", reported: "+14.1% reported", organic: "+12.8% organic" },
      opMargin:  { value: "-4.8%", note: "£-0.155B op profit" },
      netDebt:   { value: "£1.1B" },
      employees: { value: "21,000" },
    },
    operatingComplexity: {
      countries: { value: "11+", note: "EMEA, AMER, APAC" },
      hq:        { value: "Hatfield 🇬🇧" },
      languages: { value: "en" },
    },
    revenueStreams: [
      { label: "Technology Solutions", pct: "12%" },
      { label: "Logistics", pct: "14%" },
      { label: "Retail", pct: "74%" },
    ],
    source: { label: "Latest results", url: "https://www.ocadogroup.com/investors/" },
  },
  aiPerception: {
    quadrant: "native",
    label: "AI Native · 5.0",
    rhetoric: 5,
    production: 5,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Our 600+ ML models run every CFC. AI is not a feature, it is the operating system.",
      speaker: "Tim Steiner, CEO · 2026-02-26",
      sources: [
      { label: "Source", url: "https://www.ocadogroup.com/investors/" },
      ],
    },
    framing: {
      headline: "Moat.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>James Matthews</strong>, CEO Ocado Technology. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://www.ocadogroup.com/investors/" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Ocado Smart Platform (OSP) ML</strong> — <span style=\"color:var(--text-mid)\">ops</span>" },
        { html: "<strong>On-Grid Robotic Pick</strong> — <span style=\"color:var(--text-mid)\">ops</span>" },
        { html: "<strong>Re:Imagined automation suite</strong> — <span style=\"color:var(--text-mid)\">ops</span>" },
      ],
      sources: [
        { label: "📄 Ocado Smart Platform (OSP) ML", url: "https://www.ocadogroup.com/technology/" },
        { label: "📄 On-Grid Robotic Pick", url: "https://www.ocadogroup.com/technology/" },
        { label: "📄 Re:Imagined automation suite", url: "https://www.ocadogroup.com" },
      ],
    },
    consumerFacing: "<strong>Ocado.com personalisation engine</strong>. Confirmed live consumer feature.",
    quantifiedROI: {
      html: "600+ ML models in production across CFCs.",
    },
    genAI: {
      mentioned: true,
      mentionCount: 9,
    },
    stackTable: [
      { layer: "CLOUD", product: "Google Cloud", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "ML", product: "TensorFlow", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "LLM", product: "Custom in-house LLM", use: "Estimated from public signals", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Google Cloud" },
      { name: "Nvidia" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "AI Native.", body: "Renders off-matrix per the wireframe. Ocado is a tech company that happens to sell groceries; comparing it to Tesco on rhetoric/production misses the point." },
  ],
  sources: [
    { label: "📄 nvidia.com", url: "https://nvidia.com" },
    { label: "📄 www.ocadogroup.com", url: "https://www.ocadogroup.com/technology/" },
    { label: "📄 www.ocadogroup.com", url: "https://www.ocadogroup.com" },
    { label: "📄 www.ocadogroup.com", url: "https://www.ocadogroup.com/investors/" },
    { label: "📄 cloud.google.com", url: "https://cloud.google.com" },
  ],
  askPrompts: [
    "What's Ocado Group's position on generative AI?",
    "Who runs the AI agenda at Ocado Group?",
    "What named tools is Ocado Group running in production?",
  ],
};

// Tesco — enriched from data/companies/tesco.md
export const tesco: CompanyTemplateData = {
  slug: "tesco",
  shortName: "Tesco",
  displayName: "Tesco",
  sectorPath: ["Companies", "Grocery", "Tesco"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-04-10" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-06-15" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "£68.2B", reported: "+3.2% reported", organic: "+3.6% organic" },
      opMargin:  { value: "4.5%", note: "£3.1B op profit, +8.1% YoY" },
      netDebt:   { value: "£9.5B", note: "net debt/EBITDA 2.0x" },
      employees: { value: "336,000" },
    },
    operatingComplexity: {
      stores:    { value: "~4,673", note: "2,200 express, 480 superstore" },
      countries: { value: "5", note: "EMEA" },
      hq:        { value: "Welwyn Garden City 🇬🇧" },
      languages: { value: "en" },
    },
    revenueStreams: [
      { label: "UK & Ireland", pct: "89%" },
      { label: "Central Europe", pct: "8%" },
      { label: "Booker", pct: "3%" },
    ],
    source: { label: "Latest results", url: "https://www.tescoplc.com/investors/" },
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 2.5",
    rhetoric: 2,
    production: 3,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "No.",
      body: "No standalone AI chapter; AI commentary woven through Technology & Innovation section.",
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Clubcard personalisation (ML)</strong> — <span style=\"color:var(--text-mid)\">consumer</span>" },
        { html: "<strong>AI demand forecasting</strong> — <span style=\"color:var(--text-mid)\">supply_chain</span>" },
      ],
      sources: [
        { label: "📄 Clubcard personalisation (ML)", url: "https://www.tescoplc.com" },
        { label: "📄 AI demand forecasting", url: "https://www.tescoplc.com" },
      ],
    },
    consumerFacing: "<strong>Clubcard personalised offers</strong>. Confirmed live consumer feature.",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "CLOUD", product: "Google Cloud", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "DATA", product: "BigQuery", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Google Cloud" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "Quiet but capable.", body: "Ken Murphy rarely talks AI on calls; meanwhile Clubcard data + Google Cloud stack runs deep ML at scale. Classic UK-grocery understatement." },
  ],
  sources: [
    { label: "📄 www.tescoplc.com", url: "https://www.tescoplc.com/investors/" },
    { label: "📄 cloud.google.com", url: "https://cloud.google.com" },
    { label: "📄 www.tescoplc.com", url: "https://www.tescoplc.com" },
  ],
  askPrompts: [
    "What's Tesco's position on generative AI?",
    "Who runs the AI agenda at Tesco?",
    "What named tools is Tesco running in production?",
  ],
};

// Unilever — enriched from data/companies/unilever.md
export const unilever: CompanyTemplateData = {
  slug: "unilever",
  shortName: "Unilever",
  displayName: "Unilever",
  sectorPath: ["Companies", "CPG / FMCG", "Unilever"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-02-13" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-04-24" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€60.8B", reported: "-0.3% reported", organic: "+4.5% organic" },
      opMargin:  { value: "18.4%", note: "€11.2B op profit, +12.6% YoY" },
      netDebt:   { value: "€23.0B", note: "net debt/EBITDA 1.9x" },
      employees: { value: "128,000" },
    },
    operatingComplexity: {
      countries: { value: "190+", note: "WORLDWIDE" },
      hq:        { value: "London 🇬🇧" },
      languages: { value: "en" },
      brands:    { value: "6+", note: "named maisons" },
    },
    revenueStreams: [
      { label: "Beauty & Wellbeing", pct: "22%" },
      { label: "Personal Care", pct: "23%" },
      { label: "Home Care", pct: "20%" },
      { label: "Foods", pct: "22%" },
      { label: "Ice Cream", pct: "13%" },
    ],
    source: { label: "Latest results", url: "https://www.unilever.com/investors/" },
  },
  aiPerception: {
    quadrant: "narrative_led",
    label: "Narrative-led · 3.0",
    rhetoric: 4,
    production: 2,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Generative AI is reshaping our marketing productivity. We are scaling AI-generated creative across our top brands.",
      speaker: "Hein Schumacher, CEO · 2026-02-13",
      sources: [
      { label: "Source", url: "https://www.unilever.com/investors/" },
      ],
    },
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Hein Schumacher</strong>, CEO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://www.unilever.com/investors/" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Brand DNAi</strong> — proprietary AI governance platform that centralises brand data so GenAI models stay on-brand <span style=\"color:var(--text-mid)\">(Beauty & Wellbeing)</span>", source: { label: "📄 Unilever newsroom (Apr 2026)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/" } },
        { html: "<strong>Beauty & Wellbeing virtual cohorts</strong> — microbiome-seeded GenAI demographic simulation for pre-launch testing <span style=\"color:var(--text-mid)\">(R&D)</span>", source: { label: "📄 Unilever newsroom (Apr 2026)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/" } },
        { html: "<strong>AI marketing creative generation</strong> — <span style=\"color:var(--text-mid)\">marketing</span>" },
      ],
      sources: [
        { label: "📄 Unilever Beauty & Wellbeing AI case study (27 Apr 2026)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/" },
        { label: "📄 AI marketing creative generation", url: "https://www.unilever.com" },
      ],
    },
    genAI: {
      mentioned: true,
      mentionCount: 7,
    },
    stackTable: [
      { layer: "CLOUD", product: "Google Cloud", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "ML", product: "Vertex AI", use: "Estimated from public signals", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft" },
      { name: "Google Cloud" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Dove", description: "AI-generated marketing creative pilot.", source: { label: "Press", url: "https://www.unilever.com" } },
    ],
  },
  rachelNotes: [
    { lead: "Beauty & Wellbeing AI case study (27 Apr 2026) is the inflection point.", body: "Brand DNAi + microbiome-seeded virtual cohorts move Unilever from 'marketing-creative pilot' into named, production-grade AI deployed against an €12.8B business unit. Disclosed metrics: consumer-insight 60% faster, formulation cycles 5–6 → 1–2, claims-gen 75% faster, concept-to-R&D-brief from months to days, ~1,000 external data sources pulled monthly. Production score on a clear upward trajectory." },
    { lead: "Schumacher and Fernandez mention GenAI on every call.", body: "Earnings-call narrative sustained; the Apr 2026 case study is the first time the runtime keeps up with the rhetoric." },
  ],
  sources: [
    { label: "📄 Unilever Beauty & Wellbeing AI case study (27 Apr 2026)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/" },
    { label: "📄 Unilever Q1 2026 trading statement (30 Apr 2026)", url: "https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf" },
    { label: "📄 Unilever investors", url: "https://www.unilever.com/investors/" },
    { label: "📄 Microsoft news", url: "https://news.microsoft.com" },
    { label: "📄 Google Cloud", url: "https://cloud.google.com" },
  ],
  furtherReading: [
    { label: "Unilever newsroom — Beauty & Wellbeing AI (Apr 2026)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/" },
    { label: "Unilever Q1 2026 trading statement (30 Apr 2026)", url: "https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf" },
  ],
  askPrompts: [
    "What's Unilever's position on generative AI?",
    "Who runs the AI agenda at Unilever?",
    "What named tools is Unilever running in production?",
  ],
};

// Zalando — enriched from data/companies/zalando.md
export const zalando: CompanyTemplateData = {
  slug: "zalando",
  shortName: "Zalando",
  displayName: "Zalando",
  sectorPath: ["Companies", "Apparel & E-commerce", "Zalando"],
  cadence: {
    baseline:     { label: "FY2025",            date: "2026-03-04" },
    lastReported: { label: "Q1 2026 sales",      date: "2026-05-07" },
    next:         { label: "H1 2026 results",    date: "Late July 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 sales is the latest signal. Full H1 results with margin land late July 2026.",
  },
  investor: {
    headline: {
      revenue:   { value: "€10.6B", reported: "+4.0% reported", organic: "+4.3% organic" },
      opMargin:  { value: "4.0%", note: "€0.42B op profit, +12.1% YoY" },
      netDebt:   { value: "€1.4B" },
      employees: { value: "15,000" },
    },
    operatingComplexity: {
      countries: { value: "25+", note: "EMEA" },
      hq:        { value: "Berlin 🇩🇪", note: "EU AI Act primary" },
      languages: { value: "2+" },
    },
    revenueStreams: [
      { label: "Fashion Store", pct: "88%" },
      { label: "B2B / Logistics", pct: "12%" },
    ],
    source: { label: "Latest results", url: "https://corporate.zalando.com/en/investor-relations" },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 4.0",
    rhetoric: 4,
    production: 4,
    evidence: "confirmed",
    rubric: "1.0",
  },
  narrative: {
    quoteLatest: {
      eyebrow: "Latest earnings",
      htmlQuote: "Our generative AI assistant is now in 25 markets. We see meaningful basket-size lift on every cohort.",
      speaker: "David Schröder, Co-CEO · 2026-03-04",
      sources: [
      { label: "Source", url: "https://corporate.zalando.com/en/investor-relations" },
      ],
    },
    framing: {
      headline: "Efficiency.",
      body: "Framing confirmed against the latest investor materials.",
    },
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI section appears in latest investor materials.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>David Schröder</strong>, Co-CEO. Presents the AI commentary on earnings calls.",
      source: { label: "📄 Earnings call", url: "https://corporate.zalando.com/en/investor-relations" },
    },
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>Zalando Assistant (GenAI)</strong> — <span style=\"color:var(--text-mid)\">consumer</span>" },
        { html: "<strong>Size & Fit recommendations (ML)</strong> — <span style=\"color:var(--text-mid)\">consumer</span>" },
      ],
      sources: [
        { label: "📄 Zalando Assistant (GenAI)", url: "https://corporate.zalando.com/en/newsroom" },
        { label: "📄 Size & Fit recommendations (ML)", url: "https://corporate.zalando.com/" },
      ],
    },
    consumerFacing: "<strong>Zalando Assistant</strong>. Confirmed live consumer feature.",
    quantifiedROI: {
      html: "Basket-size lift across all cohorts using Zalando Assistant.",
    },
    genAI: {
      mentioned: true,
      mentionCount: 8,
    },
    stackTable: [
      { layer: "CLOUD", product: "AWS", use: "Confirmed in stack", source: { label: "Estimated" } },
      { layer: "LLM", product: "OpenAI GPT", use: "Confirmed in stack", source: { label: "Estimated" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "OpenAI" },
      { name: "AWS" },
      { name: "Anthropic", status: "absent" },
    ],
  },
  rachelNotes: [
    { lead: "Zalando is Berlin-based AI Performer.", body: "OpenAI partnership for the assistant, AWS infra. Ahead of most EMEA peers on consumer-facing GenAI." },
  ],
  sources: [
    { label: "📄 corporate.zalando.com", url: "https://corporate.zalando.com/en/investor-relations" },
    { label: "📄 corporate.zalando.com", url: "https://corporate.zalando.com/" },
    { label: "📄 aws.amazon.com", url: "https://aws.amazon.com" },
    { label: "📄 corporate.zalando.com", url: "https://corporate.zalando.com/en/newsroom" },
    { label: "📄 openai.com", url: "https://openai.com" },
  ],
  askPrompts: [
    "What's Zalando's position on generative AI?",
    "Who runs the AI agenda at Zalando?",
    "What named tools is Zalando running in production?",
  ],
};

export const enriched: Record<string, CompanyTemplateData> = {
  "asos": asos,
  "carrefour": carrefour,
  "hm": hm,
  "inditex": inditex,
  "kering": kering,
  "loreal": loreal,
  "nestle": nestle,
  "ocado": ocado,
  "tesco": tesco,
  "unilever": unilever,
  "zalando": zalando,
};
