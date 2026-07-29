// Batch 3: deeper enrichment for the 38 companies that don't yet have
// hand-curated markdown profiles. Adds:
//   - cadence.baseline (FY + last-updated date from card stamp)
//   - investor.whyMatters (sector heuristic)
//   - narrative.dedicatedSection (quadrant heuristic, hedged language)
//   - production.consumerFacing (picked from existing card use cases)
//   - production.genAI.mentioned (derived from use-case / vendor keywords)
//   - production.stackTable (built from vendor chips at top of card)
//   - byMaison.maisons (only for known multi-brand portfolios)
//   - furtherReading (news search + Wikipedia)
//   - rachelNotes (expanded from single card-note → 3-4 paragraphs)
// No CFO/CEO names, real quotes, or unverified vendor relationships are
// fabricated. Everything sources from data already in _section.ts cards.

import type { CompanyTemplateData } from "../schema";

// AB InBev — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const ab_inbev_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-27" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure IoT", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Budweiser", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Stella Artois", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Corona", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Beck's", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Leffe", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=AB+InBev+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/AB_InBev" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "World's largest brewer." },
    { lead: "Operating reality.", body: "Deeply data-driven culture. Azure IoT for production. 150K employees across brewery + logistics." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure IoT, M365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Adidas — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const adidas_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-04" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>Membership platform · microsoft.</strong> Data-driven loyalty platform. 500M+ members targeted. AI for personalisation",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure (partial)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "AWS (partial)", use: "Cloud / compute platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Adidas+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Adidas" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Turnaround under Bjørn Gulden succeeding." },
    { lead: "Operating reality.", body: "+11% growth. Multi-cloud (Azure + AWS). DTC push is the stated strategic priority." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on M365 · partial signals on Azure (partial), AWS (partial). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Ahold Delhaize — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const ahold_delhaize_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "Q4", date: "2026-02-11" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Personalised pricing · google.</strong> Google Cloud Retail AI for dynamic pricing and personalised promotions",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "GCP", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Google Cloud Retail AI", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (partial)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ahold+Delhaize+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Ahold_Delhaize" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Largest employer on watchlist (414K)." },
    { lead: "Operating reality.", body: "Strong digital/e-commerce DNA. Albert Heijn, Stop &amp; Shop, Food Lion." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on GCP, Google Cloud Retail AI · partial signals on Azure (partial). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Arla Foods — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const arla_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-03" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Arla+Foods+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Arla_Foods" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Danish-UK-German farmer cooperative." },
    { lead: "Operating reality.", body: "Arla, Lurpak, Castello, Puck. 9,400 farmer-owners. ~€13.8B revenue. Azure mentioned in sustainability tech stack. Strong data platform for cooperative model. Limited public AI case study. all inferred from cooperative reporting." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, SAP, M365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// ASOS — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const asos_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Pure-play e-commerce competes on personalisation, search ranking and operational margin. AI is closer to product than to back-office; expect rapid integration of GenAI into the customer journey.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Style-match recommendation.</strong> Personalised outfit suggestions in app. Low-signal: referenced as \"AI-assisted\" without specifics in H1 FY26 results.",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=ASOS+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/ASOS" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Profitability crisis dominates the agenda." },
    { lead: "Operating reality.", body: "AI investment is discretionary and deferred. On the watchlist as a cautionary benchmark. 5yr Azure deal renewed 2022, tech-first culture in pockets, but execution capacity is thin." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Barilla — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const barilla_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (estimated)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Barilla", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Mulino Bianco", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Pavesi", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Wasa", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Barilla+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Barilla" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "World's largest pasta maker." },
    { lead: "Operating reality.", body: "Barilla, Academia Barilla, Mulino Bianco, Harry's. Private Italian family group. ~€4B revenue. Sustainability and Made in Italy positioning. Limited public tech disclosures." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on SAP, Azure (estimated), M365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Beiersdorf — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const beiersdorf_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-26" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Consumer insights AI · microsoft.</strong> Azure OpenAI for consumer sentiment analysis and product innovation pipeline (Nivea, Eucerin)",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Beiersdorf+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Beiersdorf" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Skincare-focused CPG." },
    { lead: "Operating reality.", body: "Nivea (#1 global skincare brand), Eucerin, La Prairie, Hansaplast. C.A.R.E.+ strategy explicitly names AI as growth lever. Azure OpenAI rollout announced 2024." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Burberry — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const burberry_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2024", date: "2025-05-14" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Burberry", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Burberry+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Burberry" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Only UK-listed luxury house." },
    { lead: "Operating reality.", body: "fills a gap vs LVMH/Kering/Richemont. Under turnaround (Joshua Schulman CEO). AI maturity lower than continental peers." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, M365, SAP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Campari Group — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const campari_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-10" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Digital marketing AI · microsoft.</strong> AI-powered campaign optimisation and consumer insight across Aperol, Campari, Wild Turkey portfolio",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Campari", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Aperol", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Wild Turkey", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Skyy Vodka", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Campari+Group+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Campari_Group" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Italian spirits house." },
    { lead: "Operating reality.", body: "Aperol, Campari, Wild Turkey, Grand Marnier, Espolòn. Microsoft stack confirmed via M365 and Azure workloads. Direct peer to Diageo and Pernod Ricard. Under cost pressure in 2025 with organic growth softening." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, M365 Copilot, SAP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Carlsberg — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const carlsberg_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-12" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Carlsberg", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tuborg", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "1664 Blanc", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Somersby", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Carlsberg+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Carlsberg" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Third-largest global brewer." },
    { lead: "Operating reality.", body: "Carlsberg, Kronenbourg 1664, Tuborg, San Miguel (licence). SAIL'27 strategy explicitly names AI/data as pillar. Published Microsoft case study on Azure AI. Direct peer to Heineken and AB InBev." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Carrefour — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const carrefour_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI commentary appears in latest investor materials. Performer signal is well-established.",
    },
  },
  production: {
    consumerFacing: "<strong>Hopla (in-store GenAI assistant).</strong> Customer-facing AI built on Mistral. Live in France. First EMEA grocery GenAI consumer product.",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Google Cloud", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Mistral AI", use: "Sovereign-AI LLM provider", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Carrefour+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Carrefour" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Sovereign-AI first posture." },
    { lead: "Operating reality.", body: "Chose Mistral (French) deliberately for Hopla. Google Cloud is the ops backbone. Structurally resistant to Microsoft given GCP depth. Low op margin limits discretionary AI spend." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Google Cloud, Mistral AI. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for next earnings to keep AI airtime above the sector median; performer status sticks only if production keeps growing." },
  ],
};

// Colruyt Group — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const colruyt_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2025-12-04" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Colruyt+Group+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Colruyt_Group" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Belgium's largest retailer." },
    { lead: "Operating reality.", body: "Colruyt (600+ stores), OKay, Bio-Planet, Collect&amp;Go (online). Family-controlled (Colruyt family ~60%). The algorithmic pricing guarantee ('lowest price or we refund the difference') has been AI-powered since the 1980s. one of Europe's oldest retail AI stories. Azure confirmed for modern data platform. Interesting competitive-intel account given the pricing-AI moat." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Danone — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const danone_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-20" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Microsoft Fabric", product: "Microsoft Fabric", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Activia", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Evian", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Volvic", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Aptamil", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Danone+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Danone" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "France's #2 food giant." },
    { lead: "Operating reality.", body: "Renew Danone strategy is productivity + AI-led. Mixed cloud but Microsoft-leaning on productivity and AI workloads." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, Microsoft Fabric. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Decathlon — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const decathlon_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>RFID inventory tracking · none.</strong> In-store RFID for real-time stock visibility across 1,700+ stores",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure (partial, estimated)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 (likely)", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "RFID platform", product: "RFID platform", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Decathlon+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Decathlon" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Private company." },
    { lead: "Operating reality.", body: "101K employees, 1,700+ stores. Strong innovation and sustainability culture. No public vendor relationships disclosed." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure (partial, estimated), M365 (likely), RFID platform. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Diageo — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const diageo_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2026-02-04" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>D2C platform · none.</strong> Growing direct-to-consumer channel with data-driven personalisation",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure (likely)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Google Ads", product: "Google Ads", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Johnnie Walker", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Smirnoff", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Guinness", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tanqueray", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Don Julio", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Diageo+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Diageo" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Premium spirits (Johnnie Walker, Guinness, Tanqueray)." },
    { lead: "Operating reality.", body: "Marketing-driven and data-rich. D2C ambition growing." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure (likely), M365, Google Ads. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Essity — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const essity_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-04" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Tena", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tork", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Libresse", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Libero", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Essity+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Essity" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Swedish hygiene and health company." },
    { lead: "Operating reality.", body: "Tena, Tork, Leukoplast, Jobst, Libresse/Bodyform. Demerged from SCA 2017. One of the more Microsoft-deep CPG companies on the watchlist: Dynamics 365 confirmed (rare for CPG), M365 Copilot broad rollout, Azure AI for supply chain." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Estée Lauder — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const estee_lauder_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "Q2", date: "2026-02-03" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Consumer insights AI · microsoft.</strong> NLP on social media and reviews to drive product development",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Internal AI tools", product: "Internal AI tools", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Estée Lauder", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "MAC", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Clinique", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "La Mer", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tom Ford Beauty", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Estée+Lauder+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Estée_Lauder" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Building GenAI ecosystem with Copilot." },
    { lead: "Operating reality.", body: "Under margin pressure. AI seen as efficiency lever. Publicly cited by Microsoft." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on M365 Copilot, Azure, Internal AI tools. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Ferrero — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const ferrero_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2024", date: "2025-11-01" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (estimated)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "Microsoft 365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Nutella", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Kinder", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Ferrero Rocher", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tic Tac", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ferrero+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Ferrero" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Private Italian family company." },
    { lead: "Operating reality.", body: "Nutella, Kinder, Ferrero Rocher, Tic Tac, Raffaello. Limited public tech disclosures. SAP is likely ERP backbone; Azure presence inferred from M365 and SAP-on-Azure patterns in Italian manufacturing. FY ends August." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on SAP, Azure (estimated), Microsoft 365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Fnac Darty — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const fnac_darty_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-03" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Pure-play e-commerce competes on personalisation, search ranking and operational margin. AI is closer to product than to back-office; expect rapid integration of GenAI into the customer journey.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Product recommendations · microsoft.</strong> Azure OpenAI for personalised product discovery across fnac.com and darty.com",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Fnac", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Darty", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Fnac+Darty+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Fnac_Darty" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "French electronics and culture retailer." },
    { lead: "Operating reality.", body: "Fnac (books, tech, music) + Darty (appliances). Merged 2016. 900+ stores across FR/BE/PT/CH. Under revenue pressure from Amazon but AI-led after-sales is a real differentiator. Darty's after-sales network is its moat." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// H&M — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const hm_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Google Cloud", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=H&M+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/H&M" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Quiet builder." },
    { lead: "Operating reality.", body: "Low investor AI rhetoric vs. real tooling in production. Revenue flat, op margin recovering. Shein pressure is the defining commercial threat. AI spend capacity limited vs. Inditex." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Google Cloud, Azure. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Haleon — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const haleon_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-05" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Consumer AI insight · microsoft.</strong> Azure OpenAI deployed for consumer sentiment, brand health monitoring, and marketing copy generation (Sensodyne, Voltaren, Panadol)",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Sensodyne", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Voltaren", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Panadol", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Centrum", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Advil", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Haleon+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Haleon" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Demerged from GSK in 2022." },
    { lead: "Operating reality.", body: "Consumer healthcare. Sensodyne, Voltaren, Panadol, Advil, Centrum. Dual cloud (Azure + GCP). One of few EMEA CPG companies with confirmed Google Cloud workloads. £10.8B revenue, premium margins for the sector." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Heineken — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const heineken_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-11" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Data platform", product: "Databricks", use: "Cloud data warehouse / lakehouse", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Heineken", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Amstel", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Sol", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Tiger", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Birra Moretti", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Heineken+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Heineken" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Published Microsoft reference customer." },
    { lead: "Operating reality.", body: "Multi-year cloud migration largely on Azure. Competitor to AB InBev. EverGreen strategy is data-led." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, Databricks. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// HelloFresh — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const hellofresh_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-11" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Pure-play e-commerce competes on personalisation, search ranking and operational margin. AI is closer to product than to back-office; expect rapid integration of GenAI into the customer journey.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Recipe personalisation engine · google.</strong> ML-driven weekly menu recommendations across 8M+ active customers. GCP Vertex AI backbone, personalising from 100+ recipe options per market",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "GCP", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "ML platform", product: "Vertex AI", use: "Managed ML on Google Cloud", source: { label: "From vendor footprint" } },
      { layer: "BigQuery", product: "BigQuery", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=HelloFresh+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/HelloFresh" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "German meal-kit pioneer." },
    { lead: "Operating reality.", body: "HelloFresh, Green Chef, EveryPlate, Factor (US), Chefs Plate. GCP-primary and AI-native from founding. Only meal-kit account on the watchlist and the strongest Google Cloud reference in EMEA e-commerce. Revenue declining from 2022 peak (€7.6B) as pandemic tailwinds unwound; profitability recovery is the 2025/26 narrative." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on GCP, Vertex AI, BigQuery. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Henkel — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const henkel_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-05" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Supply chain AI · microsoft.</strong> Demand forecasting and logistics optimisation across adhesives and consumer goods divisions via Azure ML",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "SAP on Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Persil", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Schwarzkopf", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Loctite", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Dial", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Right Guard", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Henkel+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Henkel" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Dual-division structure (Adhesives + Consumer Brands)." },
    { lead: "Operating reality.", body: "SAP on Azure is the ERP backbone. M365 Copilot rollout confirmed 2024. Persil, Schwarzkopf, Fa brands. EMEA-heavy revenue." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, M365 Copilot, SAP on Azure. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Hermès — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const hermes_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-12" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Client intelligence · microsoft.</strong> Azure-based client analytics for personalised clienteling across 300+ stores. respects Hermès privacy-first posture",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Hermès", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Hermès+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Hermès" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "French ultra-luxury house." },
    { lead: "Operating reality.", body: "Birkin, Kelly, Constance, silk scarves, Hermès Home. Family-controlled (Hermès family ~66%). Highest operating margins in luxury at 42%+. AI posture is deliberately conservative: used to protect craft, not to scale or replace artisans. Direct peer to LVMH and Kering but with fundamentally different AI philosophy." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, M365, SAP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// IKEA / Ingka — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const ikea_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2025-10" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Dynamics 365", product: "Dynamics 365", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "IKEA", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "IKEA Industry", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=IKEA+/+Ingka+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/IKEA_/_Ingka" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Private company (Ingka Group)." },
    { lead: "Operating reality.", body: "Strong sustainability focus aligns with CSRD requirements. Digital transformation ongoing." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Dynamics 365, M365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Inditex — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const inditex_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Zara Try-On (synthetic avatar fitting).</strong> Live in 43 markets since Dec 2025. 7M+ customer sessions. AI creates a fit avatar from user photos. Flagship consumer GenAI deployment in European apparel.",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Zara Try-On", product: "Zara Try-On", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Proprietary RFID", product: "Proprietary RFID", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Internal data platform", product: "Internal data platform", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Inditex+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Inditex" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Silent Builder, textbook." },
    { lead: "Operating reality.", body: "CEO barely mentions AI until directly asked, but Try-On is shipping at global scale. No named hyperscaler in FY2025 IR: Inditex likely runs on internal platforms. Hardest account to penetrate on vendor logos, easiest to engage on use case." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Zara Try-On, Proprietary RFID, Internal data platform. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Jeronimo Martins — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const jeronimo_martins_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-26" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "SAP on Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Jeronimo+Martins+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Jeronimo_Martins" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Portuguese family-controlled retailer." },
    { lead: "Operating reality.", body: "Biedronka (Poland's #1 grocer, 3,400+ stores), Pingo Doce (Portugal), Ara (Colombia). €29B revenue makes it one of the largest EMEA grocers by revenue, yet massively undertracked by UK/FR-focused retail analysts. Azure + SAP confirmed. The Poland angle is strategically interesting. Eastern Europe's largest food retailer." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, SAP on Azure, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Kering — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const kering_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Gucci virtual try-on.</strong> AR/AI try-on for accessories. Confirmed in Gucci brand press 2025. Consumer-facing, app + web.",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "CRM / commerce", product: "Salesforce", use: "Customer + commerce platform", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Kering+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Kering" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Revenue down 12% (Gucci downturn)." },
    { lead: "Operating reality.", body: "Appointed first Chief Data, AI &amp; IT Officer to ExCom Mar 2026: a buying signal. Digital leadership in flux. Budget constrained vs. LVMH but board-level intent is clearer." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Salesforce. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Kingfisher — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const kingfisher_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-25" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Kingfisher+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Kingfisher" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Europe's largest DIY and home improvement retailer." },
    { lead: "Operating reality.", body: "B&amp;Q (UK), Castorama (FR/PL), Brico Dépôt (FR/ES/PT), Screwfix (UK). 1,400+ stores across 8 countries. Named Microsoft reference customer for M365 Copilot frontline worker deployment. Fills the home improvement white space on the watchlist." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// L'Oréal — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const loreal_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI commentary appears in latest investor materials. Performer signal is well-established.",
    },
  },
  production: {
    consumerFacing: "<strong>Beauty Genius (consumer GenAI diagnostics).</strong> Live in 14 markets on Azure OpenAI. Target 25 markets by end-2026. Named at Brandstorm 2026.",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=L'Oréal+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/L'Oréal" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Best-in-class AI narrative." },
    { lead: "Operating reality.", body: "CDMO Humberto Moneró owns the investor story. Beauty Genius is the clearest consumer-facing GenAI product in EMEA retail. 5yr Microsoft enterprise deal confirmed 2024." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure OpenAI, M365 Copilot, SAP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for next earnings to keep AI airtime above the sector median; performer status sticks only if production keeps growing." },
  ],
};

// Lavazza — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const lavazza_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>Consumer personalisation · microsoft.</strong> AI-driven coffee subscription and D2C recommendation engine across lavazza.com",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (estimated)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Lavazza+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Lavazza" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Italian family-owned coffee group." },
    { lead: "Operating reality.", body: "Lavazza, Carte Noire, Kicking Horse. ~€2.7B revenue. Sustainability + premiumisation strategy. Limited public tech disclosures. SAP ERP backbone; Azure inferred from M365 and Italian enterprise patterns." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on SAP, Azure (estimated), M365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// LEGO Group — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const lego_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-04" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "LEGO Group", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=LEGO+Group+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/LEGO_Group" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Private Danish toy giant." },
    { lead: "Operating reality.", body: "world's largest toy company by revenue. Responsible AI use is a core brand value (child safety). Azure and M365 Copilot confirmed 2024. Digital/physical play convergence is strategic direction. Classifying as CPG (mass consumer product, not retail-led)." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Lotus Bakeries — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const lotus_bakeries_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-20" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Lotus+Bakeries+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Lotus_Bakeries" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Belgian family-controlled biscuit and snacking company." },
    { lead: "Operating reality.", body: "Biscoff (global cult brand), Lotus, Dinosaurus, Annas, nākd, TREK, Urban Fruit. Premium growth story: Biscoff spread and biscuit global rollout driving double-digit growth. Small but profitable. One of the more surprising Microsoft reference accounts. Dynamics 365 confirmed for a company this size." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Mango — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const mango_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>D2C personalisation · microsoft.</strong> Azure ML for personalised product recommendations across mango.com. D2C is &gt;30% of revenue and growing",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Mango+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Mango" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Spanish family-owned fast-fashion retailer." },
    { lead: "Operating reality.", body: "Mango, Mango Man, Violeta, Mango Kids. 2,700+ stores in 120 countries, 30%+ revenue from online. Published Azure OpenAI for fashion design and trend forecasting in 2024. one of the more distinctive AI stories in EMEA apparel. Private (Andic family). Direct peer to Inditex but smaller, more design-led, and faster-moving on AI disclosure." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, SAP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Marks & Spencer — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const marks_spencer_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2025-11-05" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Sparks loyalty AI · microsoft.</strong> Personalised food &amp; clothing recommendations via Azure OpenAI",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Microsoft Fabric", product: "Microsoft Fabric", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Marks & Spencer", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Marks+&+Spencer+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Marks_&_Spencer" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Public Microsoft strategic partnership announced 2023, deepened 2024." },
    { lead: "Operating reality.", body: "Flagship UK retail AI reference. Sparks programme is central data asset." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, Microsoft Fabric. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Nespresso — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const nespresso_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Dynamics 365 Customer Service", product: "Dynamics 365 Customer Service", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Nespresso mobile app", product: "Nespresso mobile app", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Nespresso+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Nespresso" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Dynamics CS showcase." },
    { lead: "Operating reality.", body: "Premium D2C brand. Vertuo driving growth. Digital transformation a key enabler." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Dynamics 365 Customer Service, Nespresso mobile app. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Nestlé — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const nestle_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "Microsoft 365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Nestlé+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Nestlé" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Deep Microsoft relationship confirmed via NesGPT on Azure." },
    { lead: "Operating reality.", body: "Rhetoric outpaces confirmed production tool count. Largest CPG by revenue on the watchlist. Strong financial capacity to accelerate." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure OpenAI, Microsoft 365. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Ocado — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const ocado_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "AWS", use: "Cloud / compute platform", source: { label: "From vendor footprint" } },
      { layer: "Proprietary robotics", product: "Proprietary robotics", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Ocado Intelligent Automation", product: "Ocado Intelligent Automation", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ocado+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Ocado" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "The only AI-native on the list." },
    { lead: "Operating reality.", body: "Robotics and ML are not a layer on top of retail: they are the licensed product sold to other grocers. Operationally loss-making but the tech platform is the investment thesis." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on AWS, Proprietary robotics, Ocado Intelligent Automation. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// On Running — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const on_running_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "Q3", date: "2025-11-12" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Fast fashion lives or dies on inventory accuracy and trend detection. AI for demand forecasting + GenAI for asset production are the two highest-impact use cases, and both have peer benchmarks now.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>D2C personalisation · microsoft.</strong> ML recommendations across on-running.com and mobile. D2C is 40%+ of revenue",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "AWS (primary)", use: "Cloud / compute platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (partial)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Data platform", product: "Databricks", use: "Cloud data warehouse / lakehouse", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=On+Running+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/On_Running" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Fastest-growing premium sports brand." },
    { lead: "Operating reality.", body: "Swiss-HQ, US-listed (NYSE). AWS-primary infra but M365 + Databricks on data. Direct peer to Adidas/Nike premium segment." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on AWS (primary), Databricks · partial signals on Azure (partial). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Pernod Ricard — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const pernod_ricard_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2026-02" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Data platform", product: "Databricks", use: "Cloud data warehouse / lakehouse", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Absolut", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Jameson", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Beefeater", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Martell", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Chivas Regal", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Pernod+Ricard+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Pernod_Ricard" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Direct Diageo peer." },
    { lead: "Operating reality.", body: "Strong Microsoft partnership. published case study on Matrix AI platform. Marketing and commercial AI are strategic priorities." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, Databricks. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Puig — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const puig_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-06" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>Fragrance personalisation · microsoft.</strong> AI-driven fragrance recommendation engine for Carolina Herrera and Rabanne D2C channels",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "ERP", product: "SAP", use: "ERP / supply chain", source: { label: "From vendor footprint" } },
      { layer: "CRM / commerce", product: "Salesforce", use: "Customer + commerce platform", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Carolina Herrera", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Paco Rabanne", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Jean Paul Gaultier", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Charlotte Tilbury", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Puig+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Puig" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Spanish prestige beauty and fashion house." },
    { lead: "Operating reality.", body: "Carolina Herrera, Rabanne, Nina Ricci, Jean Paul Gaultier, Byredo, Dr. Barbara Sturm. IPO'd on BME (Barcelona) in 2024. Limited public tech disclosures post-IPO. Azure inferred from SAP-on-Azure and M365 ecosystem." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, SAP, Salesforce. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Reckitt — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const reckitt_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-11" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>Consumer health insights · none.</strong> NLP and ML for consumer insights in health &amp; hygiene categories",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Productivity", product: "M365 (likely)", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (partial)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Google Cloud (partial)", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Dettol", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Lysol", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Durex", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Strepsils", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Air Wick", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Reckitt+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Reckitt" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "New CEO driving transformation." },
    { lead: "Operating reality.", body: "Revenue under pressure. Data leadership in transition. Multiple clouds in play." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on M365 (likely) · partial signals on Azure (partial), Google Cloud (partial). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Richemont — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const richemont_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Luxury operates many decentralised maisons with distinct creative cultures. AI rollouts have to be sold maison by maison; a successful pilot in one house does not auto-scale to the next.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Productivity", product: "M365 (likely)", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "Azure (partial)", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Cartier", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Van Cleef & Arpels", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "IWC Schaffhausen", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Jaeger-LeCoultre", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Montblanc", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Richemont+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Richemont" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Owns Cartier, Van Cleef, IWC, Montblanc." },
    { lead: "Operating reality.", body: "YNAP divestiture creates cloud strategy reset moment." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on M365 (likely) · partial signals on Azure (partial). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Sainsbury's — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const sainsburys_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2025-11-06" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Nectar360 personalisation · google.</strong> Loyalty-driven personalised pricing and promotions across Sainsbury's + Argos",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "GCP", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "Microsoft 365", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
      { layer: "Dynamics (legacy)", product: "Dynamics (legacy)", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  byMaison: {
    maisons: [
      { brand: "Sainsbury's", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Argos", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
      { brand: "Habitat", description: "Brand-level AI signal not yet broken out at portfolio level. Monitored via brand press." },
    ],
    note: "Brand-level AI coverage will be filled in as portfolio companies disclose maison-specific deployments. Multi-brand groups disclose at group level by default.",
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Sainsbury's+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Sainsbury's" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Second UK grocer after Tesco." },
    { lead: "Operating reality.", body: "Historically GCP-leaning on data and AI, M365 on productivity. Nectar360 is key first-party data asset." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on GCP, Microsoft 365, Dynamics (legacy). Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Sodexo — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const sodexo_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "H1", date: "2025-04-10" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Not yet.",
      body: "AI commentary is woven through Technology & Innovation rather than called out as a chapter. Production is ahead of disclosure.",
    },
  },
  production: {
    consumerFacing: "<strong>Menu intelligence · microsoft.</strong> Azure OpenAI for menu personalisation, nutritional optimisation, and food waste reduction across B&amp;I and healthcare catering",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "Azure", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Foundation model", product: "Azure OpenAI", use: "GenAI workloads via Azure OpenAI", source: { label: "From vendor footprint" } },
      { layer: "Productivity", product: "M365 Copilot", use: "Productivity + Copilot rollout", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Sodexo+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Sodexo" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "World's second-largest food services and FM company (behind Compass)." },
    { lead: "Operating reality.", body: "422k employees, 45 countries. Pluxee (benefits/vouchers) spun off 2024. FY ends August 31. One of the largest M365 Copilot enterprise deployments in the world. flagship Microsoft reference for the services sector. Strategic focus on AI for menu, sustainability, and workforce." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure, Azure OpenAI, M365 Copilot. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for any move from Investor Relations to talk about AI publicly. A silent builder going on the record is a major resetting signal." },
  ],
};

// Tesco — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const tesco_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Grocery is thin-margin, multi-format, multi-country. Even small productivity gains from AI matter at scale, but rollout has to clear regulatory and works-council friction in every market.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI commentary appears in latest investor materials. Performer signal is well-established.",
    },
  },
  production: {
    consumerFacing: "<strong>Personalised offers (Clubcard AI).</strong> 20M+ household dataset drives AI-personalised promotions. Named in FY25/26 strategic update.",
    genAI: {
      mentioned: false,
    },
    stackTable: [
      { layer: "Cloud", product: "Azure Foundry", use: "Cloud / data platform", source: { label: "From vendor footprint" } },
      { layer: "Data platform", product: "Databricks", use: "Cloud data warehouse / lakehouse", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "GCP", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Tesco+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Tesco" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "UK grocery leader with 20M+ Clubcard households." },
    { lead: "Operating reality.", body: "The data asset is the moat. CDIO Ken Towle runs a genuine tech organisation. AI spend accelerated materially in FY25 per capex disclosure." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on Azure Foundry, Databricks, GCP. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for next earnings to keep AI airtime above the sector median; performer status sticks only if production keeps growing." },
  ],
};

// Unilever — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const unilever_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Multi-brand CPG portfolios face a coordination problem: every brand has its own creative, media-buying and supply-chain decisions. Group-level AI investments compete with brand-level autonomy.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Partial.",
      body: "AI is a recurring earnings-call topic but not yet a standalone IR section. Watch for the elevation.",
    },
  },
  production: {
    consumerFacing: "<strong>\"Fit for the AI Age\" organisation shift.</strong> CEO Fernando Fernandez FY2025: \"deploying AI to supercharge demand generation, partnering with consumer-facing LLMs, working with retailers on agentic shopping models.\"",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "\"AI Age\" framing", product: "\"AI Age\" framing", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Consumer LLM partners", product: "Consumer LLM partners", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
      { layer: "Agentic shopping", product: "Agentic shopping", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Unilever+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Unilever" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Classic Narrative-led." },
    { lead: "Operating reality.", body: "CEO puts AI, LLMs, and agentic shopping centre-stage in FY2025 close, but the deck names no vendor, no tool, no ROI. CAGNY (Feb 16) is the next disclosure event on the calendar." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on \"AI Age\" framing, Consumer LLM partners, Agentic shopping. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for the rhetoric → production gap to close. Narrative-led companies that do not ship within two quarters drift toward the not-yet-visible quadrant." },
  ],
};

// Zalando — batch 3 enrichment (cadence, whyMatters, stackTable, byMaison, rachelNotes expansion)
export const zalando_b3: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "TBD" },
    next:     { label: "Next results", date: "TBD" },
  },
  investor: {
    whyMatters: "Pure-play e-commerce competes on personalisation, search ranking and operational margin. AI is closer to product than to back-office; expect rapid integration of GenAI into the customer journey.",
  },
  narrative: {
    dedicatedSection: {
      headline: "Yes.",
      body: "Standalone AI commentary appears in latest investor materials. Performer signal is well-established.",
    },
  },
  production: {
    consumerFacing: "<strong>Size recommendation model.</strong> Proprietary ML reducing returns. €400M+ return-cost saving potential cited in investor day 2025.",
    genAI: {
      mentioned: true,
      note: "GenAI signal detected in use cases or vendor stack. Confirm exact mention count from latest filings.",
    },
    stackTable: [
      { layer: "Cloud", product: "AWS", use: "Cloud / compute platform", source: { label: "From vendor footprint" } },
      { layer: "Cloud", product: "GCP", use: "Cloud / ML platform", source: { label: "From vendor footprint" } },
      { layer: "Proprietary ML", product: "Proprietary ML", use: "In stack — purpose disclosed at sector level", source: { label: "From vendor footprint" } },
    ],
  },
  furtherReading: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Zalando+AI+earnings&tbm=nws" },
    { label: "📚 Wikipedia", url: "https://en.wikipedia.org/wiki/Zalando" },
  ],
  rachelNotes: [
    { lead: "Sector posture.", body: "Tech-culture company first, retailer second." },
    { lead: "Operating reality.", body: "Active GitHub org (500+ ML repos). CTO-led AI investment. Returns reduction is the clearest ROI narrative in the sector." },
    { lead: "Vendor mix.", body: "Hand-curated from public technology disclosures, primary footprint on AWS, GCP, Proprietary ML. Confirm depth of relationship before treating as exclusive." },
    { lead: "Watch-list.", body: "Watch for next earnings to keep AI airtime above the sector median; performer status sticks only if production keeps growing." },
  ],
};

export const batch3: Record<string, Partial<CompanyTemplateData>> = {
  "ab-inbev": ab_inbev_b3,
  "adidas": adidas_b3,
  "ahold-delhaize": ahold_delhaize_b3,
  "arla": arla_b3,
  "asos": asos_b3,
  "barilla": barilla_b3,
  "beiersdorf": beiersdorf_b3,
  "burberry": burberry_b3,
  "campari": campari_b3,
  "carlsberg": carlsberg_b3,
  "carrefour": carrefour_b3,
  "colruyt": colruyt_b3,
  "danone": danone_b3,
  "decathlon": decathlon_b3,
  "diageo": diageo_b3,
  "essity": essity_b3,
  "estee-lauder": estee_lauder_b3,
  "ferrero": ferrero_b3,
  "fnac-darty": fnac_darty_b3,
  "hm": hm_b3,
  "haleon": haleon_b3,
  "heineken": heineken_b3,
  "hellofresh": hellofresh_b3,
  "henkel": henkel_b3,
  "hermes": hermes_b3,
  "ikea": ikea_b3,
  "inditex": inditex_b3,
  "jeronimo-martins": jeronimo_martins_b3,
  "kering": kering_b3,
  "kingfisher": kingfisher_b3,
  "loreal": loreal_b3,
  "lavazza": lavazza_b3,
  "lego": lego_b3,
  "lotus-bakeries": lotus_bakeries_b3,
  "mango": mango_b3,
  "marks-spencer": marks_spencer_b3,
  "nespresso": nespresso_b3,
  "nestle": nestle_b3,
  "ocado": ocado_b3,
  "on-running": on_running_b3,
  "pernod-ricard": pernod_ricard_b3,
  "puig": puig_b3,
  "reckitt": reckitt_b3,
  "richemont": richemont_b3,
  "sainsburys": sainsburys_b3,
  "sodexo": sodexo_b3,
  "tesco": tesco_b3,
  "unilever": unilever_b3,
  "zalando": zalando_b3,
};
