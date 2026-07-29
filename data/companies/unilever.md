---
slug: unilever
meta:
  company: Unilever
  ticker: ULVR.L
  hq: { city: London, country: UK, aiActApplies: false }
  sector: CPG
  isGroup: true
  isAINative: false

investorSnapshot:
  revenue: { absolute: 60.8, currency: "€B", yoyOrganicPct: 4.5, yoyPublishedPct: -0.3, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  operatingProfit: { absolute: 11.2, currency: "€B", marginPct: 18.4, yoyPct: 12.6, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  netCash: { absolute: -23.0, currency: "€B", netDebtToEbitda: 1.9, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  employees: { headcount: 128000, sourceUrl: "https://www.unilever.com/", evidenceTier: confirmed }
  maisons:
    - { name: "Dove", sourceUrl: "https://www.unilever.com" }
    - { name: "Knorr", sourceUrl: "https://www.unilever.com" }
    - { name: "Hellmann's", sourceUrl: "https://www.unilever.com" }
    - { name: "Magnum", sourceUrl: "https://www.unilever.com" }
    - { name: "Persil", sourceUrl: "https://www.unilever.com" }
    - { name: "Rexona", sourceUrl: "https://www.unilever.com" }
  retailStores: { byType: [], evidenceTier: confirmed }
  countries: { count: 190, regions: [WORLDWIDE], sourceUrl: "https://www.unilever.com/" }
  hq: { city: London, country: UK, aiActApplies: false, jurisdictionNote: "UK domiciled; EU-facing brand sites subject to EU AI Act for high-risk uses." }
  languages: [en]
  reporting: { latestReportDate: 2026-04-30, nextTradingUpdate: 2026-07-24 }
  revenueStreams:
    - { stream: "Beauty & Wellbeing", sharePct: 22, sourceUrl: "https://www.unilever.com/investors/" }
    - { stream: "Personal Care", sharePct: 23, sourceUrl: "https://www.unilever.com/investors/" }
    - { stream: "Home Care", sharePct: 20, sourceUrl: "https://www.unilever.com/investors/" }
    - { stream: "Foods", sharePct: 22, sourceUrl: "https://www.unilever.com/investors/" }
    - { stream: "Ice Cream", sharePct: 13, sourceUrl: "https://www.unilever.com/investors/" }

recentSources:
  - { label: "Unilever Beauty & Wellbeing AI case study (Brand DNAi + microbiome cohorts)", url: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/", date: "2026-04-27", kind: "case_study" }
  - { label: "Unilever Q1 2026 trading statement", url: "https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf", date: "2026-04-30", kind: "earnings" }

aiPerception:
  score: { rhetoric: 4, production: 2, quadrant: narrative_led, rubricVersion: "1.0" }
  keyEarningsQuote:
    text: "Generative AI is reshaping our marketing productivity. We are scaling AI-generated creative across our top brands."
    speaker: "Hein Schumacher"
    role: "CEO"
    date: 2026-02-13
    sourceUrl: https://www.unilever.com/investors/
  namedProductionTools:
    - { name: "AI marketing creative generation", category: marketing, sourceUrl: "https://www.unilever.com", evidenceTier: confirmed }
    - { name: "Brand DNAi (proprietary AI governance platform)", category: marketing, sourceUrl: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/", evidenceTier: confirmed }
    - { name: "Beauty & Wellbeing virtual cohorts (microbiome-seeded GenAI)", category: ops, sourceUrl: "https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/", evidenceTier: confirmed }
  aiFraming: { value: efficiency, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  quantifiedROI: { stated: false }
  consumerFacingAIProduct: { exists: false, evidenceTier: estimated }
  vendorPartners:
    - { name: "Microsoft", sourceUrl: "https://news.microsoft.com", evidenceTier: estimated }
    - { name: "Google Cloud", sourceUrl: "https://cloud.google.com", evidenceTier: confirmed }
  aiAnalyticsStack:
    - { tech: "Google Cloud", layer: cloud, evidenceTier: confirmed }
    - { tech: "Vertex AI", layer: ml, evidenceTier: estimated }
  cSuiteAIPresenter: { exists: true, name: "Hein Schumacher", role: "CEO", sourceType: earnings_call, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  genAIMentioned: { value: true, mentions: 7, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  dedicatedAISection: { value: true, sourceUrl: "https://www.unilever.com/investors/", evidenceTier: confirmed }
  maisonHighlights:
    - { brand: "Dove", aiInitiative: "AI-generated marketing creative pilot.", sourceUrl: "https://www.unilever.com", sourceType: press_release }
---

## Rachel's notes

### News — 2026-07-28

- [Unilever H1 2026: Beauty & Wellbeing up 5.9% underlying, FY guidance raised to the top of the 4-6% range](https://www.investegate.co.uk/announcement/rns/unilever--ulvr/2026-first-half-results/9689925)
  Beauty & Wellbeing underlying sales +5.9%, 4.5pts of it volume, led by double-digit volume growth at Dove, Sunsilk and Vaseline plus prestige beauty. FY26 underlying sales growth now expected within the 4-6% multi-year range with around 3% volume growth, an upgrade on earlier gui
  Source: Unilever IR

Schumacher mentions GenAI on every call but production stays in marketing-creative-pilot territory. Narrative-led quadrant — though the May 2026 Beauty & Wellbeing case study below is moving the production score upward.

### Beauty & Wellbeing AI case study (May 2026)

Unilever published a detailed case study on how AI is transforming innovation across the **€12.8B Beauty & Wellbeing business**. Key disclosed metrics:
- **Consumer insight analysis 60% faster** (~1,000 external data sources — social, search, retail, competitor — pulled monthly).
- **Formulation cycles down from 5–6 rounds to 1–2.**
- **Claims-generation 75% quicker.**
- **Concept-to-R&D-brief** compressed from months to days.
- **Virtual cohorts** seeded with Unilever's microbiome datasets enable demographic simulation pre-launch.
- **Brand DNAi** — proprietary AI governance platform that centralises brand data for the AI ecosystem and lets GenAI models generate on-brand content while avoiding tone, imagery and targeting drift.

This is the most production-grade AI case study on the watchlist for any CPG. It moves Unilever's production score upward and sets the reference pattern every beauty/CPG board will benchmark against for the next 12 months. Source: https://www.unilever.com/news/news-search/2026/how-ai-is-transforming-innovation-in-unilever-beauty-wellbeing/

### Q1 2026 trading statement (30 April 2026)

Underlying sales growth +3.8% (volume +2.9%, price +0.9%). Power Brands USG +5.0% with volume +4.0%. Reported turnover €12.6B (-3.3% YoY on FX/disposals). By segment: Beauty & Wellbeing USG +3.6% (Dove, Vaseline, prestige), Home Care +6.1%, Emerging Markets +5.7% (India led). Full-year 2026 guidance reaffirmed: bottom end of 4-6% USG range, at least +2% volume. Q1 quarterly dividend €0.4664 (+3.0% YoY). New CEO Fernando Fernandez and CFO Srinivas Phatak presenting. AI mentions concentrated on marketing creative productivity, no new vendor named. Source: https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf
