---
slug: nestle
meta:
  company: Nestlé
  ticker: NESN.SW
  hq: { city: Vevey, country: CH, aiActApplies: false }
  sector: CPG
  isGroup: true
  isAINative: false

investorSnapshot:
  revenue: { absolute: 91.4, currency: "CHF B", yoyOrganicPct: 2.2, yoyPublishedPct: -1.8, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  operatingProfit: { absolute: 15.7, currency: "CHF B", marginPct: 17.2, yoyPct: -2.0, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  netCash: { absolute: -45.0, currency: "CHF B", netDebtToEbitda: 2.4, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  employees: { headcount: 277000, sourceUrl: "https://www.nestle.com/", evidenceTier: confirmed }
  maisons:
    - { name: "Nescafé", sourceUrl: "https://www.nestle.com" }
    - { name: "KitKat", sourceUrl: "https://www.nestle.com" }
    - { name: "Maggi", sourceUrl: "https://www.nestle.com" }
    - { name: "Nespresso", sourceUrl: "https://www.nestle.com" }
    - { name: "Purina", sourceUrl: "https://www.nestle.com" }
    - { name: "Perrier", sourceUrl: "https://www.nestle.com" }
  retailStores: { total: 825, byType: [{ type: "Nespresso boutique", count: 825 }], sourceUrl: "https://www.nestle.com/", evidenceTier: confirmed }
  countries: { count: 188, regions: [WORLDWIDE], sourceUrl: "https://www.nestle.com/" }
  hq: { city: Vevey, country: CH, aiActApplies: false, jurisdictionNote: "Swiss domiciled; EU-facing operations subject to EU AI Act." }
  languages: [en, fr, de]
  reporting: { latestReportDate: 2026-02-20, nextTradingUpdate: 2026-04-25 }
  revenueStreams:
    - { stream: "Powdered & Liquid Beverages", sharePct: 27, sourceUrl: "https://www.nestle.com/investors" }
    - { stream: "PetCare", sharePct: 21, sourceUrl: "https://www.nestle.com/investors" }
    - { stream: "Nutrition & Health Science", sharePct: 17, sourceUrl: "https://www.nestle.com/investors" }
    - { stream: "Prepared Dishes", sharePct: 13, sourceUrl: "https://www.nestle.com/investors" }
    - { stream: "Confectionery", sharePct: 10, sourceUrl: "https://www.nestle.com/investors" }
    - { stream: "Other", sharePct: 12, sourceUrl: "https://www.nestle.com/investors" }

aiPerception:
  score: { rhetoric: 4, production: 2, quadrant: narrative_led, rubricVersion: "1.0" }
  keyEarningsQuote:
    text: "We are deploying generative AI across R&D, marketing and supply chain. The productivity uplift is meaningful."
    speaker: "Laurent Freixe"
    role: "CEO"
    date: 2026-02-20
    sourceUrl: https://www.nestle.com/investors
  namedProductionTools:
    - { name: "AI marketing content generation", category: marketing, sourceUrl: "https://www.nestle.com", evidenceTier: confirmed }
    - { name: "Cocoa Compass (supply chain)", category: supply_chain, sourceUrl: "https://www.nestle.com", evidenceTier: confirmed }
  aiFraming: { value: efficiency, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  quantifiedROI: { stated: false }
  consumerFacingAIProduct: { exists: false, evidenceTier: estimated }
  vendorPartners:
    - { name: "Microsoft", sourceUrl: "https://news.microsoft.com", evidenceTier: estimated }
  aiAnalyticsStack:
    - { tech: "Azure", layer: cloud, evidenceTier: estimated }
  cSuiteAIPresenter: { exists: true, name: "Laurent Freixe", role: "CEO", sourceType: earnings_call, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  genAIMentioned: { value: true, mentions: 5, sourceUrl: "https://www.nestle.com/investors", evidenceTier: confirmed }
  dedicatedAISection: { value: false, evidenceTier: confirmed }
  maisonHighlights: []
---

## Rachel's notes

Leadership changed in late 2024; AI rhetoric ticked up in subsequent calls, but no flagship consumer AI product is disclosed yet.

### Leadership: AI / digital function

**Chris Wright** serves as Group Chief Information Officer, owning the AI deployment agenda. Quote: "AI isn't a pilot at Nestlé — it's deployed across the company from farm to fork." Reports the AI/digital programme into the Executive Board. Nestlé selected to join the **Frontier Firm AI Initiative** with the D^3 Institute at Harvard and Microsoft (announced 2025) — an industry-academic collaboration on enterprise AI deployment, signalling Nestlé wants to publish on the topic alongside Microsoft. Major SAP digital-core upgrade (started 2025, two-year horizon) is the data-platform foundation behind the AI scale-up. CEO Laurent Freixe presents AI on earnings calls (5 mentions Q4 2025); Wright owns the technical execution. Sources:
- https://fortune.com/2026/01/07/nestles-cio-says-value-of-ai-investments-beyond-efficiency/
- https://www.nestle.com/media/news/frontier-ai-initiative-harvard-microsoft
