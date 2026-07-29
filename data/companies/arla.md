---
slug: arla
meta:
  company: Arla Foods
  hq: { city: Viby J, country: DK, aiActApplies: true }
  sector: CPG
  isGroup: false
  isAINative: false
  isPrivate: true

investorSnapshot:
  revenue: { absolute: 15.1, currency: "€B", yoyOrganicPct: 9.4, sourceUrl: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/", evidenceTier: confirmed, note: "FY2025 record year" }
  operatingProfit: { absolute: 0.415, currency: "€B (net profit)", marginPct: 2.7, yoyPct: 0, sourceUrl: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/", evidenceTier: confirmed, note: "Cooperative model: performance price 56.4 EUR-c/kg is the primary KPI" }
  netCash: { absolute: 0, currency: "€B", netDebtToEbitda: 0, evidenceTier: estimated }
  employees: { headcount: 22000, sourceUrl: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/", evidenceTier: confirmed }
  maisons: []
  retailStores: { total: 0, byType: [], evidenceTier: estimated }
  countries: { count: 100, regions: [EMEA, AMER, APAC], sourceUrl: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/" }
  hq: { city: Viby J, country: DK, aiActApplies: true }
  languages: [en, da]
  reporting: { latestReportDate: 2026-02-18, nextTradingUpdate: 2026-08-15 }
  revenueStreams: []

aiPerception:
  score: { rhetoric: 2, production: 3, quadrant: silent_builder, rubricVersion: "1.0" }
  namedProductionTools:
    - { name: "Milk-yield prediction AI", category: supply_chain, roi: "1.4% accuracy improvement; ~440M lbs/yr milk used more efficiently across 1.5M cows", sourceUrl: "https://www.fooddive.com/news/arla-foods-uses-ai-to-steer-milk-projections/556773/", evidenceTier: confirmed }
    - { name: "Azure OpenAI for recipes", category: consumer, roi: "GenAI surfacing from ~6,500-recipe database; editorial copilot for Arla Sweden", sourceUrl: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service", evidenceTier: confirmed }
    - { name: "Centralised data foundation (Azure + Power BI)", category: analytics, roi: "Single Azure platform for non-SAP data; self-service Power BI + ML analytics", sourceUrl: "https://www.microsoft.com/en/customers/story/827449-arla-foods-consumer-goods-power-bi", evidenceTier: confirmed }
    - { name: "GEO pilot (Azoma + CARAT)", category: marketing, roi: "Brand share-of-voice tracking and optimisation in ChatGPT, Perplexity, Google AI Overviews", sourceUrl: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article", evidenceTier: confirmed }
  aiFraming: { value: efficiency, sourceUrl: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/", evidenceTier: confirmed }
  quantifiedROI:
    stated: true
    figure: "Milk-yield prediction: 1.4% accuracy improvement; ~440M pounds of milk annually used more efficiently."
    evidenceTier: confirmed
  consumerFacingAIProduct: { exists: true, name: "Azure OpenAI recipe surfacing (Arla.se)", sourceUrl: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service", evidenceTier: confirmed }
  vendorPartners:
    - { name: "Microsoft", sourceUrl: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service", evidenceTier: confirmed }
    - { name: "Azoma", sourceUrl: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article", evidenceTier: confirmed }
  aiAnalyticsStack:
    - { tech: "Azure", layer: cloud, evidenceTier: confirmed }
    - { tech: "Azure OpenAI", layer: llm, evidenceTier: confirmed }
    - { tech: "Power BI", layer: app, evidenceTier: confirmed }
    - { tech: "GEO / Azoma", layer: app, evidenceTier: confirmed }
  cSuiteAIPresenter:
    exists: true
    name: "Mia Heslegrave"
    role: "Chief Information Officer (since 1 Feb 2025)"
    sourceType: press_release
    sourceUrl: https://www.arla.com/company/news-and-press/2025/pressrelease/leadership-change-in-arlas-it-organisation/
    evidenceTier: confirmed
  genAIMentioned: { value: true, mentions: 2, sourceUrl: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service", evidenceTier: confirmed }
  dedicatedAISection: { value: false, evidenceTier: confirmed }
  maisonHighlights:
    - { brand: "Arla (Arla.se)", aiInitiative: "Azure OpenAI-powered recipe surfacing from 6,500-recipe database", sourceUrl: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service", sourceType: vendor_case }
---

## Rachel's notes

Cooperative dairy. 10,300 farmer-owners, 1.5M cows, 14.3B kg milk intake in 2025. FY2025 record year at €15.1B (+9.4%). Arla Foods Ingredients (AFI) standout at +43.1%.

- Microsoft is the dominant cloud + GenAI partner: milk-yield AI, Azure OpenAI recipes (Arla.se), and Azure/Power BI data foundation all confirmed.
- GEO pilot with Azoma + CARAT is the forward-looking signal: first FMCG brand on the watchlist tracking brand presence in AI answer engines (ChatGPT, Perplexity, Google AI Overviews). Four-month pilot, results pending.
- Mia Heslegrave (CIO since Feb 2025) is the tech leadership seat. IT sits under CFO Torben Dahl Nyholm; no dedicated CTO or CAIO role.
- FY2026 revenue guide €13.3-14.1B (lower vs 2025 record on commodity normalisation, not weakness).
- Watch H1 2026 (mid-August) for any GEO pilot results or new named AI tool.
