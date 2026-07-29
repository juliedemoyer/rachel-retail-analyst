---
slug: adidas
meta:
  company: Adidas
  hq: { city: Herzogenaurach, country: DE, aiActApplies: true }
  sector: Apparel & E-commerce
  isGroup: false
  isAINative: false

investorSnapshot:
  revenue: { absolute: 24.0, currency: "€B", yoyOrganicPct: 12, sourceUrl: "https://www.adidas-group.com/en/media/press-releases/adidas-reports-record-revenues-in-2025-and-launches-share-buyback", evidenceTier: confirmed }
  operatingProfit: { absolute: 2.056, currency: "€B", marginPct: 8.3, yoyPct: 54, sourceUrl: "https://report.adidas-group.com/2025/en/group-management-report-financial-review/business-performance/income-statement.html", evidenceTier: confirmed }
  netCash: { absolute: 0, currency: "€B", netDebtToEbitda: 0, sourceUrl: "?", evidenceTier: estimated }
  employees: { headcount: 59000, sourceUrl: "https://www.adidas-group.com/en/investors/financial-reports", evidenceTier: confirmed }
  maisons: []
  retailStores: { total: 0, byType: [], sourceUrl: "?", evidenceTier: estimated }
  countries: { count: 150, regions: [EMEA, AMER, APAC], sourceUrl: "https://www.adidas-group.com/en/investors/financial-reports" }
  hq: { city: Herzogenaurach, country: DE, aiActApplies: true }
  languages: [en, de]
  reporting: { latestReportDate: 2026-04-29, nextTradingUpdate: null }
  revenueStreams: []

aiPerception:
  score: { rhetoric: 3, production: 2, quadrant: narrative_led, rubricVersion: "1.0" }
  namedProductionTools:
    - { name: "GitHub Copilot", category: ops, roi: "Rolled out to ~700 devs (~85% of engineering org)", sourceUrl: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/", evidenceTier: confirmed }
    - { name: "adidas Confirmed / mi adidas", category: consumer, roi: "Personalisation engine for 500M+ targeted members", sourceUrl: "https://digitaldefynd.com/IQ/adidas-using-ai-case-study/", evidenceTier: confirmed }
    - { name: "Product review analysis chatbot (Databricks + Claude Haiku)", category: analytics, roi: "60% latency reduction, 91.67% cost savings, 98.5% token efficiency on 2M+ reviews/yr", sourceUrl: "https://www.databricks.com/customers/adidas", evidenceTier: confirmed }
    - { name: "Jasper AI", category: marketing, roi: "B2B product descriptions at scale (150+ shoe models initially)", sourceUrl: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success", evidenceTier: confirmed }
    - { name: "project44 supply chain intelligence", category: supply_chain, roi: "AI-powered supply chain decision intelligence (Feb 2026)", sourceUrl: "https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain-over-next-decade", evidenceTier: confirmed }
  aiFraming: { value: efficiency, sourceUrl: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/", evidenceTier: confirmed }
  quantifiedROI: { stated: true, figure: "Claude Haiku review chatbot: 60% latency reduction, 91.67% cost savings, 98.5% token efficiency (2M+ reviews/yr, 500+ users)", evidenceTier: confirmed }
  consumerFacingAIProduct: { exists: true, name: "adidas Confirmed / mi adidas personalisation", sourceUrl: "https://digitaldefynd.com/IQ/adidas-using-ai-case-study/", evidenceTier: confirmed }
  vendorPartners:
    - { name: "Microsoft", sourceUrl: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/", evidenceTier: confirmed }
    - { name: "Anthropic", sourceUrl: "https://www.databricks.com/customers/adidas", evidenceTier: confirmed }
    - { name: "Databricks", sourceUrl: "https://www.databricks.com/customers/adidas", evidenceTier: confirmed }
    - { name: "Jasper AI", sourceUrl: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success", evidenceTier: confirmed }
    - { name: "project44", sourceUrl: "https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain-over-next-decade", evidenceTier: confirmed }
  aiAnalyticsStack:
    - { tech: "Azure", layer: cloud, evidenceTier: confirmed }
    - { tech: "GitHub Copilot", layer: app, evidenceTier: confirmed }
    - { tech: "Databricks", layer: ml, evidenceTier: confirmed }
    - { tech: "Claude Haiku", layer: llm, evidenceTier: confirmed }
  cSuiteAIPresenter: { exists: true, name: "Fumbi Chima", role: "CIO", sourceType: press_release, sourceUrl: "https://us.fashionnetwork.com/news/Adidas-names-new-chief-information-officer,1039325.html", evidenceTier: confirmed }
  genAIMentioned: { value: true, mentions: 4, sourceUrl: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/", evidenceTier: confirmed }
  dedicatedAISection: { value: false, evidenceTier: confirmed }
  maisonHighlights: []
---

## Rachel's notes

FY2025 comeback: revenue €24.0B (+12% c/n), OP €2.06B (+54%), margin +2.6pp. Q1 2026: +14% c/n, +16% OP, 10.7% margin. Outlook €2.3B FY2026 OP.

**Vendor stack (broader than previously documented):**
- Microsoft: Azure + GitHub Copilot (~700 devs, ~85% of engineering)
- Anthropic (confirmed): Claude Haiku via Databricks for product review chatbot (2M+ reviews/yr, 500+ users, 91.67% cost savings)
- Databricks: platform for review analysis RAG chatbot + Agent Digital Twin governance project
- Jasper AI: B2B product descriptions at scale
- project44: supply chain decision intelligence (Feb 2026)

AI sits behind brand momentum on earnings calls. No standalone AI investor section. Fumbi Chima is new CIO; AI/data leadership distributed across Elena Nikolaeva (advanced analytics) and Yvonne Koleczek (consumer segmentation).

Watch H1 2026 (early August) for first dedicated AI disclosure.
