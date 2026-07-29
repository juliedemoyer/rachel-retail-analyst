---
slug: asos
meta:
  company: ASOS
  ticker: ASC.L
  hq: { city: London, country: UK, aiActApplies: false, jurisdictionNote: "UK domiciled; EU AI Act applies only to EU-facing use cases." }
  sector: Apparel & E-commerce
  isGroup: false
  isAINative: false

investorSnapshot:
  revenue: { absolute: 1.11, currency: "£B (H1 FY26)", yoyOrganicPct: -14, sourceUrl: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf", evidenceTier: confirmed, note: "GMV £1.17B (-9%); deliberate stock-reset action" }
  operatingProfit: { absolute: -0.1009, currency: "£B (H1 FY26 op loss)", marginPct: -9.1, yoyPct: 52, sourceUrl: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf", evidenceTier: confirmed, note: "Op loss £100.9M vs £210.1M prior year; adj. EBITDA +51% to £64M" }
  netCash: { absolute: -0.3, currency: "£B", sourceUrl: "https://www.asosplc.com/investors/results-centre/", evidenceTier: confirmed }
  employees: { headcount: 2500, sourceUrl: "https://www.asosplc.com/about-us/", evidenceTier: confirmed }
  maisons: []
  retailStores: { total: 0, byType: [], evidenceTier: confirmed }
  countries: { count: 200, regions: [WORLDWIDE], sourceUrl: "https://www.asosplc.com/about-us/" }
  hq: { city: London, country: UK, aiActApplies: false }
  languages: [en]
  reporting: { latestReportDate: 2026-04-23, nextTradingUpdate: 2026-07-31 }
  revenueStreams:
    - { stream: "UK", sharePct: 41, sourceUrl: "https://www.asosplc.com/investors/results-centre/" }
    - { stream: "EU", sharePct: 33, sourceUrl: "https://www.asosplc.com/investors/results-centre/" }
    - { stream: "US", sharePct: 14, sourceUrl: "https://www.asosplc.com/investors/results-centre/" }
    - { stream: "RoW", sharePct: 12, sourceUrl: "https://www.asosplc.com/investors/results-centre/" }

aiPerception:
  score: { rhetoric: 4, production: 4, quadrant: performer, rubricVersion: "1.0" }
  keyEarningsQuote:
    text: "Copilot rolled out to 90% of the organisation, saving 35,000 hours."
    speaker: "ASOS PLC"
    role: "H1 FY2026 interim results"
    date: 2026-04-23
    sourceUrl: https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf
  namedProductionTools:
    - { name: "AI Stylist", category: consumer, roi: "Consumer-facing fashion recommendation chatbot on Azure OpenAI", sourceUrl: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/", evidenceTier: confirmed }
    - { name: "GitHub Copilot", category: ops, roi: "AI pair programming since 2023; engineering productivity", sourceUrl: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/", evidenceTier: confirmed }
    - { name: "Microsoft 365 Copilot", category: ops, roi: "90% org adoption; 35,000 hours saved (H1 FY26 disclosure)", sourceUrl: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf", evidenceTier: confirmed }
    - { name: "Power Automate + Teams Premium", category: ops, roi: "Process automation + AI meeting summaries and live translations", sourceUrl: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/", evidenceTier: confirmed }
    - { name: "Demand forecasting ML", category: supply_chain, roi: "Flagship internal AI use case underpinning the stock-reset story", sourceUrl: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/", evidenceTier: confirmed }
    - { name: "Sierra AI customer service agents", category: consumer, roi: "AI agents across customer experience; deal Dec 2025 (Bret Taylor's platform, $10B valuation)", sourceUrl: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal", evidenceTier: confirmed }
  aiFraming: { value: efficiency, sourceUrl: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf", evidenceTier: confirmed }
  quantifiedROI:
    stated: true
    figure: "M365 Copilot: 35,000 hours saved (90% org adoption). AI agents write ~15% of ASOS code. Profit per order +30%. Gross margin +330bps. Adj. EBITDA +51% YoY in H1 FY26."
    evidenceTier: confirmed
  consumerFacingAIProduct:
    exists: true
    name: "AI Stylist + Sierra AI customer service agents"
    sourceUrl: https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/
    evidenceTier: confirmed
  vendorPartners:
    - { name: "Microsoft", sourceUrl: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/", evidenceTier: confirmed }
    - { name: "Sierra", sourceUrl: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal", evidenceTier: confirmed }
  aiAnalyticsStack:
    - { tech: "Azure", layer: cloud, evidenceTier: confirmed }
    - { tech: "Azure OpenAI", layer: llm, evidenceTier: confirmed }
    - { tech: "Azure AI Foundry", layer: ml, evidenceTier: confirmed }
    - { tech: "Cosmos DB", layer: data, evidenceTier: confirmed }
    - { tech: "GitHub Copilot", layer: app, evidenceTier: confirmed }
    - { tech: "Microsoft Dynamics 365", layer: app, evidenceTier: confirmed }
  cSuiteAIPresenter:
    exists: true
    name: "Papinder Dosanjh"
    role: "Director of AI and Machine Learning"
    sourceType: press_release
    sourceUrl: https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/
    evidenceTier: confirmed
  genAIMentioned:
    value: true
    mentions: 6
    sourceUrl: https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf
    evidenceTier: confirmed
  dedicatedAISection:
    value: true
    sourceUrl: https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf
    evidenceTier: confirmed
  maisonHighlights: []
---

## Rachel's notes

Deep Microsoft stack with a new non-Microsoft signal: Sierra AI (customer service agents, Dec 2025). One of the most aggressive M365 Copilot adopters on the watchlist (90% of org, 35,000 hours saved in H1 FY26).

- H1 FY2026 (26w to 1 Mar 2026): revenue £1.11B (-14% on deliberate stock reset), adj. EBITDA +51% to £64M, op loss halved to £100.9M vs £210.1M.
- AI agents now write ~15% of ASOS code. Profit per order +30%. Gross margin +330bps. Turnaround narrative is now explicitly AI-powered.
- ERP migration to Microsoft Dynamics 365 in flight (£67M legacy-asset impairment).
- Sierra is the first non-Microsoft named vendor: ex-Salesforce co-CEO Bret Taylor's customer service AI platform, $10B valuation.
- AI leadership: Papinder Dosanjh (Director AI/ML) is the technical champion; Victoria Arden (Director of Technology Operations) fronts vendor partnerships.
- Watch FY2026 full-year (late July 2026) for first full-year AI cost-takeout numbers.
