---
slug: ocado
meta:
  company: Ocado Group
  ticker: OCDO.L
  hq: { city: Hatfield, country: UK, aiActApplies: false }
  sector: Grocery
  isGroup: false
  isAINative: true

investorSnapshot:
  revenue: { absolute: 3.2, currency: "£B", yoyOrganicPct: 12.8, yoyPublishedPct: 14.1, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  operatingProfit: { absolute: -0.155, currency: "£B", marginPct: -4.8, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  netCash: { absolute: -1.1, currency: "£B", sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  employees: { headcount: 21000, sourceUrl: "https://www.ocadogroup.com/about-us/", evidenceTier: confirmed }
  maisons: []
  retailStores: { total: 0, byType: [], evidenceTier: confirmed }
  countries: { count: 11, regions: [EMEA, AMER, APAC], sourceUrl: "https://www.ocadogroup.com/about-us/" }
  hq: { city: Hatfield, country: UK, aiActApplies: false, jurisdictionNote: "UK domiciled; partner CFCs in EU subject to EU AI Act for high-risk automation." }
  languages: [en]
  reporting: { latestReportDate: 2026-02-26, nextTradingUpdate: 2026-04-15 }
  revenueStreams:
    - { stream: "Technology Solutions", sharePct: 12, sourceUrl: "https://www.ocadogroup.com/investors/" }
    - { stream: "Logistics", sharePct: 14, sourceUrl: "https://www.ocadogroup.com/investors/" }
    - { stream: "Retail", sharePct: 74, sourceUrl: "https://www.ocadogroup.com/investors/" }

aiPerception:
  score: { rhetoric: 5, production: 5, quadrant: native, rubricVersion: "1.0" }
  keyEarningsQuote:
    text: "Our 600+ ML models run every CFC. AI is not a feature, it is the operating system."
    speaker: "Tim Steiner"
    role: "CEO"
    date: 2026-02-26
    sourceUrl: https://www.ocadogroup.com/investors/
  namedProductionTools:
    - { name: "Ocado Smart Platform (OSP) ML", category: ops, sourceUrl: "https://www.ocadogroup.com/technology/", evidenceTier: confirmed }
    - { name: "On-Grid Robotic Pick", category: ops, sourceUrl: "https://www.ocadogroup.com/technology/", evidenceTier: confirmed }
    - { name: "Re:Imagined automation suite", category: ops, sourceUrl: "https://www.ocadogroup.com", evidenceTier: confirmed }
  aiFraming: { value: moat, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  quantifiedROI: { stated: true, figure: "600+ ML models in production across CFCs.", evidenceTier: confirmed }
  consumerFacingAIProduct: { exists: true, name: "Ocado.com personalisation engine", evidenceTier: confirmed }
  vendorPartners:
    - { name: "Google Cloud", sourceUrl: "https://cloud.google.com", evidenceTier: confirmed }
    - { name: "Nvidia", sourceUrl: "https://nvidia.com", evidenceTier: estimated }
  aiAnalyticsStack:
    - { tech: "Google Cloud", layer: cloud, evidenceTier: confirmed }
    - { tech: "TensorFlow", layer: ml, evidenceTier: confirmed }
    - { tech: "Custom in-house LLM", layer: llm, evidenceTier: estimated }
  cSuiteAIPresenter: { exists: true, name: "James Matthews", role: "CEO Ocado Technology", sourceType: earnings_call, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  genAIMentioned: { value: true, mentions: 9, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  dedicatedAISection: { value: true, sourceUrl: "https://www.ocadogroup.com/investors/", evidenceTier: confirmed }
  maisonHighlights: []
---

## Rachel's notes

AI Native. Renders off-matrix per the wireframe. Ocado is a tech company that happens to sell groceries; comparing it to Tesco on rhetoric/production misses the point.

- 2026-07-25 (H1 2026 print, reported Jul 16): Group revenue £1.0bn, +1% YoY; adjusted EBITDA £81m (down from £92m). Ocado Retail +15% revenue / +13% orders, reaffirmed as the UK's fastest-growing grocer; H2 positive-cash-flow guidance held. Shares fell ~19% on Technology Solutions softness. AI-native thesis intact: 600+ ML models in production, Google Cloud + OSP. Canonical field-fill (latestReportDate = 2026-07-16, revenue/EBITDA refresh) drafted, awaiting approval before reseeding.
