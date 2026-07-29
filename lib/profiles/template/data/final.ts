// final.ts — hand-rebuilt company records that meet the page-quality rules
// in ADDING_A_COMPANY.md:
//   1. Baseline = latest FY (FY2025) with explicit publication date.
//   2. OP growth vs prior FY in headline.opMargin.growth.
//   3. cadence.next reflects reality (already-published events promoted to
//      lastReported; next is the genuinely forward-looking event).
//   4. Five+ clickable sources, each pointing at a real article / IR doc /
//      vendor case study (no IR-homepage fillers, no bare Google searches).
//   5. leadership.presenter populated.
//   6. production.namedTools each cite a per-tool source URL.
//   7. peerComparison comes from batch6_peers (same-subsector).
//
// This file loads after batch6_peers in index.ts so its values win for the
// hand-rebuilt companies. New companies get added here as Rachel works
// through the watchlist.

import type { CompanyTemplateData } from "../schema";

// =============================================================================
// Adidas — FY2025 baseline, Q1 2026 landed 29 Apr 2026
// =============================================================================
export const adidas_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-04" },
    lastReported: { label: "Q1 2026 results", date: "2026-04-29" },
    next: { label: "H1 2026 results", date: "Early August 2026" },
    blurb: "FY2025 annual is the baseline. Q1 2026 already published 29 April 2026 (revenue +14% c/n, op profit +16%). H1 2026 with full margin detail in early August.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · Q1 2026 reported",
    headline: {
      revenue: { value: "€24.0B", reported: "+11%", organic: "+12% c/n", note: "FY2025 record revenues" },
      opMargin: {
        value: "8.3%",
        growth: { absolute: "+€719M", pct: "+54%", basis: "OP €2,056M FY2025 vs €1,337M FY2024" },
        note: "+2.6pp YoY",
      },
      employees: { value: "59K" },
    },
    operatingComplexity: {
      hq: { value: "Germany 🇩🇪" },
      countries: { value: "150+", note: "Global wholesale + DTC footprint" },
      brands: { value: "1", note: "Adidas (master); Reebok divested 2021" },
    },
    whyMatters: "Sportswear is product-design intensive (forecasting, personalisation, performance product) and DTC-heavy after the post-Yeezy reset. AI investment lands in design, demand sensing, membership personalisation, and engineering productivity.",
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "29 April 2026",
      blurb: "Beat consensus on revenue and OP. Margin held above Gulden's 10% target despite tariff drag.",
      metrics: [
        { label: "Revenue", value: "€6.59B", trend: "+14% c/n" },
        { label: "Operating profit", value: "€705M", trend: "+16% YoY" },
        { label: "Operating margin", value: "10.7%", trend: "+0.8pp YoY" },
        { label: "Gross margin", value: "51.1%", trend: "-1.0pp (tariff drag)" },
        { label: "FY2026 OP guide", value: "~€2.3B", trend: "Confirmed" },
      ],
      reading: "Beat-and-hold: strong start, no guide raise. Management cited \"macroeconomic challenges and elevated uncertainty\" as the reason. Football and apparel led the quarter.",
      source: { label: "Reuters / Investing.com — Q1 2026 results", url: "https://www.investing.com/news/stock-market-news/adidas-reports-firstquarter-operating-profit-above-expectations-4643557" },
    },
  },
  aiPerception: {
    quadrant: "narrative_led",
    label: "Narrative-led · 2.5",
    rhetoric: 3,
    production: 2,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "Brand-led, AI-supportive.",
      body: "AI is rarely the hero of an Adidas earnings call: the story is brand momentum, football, the U.S. turnaround. AI sits underneath as a productivity and personalisation lever, not a strategic identity.",
    },
    dedicatedSection: {
      headline: "No standalone AI section in investor materials.",
      body: "Annual report and Q1 deck mention digital, membership and engineering productivity but do not carve out a dedicated AI chapter the way LVMH or L'Oréal do.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Fumbi Chima</strong> · Chief Information Officer (took over IT leadership after Andreas Hubert moved to Puma as COO in 2025). Reports to CFO Harm Ohlmeyer. Internal AI / Data product ownership is distributed across senior directors (Elena Nikolaeva for advanced analytics, Yvonne Koleczek for consumer segmentation) rather than concentrated in a Chief AI Officer.",
      source: { label: "Fashion Network — Adidas names new CIO", url: "https://us.fashionnetwork.com/news/Adidas-names-new-chief-information-officer,1039325.html" },
    },
    appointmentsNote: "Adidas treats AI/data leadership as distributed product-owner roles inside the org, not a single CAIO. The Big Byte writes this is a deliberate \"business design challenge, not a technical one\" approach.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>GitHub Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· microsoft/github</span> — rolled out to ~700 developers, ~85% of the engineering organisation. Day-to-day coding assistance.",
          source: { label: "The New Stack — Adidas engineering & GenAI", url: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/" },
        },
        {
          html: "<strong>adidas Confirmed / mi adidas</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI-driven product customiser and membership personalisation engine across 500M+ targeted members.",
          source: { label: "DigitalDefynd — Adidas AI case study", url: "https://digitaldefynd.com/IQ/adidas-using-ai-case-study/" },
        },
        {
          html: "<strong>Demand sensing & forecasting</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal advanced analytics</span> — Elena Nikolaeva's team (Advanced Analytics for Brand and Creation) covers data science, GenAI, and forecasting.",
          source: { label: "The Big Byte — Adidas AI & Data leadership", url: "https://thebigbyte.substack.com/p/adidas-own-the-game-strategy-consumer-transformation" },
        },
        {
          html: "<strong>Product review analysis chatbot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Databricks + Claude Haiku (Anthropic)</span> — RAG-based chatbot analyzing 2M+ product reviews per year. Deployed to 500+ decision-makers across 150+ countries. Results: 60% latency reduction, 91.67% cost savings, 98.5% token efficiency.",
          source: { label: "Databricks Customers — Adidas review analysis chatbot", url: "https://www.databricks.com/customers/adidas" },
        },
        {
          html: "<strong>Jasper AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Jasper</span> — AI-generated product descriptions for the B2B e-commerce catalog (started with 150 shoe models, expanded). Reduces agency fees for product content at scale.",
          source: { label: "Jasper — How Adidas uses Jasper for B2B product content", url: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success" },
        },
        {
          html: "<strong>project44 supply chain intelligence</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· project44</span> — AI-powered supply chain decision intelligence translating operational signals into action. Partnership announced February 2026.",
          source: { label: "Retail Tech Innovation Hub — Adidas + project44 (Feb 2026)", url: "https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain-over-next-decade" },
        },
      ],
    },
    consumerFacing: "<strong>Yes, lightly.</strong> The customiser, personalised membership marketing, and AI-generated product copy / email content are the most consumer-visible. No flagship GenAI product in the way Nike has rolled out generative design tools.",
    genAI: {
      mentioned: true,
      vendors: [
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "Microsoft (Azure cloud)", url: "https://www.adidas-group.com/en/investors/financial-reports" },
        { name: "Anthropic (Claude Haiku via Databricks)", url: "https://www.databricks.com/customers/adidas" },
        { name: "Databricks", url: "https://www.databricks.com/customers/adidas" },
        { name: "Jasper AI", url: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success" },
      ],
      note: "GenAI stack broader than previously documented: Copilot for engineering productivity, Claude Haiku via Databricks for review analysis at scale (2M+ reviews, 500+ users), Jasper for B2B product content generation, and project44 for supply chain AI.",
    },
    stackTable: [
      { layer: "Engineering productivity", product: "GitHub Copilot", use: "AI pair programming for ~700 / ~85% of engineers", source: { label: "The New Stack — Adidas engineering & GenAI", url: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/" } },
      { layer: "Cloud", product: "Microsoft Azure", use: "Primary cloud + data platform", source: { label: "Adidas Group — Financial Publications (cloud spend disclosed)", url: "https://www.adidas-group.com/en/investors/financial-reports" } },
      { layer: "Membership / personalisation", product: "adidas Confirmed / mi adidas", use: "Customisation + member personalisation engine (500M+ targeted)", source: { label: "DigitalDefynd — Adidas AI case study", url: "https://digitaldefynd.com/IQ/adidas-using-ai-case-study/" } },
      { layer: "Advanced analytics", product: "Internal AA / Brand & Creation team", use: "Data science + GenAI + forecasting (Elena Nikolaeva)", source: { label: "The Big Byte — Adidas AI & Data leadership", url: "https://thebigbyte.substack.com/p/adidas-own-the-game-strategy-consumer-transformation" } },
      { layer: "Analytics / GenAI (RAG)", product: "Databricks + Claude Haiku", use: "Review analysis chatbot (2M+ reviews/yr, 500+ users, 60% latency reduction)", source: { label: "Databricks Customers — Adidas", url: "https://www.databricks.com/customers/adidas" } },
      { layer: "Content generation", product: "Jasper AI", use: "B2B product descriptions at scale (150+ shoe models initially)", source: { label: "Jasper — Adidas product content use case", url: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success" } },
      { layer: "Supply chain", product: "project44", use: "AI-powered supply chain decision intelligence (Feb 2026)", source: { label: "Retail Tech Innovation Hub — Adidas + project44", url: "https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain-over-next-decade" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Azure + GitHub Copilot",
        status: "confirmed",
        caseStudy: { label: "The New Stack — Adidas engineering & GenAI", url: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/" },
        note: "GitHub Copilot rolled out to ~700 developers (~85% of engineering org). Azure is the primary cloud + data platform.",
      },
      {
        name: "Anthropic — Claude Haiku via Databricks",
        status: "confirmed",
        caseStudy: { label: "Databricks Customers — Adidas review analysis chatbot", url: "https://www.databricks.com/customers/adidas" },
        note: "Claude Haiku serves as the underlying LLM for the Databricks RAG chatbot analyzing 2M+ product reviews. 91.67% cost savings vs prior solution. 500+ users across 150+ countries.",
      },
      {
        name: "Databricks — GenAI platform",
        status: "confirmed",
        caseStudy: { label: "Databricks Customers — Adidas", url: "https://www.databricks.com/customers/adidas" },
        note: "Platform for the review analysis RAG chatbot. Also presented 'Agent Digital Twin for Governance, Cost and ROI' at Databricks Data+AI Summit (June 2026 forward-looking session).",
      },
      { name: "Jasper AI — B2B content generation", status: "confirmed" },
      { name: "project44 — supply chain AI", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "AWS", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
    ],
    partnersNote: "Microsoft remains the dominant infrastructure partner (Azure + Copilot). Anthropic is now confirmed via Claude Haiku inside Databricks — a meaningful finding. Databricks is an active platform partner. Jasper and project44 add content and supply-chain AI. Google Cloud, AWS, OpenAI-direct, and Mistral not publicly tied to Adidas AI work.",
  },
  rachelNotes: [
    {
      lead: "Quick take.",
      body: "FY2025 is the comeback year. OP +54% YoY (€1.34B → €2.06B), margin +2.6pp. Q1 2026 confirmed the trajectory: +14% revenue c/n, +16% OP, margin 10.7%. Outlook held at ~€2.3B FY2026 OP. The drag is tariffs and FX, not demand.",
    },
    {
      lead: "AI posture.",
      body: "Narrative-led on earnings calls but the stack is broader than it looks: Copilot at ~85% of engineering, Databricks + Claude Haiku for 2M+ product-review analysis, Jasper for B2B content, project44 for supply chain. No standalone AI investor section yet.",
    },
    {
      lead: "Vendor footprint.",
      body: "Anthropic is now confirmed (Claude Haiku via Databricks review chatbot) — the first Anthropic footprint on the watchlist outside ASOS-adjacent conversations. Microsoft locked in via Azure + Copilot. Databricks is an active platform. Google Cloud, AWS, OpenAI-direct are open.",
    },
    {
      lead: "Open loop.",
      body: "Q1 2026 is in: +14% revenue c/n, +16% OP. Watch for H1 2026 (early August) to confirm whether full-half reporting introduces a dedicated AI section or any new named tool. Useful for any sportswear-vendor comparison.",
    },
  ],
  sources: [
    { label: "Adidas — FY2025 record revenues press release", url: "https://www.adidas-group.com/en/media/press-releases/adidas-reports-record-revenues-in-2025-and-launches-share-buyback" },
    { label: "Adidas Annual Report 2025 — Income Statement", url: "https://report.adidas-group.com/2025/en/group-management-report-financial-review/business-performance/income-statement.html" },
    { label: "Reuters / Investing.com — Q1 2026 results (29 Apr)", url: "https://www.investing.com/news/stock-market-news/adidas-reports-firstquarter-operating-profit-above-expectations-4643557" },
    { label: "WWD — Adidas Q1 2026: 14% growth", url: "https://wwd.com/business-news/financial/https-wwd-com-business-news-financial-adidas-q1-2026-results-14-growth-1238932161/" },
    { label: "Bloomberg — Adidas robust growth (29 Apr 2026)", url: "https://www.bloomberg.com/news/articles/2026-04-29/adidas-sees-robust-growth-underpinned-by-apparel-and-football" },
    { label: "The Big Byte — Adidas AI & Data leadership", url: "https://thebigbyte.substack.com/p/adidas-own-the-game-strategy-consumer-transformation" },
    { label: "Fashion Network — Adidas names new CIO", url: "https://us.fashionnetwork.com/news/Adidas-names-new-chief-information-officer,1039325.html" },
    { label: "Retail Gazette — Puma names ex-Adidas CIO Hubert as COO", url: "https://www.retailgazette.co.uk/blog/2025/08/puma-adidas-cio/" },
    { label: "The New Stack — Adidas engineering & GenAI", url: "https://thenewstack.io/how-adidas-drives-engineering-success-including-with-genai/" },
    { label: "Adidas Group — Financial Publications (IR)", url: "https://www.adidas-group.com/en/investors/financial-reports" },
    { label: "Databricks Customers — Adidas review chatbot (Claude Haiku)", url: "https://www.databricks.com/customers/adidas" },
    { label: "Jasper — Adidas B2B product content use case", url: "https://www.jasper.ai/blog/how-adidas-utilizes-jasper-for-success" },
    { label: "Retail Tech Innovation Hub — Adidas + project44 supply chain AI", url: "https://retailtechinnovationhub.com/home/2026/2/15/adidas-taps-project44-tech-with-focus-on-how-ai-transforming-supply-chain-over-next-decade" },
  ],
  furtherReading: [
    { label: "DigitalDefynd — 5 ways Adidas uses AI", url: "https://digitaldefynd.com/IQ/adidas-using-ai-case-study/" },
    { label: "IT Revolution — Adidas multi-year digital transformation", url: "https://itrevolution.com/articles/sprinting-into-the-digital-age-adidas-multi-year-digital-transformation/" },
  ],
  askPrompts: [
    "What did Adidas report in Q1 2026?",
    "How is Adidas using Claude Haiku and Databricks for product review analysis?",
    "Who runs the AI agenda at Adidas now that Hubert left for Puma?",
    "What is the Adidas + project44 supply chain AI partnership?",
  ],
};

// =============================================================================
// AB InBev — FY2025 baseline, Q1 2026 landed 30 Apr 2026
// =============================================================================
export const ab_inbev_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-12" },
    lastReported: { label: "Q1 2026 results", date: "2026-04-30" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 reported 12 Feb 2026. Q1 2026 already published 30 April 2026 (revenue +5.2% c/n, op profit +7.9%). H1 2026 results in late July.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · Q1 2026 reported",
    headline: {
      revenue: { value: "$59.3B", reported: "+2.0%", organic: "+2.0% c/n", note: "FY2025" },
      opMargin: {
        value: "35.8%",
        growth: { pct: "+7.0%", basis: "Normalized EBIT growth FY2025 vs FY2024", estimated: false },
        note: "EBITDA margin +101bps YoY",
      },
      employees: { value: "150K" },
    },
    operatingComplexity: {
      hq: { value: "Belgium 🇧🇪" },
      countries: { value: "50+", note: "Operating across 50+ markets" },
      brands: { value: "500+", note: "Including Budweiser, Stella Artois, Corona, Michelob Ultra" },
    },
    whyMatters: "Beer is a volume + supply-chain + brand business at scale (200+ breweries, 150K staff). AI investment lands hardest in brewing/quality, supply-chain forecasting, B2B distributor productivity (BEES), and creative/marketing assistance.",
    quarterlyUpdate: {
      label: "Q1 2026 update",
      date: "30 April 2026",
      blurb: "Beat-and-rise. Op profit +7.9% c/n, more than double the analyst consensus. Volume soft (-2.2%) but margin expansion did the heavy lifting.",
      metrics: [
        { label: "Revenue", value: "+5.2% c/n", trend: "Above consensus" },
        { label: "Operating profit", value: "+7.9% c/n", trend: "More than 2x consensus" },
        { label: "EBITDA margin", value: "35.1%", trend: "+120bps YoY" },
        { label: "Volume", value: "-2.2%", trend: "Less severe than feared" },
        { label: "Premium U.S. (Mich Ultra)", value: "+3.1%", trend: "Premium tier outperforming" },
      ],
      reading: "Margin-led quarter. Premiumisation (Michelob Ultra, Corona Extra) and overhead discipline drove the beat despite volume softness. Watch the BEES platform commentary for any explicit AI productivity callout.",
      source: { label: "Reuters via Yahoo Finance — Q1 2026 results", url: "https://uk.finance.yahoo.com/news/brewer-ab-inbev-reports-q1-051433678.html" },
    },
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 3.5",
    rhetoric: 3,
    production: 4,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "Quiet but deep.",
      body: "AB InBev rarely centres AI on earnings calls but ships an unusual breadth of named production tools — Pluto7 brewing optimisation, BEES B2B AI, CatExpert.ai planogramming, Bevi/Avaamo customer service, DeepHow training. Classic Silent Builder profile.",
    },
    dedicatedSection: {
      headline: "Innovation hub, not a dedicated AI section.",
      body: "Reporting talks about 'technology and innovation' rather than carving out a dedicated AI chapter. The Beer Garage in Silicon Valley is the public-facing innovation surface.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>David Almeida</strong> · Chief Strategy &amp; Technology Officer (since Apr 2020). Bachelor's in Economics from UPenn; previously led the Anheuser-Busch / InBev integration in 2008. Reports into the Executive Committee. Strategy and tech in one seat is the Silent Builder org-design tell.",
      source: { label: "AB InBev — Our Leaders, David Almeida", url: "https://www.ab-inbev.com/our-leaders-david-almeida" },
    },
    appointmentsNote: "Fernando Tennenbaum holds CFO. Strategy + Tech are explicitly fused under Almeida — strong signal that AI/tech investment is treated as a strategic-finance lever, not a CIO-only function.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>K Filter optimisation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Pluto7 + Google Cloud</span> — AI managing turbidity and pressure on filters across breweries. Predictive maintenance + quality control.",
          source: { label: "Google Cloud customers — AB InBev / Pluto7", url: "https://cloud.google.com/customers/abinbev-pluto7" },
        },
        {
          html: "<strong>BEES platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal B2B</span> — AI-personalised B2B ordering platform for distributors / on-premise customers. The closest thing AB InBev has to a flagship AI product.",
          source: { label: "ConsumerGoods.com — touchless planning at AB InBev", url: "https://consumergoods.com/why-ab-inbevs-supply-chain-overhaul-focused-touchless-planning" },
        },
        {
          html: "<strong>CatExpert.ai</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Internal genetic-algorithm tool for retail planogram and category-management optimisation.",
          source: { label: "Manufacturing Leadership Council — AB InBev smart manufacturing", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
        },
        {
          html: "<strong>Bevi chatbot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Avaamo (WhatsApp)</span> — Conversational AI for B2B customer service in Brazil. 94% reduction in live-agent calls in target categories.",
          source: { label: "Manufacturing Leadership Council — AB InBev outcomes", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
        },
        {
          html: "<strong>DeepHow</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· DeepHow vendor</span> — AI-powered video SOP digitisation for staff training.",
          source: { label: "Manufacturing Leadership Council — AB InBev smart manufacturing", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
        },
        {
          html: "<strong>AnswerRocket</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· AnswerRocket vendor</span> — Generative-AI brand-decision insights for marketing and category teams.",
          source: { label: "Board of Innovation — GenAI in CPG innovation", url: "https://www.boardofinnovation.com/blog/the-role-of-generative-ai-in-your-innovation-process/" },
        },
        {
          html: "<strong>Smart Barley</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Data-analytics platform helping farmers improve yield while cutting water and fertiliser usage.",
          source: { label: "Manufacturing Leadership Council — AB InBev smart manufacturing", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Procurement:</strong> 40% reduction in new-material requests via AI-powered material-data governance. <strong>Manufacturing:</strong> 60% increase in barrelage per run on optimised lines. <strong>Customer service:</strong> 94% reduction in live-agent calls in targeted categories (Bevi/Avaamo). <strong>Sustainability:</strong> measurable yield improvement at reduced environmental impact (Smart Barley).",
      source: { label: "Manufacturing Leadership Council — AB InBev award-winning results", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
    },
    consumerFacing: "<strong>Indirect.</strong> The strongest consumer-facing surface is BEES on the B2B side (distributor / on-premise). Brand marketing uses AnswerRocket-driven generative insights, but no flagship consumer-facing GenAI product yet.",
    genAI: {
      mentioned: true,
      vendors: [
        { name: "Google Cloud (Pluto7)", url: "https://cloud.google.com/customers/abinbev-pluto7" },
        { name: "Avaamo", url: "https://avaamo.ai/" },
        { name: "DeepHow" },
        { name: "AnswerRocket", url: "https://answerrocket.com/" },
        { name: "o9 Solutions" },
        { name: "AI Singapore (Global GenAI Lab)", url: "https://www.klover.ai/anheuser-busch-ai-strategy-analysis-of-dominance-in-beverage/" },
      ],
      note: "Multi-vendor AI footprint, with Google Cloud as the most public partner. Microsoft Azure is also confirmed in the broader cloud footprint. Global GenAI Lab in Singapore (with AI Singapore) is the central R&D hub.",
    },
    stackTable: [
      { layer: "Brewing / IoT", product: "Pluto7 on Google Cloud", use: "K Filter optimisation (turbidity, pressure) + predictive maintenance", source: { label: "Google Cloud Customers — AB InBev / Pluto7", url: "https://cloud.google.com/customers/abinbev-pluto7" } },
      { layer: "B2B platform", product: "BEES", use: "AI-personalised B2B ordering for distributors / on-premise", source: { label: "ConsumerGoods.com — AB InBev touchless planning", url: "https://consumergoods.com/why-ab-inbevs-supply-chain-overhaul-focused-touchless-planning" } },
      { layer: "Customer service", product: "Bevi (Avaamo)", use: "WhatsApp conversational AI in Brazil; 94% reduction in live agent calls", source: { label: "Manufacturing Leadership Council — AB InBev results", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" } },
      { layer: "Marketing intelligence", product: "AnswerRocket", use: "GenAI brand-decision insights for marketing teams", source: { label: "Board of Innovation — GenAI in CPG", url: "https://www.boardofinnovation.com/blog/the-role-of-generative-ai-in-your-innovation-process/" } },
      { layer: "Training / SOPs", product: "DeepHow", use: "AI-powered video SOP digitisation", source: { label: "Manufacturing Leadership Council — AB InBev smart manufacturing", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" } },
      { layer: "Supply chain planning", product: "o9 Solutions", use: "Demand planning + touchless supply-chain orchestration", source: { label: "ConsumerGoods.com — touchless planning at AB InBev", url: "https://consumergoods.com/why-ab-inbevs-supply-chain-overhaul-focused-touchless-planning" } },
      { layer: "Sustainability / agri", product: "Smart Barley", use: "Yield prediction + water/fertiliser efficiency for barley farmers", source: { label: "Manufacturing Leadership Council — Smart Barley", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" } },
      { layer: "GenAI lab", product: "Global GenAI Lab Singapore", use: "Central R&D hub with AI Singapore partnership", source: { label: "Klover.AI — AB InBev AI strategy", url: "https://www.klover.ai/anheuser-busch-ai-strategy-analysis-of-dominance-in-beverage/" } },
      { layer: "BI / reporting", product: "Azure Synapse Analytics + Power BI", use: "Automated data pipelines for GCC Command Center reporting; 91% reduction in data refresh times vs Excel", source: { label: "Microsoft Customer Story — AB InBev GCC Azure Synapse", url: "https://www.microsoft.com/en/customers/story/1513234381485102673-abinbev-professionalservices" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Google Cloud — Pluto7 brewing optimisation",
        status: "confirmed",
        caseStudy: { label: "Google Cloud Customers — AB InBev / Pluto7", url: "https://cloud.google.com/customers/abinbev-pluto7" },
        note: "K Filter optimisation (turbidity + pressure) across 200+ breweries. Pluto7 is the named delivery partner on Google Cloud.",
      },
      {
        name: "AI Singapore — Global GenAI Lab",
        status: "confirmed",
        caseStudy: { label: "Klover.AI — AB InBev AI strategy analysis", url: "https://www.klover.ai/anheuser-busch-ai-strategy-analysis-of-dominance-in-beverage/" },
        note: "Central R&D hub set up with public-sector AI Singapore as the foundation-model partner.",
      },
      { name: "Microsoft Azure", status: "confirmed" },
      { name: "Avaamo (Bevi conversational AI)", status: "confirmed" },
      { name: "AnswerRocket (GenAI insights)", status: "confirmed" },
      { name: "DeepHow (AI video SOPs)", status: "confirmed" },
      { name: "o9 Solutions (planning)", status: "confirmed" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Unusually wide named-partner footprint vs peers. Google Cloud is the most publicly cited hyperscaler (Pluto7 customer story). Microsoft Azure is in the broader stack but less publicly tied. Anthropic, AWS, OpenAI-direct, Mistral not publicly tied to AB InBev AI initiatives.",
  },
  byMaison: {
    maisons: [
      { brand: "Stella Artois", description: "AI + fine art partnership: 'Algorithmic Provenance' campaign uses ML to authenticate brand heritage. Pioneered AI-as-creative-asset for the brand.", source: { label: "Contagious — Stella Artois algorithms & fine art", url: "https://www.contagious.com/en/article/news-and-views/stella-artois-combines-algorithms-and-fine-art-to-prove-its-provenance" } },
      { brand: "Budweiser", description: "UninterruptAds (Brazil): turns 500+ Spotify tracks that mention 'Budweiser' into targeted audio ads via Africa Creative + GenAI. Plus World Cup conversational-AI bottle avatars.", source: { label: "Marketing Dive — Budweiser UninterruptAds on Spotify", url: "https://www.marketingdive.com/news/budweiser-song-mention-audio-ads-spotify-users-brazil-campaign/715224/" } },
      { brand: "Beck's", description: "AI-generated 'futuristic' beer recipe and packaging — first commercially-produced beer with both recipe and label generated by AI.", source: { label: "Food Dive — Beck's AI-made futuristic beer", url: "https://www.fooddive.com/news/ab-inbevs-becks-makes-futuristic-beer-using-artificial-intelligence/647388/" } },
      { brand: "Corona / Michelob Ultra", description: "Premiumisation tier driving Q1 2026 outperformance (+3.1% premium U.S. volume). AI work tilts toward demand-sensing + creative content; no flagship campaign yet.", source: { label: "Reuters — AB InBev Q1 2026 premium tier", url: "https://uk.finance.yahoo.com/news/brewer-ab-inbev-reports-q1-051433678.html" } },
    ],
    note: "AB InBev's brand-level AI footprint is strongest in marketing/creative (Stella Artois, Budweiser, Beck's). Operations-grade AI lives at Group level (Pluto7, BEES, o9, AnswerRocket).",
  },
  rachelNotes: [
    {
      lead: "Quick take.",
      body: "FY2025: revenue $59.3B (+2%), normalized EBIT +7.0%, EBITDA margin 35.8% (+101bps). Q1 2026 (30 Apr): revenue +5.2% c/n, op profit +7.9%, EBITDA margin 35.1% (+120bps). Margin engine doing the work; volume still soft (-2.2% in Q1).",
    },
    {
      lead: "AI posture.",
      body: "Classic Silent Builder. Broader named-tool footprint than most CPG peers but barely talks about AI on earnings calls. The breadth (Pluto7, BEES, CatExpert.ai, Bevi, DeepHow, AnswerRocket, Smart Barley) is unusual — most peers ship 1-2 named tools.",
    },
    {
      lead: "Vendor footprint.",
      body: "Google Cloud is the most publicly cited AI partner (the Pluto7 case study is featured by GCP). Microsoft Azure is in the stack but less publicly tied. Anthropic and AWS are not present in public materials. The Beer Garage innovation hub is the disclosed external-innovation channel.",
    },
    {
      lead: "Open loop.",
      body: "Q1 2026 is in: +5.2% c/n revenue, +7.9% OP. Watch for H1 2026 (late July) commentary on BEES AI platform explicitly. The ConsumerGoods.com touchless-planning case is worth pulling for any CPG supply-chain comparison.",
    },
  ],
  sources: [
    { label: "AB InBev — FY2025 results press release (12 Feb 2026)", url: "https://www.businesswire.com/news/home/20260211688662/en/AB-InBev-Reports-Full-Year-and-Fourth-Quarter-2025-Results" },
    { label: "AB InBev — 2025 Annual Report", url: "https://www.ab-inbev.com/news-media/news-stories/ab-in-bev-2025-annual-report" },
    { label: "Reuters via Yahoo — Q1 2026 results (30 Apr)", url: "https://uk.finance.yahoo.com/news/brewer-ab-inbev-reports-q1-051433678.html" },
    { label: "Google Cloud Customers — AB InBev / Pluto7 (K Filter)", url: "https://cloud.google.com/customers/abinbev-pluto7" },
    { label: "Manufacturing Leadership Council — AB InBev smart manufacturing", url: "https://manufacturingleadershipcouncil.com/ab-inbev-uses-smart-manufacturing-for-award-winning-results-32530/" },
    { label: "ConsumerGoods.com — AB InBev touchless planning (o9)", url: "https://consumergoods.com/why-ab-inbevs-supply-chain-overhaul-focused-touchless-planning" },
    { label: "Board of Innovation — GenAI in CPG innovation", url: "https://www.boardofinnovation.com/blog/the-role-of-generative-ai-in-your-innovation-process/" },
    { label: "AB InBev — Our Leaders: David Almeida", url: "https://www.ab-inbev.com/our-leaders-david-almeida" },
    { label: "AB InBev — Almeida 2023 Strategy transcript (CST&O)", url: "https://www.ab-inbev.com/assets/presentations/2023/2.%20Chief%20Strategy%20&%20Technology%20Officer%20_David%20Almeida_day%201_Reground%20on%20Strategy_transcript.pdf" },
    { label: "AB InBev — Investor Results Center", url: "https://www.ab-inbev.com/investors/results-center" },
    { label: "Microsoft Customer Story — AB InBev GCC Azure Synapse Analytics", url: "https://www.microsoft.com/en/customers/story/1513234381485102673-abinbev-professionalservices" },
  ],
  furtherReading: [
    { label: "Klover.AI — AB InBev consumer profile", url: "https://klover.ai/" },
    { label: "AB InBev — Annual & Half-Year reports", url: "https://www.ab-inbev.com/investors/annual-and-half-year-reports" },
  ],
  askPrompts: [
    "What did AB InBev report in Q1 2026?",
    "Which AI tools is AB InBev actually running in production?",
    "What does Pluto7 do for AB InBev brewing?",
    "How does the BEES platform use AI?",
    "Who is David Almeida and what is the Chief Strategy & Technology Officer role?",
  ],
};

// =============================================================================
// Ahold Delhaize — FY2025 baseline, Q4 2025 reported 11 Feb 2026
// =============================================================================
export const ahold_delhaize_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-11" },
    lastReported: { label: "Q4 / FY2025 results", date: "2026-02-11" },
    next: { label: "Q1 2026 results", date: "Mid-May 2026" },
    blurb: "FY2025 results published 11 Feb 2026. Q1 2026 lands mid-May. H1 results late July. Reporting cadence is Q4-anchored (Q4 = the FY release).",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€92.4B", reported: "+0.9%", organic: "+6.1% c/n", note: "FY2025" },
      opMargin: {
        value: "4.0%",
        growth: { absolute: "~€3.7B", basis: "Underlying op income FY2025; Q4 underlying margin 4.2% (+0.1pp YoY c/n)", estimated: true },
        note: "Underlying basis",
      },
      employees: { value: "414K" },
    },
    operatingComplexity: {
      hq: { value: "Netherlands 🇳🇱" },
      countries: { value: "11", note: "Albert Heijn (NL), Delhaize (BE), Stop & Shop / Food Lion / Hannaford (US), Bol, plus CEE" },
      brands: { value: "20+ banners", note: "Food + non-food + bol marketplace" },
      stores: { value: "~7,800" },
    },
    whyMatters: "Largest employer on the watchlist (414K) and the largest grocery network on the European side. AI investment lands hardest in personalised pricing, e-commerce / Bol marketplace, supply-chain demand sensing, and store-level workforce optimisation.",
    quarterlyUpdate: {
      label: "Q4 / FY2025 update",
      date: "11 February 2026",
      blurb: "FY2025 in line with guidance. Q4 IFRS op margin 3.8%, underlying 4.2%. Bol introduced two new AI features (Spot & Shop image search). Management called out 'AI-enabled services' in omnichannel.",
      metrics: [
        { label: "FY2025 net sales", value: "€92.4B", trend: "+0.9% (actual FX)" },
        { label: "Underlying OP margin", value: "4.0%", trend: "FY2025" },
        { label: "Q4 IFRS OP", value: "€899M", trend: "Margin 3.8%" },
        { label: "Q4 underlying OP margin", value: "4.2%", trend: "+0.1pp c/n" },
        { label: "Diluted underlying EPS", value: "€2.67", trend: "FY2025" },
      ],
      reading: "Solid execution against guidance. The interesting AI signal is Bol's Spot & Shop launch (visual product search) and the explicit risk-factor language about 'disruption from developments in artificial intelligence' — Ahold is starting to surface AI in formal investor materials.",
      source: { label: "Ahold Delhaize newsroom — Q4/FY2025 results", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-reports-strong-q4-2025-financial-results-priorities-and-outlook-for-2026-underpin-our-value-creation-and-progress-towards-our-growing-together-ambitions/" },
    },
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 3.0",
    rhetoric: 3,
    production: 3,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "Tech-led, AI emerging.",
      body: "Ahold has a strong digital DNA (Albert Heijn online, Bol marketplace) and is now layering AI features on top. The 2025 annual report explicitly flags AI risk in forward-looking statements — early signal that the board treats AI as a board-level topic.",
    },
    dedicatedSection: {
      headline: "AI surfaced in risk factors and omnichannel narrative.",
      body: "No standalone AI investor-relations chapter yet, but management explicitly mentioned 'ongoing investments in technology and AI' in the Q4/FY2025 release. Bol's Spot & Shop is the cleanest consumer-facing AI feature shipping today.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Jan Brecht</strong> · Group Chief Technology Officer and Executive Committee member (effective 26 Sep 2025). Previously Chief Digital Information Officer at Nissan, CIO at Mercedes-Benz Group, and CIO at Adidas. Reports into the Executive Committee — first time Ahold Delhaize has put a CTO on the ExCo.",
      source: { label: "Ahold Delhaize — Jan Brecht CTO appointment", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-appoints-jan-brecht-as-chief-technology-officer-and-member-of-the-executive-committee-succeeding-ben-wishart/" },
    },
    sectorAppointments: [
      { html: "<strong>Ann Dozier</strong> · CIO, Ahold Delhaize USA (joined 17 Feb 2025). Previously CIO at Southern Glazer's Wine and Spirits; long career across Coca-Cola, Coca-Cola Enterprises, Dean Foods, Colgate-Palmolive." },
    ],
    appointmentsNote: "Two senior tech appointments in 2025 — Brecht at Group CTO and Dozier at USA CIO — is a clear escalation signal. Brecht's Adidas / Mercedes / Nissan résumé means deep manufacturing-grade IT plus retail/digital experience.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>My AH Assistant + Steijn chatbot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Azure OpenAI + EPAM</span> — Conversational GenAI in the Albert Heijn app covering 20K+ recipes, food-waste advice, and healthy eating. Steijn also handles store-employee back-end queries.",
          source: { label: "Microsoft Customer Story — Albert Heijn Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/1739352737304784739-albertheijn-azure-open-ai-service-retailers-en-netherlands" },
        },
        {
          html: "<strong>Scan &amp; Kook</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Azure OpenAI + AI Vision</span> — Photo-to-recipe feature in AH app: photograph leftover ingredients, get a personalised recipe. Reduces household food waste.",
          source: { label: "ESM Magazine — Albert Heijn Scan & Kook GenAI feature", url: "https://www.esmmagazine.com/technology/albert-heijn-adds-new-gen-ai-based-feature-scan-kook-to-its-app-267573" },
        },
        {
          html: "<strong>Bol Spot &amp; Shop</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Bol marketplace</span> — Visual product search: upload a photo, get matched products. Consumer-facing GenAI surface surfaced in formal investor materials.",
          source: { label: "Ahold Delhaize — Q4/FY2025 results announcement", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-reports-strong-q4-2025-financial-results-priorities-and-outlook-for-2026-underpin-our-value-creation-and-progress-towards-our-growing-together-ambitions/" },
        },
        {
          html: "<strong>Marty in-store robots</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Stop &amp; Shop</span> — 200+ shelf-scanning AI robots across Stop & Shop locations (MA, CT, RI, NJ, NY). Detect out-of-stocks and price discrepancies.",
          source: { label: "The Counter — Stop & Shop Marty robots", url: "https://thecounter.org/supermarket-robot-automation-ai-organized-labor-stop-and-shop/" },
        },
        {
          html: "<strong>Flybuy AI curbside</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Flybuy · all U.S. banners</span> — Location-aware AI for curbside pickup. Rolled out to 1,100+ Food Lion stores; now live across all six U.S. Ahold Delhaize chains.",
          source: { label: "Ecommerce North America — Food Lion AI curbside pickup", url: "https://www.ecommercenorthamerica.org/2025/07/10/food-lion-ai-curbside-pickup/" },
        },
      ],
    },
    consumerFacing: "<strong>Yes, deep.</strong> Albert Heijn ships the deepest stack on the watchlist: My AH Assistant (GenAI), Scan & Kook (image-to-recipe), Steijn chatbot (20K+ recipes). Bol's Spot & Shop adds visual product search. Stop & Shop / Food Lion in the U.S. follow with Marty robots and Flybuy curbside.",
    genAI: {
      mentioned: true,
      vendors: [
        { name: "Microsoft Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/24372-koninklijke-ahold-delhaize-azure-openai" },
        { name: "EPAM (My AH Assistant build partner)", url: "https://www.epam.com/services/client-work/smarter-store-operations-powered-by-ai" },
        { name: "Flybuy (curbside AI, all U.S. banners)", url: "https://www.ecommercenorthamerica.org/2025/07/10/food-lion-ai-curbside-pickup/" },
        { name: "Google Cloud (Retail AI)" },
      ],
      note: "Microsoft Azure OpenAI is the dominant GenAI partner (Albert Heijn customer story). EPAM partnered on the My AH virtual assistant build. Flybuy now fully integrated across all Ahold Delhaize USA banners (Stop & Shop, Food Lion, Giant Food, Hannaford, The Giant Company).",
    },
    stackTable: [
      { layer: "GenAI (consumer)", product: "My AH Assistant + Steijn chatbot", use: "Personal recipe + cooking assistant in the AH app (20K+ recipes)", source: { label: "ESM Magazine — Albert Heijn introduces Steijn chatbot", url: "https://www.esmmagazine.com/technology/albert-heijn-introduces-chatbot-assistant-steijn-in-my-ah-app-286981" } },
      { layer: "GenAI (consumer)", product: "Scan & Kook", use: "Photo-to-recipe in AH app; reduces food waste by repurposing leftovers", source: { label: "ESM Magazine — Albert Heijn Scan & Kook GenAI feature", url: "https://www.esmmagazine.com/technology/albert-heijn-adds-new-gen-ai-based-feature-scan-kook-to-its-app-267573" } },
      { layer: "GenAI (consumer)", product: "Bol Spot & Shop", use: "Visual product search on Bol marketplace", source: { label: "Ahold Delhaize — Q4/FY2025 results announcement", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-reports-strong-q4-2025-financial-results-priorities-and-outlook-for-2026-underpin-our-value-creation-and-progress-towards-our-growing-together-ambitions/" } },
      { layer: "Cloud + GenAI", product: "Microsoft Azure OpenAI + AI Vision + AKS", use: "Foundation for Albert Heijn's GenAI features (food waste, healthy eating)", source: { label: "Microsoft Customer Story — Albert Heijn Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/1739352737304784739-albertheijn-azure-open-ai-service-retailers-en-netherlands" } },
      { layer: "Store ops", product: "Marty (in-store robots)", use: "200+ shelf-scanning AI robots in Stop & Shop locations", source: { label: "The Counter — Stop & Shop AI robots", url: "https://thecounter.org/supermarket-robot-automation-ai-organized-labor-stop-and-shop/" } },
      { layer: "Curbside / fulfilment", product: "Flybuy AI", use: "Location-aware curbside pickup; 1,100+ Food Lion stores plus all U.S. banners", source: { label: "Ecommerce North America — Food Lion Flybuy rollout", url: "https://www.ecommercenorthamerica.org/2025/07/10/food-lion-ai-curbside-pickup/" } },
      { layer: "Employee experience", product: "EPAM-built Azure assistant", use: "AI virtual assistant for store employees (back-end-connected)", source: { label: "EPAM — Smarter Store Operations Powered by AI", url: "https://www.epam.com/services/client-work/smarter-store-operations-powered-by-ai" } },
      { layer: "Recommendations (real-time)", product: "Google Cloud Vertex AI + BigTable", use: "Real-time user embeddings for bol.com — 13M+ customers, 40M products, sub-second recommendations", source: { label: "Ahold Delhaize — 2025 MLOps conference recap", url: "https://newsroom.aholddelhaize.com/accelerating-ai-innovation-at-ahold-delhaizes-2025-machine-learning-operations-conference/" } },
      { layer: "Developer productivity", product: "GitHub Copilot", use: "AI pair programming across 800+ repositories for Ahold Delhaize USA engineering (cloud-native to AI-native initiative)", source: { label: "Microsoft Customer Story — Ahold Delhaize USA modernization", url: "https://www.microsoft.com/en/customers/story/25672-ahold-delhaize-usa-azure" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Azure OpenAI flagship at Albert Heijn",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Albert Heijn Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/1739352737304784739-albertheijn-azure-open-ai-service-retailers-en-netherlands" },
        note: "Foundation for My AH Assistant, Scan & Kook, and Steijn chatbot. Combines Azure OpenAI + AI Vision + AKS. Drives the food-waste-by-50%-by-2030 strategy.",
      },
      {
        name: "Microsoft — Albert Heijn store-employee assistant",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Albert Heijn store ops Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/24372-koninklijke-ahold-delhaize-azure-openai" },
        note: "Second flagship Microsoft customer story: AI virtual assistant for in-store employees, built with EPAM.",
      },
      {
        name: "EPAM — build partner for the My AH Assistant",
        status: "confirmed",
        caseStudy: { label: "EPAM — Smarter Store Operations Powered by AI", url: "https://www.epam.com/services/client-work/smarter-store-operations-powered-by-ai" },
        note: "Workshops + persona dev + low-fi prototypes through to MVP that connects back-end systems on Azure.",
      },
      { name: "Flybuy (curbside AI, all U.S. banners)", status: "confirmed" },
      {
        name: "Google Cloud — Vertex AI + BigTable for bol.com",
        status: "confirmed",
        caseStudy: { label: "Ahold Delhaize 2025 MLOps conference — bol Vertex AI", url: "https://newsroom.aholddelhaize.com/accelerating-ai-innovation-at-ahold-delhaizes-2025-machine-learning-operations-conference/" },
        note: "Real-time user embeddings via BigTable for 13M+ customers and 40M products on bol.com. Confirmed at Ahold's 2025 internal MLOps conference.",
      },
      { name: "Harmonya (AI product data enrichment) + Protex AI (computer-vision safety)", status: "confirmed" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft is the deepest public partner — three flagship customer stories (Albert Heijn consumer GenAI, store employee assistant, USA GitHub Copilot). Google Cloud confirmed via bol Vertex AI + BigTable. EPAM is the build partner. Anthropic, OpenAI-direct, Mistral, AWS not publicly tied to Ahold AI work.",
  },
  byMaison: {
    maisons: [
      { brand: "Albert Heijn (NL)", description: "Deepest banner-level AI on the watchlist. My AH Assistant (GenAI), Scan & Kook (photo-to-recipe), Steijn chatbot (20K+ recipes), all built on Microsoft Azure OpenAI. Drives the food-waste reduction strategy.", source: { label: "Microsoft Customer Story — Albert Heijn Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/1739352737304784739-albertheijn-azure-open-ai-service-retailers-en-netherlands" } },
      { brand: "Bol", description: "Spot & Shop visual product search launched 2025. First publicly-named Ahold Delhaize consumer GenAI product surfaced in formal investor materials.", source: { label: "Ahold Delhaize — Q4/FY2025 results", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-reports-strong-q4-2025-financial-results-priorities-and-outlook-for-2026-underpin-our-value-creation-and-progress-towards-our-growing-together-ambitions/" } },
      { brand: "Stop & Shop", description: "200+ Marty in-store robots scan shelves for out-of-stocks and price discrepancies. Operates across MA / CT / RI / NJ / NY.", source: { label: "The Counter — Stop & Shop Marty robots", url: "https://thecounter.org/supermarket-robot-automation-ai-organized-labor-stop-and-shop/" } },
      { brand: "Food Lion", description: "Flybuy AI rolled out to 1,100+ stores for curbside pickup. Loyalty program personalisation also leans on AI. Now integrated alongside all Ahold Delhaize USA banners.", source: { label: "Ecommerce North America — Food Lion AI curbside pickup", url: "https://www.ecommercenorthamerica.org/2025/07/10/food-lion-ai-curbside-pickup/" } },
      { brand: "Giant Food / Hannaford", description: "Both fully integrated with Flybuy AI for curbside, plus the AI-driven food-ordering revamp announced for all six U.S. Ahold Delhaize chains.", source: { label: "ACM — Food Lion + sister chains AI for food suppliers", url: "https://cacmb4.acm.org/news/235890-food-lion-other-grocers-will-se-ai-for-food-suppliers/fulltext" } },
    ],
    note: "Banner-level AI strongest at Albert Heijn (consumer GenAI) and Stop & Shop (in-store robotics). U.S. side is converging on Flybuy + Microsoft for omnichannel.",
  },
  rachelNotes: [
    {
      lead: "Quick take.",
      body: "FY2025: net sales €92.4B (+0.9% actual, +6.1% c/n), underlying OP margin 4.0%, underlying OP ~€3.7B, EPS €2.67. Q4 IFRS op margin 3.8%, underlying 4.2%. Largest employer on the watchlist (414K).",
    },
    {
      lead: "AI posture.",
      body: "Two senior tech hires in 2025 (Brecht to Group CTO ExCo, Dozier to USA CIO) is the escalation signal. Bol Spot & Shop is the first named consumer-facing AI feature. Management now flags AI in formal investor materials. Moving from latent Silent Builder to a publicly-shaping posture.",
    },
    {
      lead: "Vendor footprint.",
      body: "Google Cloud Retail AI is the most publicly cited partnership. Microsoft Azure runs alongside. The new digital lead arrived from automotive, where MES-style supply-chain AI is standard. No GenAI vendor is disclosed yet.",
    },
    {
      lead: "Open loop.",
      body: "Confirm whether Q1 2026 release (mid-May) introduces any new named AI tool or expands the Bol surface. Ann Dozier's first 12 months at USA CIO will set the U.S. AI agenda — track for Microsoft / Google customer-story drops.",
    },
  ],
  sources: [
    { label: "Ahold Delhaize — Q4/FY2025 results press release (11 Feb 2026)", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-reports-strong-q4-2025-financial-results-priorities-and-outlook-for-2026-underpin-our-value-creation-and-progress-towards-our-growing-together-ambitions/" },
    { label: "Ahold Delhaize — Annual Report 2025", url: "https://aholddelhaize.com/investors/annual-reports/2025/" },
    { label: "Ahold Delhaize — Jan Brecht CTO appointment", url: "https://newsroom.aholddelhaize.com/ahold-delhaize-appoints-jan-brecht-as-chief-technology-officer-and-member-of-the-executive-committee-succeeding-ben-wishart/" },
    { label: "Ahold Delhaize USA — Ann Dozier named CIO", url: "https://aholddelhaizeusa.gcs-web.com/news-releases/news-release-details/ahold-delhaize-usa-announces-ann-dozier-chief-information" },
    { label: "Progressive Grocer — Ahold Delhaize annual report value creation", url: "https://progressivegrocer.com/ahold-delhaizes-annual-report-reflects-progress-value-creation" },
    { label: "Chain Store Age — Ahold Delhaize USA new CIO", url: "https://chainstoreage.com/ahold-delhaize-usa-names-new-cio" },
    { label: "Ahold Delhaize — Investors hub (current results, presentations)", url: "https://aholddelhaize.com/investors/" },
    { label: "Ahold Delhaize — Leadership page", url: "https://aholddelhaize.com/about/leadership/" },
  ],
  askPrompts: [
    "What did Ahold Delhaize report for FY2025?",
    "What is Bol's Spot & Shop and how does it use AI?",
    "Who is Jan Brecht and why does Ahold's first ExCo CTO appointment matter?",
    "How does Albert Heijn use AI in pricing and promotions?",
  ],
};

// =============================================================================
// Arla Foods — FY2025 baseline, record year (revenue €15.1B)
// =============================================================================
export const arla_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-18" },
    lastReported: { label: "FY2025 annual results", date: "2026-02-18" },
    next: { label: "H1 2026 interim", date: "Mid-August 2026" },
    blurb: "FY2025 annual published 18 Feb 2026 (record €15.1B revenue, +9.4%). H1 2026 interim in mid-August. Cooperative reports half-yearly, not quarterly.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€15.1B", reported: "+9.4%", note: "FY2025 record" },
      opMargin: {
        value: "~2.7%",
        growth: { absolute: "Net profit €415M", basis: "Cooperative model: 'performance price' 56.4 EUR-cent/kg is the more relevant KPI than a corporate OP margin", estimated: true },
        note: "Performance price 56.4 EUR-c/kg",
      },
      employees: { value: "22K" },
    },
    operatingComplexity: {
      hq: { value: "Denmark 🇩🇰" },
      countries: { value: "100+", note: "Sales presence" },
      brands: { value: "5", note: "Arla, Lurpak, Castello, Puck, Starbucks (licence)" },
    },
    whyMatters: "Cooperative dairy is a milk-supply optimisation problem at heart (10,300 farmer-owners, 1.5M cows, 14.3B kg milk intake in 2025). AI investment lands hardest in milk-yield prediction, supply-chain forecasting, ingredients (AFI) value-add, and creative/recipe content for branded.",
    quarterlyUpdate: {
      label: "FY2025 update",
      date: "18 February 2026",
      blurb: "Record revenue €15.1B (+9.4%). Branded +6.9%. Arla Foods Ingredients (AFI) the standout: +43.1% to €1,452M. Net profit €415M.",
      metrics: [
        { label: "Group revenue", value: "€15.1B", trend: "+9.4% (record)" },
        { label: "Branded revenue", value: "€7,029M", trend: "+6.9%" },
        { label: "AFI revenue", value: "€1,452M", trend: "+43.1%" },
        { label: "Net profit", value: "€415M", trend: "FY2025" },
        { label: "Performance price", value: "56.4 EUR-c/kg", trend: "FY2025" },
        { label: "FY2026 revenue guide", value: "€13.3-14.1B", trend: "Lower vs 2025 highs" },
      ],
      reading: "Record year on volume + commodity-price tailwinds in H1; H2 normalised. AFI's +43% is the structural growth story (whey/protein demand). Lower 2026 guide reflects commodity normalisation, not weakness.",
      source: { label: "Arla Foods — strong results in record year", url: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/" },
    },
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 3.0",
    rhetoric: 2,
    production: 3,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "Cooperative quietly building.",
      body: "Arla rarely fronts AI in press, but has shipped a string of named Microsoft Azure / Azure OpenAI use cases over 2019-2024 (milk-yield prediction, recipe generation, data centralisation). Classic Silent Builder profile dressed in cooperative-reporting language.",
    },
    dedicatedSection: {
      headline: "No dedicated AI investor section.",
      body: "Cooperative reporting structure prioritises performance price to farmer-owners over equity-investor narratives. AI mentions live inside sustainability and operations sections, not a dedicated chapter.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Mia Heslegrave</strong> · Chief Information Officer (since 1 Feb 2025). Background in IT consultancy at Accenture, then Head of IT Solutions internally at Arla. Reports up through CFO/EVP Finance, Legal, IT &amp; Strategy <strong>Torben Dahl Nyholm</strong>.",
      source: { label: "Arla — Leadership change in IT (Heslegrave appointment)", url: "https://www.arla.com/company/news-and-press/2025/pressrelease/leadership-change-in-arlas-it-organisation/" },
    },
    appointmentsNote: "IT sits under the CFO bundle (Finance + Legal + IT + Strategy) — typical cooperative structure. No dedicated CTO or CAIO role; Heslegrave's CIO seat is the AI / tech leadership lens.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Milk-yield prediction AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure</span> — AI estimates milk output for 1.5M cows across 10,300 farmers. 1.4% more accurate than the previous system; ~440M pounds of milk annually used more efficiently.",
          source: { label: "Food Dive — Arla AI milk projections", url: "https://www.fooddive.com/news/arla-foods-uses-ai-to-steer-milk-projections/556773/" },
        },
        {
          html: "<strong>Azure OpenAI for recipes</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure OpenAI Service</span> — GenAI surfacing relevant recipes from Arla Sweden's ~6,500-recipe online database; editorial copilot for human chefs.",
          source: { label: "Microsoft Customer Stories — Arla Foods Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service" },
        },
        {
          html: "<strong>Centralised data foundation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure + Power BI</span> — Single Azure-based platform for non-SAP data, enabling self-service Power BI reporting and ML-driven analytics.",
          source: { label: "Microsoft Customer Stories — Arla data centralisation", url: "https://www.microsoft.com/en/customers/story/827449-arla-foods-consumer-goods-power-bi" },
        },
        {
          html: "<strong>GEO (Generative Engine Optimisation)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Azoma + CARAT</span> — Four-month pilot to optimise Arla brand visibility in AI answer engines (ChatGPT, Perplexity, Google AI Overviews). Tracks share-of-voice in AI-generated answers, not traditional search clicks.",
          source: { label: "The Grocer — Arla and Mars pilot GEO platform (Azoma)", url: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Milk-yield prediction:</strong> 1.4% accuracy improvement over the previous system; ~440M pounds of milk annually used more efficiently and sustainably. Single concrete public ROI figure on Arla AI.",
      source: { label: "Food Ingredients First — Arla AI milk prediction", url: "https://www.foodingredientsfirst.com/news/dairy-tech-arla-foods-new-ai-tool-predicts-how-much-milk-15m-cows-can-produce.html" },
    },
    consumerFacing: "<strong>Lightly.</strong> Azure OpenAI-powered recipe surfacing on Arla.se is the most consumer-visible AI feature; primarily an editorial copilot, not a flagship GenAI product.",
    genAI: {
      mentioned: true,
      vendors: [
        { name: "Microsoft Azure OpenAI Service", url: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service" },
        { name: "Azoma (GEO/AI search visibility)", url: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article" },
      ],
      note: "Microsoft is the dominant cloud + GenAI partner. Arla is also among the first FMCG brands piloting Generative Engine Optimisation (GEO) with Azoma to track brand presence in AI answer engines.",
    },
    stackTable: [
      { layer: "Agri / forecasting", product: "Milk-yield prediction AI", use: "Estimates output for 1.5M cows / 10,300 farmers; 1.4% accuracy lift, 440M lbs/yr efficiency", source: { label: "Food Dive — Arla AI milk projections", url: "https://www.fooddive.com/news/arla-foods-uses-ai-to-steer-milk-projections/556773/" } },
      { layer: "GenAI (consumer)", product: "Azure OpenAI for recipes (Arla.se)", use: "Surfaces relevant recipes from ~6,500 chef-made library; editorial copilot", source: { label: "Microsoft Customer Story — Arla Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service" } },
      { layer: "Cloud + analytics", product: "Microsoft Azure + Power BI", use: "Centralised non-SAP data foundation; self-service analytics + ML", source: { label: "Microsoft Customer Story — Arla data centralisation", url: "https://www.microsoft.com/en/customers/story/827449-arla-foods-consumer-goods-power-bi" } },
      { layer: "AI search visibility", product: "GEO pilot (Azoma + CARAT)", use: "Brand share-of-voice tracking and optimisation in ChatGPT, Perplexity, Google AI Overviews", source: { label: "The Grocer — Arla + Mars GEO pilot", url: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Azure OpenAI for recipes (Arla.se)",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Arla Foods Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service" },
        note: "GenAI surfaces ~6,500 chef-made recipes; editorial copilot for Arla's content team in Sweden.",
      },
      {
        name: "Microsoft — Azure data foundation",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Arla data centralisation in Azure", url: "https://customers.microsoft.com/en-us/story/827449-arla-foods-consumer-goods-power-bi" },
        note: "Centralised non-SAP data in Azure with Power BI for self-service analytics across the cooperative.",
      },
      { name: "Power BI (analytics layer)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Two flagship Microsoft customer stories anchor Arla's vendor stack. No public Google Cloud, AWS, OpenAI-direct, Anthropic, or Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Arla", description: "Master dairy brand: milk, yoghurt, butter, cheese." },
      { brand: "Lurpak", description: "Premium butter / dairy spread." },
      { brand: "Castello", description: "Speciality cheeses." },
      { brand: "Puck", description: "Cream cheese / processed cheese (MENA)." },
      { brand: "Starbucks", description: "Coffee-shop ready-to-drink (license)." },
    ],
    note: "Cooperative-owned brands; AFI (Ingredients) is the structural growth engine separate from branded consumer.",
  },
  rachelNotes: [
    {
      lead: "Quick take.",
      body: "Record FY2025: revenue €15.1B (+9.4%), branded €7.0B (+6.9%), AFI €1.45B (+43.1%), net profit €415M, performance price 56.4 EUR-c/kg. 2026 guide €13.3-14.1B (commodity normalisation, not weakness).",
    },
    {
      lead: "AI posture.",
      body: "Silent Builder. Three named Microsoft Azure use cases (milk prediction, Azure OpenAI recipes, data centralisation). 1.4% milk-yield accuracy lift is the single concrete public ROI figure. Cooperative reporting style means AI rarely fronts the press.",
    },
    {
      lead: "Vendor footprint.",
      body: "Microsoft is the embedded partner via Azure + OpenAI + Power BI. Google / AWS / Anthropic absent. Mia Heslegrave's first year as CIO (since Feb 2025) is worth tracking for any new vendor announcements; AFI's growth profile suggests potential AI investment in B2B ingredients sales/forecasting.",
    },
    {
      lead: "Open loop.",
      body: "Watch for any Microsoft customer-story expansion in 2026 (especially around AFI). Cooperative reporting cadence is half-yearly, so next data point is mid-August (H1 2026 interim).",
    },
  ],
  sources: [
    { label: "Arla — strong results in a record year (FY2025)", url: "https://www.arla.com/company/news-and-press/2026/pressrelease/arla-foods-posts-strong-results-in-a-record-year/" },
    { label: "Arla — Annual Reports hub", url: "https://www.arla.com/company/investor/annual-reports/" },
    { label: "Dairy Reporter — Arla 2025 record (ingredients-led)", url: "https://www.dairyreporter.com/Article/2026/02/18/arlas-record-2025-driven-by-ingredients-and-protein-demand/" },
    { label: "Microsoft Customer Stories — Arla Azure OpenAI (recipes)", url: "https://www.microsoft.com/en/customers/story/21768-arla-foods-azure-open-ai-service" },
    { label: "Microsoft Customer Stories — Arla data centralisation in Azure", url: "https://www.microsoft.com/en/customers/story/827449-arla-foods-consumer-goods-power-bi" },
    { label: "Food Dive — Arla AI for milk projections", url: "https://www.fooddive.com/news/arla-foods-uses-ai-to-steer-milk-projections/556773/" },
    { label: "Food Ingredients First — Arla milk-prediction AI", url: "https://www.foodingredientsfirst.com/news/dairy-tech-arla-foods-new-ai-tool-predicts-how-much-milk-15m-cows-can-produce.html" },
    { label: "Arla — Leadership change in IT organisation (Heslegrave)", url: "https://www.arla.com/company/news-and-press/2025/pressrelease/leadership-change-in-arlas-it-organisation/" },
    { label: "Arla — Management page", url: "https://www.arla.com/company/management/" },
    { label: "ESM Magazine — Arla full-year revenue growth", url: "https://www.esmmagazine.com/fresh-produce/arla-foods-posts-full-year-revenue-growth-amid-global-milk-supply-surge-306211" },
    { label: "The Grocer — Arla + Mars GEO pilot with Azoma", url: "https://www.thegrocer.co.uk/news/arla-and-mars-pilot-geo-platform-to-boost-brand-visibility-on-ai-answer-engines/709430.article" },
  ],
  askPrompts: [
    "What did Arla Foods report for FY2025?",
    "What is Arla's milk-yield AI tool and what is the measured ROI?",
    "How is Arla Sweden using Azure OpenAI for recipes?",
    "What is GEO and why is Arla piloting it with Azoma?",
  ],
};

// =============================================================================
// ASOS — H1 FY2026 reported 23 Apr 2026; flagship Microsoft 3-year AI deal
// =============================================================================
export const asos_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2025-11-12" },
    lastReported: { label: "H1 FY2026 interim (26w to 1 Mar 2026)", date: "2026-04-23" },
    next: { label: "FY2026 trading update", date: "Late July 2026" },
    blurb: "FY2025 (52w to Aug 2025) is the last full-year baseline. H1 FY2026 published 23 Apr 2026 (op loss narrowed by ~£109M, EBITDA +51%). FY2026 ends Aug 2026.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · H1 FY2026 reported",
    headline: {
      revenue: { value: "£1.11B (H1)", reported: "-14%", note: "GMV £1.17B (-9%) reflects deliberate stock action" },
      opMargin: {
        value: "loss-making",
        growth: { absolute: "Op loss £100.9M (vs £210.1M)", pct: "+£109.2M improvement", basis: "H1 FY2026 vs H1 FY2025; adj. EBITDA +51% to £64M" },
        note: "Gross margin +330bps",
      },
      employees: { value: "~2.5K" },
    },
    operatingComplexity: {
      hq: { value: "United Kingdom 🇬🇧" },
      countries: { value: "200+", note: "Global digital-only fashion" },
      brands: { value: "5", note: "ASOS, Topshop, Topman, Miss Selfridge, HIIT" },
    },
    whyMatters: "Pure-play digital fashion is a forecasting + personalisation + content problem at the core. ASOS ships ~3,500 new products a week to ~25M active customers. AI investment lands hardest in demand forecasting, personalisation (recommendations, fit), creative ops, and customer service.",
    quarterlyUpdate: {
      label: "H1 FY2026 update",
      date: "23 April 2026",
      blurb: "Profitability turnaround proof point. EBITDA +51%, op loss halved, gross margin +330bps. Revenue still down -14% as the stock-clearance reset continues.",
      metrics: [
        { label: "Revenue", value: "£1.11B", trend: "-14%" },
        { label: "GMV", value: "£1.17B", trend: "-9%" },
        { label: "Adj. EBITDA", value: "£64M", trend: "+51%" },
        { label: "Op loss", value: "£100.9M", trend: "+£109M better" },
        { label: "Profit per order", value: "+30%", trend: "Stock reset paying off" },
      ],
      reading: "Margin-led turnaround working. The Microsoft 3-year deal + Copilot rollout (90% of org, 35,000 hours saved) are the operational backbone of the cost story. Watch ERP migration to Microsoft Dynamics 365 (£67M legacy-asset impairment).",
      source: { label: "ASOS PLC — H1 FY26 interim results PDF", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" },
    },
  },
  aiPerception: {
    quadrant: "performer",
    label: "Performer · 4.0",
    rhetoric: 4,
    production: 4,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "AI as the cost story.",
      body: "ASOS has converted AI from rhetoric to a cost-takeout narrative. H1 FY26 explicitly cites AI for 35,000 saved hours and step-change app enhancements. The 3-year Microsoft deal is the cleanest hyperscaler partnership on the watchlist for a digital-pure-play.",
    },
    dedicatedSection: {
      headline: "AI fronts the operational-excellence chapter.",
      body: "Investor materials carry explicit AI commentary: Copilot adoption at 90% of org, AI Stylist customer chatbot, demand-forecasting AI/ML, and the Microsoft Dynamics 365 ERP migration.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Victoria Arden</strong> · Director of Technology Operations (named in the Microsoft customer-story announcement). Carries the operational-excellence narrative externally. Reports up through the technology org alongside <strong>Papinder Dosanjh</strong>, Director of AI and Machine Learning.",
      source: { label: "Microsoft UK Stories — ASOS x Microsoft 3-year AI collaboration", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
    },
    sectorAppointments: [
      { html: "<strong>Papinder Dosanjh</strong> · Director of AI and Machine Learning. Quoted in the Microsoft announcement on demand forecasting + ML transformation." },
    ],
    appointmentsNote: "Distinct AI/ML director seat plus a Tech Ops director who fronts vendor partnerships. Notably explicit AI leadership for a company of ASOS's size.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>AI Stylist</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Azure OpenAI</span> — Customer-facing AI chatbot for fashion recommendations, built on Azure OpenAI Service.",
          source: { label: "Microsoft UK Stories — ASOS AI Stylist", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        },
        {
          html: "<strong>GitHub Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft / GitHub</span> — In production since early 2023. Engineering productivity.",
          source: { label: "Microsoft UK Stories — ASOS Copilot rollout", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        },
        {
          html: "<strong>Microsoft 365 Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Rolled out to 90% of the organisation; 35,000 hours saved (H1 FY26 disclosure).",
          source: { label: "ASOS PLC — H1 FY26 interim results PDF", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" },
        },
        {
          html: "<strong>Power Automate + Teams Premium</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Process automation + AI meeting summaries / live translations.",
          source: { label: "Microsoft UK Stories — ASOS Power Automate", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        },
        {
          html: "<strong>Demand forecasting ML</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal ML</span> — Quoted by Papinder Dosanjh as a flagship internal AI use case; underpins the stock-reset story.",
          source: { label: "Microsoft UK Stories — Dosanjh quote on demand forecasting", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        },
        {
          html: "<strong>Sierra AI customer service agents</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Sierra</span> — ASOS signed with Sierra (ex-Salesforce co-CEO Bret Taylor's AI customer service platform, $10B valuation) to deploy AI agents across customer experience. Deal announced December 2025.",
          source: { label: "Retail Tech Innovation Hub — ASOS + Sierra AI customer service", url: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Engineering / productivity:</strong> 35,000 hours saved via M365 Copilot (90% adoption); AI agents now write ~15% of ASOS code. <strong>Operations:</strong> profit per order +30%. <strong>Inventory:</strong> stock levels -10%, gross margin +330bps. <strong>EBITDA:</strong> +51% YoY in H1 FY26.",
      source: { label: "ASOS PLC — H1 FY26 interim results PDF", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" },
    },
    consumerFacing: "<strong>Yes.</strong> AI Stylist chatbot is the cleanest consumer-facing AI feature, plus ~50 AI-powered enhancements in the ASOS app launched in H1 FY26.",
    genAI: {
      mentioned: true,
      vendors: [
        { name: "Microsoft Azure OpenAI Service", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
      ],
      note: "ASOS is one of the most aggressive M365 Copilot adopters on the watchlist (90% of org). Customer-facing AI Stylist runs on Azure OpenAI.",
    },
    stackTable: [
      { layer: "Hyperscaler + foundation model", product: "Microsoft Azure OpenAI", use: "AI Stylist consumer chatbot + internal GenAI workloads", source: { label: "Microsoft UK Stories — ASOS Azure OpenAI", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" } },
      { layer: "Engineering productivity", product: "GitHub Copilot", use: "AI pair programming since 2023", source: { label: "Microsoft UK Stories — ASOS GitHub Copilot", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" } },
      { layer: "Knowledge work", product: "Microsoft 365 Copilot", use: "90% of org; 35,000 hours saved (H1 FY26)", source: { label: "ASOS PLC — H1 FY26 interim results", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" } },
      { layer: "Process automation", product: "Power Automate", use: "Workflow automation across operations", source: { label: "Microsoft UK Stories — ASOS Power Automate", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" } },
      { layer: "Collaboration", product: "Teams Premium", use: "AI meeting summaries + live translations", source: { label: "Microsoft UK Stories — ASOS Teams Premium", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" } },
      { layer: "ERP", product: "Microsoft Dynamics 365", use: "ERP migration in flight (£67M legacy-asset impairment)", source: { label: "ASOS PLC — H1 FY26 ERP migration disclosure", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" } },
      { layer: "Customer service AI agents", product: "Sierra", use: "AI customer service agents across CX operations", source: { label: "Retail Tech Innovation Hub — ASOS + Sierra (Dec 2025)", url: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — 3-year AI collaboration (announced 2025)",
        status: "confirmed",
        caseStudy: { label: "Microsoft UK Stories — ASOS x Microsoft 3-year AI collaboration", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
        note: "Builds on the 2022 5-year Azure agreement. Spans Power Automate, Teams Premium, M365 Copilot, GitHub Copilot, Azure OpenAI Service, and the AI Stylist consumer chatbot. Olaf Akkerman (Microsoft UK Retail GM): \"ASOS has been an early adopter of AI and is using it in many innovative ways.\"",
      },
      { name: "GitHub Copilot", status: "confirmed" },
      { name: "Microsoft Dynamics 365 (ERP migration in flight)", status: "confirmed" },
      {
        name: "Sierra — AI customer service agents",
        status: "confirmed",
        caseStudy: { label: "Retail Tech Innovation Hub — ASOS + Sierra (Dec 2025)", url: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal" },
        note: "Sierra is the customer-service AI agent platform founded by ex-Salesforce co-CEO Bret Taylor ($10B valuation). ASOS deal announced December 2025.",
      },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft is the dominant public AI partner. Sierra is the second confirmed external AI vendor (customer service agents, Dec 2025). No public Google Cloud, AWS, Anthropic, OpenAI-direct, or Mistral footprint.",
  },
  rachelNotes: [
    {
      lead: "Quick take.",
      body: "H1 FY26: revenue -14% to £1.11B but op loss halved to £100.9M, adj. EBITDA +51% to £64M, gross margin +330bps. Microsoft Copilot 90% adoption + 35,000 hours saved is the most explicit AI-cost-takeout disclosure on the watchlist. AI agents now write ~15% of code.",
    },
    {
      lead: "AI posture.",
      body: "Performer and accelerating. 3-year Microsoft AI collaboration, AI Stylist chatbot, GitHub Copilot since 2023, Sierra for customer service agents, Dynamics 365 ERP migration. Microsoft and ASOS have jointly identified 93 agentic use cases across the value chain.",
    },
    {
      lead: "Vendor footprint.",
      body: "Predominantly Microsoft with Sierra as the second confirmed AI vendor. The 93 identified agentic use cases signal a move beyond productivity tools to autonomous agents across finance, supply chain, and CX. Watch FY26 annual for first agent-attributed KPI disclosure.",
    },
    {
      lead: "Open loop.",
      body: "Watch the FY26 trading update (late July) to see if AI Stylist conversion impact is quantified and whether any of the 93 agentic use cases are publicly named.",
    },
  ],
  sources: [
    { label: "ASOS PLC — H1 FY26 interim results (23 Apr 2026)", url: "https://www.asosplc.com/media/jpgfzvjz/interim-results-for-the-26-weeks-to-1-march-2026.pdf" },
    { label: "Microsoft UK Stories — ASOS x Microsoft 3-year AI collaboration", url: "https://ukstories.microsoft.com/features/asos-and-microsoft-announce-new-three-year-ai-collaboration/" },
    { label: "Yahoo Finance — ASOS H1 2026 earnings call highlights", url: "https://finance.yahoo.com/markets/stocks/articles/asos-plc-asomf-h1-2026-070336962.html" },
    { label: "World Footwear — ASOS sharp underlying profitability growth in H1", url: "https://www.worldfootwear.com/news/asos-confirms-sharp-underlying-profitability-growth-in-the-h1/11444.html" },
    { label: "Retail Insight Network — ASOS narrows H1 losses", url: "https://www.retail-insight-network.com/news/asos-narrows-h1-losses/" },
    { label: "MarketBeat — ASOS H1 earnings call highlights", url: "https://www.marketbeat.com/instant-alerts/asos-h1-earnings-call-highlights-2026-04-23/" },
    { label: "ASOS PLC — Investor results hub", url: "https://www.asosplc.com/investors/results-and-reports/" },
    { label: "Retail Tech Innovation Hub — ASOS + Sierra AI agents (Dec 2025)", url: "https://retailtechinnovationhub.com/home/2025/12/28/asos-reimagines-customer-experience-with-ai-as-online-fashion-retailer-inks-sierra-deal" },
  ],
  askPrompts: [
    "What did ASOS report in H1 FY2026?",
    "What's in the ASOS x Microsoft 3-year AI collaboration?",
    "What is Sierra and why did ASOS choose it for customer service AI?",
    "How many agentic use cases has ASOS identified with Microsoft?",
  ],
};

// =============================================================================
// Barilla — privately-held; FY2024 last published baseline; o9 + Databricks
// =============================================================================
export const barilla_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2024", date: "2025-06-15" },
    lastReported: { label: "FY2024 sustainability + financial report", date: "2025-06-15" },
    next: { label: "FY2025 report", date: "Mid 2026" },
    blurb: "Privately-held Italian cooperative, reports annually mid-year. FY2024 is the last full-year baseline. FY2025 expected mid-2026.",
  },
  investor: {
    fiscalYearLabel: "FY2024 baseline",
    headline: {
      revenue: { value: "€4.9B", reported: "+0.3%", note: "FY2024 stable; ~€4.88B" },
      opMargin: {
        value: "EBITDA €537M",
        growth: { absolute: "+€40M", pct: "+8%", basis: "EBITDA FY2024 vs FY2023; net profit €142M (down from €284M on higher taxes)" },
      },
      employees: { value: "9K" },
    },
    operatingComplexity: {
      hq: { value: "Italy 🇮🇹" },
      countries: { value: "100+" },
      brands: { value: "7+", note: "Barilla, Mulino Bianco, Pavesi, Wasa, Harrys, Pan di Stelle, Voiello" },
    },
    whyMatters: "Pasta + bakery + bread is a manufacturing + supply-chain + creative-marketing problem at scale. AI lands hardest in supply-chain planning (o9), demand forecasting, manufacturing IoT, and marketing optimisation.",
  },
  aiPerception: {
    quadrant: "silent",
    label: "Silent Builder · 3.0",
    rhetoric: 2,
    production: 3,
    evidence: "confirmed",
    rubric: "v1",
    lastScored: "2026-05-01",
  },
  narrative: {
    framing: {
      headline: "Quietly building the AI supply chain.",
      body: "Barilla under-talks AI but ships real production tooling: o9 for integrated planning, Databricks for data lakehouse, OMD/AI for marketing. Italian-cooperative reporting style means little earnings-call rhetoric.",
    },
    dedicatedSection: {
      headline: "No dedicated AI section in public reports.",
      body: "FY2024 sustainability report touches digitisation but no carved-out AI chapter. Most AI signal lives in vendor case studies, not Barilla's own communications.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>IT &amp; Digital function</strong> sits inside the Group Operations / Supply Chain organisation under <strong>Gianluigi Toia</strong> (Chief Supply Chain Officer). No public Chief AI / Chief Digital seat at executive committee level — Barilla's tech leadership is supply-chain-led, not CIO-led.",
      source: { label: "o9 Solutions — Barilla integrated planning", url: "https://o9solutions.com/news/o9-solutions-empowers-barilla-with-integrated-planning-capabilities/" },
    },
    appointmentsNote: "Privately-held cooperative: leadership transparency is lower than publicly-listed peers. Most named AI leadership surfaces through vendor case studies (o9, Databricks, OMD).",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>o9 Solutions</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· o9 (enterprise AI planning)</span> — Integrated supply-chain planning platform (demand forecasting + S&OP + IBP).",
          source: { label: "o9 Solutions — Barilla integrated planning case study", url: "https://o9solutions.com/news/o9-solutions-empowers-barilla-with-integrated-planning-capabilities/" },
        },
        {
          html: "<strong>Databricks Lakehouse</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Databricks</span> — Data Intelligence Platform for marketing analytics (customer behaviour, segmentation) + manufacturing operations.",
          source: { label: "Databricks Customers — Barilla", url: "https://www.databricks.com/customers/barilla" },
        },
        {
          html: "<strong>OMD AI marketing optimisation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· OMD agency</span> — AI-driven media-mix and budget allocation across global markets. Drum award case study.",
          source: { label: "The Drum — How OMD revolutionised Barilla's marketing with AI", url: "https://www.thedrum.com/awards-case-study/how-omd-revolutionized-barilla-s-marketing-with-ai" },
        },
        {
          html: "<strong>BITE Innovation Centre AI sensors</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal R&amp;D</span> — Barilla Innovation &amp; Technology Experience (BITE) in Parma opened November 2025 (14,000 sqm, €20M+ investment). Deploys AI-driven smart sensors and an 'electronic nose' to optimise pasta drying and map aromatic profiles.",
          source: { label: "Barilla — BITE innovation centre announcement (Nov 2025)", url: "https://www.barillagroup.com/en/press-room/press-releases/barilla-bite-innovation-center/" },
        },
      ],
    },
    stackTable: [
      { layer: "Supply chain planning", product: "o9 Solutions", use: "Integrated planning (demand + S&OP)", source: { label: "o9 Solutions — Barilla case study", url: "https://o9solutions.com/news/o9-solutions-empowers-barilla-with-integrated-planning-capabilities/" } },
      { layer: "Data lakehouse", product: "Databricks", use: "Customer behaviour analytics + manufacturing data", source: { label: "Databricks Customers — Barilla", url: "https://www.databricks.com/customers/barilla" } },
      { layer: "Marketing AI", product: "OMD-led media mix", use: "Budget allocation across global media", source: { label: "The Drum — Barilla AI case study", url: "https://www.thedrum.com/awards-case-study/how-omd-revolutionized-barilla-s-marketing-with-ai" } },
      { layer: "Manufacturing / R&D", product: "BITE AI sensors + electronic nose", use: "Pasta drying optimisation + aromatic profile mapping (BITE centre, Parma)", source: { label: "Barilla — BITE innovation centre", url: "https://www.barillagroup.com/en/press-room/press-releases/barilla-bite-innovation-center/" } },
    ],
    consumerFacing: "<strong>Lightly.</strong> Most AI is back-office (planning, lakehouse, marketing optimisation, manufacturing sensors). No flagship consumer-facing GenAI product yet.",
    genAI: { mentioned: false, note: "GenAI not explicitly mentioned in public Barilla communications. Marketing analytics + supply-chain ML is non-generative. BITE centre R&D AI is sensor/process-driven, not LLM-based." },
  },
  vendorStack: {
    namedPartners: [
      {
        name: "o9 Solutions — integrated planning",
        status: "confirmed",
        caseStudy: { label: "o9 Solutions — Barilla integrated planning", url: "https://o9solutions.com/news/o9-solutions-empowers-barilla-with-integrated-planning-capabilities/" },
        note: "Public case study on supply-chain planning transformation. Shared o9 footprint with AB InBev, Pernod Ricard.",
      },
      {
        name: "Databricks — Lakehouse",
        status: "confirmed",
        caseStudy: { label: "Databricks Customers — Barilla", url: "https://www.databricks.com/customers/barilla" },
        note: "Marketing analytics + manufacturing data on the Data Intelligence Platform.",
      },
      { name: "OMD (marketing AI agency)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Barilla's public AI stack is non-hyperscaler: o9 + Databricks anchor the production work. No public Microsoft / Google Cloud / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Barilla pasta", description: "Master pasta brand. Marketing AI work via OMD's media mix optimisation drives global campaign efficiency." },
      { brand: "Mulino Bianco", description: "Italian bakery flagship. Supply-chain planning via o9 helps manage seasonal SKU complexity." },
      { brand: "Wasa", description: "Crispbread brand acquired in 1999. Northern European footprint." },
      { brand: "Harrys", description: "French bread / packaged bakery acquired 2003. Sits inside the Barilla bakery portfolio." },
    ],
    note: "No standalone brand-level AI campaigns; AI work runs at Group level (planning, marketing, manufacturing).",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2024: revenue €4.9B (+0.3%), EBITDA €537M (+8%), net profit €142M (down on higher taxes). Privately-held cooperative; transparency lower than public peers." },
    { lead: "AI posture.", body: "Silent Builder. o9 + Databricks customer stories are the strongest public artefacts. No dedicated AI investor narrative; supply-chain-led tech org under the CSCO." },
    { lead: "Vendor footprint.", body: "No Microsoft, Google, AWS, Anthropic, or OpenAI public footprint. o9 and Databricks are the disclosed data and planning anchors." },
  ],
  sources: [
    { label: "Barilla — Reports hub", url: "https://www.barillagroup.com/en/press-room/reports/" },
    { label: "ESM Magazine — Barilla FY2024 results", url: "https://www.esmmagazine.com/a-brands/barilla-group-posts-stable-revenue-lower-profit-in-fy-2024-291462" },
    { label: "o9 Solutions — Barilla integrated planning case study", url: "https://o9solutions.com/news/o9-solutions-empowers-barilla-with-integrated-planning-capabilities/" },
    { label: "Databricks Customers — Barilla lakehouse", url: "https://www.databricks.com/customers/barilla" },
    { label: "The Drum — OMD revolutionises Barilla marketing with AI", url: "https://www.thedrum.com/awards-case-study/how-omd-revolutionized-barilla-s-marketing-with-ai" },
    { label: "Wikipedia — Barilla company background", url: "https://en.wikipedia.org/wiki/Barilla_(company)" },
    { label: "Barilla — BITE innovation centre (Nov 2025)", url: "https://www.barillagroup.com/en/press-room/press-releases/barilla-bite-innovation-center/" },
  ],
  askPrompts: [
    "What did Barilla report for FY2024?",
    "How does Barilla use o9 for supply-chain planning?",
    "What is the Barilla BITE innovation centre and how is AI used there?",
    "Does Barilla have a CIO or Chief AI Officer?",
  ],
};

// =============================================================================
// Beiersdorf — FY2025 published; Pierre Kröning CIO from Sep 2025
// =============================================================================
export const beiersdorf_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-02" },
    lastReported: { label: "Q1 2026 results", date: "2026-04-21" },
    next: { label: "H1 2026 results", date: "Early August 2026" },
    blurb: "FY2025 published 2 Mar 2026. Q1 2026 published 21 Apr 2026 (organic -4.6%, NIVEA -7%, Derma +8.2%). H1 2026 results in early August.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€9.9B", reported: "Group", organic: "+2.4%", note: "Consumer €8.18B (+2.5%) · tesa €1.7B (+1.8%)" },
      opMargin: {
        value: "EBIT €1.4B",
        growth: { basis: "EBIT excl. special factors rose YoY; consumer Derma segment outperforms", estimated: true },
        note: "Profitability continued to improve",
      },
      employees: { value: "22K" },
    },
    operatingComplexity: {
      hq: { value: "Germany 🇩🇪" },
      countries: { value: "170+" },
      brands: { value: "8+", note: "NIVEA, Eucerin, La Prairie, Aquaphor, Hansaplast, Coppertone, Chantecaille, tesa" },
    },
    whyMatters: "Skincare R&D is the core moat: ingredient discovery, formulation, claims testing. AI lands hardest in active-ingredient discovery (Insilico, Uncountable), product development, and consumer marketing across NIVEA's mass-market footprint.",
    quarterlyUpdate: {
      label: "Q1 2026 results",
      date: "21 April 2026",
      blurb: "Challenging start. Group organic -4.6% to €2.5B; NIVEA -7% (rebalancing in progress, sell-out +1.7% YTD); Derma outstanding at +8.2%. FY2026 guidance reaffirmed.",
      metrics: [
        { label: "Group sales", value: "€2.5B", trend: "-4.6% organic" },
        { label: "NIVEA organic", value: "-7%", trend: "Rebalancing; sell-out +1.7% YTD" },
        { label: "Derma organic", value: "+8.2%", trend: "Eucerin in China +87%" },
        { label: "tesa segment", value: "Flat to slightly +", trend: "FY guide reaffirmed" },
      ],
      reading: "First half remains the rebalancing phase for NIVEA. Derma + Eucerin's China surge is the standout. AI investment continues — no R&D AI commentary in Q1 release.",
      source: { label: "Beiersdorf — Q1 2026 results", url: "https://www.beiersdorf.com/newsroom/press-information/all-press-releases/2026/04/21-beiersdorf-delivers-q1-2026-in-line-with-expectations" },
    },
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 3.0", rhetoric: 2, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "R&D-led AI investor.",
      body: "Beiersdorf's AI story is research-led: Uncountable for AI-assisted formulation, Insilico for computer-simulated skin research. Less consumer-facing GenAI than L'Oréal but a deeper R&D AI footprint.",
    },
    dedicatedSection: {
      headline: "AI surfaces in R&D, not standalone investor chapter.",
      body: "FY2025 annual touches digital + R&D AI but no carved-out AI investor chapter. Beiersdorf Connect (R&D collaboration platform) is the closest formal artefact.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Pierre Kröning</strong> · Chief Information Officer + Managing Director Beiersdorf IT (effective 1 Sep 2025). Also serves as Director Data, Analytics, AI &amp; Automation at Beiersdorf IT. AI &amp; Automation specifically run by <strong>Stephan Abend</strong> (Head of AI &amp; Automation).",
      source: { label: "Beiersdorf — Pierre Kröning CIO appointment", url: "https://www.beiersdorf.com/newsroom/press-information/all-press-releases/2025/09/03-pierre-kroening-appointed-as-beiersdorfs-new-cio" },
    },
    sectorAppointments: [
      { html: "<strong>Stephan Abend</strong> · Head of AI &amp; Automation at Beiersdorf IT. Public panel on launching/scaling GenAI." },
    ],
    appointmentsNote: "Distinct AI &amp; Automation reporting line — typical Silent Builder structure.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Uncountable AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Uncountable</span> — Long-term partnership for AI-assisted product development (formulation optimisation).",
          source: { label: "Uncountable — Beiersdorf product development partnership", url: "https://www.uncountable.com/resources/uncountable-beiersdorf" },
        },
        {
          html: "<strong>Insilico Medicine</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Insilico</span> — AI for computer-simulated skin research and active-ingredient discovery.",
          source: { label: "EurekAlert — Beiersdorf and Insilico AI skin research", url: "https://www.eurekalert.org/news-releases/854293" },
        },
        {
          html: "<strong>Beiersdorf Connect</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — R&amp;D collaboration platform with an ecosystem of startups for active-ingredient discovery.",
          source: { label: "Beiersdorf — Beiersdorf Connect R&D platform", url: "https://www.beiersdorf.com/research/our-way-of-working/beiersdorf-connect" },
        },
        {
          html: "<strong>Generative AI scaling programme</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud + Artefact</span> — Pierre Kröning (Director Data, Analytics, AI &amp; Automation) and Stephan Abend (Head of AI &amp; Automation) presented with Google Cloud + Artefact on launching and scaling GenAI across Beiersdorf IT.",
          source: { label: "Artefact — Generative AI with Beiersdorf x Google Cloud", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" },
        },
        {
          html: "<strong>Internal ChatGPT deployment</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· OpenAI</span> — Beiersdorf launched an internal ChatGPT instance within a year of OpenAI's public release (late 2023), per Hamburg Business interview with Dirk Ploss. Applied across analytics, formula development, and toxicology. Internal chatbot infrastructure existed since 2019.",
          source: { label: "Hamburg Business — Beiersdorf driving AI innovations", url: "https://www.hamburg-business.com/en/news/beiersdorf-driving-ai-innovations" },
        },
      ],
    },
    stackTable: [
      { layer: "R&D AI", product: "Uncountable", use: "AI-assisted formulation / product development", source: { label: "Uncountable — Beiersdorf partnership", url: "https://www.uncountable.com/resources/uncountable-beiersdorf" } },
      { layer: "R&D AI", product: "Insilico Medicine", use: "Computer-simulated skin research", source: { label: "EurekAlert — Beiersdorf x Insilico", url: "https://www.eurekalert.org/news-releases/854293" } },
      { layer: "GenAI cloud", product: "Google Cloud", use: "Generative AI programmes (Artefact event)", source: { label: "Artefact — Beiersdorf x Google Cloud event", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" } },
      { layer: "Internal GenAI", product: "ChatGPT (internal deployment)", use: "Analytics, formula development, toxicology (since late 2023)", source: { label: "Hamburg Business — Beiersdorf AI innovations", url: "https://www.hamburg-business.com/en/news/beiersdorf-driving-ai-innovations" } },
    ],
    consumerFacing: "<strong>Indirect.</strong> NIVEA-side AI work is in claims testing + advertising, not flagship apps. La Prairie / Eucerin run loyalty + recommendation tooling but no public consumer GenAI product.",
    genAI: { mentioned: true, vendors: [{ name: "Google Cloud", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" }, { name: "OpenAI (internal ChatGPT)", url: "https://www.hamburg-business.com/en/news/beiersdorf-driving-ai-innovations" }], note: "Public stage with Google Cloud + Artefact on GenAI scaling. Internal ChatGPT deployed late 2023 for analytics, formulation, and toxicology. R&D AI more mature than consumer GenAI." },
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Uncountable — AI product development",
        status: "confirmed",
        caseStudy: { label: "Uncountable — Beiersdorf product development", url: "https://www.uncountable.com/resources/uncountable-beiersdorf" },
        note: "Long-term partnership for AI-assisted formulation. One of Beiersdorf's most public AI artefacts.",
      },
      {
        name: "Insilico Medicine — AI skin research",
        status: "confirmed",
        caseStudy: { label: "EurekAlert — Beiersdorf x Insilico AI skin research", url: "https://www.eurekalert.org/news-releases/854293" },
        note: "Computer-simulated skin research for novel + safe active-ingredient discovery.",
      },
      {
        name: "Google Cloud — GenAI programme",
        status: "confirmed",
        caseStudy: { label: "Artefact — Beiersdorf x Google Cloud GenAI event", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" },
        note: "Public stage on GenAI scaling. Strongest hyperscaler tie at Beiersdorf today.",
      },
      {
        name: "OpenAI — internal ChatGPT deployment",
        status: "confirmed",
        caseStudy: { label: "Hamburg Business — Beiersdorf driving AI innovations", url: "https://www.hamburg-business.com/en/news/beiersdorf-driving-ai-innovations" },
        note: "Internal ChatGPT deployed late 2023 for analytics, formula development, and toxicology. Internal chatbot infrastructure existed since 2019.",
      },
      {
        name: "Artefact — GenAI consulting partner",
        status: "confirmed",
        caseStudy: { label: "Artefact — Beiersdorf x Google Cloud GenAI event", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" },
        note: "Artefact's Data & AI Circle partner. CIO Kröning and Head of AI Abend presented at Artefact's GenAI scaling event.",
      },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "R&D AI partners (Uncountable, Insilico) are the deepest. Google Cloud is the visible hyperscaler with Artefact as GenAI consulting partner. OpenAI is confirmed via internal ChatGPT deployment (late 2023). Microsoft Azure, Anthropic, AWS, Mistral not publicly tied at scale.",
  },
  byMaison: {
    maisons: [
      { brand: "NIVEA", description: "Master mass-market brand; AI work concentrates in claims testing, formulation (Uncountable), and ingredient discovery (Insilico)." },
      { brand: "Eucerin", description: "Derma flagship — outperformed in FY2025. Active-ingredient AI is core to derma claims." },
      { brand: "La Prairie", description: "Luxury skincare. Personalisation + clienteling AI lives here, less publicly-named than NIVEA's R&D work." },
      { brand: "tesa", description: "Industrial adhesive sister business. €1.7B revenue, +1.8% organic. Manufacturing AI focused." },
    ],
    note: "Brand-level AI most mature at Eucerin (derma claims) and NIVEA (formulation). La Prairie sits closer to luxury-clientelling patterns; tesa is industrial.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: Group €9.9B, +2.4% organic. EBIT excl. specials €1.4B. Consumer Derma outperforms; NIVEA growth slower (+0.6% 9M) as global skincare market decelerated to ~1.5-2%." },
    { lead: "AI posture.", body: "Silent Builder. Pierre Kröning to CIO (Sep 2025) plus a dedicated Head of AI & Automation. R&D AI deeper than consumer GenAI: Uncountable + Insilico anchor the formulation / discovery story." },
    { lead: "Vendor footprint.", body: "Google Cloud + Artefact are the GenAI partners. OpenAI is confirmed via internal ChatGPT (late 2023, per Hamburg Business). Microsoft / AWS / Anthropic / Mistral are open. No vendor is disclosed on the R&D ingredient-discovery side." },
  ],
  sources: [
    { label: "Beiersdorf — FY2025 results press release", url: "https://www.beiersdorf.com/newsroom/press-information/all-press-releases/2026/03/02-full-year-results-2025-beiersdorf-grows-in-a-slowing-market-derma-outperforms" },
    { label: "Beiersdorf — Annual Report 2025", url: "https://reports.beiersdorf.com/annual-report/2025/" },
    { label: "Beiersdorf — Pierre Kröning appointed CIO", url: "https://www.beiersdorf.com/newsroom/press-information/all-press-releases/2025/09/03-pierre-kroening-appointed-as-beiersdorfs-new-cio" },
    { label: "Uncountable — Beiersdorf AI partnership", url: "https://www.uncountable.com/resources/uncountable-beiersdorf" },
    { label: "EurekAlert — Beiersdorf x Insilico AI skin research", url: "https://www.eurekalert.org/news-releases/854293" },
    { label: "Artefact — Beiersdorf x Google Cloud GenAI event", url: "https://www.artefact.com/events/generative-ai-leveraging-todays-innovation-for-tomorrows-competitive-edge/" },
    { label: "Premium Beauty News — Beiersdorf 2025 sales commentary", url: "https://www.premiumbeautynews.com/en/beiersdorf-sales-grew-in-2025-but,27217" },
    { label: "Beiersdorf — Investor financial reports", url: "https://www.beiersdorf.com/investor-relations/financial-reports/financial-reports-and-presentations" },
    { label: "Hamburg Business — Beiersdorf driving AI innovations (internal ChatGPT)", url: "https://www.hamburg-business.com/en/news/beiersdorf-driving-ai-innovations" },
  ],
  askPrompts: [
    "What did Beiersdorf report for FY2025?",
    "How does Beiersdorf use Uncountable AI for product development?",
    "What is Beiersdorf's internal ChatGPT deployment?",
    "Who runs AI at Beiersdorf?",
  ],
};

// =============================================================================
// Burberry — H1 FY2026 reported 13 Nov 2025; Penguin LLM platform
// =============================================================================
export const burberry_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025 (52w)", date: "2025-05-14" },
    lastReported: { label: "H1 FY2026 interim (26w to 27 Sep 2025)", date: "2025-11-13" },
    next: { label: "Q3 FY2026 trading update", date: "January 2026" },
    blurb: "FY2025 (52w to Mar 2025) is the baseline. H1 FY2026 published 13 Nov 2025 — first quarterly comp-sales growth in two years. FY2026 ends March 2026.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · H1 FY2026 reported",
    headline: {
      revenue: { value: "£1.03B (H1)", reported: "-3%", note: "Comparable sales flat H1; +2% Q2 (first quarterly growth in 2 years)" },
      opMargin: {
        value: "1.8%",
        growth: { absolute: "Op profit £19M", basis: "Adj. op profit £19M H1 FY26 (CER); return to operating profitability vs prior", estimated: true },
        note: "1.9% reported",
      },
      employees: { value: "9.4K" },
    },
    operatingComplexity: {
      hq: { value: "United Kingdom 🇬🇧" },
      countries: { value: "37+" },
      stores: { value: "415 directly-operated" },
      brands: { value: "1", note: "Burberry (master)" },
    },
    whyMatters: "Luxury heritage brand. AI levers: clienteling (Penguin LLM platform), creative-asset reuse (archive animation), e-commerce personalisation, customer service.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Penguin is the moat.",
      body: "Burberry's Data Science team built Penguin — a transformer-based GenAI platform for luxury clientelling. Adopted by 100+ consultants across all markets; +24% AVT lift in customer-service channels. Won DataIQ \"Most Innovative Use of AI\" globally.",
    },
    dedicatedSection: {
      headline: "AI sits inside the Burberry Forward turnaround.",
      body: "Schulman's Burberry Forward strategy uses AI for cost discipline + clientelling productivity. Public Penguin write-ups + DataIQ award + Databricks customer story put Burberry firmly in Performer territory.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Charlotte Baldwin</strong> · Chief Information Officer (joined late March 2025, reports to CEO Joshua Schulman). Previously Global Chief Digital and Information Officer at Costa Coffee (Coca-Cola). 26+ years across Bupa, Freshfields, Pearson, Thomson Reuters.",
      source: { label: "CIO Dive — Burberry picks Charlotte Baldwin as CIO", url: "https://www.ciodive.com/news/Burberry-CIO-Charlotte-Baldwin/738940/" },
    },
    sectorAppointments: [
      { html: "<strong>Giorgio Belloli</strong> · Chief Digital, Customer and Innovation Officer (since 2023). Carries digital + customer narratives." },
    ],
    appointmentsNote: "Charlotte Baldwin's arrival in 2025 is a fresh signal: Costa-Coca-Cola heritage suggests data + omnichannel CRM emphasis.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Penguin</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal · transformer / fine-tuned LLMs</span> — GenAI clientelling platform: natural-language search + image recognition (street-to-shop). 100+ consultants across all markets; <strong>+24% AVT</strong> uplift in customer-service channels.",
          source: { label: "DataIQ — Most Innovative Use of AI Global: Burberry", url: "https://www.dataiq.global/award-winner/most-innovative-use-of-ai-global-burberry/" },
        },
        {
          html: "<strong>Databricks + Snowplow</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Databricks</span> — Data Intelligence Platform powering customer experience analytics across digital and store channels.",
          source: { label: "Databricks Customers — Burberry x Snowplow", url: "https://www.databricks.com/customers/burberry-snowplow" },
        },
        {
          html: "<strong>Archive animation AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· campaign GenAI</span> — Animating historical photos (Lord Lichfield 1980 archive) for contemporary advertising.",
          source: { label: "Glossy — luxury fashion AI marketing turning point 2025", url: "https://www.glossy.co/fashion/luxury/luxury-fashions-ai-marketing-experiments-hit-a-turning-point/" },
        },
        {
          html: "<strong>Burberry chatbot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Master of Code Global</span> — Conversational AI customer service with Salesforce LiveAgent handoff.",
          source: { label: "Master of Code — Burberry chatbot", url: "https://masterofcode.com/portfolio/burberry-chatbot" },
        },
        {
          html: "<strong>Alloy Automation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Alloy</span> — Automated workflows for staff sales operations globally, managing online sales processes across markets.",
          source: { label: "Alloy Automation — Burberry case study", url: "https://www.runalloy.com/case-studies/burberry/" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Penguin platform:</strong> +24% Average Transaction Value uplift in customer-service channels. 100+ consultants across all markets. DataIQ \"Most Innovative Use of AI Global\" award.",
      source: { label: "DataIQ — Burberry award", url: "https://www.dataiq.global/award-winner/most-innovative-use-of-ai-global-burberry/" },
    },
    consumerFacing: "<strong>Yes.</strong> Penguin powers consultant-mediated luxury clientelling (semi-consumer-facing); Master of Code chatbot is direct-to-consumer; archive-animation AI is campaign-side.",
    genAI: { mentioned: true, vendors: [{ name: "Databricks", url: "https://www.databricks.com/customers/burberry-snowplow" }], note: "Penguin's transformer + fine-tuned LLM stack is the most public artefact. Databricks customer story anchors the data layer." },
    stackTable: [
      { layer: "GenAI clientelling", product: "Penguin (internal)", use: "Transformer + fine-tuned LLMs for luxury client recommendations", source: { label: "DataIQ — Burberry Penguin award", url: "https://www.dataiq.global/award-winner/most-innovative-use-of-ai-global-burberry/" } },
      { layer: "Data lakehouse", product: "Databricks + Snowplow", use: "Customer experience analytics across digital + store", source: { label: "Databricks Customers — Burberry x Snowplow", url: "https://www.databricks.com/customers/burberry-snowplow" } },
      { layer: "Conversational AI", product: "Burberry chatbot (Master of Code)", use: "Customer service automation with Salesforce LiveAgent handoff", source: { label: "Master of Code — Burberry chatbot portfolio", url: "https://masterofcode.com/portfolio/burberry-chatbot" } },
      { layer: "Operations automation", product: "Alloy Automation", use: "Staff sales workflow automation across global markets", source: { label: "Alloy Automation — Burberry case study", url: "https://www.runalloy.com/case-studies/burberry/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Databricks — Lakehouse + Snowplow",
        status: "confirmed",
        caseStudy: { label: "Databricks Customers — Burberry x Snowplow", url: "https://www.databricks.com/customers/burberry-snowplow" },
        note: "Customer experience analytics anchor. Same Databricks footprint as Barilla and (selectively) other CPG/luxury peers.",
      },
      { name: "Master of Code Global (chatbot)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Burberry's Penguin platform is internally-built — no named hyperscaler. Databricks anchors the data layer. No public Microsoft, Google, AWS, Anthropic, OpenAI-direct, or Mistral relationship, despite Penguin's disclosed LLM dependency.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "H1 FY26 (Sep 2025): revenue £1.03B (-3%), adj. OP £19M (+1.8% margin). Q2 +2% comparable — first quarterly growth in 2 years. Schulman's Burberry Forward strategy showing early traction." },
    { lead: "AI posture.", body: "Performer. Penguin LLM clientelling platform (+24% AVT, DataIQ award), Databricks lakehouse, Master of Code chatbot, archive-animation campaigns. New CIO Charlotte Baldwin (Mar 2025) brings Costa/Coca-Cola data heritage." },
    { lead: "Vendor footprint.", body: "Penguin runs on internal infrastructure with no hyperscaler named at the foundation-model layer. Databricks is disclosed in the stack. No fashion-luxury peer discloses a comparable internally built platform." },
  ],
  sources: [
    { label: "Burberry — H1 FY26 interim results (13 Nov 2025)", url: "https://www.burberryplc.com/investors/results-and-reports" },
    { label: "Retail Insight — Burberry Q2 FY26 comp-sales return", url: "https://www.retail-insight-network.com/news/burberry-comparable-sales-return-growth/" },
    { label: "DataIQ — Most Innovative Use of AI Global: Burberry (Penguin)", url: "https://www.dataiq.global/award-winner/most-innovative-use-of-ai-global-burberry/" },
    { label: "Databricks Customers — Burberry x Snowplow", url: "https://www.databricks.com/customers/burberry-snowplow" },
    { label: "CIO Dive — Burberry picks Charlotte Baldwin as CIO", url: "https://www.ciodive.com/news/Burberry-CIO-Charlotte-Baldwin/738940/" },
    { label: "Glossy — luxury AI marketing 2025 turning point", url: "https://www.glossy.co/fashion/luxury/luxury-fashions-ai-marketing-experiments-hit-a-turning-point/" },
    { label: "Master of Code — Burberry chatbot portfolio", url: "https://masterofcode.com/portfolio/burberry-chatbot" },
    { label: "Burberry — Annual Report 24-25", url: "https://www.burberryplc.com/investors/annual-report-24-25" },
    { label: "Alloy Automation — Burberry case study", url: "https://www.runalloy.com/case-studies/burberry/" },
  ],
  askPrompts: [
    "What did Burberry report in H1 FY2026?",
    "What is Burberry's Penguin AI platform?",
    "How is Burberry using Databricks?",
    "Who is Charlotte Baldwin and what does the new Burberry CIO mean?",
  ],
};

// =============================================================================
// Campari Group — FY2025 published; deepest Microsoft house in spirits
// =============================================================================
export const campari_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-04" },
    lastReported: { label: "FY2025 results", date: "2026-03-04" },
    next: { label: "Q1 2026 trading update", date: "Early May 2026" },
    blurb: "FY2025 published 4 Mar 2026 (€3.05B sales, +2.4% organic). Q1 2026 trading update early May.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€3.05B", reported: "+1%", organic: "+2.4%", note: "FY2025 net sales" },
      opMargin: {
        value: "Adj. EBIT €637M",
        growth: { absolute: "+5.4%", pct: "+5.4% adj. EBIT YoY", basis: "+60bps margin lift; gross margin +100bps" },
        note: "Adj. net profit €386M (+3%)",
      },
      employees: { value: "5K" },
    },
    operatingComplexity: {
      hq: { value: "Italy 🇮🇹" },
      countries: { value: "190+" },
      brands: { value: "8+", note: "Aperol, Campari, Wild Turkey, Grand Marnier, Cinzano, Espolòn, Skyy, Appleton" },
    },
    whyMatters: "Premium spirits is a brand-marketing + on-trade execution + supply-chain problem. AI levers: customer insights at scale (Dynamics 365), creative production, employee productivity, and field marketing. Campari's Microsoft house is unusually deep.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "All-in on the Microsoft stack.",
      body: "Four published Microsoft customer stories (Dynamics 365 Customer Insights, Dynamics 365 Marketing, Microsoft 365 Copilot + Viva, AI Builder for Aperol receipts). 90%+ monthly Copilot usage. Bynder AI DAM accelerates campaign time-to-market. The deepest Microsoft alignment in CPG spirits.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Stefano Saccardi</strong> · CEO Designate, plus the Group Operating Committee carries technology agendas. AI &amp; data lives within the Group Marketing &amp; Digital function alongside CMO leadership; Camparistas (employee community) reach 26 markets via Microsoft Viva.",
      source: { label: "Microsoft Customer Story — Campari Group Microsoft Viva", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" },
    },
    appointmentsNote: "Marketing-led tech adoption: data + AI run through customer/marketing teams more than a CIO seat.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Microsoft Dynamics 365 Customer Insights</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — 360-degree customer view + AI-driven recommendations + real-time customer-led journey orchestration.",
          source: { label: "Microsoft Customer Story — Campari Customer Insights", url: "https://www.microsoft.com/en/customers/story/1508176885523851492-campari-consumergoods" },
        },
        {
          html: "<strong>AI Builder (Aperol Together Again)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Power Platform</span> — Receipt scanning to validate Aperol Spritz purchases in UK + Australia campaigns (100K free spritzes giveaway).",
          source: { label: "Microsoft Customer Story — Campari Dynamics 365", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" },
        },
        {
          html: "<strong>Microsoft 365 Copilot + Viva</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — 90%+ monthly Copilot usage rate; Viva reaches 5K Camparistas in 26 markets for communication and learning.",
          source: { label: "Microsoft Customer Story — Campari Microsoft 365 Copilot &amp; Viva", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" },
        },
        {
          html: "<strong>Bynder AI-powered DAM</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Bynder</span> — AI-powered Digital Asset Management accelerates campaign time-to-market.",
          source: { label: "CMSWire — Bynder AI DAM accelerates Campari campaigns", url: "https://www.cmswire.com/the-wire/bynders-ai-powered-dam-accelerates-campaign-time-to-market-for-campari-group/" },
        },
        {
          html: "<strong>Fellini Forward</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· campaign GenAI (2021, ongoing legacy)</span> — Campari Red Diaries project that used AI to extend Federico Fellini's creative genius into a new film.",
          source: { label: "Campari Group — Fellini Forward AI announcement", url: "https://www.camparigroup.com/en/news/2021-09-08/campari-launches-fellini-forward-new-campari-red-diaries-project-exploring-creative" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Microsoft Copilot:</strong> 90%+ monthly usage rate across Camparistas. <strong>Aperol Together Again:</strong> 100K Aperol Spritz giveaway processed via AI Builder receipt scanning across UK + AU. <strong>Bynder AI DAM:</strong> measurable campaign time-to-market acceleration.",
      source: { label: "Microsoft Customer Story — Campari Viva &amp; Copilot", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" },
    },
    consumerFacing: "<strong>Indirect.</strong> Aperol Together Again receipt-scan campaign is the most consumer-touched. Most AI is back-office (customer insights, marketing operations, employee productivity).",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" }], note: "M365 Copilot at 90%+ monthly usage is unusually high for spirits/CPG. Bynder DAM is the named GenAI marketing-ops tool." },
    stackTable: [
      { layer: "Customer data", product: "Microsoft Dynamics 365 Customer Insights", use: "360-degree view + AI recommendations + journey orchestration", source: { label: "Microsoft — Campari Customer Insights", url: "https://www.microsoft.com/en/customers/story/1508176885523851492-campari-consumergoods" } },
      { layer: "Marketing automation", product: "Microsoft Dynamics 365 Marketing", use: "Personalised marketing across touch points", source: { label: "Microsoft — Campari Dynamics 365", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" } },
      { layer: "Process AI", product: "Microsoft AI Builder", use: "Receipt scanning (Aperol Together Again)", source: { label: "Microsoft — Campari Dynamics 365", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" } },
      { layer: "Knowledge work", product: "Microsoft 365 Copilot + Viva", use: "90%+ monthly Copilot usage; Viva across 26 markets", source: { label: "Microsoft — Campari Viva", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" } },
      { layer: "Marketing DAM", product: "Bynder AI", use: "AI-powered DAM accelerating campaign time-to-market", source: { label: "CMSWire — Bynder x Campari", url: "https://www.cmswire.com/the-wire/bynders-ai-powered-dam-accelerates-campaign-time-to-market-for-campari-group/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Dynamics 365 Customer Insights",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Campari Customer Insights", url: "https://www.microsoft.com/en/customers/story/1508176885523851492-campari-consumergoods" },
        note: "360-degree customer view + AI recommendations + real-time journey orchestration.",
      },
      {
        name: "Microsoft — Dynamics 365 (Aperol AI Builder)",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Campari Dynamics 365", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" },
        note: "Aperol Together Again UK + AU campaign: 100K Spritzes via AI Builder receipt validation.",
      },
      {
        name: "Microsoft — 365 Copilot + Viva",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Campari Viva &amp; Copilot", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" },
        note: "90%+ monthly Copilot usage; Viva employee comms across 26 markets.",
      },
      {
        name: "Bynder — AI-powered DAM",
        status: "confirmed",
        caseStudy: { label: "CMSWire — Bynder AI DAM x Campari", url: "https://www.cmswire.com/the-wire/bynders-ai-powered-dam-accelerates-campaign-time-to-market-for-campari-group/" },
        note: "Campaign time-to-market acceleration via AI-powered digital asset management.",
      },
      { name: "IBM (legacy modernisation)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Deepest Microsoft house in CPG spirits — three published customer stories spanning customer insights, marketing automation, and employee productivity. Bynder is the marketing-ops AI partner. No public Google Cloud / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Aperol", description: "Flagship growth brand. Aperol Together Again campaign (UK + AU) used Microsoft AI Builder for receipt validation across 100K free-spritz giveaway.", source: { label: "Microsoft — Campari Dynamics 365 / Aperol", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" } },
      { brand: "Campari", description: "Master Italian aperitif brand. Fellini Forward AI campaign (Campari Red Diaries) used GenAI to extend Federico Fellini's creative legacy.", source: { label: "Campari Group — Fellini Forward", url: "https://www.camparigroup.com/en/news/2021-09-08/campari-launches-fellini-forward-new-campari-red-diaries-project-exploring-creative" } },
      { brand: "Wild Turkey", description: "American whiskey heritage brand. Customer-data work via Dynamics 365 Customer Insights drives loyalty across the U.S." },
      { brand: "Grand Marnier", description: "French liqueur acquired 2016. Premium-tier brand benefiting from group-wide marketing AI." },
      { brand: "Skyy / Espolòn", description: "U.S. + Mexico spirits. Sit inside the U.S. distribution-led portfolio." },
    ],
    note: "Brand-level AI most visible at Aperol (Together Again campaign) and Campari (Fellini Forward). Most other brands ride group-wide marketing AI.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: net sales €3.05B (+1%, +2.4% organic), adj. EBIT €637M (+5.4%, +60bps), gross margin +100bps, net profit €386M (+3%). Solid growth despite tariff + Jamaica hurricane drag." },
    { lead: "AI posture.", body: "Performer. Three published Microsoft customer stories. 90%+ monthly M365 Copilot usage is among the highest in spirits/CPG. Bynder AI DAM + Aperol AI Builder + Fellini Forward GenAI campaign." },
    { lead: "Vendor footprint.", body: "Microsoft house — explicit and deep. No Anthropic or OpenAI-direct work is disclosed on the creative-marketing side. Google / AWS / Mistral not disclosed." },
  ],
  sources: [
    { label: "Campari — FY2025 results press release", url: "https://www.camparigroup.com/sites/default/files/downloads/20260304%202025%20Results%20Press%20Release_vF.pdf" },
    { label: "Campari — 2025 Investor Presentation", url: "https://www.camparigroup.com/sites/default/files/downloads/2025%20Investor%20Presentation_vF_0.pdf" },
    { label: "Microsoft Customer Story — Campari Customer Insights", url: "https://www.microsoft.com/en/customers/story/1508176885523851492-campari-consumergoods" },
    { label: "Microsoft Customer Story — Campari Dynamics 365", url: "https://www.microsoft.com/en/customers/story/843532-campari-consumer-goods-dynamics-365" },
    { label: "Microsoft Customer Story — Campari Viva &amp; M365 Copilot", url: "https://www.microsoft.com/en/customers/story/19797-campari-microsoft-viva" },
    { label: "CMSWire — Bynder AI DAM x Campari", url: "https://www.cmswire.com/the-wire/bynders-ai-powered-dam-accelerates-campaign-time-to-market-for-campari-group/" },
    { label: "Campari Group — Fellini Forward GenAI campaign", url: "https://www.camparigroup.com/en/news/2021-09-08/campari-launches-fellini-forward-new-campari-red-diaries-project-exploring-creative" },
    { label: "Campari Group — Financial Reports hub", url: "https://www.camparigroup.com/en/page/investors/financial-reports" },
  ],
  askPrompts: [
    "What did Campari report in FY2025?",
    "How does Campari use Microsoft Dynamics 365 Customer Insights?",
    "What was the Aperol Together Again AI Builder campaign?",
    "Why does Campari have 90%+ Copilot usage?",
  ],
};

// =============================================================================
// Carlsberg — FY2025 published; Global Brain on Azure OpenAI; major Britvic deal
// =============================================================================
export const carlsberg_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-04" },
    lastReported: { label: "Q1 2026 trading statement", date: "2026-04-29" },
    next: { label: "H1 2026 results", date: "Mid-August 2026" },
    blurb: "FY2025 published 4 Feb 2026. Q1 2026 trading statement published 29 Apr 2026 (organic revenue +3.6%, volume +2.8%, FY +2-6% organic OP guide reaffirmed).",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "DKK ~88B", reported: "+18.8%", organic: "Organic OP +5.0%", note: "Reported revenue lift driven by Britvic acquisition" },
      opMargin: {
        value: "DKK 7,382M",
        growth: { absolute: "DKK 7,382M (MPM)", pct: "+22.7% reported · +5.0% organic", basis: "OP MPM FY2025; +40% organic OP growth in full year results" },
        note: "Resilient in soft consumer climate",
      },
      employees: { value: "30K" },
    },
    operatingComplexity: {
      hq: { value: "Denmark 🇩🇰" },
      countries: { value: "150+" },
      brands: { value: "5+", note: "Carlsberg, Tuborg, Kronenbourg 1664, Somersby, Britvic (J2O, Robinsons, Tango)" },
    },
    whyMatters: "Beer + soft drinks at scale (post-Britvic): brewing, supply chain, B2B distribution, and on-trade are the AI levers. Carlsberg's Microsoft alignment (Azure + Copilot + Foundry) is the deepest in beer.",
    quarterlyUpdate: {
      label: "Q1 2026 trading statement",
      date: "29 April 2026",
      blurb: "Solid Q1 ahead of forecasts. Revenue DKK 20.7B (+3.6% organic / +3.0% reported), volume +2.8% organic, premium brands +5%+. FY 2026 organic OP guide reaffirmed at +2-6%.",
      metrics: [
        { label: "Reported revenue", value: "DKK 20.7B", trend: "+3.0% reported" },
        { label: "Organic revenue", value: "+3.6%", trend: "Volume +2.8%, rev/hl +1%" },
        { label: "Carlsberg brand", value: "+10%", trend: "Tuborg +4%, 1664 Blanc +2%" },
        { label: "Soft drinks", value: "+10% organic", trend: "Alcohol-free brews +7%" },
        { label: "FY26 OP guide", value: "+2-6%", trend: "Reaffirmed" },
      ],
      reading: "Premium-led volume growth with category breadth. Britvic integration on track. AI / Microsoft Foundry commentary not surfaced in Q1 — likely H1 update.",
      source: { label: "Carlsberg — Q1 2026 trading statement", url: "https://www.carlsberggroup.com/newsroom/q1-2026-trading-statement/" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Microsoft house, IoT brewery.",
      body: "Carlsberg's Global Brain (Azure OpenAI Foundry Models) built in 2 days with Microsoft Unified is the cleanest GenAI artefact in beer. Plus IoT smart breweries (PTC), connected bar kegs, and 100% cloud migration to Azure (873 → 350 apps; SAP on Azure).",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Sarah Haywood</strong> · Chief Technology Officer (CTO). Public on AI-infused brewing on the new hybrid network. Carries the technology agenda externally.",
      source: { label: "CIO — Carlsberg CTO Sarah Haywood AI-infused beers", url: "https://www.cio.com/article/200293/carlsberg-cto-sarah-haywood-brews-disruption-on-new-hybrid-network.html" },
    },
    appointmentsNote: "Distinct CTO seat — unusual in beer. Strong signal that tech is treated as core, not cost.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Global Brain</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Azure OpenAI Foundry Models (Microsoft Unified)</span> — AI knowledge base built in two days; supply-chain knowledge → actionable insights.",
          source: { label: "Microsoft Customer Story — Carlsberg Global Brain Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/25830-carlsberg-group-azure-openai-in-foundry-models" },
        },
        {
          html: "<strong>Smart brewery + connected bar</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· PTC (IoT)</span> — IoT sensors identify production problems and auto-issue maintenance requests. Lighter-weight beer kegs report real-time consumption to marketing systems.",
          source: { label: "PTC — Carlsberg digital transformation IoT", url: "https://www.ptc.com/en/case-studies/autoware-carlsberg-scale-digital-transformation" },
        },
        {
          html: "<strong>Full SAP on Azure</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure + Accenture</span> — 8-week cloud strategy; 873 → 350 apps; 600 servers migrated. One of largest F&B cloud transitions.",
          source: { label: "Accenture — Carlsberg cloud innovation case study", url: "https://www.accenture.com/us-en/case-studies/cloud/carlsberg-cloud-innovation" },
        },
      ],
    },
    stackTable: [
      { layer: "GenAI / foundation model", product: "Azure OpenAI in Foundry Models", use: "Global Brain supply-chain knowledge base", source: { label: "Microsoft — Carlsberg Global Brain", url: "https://www.microsoft.com/en/customers/story/25830-carlsberg-group-azure-openai-in-foundry-models" } },
      { layer: "Cloud migration", product: "Microsoft Azure + Accenture", use: "Full SAP migration to Azure (873 → 350 apps)", source: { label: "Accenture — Carlsberg cloud innovation", url: "https://www.accenture.com/us-en/case-studies/cloud/carlsberg-cloud-innovation" } },
      { layer: "IoT / brewery", product: "PTC IoT", use: "Smart brewery + connected bar kegs", source: { label: "PTC — Carlsberg digital transformation", url: "https://www.ptc.com/en/case-studies/autoware-carlsberg-scale-digital-transformation" } },
      { layer: "Network security", product: "Zscaler", use: "Zero-trust hybrid network", source: { label: "Zscaler Customers — Carlsberg", url: "https://www.zscaler.com/customers/carlsberg-group" } },
    ],
    consumerFacing: "<strong>Indirect.</strong> Connected-bar IoT touches consumers via on-trade campaigns. Most AI is back-office (Global Brain, smart brewery, SAP cloud).",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/25830-carlsberg-group-azure-openai-in-foundry-models" }], note: "Global Brain GenAI knowledge base built in 2 days with Microsoft Unified. Foundry Models is the foundation-model layer." },
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Azure OpenAI Foundry Models (Global Brain)",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Carlsberg Global Brain", url: "https://www.microsoft.com/en/customers/story/25830-carlsberg-group-azure-openai-in-foundry-models" },
        note: "GenAI knowledge base built in two days with Microsoft Unified. Foundry Models is the explicit foundation-model layer.",
      },
      {
        name: "Microsoft + Accenture — Azure cloud migration",
        status: "confirmed",
        caseStudy: { label: "Accenture — Carlsberg cloud innovation", url: "https://www.accenture.com/us-en/case-studies/cloud/carlsberg-cloud-innovation" },
        note: "Full SAP-on-Azure migration: 873 → 350 applications; 600 servers cloud-migrated.",
      },
      { name: "PTC (IoT for brewery + connected bar)", status: "confirmed" },
      { name: "Zscaler (zero-trust network)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft + Accenture house. Azure OpenAI Foundry Models is the foundation-model layer. No public Google Cloud / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: reported revenue +18.8% (Britvic), op profit +22.7% reported, organic OP +5.0%. 2026 guide: organic OP growth 2-6%. Britvic integration is the swing factor." },
    { lead: "AI posture.", body: "Performer. Global Brain on Azure OpenAI Foundry Models, full SAP-on-Azure (873→350 apps), PTC smart brewery + connected bar IoT, Zscaler zero-trust. Sarah Haywood as CTO is unusual + strong signal." },
    { lead: "Vendor footprint.", body: "Microsoft house. Azure OpenAI Foundry Models is the GenAI commitment. Anthropic / Google / AWS / OpenAI-direct / Mistral not disclosed. PTC is the disclosed IoT and manufacturing partner." },
  ],
  sources: [
    { label: "Carlsberg Group — FY2025 financial statement", url: "https://www.carlsberggroup.com/newsroom/fy-2025-financial-statement/" },
    { label: "Carlsberg Group — FY2025 results presentation", url: "https://www.carlsberggroup.com/reports-downloads/fy-2025-financial-statement-presentation/" },
    { label: "Microsoft Customer Story — Carlsberg Global Brain Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/25830-carlsberg-group-azure-openai-in-foundry-models" },
    { label: "Accenture — Carlsberg cloud innovation case study", url: "https://www.accenture.com/us-en/case-studies/cloud/carlsberg-cloud-innovation" },
    { label: "PTC — Carlsberg digital transformation IoT case study", url: "https://www.ptc.com/en/case-studies/autoware-carlsberg-scale-digital-transformation" },
    { label: "Zscaler Customers — Carlsberg Group", url: "https://www.zscaler.com/customers/carlsberg-group" },
    { label: "CIO — Carlsberg CTO Sarah Haywood AI-infused beers", url: "https://www.cio.com/article/200293/carlsberg-cto-sarah-haywood-brews-disruption-on-new-hybrid-network.html" },
    { label: "Carlsberg Group — 2025 Annual Report", url: "https://www.marketscreener.com/news/carlsberg-a-s-group-2025-annual-report-ce7e5adadc8cf722" },
  ],
  askPrompts: [
    "What did Carlsberg report in FY2025?",
    "What is Carlsberg's Global Brain on Azure OpenAI?",
    "How is Carlsberg's smart brewery using IoT?",
    "Who is Sarah Haywood and why does Carlsberg have a CTO seat?",
  ],
};

// =============================================================================
// Carrefour — FY2025 + Carrefour 2030 plan; major OpenAI/ChatGPT story
// =============================================================================
export const carrefour_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-18" },
    lastReported: { label: "Q1 2026 sales", date: "2026-04-22" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 + Carrefour 2030 plan published 18 Feb 2026. Q1 2026 sales €21.1B (+2.5% c/c) published 22 Apr 2026. ChatGPT grocery shopping launched 27 Mar 2026.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · Q1 2026 reported",
    headline: {
      revenue: { value: "€91.5B", reported: "+1%", organic: "+2.8% LFL", note: "FY2025 group sales" },
      opMargin: {
        value: "2.6%",
        growth: { absolute: "Op margin 2.9% ex Cora & Match integration", basis: "Net income €319M (vs €723M FY2024) on higher tax + integration costs" },
        note: "FY2030 target 3.5%",
      },
      employees: { value: "335K" },
    },
    operatingComplexity: {
      hq: { value: "France 🇫🇷" },
      countries: { value: "8 (operating)", note: "France + Spain + Italy + Belgium + Romania + Argentina + Brazil + Taiwan" },
      brands: { value: "5+", note: "Carrefour, Cora, Match (acquired 2024), Atacadão, Drogarias Pacheco" },
      stores: { value: "~13,500" },
    },
    whyMatters: "Largest European grocer by store count. AI lands at every level: ChatGPT-native shopping, GenAI assistant Hopla, Vusion smart shelves, Google partnerships, €3B digital investment, Carrefour 2030 plan stakes growth on AI + data.",
    quarterlyUpdate: {
      label: "Q1 2026 sales",
      date: "22 April 2026",
      blurb: "Steady commercial momentum confirms FY2026 targets. €21.1B sales, +2.5% c/c, +2.2% LFL. Food +2.6% LFL led the quarter; non-food slightly down. Brazil softer on lower food inflation.",
      metrics: [
        { label: "Group sales", value: "€21.1B", trend: "+2.5% c/c" },
        { label: "LFL sales", value: "+2.2%", trend: "Food +2.6% / non-food -0.7%" },
        { label: "France LFL", value: "+1.4%", trend: "Steady home market" },
        { label: "Spain LFL", value: "+3.1%", trend: "Strongest region" },
        { label: "Brazil LFL", value: "-0.8%", trend: "Lower food inflation drag" },
        { label: "Reported total", value: "+0.5%", trend: "-2.1% FX headwind" },
      ],
      reading: "Solid execution against the Carrefour 2030 plan. Hopla GenAI + ChatGPT grocery integration are the AI proof points; Vusion smart shelves continue rolling. FY2026 targets reaffirmed.",
      source: { label: "Carrefour — Q1 2026 sales press release", url: "https://www.carrefour.com/en/news/2026/q1-2026-sales" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 5, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "All-in on AI as growth strategy.",
      body: "Carrefour 2030 makes AI one of three growth pillars. The 27 Mar 2026 ChatGPT grocery-shopping launch (full grocery service inside ChatGPT) is the boldest AI move on the watchlist. Hopla GenAI assistant powered by OpenAI is fully deployed across European apps.",
    },
    dedicatedSection: {
      headline: "AI carved out as a strategic pillar in the 2030 plan.",
      body: "€3B digital investment by 2026; partnerships with OpenAI, Google, Vusion, Bain &amp; Company; 3.5% margin target driven partly by AI productivity. Most aggressive AI investor narrative in grocery.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Elodie Perthuisot</strong> · Executive Director, E-commerce, Data &amp; Digital Transformation. Internal AI agenda owner. Reports up through CEO Alexandre Bompard.",
      source: { label: "Infotech Lead — Carrefour drives digital, AI and tech transformation", url: "https://infotechlead.com/cio/carrefour-drives-digital-ai-and-tech-transformation-with-e3-bn-investment-and-e21-1-bn-q1-2026-sales-95382" },
    },
    appointmentsNote: "E-commerce + Data + Digital fused under one ExCo seat — clear AI accountability at executive level.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>ChatGPT grocery shopping</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· OpenAI</span> — Full grocery shopping service launched inside ChatGPT on 27 Mar 2026. World-first hyperscaler-grocery AI integration.",
          source: { label: "PPC Land — Carrefour bets on AI, ChatGPT, smart shelves", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" },
        },
        {
          html: "<strong>Hopla</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· OpenAI</span> — GenAI assistant fully deployed across Carrefour European apps (recipes, lists, recommendations).",
          source: { label: "Brand Sensitize — Carrefour digital leap AI quick commerce", url: "https://brandsensitize.com/carrefours-digital-leap/" },
        },
        {
          html: "<strong>Vusion smart shelves</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· VusionGroup</span> — AI-powered electronic shelf labels + dynamic pricing across European stores.",
          source: { label: "PPC Land — Carrefour smart shelves Vusion", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" },
        },
        {
          html: "<strong>Bain &amp; Company + Microsoft/OpenAI partnership</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Bain + Microsoft</span> — Strategic + technology partnership for AI-driven transformation in 2030 plan.",
          source: { label: "Carrefour Group — FY2025 results", url: "https://www.carrefour.com/en/news/2026/fy-2025-results" },
        },
      ],
    },
    consumerFacing: "<strong>Yes, marquee.</strong> ChatGPT grocery shopping (Mar 2026) is the cleanest direct-to-consumer GenAI surface on the watchlist. Hopla is in every European app.",
    genAI: { mentioned: true, vendors: [{ name: "OpenAI (ChatGPT, Hopla)" }, { name: "Microsoft (via Bain)" }, { name: "Google" }, { name: "Vusion" }], note: "OpenAI-direct relationship is rare on the watchlist. Carrefour is one of few EU retailers with a named OpenAI grocery integration." },
    stackTable: [
      { layer: "Foundation model + consumer GenAI", product: "OpenAI (ChatGPT + Hopla)", use: "Grocery shopping inside ChatGPT + Hopla assistant in apps", source: { label: "PPC Land — Carrefour ChatGPT smart shelves", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" } },
      { layer: "Smart shelves", product: "VusionGroup", use: "Electronic shelf labels + dynamic pricing", source: { label: "PPC Land — Carrefour Vusion partnership", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" } },
      { layer: "Strategic partner", product: "Bain &amp; Company + Microsoft/OpenAI", use: "AI transformation programme inside Carrefour 2030", source: { label: "Carrefour — FY2025 results", url: "https://www.carrefour.com/en/news/2026/fy-2025-results" } },
      { layer: "Cloud", product: "Google Cloud", use: "Cloud + retail AI", source: { label: "Brand Sensitize — Carrefour digital leap", url: "https://brandsensitize.com/carrefours-digital-leap/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "OpenAI — ChatGPT grocery shopping + Hopla",
        status: "confirmed",
        caseStudy: { label: "PPC Land — Carrefour ChatGPT integration", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" },
        note: "First grocery service inside ChatGPT (27 Mar 2026). Hopla GenAI assistant deployed across European apps. OpenAI-direct relationship is unusually deep for an EU retailer.",
      },
      {
        name: "VusionGroup — smart shelves AI",
        status: "confirmed",
        caseStudy: { label: "PPC Land — Carrefour x Vusion smart shelves", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" },
        note: "AI-powered electronic shelf labels + dynamic pricing across European stores.",
      },
      { name: "Microsoft (via Bain &amp; Company)", status: "confirmed" },
      { name: "Google (cloud + retail partnerships)", status: "confirmed" },
      { name: "Bain &amp; Company (transformation partner)", status: "confirmed" },
      { name: "Anthropic", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "OpenAI-direct + Google + Microsoft (via Bain) — multi-hyperscaler approach. ChatGPT grocery integration is a watchlist-first. Anthropic / Mistral / AWS absent.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €91.5B (+2.8% LFL), op margin 2.6% (2.9% ex-integration), net income €319M. Q1 2026 sales €21.1B. Carrefour 2030 plan targets 3.5% margin, €5B FCF, with AI as core pillar." },
    { lead: "AI posture.", body: "Performer · 4.5 — possibly the most aggressive AI rhetoric on the watchlist. ChatGPT grocery shopping (Mar 2026), Hopla GenAI assistant, Vusion smart shelves, €3B digital investment by 2026." },
    { lead: "Vendor footprint.", body: "OpenAI-direct relationship + Google + Microsoft (via Bain). One of few EU retailers with a named OpenAI grocery integration. Anthropic / Mistral / AWS not disclosed. The Bain partnership is the disclosed transformation vehicle." },
  ],
  sources: [
    { label: "Carrefour Group — FY2025 results", url: "https://www.carrefour.com/en/news/2026/fy-2025-results" },
    { label: "Retail Insight — Carrefour 2025 sales grow", url: "https://www.retail-insight-network.com/news/carrefour-2025-sales-grow/" },
    { label: "PPC Land — Carrefour bets on AI, ChatGPT, smart shelves", url: "https://ppc.land/carrefour-bets-on-ai-chatgpt-and-smart-shelves-to-win-european-retail/" },
    { label: "Infotech Lead — Carrefour digital, AI and tech transformation", url: "https://infotechlead.com/cio/carrefour-drives-digital-ai-and-tech-transformation-with-e3-bn-investment-and-e21-1-bn-q1-2026-sales-95382" },
    { label: "Brand Sensitize — Carrefour digital leap (AI + quick commerce)", url: "https://brandsensitize.com/carrefours-digital-leap/" },
    { label: "Carrefour — Group profile + investor centre", url: "https://www.carrefour.com/en/group" },
  ],
  askPrompts: [
    "What did Carrefour announce in its 2030 plan?",
    "How does Carrefour's ChatGPT grocery shopping work?",
    "What is Hopla and which apps run it?",
    "Who runs AI and digital at Carrefour?",
  ],
};

// =============================================================================
// Colruyt Group — FY2024/25 (Belgian retailer); TCS algorithmic pricing
// =============================================================================
export const colruyt_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2024/25", date: "2025-06-26" },
    lastReported: { label: "FY2024/25 annual results", date: "2025-06-26" },
    next: { label: "H1 2025/26 interim", date: "December 2025" },
    blurb: "Belgian fiscal year ends March. FY2024/25 published 26 Jun 2025. H1 2025/26 due Dec 2025. FY2025/26 due mid-2026.",
  },
  investor: {
    fiscalYearLabel: "FY2024/25 baseline",
    headline: {
      revenue: { value: "€11.0B", reported: "+1.1%", note: "FY2024/25 (52w to Mar 2025)" },
      opMargin: {
        value: "EBIT €213M",
        growth: { absolute: "EBIT -€40M", pct: "-15.8%", basis: "EBIT FY2024/25 vs FY2023/24; intensified Belgian competition + lower food inflation" },
        note: "Gross margin held at 30.0%",
      },
      employees: { value: "33K" },
    },
    operatingComplexity: {
      hq: { value: "Belgium 🇧🇪" },
      countries: { value: "3", note: "Belgium + France + Luxembourg" },
      brands: { value: "7+", note: "Colruyt Lowest Prices, OKay, Spar, Comarkt/Comarché, Bio-Planet, DreamLand, DATS 24" },
      stores: { value: "1,700+", note: "700+ owned + 1,000+ affiliated" },
    },
    whyMatters: "Belgian discount retail at scale. AI levers: algorithmic pricing (TCS partnership, the best public artefact), warehouse automation (autonomous mobile robots), demand forecasting. Margin under pressure (-15.8% EBIT) makes AI a margin-defence tool.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 3.0", rhetoric: 2, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Algorithmic-pricing fortress.",
      body: "Colruyt's brand promise is lowest-price-in-Belgium. The TCS Next-Gen Pricing Engine processes 50M reaction prices per day, scanning 100K+ competitor prices. Quietly the most production-grade algorithmic-pricing AI in EU grocery.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Stefan Goethaert</strong> · Member of the Board of Directors, responsible for IT &amp; Digital. Carries technology agenda; family-controlled board structure means tech stays close to the founding-family operating model.",
      source: { label: "Colruyt Group — investor relations / leadership", url: "https://www.colruytgroup.com/en/about-us/our-mission" },
    },
    appointmentsNote: "Family-controlled cooperative-style governance. Less external visibility on individual AI/data leaders than publicly-listed peers.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Next-Gen Pricing Engine</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· TCS</span> — Algorithmic + near real-time. 100K+ competitor prices scanned, 50M reaction prices/day. In-parallel memory processing.",
          source: { label: "TCS Case Study — Colruyt algorithmic pricing", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyts-algorithmic-pricing-advantage" },
        },
        {
          html: "<strong>Autonomous mobile robots (warehouse)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· TCS-led integration</span> — Picking-productivity AMRs deployed in distribution centres.",
          source: { label: "TCS Case Study — Colruyt autonomous mobile robots", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyt-autonomous-mobile-robots-order-fulfilment" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Pricing engine:</strong> 100K+ competitor prices scanned, 50M reaction prices processed per day. Near-real-time price recommendations across products, linked items, stores, channels, brands.",
      source: { label: "TCS — Colruyt algorithmic pricing case study", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyts-algorithmic-pricing-advantage" },
    },
    consumerFacing: "<strong>Indirect.</strong> Algorithmic pricing shows up at the shelf. No flagship consumer-facing GenAI app.",
    genAI: { mentioned: false, note: "No public GenAI-vendor case study. Colruyt's AI is operational analytics and pricing automation, not generative." },
    stackTable: [
      { layer: "Pricing AI", product: "TCS Next-Gen Pricing Engine", use: "Algorithmic, near-real-time pricing across products + stores + channels", source: { label: "TCS — Colruyt algorithmic pricing", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyts-algorithmic-pricing-advantage" } },
      { layer: "Warehouse robotics", product: "Autonomous mobile robots (TCS)", use: "Picking productivity in DCs", source: { label: "TCS — Colruyt AMRs", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyt-autonomous-mobile-robots-order-fulfilment" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "TCS — algorithmic pricing + warehouse robotics",
        status: "confirmed",
        caseStudy: { label: "TCS Case Study — Colruyt algorithmic pricing", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyts-algorithmic-pricing-advantage" },
        note: "Anchor systems-integrator partner. Two published case studies (pricing engine + warehouse AMRs).",
      },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "TCS-anchored. Notably no public hyperscaler relationship. No Microsoft, Google, Anthropic, OpenAI-direct, or Mistral relationship is disclosed. No customer-facing GenAI has shipped.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2024/25: revenue €11.0B (+1.1%), EBIT €213M (-15.8%), gross margin 30.0%. Belgian market share 29.0% (down from 29.3%). Margin pressure makes AI a defence tool, not a growth one." },
    { lead: "AI posture.", body: "Silent Builder. TCS-anchored algorithmic pricing (50M reaction prices/day) + warehouse robotics. No GenAI / hyperscaler footprint publicly. Family-controlled governance keeps tech narrative close." },
    { lead: "Vendor footprint.", body: "No public Microsoft / Google / AWS / Anthropic / OpenAI / Mistral relationship yet." },
  ],
  sources: [
    { label: "Colruyt Group — FY2024/25 financial results", url: "https://www.marketscreener.com/quote/stock/COLRUYT-GROUP-N-V-5976/news/Colruyt-N-Consolidated-annual-information-on-the-financial-year-2024-25-50259282/" },
    { label: "Colruyt Group — Annual reports", url: "https://www.colruytgroup.com/en/investor-relations/annual-reports" },
    { label: "Colruyt Group — Financial press releases", url: "https://www.colruytgroup.com/en/investor-relations/financial-communication/financial-press-releases" },
    { label: "TCS Case Study — Colruyt algorithmic pricing", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyts-algorithmic-pricing-advantage" },
    { label: "TCS Case Study — Colruyt autonomous mobile robots", url: "https://www.tcs.com/what-we-do/industries/retail/case-study/colruyt-autonomous-mobile-robots-order-fulfilment" },
    { label: "Colruyt Group — Investor relations hub", url: "https://www.colruytgroup.com/en/investor-relations" },
  ],
  askPrompts: [
    "What did Colruyt report for FY2024/25?",
    "How does Colruyt's TCS algorithmic pricing engine work?",
    "What's Colruyt's warehouse automation footprint?",
    "Why doesn't Colruyt have a public hyperscaler relationship?",
  ],
};

// =============================================================================
// Danone — FY2025 + multi-year Microsoft AI partnership; Databricks OneSource 2.0
// =============================================================================
export const danone_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-25" },
    lastReported: { label: "Q1 2026 results", date: "2026-04-22" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 published 25 Feb 2026. Q1 2026 published 22 Apr 2026 (€6.7B, +2.7% LFL, vol/mix +1.5%). FY26 guide reaffirmed at +3-5% LFL.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€27.3B", reported: "+0.1%", organic: "+4.5% LFL", note: "Volume/mix +2.7%, price +1.8%; -4.4% FX drag" },
      opMargin: {
        value: "13.4%",
        growth: { absolute: "+44bps", pct: "+44bps", basis: "Recurring OP margin FY2025 vs FY2024" },
        note: "EPS €3.80 (+4.6%); FCF €2.8B",
      },
      employees: { value: "90K" },
    },
    operatingComplexity: {
      hq: { value: "France 🇫🇷" },
      countries: { value: "120+" },
      brands: { value: "8+", note: "Danone, Activia, Actimel, Evian, Volvic, Nutricia, Aptamil, Alpro" },
    },
    whyMatters: "Dairy + waters + medical nutrition + plant-based at scale (90K staff). AI levers: supply-chain, customer service / order management, marketing creative, R&D. Microsoft + Databricks + Google Cloud is the cleanest multi-hyperscaler footprint in CPG dairy.",
    quarterlyUpdate: {
      label: "Q1 2026 results",
      date: "22 April 2026",
      blurb: "Solid Q1 amid FX drag. €6.71B (+2.7% LFL, vol/mix +1.5%, price +1.2%); reported -2.0% on -5.6% FX (USD/ARS/IDR/RMB). FY26 +3-5% LFL guide held.",
      metrics: [
        { label: "Net sales", value: "€6.71B", trend: "-2.0% reported / +2.7% LFL" },
        { label: "Volume / mix", value: "+1.5%", trend: "Price +1.2%" },
        { label: "EMEA LFL", value: "+0.6%", trend: "Vol/mix -1.4%, price +2.0%" },
        { label: "Americas LFL", value: "+3.4%", trend: "Vol/mix +2.5%" },
        { label: "APAC LFL", value: "+6.0%", trend: "Vol/mix +6.2%" },
      ],
      reading: "Hydration + protein resilience offsets FX. Microsoft AI partnership + Copilot + autonomous order-processing agents continue scaling — H1 will quantify productivity impact.",
      source: { label: "Danone — Q1 2026 results", url: "https://www.danone.com/newsroom/press-releases/q1-results-2026.html" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Multi-year Microsoft AI partnership at the centre.",
      body: "Danone announced a multi-year Microsoft collaboration: Danone Microsoft AI Academy upskills all employees; 50K Danone staff already use Copilot; autonomous agents transform order processing (faster billing, fewer disputes). Plus Databricks OneSource 2.0 cuts data-to-decision time -30%.",
    },
    dedicatedSection: {
      headline: "AI carved out at investor level.",
      body: "Renew Danone strategy explicitly carves out AI capability investment. Recurring 13.4% OP margin (+44bps) is partly an AI productivity story.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Bertrand Bodson</strong> · Chief Growth and Digital Officer (CGDO) — leads digital + AI transformation. <strong>Antoine de Saint-Affrique</strong> · CEO. Bodson previously CDO at Novartis and Sainsbury's; deep enterprise AI / data CV.",
      source: { label: "Danone — Microsoft AI partnership announcement", url: "https://www.danone.com/newsroom/press-releases/danone-collaborates-with-microsoft-to-accelerate-ai.html" },
    },
    appointmentsNote: "Growth + Digital fused under one C-suite seat. Strong AI accountability at executive level.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Microsoft 365 Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Deployed to 50,000 Danone employees as part of the multi-year AI partnership.",
          source: { label: "Microsoft Customer Story — Danone M365 Copilot + autonomous agents", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" },
        },
        {
          html: "<strong>Autonomous order-processing agents</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft AI</span> — Validation workflows speed up order handling, reduce billing disputes, cut payment delays. Direct cash-flow impact.",
          source: { label: "Microsoft Customer Story — Danone autonomous agents", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" },
        },
        {
          html: "<strong>OneSource 2.0</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Databricks Data Intelligence Platform</span> — Modernised data foundation. Reduces 'data-to-decision' time by up to 30%.",
          source: { label: "Databricks — Danone OneSource 2.0 announcement", url: "https://www.databricks.com/company/newsroom/press-releases/danone-adopts-databricks-data-intelligence-platform-enable-smarter" },
        },
        {
          html: "<strong>Danone Microsoft AI Academy</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Internal academy upskilling all Danone employees on AI &amp; digital tools.",
          source: { label: "Food Dive — Danone-Microsoft partnership", url: "https://www.fooddive.com/news/danone-microsoft-AI-partnership-investment-jobs-artificial-intelligence-tech-yogurt-dairy/722287/" },
        },
        {
          html: "<strong>Google Cloud commerce</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud</span> — Modular commerce tools deployed on Google Cloud for cross-market flexibility.",
          source: { label: "GlobalData — Danone enterprise tech analysis", url: "https://www.globaldata.com/store/report/danone-enterprise-tech-analysis/" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Microsoft Copilot:</strong> 50,000 employees with Copilot access. <strong>Autonomous agents:</strong> faster order handling, reduced billing disputes, dropped payment delays (cash-flow impact). <strong>Databricks OneSource 2.0:</strong> -30% data-to-decision time.",
      source: { label: "Microsoft Customer Story — Danone scale operations with AI", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" },
    },
    consumerFacing: "<strong>Indirect.</strong> Most Danone AI is back-office (order processing, supply chain, marketing analytics, employee productivity). No flagship consumer GenAI surface yet.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft 365 Copilot", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" }, { name: "Microsoft autonomous agents" }, { name: "Databricks", url: "https://www.databricks.com/company/newsroom/press-releases/danone-adopts-databricks-data-intelligence-platform-enable-smarter" }, { name: "Google Cloud" }], note: "Multi-vendor GenAI/AI footprint anchored on Microsoft, with Databricks as the data layer and Google Cloud for commerce." },
    stackTable: [
      { layer: "GenAI / foundation model", product: "Microsoft 365 Copilot", use: "50K employees; productivity + creative + ops", source: { label: "Microsoft — Danone Copilot customer story", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" } },
      { layer: "Autonomous AI agents", product: "Microsoft AI agents", use: "Order processing automation; billing dispute reduction", source: { label: "Microsoft — Danone autonomous agents", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" } },
      { layer: "Data intelligence", product: "Databricks (OneSource 2.0)", use: "-30% data-to-decision time", source: { label: "Databricks — Danone OneSource 2.0", url: "https://www.databricks.com/company/newsroom/press-releases/danone-adopts-databricks-data-intelligence-platform-enable-smarter" } },
      { layer: "Cloud + commerce", product: "Google Cloud", use: "Modular commerce tools across markets", source: { label: "GlobalData — Danone enterprise tech analysis", url: "https://www.globaldata.com/store/report/danone-enterprise-tech-analysis/" } },
      { layer: "Upskilling", product: "Microsoft AI Academy", use: "All-employee AI capability building", source: { label: "Food Dive — Danone Microsoft AI partnership", url: "https://www.fooddive.com/news/danone-microsoft-AI-partnership-investment-jobs-artificial-intelligence-tech-yogurt-dairy/722287/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — multi-year AI partnership (Copilot + autonomous agents + AI Academy)",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Danone scale operations with AI &amp; autonomous agents", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" },
        note: "Marquee partnership. 50K employees on Copilot, autonomous agents in order processing, dedicated Microsoft AI Academy. Public Danone press release confirms multi-year scope.",
      },
      {
        name: "Databricks — OneSource 2.0",
        status: "confirmed",
        caseStudy: { label: "Databricks — Danone OneSource 2.0 partnership", url: "https://www.databricks.com/company/newsroom/press-releases/danone-adopts-databricks-data-intelligence-platform-enable-smarter" },
        note: "-30% data-to-decision time. Danone's named data intelligence platform.",
      },
      {
        name: "Google Cloud — commerce tooling",
        status: "confirmed",
        caseStudy: { label: "GlobalData — Danone digital transformation strategies", url: "https://www.globaldata.com/store/report/danone-enterprise-tech-analysis/" },
        note: "Modular commerce across markets. Less prominent than Microsoft but confirmed.",
      },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft is the marquee partner via the multi-year AI deal + dedicated Microsoft AI Academy. Databricks anchors the data layer. Google Cloud is in for commerce. No public Anthropic / OpenAI-direct / Mistral / AWS footprint.",
  },
  byMaison: {
    maisons: [
      { brand: "Danone (master)", description: "Master dairy brand. Activia + Actimel sit underneath. Microsoft AI deployed at HQ; benefits flow through brand operations." },
      { brand: "Evian / Volvic", description: "Waters portfolio. Supply-chain AI (Databricks-driven forecasting) is the operational story." },
      { brand: "Nutricia + Aptamil", description: "Specialised medical nutrition. AI work on R&D / regulatory data more sensitive (less public)." },
      { brand: "Alpro", description: "Plant-based portfolio. Innovation pipeline benefits from Danone Microsoft AI Academy upskilling." },
    ],
    note: "Brand-level AI not yet visible in distinct campaigns. Group-level Microsoft + Databricks footprint serves all brands today.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: €27.3B (+4.5% LFL), recurring OP margin 13.4% (+44bps), recurring EPS €3.80 (+4.6%), FCF €2.8B. 2026 guide: +3-5% LFL, OP growth > sales growth." },
    { lead: "AI posture.", body: "Performer. Multi-year Microsoft AI partnership (50K Copilot users + autonomous agents + AI Academy) + Databricks OneSource 2.0 (-30% data-to-decision) + Google Cloud commerce. Bertrand Bodson as CGDO is the AI face." },
    { lead: "Vendor footprint.", body: "Microsoft is the marquee. Databricks anchors data, Google Cloud handles commerce. No Anthropic, OpenAI-direct, Mistral, or AWS relationship disclosed, including on the R&D and regulatory data side." },
  ],
  sources: [
    { label: "Danone — FY2025 results press release", url: "https://www.danone.com/newsroom/press-releases/full-year-results-2025.html" },
    { label: "Danone — FY2025 Aide-Memoire", url: "https://www.danone.com/content/dam/corp/global/danonecom/investors/aide-memoire/2025/aidememoiredanoneFY25.pdf" },
    { label: "Danone — Microsoft AI partnership press release", url: "https://www.danone.com/newsroom/press-releases/danone-collaborates-with-microsoft-to-accelerate-ai.html" },
    { label: "Microsoft Customer Story — Danone scale ops with M365 Copilot &amp; AI agents", url: "https://www.microsoft.com/en/customers/story/25506-danone-microsoft-365-copilot" },
    { label: "Databricks — Danone OneSource 2.0", url: "https://www.databricks.com/company/newsroom/press-releases/danone-adopts-databricks-data-intelligence-platform-enable-smarter" },
    { label: "Food Dive — Danone-Microsoft partnership", url: "https://www.fooddive.com/news/danone-microsoft-AI-partnership-investment-jobs-artificial-intelligence-tech-yogurt-dairy/722287/" },
    { label: "ConsumerGoods.com — Danone Microsoft AI partnership", url: "https://consumergoods.com/danone-optimize-supply-chain-and-workforce-microsoft-ai-partnership" },
    { label: "FoodNavigator — Danone-Microsoft AI accelerator (2020 origins)", url: "https://www.foodnavigator.com/Article/2020/02/18/Danone-Microsoft-join-forces-for-AI-accelerator-The-success-of-the-food-revolution-will-depend-on-data/" },
  ],
  askPrompts: [
    "What did Danone report in FY2025?",
    "What's in the multi-year Danone-Microsoft AI partnership?",
    "How does Danone's OneSource 2.0 on Databricks work?",
    "Who is Bertrand Bodson and what does the CGDO role cover?",
  ],
};

// =============================================================================
// Decathlon — privately-held; FY2025 €16.8B (+4%); CDO-led tech org
// =============================================================================
export const decathlon_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-04-08" },
    lastReported: { label: "FY2025 performance release", date: "2026-04-08" },
    next: { label: "FY2026 mid-year update", date: "Q3 2026" },
    blurb: "Privately-held; FY2025 performance published 8 Apr 2026 (€16.8B revenue, +4%). No quarterly cadence.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€16.8B", reported: "+4.0%", organic: "GMV +7.1%", note: "FY2025 net sales (~$19.4B); 1.23B products sold" },
      opMargin: {
        value: "EBITDA €1.8B",
        growth: { absolute: "Net income €910M", pct: "+16% net income · +21% EBITDA", basis: "FY2025 vs FY2024" },
        note: "Highest profit growth in years",
      },
      employees: { value: "104K" },
    },
    operatingComplexity: {
      hq: { value: "France 🇫🇷" },
      countries: { value: "80+" },
      stores: { value: "1,902" },
      brands: { value: "7", note: "Decathlon (master), Quechua, Kalenji, Domyos, Btwin, Tribord, Solognac" },
    },
    whyMatters: "Sports retail at scale (1,902 stores, 1.23B products/yr). AI levers: in-store self-checkout (RFID), supply-chain forecasting, e-commerce personalisation, and product design. Privately-held = lower transparency.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 3.0", rhetoric: 2, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Operations-led AI, RFID + planning.",
      body: "Decathlon's AI footprint is most visible in RFID self-checkout, planning (o9 CIO panel mentions), and 5,750-person digital org under Almendares. Less rhetoric than peers; CEO Javier López has retail + digital + logistics depth.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Jimena Almendares</strong> · Global Chief Digital Officer (leads 5,750 digital professionals across e-commerce, supply chain, manufacturing). <strong>Jerome Dubreuil</strong> · Chief Innovation Officer (RFID, circular economy). <strong>Javier López</strong> · CEO (with 26y at Decathlon spanning digital + logistics + retail).",
      source: { label: "Decathlon — new leadership announcement", url: "https://www.decathlon-united.media/pressfiles/new-leadership-decathlon" },
    },
    appointmentsNote: "Two-headed digital structure (CDO + CInnO) plus a digitally-fluent CEO — similar to IKEA's Coppola legacy.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>RFID-based self-checkout</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal RFID + computer vision</span> — In-store self-checkout via RFID-tagged inventory; reduces queue + theft.",
          source: { label: "Decathlon — Jerome Dubreuil podcast on RFID + circular", url: "https://rethink.industries/podcast/jerome-dubreuil-global-chief-digital-officer-at-decathlon/" },
        },
        {
          html: "<strong>Integrated planning</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· o9 Solutions (panel attendance)</span> — Decathlon's Tech leaders publicly attend o9 CIO panels on retail planning transformation.",
          source: { label: "o9 Solutions — CIO panel retail planning transformation", url: "https://o9solutions.com/articles/cio-panel-how-technology-leaders-are-powering-retail-planning-transformations" },
        },
      ],
    },
    consumerFacing: "<strong>Indirect.</strong> RFID self-checkout is consumer-touched but not GenAI. No flagship consumer GenAI yet.",
    genAI: { mentioned: false, note: "No public GenAI vendor case study. Operational AI (planning, RFID, supply chain) dominates." },
  },
  vendorStack: {
    namedPartners: [
      {
        name: "o9 Solutions — integrated planning (CIO-level engagement)",
        status: "confirmed",
        caseStudy: { label: "o9 Solutions — CIO panel on retail planning", url: "https://o9solutions.com/articles/cio-panel-how-technology-leaders-are-powering-retail-planning-transformations" },
        note: "Public engagement signal; shared o9 footprint with AB InBev, Pernod Ricard, Barilla.",
      },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler partnership today. RFID + planning anchored on internal tech + o9. No Microsoft, Google, Anthropic, OpenAI, or Mistral relationship is disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: €16.8B revenue (+4%), GMV +7.1%, EBITDA €1.8B (+21%), net income €910M (+16%). 1,902 stores in 80+ countries. Privately-held — lower public transparency than listed peers." },
    { lead: "AI posture.", body: "Silent Builder. Operational AI (RFID self-checkout, integrated planning via o9). 5,750-person digital org under Almendares; new CEO Javier López has digital + logistics depth." },
    { lead: "Vendor footprint.", body: "No public hyperscaler relationship. o9 and RFID are the disclosed infrastructure anchors." },
  ],
  sources: [
    { label: "Decathlon — FY2025 performance release", url: "https://www.decathlon-united.media/pressfiles/2025results" },
    { label: "Decathlon — Key figures 31.12.2025", url: "https://www.decathlon-united.media/en_GB/key-figures" },
    { label: "SGB Online — Decathlon 2025 profits +16%", url: "https://sgbonline.com/exec-decathlons-2025-profits-climb-16-percent-on-4-percent-revenue-gain/" },
    { label: "Decathlon — new CEO Javier López announcement", url: "https://www.decathlon-united.media/pressfiles/new-leadership-decathlon" },
    { label: "Rethink Industries podcast — Jerome Dubreuil on digital + RFID", url: "https://rethink.industries/podcast/jerome-dubreuil-global-chief-digital-officer-at-decathlon/" },
    { label: "o9 Solutions — CIO panel retail planning (Decathlon engagement)", url: "https://o9solutions.com/articles/cio-panel-how-technology-leaders-are-powering-retail-planning-transformations" },
    { label: "Decathlon — investor / Group communications hub", url: "https://www.decathlon-united.media" },
  ],
  askPrompts: [
    "What did Decathlon report for FY2025?",
    "How does Decathlon use RFID for self-checkout?",
    "Who is Jimena Almendares and what is the Global CDO role?",
    "Who runs digital at Decathlon today?",
  ],
};

// =============================================================================
// Diageo — H1 FY2026 reported 4 Feb 2026; Project Halo + AWS Bedrock; AI bottles
// =============================================================================
export const diageo_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025 (52w to 30 Jun 2025)", date: "2025-08-05" },
    lastReported: { label: "Q3 FY2026 Aide Memoire", date: "2026-04-14" },
    next: { label: "FY2026 prelim results (52w to 30 Jun 2026)", date: "Early August 2026" },
    blurb: "FY2025 ended Jun 2025. H1 FY2026 published 4 Feb 2026. Q3 FY26 Aide Memoire (no new trading commentary) issued 14 Apr 2026. FY2026 prelims early August.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · H1 FY2026 reported",
    headline: {
      revenue: { value: "$10.46B (H1)", reported: "Organic NSV -2.8%", note: "-0.5% ex-Chinese white spirits; H1 FY2026" },
      opMargin: {
        value: "29.8%",
        growth: { absolute: "+85bps reported", pct: "Org. OP -2.8%; reported OP $3.1B (-1.2%)", basis: "Reported margin lifted by disposals" },
        note: "FY26 guide: org NSV -2-3%",
      },
      employees: { value: "30K" },
    },
    operatingComplexity: {
      hq: { value: "United Kingdom 🇬🇧" },
      countries: { value: "180+" },
      brands: { value: "200+", note: "Johnnie Walker, Smirnoff, Don Julio, Tanqueray, Captain Morgan, Guinness, Casamigos, Crown Royal + 190 other premium brands" },
    },
    whyMatters: "Premium spirits + beer (Guinness) at scale. AI levers: brand creative (Project Halo), consumer trend insights (Foresight + Think Party), regulatory ad targeting, packaging personalisation.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "GenAI for brand + insights.",
      body: "Project Halo (AWS Bedrock + Titan) powers Johnnie Walker mass-personalised packaging — 50,000 unique bottle designs. The Think Party uses GenAI to synthesise cross-industry trend signals (Google + Pinterest + Tinder + Pepsi + Unilever + Kraft Heinz consortium). Diageo's Breakthrough Innovation team set up Jan 2024.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Cristina Diezhandino</strong> · Chief Marketing Officer — public on AI for marketing/consumer insights. Plus a dedicated Global Breakthrough Innovation team (set up Jan 2024) for AI/GenAI experiments. <strong>Debra Crew</strong> · CEO. Tech function reports through CMO + Group COO.",
      source: { label: "Marketing Dive — Diageo on AI for audience targeting", url: "https://www.marketingdive.com/news/how-ai-helping-diageo-target-audiences-navigate-regulatory-waters/729284/" },
    },
    appointmentsNote: "Marketing-led AI investment. Breakthrough Innovation team = the GenAI experimentation seat.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Project Halo</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· AWS Bedrock + Titan + Phantom + Hybrid Software + GMG + Roland DG</span> — GenAI mass label customisation. Johnnie Walker Princes Street produced 50,000 unique bottles. Largest GenAI print production at Diageo.",
          source: { label: "Diageo — Johnnie Walker AI bottle personalisation", url: "https://www.diageo.com/en/news-and-media/press-releases/2024/diageo-unveils-its-first-bottle-personalisation-experience-fuelled-by-generative-ai" },
        },
        {
          html: "<strong>The Think Party</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· cross-industry consortium</span> — GenAI synthesises cultural / consumer signals across Diageo, Kantar, Pinterest, Tinder, Google, Unilever, Pepsi Lipton, Kraft Heinz.",
          source: { label: "ConsumerGoods.com — Diageo Think Party AI consumer trends", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" },
        },
        {
          html: "<strong>Foresight System (proprietary)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — Scans cultural signals + consumer behaviours. Layered with external trend reports + GenAI synthesis.",
          source: { label: "ConsumerGoods.com — Diageo Foresight System", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" },
        },
        {
          html: "<strong>Don Julio spatial computing campaign</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Breakthrough Innovation team</span> — Spatial computing extension of campaign work via Diageo's Global Breakthrough Innovation team.",
          source: { label: "ConsumerGoods.com — Don Julio spatial computing", url: "https://consumergoods.com/diageos-new-global-breakthrough-innovation-team-brings-spatial-computing-don-julio-campaign" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Project Halo:</strong> 50,000 unique Johnnie Walker bottles produced via GenAI mass label customisation — largest production-grade GenAI print run at Diageo.",
      source: { label: "Spirits Business — Johnnie Walker AI 50K bottles", url: "https://www.thespiritsbusiness.com/2025/12/johnnie-walker-uses-ai-to-design-50000-unique-bottles/" },
    },
    consumerFacing: "<strong>Yes, marquee.</strong> Personalised AI bottles at Johnnie Walker Princes Street are direct-to-consumer GenAI. Don Julio spatial computing also consumer-touched.",
    genAI: { mentioned: true, vendors: [{ name: "AWS Bedrock + Titan", url: "https://www.diageo.com/en/news-and-media/press-releases/2024/diageo-unveils-its-first-bottle-personalisation-experience-fuelled-by-generative-ai" }, { name: "Google (Think Party member)" }], note: "AWS-direct relationship via Bedrock + Titan is rare on the watchlist. Google is in via the Think Party consortium." },
    stackTable: [
      { layer: "Foundation model + creative GenAI", product: "AWS Bedrock + Amazon Titan", use: "Project Halo mass label customisation", source: { label: "Diageo — Project Halo announcement", url: "https://www.diageo.com/en/news-and-media/press-releases/2024/diageo-unveils-its-first-bottle-personalisation-experience-fuelled-by-generative-ai" } },
      { layer: "Cross-industry GenAI", product: "The Think Party consortium", use: "Trend synthesis with Google, Pinterest, Tinder, Unilever, Pepsi, Kraft Heinz", source: { label: "ConsumerGoods.com — Think Party", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" } },
      { layer: "Internal GenAI", product: "Foresight System", use: "Cultural + consumer signal scan", source: { label: "ConsumerGoods.com — Foresight System", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "AWS — Bedrock + Titan (Project Halo)",
        status: "confirmed",
        caseStudy: { label: "Diageo — Project Halo Johnnie Walker AI announcement", url: "https://www.diageo.com/en/news-and-media/press-releases/2024/diageo-unveils-its-first-bottle-personalisation-experience-fuelled-by-generative-ai" },
        note: "Mass GenAI label personalisation on AWS foundation models. Rare AWS-direct watchlist relationship. 50K unique Johnnie Walker bottles produced.",
      },
      {
        name: "Google — Think Party consortium",
        status: "confirmed",
        caseStudy: { label: "ConsumerGoods.com — Diageo Think Party", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" },
        note: "Cross-industry GenAI insights consortium with Google, Pinterest, Tinder, Unilever, Pepsi, Kraft Heinz.",
      },
      { name: "Phantom (design agency)", status: "confirmed" },
      { name: "Hybrid Software", status: "confirmed" },
      { name: "GMG + Roland DG", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
    ],
    partnersNote: "AWS-direct (Bedrock + Titan) is unusual on the watchlist — Diageo is the cleanest AWS GenAI customer story among CPG peers. Google in via the Think Party. No public Microsoft / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Johnnie Walker", description: "Project Halo flagship. 50,000 unique AI-designed bottles at Princes Street. Largest GenAI print production at Diageo.", source: { label: "Spirits Business — Johnnie Walker 50K AI bottles", url: "https://www.thespiritsbusiness.com/2025/12/johnnie-walker-uses-ai-to-design-50000-unique-bottles/" } },
      { brand: "Don Julio", description: "Tequila brand using spatial computing in campaigns via the Breakthrough Innovation team.", source: { label: "ConsumerGoods.com — Don Julio spatial computing", url: "https://consumergoods.com/diageos-new-global-breakthrough-innovation-team-brings-spatial-computing-don-julio-campaign" } },
      { brand: "Guinness", description: "Beer flagship. Soft-and-fast brand work; benefits from Foresight System + Think Party consumer-trend insights." },
      { brand: "Smirnoff / Captain Morgan", description: "Mass premium portfolio. Marketing AI (Diezhandino-led) drives audience targeting under regulatory constraints." },
      { brand: "Casamigos / Crown Royal", description: "U.S. growth tier (Casamigos in tequila, Crown Royal in whiskey). Both lean on Foresight + AI consumer insights." },
    ],
    note: "Johnnie Walker is the marquee brand-level AI artefact. Don Julio next. Foresight + Think Party serve all brands at HQ-level.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "H1 FY26 (Dec 2025): organic NSV -2.8% to $10.46B; reported OP $3.1B (-1.2%), margin 29.8% (+85bps from disposals). FY26 guide cut to org NSV -2-3% on China + tariff drag." },
    { lead: "AI posture.", body: "Performer. Project Halo on AWS Bedrock + Titan (50K unique Johnnie Walker bottles) is the marquee creative-GenAI artefact. Foresight System + Think Party for consumer insights. Breakthrough Innovation team since Jan 2024." },
    { lead: "Vendor footprint.", body: "AWS-direct relationship is rare on the watchlist — Diageo's clearest distinguishing partner. Google in via Think Party. Microsoft / Anthropic / OpenAI-direct / Mistral not disclosed." },
  ],
  sources: [
    { label: "Diageo — H1 FY2026 interim results (4 Feb 2026)", url: "https://www.diageo.com/en/news-and-media/press-releases/2026/2026-interim-results-half-year-ended-31-december-2025" },
    { label: "Diageo — Annual Report 2025", url: "https://www.diageo.com/en/investors/results-reports-and-events/annual-report-2025" },
    { label: "Diageo — Project Halo / Johnnie Walker AI bottles", url: "https://www.diageo.com/en/news-and-media/press-releases/2024/diageo-unveils-its-first-bottle-personalisation-experience-fuelled-by-generative-ai" },
    { label: "Spirits Business — Johnnie Walker 50K AI bottles", url: "https://www.thespiritsbusiness.com/2025/12/johnnie-walker-uses-ai-to-design-50000-unique-bottles/" },
    { label: "ConsumerGoods.com — Diageo Think Party cross-industry AI", url: "https://consumergoods.com/diageo-creates-cross-industry-ai-enabled-think-party-pin-down-consumer-trends" },
    { label: "ConsumerGoods.com — Diageo Don Julio spatial computing", url: "https://consumergoods.com/diageos-new-global-breakthrough-innovation-team-brings-spatial-computing-don-julio-campaign" },
    { label: "Marketing Dive — Diageo AI for audience targeting", url: "https://www.marketingdive.com/news/how-ai-helping-diageo-target-audiences-navigate-regulatory-waters/729284/" },
    { label: "Beverage Daily — Diageo GenAI bottle for Johnnie Walker", url: "https://www.beveragedaily.com/Article/2024/07/25/Diageo-launches-generative-AI-bottle-for-Johnnie-Walker/" },
  ],
  askPrompts: [
    "What did Diageo report in H1 FY2026?",
    "What is Project Halo and how did it produce 50,000 Johnnie Walker bottles?",
    "What is Diageo's Think Party and which brands are part of it?",
    "Who runs the GenAI agenda at Diageo?",
  ],
};

// =============================================================================
// Essity — FY2025 published; Accenture + Microsoft AI agents partnership
// =============================================================================
export const essity_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-01-22" },
    lastReported: { label: "Q1 2026 results", date: "2026-04-23" },
    next: { label: "Q2 + H1 2026 results", date: "Mid-July 2026" },
    blurb: "FY2025 published 22 Jan 2026. Q1 2026 published 23 Apr 2026 (SEK 33.18B, organic +0.4%, EBITA +5% c/c). Edgewell feminine care consolidated from 2 Feb; SEK 3B share buyback announced.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "SEK 138B", note: "FY2025 net sales; ~€12.4B" },
      opMargin: {
        value: "14.1%",
        growth: { absolute: "Profit SEK 19.6B", pct: "EPS +7%", basis: "Highest margin in five years" },
        note: "Cost-savings programme: ~SEK 1B annual by end-2026",
      },
      employees: { value: "36K" },
    },
    operatingComplexity: {
      hq: { value: "Sweden 🇸🇪" },
      countries: { value: "150+" },
      brands: { value: "10+", note: "Tena, Libresse / Bodyform, Nosotras, Lotus, Tempo, Plenty, Cushelle, Tork, Jobst, Leukoplast" },
    },
    whyMatters: "Hygiene + health (incontinence, feminine care, professional hygiene). AI levers: procurement + finance (initial Microsoft + Accenture focus), supply-chain + manufacturing, consumer marketing.",
    quarterlyUpdate: {
      label: "Q1 2026 results",
      date: "23 April 2026",
      blurb: "Stable underlying performance. Net sales SEK 33.18B (-5.1% reported on FX, organic +0.4%). EBITA excl IAC SEK 4.6B (+5% c/c). Edgewell consolidated from 2 Feb (+1.1% to net sales). New SEK 3B buyback from 11 May.",
      metrics: [
        { label: "Net sales", value: "SEK 33.18B", trend: "-5.1% reported / +0.4% organic" },
        { label: "Volume", value: "+1.1%", trend: "Price/mix -0.7%" },
        { label: "EBITA excl IAC", value: "SEK 4.6B", trend: "+5% c/c" },
        { label: "Edgewell M&A boost", value: "+1.1%", trend: "Carefree, Stayfree, Playtex" },
        { label: "Buyback", value: "SEK 3B", trend: "From 11 May 2026" },
      ],
      reading: "First Edgewell-inclusive quarter. Microsoft + Accenture agentic-AI rollout (procurement + finance) continues — productivity impact will start showing in H1.",
      source: { label: "Essity — Q1 2026 interim report", url: "https://www.prnewswire.com/news-releases/essity-interim-report-quarter-1-2026-302751365.html" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Microsoft + Accenture agentic deployment.",
      body: "Essity announced (Nov 2025) an enterprise-wide Accenture + Microsoft partnership for AI agents — Azure AI, Copilot Studio, Power Platform. Initial focus: procurement + finance. Plus founding partner of AI Innovation of Sweden. Edgewell feminine-care acquisition closing Q1 2026 adds scale.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Donato Conforti</strong> · Chief Digital and Information Officer (CDIO). Public spokesperson at Microsoft / Accenture announcements + Sweden Tech & Innovation Summit. <strong>Magnus Groth</strong> · CEO.",
      source: { label: "Accenture / Microsoft — Essity AI agents announcement", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" },
    },
    appointmentsNote: "CDIO seat fused (Digital + Information). Founding partner of AI Innovation of Sweden — strong national-AI signal.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Azure AI agentic platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft + Accenture</span> — Robust, flexible cloud-based platform for AI agents. Initial deployment: procurement + finance.",
          source: { label: "Accenture / Microsoft — Essity agentic AI partnership", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" },
        },
        {
          html: "<strong>Copilot Studio + Power Platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Build/deploy custom AI agents and process automations.",
          source: { label: "TechEdge AI — Essity AI Agent Platform", url: "https://techedgeai.com/news/essity-taps-accenture-and-microsoft-to-build-ai-agent-platform-for-smarter-faster-operations/" },
        },
        {
          html: "<strong>NIQ as primary data &amp; insights provider (NA)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NielsenIQ</span> — Selected to anchor consumer-data + analytics in North America.",
          source: { label: "NIQ — Essity selects NIQ as primary data &amp; insights provider", url: "https://nielseniq.com/global/en/news-center/2025/essity-selects-niq-as-primary-data-insights-provider-for-north-america/" },
        },
        {
          html: "<strong>AI Innovation of Sweden</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· founding partner</span> — National AI ecosystem participation.",
          source: { label: "Essity — founding partner of AI Innovation of Sweden", url: "https://www.essity.com/media/press-release/essity-to-become-founding-partner-of-ai-innovation-of-sweden/b3f14050aee604ba/" },
        },
      ],
    },
    consumerFacing: "<strong>Indirect.</strong> AI work is back-office (procurement, finance, NIQ data). No flagship consumer GenAI surface yet.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure AI + Copilot Studio", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" }], note: "Microsoft is the named GenAI/agentic-AI partner via Copilot Studio + Azure AI. Accenture is the build partner." },
    stackTable: [
      { layer: "Agentic AI", product: "Microsoft Azure AI + Copilot Studio + Power Platform", use: "AI agents for procurement + finance (initial); scaling to other functions", source: { label: "Accenture/Microsoft — Essity AI agents", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" } },
      { layer: "Data + insights", product: "NielsenIQ", use: "Primary data & insights provider in NA", source: { label: "NIQ — Essity primary data partnership", url: "https://nielseniq.com/global/en/news-center/2025/essity-selects-niq-as-primary-data-insights-provider-for-north-america/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft + Accenture — agentic AI platform",
        status: "confirmed",
        caseStudy: { label: "Accenture / Microsoft — Essity AI agents announcement", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" },
        note: "Enterprise-wide agentic AI deployment. Azure AI + Copilot Studio + Power Platform. Initial focus: procurement + finance. Accenture as build partner.",
      },
      { name: "NielsenIQ (NA data + insights)", status: "confirmed" },
      { name: "AI Innovation of Sweden (national ecosystem)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft + Accenture is the marquee. NIQ is the data anchor in NA. No public Google / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: SEK 138B sales, profit SEK 19.6B, margin 14.1% (highest in 5y), EPS +7%. Cost-savings programme ~SEK 1B annual by end-2026. Edgewell feminine-care acquisition closing Q1 2026 (Carefree, Stayfree, Playtex)." },
    { lead: "AI posture.", body: "Performer. Microsoft + Accenture enterprise-wide AI agents (Nov 2025 announcement) starting in procurement + finance. NIQ primary data partner in NA. Founding partner of AI Innovation of Sweden — national-AI signal." },
    { lead: "Vendor footprint.", body: "Microsoft + Accenture house. AI Innovation of Sweden ecosystem participation is disclosed. Anthropic / OpenAI-direct / Google / AWS / Mistral not disclosed." },
  ],
  sources: [
    { label: "Essity — FY2025 results press release (22 Jan 2026)", url: "https://www.essity.com/media/press-release/report-for-quarter-4-and-full-year-2025/f23dee4bf1245b24/" },
    { label: "Essity — Annual Report 2025", url: "https://www.essity.com/media/press-release/essity-s-annual-report-2025/2dacda8c25148009/" },
    { label: "Tissue World — Essity highest margin in 5 years (FY2025)", url: "https://www.tissueworldmagazine.com/world-news/essity-reports-highest-margin-in-five-years-in-2025-results/" },
    { label: "Accenture / Microsoft — Essity AI agents partnership (Nov 2025)", url: "https://newsroom.accenture.com/news/2025/essity-collaborates-with-accenture-and-microsoft-to-accelerate-adoption-of-ai-agents-to-drive-productivity-and-growth" },
    { label: "TechEdge AI — Essity AI Agent Platform with Accenture + Microsoft", url: "https://techedgeai.com/news/essity-taps-accenture-and-microsoft-to-build-ai-agent-platform-for-smarter-faster-operations/" },
    { label: "ConsumerGoods.com — Essity enterprise-wide agentic implementation", url: "https://consumergoods.com/essity-teams-accenture-microsoft-enterprise-wide-agentic-implementation" },
    { label: "Essity — Founding partner of AI Innovation of Sweden", url: "https://www.essity.com/media/press-release/essity-to-become-founding-partner-of-ai-innovation-of-sweden/b3f14050aee604ba/" },
    { label: "NIQ — Essity selects NIQ as primary data partner (NA)", url: "https://nielseniq.com/global/en/news-center/2025/essity-selects-niq-as-primary-data-insights-provider-for-north-america/" },
  ],
  askPrompts: [
    "What did Essity report in FY2025?",
    "What's in the Essity-Microsoft-Accenture AI agents partnership?",
    "Why is Essity a founding partner of AI Innovation of Sweden?",
    "Who is Donato Conforti and what does the CDIO seat cover?",
  ],
};

// =============================================================================
// Estée Lauder — Q3 FY2026 reported 1 May 2026; triple Microsoft+Adobe+Google
// =============================================================================
export const estee_lauder_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025 (52w to Jun 2025)", date: "2025-08-21" },
    lastReported: { label: "Q3 FY2026 results", date: "2026-05-01" },
    next: { label: "Q4 + FY2026 results", date: "Late August 2026" },
    blurb: "FY ends June. Q3 FY2026 published 1 May 2026 (today; net sales +5% to $3.71B, beat consensus). FY2026 results late August.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · Q3 FY2026 reported",
    headline: {
      revenue: { value: "$3.71B (Q3)", reported: "+5%", organic: "+2%", note: "Q3 FY2026 net sales; Adj. EPS $0.91 vs $0.59 est." },
      opMargin: {
        value: "6.7% (reported)",
        growth: { absolute: "Adj. op margin 15.0%", pct: "Reported OP -19% to $249M", basis: "Restructuring + $84M loss contingency drag; gross margin +140bps to 76.4%" },
        note: "Lifted FY2026 guidance",
      },
      employees: { value: "62K" },
    },
    operatingComplexity: {
      hq: { value: "United States 🇺🇸" },
      countries: { value: "150+" },
      brands: { value: "20+", note: "Estée Lauder, M·A·C, La Mer, Clinique, Bobbi Brown, Aveda, Tom Ford Beauty, Jo Malone London, Le Labo" },
    },
    whyMatters: "Prestige beauty: claims, formulation, content, clientelling. AI levers: GenAI for marketing creative (Adobe Firefly), R&D (Microsoft Azure OpenAI), consumer-sentiment + brand experience (Google Cloud). Triple-hyperscaler footprint.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Triple-hyperscaler ecosystem.",
      body: "Microsoft (innovation lab + Azure OpenAI + Voice Assistant), Google Cloud (consumer sentiment + R&D + brand experiences), Adobe (Firefly for marketing). Plus Shopify in commerce. The deepest multi-vendor AI footprint in prestige beauty.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Stéphane de la Faverie</strong> · CEO. <strong>Stéphanie Garner</strong> · Chief Marketing Officer; Marketing-side AI face. CIO Lambros Lambrou (joined Apr 2024) leads enterprise tech; <strong>Beauty Tech</strong> innovation function carries AI showcase work.",
      source: { label: "ELC — Microsoft AI partnership announcement", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" },
    },
    appointmentsNote: "Marketing + CIO + Beauty Tech function form a triangulated AI org. Multi-hyperscaler approach is deliberate — refused-to-pick exclusivity.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Microsoft AI Innovation Lab</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure OpenAI Service</span> — Generative AI for R&D + marketing-effectiveness chatbot for local-campaign trends.",
          source: { label: "ELC — Microsoft expanded AI partnership", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" },
        },
        {
          html: "<strong>Adobe Firefly Services</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Adobe</span> — Creative + generative APIs for marketing-asset resizing, reformatting; shortens campaign launch time.",
          source: { label: "Adobe — ELC Firefly partnership announcement", url: "https://news.adobe.com/news/2025/03/adobe-estee-lauder" },
        },
        {
          html: "<strong>Google Cloud GenAI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud</span> — AI-powered solutions for consumer sentiment + R&D + brand digital experiences.",
          source: { label: "ConsumerGoods.com — ELC accelerated AI adoption with tech ecosystem", url: "https://consumergoods.com/estee-lauder-drive-accelerated-ai-adoption-tech-ecosystem" },
        },
        {
          html: "<strong>Voice-Enabled Makeup Assistant</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft Azure AI</span> — Mobile app launched 2023; consumer-facing AI for makeup guidance.",
          source: { label: "Digital Commerce 360 — ELC Microsoft GenAI for R&D + marketing", url: "https://www.digitalcommerce360.com/2024/05/02/estee-lauder-microsoft-generative-ai/" },
        },
      ],
    },
    consumerFacing: "<strong>Yes.</strong> Voice-Enabled Makeup Assistant (Microsoft Azure AI) is direct-to-consumer. Brand-experience GenAI on Google Cloud touches consumers indirectly via the websites + apps.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure OpenAI", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" }, { name: "Adobe Firefly", url: "https://news.adobe.com/news/2025/03/adobe-estee-lauder" }, { name: "Google Cloud" }, { name: "Shopify" }], note: "Triple-hyperscaler GenAI: Microsoft (R&D + marketing), Adobe (Firefly creative), Google Cloud (consumer + R&D)." },
    stackTable: [
      { layer: "GenAI R&D + marketing", product: "Microsoft Azure OpenAI", use: "Innovation Lab + marketing chatbot", source: { label: "ELC — Microsoft AI partnership", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" } },
      { layer: "Creative GenAI", product: "Adobe Firefly Services", use: "Marketing-asset resizing + reformatting + ideation", source: { label: "Adobe — ELC Firefly partnership", url: "https://news.adobe.com/news/2025/03/adobe-estee-lauder" } },
      { layer: "Consumer GenAI + R&D", product: "Google Cloud GenAI", use: "Sentiment + R&D + brand experiences", source: { label: "ConsumerGoods.com — ELC AI ecosystem", url: "https://consumergoods.com/estee-lauder-drive-accelerated-ai-adoption-tech-ecosystem" } },
      { layer: "Consumer app", product: "Voice-Enabled Makeup Assistant", use: "Direct-to-consumer GenAI mobile app (2023)", source: { label: "Digital Commerce 360 — ELC Microsoft GenAI", url: "https://www.digitalcommerce360.com/2024/05/02/estee-lauder-microsoft-generative-ai/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — AI Innovation Lab + Azure OpenAI",
        status: "confirmed",
        caseStudy: { label: "ELC — Microsoft partnership AI Innovation Lab", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" },
        note: "Generative-AI R&D + marketing-effectiveness chatbot. Voice-Enabled Makeup Assistant (2023) is the marquee consumer-facing app. Partnership rooted since 2017.",
      },
      {
        name: "Adobe — Firefly Services",
        status: "confirmed",
        caseStudy: { label: "Adobe — ELC Firefly partnership", url: "https://news.adobe.com/news/2025/03/adobe-estee-lauder" },
        note: "Creative + generative APIs for digital marketing campaign acceleration.",
      },
      {
        name: "Google Cloud — consumer GenAI + R&D + brand experiences",
        status: "confirmed",
        caseStudy: { label: "ConsumerGoods.com — ELC accelerated AI adoption", url: "https://consumergoods.com/estee-lauder-drive-accelerated-ai-adoption-tech-ecosystem" },
        note: "Multi-domain GenAI partnership: consumer sentiment, R&D, brand digital experiences.",
      },
      { name: "Shopify (commerce)", status: "confirmed" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Triple-hyperscaler ecosystem (Microsoft + Adobe + Google) is unusual on the watchlist — most peers commit to one. Anthropic / OpenAI-direct / Mistral / AWS not disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "Estée Lauder", description: "Master prestige brand. Voice-Enabled Makeup Assistant + Microsoft AI Innovation Lab work surfaces here." },
      { brand: "M·A·C", description: "Volume + colour cosmetics. Adobe Firefly campaigns target M·A·C-style high-velocity creative." },
      { brand: "La Mer", description: "Ultra-luxury. Brand-experience GenAI on Google Cloud is the right fit for clientelling tier." },
      { brand: "Clinique", description: "Mass-prestige skincare. Consumer-sentiment GenAI on Google Cloud helps formulation + claims work." },
      { brand: "Tom Ford / Jo Malone London / Le Labo", description: "Luxury fragrance. Adobe Firefly + Google brand experiences serve high-touch creative needs." },
    ],
    note: "Group-level AI flows down to brands; the Voice Assistant is brand-marquee.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "Q3 FY26 (1 May 2026): net sales $3.71B (+5%), org +2%, gross margin +140bps to 76.4%, adj. EPS $0.91 vs $0.59 est. Reported OP -19% on restructuring + $84M loss contingency. Lifted FY26 guidance." },
    { lead: "AI posture.", body: "Performer. Triple-hyperscaler ecosystem (Microsoft Innovation Lab + Adobe Firefly + Google Cloud). Voice-Enabled Makeup Assistant is the watchlist's earliest consumer-GenAI mobile app (2023)." },
    { lead: "Vendor footprint.", body: "Multi-vendor by design. Microsoft + Adobe + Google all confirmed. Anthropic / OpenAI-direct / Mistral not disclosed. The Beauty Tech function owns the disclosed AI activity." },
  ],
  sources: [
    { label: "ELC — Q3 FY2026 results press release (1 May 2026)", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2026/05-01-2026-110042145" },
    { label: "WWD — Estée Lauder Q3 earnings stock rise", url: "https://wwd.com/beauty-industry-news/beauty-features/estee-lauder-q3-earnings-stock-rise-1238925765/" },
    { label: "ELC — Microsoft AI partnership press release", url: "https://www.elcompanies.com/en/news-and-media/newsroom/press-releases/2024/04-26-2024" },
    { label: "Adobe — ELC Firefly partnership announcement", url: "https://news.adobe.com/news/2025/03/adobe-estee-lauder" },
    { label: "ConsumerGoods.com — ELC accelerated AI adoption with tech ecosystem", url: "https://consumergoods.com/estee-lauder-drive-accelerated-ai-adoption-tech-ecosystem" },
    { label: "Marketing Dive — ELC Adobe Firefly integration", url: "https://www.marketingdive.com/news/estee-lauder-generative-ai-adobe-integration/742129/" },
    { label: "Digital Commerce 360 — ELC Microsoft GenAI for R&D + marketing", url: "https://www.digitalcommerce360.com/2024/05/02/estee-lauder-microsoft-generative-ai/" },
    { label: "CIO Dive — ELC CIO wants to bring AI to forefront of beauty", url: "https://www.ciodive.com/news/estee-lauder-microsoft-generative-ai-partnership/714472/" },
  ],
  askPrompts: [
    "What did Estée Lauder report in Q3 FY2026?",
    "What's in the Microsoft + Estée Lauder AI Innovation Lab?",
    "How does Estée Lauder use Adobe Firefly?",
    "What's Estée Lauder's Google Cloud relationship?",
  ],
};

// =============================================================================
// Ferrero — FY2024/25 ended Aug 2025; Nutella Unica AI campaign; Google Cloud
// =============================================================================
export const ferrero_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2024/25 (ended 31 Aug 2025)", date: "2025-12-19" },
    lastReported: { label: "FY2024/25 results", date: "2025-12-19" },
    next: { label: "FY2025/26 results", date: "December 2026" },
    blurb: "Privately-held cooperative; FY ends 31 Aug. FY2024/25 published Dec 2025. Annual cadence only.",
  },
  investor: {
    fiscalYearLabel: "FY2024/25 baseline",
    headline: {
      revenue: { value: "€19.3B", reported: "+4.6%", note: "FY ended 31 Aug 2025" },
      opMargin: {
        value: "Profit €202.4M",
        growth: { absolute: "+€33.7M", pct: "+20% net profit", basis: "Profit FY2024/25 vs FY2023/24 (€168.7M)" },
        note: "Cocoa price surge offset by mix",
      },
      employees: { value: "47K" },
    },
    operatingComplexity: {
      hq: { value: "Italy 🇮🇹 / Luxembourg 🇱🇺" },
      countries: { value: "55+" },
      brands: { value: "15+", note: "Nutella, Kinder, Ferrero Rocher, Tic Tac, Mon Chéri, Raffaello + WK Kellogg cereals (acquired 2025)" },
    },
    whyMatters: "Confectionery + (post-Kellogg) breakfast cereals. AI levers: marketing creative (Nutella Unica algorithmic packaging), manufacturing precision (Nutella Biscuits line), data analytics (Google BigQuery), and sales activation.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Algorithmic packaging pioneer.",
      body: "Nutella Unica (7M unique jar designs from a single algorithm) is one of the earliest mass-AI marketing campaigns. Plus 9,000 art-movement-inspired Nutella labels (with Eurostampa, Bria, HP). Manufacturing AI on the €120M Nutella Biscuits line. Google Cloud BigQuery for analytics.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Mauro De Felip</strong> · Chief Information Officer. Active job postings for AI Transformation Project Manager + AI Transformation Strategy PMO + Digital &amp; AI Content Activation Manager — Ferrero is openly hiring AI org. <strong>Lapo Civiletti</strong> · CEO.",
      source: { label: "Ferrero Careers — AI Transformation roles", url: "https://www.ferrerocareers.com/int/en/jobs/ai-transformation-consumer-project-manager" },
    },
    appointmentsNote: "Job-postings disclosure of AI Transformation roles signals serious org build. Privately-held = lower public visibility on individual leaders.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Nutella Unica</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal algorithm + Ogilvy Italy</span> — 7 million unique Nutella jar designs from a single algorithm. All sold. Marketing-AI landmark.",
          source: { label: "Futurism — Algorithm designed 7M one-of-a-kind Nutella labels", url: "https://futurism.com/an-algorithm-designed-7-million-one-of-a-kind-labels-for-a-nutella-campaign" },
        },
        {
          html: "<strong>Nutella x Bria art labels</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Eurostampa + Bria + HP</span> — 9,000 unique art-movement labels (Cubism, Impressionism) printed via AI.",
          source: { label: "Tiger AI — Nutella's AI Art Revolution 9K Unique Labels", url: "https://www.tigerai.tech/p/nutella-s-ai-art-revolution-9k-unique-labels" },
        },
        {
          html: "<strong>Nutella Biscuits production line</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal automation + AI</span> — €120M+ investment for AI-driven precision biscuit assembly.",
          source: { label: "GlobalData — Ferrero International digital transformation", url: "https://www.globaldata.com/store/report/ferrero-international-enterprise-tech-analysis/" },
        },
        {
          html: "<strong>Google Cloud BigQuery</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud + Raw Data partner</span> — Marketing analytics + consumer-behaviour reporting; gigabytes processed in seconds.",
          source: { label: "Google Cloud Customers — Ferrero", url: "https://cloud.google.com/customers/ferrero" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Nutella Unica:</strong> 7,000,000 unique algorithm-generated jars; all sold. <strong>Nutella x Bria:</strong> 9,000 unique art labels. <strong>Manufacturing:</strong> €120M+ investment in AI-driven Nutella Biscuits line.",
      source: { label: "Marketing-Interactive — Nutella redesigns 7M jars", url: "https://www.marketing-interactive.com/nutella-redesigns-jars-7000000-times" },
    },
    consumerFacing: "<strong>Yes.</strong> Nutella Unica + Bria art labels are direct-to-consumer at retail. AI is on the shelf, literally.",
    genAI: { mentioned: true, vendors: [{ name: "Google Cloud (BigQuery)", url: "https://cloud.google.com/customers/ferrero" }, { name: "Bria AI" }, { name: "HP" }], note: "Google Cloud is the named hyperscaler partner. Bria + HP are the GenAI creative-print partners. Algorithmic-packaging heritage from 2017 Nutella Unica." },
    stackTable: [
      { layer: "Cloud + analytics", product: "Google Cloud BigQuery", use: "Marketing analytics + consumer-behaviour reports", source: { label: "Google Cloud Customers — Ferrero", url: "https://cloud.google.com/customers/ferrero" } },
      { layer: "Creative GenAI", product: "Bria + HP", use: "Nutella x Bria 9K art labels", source: { label: "Tiger AI — Nutella x Bria 9K labels", url: "https://www.tigerai.tech/p/nutella-s-ai-art-revolution-9k-unique-labels" } },
      { layer: "Marketing AI", product: "Internal algorithm (Nutella Unica)", use: "7M unique jar designs", source: { label: "Futurism — Nutella Unica 7M labels", url: "https://futurism.com/an-algorithm-designed-7-million-one-of-a-kind-labels-for-a-nutella-campaign" } },
      { layer: "Manufacturing AI", product: "Nutella Biscuits line", use: "AI-driven precision assembly (€120M+ investment)", source: { label: "GlobalData — Ferrero digital transformation", url: "https://www.globaldata.com/store/report/ferrero-international-enterprise-tech-analysis/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Google Cloud — BigQuery + analytics",
        status: "confirmed",
        caseStudy: { label: "Google Cloud Customers — Ferrero", url: "https://cloud.google.com/customers/ferrero" },
        note: "BigQuery for consumer-behaviour analytics and marketing reporting. Raw Data is the build partner.",
      },
      { name: "Bria AI (creative GenAI)", status: "confirmed" },
      { name: "HP (production print)", status: "confirmed" },
      { name: "Eurostampa (label print)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Google Cloud is the named hyperscaler. Bria + HP + Eurostampa form the GenAI creative-print stack. No public Microsoft / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Nutella", description: "Algorithmic packaging flagship: 7M Nutella Unica jars + 9K Bria art labels. Marketing-AI landmark.", source: { label: "Marketing-Interactive — Nutella 7M jar redesign", url: "https://www.marketing-interactive.com/nutella-redesigns-jars-7000000-times" } },
      { brand: "Kinder", description: "Mass-children's confectionery. Group-level marketing analytics on Google BigQuery serves Kinder demand sensing." },
      { brand: "Ferrero Rocher", description: "Premium gifting. Manufacturing-precision AI on the chocolate line." },
      { brand: "Nutella Biscuits", description: "Cross-category extension launched on AI-driven manufacturing line (€120M+ investment).", source: { label: "GlobalData — Ferrero digital transformation", url: "https://www.globaldata.com/store/report/ferrero-international-enterprise-tech-analysis/" } },
      { brand: "WK Kellogg cereals", description: "Acquired 2025 — adds Frosted Flakes, Froot Loops, Special K to portfolio. Integration AI runway open." },
    ],
    note: "Nutella is the brand-marquee for AI marketing. Kinder + Ferrero Rocher leverage group AI infrastructure. WK Kellogg integration is the next disclosed programme.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2024/25 (Aug 2025): €19.3B (+4.6%), profit €202.4M (+20%). Cocoa price surge a structural drag. WK Kellogg acquisition expands portfolio + opens AI integration runway." },
    { lead: "AI posture.", body: "Performer. Nutella Unica (7M jars, 2017) was a marketing-AI landmark. Continued via Bria + HP for art labels. Google Cloud BigQuery for analytics. €120M+ manufacturing AI on Nutella Biscuits. Job-posting AI org build is on." },
    { lead: "Vendor footprint.", body: "Google Cloud is the only named hyperscaler. Anthropic / Microsoft / AWS / OpenAI / Mistral not disclosed. The CIO seat and active AI-transformation hiring are public signals of investment." },
  ],
  sources: [
    { label: "Ferrero Group — FY2024/25 financial statements", url: "https://www.ferrero.com/int/en/news-stories/news/ferrero-group-reports-consolidated-financial-statements-for-the-2024-2025-financial-year" },
    { label: "ESM Magazine — Ferrero FY2024-25 profit growth", url: "https://www.esmmagazine.com/a-brands/ferrero-reports-profit-growth-in-fy-2024-2025-303201" },
    { label: "Google Cloud Customers — Ferrero BigQuery case study", url: "https://cloud.google.com/customers/ferrero" },
    { label: "Marketing-Interactive — Nutella Unica 7M jar redesign", url: "https://www.marketing-interactive.com/nutella-redesigns-jars-7000000-times" },
    { label: "Futurism — Algorithm designed 7M Nutella labels", url: "https://futurism.com/an-algorithm-designed-7-million-one-of-a-kind-labels-for-a-nutella-campaign" },
    { label: "Tiger AI — Nutella x Bria 9K AI labels", url: "https://www.tigerai.tech/p/nutella-s-ai-art-revolution-9k-unique-labels" },
    { label: "GlobalData — Ferrero International digital transformation strategies", url: "https://www.globaldata.com/store/report/ferrero-international-enterprise-tech-analysis/" },
    { label: "Ferrero Careers — AI Transformation roles", url: "https://www.ferrerocareers.com/int/en/jobs/ai-transformation-consumer-project-manager" },
  ],
  askPrompts: [
    "What did Ferrero report for FY2024/25?",
    "How does Nutella Unica's 7-million-jar AI campaign work?",
    "What's Ferrero's Google Cloud BigQuery setup?",
    "Who runs AI at Ferrero?",
  ],
};

// =============================================================================
// Fnac Darty — FY2025; AI dynamic pricing + Beyond Everyday plan
// =============================================================================
export const fnac_darty_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-25" },
    lastReported: { label: "Q1 2026 sales", date: "2026-04-23" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 published 25 Feb 2026. Q1 2026 sales published 23 Apr 2026 (€2,310M, +0.9% LFL; online +5.4% to 22% of mix; Portugal +9.8% LFL).",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€10.33B", reported: "+0.4%", organic: "+0.7% LFL", note: "Online ~+6%, Click & Collect ~50%" },
      opMargin: {
        value: "2.0%",
        growth: { absolute: "Op income €203M", pct: "Gross margin +50bps to 28.0%", basis: "FY2025 vs FY2024" },
        note: "2030 target ≥3.0%",
      },
      employees: { value: "25K" },
    },
    operatingComplexity: {
      hq: { value: "France 🇫🇷" },
      countries: { value: "9", note: "France + Belgium + Luxembourg + Spain + Portugal + Netherlands + Switzerland + Tunisia + Cameroon" },
      brands: { value: "6", note: "Fnac, Darty, BCC, Vanden Borre, Nature & Découvertes, WeFix" },
      stores: { value: "1,000+" },
    },
    whyMatters: "Multi-banner electronics + cultural-goods retail. AI levers: dynamic pricing, demand forecasting, services / subscription growth (2.4M subs), repair (WeFix) + circular economy.",
    quarterlyUpdate: {
      label: "Q1 2026 sales",
      date: "23 April 2026",
      blurb: "Steady Q1 with services + online lift. €2,310M revenue (+0.9% LFL). Online +5.4% (22% of total). Iberia outperformed: Portugal +9.8% LFL, Spain +5.5% LFL.",
      metrics: [
        { label: "Group revenue", value: "€2,310M", trend: "+0.9% LFL" },
        { label: "Online", value: "22% of mix", trend: "+5.4% YoY" },
        { label: "Portugal LFL", value: "+9.8%", trend: "Strongest market" },
        { label: "Spain LFL", value: "+5.5%", trend: "Store momentum" },
        { label: "Belgium LFL", value: "+3.2%", trend: "Online-led" },
        { label: "Gross margin", value: "+10bps LFL", trend: "Services offsetting mix" },
      ],
      reading: "Beyond Everyday plan delivering services-led margin lift even with flat top line. AI dynamic-pricing engine is the operational underpinning.",
      source: { label: "Fnac Darty — Q1 2026 financial information", url: "https://www.globenewswire.com/news-release/2026/04/23/3280199/0/en/Fnac-Darty-Q1-2026-financial-information.html" },
    },
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 3.0", rhetoric: 3, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Services-led, AI under the hood.",
      body: "Beyond Everyday strategic plan (Jun 2025) is service + subscription-led with AI underneath. AI dynamic pricing measures price sensitivity in near real-time. Margin lift to 3% by 2030 is partly an AI productivity story.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Enrique Martinez</strong> · CEO. Carries strategic narrative externally. Tech function led at executive level by the COO + Group Information Systems Director; less public visibility than peers' CIO seats.",
      source: { label: "Fnac Darty — 2025 annual results", url: "https://www.fnacdarty.com/en/resultats-annuels-2025/" },
    },
    appointmentsNote: "Tech leadership keeps a low public profile vs. peers like Carrefour or H&M. Beyond Everyday plan signals stronger digital narrative.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Dynamic pricing AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + analytics partners</span> — Measures consumer price sensitivity in near-real-time; quickly adapts to market.",
          source: { label: "PricingHUB — dynamic pricing applied at Fnac Darty", url: "https://www.pricinghub.net/en/pricing-solution/dynamic-pricing/" },
        },
        {
          html: "<strong>Subscription services platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — 2.4M subscribers across services. Recommendation + churn AI underneath.",
          source: { label: "Fnac Darty — 2025 annual results / Beyond Everyday", url: "https://www.fnacdarty.com/en/resultats-annuels-2025/" },
        },
      ],
    },
    consumerFacing: "<strong>Indirect.</strong> Dynamic pricing visible at the shelf; subscription + repair (WeFix) are services-level surfaces.",
    genAI: { mentioned: false, note: "No publicly named GenAI vendor partnership. Strategic plan emphasises services + circularity over generative AI." },
  },
  vendorStack: {
    namedPartners: [
      { name: "PricingHUB / dynamic-pricing tooling", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler relationship. Pricing tooling vendor (PricingHUB-class) is the named partner. No Microsoft, Google, Anthropic, OpenAI, or Mistral relationship is disclosed, including on the consumer side.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: €10.33B (+0.7% LFL), op margin 2.0% (op income €203M), gross margin +50bps to 28%. 2.4M subs. 2030 target: ≥3% op margin." },
    { lead: "AI posture.", body: "Silent Builder. Dynamic-pricing AI live; subscription churn / recommendation AI under Beyond Everyday plan. No public GenAI / hyperscaler footprint." },
    { lead: "Vendor footprint.", body: "No hyperscaler relationship disclosed. The Beyond Everyday plan and services growth are the stated strategic priorities; no AI vendor is named against them." },
  ],
  sources: [
    { label: "Fnac Darty — 2025 annual results", url: "https://www.fnacdarty.com/en/resultats-annuels-2025/" },
    { label: "Yahoo Finance — Fnac Darty 2025 full-year results", url: "https://finance.yahoo.com/news/fnac-darty-fnac-darty-2025-164500300.html" },
    { label: "Yahoo Finance — Fnac Darty Q3 + 9M 2025 LFL revenue", url: "https://finance.yahoo.com/news/fnac-darty-lfl-revenue-1-154500967.html" },
    { label: "Grande Consumo — Fnac Darty 2% margin 2025", url: "https://grandeconsumo.com/en/Fnac-Darty-increases-margin-to-2-in-2025/" },
    { label: "Investing.com — Fnac Darty Q1 2025 presentation (slight revenue growth)", url: "https://www.investing.com/news/company-news/fnac-darty-q1-2025-presentation-slight-revenue-growth-amid-mixed-regional-performance-93CH-3999538" },
    { label: "PricingHUB — Dynamic pricing solutions (Fnac Darty cited)", url: "https://www.pricinghub.net/en/pricing-solution/dynamic-pricing/" },
  ],
  askPrompts: [
    "What did Fnac Darty report for FY2025?",
    "What is the Beyond Everyday strategic plan?",
    "How does Fnac Darty's AI dynamic pricing work?",
    "Who's behind digital and AI at Fnac Darty?",
  ],
};

// =============================================================================
// Haleon — FY2025 published; Salesforce Agentforce flagship + Microsoft AI
// =============================================================================
export const haleon_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-26" },
    lastReported: { label: "Q1 2026 trading statement", date: "2026-04-29" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 published 26 Feb 2026. Q1 2026 trading statement published 29 Apr 2026 (£2.9B, organic +2.2%; oral health +8.3%; FY26 guide held at +3-5%).",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "£11.0B", reported: "Stable", organic: "+3.0%", note: "Below 4-6% medium-term guidance" },
      opMargin: {
        value: "Op profit £2.41B",
        growth: { absolute: "Adj. OP +10.5%", pct: "Adj. OP growth +10.5%", basis: "FY2025 vs FY2024; gross margin +220bps; profit after tax £1.68B" },
        note: "EPS 18.6p (vs 15.8p)",
      },
      employees: { value: "23K" },
    },
    operatingComplexity: {
      hq: { value: "United Kingdom 🇬🇧" },
      countries: { value: "100+" },
      brands: { value: "9+", note: "Sensodyne, Panadol, Voltaren, Centrum, Advil, Theraflu, Otrivin, Polident, Eno" },
    },
    whyMatters: "Consumer-health (OTC + oral health + nutrition + therapeutics). AI levers: pharmacy / HCP engagement (Salesforce Agentforce flagship), accessibility (Microsoft Seeing AI heritage), regulatory + claims, and consumer marketing.",
    quarterlyUpdate: {
      label: "Q1 2026 trading statement",
      date: "29 April 2026",
      blurb: "Soft cold/flu season drag (~130bps), pricing-led growth. £2.9B revenue, organic +2.2% (price +2.4%, vol/mix -0.2%). Oral health standout at +8.3%. FY26 +3-5% organic guide held.",
      metrics: [
        { label: "Revenue", value: "£2.9B", trend: "Organic +2.2%" },
        { label: "Oral health", value: "+8.3%", trend: "£932M; innovation-led" },
        { label: "EMEA + LatAm", value: "+2.1%", trend: "Price +2.6%, vol/mix -0.5%" },
        { label: "North America", value: "+1.0%", trend: "Price +3.7%, vol/mix -2.7%" },
        { label: "APAC", value: "+4.0%", trend: "Vol/mix +3.7%, price +0.3%" },
      ],
      reading: "Pricing-only growth raises near-term concerns but oral-health momentum + Asia volume + Salesforce Agentforce productivity + held guide reassure. Innovation-led premiumisation is the medium-term lever.",
      source: { label: "Haleon — Q1 2026 trading statement", url: "https://www.haleon.com/news/press-releases/financial/2026/2026-q1-trading-statement" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Salesforce Agentforce as the marquee.",
      body: "Haleon selected Salesforce Life Sciences Cloud + Agentforce (Oct 2025) for AI-powered pharmacist + HCP engagement. Plus Microsoft Seeing AI heritage for accessible product info for visually-impaired consumers. Adj OP +10.5% partly an AI productivity story.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Tamara Rogers</strong> · Chief Marketing Officer (carries pharmacist + consumer narratives). <strong>Brian McNamara</strong> · CEO. Tech reports through CMO + COO. Salesforce + Microsoft customer stories surface the named tech leaders.",
      source: { label: "BusinessWire — Haleon selects Salesforce Agentforce", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" },
    },
    appointmentsNote: "Marketing-led AI investment. Pharmacy + HCP engagement is the strategic priority for Agentforce.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Salesforce Agentforce + Life Sciences Cloud</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Salesforce</span> — AI-powered real-time insights for sales reps engaging pharmacists and healthcare professionals; reduces admin, surfaces consumer demographics + shopping trends.",
          source: { label: "BusinessWire — Haleon Salesforce Agentforce announcement", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" },
        },
        {
          html: "<strong>Microsoft Seeing AI for accessibility</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — AI-powered narration of product info for blind / visually-impaired consumers (heritage from 2022 onwards).",
          source: { label: "Haleon — Microsoft Seeing AI for visually-impaired consumers", url: "https://www.haleon.com/news/press-releases/esg/2022/Haleon-Microsoft-AI-enhance-health-product-accessibility-for-blind-people" },
        },
      ],
    },
    consumerFacing: "<strong>Yes.</strong> Microsoft Seeing AI integration is a direct-to-consumer accessibility surface. Salesforce Agentforce is HCP-facing (B2B).",
    genAI: { mentioned: true, vendors: [{ name: "Salesforce Agentforce", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" }, { name: "Microsoft Seeing AI", url: "https://www.haleon.com/news/press-releases/esg/2022/Haleon-Microsoft-AI-enhance-health-product-accessibility-for-blind-people" }], note: "Salesforce Agentforce + Microsoft Seeing AI form the public GenAI surface. Salesforce Life Sciences Cloud is the named vertical platform." },
    stackTable: [
      { layer: "Agentic AI (HCP engagement)", product: "Salesforce Agentforce + Life Sciences Cloud", use: "Pharmacist + HCP engagement; rep productivity", source: { label: "BusinessWire — Haleon Salesforce Agentforce", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" } },
      { layer: "Accessibility AI", product: "Microsoft Seeing AI", use: "AI narration of product info for visually-impaired consumers", source: { label: "Haleon — Seeing AI press release", url: "https://www.haleon.com/news/press-releases/esg/2022/Haleon-Microsoft-AI-enhance-health-product-accessibility-for-blind-people" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Salesforce — Agentforce + Life Sciences Cloud",
        status: "confirmed",
        caseStudy: { label: "BusinessWire — Haleon Salesforce Agentforce announcement", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" },
        note: "Agentic AI for pharmacy + HCP engagement. Salesforce's flagship Life Sciences Cloud + Agentforce deal in consumer health.",
      },
      {
        name: "Microsoft — Seeing AI accessibility",
        status: "confirmed",
        caseStudy: { label: "Haleon — Seeing AI press release", url: "https://www.haleon.com/news/press-releases/esg/2022/Haleon-Microsoft-AI-enhance-health-product-accessibility-for-blind-people" },
        note: "AI-powered accessibility for visually-impaired consumers. Long-standing Microsoft tie via Seeing AI app.",
      },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Salesforce Agentforce is the marquee GenAI partner — distinctive for consumer health. Microsoft Seeing AI is the long-standing accessibility tie. No public Google / AWS / Anthropic / OpenAI-direct / Mistral relationship.",
  },
  byMaison: {
    maisons: [
      { brand: "Sensodyne", description: "Oral-health flagship. Salesforce Agentforce equips reps with AI-powered insights for dental-professional engagement." },
      { brand: "Panadol / Advil", description: "Pain-relief portfolio. Salesforce Agentforce supports pharmacist engagement at retail." },
      { brand: "Voltaren", description: "Topical pain relief. Same Salesforce Agentforce platform for HCP engagement." },
      { brand: "Centrum", description: "Vitamins + supplements. Consumer-health insights flow through Agentforce data layer." },
      { brand: "Theraflu / Otrivin", description: "Cold + flu portfolio. Microsoft Seeing AI accessibility integration touches packaging." },
    ],
    note: "Brand-level AI flows through group-wide Salesforce Agentforce platform. Microsoft Seeing AI integration is portfolio-wide for accessibility.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue £11.0B (stable; +3.0% organic, below 4-6% target). Adj OP +10.5%. Gross margin +220bps. Net cash from ops £2.6B. EPS 18.6p (+18%)." },
    { lead: "AI posture.", body: "Performer. Salesforce Agentforce + Life Sciences Cloud (Oct 2025) is the marquee GenAI partner. Microsoft Seeing AI heritage for accessibility. Margin expansion partly an AI productivity story." },
    { lead: "Vendor footprint.", body: "Salesforce-anchored on the agentic side; Microsoft for accessibility. No Anthropic, OpenAI-direct, Google, AWS, or Mistral relationship disclosed, including on regulatory and claims work." },
  ],
  sources: [
    { label: "Haleon — FY2025 full-year results PDF", url: "https://www.haleon.com/content/dam/haleon/corporate/documents/investors/results/full-year-results-2025/fy25-statement.pdf.downloadasset.pdf" },
    { label: "Haleon — Investors results hub", url: "https://www.haleon.com/investors/results-reports-presentations/results" },
    { label: "Investing.com — Haleon FY2025 slides", url: "https://www.investing.com/news/company-news/haleon-fy-2025-slides-margin-gains-shine-amid-revenue-growth-shortfall-93CH-4523466" },
    { label: "BusinessWire — Haleon Salesforce Agentforce + Life Sciences Cloud (Oct 2025)", url: "https://www.businesswire.com/news/home/20251008924109/en/Haleon-Selects-Salesforce-Agentforce-Life-Sciences-Cloud-for-Customer-Engagement-to-Improve-Engagement-with-Pharmacies-and-Healthcare-Professionals-with-AI" },
    { label: "Pharmacy Biz — Haleon Salesforce AI customer engagement", url: "https://www.pharmacy.biz/haleon-salesforce-ai-customer-engagement/" },
    { label: "Haleon — Microsoft Seeing AI press release", url: "https://www.haleon.com/news/press-releases/esg/2022/Haleon-Microsoft-AI-enhance-health-product-accessibility-for-blind-people" },
    { label: "Haleon — Seeing AI ESG announcement", url: "https://www.haleon.com/news/press-releases/esg/2022/Seeing-AI" },
  ],
  askPrompts: [
    "What did Haleon report in FY2025?",
    "How is Haleon using Salesforce Agentforce?",
    "What is Microsoft Seeing AI's role at Haleon?",
    "Who runs AI at Haleon?",
  ],
};

// =============================================================================
// Heineken — FY2025 published; AIDDA + Microsoft Power Platform/Copilot Studio + AWS
// =============================================================================
export const heineken_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-11" },
    lastReported: { label: "Q1 2026 trading update", date: "2026-04-23" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 published 11 Feb 2026. Q1 2026 trading update published 23 Apr 2026 (revenue €7.9B +1.4% reported, net rev +2.8%, volume +1.2%). FY +2-6% organic OP guide held.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€34.3B", reported: "Stable", note: "FY2025 reported" },
      opMargin: {
        value: "15.2%",
        growth: { absolute: "+€140M", pct: "+4.4%", basis: "Op profit FY2025 vs FY2024; +41bps margin; >€500M cost savings" },
        note: "EPS €4.78",
      },
      employees: { value: "85K" },
    },
    operatingComplexity: {
      hq: { value: "Netherlands 🇳🇱" },
      countries: { value: "190+" },
      brands: { value: "300+", note: "Heineken, Amstel, Tiger, Sol, Birra Moretti, Cruzcampo, Desperados, Lagunitas + many more" },
    },
    whyMatters: "World's #2 brewer. AI levers: B2B sales (AIDDA), brewery efficiency, brand creative, employee productivity. Multi-cloud (Microsoft + AWS + Google) is unusually diverse for beer.",
    quarterlyUpdate: {
      label: "Q1 2026 trading update",
      date: "23 April 2026",
      blurb: "Beat top-line forecasts amid premium tilt. Reported revenue €7.9B (+1.4%), net revenue +2.8%, net rev/hl +3.0%. Premium volume +5.8%, Heineken® +6.9%. FY +2-6% organic OP guide reaffirmed.",
      metrics: [
        { label: "Reported revenue", value: "€7.9B", trend: "+1.4%" },
        { label: "Net revenue", value: "+2.8%", trend: "Net rev/hl +3.0%" },
        { label: "Total volume", value: "+1.2%", trend: "Consol -0.2%, licensed +26.1%" },
        { label: "Premium volume", value: "+5.8%", trend: "Heineken® +6.9%" },
        { label: "FIFCO impact", value: "Lift", trend: "Beverages + retail consolidation" },
        { label: "Market share", value: "60% markets", trend: "Held or gained" },
      ],
      reading: "Premiumisation thesis intact; FIFCO consolidation supports. AIDDA + Microsoft Power Platform productivity continue powering the cost story.",
      source: { label: "Heineken — 2026 Q1 trading update", url: "https://www.theheinekencompany.com/newsroom/heineken-nv-2026-first-quarter-trading-update/" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 3, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Multi-cloud Performer.",
      body: "AIDDA (AI Data-Driven Advisor) supports nearly half a million customer interactions daily across 8 markets. Power Platform delivered 3.1M productivity hours via 7,500+ makers. Plus Azure OpenAI chatbots + AWS infra + Brewery IoT yielding 15% energy + 20% water reductions in pilots.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Ronald den Elzen</strong> · Chief Digital and Technology Officer (CDTO). Spans digital, data, AI, IT. Public on multi-cloud + AI strategy. <strong>Dolf van den Brink</strong> · CEO.",
      source: { label: "Microsoft Customer Story — Heineken Power Platform + Copilot Studio", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" },
    },
    appointmentsNote: "CDTO is a single fused seat for digital + tech + AI — strong governance signal.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>AIDDA</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal AI</span> — AI Data-Driven Advisor: recommends optimal next-best-action for sales reps. Scaled to 8 markets, ~500K customer interactions daily.",
          source: { label: "AI Data Analytics Network — Heineken brewing innovation with AI", url: "https://www.aidataanalytics.network/data-science-ai/articles/how-heineken-is-brewing-innovation-with-ai" },
        },
        {
          html: "<strong>Microsoft Power Platform + Copilot Studio</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — 7,500+ makers; 3.1M hours productivity; AI agents on Copilot Studio supporting employees + customers.",
          source: { label: "Microsoft Customer Story — Heineken Power Platform + Copilot Studio", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" },
        },
        {
          html: "<strong>Azure OpenAI Service</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Internal employee chatbots powered by ChatGPT capabilities + other Azure AI services.",
          source: { label: "Microsoft Customer Story — Heineken Azure AI", url: "https://www.microsoft.com/en/customers/story/1685696409285197342-heineken-consumer-goods-azure-ai" },
        },
        {
          html: "<strong>AWS data + ML platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· AWS (JupyterHub, VS Code, Apache Spark)</span> — Multi-disciplinary data team builds ML on AWS infrastructure.",
          source: { label: "AWS Customer Story — Heineken", url: "https://aws.amazon.com/solutions/case-studies/heineken-customer-story/" },
        },
        {
          html: "<strong>Brewery IoT pilots</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Energy consumption -15%, water -20% in pilot breweries.",
          source: { label: "DigitalDefynd — 5 Ways Heineken is using AI [2026]", url: "https://digitaldefynd.com/IQ/heineken-using-ai-case-study/" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>AIDDA:</strong> ~500K customer interactions daily across 8 markets. <strong>Power Platform:</strong> 3.1M productivity hours; 7,500+ makers. <strong>Brewery IoT:</strong> energy -15%, water -20% in pilots.",
      source: { label: "AI Data Analytics Network — Heineken AI", url: "https://www.aidataanalytics.network/data-science-ai/articles/how-heineken-is-brewing-innovation-with-ai" },
    },
    consumerFacing: "<strong>Indirect.</strong> AIDDA is B2B (sales-rep-mediated). Most consumer-facing AI sits inside marketing creative, not direct apps.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure OpenAI + Copilot Studio", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" }, { name: "AWS", url: "https://aws.amazon.com/solutions/case-studies/heineken-customer-story/" }], note: "Multi-cloud GenAI: Azure for Copilot/agents, AWS for ML infra. Rare on the watchlist." },
    stackTable: [
      { layer: "Agentic AI + low-code", product: "Microsoft Power Platform + Copilot Studio", use: "7,500+ makers; 3.1M productivity hours", source: { label: "Microsoft — Heineken Power Platform", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" } },
      { layer: "GenAI / chat", product: "Azure OpenAI Service", use: "Employee chatbots + AI process automation", source: { label: "Microsoft — Heineken Azure AI", url: "https://www.microsoft.com/en/customers/story/1685696409285197342-heineken-consumer-goods-azure-ai" } },
      { layer: "Sales AI", product: "AIDDA", use: "Next-best-action for B2B sales reps; 8 markets, ~500K interactions/day", source: { label: "AI Data Analytics Network — Heineken AI", url: "https://www.aidataanalytics.network/data-science-ai/articles/how-heineken-is-brewing-innovation-with-ai" } },
      { layer: "Data + ML platform", product: "AWS", use: "JupyterHub, VS Code, Apache Spark for data science teams", source: { label: "AWS Customer Story — Heineken", url: "https://aws.amazon.com/solutions/case-studies/heineken-customer-story/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — Power Platform + Copilot Studio + Azure OpenAI",
        status: "confirmed",
        caseStudy: { label: "Microsoft Customer Story — Heineken Power Platform + Copilot Studio", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" },
        note: "7,500+ Power Platform makers, 3.1M productivity hours. Plus Azure OpenAI chatbots. The deepest Microsoft partnership in beer.",
      },
      {
        name: "AWS — data + ML platform",
        status: "confirmed",
        caseStudy: { label: "AWS Customer Story — Heineken", url: "https://aws.amazon.com/solutions/case-studies/heineken-customer-story/" },
        note: "Multi-disciplinary data team builds on AWS (JupyterHub, VS Code, Spark). Multi-cloud strategy is unusual on the watchlist.",
      },
      { name: "Anthropic", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
    ],
    partnersNote: "Multi-cloud (Microsoft + AWS) is the distinguishing trait. Anthropic / Google / OpenAI-direct / Mistral not disclosed. Cleanest AWS-direct beer customer story on the watchlist alongside Diageo.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €34.3B, op profit +4.4%, op margin 15.2% (+41bps), EPS €4.78. >€500M gross savings; FCF €2.6B. 2026 guide: org OP +2-6%." },
    { lead: "AI posture.", body: "Performer 4.0. AIDDA (~500K daily B2B interactions, 8 markets) + Microsoft Power Platform/Copilot Studio (3.1M productivity hours) + Azure OpenAI + AWS ML + brewery IoT (-15% energy, -20% water in pilots)." },
    { lead: "Vendor footprint.", body: "Microsoft + AWS dual house — rare. Anthropic / Google / OpenAI / Mistral not disclosed. EverGreen 2030 is the stated strategy frame." },
  ],
  sources: [
    { label: "Heineken — FY2025 full year results", url: "https://www.theheinekencompany.com/newsroom/heineken-nv-reports-2025-full-year-results/" },
    { label: "Heineken — FY2025 PDF", url: "https://www.theheinekencompany.com/sites/heineken-corp/files/2026-02/heineken-nv-2025-full-year-results.pdf" },
    { label: "Microsoft Customer Story — Heineken Power Platform + Copilot Studio", url: "https://www.microsoft.com/en/customers/story/25909-heineken-microsoft-copilot-studio" },
    { label: "Microsoft Customer Story — Heineken Azure AI", url: "https://www.microsoft.com/en/customers/story/1685696409285197342-heineken-consumer-goods-azure-ai" },
    { label: "AWS Customer Story — Heineken", url: "https://aws.amazon.com/solutions/case-studies/heineken-customer-story/" },
    { label: "AI Data Analytics Network — How Heineken is brewing innovation with AI", url: "https://www.aidataanalytics.network/data-science-ai/articles/how-heineken-is-brewing-innovation-with-ai" },
    { label: "DigitalDefynd — 5 Ways Heineken is using AI [2026]", url: "https://digitaldefynd.com/IQ/heineken-using-ai-case-study/" },
    { label: "RSM Discovery — How Heineken wins by using AI", url: "https://www.rsm.nl/discovery/2024/how-heineken-wins-with-ai/" },
  ],
  askPrompts: [
    "What did Heineken report for FY2025?",
    "What is AIDDA and how is it used?",
    "How is Heineken using Microsoft Power Platform + Copilot Studio?",
    "What's Heineken's AWS footprint?",
  ],
};

// =============================================================================
// HelloFresh — FY2025 published; ML-driven recommendations + Snowflake
// =============================================================================
export const hellofresh_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-19" },
    lastReported: { label: "FY2025 results", date: "2026-03-19" },
    next: { label: "Q1 2026 results", date: "Mid-May 2026" },
    blurb: "FY2025 published 19 Mar 2026 (€6.8B revenue -9% c/c, AEBITDA +14% to €423M). Q1 2026 due mid-May.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€6.8B", reported: "-9% c/c", note: "Deliberate shift to fewer/more-profitable customers" },
      opMargin: {
        value: "AEBITDA €423M",
        growth: { absolute: "+€51M", pct: "+14%", basis: "AEBITDA FY2025 vs FY2024; FCF €19M (returned to positive)" },
        note: "Contribution margin 26.8% (+1pp)",
      },
      employees: { value: "20K" },
    },
    operatingComplexity: {
      hq: { value: "Germany 🇩🇪" },
      countries: { value: "18" },
      brands: { value: "6", note: "HelloFresh, Green Chef, Factor, EveryPlate, Chefs Plate, Youfoodz" },
    },
    whyMatters: "Meal-kit + ready-to-eat at scale. AI levers: meal recommendations (embeddings), demand forecasting, customer LTV, packaging optimisation, customer service. ~70 data scientists deploying ~1,500 models/week.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Engineering-grade ML house.",
      body: "HelloFresh has invested in AI/ML for 6+ years. ~70 data scientists + ML engineers deploy ~1,500 models per week (one of the highest model-deployment rates on the watchlist). Powered by Snowflake AI Data Cloud + Snowplow first-party data + internal embedding-based recommenders.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Lee Zen</strong> · VP of Machine Learning. Public spokesperson on HelloFresh AI/ML. Public engineering blog (HelloTech) carries detailed ML write-ups. <strong>Dominik Richter</strong> · CEO + co-founder.",
      source: { label: "HelloFresh Careers — Lee Zen on ML at HelloFresh", url: "https://careers.hellofresh.com/global/en/blogarticle/insights-into-hellofresh-by-lee-zen-vp-of-machine-learning-ai" },
    },
    appointmentsNote: "Distinct VP-of-ML seat with public engineering content. Engineering-led culture (HelloTech blog).",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>Embedding-based meal recommender</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal ML</span> — Cosine similarity between recipes + user-learned taste; predicts recipe-fit and weights similarities by predictions.",
          source: { label: "HelloTech — Personalised Meal Recommendations using Embeddings", url: "https://engineering.hellofresh.com/enhancing-the-customer-experience-with-machine-learning-personalized-meal-recommendations-using-2277bf862da4" },
        },
        {
          html: "<strong>Snowflake AI Data Cloud</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Snowflake</span> — Insights platform for menu-planning + analytics. Public Snowflake customer story.",
          source: { label: "Snowflake — HelloFresh customer story", url: "https://www.snowflake.com/en/customers/all-customers/case-study/hellofresh/" },
        },
        {
          html: "<strong>Snowplow first-party data</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Snowplow</span> — Customer-data infrastructure for the recommendation + LTV pipelines.",
          source: { label: "Snowplow — HelloFresh customer story", url: "https://snowplow.io/customers/hellofresh" },
        },
        {
          html: "<strong>Customer-LTV + churn AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal ML</span> — Predicts future actions, individualises marketing offers + discount levels.",
          source: { label: "HelloFresh — How AI and ML are driving business", url: "https://hellofreshgroup.com/en/newsroom/stories/how-ai-and-machine-learning-are-driving-business-at-hellofresh-se/" },
        },
        {
          html: "<strong>Packaging-optimisation ML</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — ML algorithm minimising over-packaging in the supply chain. SSRN paper details the system.",
          source: { label: "SSRN — How not to overpackage: AI for sustainability at HelloFresh", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5017081" },
        },
      ],
    },
    quantifiedROI: {
      html: "<strong>Scale:</strong> ~70 data scientists + ML engineers deploying ~1,500 models per week. AI/ML investment ongoing for 6+ years. Sustainability ML reduces over-packaging.",
      source: { label: "HelloFresh — How AI and ML are driving business", url: "https://hellofreshgroup.com/en/newsroom/stories/how-ai-and-machine-learning-are-driving-business-at-hellofresh-se/" },
    },
    consumerFacing: "<strong>Yes, deeply.</strong> Meal recommendations are the core consumer surface. Every meal pick is mediated by ML.",
    genAI: { mentioned: false, note: "HelloFresh's AI is classical/predictive ML (recommenders, LTV, churn, packaging optimisation). Public artefacts pre-date the GenAI wave and remain non-generative." },
    stackTable: [
      { layer: "Recommendation ML", product: "Embedding-based recommender (internal)", use: "Personalised meal recommendations", source: { label: "HelloTech — Embedding-based recommendations", url: "https://engineering.hellofresh.com/enhancing-the-customer-experience-with-machine-learning-personalized-meal-recommendations-using-2277bf862da4" } },
      { layer: "Data + AI cloud", product: "Snowflake AI Data Cloud", use: "Menu-planning + analytics insights", source: { label: "Snowflake — HelloFresh", url: "https://www.snowflake.com/en/customers/all-customers/case-study/hellofresh/" } },
      { layer: "First-party data", product: "Snowplow", use: "Customer-data infrastructure", source: { label: "Snowplow — HelloFresh", url: "https://snowplow.io/customers/hellofresh" } },
      { layer: "Sustainability ML", product: "Packaging optimisation algorithm", use: "Reduces over-packaging across supply chain", source: { label: "SSRN — Packaging ML at HelloFresh", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5017081" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Snowflake — AI Data Cloud",
        status: "confirmed",
        caseStudy: { label: "Snowflake Customer Story — HelloFresh", url: "https://www.snowflake.com/en/customers/all-customers/case-study/hellofresh/" },
        note: "Insights for menu-planning + analytics. Public Snowflake customer story.",
      },
      {
        name: "Snowplow — first-party customer data",
        status: "confirmed",
        caseStudy: { label: "Snowplow Customer Story — HelloFresh", url: "https://snowplow.io/customers/hellofresh" },
        note: "First-party data infrastructure powering recommendations + LTV.",
      },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Snowflake + Snowplow are the data anchors. No public hyperscaler relationship despite ~70-person ML org. No hyperscaler or foundation-model vendor is named for the meal-recommender or customer-service stack.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €6.8B (-9% c/c, deliberate), AEBITDA +14% to €423M, FCF returned to positive at €19M. Contribution margin 26.8% (+1pp). Meal-kit growth expected to return in 18-20 months." },
    { lead: "AI posture.", body: "Performer 4.0. ~70 data scientists deploying ~1,500 ML models/week. Embedding-based meal recommender is the marquee. Snowflake + Snowplow data layer. Sustainability ML for packaging." },
    { lead: "Vendor footprint.", body: "No hyperscaler footprint disclosed despite a mature ML practice. Snowflake anchors the data stack. No GenAI vendor is named for the recommender or customer-service stack." },
  ],
  sources: [
    { label: "HelloFresh — FY2025 preliminary results", url: "https://www.eqs-news.com/news/corporate/hellofresh-group-preliminary-results-for-the-fiscal-year-2025/3c4b9b58-7b5f-46dd-887f-098548c4f5fa_en" },
    { label: "HelloFresh — FY2025 strong AEBITDA performance", url: "https://www.eqs-news.com/news/corporate/fy-2025-hellofresh-se-continues-to-show-strong-aebitda-performance-while-efficiency-program-progresses-meaningfully/edbe648f-d750-405d-85fb-b1b0a60c6126_en" },
    { label: "HelloFresh — How AI and ML are driving business", url: "https://hellofreshgroup.com/en/newsroom/stories/how-ai-and-machine-learning-are-driving-business-at-hellofresh-se/" },
    { label: "HelloTech — Personalised meal recommendations using embeddings", url: "https://engineering.hellofresh.com/enhancing-the-customer-experience-with-machine-learning-personalized-meal-recommendations-using-2277bf862da4" },
    { label: "Snowflake Customer Story — HelloFresh", url: "https://www.snowflake.com/en/customers/all-customers/case-study/hellofresh/" },
    { label: "Snowplow Customer Story — HelloFresh", url: "https://snowplow.io/customers/hellofresh" },
    { label: "HelloFresh Careers — Lee Zen VP of Machine Learning interview", url: "https://careers.hellofresh.com/global/en/blogarticle/insights-into-hellofresh-by-lee-zen-vp-of-machine-learning-ai" },
    { label: "SSRN — How Not to Overpackage: AI for sustainability at HelloFresh", url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5017081" },
  ],
  askPrompts: [
    "What did HelloFresh report for FY2025?",
    "How does HelloFresh's embedding-based meal recommender work?",
    "What's HelloFresh's Snowflake + Snowplow data stack?",
    "Who is Lee Zen and what does the VP of Machine Learning do?",
  ],
};

// =============================================================================
// Henkel — FY2025 published; SAP+Microsoft+Adobe; AI-generated Persil TV
// =============================================================================
export const henkel_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-03-11" },
    lastReported: { label: "FY2025 results", date: "2026-03-11" },
    next: { label: "H1 2026 results", date: "Early August 2026" },
    blurb: "FY2025 published 11 Mar 2026 (€20.5B sales, EBIT 14.8%, +50bps). Henkel reports annual + H1 only — no Q1 trading update. Next update H1 2026 in early August.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€20.5B", reported: "Stable", note: "FY2025; consumer-brands top-10 (~60% of revenue) strong organic growth" },
      opMargin: {
        value: "14.8%",
        growth: { absolute: "EBIT €3.0B", pct: "+50bps", basis: "EBIT margin FY2025 vs FY2024" },
        note: "Operating profit €2.82B",
      },
      employees: { value: "47K" },
    },
    operatingComplexity: {
      hq: { value: "Germany 🇩🇪" },
      countries: { value: "120+" },
      brands: { value: "9+", note: "Persil, Schwarzkopf, Loctite, Pritt, Dial, Got2b, Fa, Bref, Pattex" },
    },
    whyMatters: "Consumer brands (laundry / hair care) + Adhesives Technologies (industrial). AI levers: marketing creative (GenAI Persil TV ad), R&D (adhesive lab automation), employee productivity (Microsoft + SAP), commerce.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "GenAI on the Persil White Lady.",
      body: "Henkel launched Germany's first GenAI-supported TV commercial in 2025 for Persil, modernising the iconic White Lady character. Plus AI-driven adhesive R&D lab automation, and SAP + Microsoft + Adobe strategic-tech partnerships.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Michael Nilles</strong> · Chief Digital and Information Officer (CDIO). Public on AI/digital strategy. <strong>Carsten Knobel</strong> · CEO; carries strategic narrative externally including Purposeful Growth Agenda.",
      source: { label: "Henkel — FY2025 results press release", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
    },
    appointmentsNote: "CDIO seat fused — typical Performer governance model. Strategic-partnership emphasis on SAP + Microsoft + Adobe as named anchors.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>GenAI-supported Persil TV commercial</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + creative agency</span> — Germany's first GenAI-supported TV commercial; modernises the iconic Persil White Lady. Launched 2025.",
          source: { label: "Henkel — FY2025 results announcement (Persil GenAI TV)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
        },
        {
          html: "<strong>Adhesives R&amp;D lab automation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal AI</span> — AI used for process automation in the adhesives development laboratories.",
          source: { label: "Henkel — FY2025 announcement (R&D AI lab automation)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
        },
        {
          html: "<strong>SAP + Microsoft + Adobe strategic stack</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· SAP / Microsoft / Adobe</span> — Strategic partnerships with leading global digital companies (SAP, Microsoft, Adobe) anchor the AI rollout.",
          source: { label: "Henkel — FY2025 results press release", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
        },
      ],
    },
    consumerFacing: "<strong>Yes.</strong> Persil GenAI TV commercial is direct-to-consumer in Germany. Other consumer-AI sits inside e-commerce / personalisation work, not flagship apps.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft" }, { name: "Adobe" }, { name: "SAP" }], note: "Persil GenAI TV commercial is the marquee creative-GenAI artefact (Germany's first)." },
    stackTable: [
      { layer: "GenAI creative", product: "Persil GenAI TV commercial", use: "Germany's first GenAI-supported TV ad", source: { label: "Henkel — FY2025 results", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" } },
      { layer: "R&D automation", product: "Adhesives lab AI", use: "Process automation in development laboratories", source: { label: "Henkel — FY2025 R&D AI", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" } },
      { layer: "Enterprise stack", product: "SAP + Microsoft + Adobe", use: "Strategic-partnership anchor for AI rollout", source: { label: "Henkel — FY2025 announcement (strategic partnerships)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      {
        name: "Microsoft — strategic digital partner",
        status: "confirmed",
        caseStudy: { label: "Henkel — FY2025 announcement (named SAP/Microsoft/Adobe partners)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
        note: "Named as a leading global digital partner alongside SAP and Adobe in Henkel's FY2025 results commentary.",
      },
      {
        name: "Adobe — creative + GenAI partner",
        status: "confirmed",
        caseStudy: { label: "Henkel — FY2025 announcement (Adobe partnership)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
        note: "Named partner for digital + creative tooling.",
      },
      { name: "SAP (ERP + data)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft + Adobe + SAP as named strategic partners in FY2025 results. Google / AWS / Anthropic / OpenAI-direct / Mistral not disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "Persil", description: "Laundry flagship. Germany's first GenAI-supported TV commercial (2025) modernising the iconic White Lady.", source: { label: "Henkel — FY2025 results (Persil GenAI TV)", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" } },
      { brand: "Schwarzkopf", description: "Hair-care portfolio. Consumer-brand AI lives in marketing creative + e-commerce." },
      { brand: "Loctite + Pritt + Pattex", description: "Adhesives Technologies portfolio. AI used in process automation in the development laboratories." },
      { brand: "Dial + Got2b + Fa", description: "Mass beauty + body care. Group-level marketing AI flows through these brands." },
    ],
    note: "Persil leads on consumer-AI artefacts. Adhesives R&D AI lives at the BU level under Adhesives Technologies.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue ~€20.5B, EBIT €3.0B, EBIT margin 14.8% (+50bps). Op profit €2.82B. Top-10 consumer brands (~60% of revenue) delivered very strong organic growth + volume." },
    { lead: "AI posture.", body: "Performer. Persil GenAI TV commercial is the marquee. Adhesives R&D lab AI underpins the industrial side. Strategic partnerships with SAP + Microsoft + Adobe explicitly named in FY2025 results." },
    { lead: "Vendor footprint.", body: "Microsoft + Adobe + SAP house. No Anthropic, OpenAI-direct, Google, AWS, or Mistral relationship disclosed. The Persil GenAI creative work names no external model vendor." },
  ],
  sources: [
    { label: "Henkel — FY2025 results press release", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-henkel-delivers-organic-growth-in-2025-and-increases-profitability-through-innovation-and-more-efficiency-2131952" },
    { label: "Henkel — Publication of 2025 Annual Report", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2026-03-11-publication-of-2025-annual-report-2129200" },
    { label: "Henkel — H1 2025 financial report announcement", url: "https://www.henkel.com/press-and-media/press-releases-and-kits/2025-08-07-publication-half-year-financial-report-2025-2076970" },
    { label: "MarketScreener — Henkel cautious 2025 revenue forecast", url: "https://www.marketscreener.com/news/henkel-adopts-cautious-stance-on-2025-revenue-forecast-ce7c5eded08cf72c" },
    { label: "Henkel North America — Purposeful Growth Agenda 2024 results", url: "https://www.henkel-northamerica.com/press/press-releases-and-kits/2025-11-03-very-good-annual-results-2024-demonstrate-successful-implementation-of-purposeful-growth-agenda-2044674" },
    { label: "Henkel — Investor relations hub", url: "https://www.henkel.com/investors-and-analysts" },
  ],
  askPrompts: [
    "What did Henkel report for FY2025?",
    "What is the Persil GenAI TV commercial?",
    "How is Henkel using AI in adhesives R&D labs?",
    "Who is Michael Nilles and what does the CDIO seat cover?",
  ],
};

// =============================================================================
// Hermès — FY2025 published; conservative AI clientelling under Ken Feyder/Yannick Neff
// =============================================================================
export const hermes_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025", date: "2026-02-12" },
    lastReported: { label: "Q1 2026 revenue", date: "2026-04-17" },
    next: { label: "H1 2026 results", date: "Late July 2026" },
    blurb: "FY2025 published 12 Feb 2026. Q1 2026 revenue published 17 Apr 2026 (€4.1B, +6% c/c, -1% reported on -€290M FX). Americas +17.2%, Japan +9.6%; Middle East -5.9% on geopolitics.",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€16.0B", reported: "+5.5%", organic: "+9% c/c", note: "FY2025; record-breaking year" },
      opMargin: {
        value: "41.0%",
        growth: { absolute: "+€430M", pct: "+7%", basis: "Recurring op income FY2025 €6.6B vs ~€6.2B FY2024" },
        note: "Highest op margin on the watchlist",
      },
      employees: { value: "23K" },
    },
    operatingComplexity: {
      hq: { value: "France 🇫🇷" },
      countries: { value: "45+" },
      brands: { value: "1", note: "Hermès (master maison)" },
      stores: { value: "~290 directly-operated" },
    },
    whyMatters: "Highest-end luxury (silk, leather, ready-to-wear, fragrance, watches, jewellery, home). 41% op margin is industry benchmark. AI levers: clientelling (deep-connection style, not conversion), supply-chain integrity, anti-counterfeit, creative content. Conservative posture by design.",
    quarterlyUpdate: {
      label: "Q1 2026 revenue",
      date: "17 April 2026",
      blurb: "Resilient Q1 amid geopolitics + FX. €4.1B revenue (+6% c/c, -1% reported on -€290M FX from weak USD). Americas led at +17.2%; Middle East -5.9% from UAE/Kuwait/Qatar/Bahrain disruption. April improved vs March.",
      metrics: [
        { label: "Group revenue", value: "€4.1B", trend: "+6% c/c / -1% reported" },
        { label: "Americas", value: "€739M", trend: "+17.2% c/c" },
        { label: "Japan", value: "€404M", trend: "+9.6% c/c" },
        { label: "Europe ex-FR", value: "€538M", trend: "+9.7% c/c" },
        { label: "Middle East", value: "€160M", trend: "-5.9% c/c (geopolitics)" },
        { label: "FX headwind", value: "-€290M", trend: "Weakening USD vs EUR" },
      ],
      reading: "Americas surge (+17%) and Japan resilience offset Middle East drag. Conservative AI posture continues — tech enables clientelling at this pace, not disrupts it. April > March suggests Q2 momentum.",
      source: { label: "Hermès Finance — Q1 2026 revenue", url: "https://finance.hermes.com/en/publications/first-quarter-2026-revenue/" },
    },
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 2.5", rhetoric: 1, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: {
    framing: {
      headline: "Human-first, technology underneath.",
      body: "Hermès openly says technology's role is to enable the business — \"the human touch remains at the very heart of luxury retail.\" AI is used in clientelling but for deeper connection, not conversion. Lowest AI rhetoric on the watchlist by design.",
    },
    dedicatedSection: {
      headline: "No standalone AI investor narrative.",
      body: "Annual report and investor materials carry minimal AI commentary. Hermès deliberately under-talks its tech adoption.",
    },
  },
  leadership: {
    presenter: {
      html: "<strong>Yannick Neff</strong> · Group Chief Technology Officer (appointed 2025). <strong>Ken Feyder</strong> · CIO. Both report up through COO Florian Craen. Public statements emphasise tech-enables-business, not tech-disrupts-business.",
      source: { label: "Klover.AI — Hermès AI strategy in luxury", url: "https://www.klover.ai/hermes-ai-strategy-dominance-in-luxury/" },
    },
    appointmentsNote: "CTO + CIO split (uncommon at this size) signals tech maturity. New CTO appointed 2025 may signal a step-up.",
  },
  production: {
    namedTools: {
      tools: [
        {
          html: "<strong>AI-augmented clientelling</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal CRM</span> — In-store sales staff use AI insights to offer thoughtful, bespoke service. Used to identify opportunities for deeper connection — not conversion.",
          source: { label: "Klover.AI — Hermès AI strategy", url: "https://www.klover.ai/hermes-ai-strategy-dominance-in-luxury/" },
        },
      ],
    },
    consumerFacing: "<strong>Indirect.</strong> Clienteling is staff-mediated, not direct-to-consumer GenAI. No flagship consumer AI app.",
    genAI: { mentioned: false, note: "No public GenAI vendor partnership. Hermès is the most conservative AI adopter in luxury fashion." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led tech (no public hyperscaler partnership)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Hermès has no public hyperscaler / GenAI partnership. Most conservative AI posture on the watchlist by design — leadership explicitly frames tech as a business enabler, not a disruptor. Leadership's public framing is explicitly human-first.",
  },
  byMaison: {
    maisons: [
      { brand: "Leather goods & saddlery", description: "Largest division (+13% in 2025). Anti-counterfeit + supply-chain integrity AI lives here." },
      { brand: "Silk & textiles", description: "+5% in 2025. Heritage craft division." },
      { brand: "Ready-to-wear & accessories", description: "+6% in 2025. Clientelling AI most active here." },
      { brand: "Perfume & beauty", description: "-8% in 2025. Soft tier; less AI investment." },
      { brand: "Watches", description: "-2% in 2025 with H2 recovery. Heritage watch business." },
    ],
    note: "Brand-level AI is minimal by design. Most public AI work is staff-mediated clienteling across leather + ready-to-wear.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: €16B revenue (+9% c/c, +5.5% reported), recurring op income €6.6B (41% of sales, +7% YoY), net profit €4.5B (+5.5%). Industry-best margin. Leather goods +13%; perfume -8%, watches -2% (H2 recovery)." },
    { lead: "AI posture.", body: "Silent Builder. Lowest AI rhetoric on the watchlist by design. AI in clientelling for deeper connection, not conversion. New CTO Yannick Neff (2025) + CIO Ken Feyder. Conservative posture is part of the brand promise." },
    { lead: "Vendor footprint.", body: "No public hyperscaler or GenAI footprint. Leadership's public framing is explicitly human-first and artisan-led." },
  ],
  sources: [
    { label: "Hermès — 2025 Full-Year Results press release", url: "https://assets-finance.hermes.com/s3fs-public/node/pdf_file/2026-02/1770842738/hermes_20260212_pr_2025fullyearresults_va.pdf" },
    { label: "Hermès — 2025 Full-Year Results presentation", url: "https://assets-finance.hermes.com/s3fs-public/node/pdf_file/2026-03/1774265196/20250212_hermes-2025fullyearresultspresentation_en.pdf" },
    { label: "Retail Insight — Hermès €16B 2025 revenue", url: "https://www.retail-insight-network.com/news/hermes-reports-e16bn-2025-revenue/" },
    { label: "Modaes — Hermès €16B sales, 1.72% net profit dip", url: "https://www.modaes.com/global/companies/hermes-exceeds-16-billion-euros-in-sales-and-cuts-net-profit-by-172-in-2025" },
    { label: "Klover.AI — Hermès AI Strategy: Dominance in Luxury", url: "https://www.klover.ai/hermes-ai-strategy-dominance-in-luxury/" },
    { label: "Hermès Finance — Group management", url: "https://finance.hermes.com/en/group-management/" },
    { label: "Hermès — IT & Digital careers (talent page)", url: "https://talents.hermes.com/en/sites/CX/pages/38009" },
  ],
  askPrompts: [
    "What did Hermès report for FY2025?",
    "Why does Hermès take such a conservative AI posture?",
    "Who is Yannick Neff and what does the new Group CTO seat mean?",
    "How does Hermès use AI in clienteling?",
  ],
};

// =============================================================================
// H&M — Q1 FY2026 reported 27 Mar 2026; Google Cloud Dialogflow + Soul Machines
// =============================================================================
export const hm_final: Partial<CompanyTemplateData> = {
  cadence: {
    baseline: { label: "FY2025 (52w to 30 Nov 2025)", date: "2026-01-29" },
    lastReported: { label: "Q1 FY2026 results (Dec 2025-Feb 2026)", date: "2026-03-27" },
    next: { label: "Q2 FY2026 results", date: "Late June 2026" },
    blurb: "Swedish fiscal year ends Nov. FY2025 published Jan 2026. Q1 FY2026 published 27 Mar 2026 (op profit +25.7% to SEK 1.51B).",
  },
  investor: {
    fiscalYearLabel: "FY2025 baseline · Q1 FY2026 reported",
    headline: {
      revenue: { value: "SEK 49.6B (Q1)", reported: "-10%", note: "Q1 FY26: ~$5.3B; gross margin +160bps to 50.7%" },
      opMargin: {
        value: "3.0%",
        growth: { absolute: "+SEK 309M", pct: "+25.7%", basis: "Q1 op profit FY26 vs FY25; FY25 net profit €1.15B (+43%)" },
        note: "Q1 op margin from 2.2% → 3.0%",
      },
      employees: { value: "107K" },
    },
    operatingComplexity: { hq: { value: "Sweden 🇸🇪" }, countries: { value: "75+" }, brands: { value: "6", note: "H&M, COS, Arket, & Other Stories, Weekday, Monki" }, stores: { value: "4,101" } },
    whyMatters: "Mass-fashion at global scale. AI levers: virtual assistant (Google Cloud + Soul Machines), trend forecasting, supply-chain demand sensing, AI digital model twins. Strong responsible-AI narrative.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Google Cloud anchored, ethics-led.", body: "H&M Virtual Assistant on Google Cloud Dialogflow + Soul Machines avatars. Trained on 10M historical tickets. Plus AI digital twins of 30 models for marketing. Linda Leopold's Responsible AI org is the watchlist's strongest ethics narrative." } },
  leadership: {
    presenter: { html: "<strong>Linda Leopold</strong> · Head of Responsible AI &amp; Data at H&amp;M Group. Public on AI ethics, MIT Sloan published on H&amp;M's responsible-AI strategy. <strong>Daniel Erver</strong> · CEO.", source: { label: "MIT Sloan — AI Ethics Strategy Lessons from H&M Group", url: "https://sloanreview.mit.edu/article/ai-ethics-strategy-lessons-from-hm-group/" } },
    appointmentsNote: "Distinct Responsible AI seat is unusual at watchlist scale; signals AI maturity + governance.",
  },
  production: {
    namedTools: {
      tools: [
        { html: "<strong>H&amp;M Virtual Assistant</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud Dialogflow + Nuance + Soul Machines</span> — GenAI chatbot + photoreal avatars. Trained on 10M historical tickets. 32 languages.", source: { label: "DigitalDefynd — 10 Ways H&M is using AI [2026]", url: "https://digitaldefynd.com/IQ/hm-using-ai-case-study/" } },
        { html: "<strong>AI digital model twins</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — Synthetic AI twins of 30 H&amp;M models for marketing/social. Watermarked + clearly labelled.", source: { label: "H&M Group — AI creativity exploration", url: "https://hmgroup.com/news/hm-continues-its-exploration-of-creativity-with-ai/" } },
        { html: "<strong>Trend forecasting + demand sensing</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud + ML</span> — Trend AI scanning social, blogs, search. Supply chain demand-AI for waste reduction.", source: { label: "AI Expert Network — H&M case study", url: "https://aiexpert.network/case-study-how-hm-leverages-ai-for-supply-chain-efficiency-and-customer-experience/" } },
      ],
    },
    consumerFacing: "<strong>Yes.</strong> Virtual Assistant is the cleanest direct-to-consumer GenAI surface. AI model twins appear in marketing.",
    genAI: { mentioned: true, vendors: [{ name: "Google Cloud Dialogflow", url: "https://digitaldefynd.com/IQ/hm-using-ai-case-study/" }, { name: "Soul Machines (avatars)" }, { name: "Nuance" }], note: "Google Cloud is the named hyperscaler partner. Soul Machines + Nuance are the GenAI front-end specialists." },
    stackTable: [
      { layer: "Conversational GenAI", product: "Google Cloud Dialogflow + Soul Machines + Nuance", use: "Virtual Assistant; 32 languages", source: { label: "DigitalDefynd — H&M AI", url: "https://digitaldefynd.com/IQ/hm-using-ai-case-study/" } },
      { layer: "Synthetic media", product: "Internal GenAI", use: "30 AI model twins for marketing", source: { label: "H&M Group — AI creativity exploration", url: "https://hmgroup.com/news/hm-continues-its-exploration-of-creativity-with-ai/" } },
      { layer: "Responsible AI", product: "H&M Responsible AI framework", use: "Ethics + governance", source: { label: "H&M Group — Responsible AI", url: "https://hmgroup.com/our-stories/responsible-ai-is-better-ai/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Google Cloud — Dialogflow + Cloud AI", status: "confirmed", caseStudy: { label: "DigitalDefynd — H&M Virtual Assistant case study", url: "https://digitaldefynd.com/IQ/hm-using-ai-case-study/" }, note: "H&M's primary hyperscaler partner. Anchors Virtual Assistant + trend / supply-chain AI." },
      { name: "Soul Machines (photoreal avatars)", status: "confirmed" },
      { name: "Nuance (NLP for assistant)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Google Cloud-anchored. Microsoft / Anthropic / OpenAI / Mistral / AWS absent. The public narrative leads with ethics and responsible AI.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025 net profit €1.15B (+43%). Q1 FY26 (Dec 2025-Feb 2026): SEK 49.6B (-10%), op profit +25.7%, op margin 3.0% (vs 2.2%). Profitability turnaround, sales softness." },
    { lead: "AI posture.", body: "Performer 4.0. Google Cloud Dialogflow + Soul Machines avatars + Nuance for the 10M-ticket-trained Virtual Assistant. AI twin marketing campaign + Linda Leopold's Responsible AI seat." },
    { lead: "Vendor footprint.", body: "Google Cloud is the named partner. No Microsoft, Anthropic, OpenAI, or Mistral relationship is disclosed. The AI-twin marketing work names no external model vendor." },
  ],
  sources: [
    { label: "H&M — FY2025 full-year report PDF", url: "https://hmgroup.com/wp-content/uploads/2026/01/H-M-Hennes-Mauritz-AB-Full-year-report-2025.pdf" },
    { label: "Just-Style — H&M Q1 FY26 cost controls", url: "https://www.just-style.com/news/hm-q1-resultfy26/" },
    { label: "Modaes — H&M Q1 FY26 profitability +25%", url: "https://www.modaes.com/global/companies/hampm-improves-profitability-by-25-in-the-first-quarter" },
    { label: "DigitalDefynd — 10 Ways H&M is using AI [2026]", url: "https://digitaldefynd.com/IQ/hm-using-ai-case-study/" },
    { label: "H&M Group — AI creativity exploration", url: "https://hmgroup.com/news/hm-continues-its-exploration-of-creativity-with-ai/" },
    { label: "MIT Sloan — AI Ethics Strategy Lessons from H&M", url: "https://sloanreview.mit.edu/article/ai-ethics-strategy-lessons-from-hm-group/" },
    { label: "H&M Group — Responsible AI is better AI", url: "https://hmgroup.com/our-stories/responsible-ai-is-better-ai/" },
    { label: "AI Expert Network — H&M AI case study", url: "https://aiexpert.network/case-study-how-hm-leverages-ai-for-supply-chain-efficiency-and-customer-experience/" },
  ],
  askPrompts: ["What did H&M report in Q1 FY2026?", "How does H&M's Virtual Assistant work?", "Who is Linda Leopold and what is the Responsible AI seat?", "How does H&M use AI digital model twins?"],
};

// =============================================================================
// IKEA / Inter IKEA / Ingka — FY25; Microsoft Hej Copilot + AI literacy push
// =============================================================================
export const ikea_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025 (52w to 31 Aug 2025)", date: "2025-10-09" }, lastReported: { label: "FY2025 results", date: "2025-10-09" }, next: { label: "FY2026 H1", date: "Spring 2026" }, blurb: "IKEA fiscal year ends Aug; FY2025 published Oct 2025. Privately-held (Inter IKEA + Ingka) so reporting is annual only." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: {
      revenue: { value: "€26.3B", reported: "-0.8%", note: "Inter IKEA Group FY25" },
      opMargin: { value: "Op profit €1.7B", growth: { absolute: "Net income €1.5B", basis: "Resumption of normal levels; volumes up, gross margin normalising", estimated: true }, note: "Affordability investments + tariffs offset" },
      employees: { value: "230K", note: "Including Ingka" },
    },
    operatingComplexity: { hq: { value: "Netherlands 🇳🇱 / Sweden 🇸🇪" }, countries: { value: "60+" }, brands: { value: "1", note: "IKEA (master brand)" }, stores: { value: "470+" } },
    whyMatters: "Furniture + home retail at global scale. AI levers: Hej Copilot for co-workers, AI-powered room design for customers, supply chain, sustainability. Massive AI-literacy programme (~70K trained by FY26).",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI-literacy at scale.", body: "Hej Copilot (Microsoft) is the named GenAI tool. AI-literacy training to ~70K co-workers by FY26 (~half the org). Joined Partnership on AI alongside Apple, Microsoft, Google. AI-powered room-design experience for customers. Massive scale + governance." } },
  leadership: { presenter: { html: "<strong>Parag Parekh</strong> · Chief Digital Officer at Ingka Group. <strong>Jesper Brodin</strong> · CEO Ingka. <strong>Per Krokstäde</strong> · Inter IKEA tech leadership. AI-literacy programme is a CEO-level priority.", source: { label: "Ingka — IKEA AI revolution upskilling thousands", url: "https://www.ingka.com/newsroom/ikea-retail-unleashes-ai-revolution-empowering-thousands-to-master-the-future-of-tech/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Hej Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — GenAI tool for co-workers: text + image creation, ideas, presentations.", source: { label: "Inter IKEA — FY25 financial results (Hej Copilot)", url: "https://www.inter.ikea.com/en/performance/fy25-financial-results" } },
      { html: "<strong>AI-powered room design experience</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — Customers create lifelike room designs with AI.", source: { label: "IKEA — AI-powered digital experience launch", url: "https://www.ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890/" } },
      { html: "<strong>AI literacy training programme</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + Microsoft</span> — Target ~70K co-workers trained by FY26.", source: { label: "Ingka — IKEA AI revolution training thousands", url: "https://www.ingka.com/newsroom/ikea-retail-unleashes-ai-revolution-empowering-thousands-to-master-the-future-of-tech/" } },
    ] },
    consumerFacing: "<strong>Yes.</strong> AI-powered room design experience is direct-to-consumer.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft (Hej Copilot)", url: "https://www.inter.ikea.com/en/performance/fy25-financial-results" }], note: "Microsoft is the named hyperscaler partner via Hej Copilot." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft — Hej Copilot", status: "confirmed", caseStudy: { label: "Inter IKEA — FY25 results (Hej Copilot)", url: "https://www.inter.ikea.com/en/performance/fy25-financial-results" }, note: "Named GenAI partner. Powers co-worker productivity tool deployed across the org." },
      { name: "Partnership on AI (multi-org governance)", status: "confirmed", caseStudy: { label: "Ingka — IKEA joins Partnership on AI", url: "https://www.ingka.com/newsroom/ikea-joins-global-partnership-to-shape-the-future-of-ai/" }, note: "100+ partners including Apple, Microsoft, Google, Amnesty International." },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft house via Hej Copilot. Partnership on AI provides governance umbrella. Anthropic / Google / OpenAI / AWS / Mistral not disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY25 (Aug 2025): revenue €26.3B (-0.8%), op profit €1.7B, net income €1.5B. Affordability + tariffs drag, but volumes up + gross margin normalising." },
    { lead: "AI posture.", body: "Performer 4.0. Hej Copilot (Microsoft) GenAI for co-workers; AI room-design for customers; ~70K co-worker AI-literacy goal by FY26. Member of Partnership on AI." },
    { lead: "Vendor footprint.", body: "Microsoft anchored. Anthropic / Google / OpenAI / AWS / Mistral not disclosed. The public narrative leads with sustainability and responsible AI." },
  ],
  sources: [
    { label: "Inter IKEA Group — FY25 financial results", url: "https://www.inter.ikea.com/en/performance/fy25-financial-results" },
    { label: "Inter IKEA Group — FY25 resilient results commentary", url: "https://www.inter.ikea.com/en/newsroom/inter-ikea-group-reports-resilient-fy25-results-amid-global-challenges" },
    { label: "Retail Dive — IKEA tariffs / affordability hit profits", url: "https://www.retaildive.com/news/tariffs-low-prices-affordability-hit-ikea-profits-2025/805106/" },
    { label: "Ingka — IKEA joins Partnership on AI", url: "https://www.ingka.com/newsroom/ikea-joins-global-partnership-to-shape-the-future-of-ai/" },
    { label: "Ingka — IKEA AI revolution training thousands", url: "https://www.ingka.com/newsroom/ikea-retail-unleashes-ai-revolution-empowering-thousands-to-master-the-future-of-tech/" },
    { label: "IKEA — AI-powered digital experience launch (room design)", url: "https://www.ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890/" },
    { label: "Ingka — Navigating AI literacy without instructions", url: "https://www.ingka.com/newsroom/no-manuals-available-how-ikea-is-navigating-ai-literacy-in-a-world-without-instructions/" },
    { label: "Inter IKEA — FY25 Financial Summary PDF", url: "https://www.inter.ikea.com/-/media/interikea/igi/financial-reports/fy25-financial-reports/inter-ikea-group-financial-summary_fy25_final.pdf" },
  ],
  askPrompts: ["What did IKEA report for FY25?", "What is Hej Copilot?", "How is IKEA training 70,000 co-workers in AI?", "What's IKEA's AI-powered room design experience?"],
};

// =============================================================================
// Inditex — FY2025 published; Zara Try-on AI virtual fitting
// =============================================================================
export const inditex_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025 (52w to 31 Jan 2026)", date: "2026-03-11" }, lastReported: { label: "FY2025 results", date: "2026-03-11" }, next: { label: "Q1 FY2026 results", date: "Mid-June 2026" }, blurb: "Spanish fiscal ends January. FY2025 published 11 Mar 2026 (€39.9B sales, EBIT 20.1%). Q1 FY26 trading +9% c/c through 8 Mar." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€39.9B", reported: "+3.2%", organic: "+7.0% c/c", note: "Online €10.7B (+4.8%)" }, opMargin: { value: "20.1%", growth: { absolute: "+€450M", pct: "+5.9%", basis: "EBIT FY2025 €8.0B vs FY2024; margin +50bps" }, note: "Net income record €6.2B (+6.0%)" }, employees: { value: "165K" } },
    operatingComplexity: { hq: { value: "Spain 🇪🇸" }, countries: { value: "215+" }, brands: { value: "8", note: "Zara, Pull&Bear, Massimo Dutti, Bershka, Stradivarius, Oysho, Zara Home, Lefties" }, stores: { value: "5,500+" } },
    whyMatters: "Largest fast-fashion group. AI levers: virtual fitting (Zara Try-on, 7M+ sessions in 43 markets), demand sensing, design + supply chain proximity, recommendations.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Zara Try-on as the marquee AI surface.", body: "Zara Try-on (live since mid-Dec 2025) generates synthetic avatars from customer photos and shows them wearing real products. 43 markets, 7M+ sessions. Most ambitious consumer-GenAI deployment in fast-fashion." } },
  leadership: { presenter: { html: "<strong>Óscar García Maceiras</strong> · CEO. <strong>Marta Ortega Pérez</strong> · Non-Executive Chair. Tech function reports through COO + Group's data &amp; analytics organisation; named CIO/CTO seats are kept low-profile.", source: { label: "Inditex — FY2025 results press release", url: "https://www.inditex.com/itxcomweb/us/en/press/news-detail/b870d5ec-6b7e-491d-b38e-340cd69036df/fy2025-results" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Zara Try-on</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — AI-based virtual fitting via synthetic avatars from customer photos. 7M+ sessions in 43 markets. Mid-Dec 2025 launch.", source: { label: "Inditex — FY2025 results / Zara Try-on", url: "https://www.inditex.com/itxcomweb/us/en/press/news-detail/b870d5ec-6b7e-491d-b38e-340cd69036df/fy2025-results" } },
      { html: "<strong>Demand-sensing + supply-chain AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Inditex's proximity-sourcing model is AI/data-anchored.", source: { label: "Inditex — FY2025 PDF", url: "https://www.inditex.com/itxcomweb/api/media/1da2c9d1-dbca-49fb-9563-982a8a27fae6/INDITEXFullYear2025.pdf" } },
    ] },
    consumerFacing: "<strong>Yes, marquee.</strong> Zara Try-on is one of the watchlist's strongest consumer-GenAI surfaces.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led" }], note: "No public hyperscaler named for Zara Try-on. Internal GenAI build." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led GenAI (Zara Try-on)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI vendor case study. Inditex builds AI internally; no foundation-model partner is disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €39.9B (+7% c/c), EBIT €8.0B (+5.9%), margin 20.1%, net income record €6.2B (+6%). Online €10.7B (+4.8%). Q1 FY26 trading +9% c/c — strong start." },
    { lead: "AI posture.", body: "Performer 4.0. Zara Try-on is the marquee — 7M+ sessions in 43 markets since mid-Dec 2025. No publicly named hyperscaler partner. Strong proximity-sourcing demand-AI under the hood." },
    { lead: "Vendor footprint.", body: "No Microsoft, Google, OpenAI, Anthropic, AWS, or Mistral footprint disclosed. The foundation-model layer behind Zara Try-on is not public." },
  ],
  sources: [
    { label: "Inditex — FY2025 Results press release", url: "https://www.inditex.com/itxcomweb/us/en/press/news-detail/b870d5ec-6b7e-491d-b38e-340cd69036df/fy2025-results" },
    { label: "Inditex — FY2025 PDF", url: "https://www.inditex.com/itxcomweb/api/media/1da2c9d1-dbca-49fb-9563-982a8a27fae6/INDITEXFullYear2025.pdf" },
    { label: "Investing.com — Inditex FY2025 slides", url: "https://www.investing.com/news/company-news/inditex-fy2025-slides-sales-rise-7-in-cc-net-income-up-6-93CH-4553748" },
    { label: "RTÉ — Zara owner Inditex record profit 2025", url: "https://www.rte.ie/news/business/2026/0311/1562752-zara-owner-inditex-posts-record-profit-in-2025/" },
    { label: "Sporting Goods Intelligence — Inditex record FY25 results", url: "https://www.sgieurope.com/financial/inditex-posts-record-sales-and-profits-in-fy25/120163.article" },
    { label: "Inditex — 9M 2025 interim PDF", url: "https://www.inditex.com/itxcomweb/api/media/8864e4e2-d9b4-415b-bffc-568df981ca94/INDITEX9M2025Results.pdf" },
    { label: "Inditex — Investors / finance hub", url: "https://www.inditex.com/itxcomweb/et/en/investors/finance" },
  ],
  askPrompts: ["What did Inditex report for FY2025?", "What is Zara Try-on and how does it work?", "What's Inditex's hyperscaler footprint?", "How does Inditex use demand-sensing AI in supply chain?"],
};

// =============================================================================
// Jeronimo Martins — FY2025 published; Pingo Doce + SymphonyAI merchandising
// =============================================================================
export const jeronimo_martins_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-19" }, lastReported: { label: "FY2025 results", date: "2026-03-19" }, next: { label: "Q1 2026 results", date: "6 May 2026" }, blurb: "FY2025 published 19 Mar 2026 (€36B sales, EBITDA €2.48B, net profit €646M). Q1 2026 results scheduled for 6 May 2026." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€36.0B", reported: "+7.6%", note: "Biedronka (Poland) ~€25B" }, opMargin: { value: "EBITDA €2.48B", growth: { absolute: "+€225M", pct: "EBITDA +~10%, margin 7.9%", basis: "FY2025 vs FY2024" }, note: "Net profit €646M (+7.9%)" }, employees: { value: "135K" } },
    operatingComplexity: { hq: { value: "Portugal 🇵🇹" }, countries: { value: "3", note: "Portugal + Poland + Colombia" }, brands: { value: "5", note: "Biedronka, Pingo Doce, Recheio, Hebe, Ara" } },
    whyMatters: "Portuguese-led discount + grocery group. AI levers: AI-powered self-checkout (Pingo Doce restaurants), merchandising (SymphonyAI), supply chain. Strong Pingo Doce-led AI surface.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "SymphonyAI + Pingo Doce restaurants AI tray.", body: "Pingo Doce partnered with SymphonyAI on the CINDE Connected Retail platform for AI-driven merchandising + CPG collaboration. Plus AI-powered restaurant payments via tray-recognition (Retail Robotics Solutions). Leading-edge AI in Portuguese grocery." } },
  leadership: { presenter: { html: "<strong>Pedro Soares dos Santos</strong> · Executive Chairman + CEO. <strong>Luís Bencatel</strong> · Group CIO. Pingo Doce CEO Pedro Bento Ferreira drives in-store AI initiatives.", source: { label: "Jerónimo Martins — Annual Report 2025", url: "https://reports.jeronimomartins.com/annual-report/2025/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>SymphonyAI CINDE Connected Retail</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· SymphonyAI</span> — AI-driven merchandising platform: real-time, prescriptive insights for execution + supplier alignment.", source: { label: "SymphonyAI — Pingo Doce AI merchandising case study", url: "https://www.symphonyai.com/news/retail-cpg/pingo-doce-ai-driven-merchandising-cpg-collaboration/" } },
      { html: "<strong>AI restaurant tray recognition</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Retail Robotics Solutions</span> — Pingo Doce restaurants automatically identify items on a tray (shape, colour, texture) for self-checkout payment.", source: { label: "The Portugal News — Pingo Doce AI self-checkout", url: "https://www.theportugalnews.com/news/2025-04-11/pingo-doce-launches-ai-powered-self-checkout/96852" } },
    ] },
    consumerFacing: "<strong>Yes.</strong> Pingo Doce restaurant tray-recognition payment is consumer-facing AI at the till.",
    genAI: { mentioned: false, note: "Operational AI (merchandising, image recognition). Not yet generative." },
  },
  vendorStack: {
    namedPartners: [
      { name: "SymphonyAI — CINDE Connected Retail", status: "confirmed", caseStudy: { label: "SymphonyAI — Pingo Doce merchandising case study", url: "https://www.symphonyai.com/news/retail-cpg/pingo-doce-ai-driven-merchandising-cpg-collaboration/" }, note: "Real-time AI for merchandising + supplier collaboration. Public retail-AI customer story." },
      { name: "Retail Robotics Solutions (tray recognition)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "SymphonyAI-anchored. No public hyperscaler relationship. No GenAI vendor is disclosed for customer service or recommendations.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €36.0B (+7.6%), EBITDA +~10% to €2.48B, margin 7.9%, net profit €646M (+7.9%). Biedronka (Poland) is the engine at ~€25B." },
    { lead: "AI posture.", body: "Performer 3.5. Pingo Doce + SymphonyAI for AI merchandising, AI tray-recognition payments at restaurants. Polish-side Biedronka quieter." },
    { lead: "Vendor footprint.", body: "SymphonyAI is the only named AI vendor. No hyperscaler, and no GenAI vendor for customer experience or demand sensing, is disclosed." },
  ],
  sources: [
    { label: "Jerónimo Martins — Annual Report 2025", url: "https://reports.jeronimomartins.com/annual-report/2025/" },
    { label: "Jerónimo Martins — 2024 Annual Results press conference", url: "https://www.jeronimomartins.com/en/press_releases/pr_20250320_1_en/" },
    { label: "Jerónimo Martins — Investor results hub", url: "https://www.jeronimomartins.com/en/investors/financial-results/" },
    { label: "SymphonyAI — Pingo Doce AI merchandising case study", url: "https://www.symphonyai.com/news/retail-cpg/pingo-doce-ai-driven-merchandising-cpg-collaboration/" },
    { label: "The Portugal News — Pingo Doce AI self-checkout", url: "https://www.theportugalnews.com/news/2025-04-11/pingo-doce-launches-ai-powered-self-checkout/96852" },
    { label: "Retail Tech Innovation Hub — Pingo Doce x SymphonyAI", url: "https://retailtechinnovationhub.com/home/2025/10/14/portuguese-retailer-pingo-doce-enlists-symphonyai-to-modernise-merchandising-and-cpg-collaboration" },
    { label: "Retail Insight — Pingo Doce + SymphonyAI for AI-powered merchandising", url: "https://www.retail-insight-network.com/news/pingo-doce-symphonyai-retail-tech/" },
    { label: "Discount Retail Consulting — Biedronka €25B sales", url: "https://www.discountretailconsulting.com/post/poland-key-to-jeronimo-martins-results-25-billion-euros-of-biedronka-sales" },
  ],
  askPrompts: ["What did Jerónimo Martins report for FY2025?", "How does Pingo Doce use SymphonyAI?", "What's the AI-powered restaurant tray system?", "Who runs AI at Jerónimo Martins?"],
};

// =============================================================================
// Kering — FY2025 published; Gucci AI campaign + smart mirrors
// =============================================================================
export const kering_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-12" }, lastReported: { label: "Q1 2026 revenue", date: "2026-04-14" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 12 Feb 2026. Q1 2026 revenue published 14 Apr 2026 (€3.57B, -6.2% reported / flat organic; Gucci -14.3% / -8% organic; Jewellery +14% reported)." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€14.7B", reported: "-13%", organic: "-10% c/c", note: "Gucci -25% LFL drives the drop" }, opMargin: { value: "Recurring OP H1 €969M", growth: { absolute: "Margin -470bps", pct: "Margin contraction H1 12.8% (vs 17.5%)", basis: "Gucci weakness driving Group margin contraction; sequential improvement signalled" }, note: "Demna Gvasalia debut at Gucci" }, employees: { value: "47K" } },
    operatingComplexity: { hq: { value: "France 🇫🇷" }, countries: { value: "120+" }, brands: { value: "10+", note: "Gucci, Saint Laurent, Bottega Veneta, Balenciaga, Alexander McQueen, Brioni, Boucheron, Pomellato, Qeelin, Kering Eyewear" } },
    whyMatters: "Luxury-fashion conglomerate. AI levers: smart-mirror clientelling (Gucci), AI marketing campaigns (Gucci F/W 2025), Snapchat AI lens, supply-chain. Turnaround story under new CEO + Demna Gvasalia at Gucci.",
    quarterlyUpdate: {
      label: "Q1 2026 revenue",
      date: "14 April 2026",
      blurb: "Mixed Q1: Gucci -14.3%, Jewellery and Eyewear ahead. €3.57B revenue (-6.2% reported, flat organic). Gucci -14.3% / -8% organic; Jewellery record €269M (+22% organic, Boucheron-led). Capital Markets Day held in Florence 16 Apr.",
      metrics: [
        { label: "Group revenue", value: "€3.57B", trend: "-6.2% reported / flat organic" },
        { label: "Gucci", value: "€1.35B", trend: "-14.3% rep / -8% organic" },
        { label: "Jewellery", value: "€269M", trend: "+22% organic record" },
        { label: "Kering Eyewear", value: "€489M", trend: "Highest quarter ever" },
        { label: "Retail", value: "-11%", trend: "Middle East ~5% drag" },
      ],
      reading: "Gucci turnaround still in early innings; Jewellery + Eyewear absorb the impact. Demna Gvasalia debut in late 2025 + Luca de Meo new strategy will play through H2.",
      source: { label: "Yahoo / Kering — Q1 2026 revenue gradual improvement", url: "https://uk.finance.yahoo.com/news/kering-2026-first-quarter-revenue-153500331.html" },
    },
  },
  aiPerception: { quadrant: "narrative_led", label: "Narrative-led · 3.0", rhetoric: 4, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Gucci-led AI showcase amid turnaround.", body: "Gucci ran a high-profile AI-generated F/W 2025 campaign (Feb 2025) and a Snapchat Sponsored AI Lens (a luxury-first). Smart-mirror computer vision in stores recommends complementary accessories. AI is brand-led, group-fragmented." } },
  leadership: { presenter: { html: "<strong>Luca de Meo</strong> · CEO (joined late 2025; ex-Renault). <strong>Stefano Cantino</strong> · Gucci CEO. <strong>Demna Gvasalia</strong> · Gucci Creative Director. Tech function reports through CFO + Group operations.", source: { label: "Kering — 2025 Results press release", url: "https://finance.yahoo.com/news/kering-2025-results-sequential-improvement-060000551.html" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Gucci AI campaign (F/W 2025)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + creative agency</span> — \"Created with AI\" GenAI campaign exploring duality.", source: { label: "Gayaone — Gucci AI imagery before Gvasalia debut", url: "https://gayaone.com/en/society/fashion/gucci-deploys-ai-imagery-ahead-of-gvasalia-debut-amid-kering-financial-pressure" } },
      { html: "<strong>Snapchat Sponsored AI Lens</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Snap</span> — Gucci first luxury brand to launch a Sponsored AI Lens.", source: { label: "Snapchat Newsroom — Gucci first Sponsored AI Lens for luxury", url: "https://newsroom.snap.com/gucci-sponsored-ai-lens" } },
      { html: "<strong>Smart mirrors</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — In-store mirrors with computer vision recommending complementary accessories.", source: { label: "AI Data Analytics Network — How Gucci uses AI", url: "https://www.aidataanalytics.network/data-monetization/columns/how-gucci-is-using-ai-and-data-part-1" } },
    ] },
    consumerFacing: "<strong>Yes.</strong> Gucci AI campaign + Snapchat AI Lens + smart mirrors are all consumer-touched.",
    genAI: { mentioned: true, vendors: [{ name: "Snap (AI Lens)" }], note: "Snap is the cleanest named GenAI partner. Gucci AI campaign internally-led." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Snap — Sponsored AI Lens", status: "confirmed", caseStudy: { label: "Snapchat Newsroom — Gucci first Sponsored AI Lens for luxury", url: "https://newsroom.snap.com/gucci-sponsored-ai-lens" }, note: "Luxury-first Sponsored AI Lens. Strongest publicly-named GenAI vendor partnership at Gucci." },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / foundation-model partnership at Group level. Snap is the named GenAI partner via Gucci. No further vendor relationships disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "Gucci", description: "Marquee AI brand. F/W 2025 AI campaign + Snapchat Sponsored AI Lens + smart mirrors. Demna Gvasalia debut catalyses creative AI work.", source: { label: "Gayaone — Gucci AI campaign", url: "https://gayaone.com/en/society/fashion/gucci-deploys-ai-imagery-ahead-of-gvasalia-debut-amid-kering-financial-pressure" } },
      { brand: "Saint Laurent", description: "Resilient amid Group decline. Brand-led personalisation more conservative than Gucci's AI-forward posture." },
      { brand: "Bottega Veneta", description: "Consistent performer. Quiet on AI — clienteling-led brand experience." },
      { brand: "Balenciaga / Alexander McQueen", description: "Provocative brands; AI campaign appetite higher than the conservatively-positioned Saint Laurent / Bottega tier." },
      { brand: "Kering Eyewear", description: "Single-digit revenue growth in Q3 2025 (resilient). Operations-led — supply chain AI." },
    ],
    note: "Gucci leads on brand-level AI artefacts. Other maisons quieter.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €14.7B (-13% reported, -10% LFL). H1 recurring OP €969M, margin 12.8% (-470bps). Gucci -25% LFL the swing factor. Sequential improvement under new CEO + Demna Gvasalia debut." },
    { lead: "AI posture.", body: "Narrative-led · 3.0. High AI rhetoric (Gucci F/W 25 GenAI campaign + Snapchat AI Lens + smart mirrors) but production fragmented across maisons. Brand-led, not Group-led." },
    { lead: "Vendor footprint.", body: "No Microsoft, Google, OpenAI, Anthropic, AWS, or Mistral relationship disclosed. Snap is the only named GenAI partner." },
  ],
  sources: [
    { label: "Yahoo Finance — Kering 2025 results sequential improvement", url: "https://finance.yahoo.com/news/kering-2025-results-sequential-improvement-060000551.html" },
    { label: "Kering — H1 2025 results press release", url: "https://www.globenewswire.com/news-release/2025/07/29/3123470/0/en/Kering-Press-release-First-half-2025-results.html" },
    { label: "Moodie Davitt Report — Kering -16% H1 FY2025 revenue", url: "https://moodiedavittreport.com/kering-reports-16-revenue-decline-in-h1-fy2025-eyewear-and-beauty-continue-to-show-resilience/" },
    { label: "Gayaone — Gucci AI campaign before Gvasalia debut", url: "https://gayaone.com/en/society/fashion/gucci-deploys-ai-imagery-ahead-of-gvasalia-debut-amid-kering-financial-pressure" },
    { label: "Snapchat Newsroom — Gucci first Sponsored AI Lens for luxury", url: "https://newsroom.snap.com/gucci-sponsored-ai-lens" },
    { label: "DigitalDefynd — 8 Ways Gucci is using AI", url: "https://digitaldefynd.com/IQ/ways-gucci-using-ai/" },
    { label: "AI Data Analytics Network — How Gucci uses AI and data", url: "https://www.aidataanalytics.network/data-monetization/columns/how-gucci-is-using-ai-and-data-part-1" },
  ],
  askPrompts: ["What did Kering report for FY2025?", "How is Gucci using AI in marketing?", "What's the Snapchat AI Lens partnership?", "Who is Luca de Meo and what changes is he making at Kering?"],
};

// =============================================================================
// Kingfisher — H1 FY2025/26 reported; Hello Casto AI chatbot + B&Q marketplace AI
// =============================================================================
export const kingfisher_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2024/25 (52w to 31 Jan 2025)", date: "2025-03-25" }, lastReported: { label: "H1 FY2025/26 (26w to 31 Jul 2025)", date: "2025-09-23" }, next: { label: "FY2025/26 results", date: "March 2026" }, blurb: "Fiscal year ends January. H1 FY25/26 published Sep 2025 (op profit +2.1%). Full FY25/26 in Mar 2026." },
  investor: {
    fiscalYearLabel: "FY2024/25 baseline · H1 FY25/26 reported",
    headline: { revenue: { value: "£12.78B", reported: "-1.5%", note: "FY24/25; H1 FY25/26 +0.8% to £6.81B" }, opMargin: { value: "H1 OP £383M", growth: { absolute: "+£8M", pct: "+2.1%", basis: "OP H1 FY25/26 vs prior; full-year FY24/25 OP £407M (-29.7%)" }, note: "Adj. PBT +10.2%" }, employees: { value: "76K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "9", note: "UK + France + Poland + Iberia + Romania + Brazil + Turkey + Cyprus + Ireland" }, brands: { value: "6", note: "B&Q, Castorama, Brico Dépôt, Screwfix, TradePoint, Koçtaş" }, stores: { value: "1,860+" } },
    whyMatters: "Largest European DIY retailer. AI levers: marketplace recommendations (B&Q), Hello Casto chatbot (Castorama), AI personalisation (£80M sales contribution H1, +37% YoY).",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI delivering measurable revenue.", body: "AI-driven product recommendations + personalisation engines delivered ~£80M of Group sales in H1 FY25/26 (+37% YoY). Castorama France's Hello Casto chatbot helped ~350K customers. AI is a measurable margin + revenue lever." } },
  leadership: { presenter: { html: "<strong>Thierry Garnier</strong> · CEO. <strong>Bhavesh Mistry</strong> · CFO. Tech / digital reports through Group COO + e-commerce leadership; B&amp;Q marketplace + Castorama Hello Casto are the strongest banner-level AI tells.", source: { label: "Kingfisher — H1 FY25/26 results PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/half-year-results-pdf.pdf" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>AI product recommendations + personalisation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Delivered ~£80M Group sales in H1 FY25/26 (+37% YoY).", source: { label: "Kingfisher — H1 FY25/26 results PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/half-year-results-pdf.pdf" } },
      { html: "<strong>Hello Casto</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Castorama France</span> — AI chatbot helping ~350K customers with DIY questions.", source: { label: "Kingfisher — H1 FY25/26 commentary", url: "https://www.directorstalkinterviews.com/kingfisher-plc-reports-strong-h1-202526-upgraded-profit-and-cash-flow-guidance/4121217518" } },
      { html: "<strong>B&amp;Q marketplace</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — E-commerce sales +17.2%, marketplace penetration 43%. AI search + recommendations.", source: { label: "Kingfisher — FY24/25 results PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/20250325-2024-25-full-year-results-rns-part-1-vf.pdf" } },
    ] },
    quantifiedROI: { html: "<strong>AI personalisation:</strong> ~£80M Group sales H1 FY25/26 (+37% YoY). <strong>Hello Casto:</strong> ~350K customers. <strong>B&Q e-commerce:</strong> +17.2%, marketplace penetration 43%.", source: { label: "Kingfisher — H1 FY25/26 results", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/half-year-results-pdf.pdf" } },
    consumerFacing: "<strong>Yes.</strong> Hello Casto chatbot + B&Q marketplace recommendations are direct-to-consumer.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led" }], note: "AI/recommender + GenAI chatbot largely internal. No public hyperscaler partnership disclosed." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led AI (no public hyperscaler partner)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "AI built internally; no public hyperscaler partnership. The foundation-model layer behind Hello Casto is not disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY24/25: revenue £12.78B (-1.5%), op profit £407M (-29.7%) on French market drag. H1 FY25/26 turnaround: revenue +0.8%, OP +2.1%, adj PBT +10.2%, upgraded outlook." },
    { lead: "AI posture.", body: "Performer 3.5. AI delivers ~£80M Group revenue (+37% YoY in H1). Hello Casto chatbot at ~350K customers. B&Q marketplace AI driving e-commerce +17.2%." },
    { lead: "Vendor footprint.", body: "AI is built internally today. No Anthropic, OpenAI, Microsoft, or Google relationship is disclosed." },
  ],
  sources: [
    { label: "Kingfisher — FY24/25 full year results PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/20250325-2024-25-full-year-results-rns-part-1-vf.pdf" },
    { label: "Kingfisher — H1 FY25/26 results PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/half-year-results-pdf.pdf" },
    { label: "Kingfisher — 2024/25 Annual Report PDF", url: "https://www.kingfisher.com/~/media/Files/K/Kingfisher-Plc/Universal/investors/result-reports-presentation/2025/Kingfisher-Annual-Report-2024-25.pdf" },
    { label: "DirectorsTalk — Kingfisher H1 FY25/26 upgraded guidance", url: "https://www.directorstalkinterviews.com/kingfisher-plc-reports-strong-h1-202526-upgraded-profit-and-cash-flow-guidance/4121217518" },
    { label: "Bloomberg — B&Q owner Kingfisher higher profit + outlook boost", url: "https://www.bloomberg.com/news/articles/2025-09-23/b-q-owner-kingfisher-jumps-on-higher-profit-outlook-boost" },
    { label: "Retail Gazette — Kingfisher profits slide French market", url: "https://www.retailgazette.co.uk/blog/2025/03/kingfisher-profits-slide/" },
  ],
  askPrompts: ["What did Kingfisher report in H1 FY25/26?", "How does Castorama's Hello Casto AI chatbot work?", "What's B&Q's marketplace strategy?", "How much sales does Kingfisher's AI deliver?"],
};

// =============================================================================
// Lavazza — FY2025; private; €3.9B (+15.7%); minimal public AI footprint
// =============================================================================
export const lavazza_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-04-01" }, lastReported: { label: "FY2025 results", date: "2026-04-01" }, next: { label: "FY2026 results", date: "April 2027" }, blurb: "Privately-held; FY2025 published Apr 2026 (€3.9B revenue +15.7%, EBITDA €340M +8.8%). Annual cadence only." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€3.9B", reported: "+15.7%", note: "FY2025 ($4.52B); North America +26.9%" }, opMargin: { value: "EBITDA 8.8%", growth: { absolute: "+€28M", pct: "EBITDA +8.8%, EBIT €157M (+€27M vs €130M FY2024)", basis: "FY2025 vs FY2024" }, note: "Net profit €92M (+€10M)" }, employees: { value: "5K" } },
    operatingComplexity: { hq: { value: "Italy 🇮🇹" }, countries: { value: "140+" }, brands: { value: "6+", note: "Lavazza, Carte Noire, Eraclea, Whittard of Chelsea, Kicking Horse Coffee, Merrild" } },
    whyMatters: "Italian coffee group at scale. AI levers: digital transformation (commodity-volatility risk management), supply chain, e-commerce. Public AI footprint is light.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 2.0", rhetoric: 1, production: 2, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Quiet on AI; commodity-volatility focus.", body: "FY2025 announcement frames digital transformation as risk management against the \"perfect storm\" in coffee markets. No publicly-named AI vendor partnership today." } },
  leadership: { presenter: { html: "<strong>Antonio Baravalle</strong> · CEO. <strong>Gian Marco Gualandi</strong> · CDO. Family-controlled (Lavazza family); leadership transparency lower than listed peers.", source: { label: "Lavazza Group — FY2025 financial results", url: "https://www.lavazzagroup.com/en/who-we-are/results.html" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Digital transformation programme</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Risk-management anchored; not yet a publicly-named GenAI footprint.", source: { label: "Lavazza Group — FY2025 results PDF", url: "https://www.lavazzagroup.com/content/dam/lavazza-corporate/chi_siamo/risultati/PR_LavazzaGroup_FY2025_FinancialResults.pdf" } },
    ] },
    consumerFacing: "<strong>No flagship AI surface yet.</strong>",
    genAI: { mentioned: false, note: "Public material does not name a GenAI vendor or product. Likely internal experimentation; not yet flagship." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led digital programme", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI vendor partnership. No frontier-model vendor is disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €3.9B (+15.7%), EBITDA €340M (+8.8%, margin 8.8%), EBIT €157M, net profit €92M. North America +26.9%. \"Perfect storm\" in coffee markets cited." },
    { lead: "AI posture.", body: "Silent Builder 2.0 (estimated). No public AI vendor footprint. Digital transformation framed as commodity-risk management." },
    { lead: "Vendor footprint.", body: "No hyperscaler or foundation-model relationship is disclosed, including for recipe or consumer-experience GenAI." },
  ],
  sources: [
    { label: "Lavazza Group — FY2025 results", url: "https://www.lavazzagroup.com/en/who-we-are/results.html" },
    { label: "Lavazza Group — FY2025 PDF", url: "https://www.lavazzagroup.com/content/dam/lavazza-corporate/chi_siamo/risultati/PR_LavazzaGroup_FY2025_FinancialResults.pdf" },
    { label: "Comunicaffe — Lavazza ends 2025 on a high note", url: "https://www.comunicaffe.com/lavazza-2025-results-coffee-market-volatility" },
    { label: "Italianfood.net — Lavazza €3.9B Perfect Storm", url: "https://news.italianfood.net/2026/03/31/lavazza-hits-e3-9b-revenue-amid-perfect-storm-in-coffee-markets/" },
    { label: "Global Coffee Report — Lavazza FY2025 financial results", url: "https://www.gcrmag.com/lavazza-shares-full-2025-financial-results/" },
    { label: "PRNewswire — Lavazza Group financial results 31 Dec 2025", url: "https://www.prnewswire.com/news-releases/lavazza-group-financial-results-as-at-31st-december-2025-302733355.html" },
  ],
  askPrompts: ["What did Lavazza report for FY2025?", "How is Lavazza handling coffee-market volatility?", "Does Lavazza have any AI partnerships?", "Who runs digital at Lavazza?"],
};

// =============================================================================
// LEGO Group — FY2025 record; LEGO Education CS&AI + GenAI in BSO + LegoGPT
// =============================================================================
export const lego_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-12" }, lastReported: { label: "FY2025 record results", date: "2026-03-12" }, next: { label: "H1 2026 results", date: "August 2026" }, blurb: "FY2025 published 12 Mar 2026 (DKK 83.5B revenue +12%, op profit +18%, net profit +21% — record). Privately-held by KIRKBI A/S." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "DKK 83.5B", reported: "+12%", note: "Consumer sales +16% — outpacing toy market 2x" }, opMargin: { value: "DKK 22.0B", growth: { absolute: "+DKK 3.4B", pct: "+18%", basis: "Op profit FY2025 vs FY2024; net profit +21% to DKK 16.7B" }, note: "Most profitable year ever" }, employees: { value: "30K" } },
    operatingComplexity: { hq: { value: "Denmark 🇩🇰" }, countries: { value: "140+" }, brands: { value: "3", note: "LEGO + LEGO Education + LEGOLAND (via Merlin minority)" }, stores: { value: "1,000+" } },
    whyMatters: "Largest toy company; deeply digital. AI levers: GenAI in Business Service Operations (back-office productivity), LEGO Education CS&AI curriculum (April 2026), supply-chain automation, design.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI inside operations + classrooms.", body: "GenAI inside Business Service Operations (back-office productivity). LEGO Education Computer Science & AI K-8 curriculum launching Apr 2026 — AI-literacy at scale. LegoGPT research with Carnegie Mellon (open-source, generates stable LEGO designs from text)." } },
  leadership: { presenter: { html: "<strong>Niels B. Christiansen</strong> · CEO. <strong>Orlando Machado</strong> · Chief Data Officer (interviewed by McKinsey on data + AI).", source: { label: "McKinsey — How LEGO plays with data, interview with Orlando Machado", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/how-lego-plays-with-data-an-interview-with-chief-data-officer-orlando-machado" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>GenAI in Business Service Operations</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Productivity gains in shared service centre. Public commentary in 2025 annual report.", source: { label: "LEGO Group — FY2025 annual report", url: "https://www.lego.com/cdn/cs/aboutus/assets/blte543dd46714c9226/The_LEGO_Group_2025_Annual_Report.pdf" } },
      { html: "<strong>LEGO Education Computer Science &amp; AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· LEGO Education</span> — K-8 hands-on AI learning solution shipping April 2026.", source: { label: "LEGO — LEGO Education Computer Science & AI", url: "https://www.lego.com/en-us/aboutus/news/2026/january/lego-education-cs-ai" } },
      { html: "<strong>LegoGPT</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Carnegie Mellon (research)</span> — Open-source AI tool generating stable LEGO designs from text prompts.", source: { label: "Tom's Hardware — LegoGPT public release", url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/legogpt-creates-stable-lego-designs-using-ai-and-text-inputs-tool-now-available-to-the-public" } },
    ] },
    consumerFacing: "<strong>Yes (educator-mediated).</strong> LEGO Education CS&AI lands AI in K-8 classrooms. LegoGPT touches the AFOL community.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led + Carnegie Mellon (LegoGPT)" }], note: "GenAI in BSO not publicly tied to a hyperscaler. LegoGPT is research-led." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Carnegie Mellon — LegoGPT research", status: "confirmed", caseStudy: { label: "Tom's Hardware — LegoGPT public release", url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/legogpt-creates-stable-lego-designs-using-ai-and-text-inputs-tool-now-available-to-the-public" }, note: "Academic research tie. AI tool generates stable LEGO builds from text prompts; available free." },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / foundation-model partnership disclosed. Carnegie Mellon for research collaboration. No hyperscaler or foundation-model partnership is disclosed alongside the GenAI BSO and AI Education launches.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "Record FY2025: revenue DKK 83.5B (+12%), op profit DKK 22.0B (+18%), net profit DKK 16.7B (+21%). Consumer sales +16% — 2x the toy market growth rate. 860+ products portfolio (~half new)." },
    { lead: "AI posture.", body: "Performer 3.5. GenAI in BSO (productivity). LEGO Education CS&AI K-8 launching Apr 2026. CDO Orlando Machado public on data+AI strategy. LegoGPT with Carnegie Mellon." },
    { lead: "Vendor footprint.", body: "No public hyperscaler or foundation-model footprint, despite the disclosed GenAI BSO and AI Education launches." },
  ],
  sources: [
    { label: "LEGO Group — FY2025 record results announcement", url: "https://www.lego.com/en-us/aboutus/news/2026/march/the-lego-group-delivers-record-results-in-2025-driven-by-strong-brand-and-innovative-portfolio" },
    { label: "LEGO Group — Annual Report 2025 PDF", url: "https://www.lego.com/cdn/cs/aboutus/assets/blte543dd46714c9226/The_LEGO_Group_2025_Annual_Report.pdf" },
    { label: "Stonewars — LEGO 2025 record revenue + margins", url: "https://stonewars.com/news/lego-annual-results-2025/" },
    { label: "LEGO — LEGO Education Computer Science & AI", url: "https://www.lego.com/en-us/aboutus/news/2026/january/lego-education-cs-ai" },
    { label: "LEGO Education — Computer Science & AI K-8 product page", url: "https://education.lego.com/en-us/lego-education-computer-science-and-ai/" },
    { label: "McKinsey — Orlando Machado on LEGO data & AI", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/how-lego-plays-with-data-an-interview-with-chief-data-officer-orlando-machado" },
    { label: "Tom's Hardware — LegoGPT public release", url: "https://www.tomshardware.com/tech-industry/artificial-intelligence/legogpt-creates-stable-lego-designs-using-ai-and-text-inputs-tool-now-available-to-the-public" },
    { label: "Carnegie Mellon — Lego AI tool for manufacturing", url: "https://www.cmu.edu/news/stories/archives/2025/august/the-ai-tool-that-could-make-manufacturing-faster-and-more-efficient-by-using-lego-bricks" },
  ],
  askPrompts: ["What did the LEGO Group report for FY2025?", "What is LEGO Education's Computer Science & AI curriculum?", "How does LEGO use GenAI in Business Service Operations?", "What is LegoGPT?"],
};

// =============================================================================
// L'Oréal — FY2025 published; NVIDIA + Noli AI Refinery on Microsoft Azure
// =============================================================================
export const loreal_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-04" }, lastReported: { label: "Q1 2026 sales", date: "2026-04-22" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 4 Feb 2026. Q1 2026 sales published 22 Apr 2026 (€12.15B, +7.6% LFL, +3.6% reported on -5.5% FX). Stock +9% — biggest one-day move since 2008." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€44.05B", reported: "Stable", organic: "+4.0% LFL", note: "E-commerce >30% of sales" }, opMargin: { value: "20.2%", growth: { absolute: "+€207M", pct: "+2.4%", basis: "Op profit FY2025 €8.89B vs FY2024; +20bps margin; gross margin record 74.3%" }, note: "Record operating margin" }, employees: { value: "90K" } },
    operatingComplexity: { hq: { value: "France 🇫🇷" }, countries: { value: "150+" }, brands: { value: "37", note: "L'Oréal Paris, Lancôme, Garnier, Maybelline, Kérastase, Vichy, La Roche-Posay, NYX, IT Cosmetics, CeraVe, Aesop, Yves Saint Laurent Beauty, Giorgio Armani Beauty, Prada Beauty, Valentino Beauty + many more" } },
    whyMatters: "World's #1 beauty group. AI levers: NVIDIA-powered R&I (predictive AI for molecular formulation), Noli AI beauty discovery (Azure-hosted), AI revenue growth management, AI-driven productivity gains in finance + SG&A.",
    quarterlyUpdate: {
      label: "Q1 2026 sales",
      date: "22 April 2026",
      blurb: "Outsized beat. €12.15B sales (+7.6% LFL vs ~3-4% expected), +3.6% reported on -5.5% FX. Stock +9% — biggest one-day move since Nov 2008. Outpacing the global beauty market (~3.8%).",
      metrics: [
        { label: "Sales", value: "€12.15B", trend: "+7.6% LFL / +3.6% reported" },
        { label: "Pro Products", value: "+13.1% LFL", trend: "Strongest division" },
        { label: "Dermatological Beauty", value: "+7.3% LFL", trend: "Skincare-led" },
        { label: "North Asia", value: "+7.8%", trend: "Strongest region" },
        { label: "Europe", value: "+4.5%", trend: "Solid" },
        { label: "United States", value: "+1.8%", trend: "Pro + skincare" },
      ],
      reading: "Beat-and-stock-pop. Adjusted LFL was 6.7% excluding IT-transformation one-offs — still 2-3x the broader market. NVIDIA + Noli AI thesis playing through R&D + personalisation.",
      source: { label: "L'Oréal Finance — Q1 2026 sales", url: "https://www.loreal-finance.com/eng/press-release/first-quarter-2026-sales" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 5, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Beauty's AI lighthouse.", body: "L'Oréal + NVIDIA collaboration (NVIDIA AI Enterprise + ALCHEMI ML framework for molecular-scale formulation prediction) is the most ambitious cosmetics-AI partnership on the watchlist. Plus Noli AI Refinery (NVIDIA + Accenture, hosted on Microsoft Azure) — 1M+ facial scans for hyper-personalised recommendations. AI productivity already cutting headcount despite growth." } },
  leadership: { presenter: { html: "<strong>Nicolas Hieronimus</strong> · CEO. <strong>Asmita Dubey</strong> · Chief Digital and Marketing Officer. <strong>Stéphane Rinderknech</strong> · CEO Beauty Tech. AI lives in Beauty Tech function with deep R&I integration.", source: { label: "L'Oréal — NVIDIA partnership announcement", url: "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-nvidia-collaborate-to-supercharge-beauty-with-next-generation-ai/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>NVIDIA AI Enterprise + ALCHEMI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA</span> — ALCHEMI ML framework integrated into R&I ecosystem; predicts molecular performance + interaction at atomic scale for formulation discovery.", source: { label: "L'Oréal — NVIDIA partnership announcement", url: "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-nvidia-collaborate-to-supercharge-beauty-with-next-generation-ai/" } },
      { html: "<strong>Noli AI Refinery</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA + Accenture, on Microsoft Azure</span> — Beauty-discovery marketplace; 1M+ facial scans, thousands of formulation insights for hyper-personalised recommendations.", source: { label: "L'Oréal — Noli AI Refinery announcement", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" } },
      { html: "<strong>3D digital rendering at scale</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA AI Enterprise</span> — Physical AI + GenAI fusion for product visualisation across portfolio.", source: { label: "L'Oréal Finance — NVIDIA collaboration", url: "https://www.loreal-finance.com/eng/news-event/loreal-and-nvidia-collaborate-supercharge-beauty-next-generation-ai" } },
      { html: "<strong>AI revenue growth management</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Revenue management + advertising-cost optimisation + SG&amp;A efficiencies. Productivity gains driving headcount reduction despite growth.", source: { label: "L'Oréal — FY2025 annual results commentary", url: "https://www.loreal-finance.com/eng/press-release/2025-annual-results" } },
    ] },
    quantifiedROI: { html: "<strong>Op margin record:</strong> 20.2% (+20bps), gross margin record 74.3%. <strong>AI productivity:</strong> headcount decreased despite +4% growth — AI-driven productivity in finance + SG&A. <strong>Noli:</strong> 1M+ facial scans, thousands of formulation insights.", source: { label: "L'Oréal — FY2025 annual results", url: "https://www.loreal-finance.com/eng/press-release/2025-annual-results" } },
    consumerFacing: "<strong>Yes, marquee.</strong> Noli is a direct-to-consumer AI beauty marketplace with 1M+ facial scans. NVIDIA-powered 3D rendering touches all consumer surfaces.",
    genAI: { mentioned: true, vendors: [{ name: "NVIDIA AI Enterprise", url: "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-nvidia-collaborate-to-supercharge-beauty-with-next-generation-ai/" }, { name: "Microsoft Azure (Noli hosting)" }, { name: "Accenture (build partner)" }], note: "NVIDIA is the marquee partner. Microsoft Azure hosts the consumer-facing Noli Refinery. Accenture is the build partner." },
    stackTable: [
      { layer: "AI infrastructure", product: "NVIDIA AI Enterprise + ALCHEMI", use: "Molecular formulation prediction + 3D rendering", source: { label: "L'Oréal — NVIDIA partnership", url: "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-nvidia-collaborate-to-supercharge-beauty-with-next-generation-ai/" } },
      { layer: "Cloud (Noli hosting)", product: "Microsoft Azure", use: "Hosts Noli AI Refinery", source: { label: "L'Oréal — Noli AI Refinery", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" } },
      { layer: "AI build partner", product: "Accenture", use: "Co-developer of Noli AI Refinery", source: { label: "L'Oréal — Noli AI Refinery", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" } },
      { layer: "Consumer GenAI", product: "Noli marketplace", use: "Beauty matchmaker, 1M+ facial scans", source: { label: "L'Oréal — Noli announcement", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "NVIDIA — AI Enterprise + ALCHEMI", status: "confirmed", caseStudy: { label: "NVIDIA Blog — Major brands transform operations with NVIDIA", url: "https://blogs.nvidia.com/blog/retail-agentic-physical-ai/" }, note: "ALCHEMI ML framework integrated into R&I for molecular-scale formulation prediction. NVIDIA AI Enterprise underpins 3D rendering at scale." },
      { name: "Microsoft Azure — Noli hosting", status: "confirmed", caseStudy: { label: "L'Oréal — Noli AI Refinery announcement", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" }, note: "Hosts Noli AI Refinery (the consumer marketplace AI surface)." },
      { name: "Accenture — build partner", status: "confirmed", caseStudy: { label: "L'Oréal — Noli AI Refinery (NVIDIA + Accenture build)", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" }, note: "Co-builder of Noli AI Refinery alongside NVIDIA on Azure." },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "NVIDIA is the marquee infrastructure partner — most committed NVIDIA-direct customer in cosmetics. Microsoft Azure hosts Noli. Accenture is the build partner. Anthropic / OpenAI-direct / Google / AWS / Mistral not disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "L'Oréal Paris", description: "Master mass brand. AI-powered marketing + 3D rendering at scale via NVIDIA AI Enterprise." },
      { brand: "Lancôme", description: "Luxury beauty. Beauty Tech AI labs + clienteling AI." },
      { brand: "Garnier / Maybelline / Vichy / NYX", description: "Mass + dermo + colour cosmetics. Group-wide NVIDIA-powered formulation AI flows down." },
      { brand: "Kérastase / Aesop / La Roche-Posay / CeraVe", description: "Premium hair / dermo / clinical brands. Noli's AI matchmaker is consumer-facing surface." },
      { brand: "YSL Beauty / Giorgio Armani Beauty / Prada Beauty / Valentino Beauty", description: "Licensed luxury beauty. Brand-level activation; group-wide AI infrastructure." },
    ],
    note: "Noli is the cross-brand consumer GenAI surface. R&I AI (ALCHEMI) feeds formulations across all brands.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €44.05B (+4% LFL), op profit €8.89B (+2.4%), op margin 20.2% record (+20bps), gross margin record 74.3%. E-commerce >30% of sales. Headcount down despite growth — AI productivity working." },
    { lead: "AI posture.", body: "Performer 4.5 — beauty's AI lighthouse. NVIDIA AI Enterprise + ALCHEMI for R&I. Noli AI Refinery (Azure-hosted, 1M+ facial scans). Three named hyperscaler-class partners: NVIDIA + Microsoft Azure + Accenture." },
    { lead: "Vendor footprint.", body: "NVIDIA-direct relationship is rare on the watchlist. Microsoft Azure in via Noli. No Anthropic, OpenAI-direct, Google, AWS, or Mistral relationship disclosed; the NVIDIA relationship is the deepest on record." },
  ],
  sources: [
    { label: "L'Oréal — FY2025 Annual Results", url: "https://www.loreal-finance.com/eng/press-release/2025-annual-results" },
    { label: "L'Oréal — Annual Report 2025 financial performance", url: "https://www.loreal-finance.com/en/annual-report-2025/financial-performance/" },
    { label: "L'Oréal — NVIDIA partnership announcement", url: "https://www.loreal.com/en/press-release/research-and-innovation/l-oreal-and-nvidia-collaborate-to-supercharge-beauty-with-next-generation-ai/" },
    { label: "L'Oréal — Noli AI Refinery announcement", url: "https://www.loreal.com/en/press-release/group/loreal-and-nvidia-to-accelerate-beauty-discovery-powered-by-predictive-ai-science/" },
    { label: "L'Oréal Finance — NVIDIA collaboration", url: "https://www.loreal-finance.com/eng/news-event/loreal-and-nvidia-collaborate-supercharge-beauty-next-generation-ai" },
    { label: "WWD — L'Oréal-Nvidia expand partnership", url: "https://wwd.com/beauty-industry-news/beauty-features/loreal-nvidia-expand-partnership-ai-1238680719/" },
    { label: "Modaes — L'Oréal partners with NVIDIA on tailored beauty", url: "https://www.modaes.com/global/companies/loreal-relies-on-nvidia-to-scale-ai-in-personalized-and-sustainable-beauty" },
    { label: "Cosmetics Business — L'Oréal x NVIDIA next-gen AI", url: "https://cosmeticsbusiness.com/l-or%C3%A9al-partners-with-nvidia-to-supercharge-gen-ai-in-beauty" },
    { label: "NVIDIA Blog — Major brands transform operations with NVIDIA", url: "https://blogs.nvidia.com/blog/retail-agentic-physical-ai/" },
  ],
  askPrompts: ["What did L'Oréal report for FY2025?", "What's in the L'Oréal x NVIDIA AI partnership?", "What is Noli AI Refinery?", "How does L'Oréal use ALCHEMI for formulation?"],
};

// =============================================================================
// Lotus Bakeries — FY2025; private; €1.36B (+10%); minimal AI footprint
// =============================================================================
export const lotus_bakeries_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-05" }, lastReported: { label: "FY2025 annual results", date: "2026-02-05" }, next: { label: "FY2026 H1", date: "Aug 2026" }, blurb: "Privately-held Belgian; FY2025 published Feb 2026 (€1.36B, +10%; EBITDA €273M, +12.4%). Annual-only cadence with H1 update in Aug." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€1.36B", reported: "+10%", organic: "Biscoff +13%", note: "Biscoff = 57% of sales / €670M" }, opMargin: { value: "EBITDA €273M", growth: { absolute: "+€30M", pct: "+12.4%", basis: "EBITDA FY2025 vs FY2024; net profit +13%" }, note: "Net debt 0.25x EBITDA — historic low" }, employees: { value: "3K" } },
    operatingComplexity: { hq: { value: "Belgium 🇧🇪" }, countries: { value: "60+" }, brands: { value: "5+", note: "Lotus Biscoff, Trek, Bear, Lotus Natural Foods + Local Heroes (Annas, Kambly, Peijnenburg, Dinosaurus)" } },
    whyMatters: "Belgian bakery scaling globally on Biscoff. AI levers: brand marketing (TREK rebrand), supply-chain demand sensing across 3 manufacturing regions. Private cooperative-style governance — low public AI footprint.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 1.5", rhetoric: 1, production: 1, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Story of Biscoff scale, not AI rhetoric.", body: "FY2025 narrative is about Biscoff's global scale and 3-region manufacturing footprint (Lembeke, Mebane, Chonburi). No publicly named AI / GenAI vendor partnership today." } },
  leadership: { presenter: { html: "<strong>Jan Vander Stichele</strong> · CEO. Family-controlled (Boone family majority); leadership transparency lower than listed peers.", source: { label: "Lotus Bakeries — FY2025 annual results PDF", url: "https://www.lotusbakeries.com/sites/default/files/documents-en/PR_2025_Annual_Results_Lotus_Bakeries_EN.pdf" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>TREK rebrand digital media campaign</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + agency</span> — Successful rebranding + digital media activation (FY2025 highlight).", source: { label: "Lotus Bakeries — FY2025 annual results PDF", url: "https://www.lotusbakeries.com/sites/default/files/documents-en/PR_2025_Annual_Results_Lotus_Bakeries_EN.pdf" } },
    ] },
    consumerFacing: "<strong>No flagship AI surface yet.</strong> Biscoff direct-to-consumer marketing without GenAI veneer.",
    genAI: { mentioned: false, note: "No public GenAI / AI vendor partnership disclosed." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led marketing technology", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI vendor partnership. No vendor is disclosed against the manufacturing or demand-planning stack.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €1.36B (+10%), EBITDA €273M (+12.4%, margin 20.1%), net profit +13%. Biscoff = 57% of sales (€670M, +13%). Net debt at 0.25x EBITDA — historic low." },
    { lead: "AI posture.", body: "Silent Builder 1.5 (estimated). Effectively no public AI footprint. Story is Biscoff scale-up, not AI." },
    { lead: "Vendor footprint.", body: "No vendor relationships disclosed. Manufacturing runs across three regions (Lembeke, Mebane, Chonburi); no manufacturing-AI vendor is named." },
  ],
  sources: [
    { label: "Lotus Bakeries — FY2025 annual results PDF", url: "https://www.lotusbakeries.com/sites/default/files/documents-en/PR_2025_Annual_Results_Lotus_Bakeries_EN.pdf" },
    { label: "Lotus Bakeries — Annual Results 2025 IR presentation", url: "https://www.lotusbakeries.com/sites/default/files/documents-en/IR_Presentation_2025_Annual_Results.pdf" },
    { label: "Lotus Bakeries — Half-year report 2025 PDF", url: "https://www.lotusbakeries.com/sites/default/files/documents-en/lotus_bakeries_group_interim_financial_report_hy_2025.pdf" },
    { label: "ESM Magazine — Lotus Bakeries 10% revenue growth FY2025", url: "https://www.esmmagazine.com/a-brands/lotus-bakeries-posts-10-revenue-growth-in-fy-2025-305830" },
    { label: "Yahoo Finance — Lotus Bakeries FY2025 earnings call", url: "https://finance.yahoo.com/news/lotus-bakeries-nv-lotby-full-010431597.html" },
    { label: "RetailDetail — Thailand and Biscoff spread as backbones", url: "https://www.retaildetail.eu/news/food/lotus-bakeries-thailand-and-biscoff-spread-as-solid-backbones/" },
  ],
  askPrompts: ["What did Lotus Bakeries report for FY2025?", "What's the Biscoff global scale-up?", "Does Lotus Bakeries have any AI partnerships?", "How is Lotus Bakeries scaling across 3 regions?"],
};

// =============================================================================
// Mango — FY2025; private; €3.77B (+13%); Mango Stylist GenAI assistant
// =============================================================================
export const mango_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-25" }, lastReported: { label: "FY2025 annual results", date: "2026-03-25" }, next: { label: "FY2026 H1 update", date: "Aug 2026" }, blurb: "Privately-held; FY2025 published Mar 2026 (€3.77B, +13%, record). Targets €4B in 2026. Annual cadence." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€3.77B", reported: "+13%", note: "Record turnover; FY2026 target €4B" }, opMargin: { value: "EBITDA €722M", growth: { absolute: "+€83M", pct: "+13% EBITDA, +11% net profit", basis: "EBITDA FY2025 vs FY2024; net profit €242M" }, note: "Gross margin 60.8% held" }, employees: { value: "16K" } },
    operatingComplexity: { hq: { value: "Spain 🇪🇸" }, countries: { value: "120+" }, brands: { value: "5", note: "Mango (master), Mango Man, Mango Kids, Mango Teen, Mango Outlet" }, stores: { value: "2,800+" } },
    whyMatters: "Spanish fashion at scale; online ~1/3 of sales. AI levers: Mango Stylist GenAI shopping assistant, MANGO Campus tech investment, e-commerce personalisation. €225M record investment in 2025 includes tech + logistics.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.0", rhetoric: 3, production: 3, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Mango Stylist GenAI is the consumer surface.", body: "Mango Stylist (AI shopping assistant) provides trend articles, styling tips, and product recommendations. Live across digital surfaces. €225M FY2025 investment includes tech + logistics + the MANGO Campus." } },
  leadership: { presenter: { html: "<strong>Toni Ruiz</strong> · CEO. <strong>Daniel López</strong> · Chief Information Officer. Family-controlled (Andic family); FY2025 record investment in tech signals AI commitment.", source: { label: "Mango Fashion Group — FY2025 results announcement", url: "https://mangofashiongroup.com/en/w/MANGO-reports-sales-of-3-8bn-euros-up-13-driving-record-investment-in-its-business-model" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Mango Stylist</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — AI-powered shopping assistant: trend articles, styling tips, product recommendations.", source: { label: "Mango Fashion Group — FY2025 results", url: "https://mangofashiongroup.com/en/w/MANGO-reports-sales-of-3-8bn-euros-up-13-driving-record-investment-in-its-business-model" } },
      { html: "<strong>MANGO Campus</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Operational rollout of new tech + logistics campus underpinning AI infrastructure.", source: { label: "Just-Style — Mango 2025 +13% revenue", url: "https://www.just-style.com/news/mango-2025-revenue-climbs-13-despite-geopolitical-headwinds/" } },
    ] },
    consumerFacing: "<strong>Yes.</strong> Mango Stylist is the direct-to-consumer GenAI surface.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led" }], note: "Mango Stylist's foundation-model layer not publicly disclosed." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led GenAI (Mango Stylist)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler or foundation-model partnership. The model layer behind Mango Stylist is not disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: record €3.77B (+13%), EBITDA €722M (+13%), net profit €242M (+11%), gross margin 60.8%. €225M record FY2025 investment (tech + logistics + MANGO Campus). FY2026 target €4B." },
    { lead: "AI posture.", body: "Performer 3.0. Mango Stylist GenAI shopping assistant is consumer-facing. €225M tech investment signals AI commitment but no named hyperscaler partnership today." },
    { lead: "Vendor footprint.", body: "No hyperscaler relationship disclosed. The foundation-model layer behind Mango Stylist is not public." },
  ],
  sources: [
    { label: "Mango Fashion Group — FY2025 results announcement", url: "https://mangofashiongroup.com/en/w/MANGO-reports-sales-of-3-8bn-euros-up-13-driving-record-investment-in-its-business-model" },
    { label: "Just-Style — Mango 2025 revenue climbs 13%", url: "https://www.just-style.com/news/mango-2025-revenue-climbs-13-despite-geopolitical-headwinds/" },
    { label: "Global Textile Times — Mango €3.8B revenue 2025", url: "https://www.globaltextiletimes.com/news/mango-2025-revenue-hits-e3-8bn-as-profit-climbs-11/" },
    { label: "Fibre2Fashion — Mango $4.4B revenue 2025", url: "https://www.fibre2fashion.com/news/fashion-news/spain-s-mango-posts-4-4-bn-revenue-in-2025-up-13-308874-newsdetails.htm" },
    { label: "FashionNetwork — Mango €3.767B revenue 2025", url: "https://ww.fashionnetwork.com/news/Mango-grows-revenue-13-to-3-767-billion-in-fiscal-2025,1813215.html" },
    { label: "Apparel Resources — Mango H1 2025 +12%", url: "https://apparelresources.com/business-news/retail/mango-posts-12-revenue-growth-h1-2025-hits-us-1-98-billion/" },
  ],
  askPrompts: ["What did Mango report for FY2025?", "What is Mango Stylist?", "What's the MANGO Campus?", "Does Mango have any hyperscaler AI partners?"],
};

// =============================================================================
// Marks & Spencer — FY2025; Microsoft 365 Copilot to 11K colleagues
// =============================================================================
export const marks_spencer_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025 (52w to 29 Mar 2025)", date: "2025-05-21" }, lastReported: { label: "H1 FY2025/26 (26w to 27 Sep 2025)", date: "2025-11-05" }, next: { label: "FY2025/26 results", date: "May 2026" }, blurb: "Fiscal year ends March. FY2025 published May 2025 (£13.8B, op profit £504M). H1 FY25/26 published Nov 2025." },
  investor: {
    fiscalYearLabel: "FY2025 baseline · H1 FY25/26 reported",
    headline: { revenue: { value: "£13.8B", reported: "+6.1%", note: "FY2025; +£800M YoY" }, opMargin: { value: "Op profit £504M", growth: { absolute: "Adj OP +£90M", pct: "PBT £489M (+22%)", basis: "FY2025; statutory PBT improved on cost management" }, note: "Reshaping M&S strategy in flight" }, employees: { value: "65K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "30+" }, brands: { value: "5+", note: "M&S (food, clothing, home), Ocado Retail (50%), Per Una, Autograph, Goodmove" }, stores: { value: "1,000+" } },
    whyMatters: "UK retail icon. AI levers: Microsoft 365 Copilot rollout to 11K store managers + support centre staff (largest enterprise Copilot deployment in UK retail). Stock forecasting, marketing-asset generation, AI agents for colleague support.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Largest UK retail Copilot deployment.", body: "M&S deployed Microsoft 365 Copilot to 11,000 colleagues including all store managers (Mar 2026) — one of the largest enterprise Copilot deployments in UK retail. AI already embedded for stock forecasting + ordering, marketing-asset generation, and a colleague help-hub powered by AI agents." } },
  leadership: { presenter: { html: "<strong>Stuart Machin</strong> · CEO. <strong>Rachel Higham</strong> · Chief Technology Officer. CTO Higham fronts Microsoft partnership announcements externally.", source: { label: "Microsoft UK Stories — M&S 11K Microsoft 365 Copilot licenses", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Microsoft 365 Copilot</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Rolled out to 11,000 colleagues including all store managers (Mar 2026). Supports data + sales insights, meeting notes, shift rotas, handovers.", source: { label: "Microsoft UK Stories — M&S 11K Copilot rollout", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" } },
      { html: "<strong>AI for stock forecasting + ordering</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI embedded across supply chain.", source: { label: "M&S — Microsoft strategic partnership press release", url: "https://corporate.marksandspencer.com/media/press-releases/microsoft-and-ms-launch-strategic-partnership-aimed-transforming-retail" } },
      { html: "<strong>AI agents in colleague help hub</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Internal AI assistants supporting colleague queries.", source: { label: "Retail Gazette — M&S rolls out AI tools to 11K colleagues", url: "https://www.retailgazette.co.uk/blog/2026/03/ms-rolls-out-ai-tools-to-11000-colleagues-including-all-store-managers/" } },
      { html: "<strong>AI marketing-asset generation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + Microsoft</span> — GenAI for marketing material production.", source: { label: "Drapers — M&S arms store managers with AI tools", url: "https://www.drapersonline.com/companies/directory/marks-and-spencer/ms-arms-store-managers-with-ai-tools" } },
    ] },
    quantifiedROI: { html: "<strong>Microsoft 365 Copilot:</strong> 11,000 licences across all store managers + support centre staff (Mar 2026 rollout) — largest enterprise Copilot deployment in UK retail. Driving time-savings on data/sales insights, meeting notes, shift rotas.", source: { label: "Microsoft UK Stories — M&S 11K Copilot rollout", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" } },
    consumerFacing: "<strong>Indirect.</strong> Most AI is colleague + supply chain; consumer-facing AI emerges via marketing materials.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft 365 Copilot", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" }], note: "Microsoft is the marquee partner. Rollout scale is exceptional for UK retail." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft — strategic AI partnership + 11K Copilot licences", status: "confirmed", caseStudy: { label: "Microsoft UK Stories — M&S 11K Copilot rollout", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" }, note: "Largest enterprise Copilot deployment in UK retail. Strategic partnership announced 2025 covers stock forecasting, marketing, AI agents, store ops." },
      { name: "Microsoft Ads (advertising)", status: "confirmed", caseStudy: { label: "Microsoft Ads — Marks & Spencer case study", url: "https://about.ads.microsoft.com/en/resources/discover/case-studies/marks-spencer" }, note: "Microsoft Ads case study for M&S advertising activity." },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft house. Two named Microsoft case studies (Copilot rollout + Microsoft Ads). Anthropic / Google / OpenAI / AWS / Mistral not disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue £13.8B (+£800M YoY), adj OP £504M, statutory PBT £489M (+22%). Reshaping M&S strategy delivering. Cyberattack risk visible in H1 FY25/26 commentary." },
    { lead: "AI posture.", body: "Performer 4.0. 11K Microsoft 365 Copilot licences (Mar 2026) — UK retail's largest deployment. AI for stock forecasting, marketing-asset generation, colleague AI agents. CTO Rachel Higham fronts AI agenda." },
    { lead: "Vendor footprint.", body: "Microsoft-anchored (Copilot + Ads). Anthropic / Google / OpenAI / AWS / Mistral not disclosed. Cyber-resilience post-2025 attack adds urgency to security-first AI vendor positioning." },
  ],
  sources: [
    { label: "M&S — FY2025 full year results press release", url: "https://corporate.marksandspencer.com/newsroom/press-releases/full-year-results-52-weeks-ended-29-march-2025" },
    { label: "M&S — Annual Report 2025", url: "https://corporate.marksandspencer.com/investors/our-performance-updates/2025-annual-report" },
    { label: "M&S — H1 FY25/26 results", url: "https://corporate.marksandspencer.com/newsroom/press-releases/half-year-results-26-weeks-ended-27-september-2025" },
    { label: "M&S — Microsoft strategic partnership press release", url: "https://corporate.marksandspencer.com/media/press-releases/microsoft-and-ms-launch-strategic-partnership-aimed-transforming-retail" },
    { label: "Microsoft UK Stories — M&S 11K Copilot rollout", url: "https://ukstories.microsoft.com/features/ms-rolling-out-11000-microsoft-365-copilot-licenses-in-ai-transformation-drive/" },
    { label: "Retail Gazette — M&S rolls out AI tools to 11K colleagues", url: "https://www.retailgazette.co.uk/blog/2026/03/ms-rolls-out-ai-tools-to-11000-colleagues-including-all-store-managers/" },
    { label: "Drapers — M&S arms store managers with AI tools", url: "https://www.drapersonline.com/companies/directory/marks-and-spencer/ms-arms-store-managers-with-ai-tools" },
    { label: "Microsoft Ads — Marks & Spencer case study", url: "https://about.ads.microsoft.com/en/resources/discover/case-studies/marks-spencer" },
  ],
  askPrompts: ["What did M&S report for FY2025?", "What's the M&S x Microsoft 365 Copilot rollout?", "Who is Rachel Higham and what does the M&S CTO seat cover?", "How is M&S using AI for stock forecasting?"],
};

// =============================================================================
// Nespresso — FY2025 (Nestlé segment); benefits from Group Microsoft + NVIDIA AI
// =============================================================================
export const nespresso_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025 (Nestlé segment)", date: "2026-02-19" }, lastReported: { label: "Q1 2026 sales (Nestlé three-month)", date: "2026-04-23" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "Reports as Nestlé segment. Q1 2026 published 23 Apr 2026 (CHF 1.6B, organic +5.1%, RIG +2.0%, price +3.1%). High-single-digit North America led; Dua Lipa as new global brand ambassador (1.9B impressions wk 1)." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "~CHF 6.5B", reported: "+6.0% organic", note: "H1 2025 CHF 3.17B (+2.4%); 9M CHF 4.7B" }, opMargin: { value: "16.1%", growth: { absolute: "+210bps segment basis", pct: "Margin expansion +210bps", basis: "UTOP margin FY2025 vs FY2024 segment basis; H1 21.9% (+40bps)" }, note: "Pricing-led growth" }, employees: { value: "14K" } },
    operatingComplexity: { hq: { value: "Switzerland 🇨🇭" }, countries: { value: "84" }, brands: { value: "1+", note: "Nespresso (master), Vertuo, Original lines, Nespresso Professional" }, stores: { value: "800+ boutiques" } },
    whyMatters: "Premium coffee subscription + boutique. AI levers: digital twins (Nestlé-Group AI work flows down), supply-chain AI for green coffee + sustainability, e-commerce personalisation. Inherits Group hyperscaler stack.",
    quarterlyUpdate: {
      label: "Q1 2026 sales",
      date: "23 April 2026",
      blurb: "Strong Q1. Sales CHF 1.6B (-7.6% on FX), organic +5.1%, RIG +2.0%, price +3.1%. North America high-single-digit led. Dua Lipa announced as global brand ambassador — 1.9B impressions in week one.",
      metrics: [
        { label: "Reported sales", value: "CHF 1.6B", trend: "FX -7.6%" },
        { label: "Organic growth", value: "+5.1%", trend: "RIG +2.0%, price +3.1%" },
        { label: "North America", value: "High single-digit", trend: "Volume + carryover pricing" },
        { label: "Europe", value: "Positive", trend: "Out-of-home + acquisitions" },
        { label: "Brand momentum", value: "Dua Lipa launch", trend: "1.9B impressions wk 1" },
      ],
      reading: "Coffee category strength continues. NVIDIA Omniverse digital-twin pipeline keeps producing localised content cheaper. Dua Lipa partnership signals stepped-up consumer marketing investment.",
      source: { label: "Nestlé — Three-month sales 2026 (Nespresso segment)", url: "https://www.nestle.com/media/pressreleases/allpressreleases/three-month-sales-2026" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 3.5", rhetoric: 3, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI inherited from Nestlé Group.", body: "Nespresso is one of the named brands in Nestlé's AI-powered digital-twins content service (NVIDIA Omniverse + Accenture Song, hosted on Microsoft). 70%+ time-cost reduction on creative content scaling. Plus Group-level AI on supply chain + product innovation." } },
  leadership: { presenter: { html: "<strong>Anna Lundström</strong> · Nespresso CEO. Reports up to Nestlé Group CEO. AI agenda runs through Nestlé Group function (Aude Gandon CMO, Stéphanie Quappe CIO).", source: { label: "Nestlé — Digital twins for Purina, Nescafé, Nespresso", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>AI digital twins (Nespresso)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA Omniverse + Accenture Song + Microsoft hosting</span> — 3D virtual replicas of Nespresso products for content reuse + localisation. 70%+ time-cost reduction.", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } },
      { html: "<strong>Group-level supply chain AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + Nestlé AI infrastructure</span> — Climate-volatility risk + sourcing intelligence flow into Nespresso green-coffee programme.", source: { label: "Klover.AI — Nestlé AI strategy in F&B", url: "https://www.klover.ai/nestle-ai-strategy-analysis-of-dominance-in-food-and-beverage/" } },
    ] },
    consumerFacing: "<strong>Indirect.</strong> Digital twins improve product imagery / content; consumer doesn't see AI directly. No flagship consumer GenAI app yet.",
    genAI: { mentioned: true, vendors: [{ name: "NVIDIA Omniverse", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, { name: "Microsoft" }, { name: "Accenture Song" }], note: "Inherits Nestlé Group AI stack. Digital twins service is the named GenAI artefact." },
  },
  vendorStack: {
    namedPartners: [
      { name: "NVIDIA Omniverse — digital twins (via Nestlé)", status: "confirmed", caseStudy: { label: "Nestlé — Digital twins for Nespresso + Purina + Nescafé", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, note: "Nespresso is named in Nestlé's NVIDIA Omniverse digital-twins service announcement." },
      { name: "Microsoft (hosting)", status: "confirmed" },
      { name: "Accenture Song (build partner)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Inherits Nestlé Group's NVIDIA + Microsoft + Accenture stack. Brand-direct hyperscaler partnerships unlikely (Group steers).",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: organic growth +6.0%, UTOP margin 16.1% (+210bps segment basis). H1 CHF 3.17B (+2.4%), UTOP margin 21.9% (+40bps). Pricing-led growth on green coffee scarcity." },
    { lead: "AI posture.", body: "Performer 3.5. Inherits Nestlé Group AI. Named in the NVIDIA Omniverse digital-twins service (with Accenture Song + Microsoft hosting). 70%+ time-cost reduction on content scaling." },
    { lead: "Vendor footprint.", body: "Brand-direct partnerships unlikely; Group-level NVIDIA + Microsoft anchors. No Anthropic, OpenAI, Google, AWS, or Mistral relationship is disclosed at brand level; Group-level partnerships gatekeep." },
  ],
  sources: [
    { label: "Nestlé — FY2025 full-year results press release", url: "https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2025" },
    { label: "Nestlé — Half-year results 2025 (Nespresso H1)", url: "https://www.nestle.com/media/pressreleases/allpressreleases/half-year-results-2025" },
    { label: "Comunicaffe — Nestlé H1 2025 + Nespresso CHF 3.17B", url: "https://www.comunicaffe.com/nestle-reports-1h-sales-of-chf44-2-billion-1-8-nespresso-sales-increased-by-2-4-to-chf-3-172-billion/" },
    { label: "Nestlé — Digital twins for Purina, Nescafé, Nespresso", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" },
    { label: "Klover.AI — Nestlé AI strategy in F&B", url: "https://www.klover.ai/nestle-ai-strategy-analysis-of-dominance-in-food-and-beverage/" },
    { label: "World Coffee Portal — Nestlé banking on coffee brands", url: "https://www.worldcoffeeportal.com/news/nestle-banking-on-coffee-brands-as-high-costs-hit-sales-globally/" },
  ],
  askPrompts: ["What did Nespresso report for FY2025?", "How does Nespresso use NVIDIA Omniverse digital twins?", "Who runs AI at Nespresso?", "What's Nespresso's hyperscaler footprint?"],
};

// =============================================================================
// Nestlé — FY2025; NVIDIA Omniverse + Microsoft + Accenture digital twins
// =============================================================================
export const nestle_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-19" }, lastReported: { label: "Q1 2026 sales", date: "2026-04-23" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 19 Feb 2026. Q1 2026 published 23 Apr 2026 (CHF 21.3B, organic +3.5% beat consensus 2.4%; -90bps from infant-formula recall, RIG +1.2%). FY26 +3-4% organic guide held." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "CHF 89.5B", reported: "-2.0%", note: "FY2025; Fuel for Growth savings CHF 1.1B (+CHF 350M ahead of plan)" }, opMargin: { value: "16.1%", growth: { absolute: "-CHF 1.32B", pct: "-8.4%", basis: "UTOP FY2025 vs FY2024; UTOP margin -110bps reported" }, note: "Net profit CHF 9.0B; FCF CHF 9.2B" }, employees: { value: "271K", note: "16K job cuts announced FY2025" } },
    operatingComplexity: { hq: { value: "Switzerland 🇨🇭" }, countries: { value: "186" }, brands: { value: "2,000+", note: "Nescafé, Nespresso, KitKat, Maggi, Purina, Gerber, Perrier, San Pellegrino, Häagen-Dazs, Smarties + 1,990 more" } },
    whyMatters: "World's largest food + beverage. AI levers: digital twins for content (NVIDIA Omniverse + Accenture + Microsoft), Tastewise for product innovation, climate-volatility supply-chain AI, marketing-asset GenAI. Most-strategic-AI-partners on the watchlist (Microsoft, NVIDIA, Accenture, IBM Research).",
    quarterlyUpdate: {
      label: "Q1 2026 sales",
      date: "23 April 2026",
      blurb: "Beat consensus +3.5% organic vs 2.4% expected. Reported sales CHF 21.3B (-5.7% on FX). Coffee + Food & Snacks led; -90bps drag from infant-formula recall. FY26 +3-4% organic guide held.",
      metrics: [
        { label: "Reported sales", value: "CHF 21.3B", trend: "-5.7%" },
        { label: "Organic growth", value: "+3.5%", trend: "Beat 2.4% est." },
        { label: "RIG / Pricing", value: "+1.2% / +2.3%", trend: "Volume-led ex-recall" },
        { label: "Recall drag", value: "~-90bps", trend: "Now behind us" },
        { label: "EM ex-China OG", value: "+6.8%", trend: "RIG +2.9%" },
        { label: "FY26 organic guide", value: "+3-4%", trend: "Held" },
      ],
      reading: "Coffee + Food & Snacks deliver the beat. Infant-formula recall now contained. UTOP-margin improvement guide held — H2-loaded. Multi-vendor AI engine continues to back the productivity story.",
      source: { label: "Nestlé — Three-month sales 2026", url: "https://www.nestle.com/media/pressreleases/allpressreleases/three-month-sales-2026" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Multi-vendor AI engine.", body: "Microsoft + NVIDIA + Accenture + IBM Research are all named strategic AI partners. AI digital-twins service for Purina, Nescafé Dolce Gusto, Nespresso (70%+ time-cost reduction). Tastewise for product innovation. Strongest enterprise-AI partner footprint in CPG." } },
  leadership: { presenter: { html: "<strong>Laurent Freixe</strong> · CEO. <strong>Aude Gandon</strong> · Group Chief Marketing Officer (fronts AI marketing transformation). <strong>Stéphanie Quappe</strong> · CIO. AI agenda is Group-led with Aude Gandon as the public face.", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>AI digital twins for content</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA Omniverse + Accenture Song + Microsoft</span> — 3D virtual replicas allow packaging localisation + creative content generation. 70%+ time-cost reduction on scaling.", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } },
      { html: "<strong>Tastewise</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Tastewise (GenAI)</span> — Generative AI platform for product innovation; validates new ideas + generates market-research reports.", source: { label: "Tiger Advisory — How Mars, Nestle exploring GenAI", url: "https://www.tigeradvisory.com/article/how-mars-colgate-palmolive-nestle-coca-cola-are-exploring-generative-ai" } },
      { html: "<strong>Climate-volatility supply chain AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal + IBM Research</span> — Forecast cocoa, coffee, dairy, grain availability across global agricultural regions.", source: { label: "Klover.AI — Nestlé AI strategy in F&B", url: "https://www.klover.ai/nestle-ai-strategy-analysis-of-dominance-in-food-and-beverage/" } },
      { html: "<strong>CI&T data + application intelligence</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· CI&T</span> — Build partner for consumer-experience data programmes.", source: { label: "CI&T — Nestlé case study", url: "https://ciandt.com/us/en-us/case-study/nestle-uses-data-and-application-intelligence-influence-consumer-experience" } },
    ] },
    quantifiedROI: { html: "<strong>Digital twins:</strong> 70%+ time-cost reduction on creative content scaling. <strong>Fuel for Growth savings:</strong> CHF 1.1B + ongoing efficiencies CHF 1B+. <strong>Headcount:</strong> 16K reductions announced FY2025 — partly AI productivity-driven.", source: { label: "Nestlé — FY2025 results + strategic update", url: "https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2025" } },
    consumerFacing: "<strong>Indirect.</strong> Digital twins surface in marketing imagery + e-commerce. No flagship consumer GenAI mobile app yet.",
    genAI: { mentioned: true, vendors: [{ name: "NVIDIA Omniverse", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, { name: "Microsoft" }, { name: "Accenture Song" }, { name: "IBM Research" }, { name: "Tastewise" }], note: "Five named GenAI / AI partners — broadest footprint in CPG." },
    stackTable: [
      { layer: "GenAI content / digital twins", product: "NVIDIA Omniverse + Accenture Song + Microsoft", use: "3D digital twins; 70%+ content-scaling time-cost reduction", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } },
      { layer: "Product-innovation GenAI", product: "Tastewise", use: "Validate new ideas + generate market research", source: { label: "Tiger Advisory — Nestlé GenAI", url: "https://www.tigeradvisory.com/article/how-mars-colgate-palmolive-nestle-coca-cola-are-exploring-generative-ai" } },
      { layer: "Research AI", product: "IBM Research", use: "Climate-volatility supply chain AI", source: { label: "Klover.AI — Nestlé AI strategy", url: "https://www.klover.ai/nestle-ai-strategy-analysis-of-dominance-in-food-and-beverage/" } },
      { layer: "Data + apps build", product: "CI&T", use: "Consumer-experience data programmes", source: { label: "CI&T — Nestlé case study", url: "https://ciandt.com/us/en-us/case-study/nestle-uses-data-and-application-intelligence-influence-consumer-experience" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "NVIDIA — Omniverse digital twins", status: "confirmed", caseStudy: { label: "Nestlé — Digital twins for Purina + Nescafé + Nespresso", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, note: "70%+ time-cost reduction on creative content scaling. NVIDIA Omniverse is the foundation." },
      { name: "Microsoft — hosting layer", status: "confirmed", caseStudy: { label: "Nestlé — Digital twins (Microsoft hosting)", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, note: "Hosts the NVIDIA-built digital twins service." },
      { name: "Accenture Song — build partner", status: "confirmed", caseStudy: { label: "Nestlé — Digital twins (Accenture Song co-build)", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" }, note: "Co-builder with NVIDIA on the digital-twins content service." },
      { name: "IBM Research — climate / supply AI", status: "confirmed" },
      { name: "Tastewise — GenAI for product innovation", status: "confirmed" },
      { name: "CI&T — consumer-experience data partner", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Five named strategic AI partners is the widest enterprise-AI footprint in CPG. Notably no Google / Anthropic / OpenAI / AWS / Mistral relationship — meaningful gaps for those vendors.",
  },
  byMaison: {
    maisons: [
      { brand: "Purina", description: "Pet care flagship — NVIDIA Omniverse digital twins covered.", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } },
      { brand: "Nescafé / Nescafé Dolce Gusto", description: "Coffee flagship — digital twins for content scaling.", source: { label: "Nestlé — Digital twins press release", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" } },
      { brand: "Nespresso", description: "Reports separately as Nestlé segment. Inherits Group AI infrastructure." },
      { brand: "KitKat / Maggi / Smarties", description: "Confectionery + culinary mass brands. Group-wide marketing AI flows down." },
      { brand: "Perrier / San Pellegrino / Vittel", description: "Waters portfolio. Sustainability + supply chain AI more visible." },
      { brand: "Gerber / Häagen-Dazs", description: "Infant nutrition + ice cream. Group AI infrastructure." },
    ],
    note: "Purina, Nescafé Dolce Gusto and Nespresso are publicly named in the digital-twins service. Other brands ride Group AI infrastructure.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue CHF 89.5B (-2%), UTOP CHF 14.39B (-8.4%), margin 16.1% (-110bps), net profit CHF 9.0B, FCF CHF 9.2B. Strategic update: 16K job cuts. Fuel for Growth saved CHF 1.1B (+CHF 350M ahead)." },
    { lead: "AI posture.", body: "Performer 4.0. Five named strategic AI partners (NVIDIA + Microsoft + Accenture Song + IBM Research + Tastewise + CI&T). Digital twins for Purina/Nescafé/Nespresso (70%+ time-cost cut). Aude Gandon CMO public face." },
    { lead: "Vendor footprint.", body: "Most-vendor-rich CPG account on the watchlist. Notably absent: Google / Anthropic / OpenAI / AWS / Mistral. All not disclosed. NVIDIA-direct relationship is rare and high-leverage." },
  ],
  sources: [
    { label: "Nestlé — FY2025 full-year results + strategic update", url: "https://www.nestle.com/media/pressreleases/allpressreleases/full-year-results-2025" },
    { label: "Nestlé — Annual Review 2025 PDF", url: "https://www.nestle.com/sites/default/files/2026-02/annual-review-2025-en.pdf" },
    { label: "Nestlé — FY2025 financial statements PDF", url: "https://www.nestle.com/sites/default/files/2026-02/financial-statements-2025-en.pdf" },
    { label: "Nestlé — Digital twins for Purina + Nescafé + Nespresso", url: "https://www.nestle.com/media/news/brands-ai-digital-twins-content-service" },
    { label: "Tiger Advisory — How Nestlé, Mars, P&G exploring GenAI", url: "https://www.tigeradvisory.com/article/how-mars-colgate-palmolive-nestle-coca-cola-are-exploring-generative-ai" },
    { label: "Klover.AI — Nestlé AI strategy in F&B", url: "https://www.klover.ai/nestle-ai-strategy-analysis-of-dominance-in-food-and-beverage/" },
    { label: "Emerj — Artificial Intelligence at Nestlé", url: "https://emerj.com/artificial-intelligence-at-nestle/" },
    { label: "CI&T — Nestlé consumer-experience data case study", url: "https://ciandt.com/us/en-us/case-study/nestle-uses-data-and-application-intelligence-influence-consumer-experience" },
  ],
  askPrompts: ["What did Nestlé report for FY2025?", "How does Nestlé use NVIDIA Omniverse digital twins?", "What is Tastewise?", "Who runs AI at Nestlé?"],
};

// =============================================================================
// Ocado Group — H1 2025 + FY2025 expected; OGRP robotic AI; Tech Solutions story
// =============================================================================
export const ocado_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2024 (52w to 1 Dec 2024)", date: "2025-02-26" }, lastReported: { label: "H1 2025 results", date: "2025-07-15" }, next: { label: "FY2025 full-year results", date: "26 February 2026 — verify on IR" }, blurb: "Fiscal year ends late November. H1 2025 results published Jul 2025. FY2025 due 26 Feb 2026." },
  investor: {
    fiscalYearLabel: "FY2024 baseline · H1 2025 reported",
    headline: { revenue: { value: "Tech Solutions: doubled EBITDA H1 2025", reported: "Tech Solutions EBITDA 2x", note: "H1 2025 statutory profit £611.8M (vs -£153M loss); Ocado Retail deconsolidation gain £782.6M" }, opMargin: { value: "Tech Solutions doubling", growth: { basis: "Underlying cash outflow improved by £93M H1 2025 vs H1 2024" }, note: "Robotic transformation underway" }, employees: { value: "16K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "12+", note: "Tech Solutions deployments globally" }, brands: { value: "2", note: "Ocado Group (Tech Solutions + Logistics + Ocado Retail JV w/ M&S)" }, stores: { value: "10 CFCs", note: "Customer Fulfilment Centres" } },
    whyMatters: "Robotic-grocery technology platform. AI levers: OGRP (On Grid Robotic Pick) — computer vision + reinforcement learning + behaviour cloning. 50% of volumes now picked robotically at most-advanced CFC. AI is the product.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 4, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI is the product.", body: "Ocado's OGRP system — robotic arms with computer vision, sensor-driven intelligence, deep reinforcement learning, behaviour cloning — is the productised AI offering. 30M+ items picked via OGRP in 2024. 50% robotic share at the most advanced CFC. Tech Solutions division is the AI story." } },
  leadership: { presenter: { html: "<strong>Tim Steiner</strong> · CEO + co-founder. <strong>Gabriel Straub</strong> · Chief Data Officer (public on Ocado AI strategy). <strong>James Matthews</strong> · CEO Ocado Technology.", source: { label: "Ocado Group — Ocado's AI Story (Gabriel Straub)", url: "https://www.ocadogroup.com/newsroom/stories/ocados-ai-story" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>OGRP — On Grid Robotic Pick</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal computer vision + RL</span> — Robotic arms picking 50% of volume at most-advanced CFC; 30M+ items picked in 2024 with small arm count. Behaviour cloning + reinforcement learning.", source: { label: "Technology Magazine — AI redefining Ocado's robotic fulfilment", url: "https://technologymagazine.com/ai-and-machine-learning/how-ai-is-redefining-ocados-robotic-fulfilment-system" } },
      { html: "<strong>CFC orchestration</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal Ocado Smart Platform (OSP)</span> — End-to-end CFC software running thousands of bots in real-time.", source: { label: "Ocado Group — Our Technology", url: "https://www.ocadogroup.com/about-us/our-technology" } },
      { html: "<strong>Forecasting + routing AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Demand forecasting, last-mile routing AI for partner deployments.", source: { label: "Rock & Turner — Ocado Retail Robotic AI Revolution", url: "https://rockandturner.substack.com/p/ocado-retail-robotic-ai-revolution" } },
    ] },
    quantifiedROI: { html: "<strong>OGRP scale:</strong> 30M+ items picked in 2024 via robotic arms. 50% of volumes robotic at most-advanced CFC. <strong>Tech Solutions:</strong> EBITDA more than doubled in H1 2025.", source: { label: "Technology Magazine — Ocado robotic fulfilment AI", url: "https://technologymagazine.com/ai-and-machine-learning/how-ai-is-redefining-ocados-robotic-fulfilment-system" } },
    consumerFacing: "<strong>Indirect.</strong> AI is in the warehouse. Consumer experience improvements (faster fulfilment, fewer substitutions) are the surface read.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led" }], note: "AI is built in-house. Foundation-model layer not publicly disclosed." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led OGRP + OSP", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Ocado is one of the watchlist's most internally-built AI shops. No public hyperscaler partnership for OGRP / OSP. No GenAI vendor relationship is disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "H1 2025 statutory profit £611.8M (after Ocado Retail deconsolidation gain £782.6M). Tech Solutions EBITDA more than doubled. Underlying cash outflow improved £93M YoY. FY2025 results 26 Feb 2026." },
    { lead: "AI posture.", body: "Performer 4.5. AI is the product. OGRP (robotic arms with computer vision + RL + behaviour cloning) at 50% of volumes in most-advanced CFC. 30M+ items picked in 2024. CDO Gabriel Straub public on AI strategy." },
    { lead: "Vendor footprint.", body: "Internally-built. No public hyperscaler footprint. No further vendor relationships disclosed." },
  ],
  sources: [
    { label: "Ocado Group — Full Year Results 2025 (due 26 Feb 2026)", url: "https://www.ocadogroup.com/investors/results-and-presentations/ocado-group-full-year-results-2025" },
    { label: "Ocado Group — Half Year Results 2025", url: "https://www.ocadogroup.com/investors/results-and-presentations/half-year-results-2025" },
    { label: "Ocado Group — Ocado's AI Story with Gabriel Straub CDO", url: "https://www.ocadogroup.com/newsroom/stories/ocados-ai-story" },
    { label: "Technology Magazine — AI redefining Ocado's robotic fulfilment system", url: "https://technologymagazine.com/ai-and-machine-learning/how-ai-is-redefining-ocados-robotic-fulfilment-system" },
    { label: "Rock & Turner — Ocado Retail Robotic AI Revolution", url: "https://rockandturner.substack.com/p/ocado-retail-robotic-ai-revolution" },
    { label: "Ocado Group — Our Technology", url: "https://www.ocadogroup.com/about-us/our-technology" },
  ],
  askPrompts: ["What did Ocado Group report in H1 2025?", "What is OGRP and how does it use AI?", "Who is Gabriel Straub and what does Ocado's CDO do?", "What's Ocado's hyperscaler footprint?"],
};

// =============================================================================
// On Holding (On Running) — FY2025; CHF 3.0B (+30%); minimal public AI footprint
// =============================================================================
export const on_running_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-04" }, lastReported: { label: "FY2025 results + 20-F", date: "2026-03-04" }, next: { label: "Q1 2026 results", date: "Mid-May 2026" }, blurb: "FY2025 published 4 Mar 2026 (CHF 3.01B, +30% / +35.6% c/c). Q1 2026 results due mid-May. CHF 1B+ cash position." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "CHF 3.01B", reported: "+30.0%", organic: "+35.6% c/c", note: "First time exceeding CHF 3B" }, opMargin: { value: "Adj EBITDA 18.8%", growth: { absolute: "+CHF 130M+", pct: "Gross margin 62.8%, +180bps Q4", basis: "Adj EBITDA margin FY2025; Q4 17.6% (+120bps YoY)" }, note: "Cash >CHF 1.0B at year-end" }, employees: { value: "3.5K" } },
    operatingComplexity: { hq: { value: "Switzerland 🇨🇭" }, countries: { value: "60+" }, brands: { value: "1", note: "On (master)" }, stores: { value: "60+ DTC" } },
    whyMatters: "Premium Swiss running brand growing at watchlist's fastest rate. AI levers: e-commerce personalisation, demand forecasting (Roger Federer collab + apparel push), creative content. Digital-DNA brand but minimal public AI footprint disclosed.",
  },
  aiPerception: { quadrant: "narrative_led", label: "Narrative-led · 2.0", rhetoric: 2, production: 1, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Growth-led; AI quiet.", body: "Story is hyper-growth + premiumisation, not AI. No publicly named GenAI / hyperscaler partnership. Likely internal e-commerce + recommendation ML, but undisclosed." } },
  leadership: { presenter: { html: "<strong>Martin Hoffmann</strong> + <strong>Marc Maurer</strong> · co-CEOs. <strong>David Allemann</strong> · co-founder + Executive Co-Chairman. Tech leadership reports through Group COO; less public-facing than apparel peers.", source: { label: "On — FY2025 results announcement", url: "https://press.on-running.com/on-announces-fourth-quarter-and-full-year-results-and-the-filing-of-its-annual-report-on-form-20-f-for-2025" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>E-commerce + recommendations</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Implied DTC personalisation; not publicly detailed.", source: { label: "On — Investor relations hub", url: "https://investors.on-running.com" } },
    ] },
    consumerFacing: "<strong>No flagship AI surface yet.</strong>",
    genAI: { mentioned: false, note: "No public GenAI / AI vendor partnership. Hyper-growth narrative dominates investor materials." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led tech", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI partnership. No further vendor relationships disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue CHF 3.01B (+30% / +35.6% c/c), gross margin 62.8%, adj EBITDA margin 18.8%. Q4 record (+180bps gross margin). Cash >CHF 1B. 2026 outlook: +23% c/c at 18.5-19% adj EBITDA margin." },
    { lead: "AI posture.", body: "Narrative-led 2.0. No public AI vendor footprint. Story is hyper-growth + premiumisation. Likely internal ML for e-commerce but undisclosed." },
    { lead: "Vendor footprint.", body: "No Anthropic, OpenAI, Microsoft, Google, Mistral, or AWS relationship is disclosed." },
  ],
  sources: [
    { label: "On — FY2025 results announcement", url: "https://press.on-running.com/on-announces-fourth-quarter-and-full-year-results-and-the-filing-of-its-annual-report-on-form-20-f-for-2025" },
    { label: "On — FY2025 results IR page", url: "https://investors.on-running.com/news/news-details/2026/On-Announces-Fourth-Quarter-and-Full-Year-Results-and-the-Filing-of-its-Annual-Report-on-Form-20-F-for-2025/default.aspx" },
    { label: "On — Q3 + 9M 2025 results", url: "https://press.on-running.com/on-reports-results-for-the-third-quarter-and-nine-month-period-ended-september-30-2025" },
    { label: "On — Q2 + H1 2025 results", url: "https://press.on-running.com/on-reports-results-for-the-second-quarter-and-six-month-period-ended-june-30-2025" },
    { label: "On — Q1 2025 results", url: "https://press.on-running.com/on-reports-first-quarter-2025-results" },
    { label: "Macrotrends — On Holding revenue 2021-2025", url: "https://www.macrotrends.net/stocks/charts/ONON/on-holding-ag/revenue" },
  ],
  askPrompts: ["What did On Running report for FY2025?", "What's On Running's growth rate?", "Does On Running have any AI partnerships?", "Who runs technology at On Running?"],
};

// =============================================================================
// Pernod Ricard — FY25 (ends Jun); 4 KDPs (D-STAR, Matrix AI, Maestria, Genie); AlixPartners-named most advanced European AI
// =============================================================================
export const pernod_ricard_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY25 (52w to 30 Jun 2025)", date: "2025-08-28" }, lastReported: { label: "Q3 FY26 (9M) sales", date: "2026-04-16" }, next: { label: "FY26 prelim results", date: "Late August 2026" }, blurb: "Fiscal year ends June. Q3 FY26 sales published 16 Apr 2026 (Q3 €1,945M, +0.1% organic, volumes back to growth +4%). 9M €7,199M, -4.4% organic. FY26 guide cut to -3 to -4% organic." },
  investor: {
    fiscalYearLabel: "FY25 baseline",
    headline: { revenue: { value: "€10.96B", reported: "-5.5%", organic: "-3.0%", note: "FY25; FX -€277M (TRY, ARS, INR)" }, opMargin: { value: "26.9%", growth: { absolute: "Recurring OP €2.95B", basis: "Op margin held FY25 vs FY24 — 2nd consecutive year at 26.9%" }, note: "Net profit €1,626M (+10%)" }, employees: { value: "20K" } },
    operatingComplexity: { hq: { value: "France 🇫🇷" }, countries: { value: "160+" }, brands: { value: "240+", note: "Absolut, Jameson, Chivas Regal, Martell, Beefeater, Malibu, Havana Club, Mumm, Perrier-Jouët, Ricard" } },
    whyMatters: "World's #2 spirits group. AI levers: 4 Key Digital Programs (D-STAR sales AI, Matrix AI marketing, Maestria 2.0 predictive, Genie GenAI marketing content). 200-expert GenAI division. Named most-advanced-AI European company by AlixPartners.",
    quarterlyUpdate: {
      label: "Q3 FY26 (9M) sales",
      date: "16 April 2026",
      blurb: "Volumes return to growth in Q3 (+4%). Q3 NSV €1,945M, +0.1% organic / -14.6% reported on FX + Wines disposal. 9M €7,199M, -4.4% organic. Excl. US + China, Q3 organic +5% globally. FY26 guide trimmed to -3 to -4% organic on Middle East drag.",
      metrics: [
        { label: "Q3 NSV", value: "€1,945M", trend: "+0.1% organic / -14.6% reported" },
        { label: "Q3 volumes", value: "+4%", trend: "Return to growth" },
        { label: "9M NSV", value: "€7,199M", trend: "-4.4% organic" },
        { label: "FX drag (9M)", value: "-€515M", trend: "USD/INR/TRY" },
        { label: "Wines disposal", value: "-€393M", trend: "Group structure" },
        { label: "Updated FY26 guide", value: "-3% to -4%", trend: "Middle East conflict drag" },
      ],
      reading: "Volume turn in Q3 is the bullish read; ex-US/China the rest of the world is +5% organic. Strategic International Brands (Ballantine's, Royal Salute, Malibu) and RTDs (+26% Q3) the standouts. AI productivity continues funding the cost story.",
      source: { label: "Pernod Ricard — Q3 FY26 sales press release", url: "https://www.pernod-ricard.com/en/media/third-quarter-fy26-sales-and-results" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 5, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Most-advanced AI in European CPG.", body: "Four named Key Digital Programs: D-STAR (frontline sales-AI), Matrix AI (marketing-mix optimisation), Maestria 2.0 (predictive brand-matching), Genie (GenAI marketing content). 200-expert internal AI division. AlixPartners named PR most-advanced European company in AI adoption." } },
  leadership: { presenter: { html: "<strong>Pierre-Yves Calloc'h</strong> · Chief Digital and Information Officer (Group CDIO). Public face of Pernod Ricard's AI transformation. <strong>Alexandre Ricard</strong> · CEO + Chairman.", source: { label: "London Spirits Competition — Pernod Ricard's AI Transformation with Pierre-Yves Calloc'h", url: "https://londonspiritscompetition.com/en/blog/interviews-2518/pernod-ricards-ai-transformation-with-pierre-yves-calloch-634.htm" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>D-STAR</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal AI</span> — Frontline AI: real-time tailored recommendations for sales reps (which SKUs to push, which stores to prioritise, visit frequency).", source: { label: "CIO — Pernod Ricard leverages AI for marketing", url: "https://www.cio.com/article/4070313/pernod-ricard-leverages-ai-to-strengthen-marketing-efforts.html" } },
      { html: "<strong>Matrix AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal AI</span> — Marketing-mix engine: reallocates budgets, avoids media saturation, tailors campaigns with measurable returns.", source: { label: "AI Expert Network — Pernod Ricard AI case study", url: "https://aiexpert.network/case-study-pernod-ricard-harmonizes-strategy-and-efficiency-with-ai/" } },
      { html: "<strong>Maestria 2.0</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal predictive AI</span> — AI-powered brand-matching tool; predicts future outcomes / behaviours / trends.", source: { label: "Think Insights — Pernod Ricard's AI Integration", url: "https://thinkinsights.net/ai/pernod-ricards-ai-integration" } },
      { html: "<strong>Genie</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — Generative AI marketing content development tool.", source: { label: "ClickZ — AI at Pernod Ricard isn't a tool, it's a culture shift", url: "https://clickz.com/ai-at-pernod-ricard-isnt-a-tool-its-a-culture-shift/272077/" } },
      { html: "<strong>200-expert internal AI division</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Dedicated 200-person team exploring GenAI innovations.", source: { label: "AI Expert Network — Pernod Ricard case study", url: "https://aiexpert.network/case-study-pernod-ricard-harmonizes-strategy-and-efficiency-with-ai/" } },
    ] },
    consumerFacing: "<strong>Indirect.</strong> AI is mostly back-office (sales + marketing + brand). No flagship consumer GenAI app yet.",
    genAI: { mentioned: true, vendors: [{ name: "Internal-led" }, { name: "PALO IT (build partner)" }], note: "PR's AI is mostly internally-built. PALO IT is the named build partner." },
    stackTable: [
      { layer: "Sales AI", product: "D-STAR", use: "Real-time SKU + store + visit recommendations", source: { label: "AI Expert Network — Pernod Ricard", url: "https://aiexpert.network/case-study-pernod-ricard-harmonizes-strategy-and-efficiency-with-ai/" } },
      { layer: "Marketing AI", product: "Matrix AI", use: "Marketing-mix optimisation", source: { label: "CIO — Pernod Ricard AI marketing", url: "https://www.cio.com/article/4070313/pernod-ricard-leverages-ai-to-strengthen-marketing-efforts.html" } },
      { layer: "Predictive AI", product: "Maestria 2.0", use: "Brand-matching + future-trend forecasting", source: { label: "Think Insights — Pernod Ricard AI", url: "https://thinkinsights.net/ai/pernod-ricards-ai-integration" } },
      { layer: "GenAI marketing", product: "Genie", use: "Marketing content generation", source: { label: "ClickZ — AI culture shift at Pernod Ricard", url: "https://clickz.com/ai-at-pernod-ricard-isnt-a-tool-its-a-culture-shift/272077/" } },
      { layer: "Build partner", product: "PALO IT", use: "Co-builder of AI for all programme", source: { label: "PALO IT — Pernod Ricard client story", url: "https://www.palo-it.com/en/case-study/pernod-ricard" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "PALO IT — AI for all build partner", status: "confirmed", caseStudy: { label: "PALO IT — Pernod Ricard client story", url: "https://www.palo-it.com/en/case-study/pernod-ricard" }, note: "Named build partner for Pernod Ricard's AI rollout." },
      { name: "AlixPartners (advisory + named PR most-advanced)", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "PR's AI is internally-built with PALO IT as the named build partner. No public hyperscaler / foundation-model partnership disclosed — meaningful given the depth of AI deployment. All hyperscalers not disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "Absolut", description: "Vodka flagship. Genie GenAI for creative campaigns; Matrix AI for marketing-mix optimisation." },
      { brand: "Jameson", description: "Irish whiskey flagship. D-STAR sales-AI most active in US/Ireland." },
      { brand: "Chivas Regal / Martell", description: "Premium whisky + cognac. Maestria 2.0 predictive AI for premium-tier targeting." },
      { brand: "Mumm / Perrier-Jouët", description: "Champagne portfolio. Brand-AI for premium clientelling at retail." },
      { brand: "Beefeater / Malibu / Ricard / Havana Club", description: "Mass-premium portfolio. Group AI infrastructure flows down." },
    ],
    note: "AI is Group-built and flows through to all brands. No standalone brand-level AI campaigns.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY25 (Jun 2025): revenue €10.96B (-3% organic, -5.5% reported on FX), op profit €2.95B, op margin held at 26.9% for 2nd year, net profit +10% to €1.63B. Tariffs + China + emerging FX drag." },
    { lead: "AI posture.", body: "Performer 4.5. Most-advanced European AI company per AlixPartners. Four named KDPs (D-STAR, Matrix AI, Maestria 2.0, Genie) + 200-person internal AI division. Pierre-Yves Calloc'h CDIO public face." },
    { lead: "Vendor footprint.", body: "AI is built internally today, with PALO IT the only named build partner. No NVIDIA, Microsoft, Anthropic, OpenAI, or Google relationship is disclosed, including at the foundation-model layer." },
  ],
  sources: [
    { label: "Pernod Ricard — FY25 sales and results", url: "https://www.pernod-ricard.com/en/media/fy25-full-year-sales-and-results" },
    { label: "Pernod Ricard — FY25 financial statements PDF", url: "https://www.pernod-ricard.com/sites/default/files/inline-files/Financial%20statements%20FY25.PDF" },
    { label: "CIO — Pernod Ricard leverages AI for marketing", url: "https://www.cio.com/article/4070313/pernod-ricard-leverages-ai-to-strengthen-marketing-efforts.html" },
    { label: "Harvard Business School — Pernod Ricard case study", url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=65952" },
    { label: "AI Expert Network — Pernod Ricard AI strategy", url: "https://aiexpert.network/case-study-pernod-ricard-harmonizes-strategy-and-efficiency-with-ai/" },
    { label: "Think Insights — Pernod Ricard's AI Integration", url: "https://thinkinsights.net/ai/pernod-ricards-ai-integration" },
    { label: "PALO IT — Pernod Ricard AI for all", url: "https://www.palo-it.com/en/case-study/pernod-ricard" },
    { label: "ClickZ — AI at Pernod Ricard culture shift", url: "https://clickz.com/ai-at-pernod-ricard-isnt-a-tool-its-a-culture-shift/272077/" },
    { label: "HBR — How Pernod Ricard integrates AI into workforce", url: "https://hbr.org/podcast/2024/11/how-pernod-ricard-is-integrating-ai-into-its-workforce" },
  ],
  askPrompts: ["What did Pernod Ricard report for FY25?", "What are D-STAR, Matrix AI, Maestria 2.0, and Genie?", "Why did AlixPartners name Pernod Ricard most-advanced European AI company?", "Who is Pierre-Yves Calloc'h?"],
};

// =============================================================================
// Puig — FY2025 record €5.04B; minimal public AI footprint
// =============================================================================
export const puig_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-26" }, lastReported: { label: "Q1 2026 sales update", date: "2026-04-28" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 26 Feb 2026. Q1 2026 published 28 Apr 2026 (€1.21B, +4.7% LFL — beat 3.6% consensus). Make-up +9.2% LFL, APAC +26.1% LFL. ~1.2% Middle East drag." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€5.04B", reported: "Stable", organic: "+7.8% LFL", note: "First time exceeding €5B; top end of 6-8% guidance" }, opMargin: { value: "20.7% adj EBITDA", growth: { absolute: "+€95M", pct: "+50bps adj EBITDA margin", basis: "FY2025 vs FY2024 (20.2% prior); op profit €812M / margin 16.1%; net profit €587M (+6.5%)" }, note: "Tripled FY2020 revenue per strategic plan" }, employees: { value: "9K" } },
    operatingComplexity: { hq: { value: "Spain 🇪🇸" }, countries: { value: "150+" }, brands: { value: "20+", note: "Rabanne, Carolina Herrera, Jean Paul Gaultier, Charlotte Tilbury, Nina Ricci, Penhaligon's, L'Artisan Parfumeur, Loewe Perfumes" } },
    whyMatters: "Spanish luxury beauty + fragrance group. AI levers: marketing-asset GenAI, R&D for fragrance development, e-commerce personalisation. Public AI footprint is thin.",
    quarterlyUpdate: {
      label: "Q1 2026 sales update",
      date: "28 April 2026",
      blurb: "Beat consensus +4.7% LFL (vs 3.6% est). €1.21B revenue. Make-up the standout at +9.2% LFL. APAC +26.1% LFL led regions. €48M FX headwind + ~1.2% Middle East drag (mostly March).",
      metrics: [
        { label: "Net revenue", value: "€1.21B", trend: "+4.7% LFL" },
        { label: "Fragrance + Fashion", value: "€897M (74%)", trend: "+3.9% LFL" },
        { label: "Make-up", value: "€170.8M", trend: "+9.2% LFL standout" },
        { label: "Skincare", value: "€147M", trend: "+2.1% reported" },
        { label: "APAC LFL", value: "+26.1%", trend: "Strongest region" },
        { label: "EMEA / Americas LFL", value: "+3.0% / +2.0%", trend: "Stable" },
      ],
      reading: "Make-up momentum + APAC growth offset FX + Middle East. Lauder merger talks are reported in the press; a combination would change the beauty-AI vendor map. No hyperscaler relationship is disclosed today.",
      source: { label: "Puig — Q1 2026 sales update PDF", url: "https://uploads.puig.com/uploads/Puig_Q1_2026_Sales_Update_Press_release_ENG_ae2c8fa57d.pdf" },
    },
  },
  aiPerception: { quadrant: "narrative_led", label: "Narrative-led · 2.0", rhetoric: 2, production: 2, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Hyper-growth led; AI quiet.", body: "Story is brand momentum (Rabanne, Charlotte Tilbury, Jean Paul Gaultier) and tripling 2020 revenue. AI rarely fronts investor commentary. Likely internal e-commerce + marketing AI but undisclosed." } },
  leadership: { presenter: { html: "<strong>Marc Puig</strong> · Executive Chairman + CEO. <strong>José Manuel Albesa</strong> · Deputy CEO (appointed FY2025). Family-controlled (Puig family). Tech leadership reports through CFO + COO; less public-facing than CPG peers.", source: { label: "Puig — FY2025 results PDF", url: "https://uploads.puig.com/uploads/Puig_FY_2025_Results_Press_Release_English_b01de89237.pdf" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>E-commerce + brand-experience tooling</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Implied digital + AI work; not publicly detailed.", source: { label: "Puig — Newsroom", url: "https://www.puig.com/en/newsroom/puig-delivers-strong-h1-results/" } },
    ] },
    consumerFacing: "<strong>No flagship AI surface yet.</strong>",
    genAI: { mentioned: false, note: "Public material does not name a GenAI vendor or product." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led tech", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI partnership. No further vendor relationships disclosed. Adobe Firefly fits naturally given fragrance/beauty creative needs (peer Estée Lauder uses Firefly).",
  },
  byMaison: {
    maisons: [
      { brand: "Rabanne", description: "Premium fragrance + fashion. Invictus, 1 Million flagship lines." },
      { brand: "Carolina Herrera", description: "Premium fragrance. Good Girl flagship." },
      { brand: "Jean Paul Gaultier", description: "Premium fragrance + fashion. Le Mâle, La Belle." },
      { brand: "Charlotte Tilbury", description: "Premium makeup. Acquired 2020. Hyper-growth tier." },
      { brand: "Penhaligon's / L'Artisan Parfumeur / Loewe Perfumes", description: "Niche fragrance houses. High-margin tier." },
    ],
    note: "Charlotte Tilbury + Rabanne are the growth engines. AI work would naturally start in marketing creative (Adobe Firefly fit) or e-commerce personalisation.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €5.04B (+7.8% LFL — first time over €5B), adj EBITDA €1.05B (margin 20.7%, +50bps), op profit €812M (16.1%), net profit €587M (+6.5%). Tripled FY2020 revenue." },
    { lead: "AI posture.", body: "Narrative-led 2.0 (estimated). No public AI vendor footprint. Story is brand momentum, not AI." },
    { lead: "Vendor footprint.", body: "No hyperscaler relationship disclosed. Peer Estée Lauder discloses Adobe Firefly; this company discloses no equivalent." },
  ],
  sources: [
    { label: "Puig — FY2025 results PDF", url: "https://uploads.puig.com/uploads/Puig_FY_2025_Results_Press_Release_English_b01de89237.pdf" },
    { label: "Moodie Davitt — Puig FY2025 +7.8% revenue", url: "https://moodiedavittreport.com/puig-records-7-8-revenue-growth-in-fy2025-outperforming-premium-beauty-market/" },
    { label: "Global Cosmetics News — Puig tops €5B in record 2025 sales", url: "https://www.globalcosmeticsnews.com/puig-tops-e5bn-in-record-2025-sales-as-profitability-beats-guidance/" },
    { label: "Premium Beauty News — Puig €5B revenue 2025", url: "https://www.premiumbeautynews.com/en/puig-s-revenue-surpassed-the-5,27125" },
    { label: "FashionNetwork — Puig net profit €587M 2025", url: "https://ww.fashionnetwork.com/news/Puig-posted-a-net-profit-of-587-million-in-2025-up-6-5-,1808453.html" },
    { label: "Puig — H1 2025 results PDF", url: "https://uploads.puig.com/uploads/Puig_H1_2025_Results_Press_Release_ENG_a3be5c42e7.pdf" },
  ],
  askPrompts: ["What did Puig report for FY2025?", "How does Puig grow Rabanne and Charlotte Tilbury?", "Does Puig have any AI partnerships?", "Who runs digital at Puig?"],
};

// =============================================================================
// Reckitt — FY2025; flagship Microsoft Azure OpenAI customer story (60% marketing efficiency)
// =============================================================================
export const reckitt_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-05" }, lastReported: { label: "Q1 2026 trading update", date: "2026-04-22" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 5 Mar 2026. Q1 2026 trading update published 22 Apr 2026 (Core LFL +1.3%, +3.1% ex-seasonal OTC; Lysol double-digit; EM +7.6%). FY26 +4-5% Core LFL guide held." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "Core +5.2% LFL", reported: "Volume +1.5%, price/mix +3.7%", note: "FY2025; £2.3B returns to shareholders" }, opMargin: { value: "24.9%", growth: { absolute: "+£68M", pct: "Adj OP +£68M to £3.54B", basis: "FY2025 vs FY2024; +40bps margin; Fuel for Growth savings continue" }, note: "EPS growth + Fuel for Growth" }, employees: { value: "40K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "60+" }, brands: { value: "20+", note: "Lysol, Mucinex, Dettol, Durex, Strepsils, Veet, Air Wick, Finish, Vanish, Harpic, Mead Johnson Nutrition (Enfamil, Nutramigen)" } },
    whyMatters: "Hygiene + health + nutrition CPG. AI levers: Microsoft Azure OpenAI flagship customer story (60% marketing efficiency boost, 90% time-cut on marketing tasks); 500+ marketers using AI agents (doubling by year-end); Fuel for Growth + AI-driven cost programme; product-development AI with EPAM + BCG; revenue growth management AI with McKinsey.",
    quarterlyUpdate: {
      label: "Q1 2026 trading update",
      date: "22 April 2026",
      blurb: "Soft seasonal start. Core Reckitt LFL +1.3% (drag from low cold/flu + Europe). Excl seasonal OTC: +3.1%. Lysol double-digit LFL on share gains; Emerging Markets +7.6% (China + India both double-digit). FY26 +4-5% Core LFL guide held.",
      metrics: [
        { label: "Core Reckitt LFL", value: "+1.3%", trend: "+3.1% ex-seasonal OTC" },
        { label: "Lysol", value: "Double-digit LFL", trend: "Wipes + Spray + Laundry Sanitizer" },
        { label: "Emerging Markets", value: "+7.6% LFL", trend: "China + India double-digit" },
        { label: "Lysol Air Sanitizer", value: "Strong drive", trend: "Expanded fragrance range" },
        { label: "FY26 Core LFL guide", value: "+4-5%", trend: "Held — H2 weighted" },
      ],
      reading: "Lysol + EM strength offsets seasonal softness. Microsoft Azure OpenAI productivity programme + EPAM agentic AI continue scaling — full impact lands in H1.",
      source: { label: "Reckitt — Q1 2026 trading update", url: "https://www.reckitt.com/news/q1-2026-trading-update/" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 4, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Microsoft Azure OpenAI flagship.", body: "Reckitt's Azure OpenAI + Copilot for Power BI customer story is one of the strongest hyperscaler-CPG case studies (60% marketing efficiency, 90% time-cut on marketing tasks). Plus EPAM agentic AI rollout, BCG GenAI partnership, IBM, McKinsey RGM. Five-vendor AI stack." } },
  leadership: { presenter: { html: "<strong>Kris Licht</strong> · CEO. <strong>Yusuf Khan</strong> · Chief Commercial &amp; Digital Officer. CDO drives the AI agenda; Microsoft case study quotes feature prominently.", source: { label: "Microsoft Customer Story — Reckitt Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Microsoft Azure OpenAI + Copilot for Power BI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — 60% marketing efficiency boost; 90% time-cut on marketing tasks; consumer-centric insights-driven marketing.", source: { label: "Microsoft Customer Story — Reckitt Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" } },
      { html: "<strong>EPAM agentic AI rollout</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· EPAM</span> — Suite of AI marketing agents to 500+ marketers across 4 markets, doubling by year-end. \"This is not a pilot.\"", source: { label: "EPAM — Reckitt agentic AI rollout (The Drum)", url: "https://www.thedrum.com/news/2025/08/01/not-pilot-lessons-reckitt-s-global-rollout-agentic-ai" } },
      { html: "<strong>BCG GenAI transformation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· BCG</span> — Future-ready GenAI transformation programme.", source: { label: "BCG — Reckitt GenAI transformation", url: "https://www.bcg.com/x/mark-your-moment/global-consumer-goods-leader-finds-efficiency-gains-with-genai-platform" } },
      { html: "<strong>McKinsey AI for Revenue Growth Management</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· McKinsey QuantumBlack</span> — AI-driven RGM programme.", source: { label: "McKinsey — Reckitt's bold AI ambition for RGM", url: "https://www.mckinsey.com/industries/consumer-packaged-goods/how-we-help-clients/reckitts-bold-ambition-harnessing-ai-to-redefine-revenue-growth-management" } },
      { html: "<strong>IBM</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· IBM</span> — Named IBM customer + product-development AI partner.", source: { label: "IBM — Reckitt Group case studies", url: "https://www.ibm.com/case-studies/reckitt-group" } },
    ] },
    quantifiedROI: { html: "<strong>Marketing AI:</strong> 60% efficiency boost; 90% time-cut on everyday marketing tasks. <strong>Agentic AI:</strong> 500+ marketers in 4 markets, doubling by year-end. <strong>Op margin:</strong> +40bps to 24.9%, partly AI-productivity-driven.", source: { label: "Microsoft — Reckitt Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" } },
    consumerFacing: "<strong>Indirect.</strong> Marketing-asset AI flows through to consumer-touched campaigns (Lysol, Mucinex). No flagship consumer GenAI app.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" }, { name: "EPAM (agentic build)", url: "https://www.thedrum.com/news/2025/08/01/not-pilot-lessons-reckitt-s-global-rollout-agentic-ai" }, { name: "BCG (GenAI transformation)" }, { name: "IBM" }, { name: "McKinsey QuantumBlack" }], note: "Five named GenAI / AI partners — among watchlist's broadest." },
    stackTable: [
      { layer: "Foundation model + GenAI", product: "Microsoft Azure OpenAI", use: "Marketing AI: 60% efficiency, 90% time-cut on tasks", source: { label: "Microsoft — Reckitt Azure OpenAI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" } },
      { layer: "BI + analytics", product: "Microsoft Copilot for Power BI", use: "Insights-driven marketing decisions", source: { label: "Microsoft — Reckitt Power BI", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" } },
      { layer: "Agentic AI build partner", product: "EPAM", use: "Marketing AI agents to 500+ marketers in 4 markets", source: { label: "EPAM via The Drum — Reckitt agentic rollout", url: "https://www.thedrum.com/news/2025/08/01/not-pilot-lessons-reckitt-s-global-rollout-agentic-ai" } },
      { layer: "Strategic AI advisor", product: "BCG", use: "Future-ready GenAI transformation", source: { label: "BCG — Reckitt GenAI", url: "https://www.bcg.com/x/mark-your-moment/global-consumer-goods-leader-finds-efficiency-gains-with-genai-platform" } },
      { layer: "RGM AI", product: "McKinsey QuantumBlack", use: "AI for revenue growth management", source: { label: "McKinsey — Reckitt RGM AI", url: "https://www.mckinsey.com/industries/consumer-packaged-goods/how-we-help-clients/reckitts-bold-ambition-harnessing-ai-to-redefine-revenue-growth-management" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft — Azure OpenAI + Copilot for Power BI", status: "confirmed", caseStudy: { label: "Microsoft Customer Story — Reckitt Azure OpenAI 60% marketing efficiency", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" }, note: "Flagship Microsoft customer story in CPG. 60% marketing-efficiency boost. 90% time-cut on tasks." },
      { name: "EPAM — agentic AI build partner", status: "confirmed", caseStudy: { label: "EPAM via The Drum — Reckitt agentic AI rollout", url: "https://www.thedrum.com/news/2025/08/01/not-pilot-lessons-reckitt-s-global-rollout-agentic-ai" }, note: "500+ marketers across 4 markets, doubling by year-end. \"This is not a pilot.\"" },
      { name: "BCG — GenAI transformation advisor", status: "confirmed", caseStudy: { label: "BCG — Reckitt GenAI transformation", url: "https://www.bcg.com/x/mark-your-moment/global-consumer-goods-leader-finds-efficiency-gains-with-genai-platform" }, note: "Strategic GenAI transformation programme." },
      { name: "McKinsey QuantumBlack — RGM AI", status: "confirmed", caseStudy: { label: "McKinsey — Reckitt RGM AI", url: "https://www.mckinsey.com/industries/consumer-packaged-goods/how-we-help-clients/reckitts-bold-ambition-harnessing-ai-to-redefine-revenue-growth-management" }, note: "AI-driven Revenue Growth Management." },
      { name: "IBM (product development AI)", status: "confirmed" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Microsoft is the marquee — flagship Azure OpenAI customer story. EPAM + BCG + McKinsey + IBM round out a five-vendor AI ecosystem (one of watchlist's broadest). Anthropic / OpenAI-direct / Google / AWS / Mistral not disclosed.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: Core LFL +5.2% (vol +1.5%, price/mix +3.7%), adj OP £3.54B (+£68M), op margin 24.9% (+40bps). £2.3B returns to shareholders. Lysol low-single-digit growth with H2 acceleration." },
    { lead: "AI posture.", body: "Performer 4.5. Microsoft Azure OpenAI flagship customer story (60% marketing efficiency, 90% time-cut). EPAM agentic AI to 500+ marketers, doubling. BCG + McKinsey + IBM round out the partner ecosystem." },
    { lead: "Vendor footprint.", body: "Microsoft is the anchor relationship. No Anthropic, OpenAI-direct, Google, AWS, or Mistral relationship is disclosed." },
  ],
  sources: [
    { label: "Reckitt — FY2025 results press release", url: "https://www.reckitt.com/news/full-year-results-2025/" },
    { label: "Reckitt — FY2025 results PDF", url: "https://www.reckitt.com/media/pkomsyoc/reckitt-fy-2025-results-announcement.pdf" },
    { label: "Reckitt — FY2025 results transcript PDF", url: "https://www.reckitt.com/media/0dqolpz3/transcript-reckitt-full-year-results-2025.pdf" },
    { label: "Microsoft Customer Story — Reckitt Azure OpenAI 60% marketing efficiency", url: "https://www.microsoft.com/en/customers/story/23761-reckitt-power-bi" },
    { label: "PYMNTS — Reckitt moves beyond AI pilots to daily enterprise use", url: "https://www.pymnts.com/artificial-intelligence-2/2026/reckitt-moves-beyond-ai-pilots-to-daily-enterprise-use/" },
    { label: "EPAM via The Drum — Reckitt agentic AI rollout (\"not a pilot\")", url: "https://www.thedrum.com/news/2025/08/01/not-pilot-lessons-reckitt-s-global-rollout-agentic-ai" },
    { label: "BCG — Reckitt GenAI transformation", url: "https://www.bcg.com/x/mark-your-moment/global-consumer-goods-leader-finds-efficiency-gains-with-genai-platform" },
    { label: "McKinsey — Reckitt's bold AI ambition for RGM", url: "https://www.mckinsey.com/industries/consumer-packaged-goods/how-we-help-clients/reckitts-bold-ambition-harnessing-ai-to-redefine-revenue-growth-management" },
    { label: "IBM — Reckitt Group case studies", url: "https://www.ibm.com/case-studies/reckitt-group" },
  ],
  askPrompts: ["What did Reckitt report for FY2025?", "What is Reckitt's flagship Microsoft Azure OpenAI customer story?", "How does Reckitt's agentic AI rollout work?", "Who is Yusuf Khan and what does the CDO seat cover?"],
};

// =============================================================================
// Richemont — FY25 (ends Mar); €21.39B (+4%); jewellery flagship
// =============================================================================
export const richemont_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY25 (52w to 31 Mar 2025)", date: "2025-05-16" }, lastReported: { label: "H1 FY26 (6m to 30 Sep 2025)", date: "2025-11-07" }, next: { label: "FY26 results", date: "May 2026" }, blurb: "Fiscal year ends March. FY25 published 16 May 2025. H1 FY26 published 7 Nov 2025." },
  investor: {
    fiscalYearLabel: "FY25 baseline · H1 FY26 reported",
    headline: { revenue: { value: "€21.39B", reported: "+4.0%", organic: "+4.0% c/c", note: "FY25; jewellery +8% to €15.3B; Specialist Watchmakers -13%" }, opMargin: { value: "Op profit €4.5B", growth: { absolute: "-€340M", pct: "-7% reported / -4% c/c", basis: "Op profit FY25 vs FY24" }, note: "Net cash €8.3B" }, employees: { value: "40K" } },
    operatingComplexity: { hq: { value: "Switzerland 🇨🇭" }, countries: { value: "100+" }, brands: { value: "25+", note: "Cartier, Van Cleef & Arpels, Buccellati, Vhernier, IWC, Jaeger-LeCoultre, Vacheron Constantin, A. Lange & Söhne, Panerai, Piaget, Roger Dubuis, Montblanc, Alaïa, Chloé, Dunhill, Net-a-Porter (divested)" }, stores: { value: "2,400+" } },
    whyMatters: "Luxury jewellery + watches conglomerate. AI levers: Cartier digital platform, AI-augmented clientelling, anti-counterfeit, supply chain. Conservative posture by design (similar to Hermès) but jewellery scale enables AI investment.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 2.5", rhetoric: 2, production: 3, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Jewellery scale, conservative AI.", body: "76% direct-to-client (DTC) sales mix is the AI-leverage point. Cartier + Van Cleef & Arpels combined €14B+ in FY24 — that scale enables AI investment. Posture is conservative; AI rarely fronts investor narrative." } },
  leadership: { presenter: { html: "<strong>Nicolas Bos</strong> · CEO. <strong>Cyrille Vigneron</strong> · former Cartier CEO (recently transitioned). Tech function reports through CFO + Group ops; AI leadership is Maison-led not Group-led.", source: { label: "Klover.AI — Richemont AI Strategy in luxury", url: "https://www.klover.ai/richemont-ai-strategy-analysis-of-dominance-in-luxury/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Cartier digital platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Direct-to-client digital experience for Cartier; AI-augmented clientelling at scale.", source: { label: "Klover.AI — Richemont AI Strategy", url: "https://www.klover.ai/richemont-ai-strategy-analysis-of-dominance-in-luxury/" } },
      { html: "<strong>Buccellati / Van Cleef &amp; Arpels digital</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Maison-level digital and AI strategy.", source: { label: "Richemont — Annual Report FY25 PDF", url: "https://www.richemont.com/media/ue1bjrjv/richemont-fy25-annual-report-en.pdf" } },
    ] },
    consumerFacing: "<strong>Indirect.</strong> Maison-mediated AI clientelling. No flagship consumer GenAI app.",
    genAI: { mentioned: false, note: "No public GenAI / hyperscaler partnership. Conservative posture similar to Hermès." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led Maison tech", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI partnership. No further vendor relationships disclosed.",
  },
  byMaison: {
    maisons: [
      { brand: "Cartier", description: "Jewellery flagship. Strongest AI-augmented clientelling at Group scale. Combined with Van Cleef & Arpels >€14B in FY24." },
      { brand: "Van Cleef & Arpels", description: "Heritage jewellery. AI clientelling alongside Cartier." },
      { brand: "Buccellati / Vhernier", description: "Italian jewellery acquisitions. Maison-level digital strategy." },
      { brand: "IWC / Jaeger-LeCoultre / Vacheron Constantin / A. Lange & Söhne / Panerai / Piaget", description: "Specialist Watchmakers segment (-13% in FY25). No disclosed AI initiatives in this segment." },
      { brand: "Montblanc", description: "Writing instruments + leather. Group infrastructure." },
      { brand: "Alaïa / Chloé / Dunhill", description: "Fashion + Maisons portfolio." },
    ],
    note: "Cartier and Van Cleef carry the disclosed AI activity. The Specialist Watchmakers segment declined 13% in FY25 and discloses none.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY25: revenue €21.39B (+4% reported & c/c), op profit €4.5B (-7% reported / -4% c/c). Jewellery +8% to €15.3B; Specialist Watchmakers -13%. Net cash €8.3B. 76% DTC sales mix." },
    { lead: "AI posture.", body: "Silent Builder 2.5 (estimated). Conservative posture by design. No public GenAI / hyperscaler partnership. Cartier + Van Cleef AI clientelling is the implied artefact but undocumented publicly." },
    { lead: "Vendor footprint.", body: "No hyperscaler relationship disclosed. Public framing centres Maison stewardship; no GenAI initiative is named for authentication, heritage, or e-commerce." },
  ],
  sources: [
    { label: "Richemont — Annual Report FY25 PDF", url: "https://www.richemont.com/media/ue1bjrjv/richemont-fy25-annual-report-en.pdf" },
    { label: "Richemont — H1 FY26 results press release", url: "https://www.richemont.com/news-media/press-releases-news/richemont-delivers-solid-results-for-the-six-month-period-ended-30-september-2025-with-strong-sales-momentum-in-q2/" },
    { label: "Richemont — FY25 robust performance press release", url: "https://www.richemont.com/news-media/press-releases-news/richemont-posts-robust-performance-for-the-year-ended-31-march-2025/" },
    { label: "Retail Insight — Cartier owner Richemont 4% sales growth FY25", url: "https://www.retail-insight-network.com/news/cartier-richemont-fy25-result/" },
    { label: "Klover.AI — Richemont AI Strategy in luxury", url: "https://www.klover.ai/richemont-ai-strategy-analysis-of-dominance-in-luxury/" },
    { label: "Richemont — 2025 Interim Report", url: "https://www.richemont.com/news-media/press-releases-news/richemonts-2025-interim-report-now-available-online/" },
    { label: "eMarketer — Richemont 2025 luxury jewelry surge", url: "https://www.emarketer.com/content/richemont-ended-2025-on-high-amid-surging-interest-luxury-jewelry" },
  ],
  askPrompts: ["What did Richemont report for FY25?", "How does Cartier use AI for clientelling?", "Why is Specialist Watchmakers down 13%?", "Does Richemont have any hyperscaler partnerships?"],
};

// =============================================================================
// Sainsbury's — FY2025; Microsoft 5-year AI partnership + Google Cloud + Blue Yonder
// =============================================================================
export const sainsburys_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2024/25 (52w to 1 Mar 2025)", date: "2025-04-16" }, lastReported: { label: "H1 FY2025/26 (28w to 13 Sep 2025)", date: "2025-11-06" }, next: { label: "FY2025/26 results", date: "April 2026" }, blurb: "Fiscal year ends March. FY24/25 published Apr 2025. H1 FY25/26 published 6 Nov 2025." },
  investor: {
    fiscalYearLabel: "FY24/25 baseline · H1 FY25/26 reported",
    headline: { revenue: { value: "£32.81B", reported: "+1.8%", note: "FY24/25; £32.23B FY23/24" }, opMargin: { value: "Retail UOP £1,036M", growth: { absolute: "+£70M", pct: "+7.2%", basis: "Retail underlying op profit FY24/25 vs FY23/24; FY25/26 H1 -1.1% to £1,025M on cost absorption" }, note: "Net profit £242M (+76.6%)" }, employees: { value: "150K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "1" }, brands: { value: "5+", note: "Sainsbury's, Argos, Habitat, Tu Clothing, Nectar, Smartshop" }, stores: { value: "1,400+" } },
    whyMatters: "UK grocery + general merchandise. AI levers: Microsoft 5-year strategic AI partnership (May 2024), Google Cloud + Accenture ML for trend prediction, Blue Yonder forecasting, Argos digitalisation. Multi-vendor AI footprint.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.0", rhetoric: 4, production: 4, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Multi-cloud AI: Microsoft + Google + Blue Yonder.", body: "Sainsbury's signed a 5-year strategic Microsoft AI partnership (May 2024) covering AI/ML for customer + colleague experiences on Azure. Plus Google Cloud + Accenture ML for trend prediction; Argos on Google Maps Platform; Blue Yonder forecasting replacing 30-year-old legacy. Multi-cloud is the strategy." } },
  leadership: { presenter: { html: "<strong>Simon Roberts</strong> · CEO. <strong>Clo Moriarty</strong> · Chief Operating Officer (oversees digital). <strong>Patrick Dunne</strong> · Group CIO (drives AI partnerships).", source: { label: "Sainsbury's — Microsoft 5-year strategic partnership", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Microsoft Azure + AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — 5-year strategic partnership for customer + colleague AI experiences. \"Next Level Sainsbury's\" strategy enabler.", source: { label: "Sainsbury's — Microsoft strategic partnership announcement", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" } },
      { html: "<strong>Google Cloud + Accenture ML</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud + Accenture</span> — Predictive analytics + machine learning for trend prediction + inventory adjustment.", source: { label: "Tech Monitor — Sainsbury's Google Cloud", url: "https://www.techmonitor.ai/technology/data/sainsburys-google-cloud" } },
      { html: "<strong>Argos on Google Maps Platform</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google</span> — Replaced legacy mapping. Argos transitioning to fully digital + restructured distribution.", source: { label: "Google Cloud — Argos case study", url: "https://cloud.google.com/customers/argos" } },
      { html: "<strong>Blue Yonder AI forecasting</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Blue Yonder</span> — Replacing 30-year-old legacy forecasting capabilities with cloud-based ML.", source: { label: "Decision Marketing — Sainsbury's ditches legacy for AI cloud", url: "https://www.decisionmarketing.co.uk/news/sainsburys-ditches-legacy-systems-for-ai-cloud-drive" } },
    ] },
    consumerFacing: "<strong>Yes.</strong> Microsoft AI work flows through Sainsbury's app + Smartshop + Nectar personalisation.",
    genAI: { mentioned: true, vendors: [{ name: "Microsoft Azure", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" }, { name: "Google Cloud" }], note: "Microsoft + Google dual-cloud is unusual in UK grocery." },
    stackTable: [
      { layer: "Cloud + AI", product: "Microsoft Azure", use: "5-year strategic AI partnership: customer + colleague experience", source: { label: "Sainsbury's — Microsoft partnership", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" } },
      { layer: "Cloud + ML", product: "Google Cloud + Accenture", use: "Trend prediction + inventory ML", source: { label: "Tech Monitor — Sainsbury's Google Cloud", url: "https://www.techmonitor.ai/technology/data/sainsburys-google-cloud" } },
      { layer: "Mapping", product: "Google Maps Platform (Argos)", use: "Argos store + distribution mapping", source: { label: "Google Cloud — Argos case study", url: "https://cloud.google.com/customers/argos" } },
      { layer: "Forecasting AI", product: "Blue Yonder", use: "Cloud-based ML forecasting replacing legacy", source: { label: "Decision Marketing — Sainsbury's Blue Yonder", url: "https://www.decisionmarketing.co.uk/news/sainsburys-ditches-legacy-systems-for-ai-cloud-drive" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Microsoft — 5-year strategic AI partnership", status: "confirmed", caseStudy: { label: "Sainsbury's — Microsoft 5-year strategic AI partnership", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" }, note: "5-year (2024-2029) partnership for customer + colleague AI experiences on Azure." },
      { name: "Google Cloud — ML for trend prediction (with Accenture)", status: "confirmed", caseStudy: { label: "Tech Monitor — Sainsbury's Google Cloud", url: "https://www.techmonitor.ai/technology/data/sainsburys-google-cloud" }, note: "Predictive analytics + machine learning. Argos on Google Maps Platform." },
      { name: "Blue Yonder (forecasting AI)", status: "confirmed" },
      { name: "Accenture (ML build partner)", status: "confirmed" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Multi-cloud (Microsoft + Google) is unusual in UK grocery. Anthropic / OpenAI-direct / Mistral / AWS not disclosed. Blue Yonder + Accenture round out the build-partner ecosystem.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY24/25: revenue £32.81B (+1.8%), retail UOP £1,036M (+7.2%), net profit £242M (+76.6%). H1 FY25/26: UOP -1.1% to £1,025M on cost absorption (5% colleague pay rise + tech investment)." },
    { lead: "AI posture.", body: "Performer 4.0. Microsoft 5-year strategic AI partnership (May 2024) is the marquee. Plus Google Cloud + Accenture for ML, Blue Yonder for forecasting, Argos on Google Maps. Multi-cloud strategy." },
    { lead: "Vendor footprint.", body: "Microsoft + Google dual house. Anthropic / OpenAI-direct / Mistral / AWS not disclosed. UK grocery context puts Sainsbury's right between Tesco's Mistral house and Microsoft (M&S)-style commitment — multi-cloud middle ground." },
  ],
  sources: [
    { label: "Sainsbury's — Annual Report 2025", url: "https://corporate.sainsburys.co.uk/investors/annual-report-2025/" },
    { label: "Sainsbury's — H1 FY2025/26 interim results PDF", url: "https://corporate.sainsburys.co.uk/media/hz2b05ds/j-sainsbury-plc-interim-results-2526-statement.pdf" },
    { label: "Sainsbury's — Microsoft 5-year strategic AI partnership", url: "https://www.about.sainsburys.co.uk/news/latest-news/2024/17-05-2024-sainsburys-microsoft-power-up-customer-colleague-experience-with-ai" },
    { label: "TechInformed — Sainsbury's checks out Microsoft AI tools", url: "https://techinformed.com/sainsburys-checks-out-microsofts-ai-tools-in-five-year-partnership/" },
    { label: "Tech Monitor — Sainsbury's Google Cloud customer data", url: "https://www.techmonitor.ai/technology/data/sainsburys-google-cloud" },
    { label: "Diginomica — Sainsbury's and Google unexpected cloud partnership", url: "https://diginomica.com/sainsburys-and-google-unexpected-cloud-platform-bagging-area" },
    { label: "Google Cloud Customers — Argos case study", url: "https://cloud.google.com/customers/argos" },
    { label: "Decision Marketing — Sainsbury's ditches legacy for AI cloud", url: "https://www.decisionmarketing.co.uk/news/sainsburys-ditches-legacy-systems-for-ai-cloud-drive" },
  ],
  askPrompts: ["What did Sainsbury's report for FY24/25?", "What's in the 5-year Microsoft + Sainsbury's AI partnership?", "How does Argos use Google Maps Platform?", "Who runs AI at Sainsbury's?"],
};

// =============================================================================
// Sodexo — FY2025; €24.1B (+3.3% organic); kitchen + staffing AI
// =============================================================================
export const sodexo_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025 (52w to 31 Aug 2025)", date: "2025-10-23" }, lastReported: { label: "FY2025 results", date: "2025-10-23" }, next: { label: "Q1 FY2026 trading update", date: "January 2026" }, blurb: "Fiscal year ends August. FY2025 published 23 Oct 2025 (€24.1B revenue, organic +3.3%, op margin 4.7%). FY2026 transition year guide." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€24.1B", reported: "Stable", organic: "+3.3%", note: "FY2025; FY2026 organic +1.5-2.5% guide" }, opMargin: { value: "4.7%", growth: { absolute: "-€66M", pct: "Op profit €985M (vs €1,051M)", basis: "Op profit FY2025 vs FY2024; underlying net profit €785M (+3.7% c/c)" }, note: "Transition year FY2026" }, employees: { value: "423K" } },
    operatingComplexity: { hq: { value: "France 🇫🇷" }, countries: { value: "45" }, brands: { value: "1+", note: "Sodexo (master), Sodexo Live!, Sodexo Magic (loyalty)" } },
    whyMatters: "Largest food services + facilities management. AI levers: kitchen workflows, staffing optimisation, procurement, cloud-anchored core operations. Most-employees-on-watchlist (423K) makes AI productivity material.",
  },
  aiPerception: { quadrant: "silent", label: "Silent Builder · 2.5", rhetoric: 2, production: 3, evidence: "estimated", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Cloud + AI for kitchen and staffing.", body: "Sodexo says AI is being embedded as a critical component of business processes — kitchen workflows, staffing, procurement. Cloud migration ongoing. No publicly named hyperscaler partner — the disclosed AI is operational, not flagship." } },
  leadership: { presenter: { html: "<strong>Sébastien de Tramasure</strong> · CEO. <strong>Sophie Bellon</strong> · Chair. Tech function reports through CFO + Group COO; less public-facing than peers' CIO seats.", source: { label: "Sodexo — Fiscal 2025 results press release", url: "https://www.sodexo.com/news/newsroom/2025/fiscal-2025-results" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Kitchen workflow AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI integrated into kitchen workflows for productivity + cost reduction.", source: { label: "Sodexo — Fiscal 2025 results", url: "https://www.sodexo.com/news/newsroom/2025/fiscal-2025-results" } },
      { html: "<strong>Staffing AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI for shift / labour optimisation across 423K-employee workforce.", source: { label: "Sodexo — Fiscal 2025 results", url: "https://www.sodexo.com/news/newsroom/2025/fiscal-2025-results" } },
      { html: "<strong>Procurement AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI for procurement / supply-chain efficiency.", source: { label: "Sodexo — Fiscal 2025 results", url: "https://www.sodexo.com/news/newsroom/2025/fiscal-2025-results" } },
    ] },
    consumerFacing: "<strong>No flagship AI surface.</strong> AI is in back-of-house ops.",
    genAI: { mentioned: false, note: "Cloud + AI mentioned as core-ops embedding; no publicly named GenAI vendor." },
  },
  vendorStack: {
    namedPartners: [
      { name: "Internal-led + cloud transition", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "No public hyperscaler / GenAI partnership disclosed. No further vendor relationships disclosed. Compass Group + Aramark are the foodservice peer comparators; whoever lands Sodexo's GenAI footprint sets the foodservice standard.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: revenue €24.1B, organic +3.3%, op profit €985M (-€66M), op margin 4.7%, underlying net profit €785M (+3.7% c/c). FY2026 transition year guide: organic +1.5-2.5%." },
    { lead: "AI posture.", body: "Silent Builder 2.5 (estimated). AI embedded in kitchen / staffing / procurement workflows; cloud transition ongoing. No publicly named hyperscaler partner." },
    { lead: "Vendor footprint.", body: "No further vendor relationships disclosed. Foodservice peer Compass Group is similarly under-vendored. First hyperscaler to land at Sodexo (or Compass) sets the foodservice GenAI standard." },
  ],
  sources: [
    { label: "Sodexo — Fiscal 2025 results press release", url: "https://www.sodexo.com/news/newsroom/2025/fiscal-2025-results" },
    { label: "Sodexo — Integrated Report Fiscal 2025", url: "https://www.sodexo.com/investors/financial-results-and-publications/integrated-report" },
    { label: "Sodexo — H1 Fiscal 2025 results", url: "https://www.sodexo.com/news/newsroom/2025/h1-2025-results" },
    { label: "Sodexo — Q3 Fiscal 2025 revenues", url: "https://www.sodexo.com/news/newsroom/2025/q3-fiscal-2025-revenues" },
    { label: "AInvest — Sodexo strategic turnaround FY2026", url: "https://www.ainvest.com/news/sodexo-strategic-turnaround-fy2026-growth-prospects-assessing-leadership-reorganization-catalysts-long-term-creation-2512/" },
    { label: "Facilities Dive — Compass, Aramark, Sodexo boost revenue + tech", url: "https://www.facilitiesdive.com/news/compass-group-aramark-sodexo-boost-revenue-tech-in-fy24/734292/" },
  ],
  askPrompts: ["What did Sodexo report for FY2025?", "How is Sodexo using AI in kitchens?", "What's Sodexo's hyperscaler footprint?", "Who runs technology at Sodexo?"],
};

// =============================================================================
// Tesco — FY2025/26 published; Mistral AI 3-year strategic partnership (rare)
// =============================================================================
export const tesco_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025/26 (52w to 28 Feb 2026)", date: "2026-04-09" }, lastReported: { label: "FY2025/26 full year results", date: "2026-04-09" }, next: { label: "Q1 FY2026/27 trading update", date: "June 2026" }, blurb: "Fiscal year ends Feb. FY2025/26 published 9 Apr 2026 (£66.6B sales +4.3% c/c, adj OP £3.15B +0.6%, market share 28.5% decade-high)." },
  investor: {
    fiscalYearLabel: "FY2025/26 baseline",
    headline: { revenue: { value: "£66.6B", reported: "+4.3% c/c", organic: "LFL +3.5%", note: "FY25/26; UK market share 28.5% (vs 27.3% in 2023) — decade high" }, opMargin: { value: "4.7%", growth: { absolute: "+£19M", pct: "+0.6% adj OP", basis: "Adj OP £3,152M FY25/26 vs FY24/25; UK & ROI £2,745M (+0.7%); EPS +6%" }, note: "FCF +12% to £1.96B, £750M buyback" }, employees: { value: "330K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧" }, countries: { value: "5", note: "UK + ROI + Czech Republic + Slovakia + Hungary" }, brands: { value: "5+", note: "Tesco, Tesco Express, Tesco Extra, Tesco Metro, Booker, One Stop, Clubcard" }, stores: { value: "4,500+" } },
    whyMatters: "UK's largest grocer (28.5% market share). AI levers: Mistral AI 3-year strategic partnership + joint AI lab (rare Mistral-direct watchlist relationship). Adobe for content. Clubcard AI gamification. £500M productivity savings FY26 partly AI-driven.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 4, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Mistral AI house — rare on the watchlist.", body: "Tesco signed a 3-year strategic partnership with Mistral AI (French frontier-model lab) including a joint AI lab — one of only a handful of public Mistral-direct enterprise customers. Plus Adobe for in-house content generation, Clubcard AI gamification (with Eagle Eye), AI demand forecasting. £500M productivity savings target FY26." } },
  leadership: { presenter: { html: "<strong>Ken Murphy</strong> · CEO. <strong>Imran Nawaz</strong> · CFO. <strong>Guus Dekkers</strong> · Chief Information Officer (carries technology + AI agenda).", source: { label: "Process Excellence Network — Tesco taps Mistral AI", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Mistral AI 3-year strategic partnership</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Mistral AI (joint AI lab)</span> — Joint AI lab for GenAI solutions across Tesco. One of few public Mistral-direct enterprise relationships.", source: { label: "Process Excellence Network — Tesco taps Mistral AI", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" } },
      { html: "<strong>Adobe content generation</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Adobe</span> — In-house creative team uses Adobe to generate commercially-safe content for campaigns, social, banner ads, video captions at speed.", source: { label: "Adobe Business — Tesco rewrites CX rulebook", url: "https://business.adobe.com/uk/blog/perspectives/tesco-rewrites-cx-rulebook" } },
      { html: "<strong>Clubcard AI gamification</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Eagle Eye</span> — 4.5M personalised Challenges + digital coupons monthly; Clubcard penetration >82% UK sales. AI-gamified loyalty.", source: { label: "Eagle Eye Newsroom — Tesco gamifies Clubcard with AI", url: "https://eagleeye.com/newsroom/tesco-leverages-ai-to-gamify-loyalty-program-challenges" } },
      { html: "<strong>AI demand forecasting + waste reduction</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — AI optimising inventory, on-shelf availability, food-waste reduction. Contributing to £500M FY26 productivity savings.", source: { label: "Infotech Lead — Tesco digital transformation 2026", url: "https://infotechlead.com/cio/tesco-digital-transformation-2026-ai-clubcard-data-1-5-bn-capex-drive-growth-and-500-mn-savings-95179" } },
    ] },
    quantifiedROI: { html: "<strong>Productivity:</strong> £500M savings target FY26 partly from AI. <strong>Clubcard:</strong> 4.5M personalised Challenges/month, 82%+ UK sales penetration. <strong>Market share:</strong> 28.5% (decade high).", source: { label: "Infotech Lead — Tesco digital transformation 2026", url: "https://infotechlead.com/cio/tesco-digital-transformation-2026-ai-clubcard-data-1-5-bn-capex-drive-growth-and-500-mn-savings-95179" } },
    consumerFacing: "<strong>Yes.</strong> Clubcard AI gamification + AI-personalised offers are direct-to-consumer.",
    genAI: { mentioned: true, vendors: [{ name: "Mistral AI", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" }, { name: "Adobe", url: "https://business.adobe.com/uk/blog/perspectives/tesco-rewrites-cx-rulebook" }, { name: "Eagle Eye" }], note: "Mistral-direct + Adobe + Eagle Eye is an unusually European-AI-forward stack." },
    stackTable: [
      { layer: "Foundation model", product: "Mistral AI (joint lab)", use: "GenAI solutions across customer experience + ops", source: { label: "Process Excellence Network — Tesco taps Mistral AI", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" } },
      { layer: "Creative GenAI", product: "Adobe", use: "Commercially-safe content generation at speed", source: { label: "Adobe — Tesco CX rulebook", url: "https://business.adobe.com/uk/blog/perspectives/tesco-rewrites-cx-rulebook" } },
      { layer: "Loyalty AI", product: "Eagle Eye (Clubcard)", use: "AI gamification of Clubcard Challenges", source: { label: "Eagle Eye — Tesco AI gamification", url: "https://eagleeye.com/newsroom/tesco-leverages-ai-to-gamify-loyalty-program-challenges" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Mistral AI — 3-year strategic partnership + joint AI lab", status: "confirmed", caseStudy: { label: "Process Excellence Network — Tesco taps Mistral AI", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" }, note: "Joint AI lab with Mistral. Rare Mistral-direct enterprise customer relationship — distinctive for European retail." },
      { name: "Adobe — content generation", status: "confirmed", caseStudy: { label: "Adobe — Tesco rewrites CX rulebook", url: "https://business.adobe.com/uk/blog/perspectives/tesco-rewrites-cx-rulebook" }, note: "Commercially-safe AI content generation for campaigns, social, banners." },
      { name: "Eagle Eye — Clubcard AI gamification", status: "confirmed", caseStudy: { label: "Eagle Eye — Tesco AI gamification", url: "https://eagleeye.com/newsroom/tesco-leverages-ai-to-gamify-loyalty-program-challenges" }, note: "Powers 4.5M monthly personalised Clubcard Challenges." },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Google Cloud", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Mistral-direct relationship is rare on the watchlist (only Tesco + Carrefour have direct OpenAI/Mistral hyperscaler ties). No Microsoft, Google, Anthropic, OpenAI, or AWS relationship is disclosed at Tesco.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY25/26: sales £66.6B (+4.3% c/c), LFL +3.5%, adj OP £3.15B (+0.6%), UK & ROI margin 4.7%. EPS +6%. FCF +12% to £1.96B. £750M buyback + 5.8% dividend growth. Market share 28.5% — decade high." },
    { lead: "AI posture.", body: "Performer 4.5. Mistral AI 3-year partnership + joint lab is the marquee — rare on watchlist. Adobe for content. Eagle Eye Clubcard AI. £500M FY26 productivity savings AI-driven." },
    { lead: "Vendor footprint.", body: "Mistral is the anchor relationship, one of the few direct European foundation-model commitments on the watchlist. No Microsoft, Google, Anthropic, OpenAI, or AWS relationship is disclosed." },
  ],
  sources: [
    { label: "Tesco — FY2025/26 full year results PDF (Investing.com)", url: "https://www.investing.com/news/company-news/tesco-fy-202526-slides-market-share-hits-decade-high-on-customer-focus-93CH-4617412" },
    { label: "Tesco — Reports, results and presentations hub", url: "https://www.tescoplc.com/investors/reports-results-and-presentations/results-and-presentations" },
    { label: "Tesco — Interim results trading statement 2025/26", url: "https://www.tescoplc.com/interim-results-trading-statement-202526/" },
    { label: "Process Excellence Network — Tesco taps Mistral AI 3-year deal", url: "https://www.processexcellencenetwork.com/ai/news/tesco-taps-mistral-ai-to-enhance-operations-customer-experience" },
    { label: "AI News — Tesco signs 3-year AI deal centred on customer experience", url: "https://www.artificialintelligence-news.com/news/tesco-signs-three-year-ai-deal-centred-on-customer-experience/" },
    { label: "Gend.co — Tesco x Mistral AI partnership analysis", url: "https://www.gend.co/blog/tesco-signs-three-year-agreement-with-mistral-ai-what-it-means-for-retail-loyalty-and-ops" },
    { label: "Adobe Business — Tesco rewrites CX rulebook", url: "https://business.adobe.com/uk/blog/perspectives/tesco-rewrites-cx-rulebook" },
    { label: "Eagle Eye — Tesco gamifies Clubcard with AI", url: "https://eagleeye.com/newsroom/tesco-leverages-ai-to-gamify-loyalty-program-challenges" },
    { label: "Infotech Lead — Tesco digital transformation 2026", url: "https://infotechlead.com/cio/tesco-digital-transformation-2026-ai-clubcard-data-1-5-bn-capex-drive-growth-and-500-mn-savings-95179" },
    { label: "Grocer — Tesco exploring AI to nudge Clubcard customers", url: "https://www.thegrocer.co.uk/news/tesco-exploring-how-ai-could-nudge-clubcard-customers/695600.article" },
  ],
  askPrompts: ["What did Tesco report for FY25/26?", "What's in the Tesco x Mistral AI partnership?", "How does the Clubcard AI gamification work?", "Who is Guus Dekkers and what does the Tesco CIO seat cover?"],
};

// =============================================================================
// Unilever — FY2025; multi-vendor AI mega-account (Google + NVIDIA + Microsoft + Accenture)
// =============================================================================
export const unilever_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-02-12" }, lastReported: { label: "Q1 2026 trading statement", date: "2026-04-30" }, next: { label: "H1 2026 results", date: "Late July 2026" }, blurb: "FY2025 published 12 Feb 2026. Q1 2026 trading statement published 30 Apr 2026 (USG +3.8%, vol +2.9%, price +0.9%; turnover €12.6B -3.3% on FX -7.7%). FY26 USG at bottom end of 4-6% range." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€50.5B", reported: "-3.8%", organic: "+3.5% USG", note: "+2.3% c/c; significant currency headwinds" }, opMargin: { value: "Op profit €9.0B", growth: { absolute: "+€210M", pct: "+2.4% reported", basis: "Op profit FY2025 vs FY2024; underlying op profit €10.1B" }, note: "FCF €5.9B / 100% conversion" }, employees: { value: "127K" } },
    operatingComplexity: { hq: { value: "United Kingdom 🇬🇧 / Netherlands 🇳🇱" }, countries: { value: "190+" }, brands: { value: "400+", note: "Dove, Knorr, Hellmann's, Magnum, Ben & Jerry's, Persil, Domestos, Vaseline, Sunsilk, Lipton, Lifebuoy, Lux, Pond's, Rexona" } },
    whyMatters: "World's #2 CPG. AI levers: Google Cloud 5-year (Vertex AI) brand discovery; NVIDIA Omniverse digital twins; Microsoft Azure DelphiAI; Beauty AI Studio with Brandtech (18 markets, 400 assets/product); Accenture industry-standard GenAI productivity. Unilever fits-for-AI-Age as core strategy.",
    quarterlyUpdate: {
      label: "Q1 2026 trading statement",
      date: "30 April 2026",
      blurb: "Volume-led acceleration. USG +3.8% (volume +2.9%, price +0.9%); turnover €12.6B (-3.3% reported on -7.7% FX). Power Brands USG +5.0% (volume +4.0%). FY26 USG at bottom end of 4-6% range; underlying margin modest improvement vs 20.0%.",
      metrics: [
        { label: "Underlying Sales Growth", value: "+3.8%", trend: "Volume +2.9%, price +0.9%" },
        { label: "Power Brands USG", value: "+5.0%", trend: "Volume +4.0%" },
        { label: "Turnover", value: "€12.6B", trend: "-3.3% reported, -7.7% FX" },
        { label: "Productivity savings", value: "€750M", trend: "vs €800M FY26 target" },
        { label: "FY26 USG guide", value: "4-6% (bottom end)", trend: "≥2% volume" },
        { label: "Margin guide", value: "Modest +", trend: "vs 20.0% FY25" },
      ],
      reading: "Volume turn is the bullish read — accelerated to +2.9% in Q1, with Power Brands at +4.0%. Beauty AI Studio + NVIDIA digital twins + Google Vertex AI continue scaling. Productivity programme now 94% of target.",
      source: { label: "Unilever — Q1 2026 trading statement", url: "https://www.unilever.com/files/unilever-q1-2026-full-announcement.pdf" },
    },
  },
  aiPerception: { quadrant: "performer", label: "Performer · 5.0", rhetoric: 5, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "Multi-vendor AI mega-account.", body: "Unilever's AI footprint is the broadest on the watchlist: Google Cloud 5-year (Vertex AI for brand discovery, measurement, marketing); NVIDIA Omniverse + OpenUSD for digital twins; Microsoft Azure DelphiAI for analytics across data sources; Brandtech-built Beauty AI Studio in 18 markets (55% savings, 65% faster turnaround on content); Accenture industry-standard GenAI partnership. Unilever has explicitly named 'fit for the AI age' as one of three strategic shifts." } },
  leadership: { presenter: { html: "<strong>Fernando Fernandez</strong> · CEO. <strong>Esi Eggleston Bracey</strong> · President Beauty &amp; Wellbeing (drives Beauty AI Studio). <strong>Reginaldo Ecclissato</strong> · Chief Business Operations &amp; Supply Chain Officer.", source: { label: "Unilever — FY2025 press release / Fit for AI Age", url: "https://www.unilever.com/news/press-and-media/press-releases/2026/sharper-focus-and-disciplined-execution-driving-competitive-performance/" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>Google Cloud Vertex AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google Cloud (5-year deal)</span> — Brand discovery, measurement, marketing capabilities. Migrating integrated data + cloud to Google.", source: { label: "Marketing Dive — Unilever changes brand discovery with Google Cloud AI", url: "https://www.marketingdive.com/news/unilever-changes-brand-discovery-calculus-google-cloud-ai-pact/812300/" } },
      { html: "<strong>NVIDIA Omniverse + OpenUSD digital twins</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· NVIDIA</span> — 3D replicas of every pack with accurate measurements, shades, shapes. Faster product shoots.", source: { label: "Unilever — Reinvents product shoots with AI", url: "https://www.unilever.com/news/news-search/2025/unilever-reinvents-product-shoots-with-ai-for-faster-content-creation/" } },
      { html: "<strong>Beauty AI Studio</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· The Brandtech Group</span> — In-house GenAI system in 18 markets. 400 creative assets per product (vs 20 previously). 55% cost savings, 65% faster turnaround. 3x attention.", source: { label: "Digiday — Unilever's AI beauty marketing assembly line", url: "https://digiday.com/marketing/inside-unilevers-ai-beauty-marketing-assembly-line-and-its-implications-for-agencies/" } },
      { html: "<strong>DelphiAI on Microsoft Azure</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Microsoft</span> — Technical framework for analytics across data sources; helps R&amp;D + marketing identify product superiority + accelerate time-to-market.", source: { label: "PA Consulting — Unilever DelphiAI", url: "https://www.paconsulting.com/client-story/unilever-using-ai-to-empower-people-to-supercharge-innovation-and-drive-growth" } },
      { html: "<strong>Accenture industry-standard GenAI partnership</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Accenture</span> — Joint announcement to establish new industry standard in GenAI-powered productivity.", source: { label: "Accenture — Unilever industry standard GenAI productivity", url: "https://newsroom.accenture.com/news/2024/unilever-and-accenture-join-forces-to-establish-a-new-industry-standard-in-generative-ai-powered-productivity" } },
    ] },
    quantifiedROI: { html: "<strong>Beauty AI Studio:</strong> 400 assets per product (vs 20 previously, 20x lift). 55% cost savings. 65% faster turnaround. 3x consumer attention vs prior assets.", source: { label: "Digiday — Unilever Beauty AI Studio", url: "https://digiday.com/marketing/inside-unilevers-ai-beauty-marketing-assembly-line-and-its-implications-for-agencies/" } },
    consumerFacing: "<strong>Yes (creative).</strong> Beauty AI Studio assets land in paid social + programmatic + e-commerce. Higher engagement. NVIDIA digital twins surface in product imagery.",
    genAI: { mentioned: true, vendors: [{ name: "Google Cloud (Vertex AI)", url: "https://www.marketingdive.com/news/unilever-changes-brand-discovery-calculus-google-cloud-ai-pact/812300/" }, { name: "NVIDIA Omniverse", url: "https://www.unilever.com/news/news-search/2025/unilever-reinvents-product-shoots-with-ai-for-faster-content-creation/" }, { name: "Microsoft Azure (DelphiAI)" }, { name: "The Brandtech Group" }, { name: "Accenture", url: "https://newsroom.accenture.com/news/2024/unilever-and-accenture-join-forces-to-establish-a-new-industry-standard-in-generative-ai-powered-productivity" }], note: "Five named GenAI partners — broadest on watchlist." },
    stackTable: [
      { layer: "Foundation model + brand discovery", product: "Google Cloud Vertex AI (5-yr)", use: "Brand discovery + measurement + marketing", source: { label: "Marketing Dive — Unilever Google Cloud AI", url: "https://www.marketingdive.com/news/unilever-changes-brand-discovery-calculus-google-cloud-ai-pact/812300/" } },
      { layer: "3D / digital twins", product: "NVIDIA Omniverse + OpenUSD", use: "Product-pack 3D replicas for content reuse", source: { label: "Unilever — AI product shoots", url: "https://www.unilever.com/news/news-search/2025/unilever-reinvents-product-shoots-with-ai-for-faster-content-creation/" } },
      { layer: "GenAI marketing", product: "Beauty AI Studio (Brandtech)", use: "400 assets/product across 18 markets, 55% savings", source: { label: "Digiday — Unilever Beauty AI Studio", url: "https://digiday.com/marketing/inside-unilevers-ai-beauty-marketing-assembly-line-and-its-implications-for-agencies/" } },
      { layer: "Analytics + R&D", product: "DelphiAI on Microsoft Azure", use: "Cross-data analytics for product superiority", source: { label: "PA Consulting — Unilever DelphiAI", url: "https://www.paconsulting.com/client-story/unilever-using-ai-to-empower-people-to-supercharge-innovation-and-drive-growth" } },
      { layer: "Strategic GenAI", product: "Accenture industry-standard partnership", use: "Set industry standard in GenAI productivity", source: { label: "Accenture — Unilever industry standard GenAI", url: "https://newsroom.accenture.com/news/2024/unilever-and-accenture-join-forces-to-establish-a-new-industry-standard-in-generative-ai-powered-productivity" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Google Cloud — 5-year Vertex AI partnership", status: "confirmed", caseStudy: { label: "Marketing Dive — Unilever Google Cloud AI pact", url: "https://www.marketingdive.com/news/unilever-changes-brand-discovery-calculus-google-cloud-ai-pact/812300/" }, note: "5-year deal for Vertex AI brand discovery, measurement, marketing. Migrates integrated data + cloud to Google." },
      { name: "NVIDIA — Omniverse + OpenUSD digital twins", status: "confirmed", caseStudy: { label: "Unilever — AI product shoots with NVIDIA Omniverse", url: "https://www.unilever.com/news/news-search/2025/unilever-reinvents-product-shoots-with-ai-for-faster-content-creation/" }, note: "3D replicas of every pack — accurate measurements, shades, shapes. Faster content production." },
      { name: "Microsoft — Azure DelphiAI", status: "confirmed", caseStudy: { label: "PA Consulting — Unilever DelphiAI on Azure", url: "https://www.paconsulting.com/client-story/unilever-using-ai-to-empower-people-to-supercharge-innovation-and-drive-growth" }, note: "Analytics framework across data sources for R&D + marketing." },
      { name: "Accenture — industry-standard GenAI productivity", status: "confirmed", caseStudy: { label: "Accenture — Unilever industry-standard GenAI productivity", url: "https://newsroom.accenture.com/news/2024/unilever-and-accenture-join-forces-to-establish-a-new-industry-standard-in-generative-ai-powered-productivity" }, note: "Joint announcement to set industry standard in GenAI productivity." },
      { name: "The Brandtech Group — Beauty AI Studio", status: "confirmed", caseStudy: { label: "Digiday — Unilever Beauty AI Studio", url: "https://digiday.com/marketing/inside-unilevers-ai-beauty-marketing-assembly-line-and-its-implications-for-agencies/" }, note: "Build partner for Beauty AI Studio across 18 markets." },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Five named hyperscaler-class partners — most broadly-vendored CPG account on the watchlist. No Anthropic, OpenAI-direct, Mistral, or AWS relationship is disclosed alongside the five named partners.",
  },
  byMaison: {
    maisons: [
      { brand: "Dove + Sunsilk + Vaseline + Pond's", description: "Beauty & Wellbeing flagship. Beauty AI Studio production line — 18 markets, 400 assets/product." },
      { brand: "Magnum + Ben & Jerry's + Wall's", description: "Ice Cream segment. NVIDIA digital twins for product imagery." },
      { brand: "Knorr + Hellmann's + Lipton", description: "Foods + Refreshment. Multi-cloud analytics infrastructure." },
      { brand: "Persil + Domestos + Sunlight", description: "Home Care. Group AI for marketing + supply chain." },
      { brand: "Lifebuoy + Lux + Rexona + Axe", description: "Mass-market Beauty + Personal Care. Beauty AI Studio + DelphiAI cross-functional." },
    ],
    note: "Beauty AI Studio is brand-specific to B&W division but Group AI infrastructure flows down to all categories.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: turnover €50.5B (-3.8% reported, +2.3% c/c, USG +3.5%), op profit €9.0B (+2.4%), underlying €10.1B, FCF €5.9B (100% conversion). Currency drag offset by USG. \"Fit for AI Age\" is one of three strategic shifts." },
    { lead: "AI posture.", body: "Performer 5.0. Five named GenAI partners (Google Cloud + NVIDIA + Microsoft Azure + Accenture + Brandtech). Beauty AI Studio: 20x asset production lift, 55% cost cut. The most broadly-vendored CPG account on the watchlist." },
    { lead: "Vendor footprint.", body: "Multi-vendor by design. No Anthropic, OpenAI-direct, Mistral, or AWS relationship disclosed. Beauty & Wellbeing is the only division with a disclosed AI studio model; other categories disclose none." },
  ],
  sources: [
    { label: "Unilever — Q4 + FY2025 results PDF", url: "https://www.unilever.com/files/ir-q4-2025-full-announcement.pdf" },
    { label: "Unilever — Annual Report 2025 PDF", url: "https://www.unilever.com/files/unilever-annual-report-and-accounts-2025.pdf" },
    { label: "Unilever — FY2025 press release \"Fit for AI Age\"", url: "https://www.unilever.com/news/press-and-media/press-releases/2026/sharper-focus-and-disciplined-execution-driving-competitive-performance/" },
    { label: "Marketing Dive — Unilever Google Cloud AI pact", url: "https://www.marketingdive.com/news/unilever-changes-brand-discovery-calculus-google-cloud-ai-pact/812300/" },
    { label: "Unilever — AI product shoots with NVIDIA Omniverse", url: "https://www.unilever.com/news/news-search/2025/unilever-reinvents-product-shoots-with-ai-for-faster-content-creation/" },
    { label: "Digiday — Unilever Beauty AI Studio assembly line", url: "https://digiday.com/marketing/inside-unilevers-ai-beauty-marketing-assembly-line-and-its-implications-for-agencies/" },
    { label: "Accenture — Unilever industry-standard GenAI productivity", url: "https://newsroom.accenture.com/news/2024/unilever-and-accenture-join-forces-to-establish-a-new-industry-standard-in-generative-ai-powered-productivity" },
    { label: "PA Consulting — Unilever DelphiAI client story", url: "https://www.paconsulting.com/client-story/unilever-using-ai-to-empower-people-to-supercharge-innovation-and-drive-growth" },
    { label: "Cosmetics Business — Unilever invests in GenAI for marketing", url: "https://cosmeticsbusiness.com/unilever-invests-in-generative-ai-to-level-up" },
  ],
  askPrompts: ["What did Unilever report for FY2025?", "What is the Beauty AI Studio?", "How does Unilever use NVIDIA Omniverse?", "What are Unilever's five major AI vendor partnerships?"],
};

// =============================================================================
// Zalando — FY2025; Google Universal Commerce Protocol launch partner
// =============================================================================
export const zalando_final: Partial<CompanyTemplateData> = {
  cadence: { baseline: { label: "FY2025", date: "2026-03-12" }, lastReported: { label: "FY2025 results", date: "2026-03-12" }, next: { label: "Q1 2026 results", date: "6 May 2026" }, blurb: "FY2025 published 12 Mar 2026 (Group GMV €17.6B +14.7%, revenue €12.3B +16.8%, adj EBIT €591M +15.6%). Q1 2026 due 6 May. ABOUT YOU integration ongoing." },
  investor: {
    fiscalYearLabel: "FY2025 baseline",
    headline: { revenue: { value: "€12.3B", reported: "+16.8%", organic: "GMV +14.7% to €17.6B", note: "ABOUT YOU integration boost" }, opMargin: { value: "Adj EBIT 4.8%", growth: { absolute: "+€80M", pct: "+15.6%", basis: "Adj EBIT FY2025 €591M vs FY2024; Zalando standalone margin expanded to 5.3%" }, note: "€300M share buyback announced" }, employees: { value: "16K" } },
    operatingComplexity: { hq: { value: "Germany 🇩🇪" }, countries: { value: "25" }, brands: { value: "2", note: "Zalando + ABOUT YOU (acquired 2025)" } },
    whyMatters: "Largest European fashion online platform. AI levers: AI content generation (90% of campaigns, scaled from ~0%), Size & Fit AI (1M+ customers, -8% returns), Discovery Feed personalisation, Google Universal Commerce Protocol launch partner.",
  },
  aiPerception: { quadrant: "performer", label: "Performer · 4.5", rhetoric: 5, production: 5, evidence: "confirmed", rubric: "v1", lastScored: "2026-05-01" },
  narrative: { framing: { headline: "AI-driven productivity is the growth story.", body: "Zalando scaled AI-generated content from ~0% to 90% in FY2025, cutting campaign creation from 6 weeks to days and lifting content output 70%. Size & Fit AI (1M+ customer body measurements) reduced size-related returns -8%. Plus Discovery Feed AI rolled out + ABOUT YOU integration. Google Universal Commerce Protocol — only 2 European launch partners (Zalando is one), enabling Gemini-AI direct shopping." } },
  leadership: { presenter: { html: "<strong>Robert Gentz</strong> + <strong>David Schneider</strong> · co-CEOs + co-founders. <strong>Sandra Dembeck</strong> · CFO. AI agenda spans Group; Zalando engineering + research community blog publicly on ML.", source: { label: "Zalando — FY2025 results announcement", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } } },
  production: {
    namedTools: { tools: [
      { html: "<strong>AI-generated content (90% of campaigns)</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal GenAI</span> — Scaled from ~0% to 90% in FY2025. Campaign creation 6 weeks → days. Content output +70%.", source: { label: "Zalando — FY2025 results", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } },
      { html: "<strong>Size &amp; Fit AI</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal ML</span> — Real body measurements from 1M+ customers; predicts correct clothing size. Reduced size-related returns -8%.", source: { label: "Ecommerce Germany — Zalando 2025 results", url: "https://ecommercegermany.com/blog/zalando-results-ai-growth-share-buyback/" } },
      { html: "<strong>AI-Powered Discovery Feed</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· internal</span> — Personalised inspiration feed scaled out across customer base in 2025.", source: { label: "Zalando — Q2 2025 results (Discovery Feed launch)", url: "https://corporate.zalando.com/en/financials/zalando-q2-2025-results" } },
      { html: "<strong>Google Universal Commerce Protocol launch partner</strong> <span style=\"font-size:10px;color:var(--text-dim);font-weight:400\">· Google (Gemini)</span> — One of only 2 European launch partners. Customers discover + purchase fashion directly through Gemini AI chatbot.", source: { label: "Zalando — FY2025 results announcement", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } },
    ] },
    quantifiedROI: { html: "<strong>AI content:</strong> 90% of campaigns AI-generated (vs ~0% prior); creation 6w→days; output +70%. <strong>Size & Fit AI:</strong> -8% size-related returns; 1M+ body measurements. <strong>FY2026 guide:</strong> +12-17% GMV, adj EBIT €660-740M.", source: { label: "Zalando — FY2025 results", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } },
    consumerFacing: "<strong>Yes, marquee.</strong> Discovery Feed + Size & Fit AI + Google Gemini commerce protocol all direct-to-consumer.",
    genAI: { mentioned: true, vendors: [{ name: "Google (Gemini)" }, { name: "Internal-led" }], note: "Google Universal Commerce Protocol partnership is the cleanest hyperscaler tie. Most AI is internally-built." },
    stackTable: [
      { layer: "Foundation model (consumer)", product: "Google Gemini (Universal Commerce Protocol)", use: "Direct fashion discovery + purchase via Gemini chatbot", source: { label: "Zalando — FY2025 results (Gemini partnership)", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } },
      { layer: "Content GenAI", product: "Internal AI content engine", use: "90% of campaigns auto-generated; 6w→days creation", source: { label: "Zalando — FY2025 results", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" } },
      { layer: "Recommendation ML", product: "Size & Fit AI", use: "1M+ body measurements; -8% size returns", source: { label: "Ecommerce Germany — Zalando AI growth", url: "https://ecommercegermany.com/blog/zalando-results-ai-growth-share-buyback/" } },
    ],
  },
  vendorStack: {
    namedPartners: [
      { name: "Google — Universal Commerce Protocol launch partner (Gemini)", status: "confirmed", caseStudy: { label: "Zalando — FY2025 Google Gemini partnership", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" }, note: "One of only 2 European launch partners. Customers discover + purchase via Gemini chatbot. Direct Google-AI commerce relationship." },
      { name: "Internal-led GenAI + ML", status: "confirmed" },
      { name: "Microsoft Azure", status: "absent" },
      { name: "Anthropic", status: "absent" },
      { name: "OpenAI (direct)", status: "absent" },
      { name: "Mistral", status: "absent" },
      { name: "AWS", status: "absent" },
    ],
    partnersNote: "Google-direct relationship via Universal Commerce Protocol is rare on watchlist. Microsoft / Anthropic / OpenAI / Mistral / AWS not disclosed. Zalando's internal AI depth is the moat.",
  },
  rachelNotes: [
    { lead: "Quick take.", body: "FY2025: GMV €17.6B (+14.7%), revenue €12.3B (+16.8%), adj EBIT €591M (+15.6%, margin 4.8% / standalone 5.3%). €300M buyback. ABOUT YOU integrated. FY2026 guide: GMV +12-17%, adj EBIT €660-740M." },
    { lead: "AI posture.", body: "Performer 4.5. AI content scaled 0% → 90% (6w→days creation). Size & Fit AI -8% returns (1M+ body measurements). Google Universal Commerce Protocol launch partner — one of 2 European." },
    { lead: "Vendor footprint.", body: "Google-direct via Gemini commerce protocol. Microsoft / Anthropic / OpenAI / Mistral / AWS not disclosed. Zalando's internal AI depth means new vendors need clear differentiation." },
  ],
  sources: [
    { label: "Zalando — FY2025 results announcement", url: "https://corporate.zalando.com/en/investor-relations/zalando-full-year-2025-results" },
    { label: "Zalando — Q2 2025 results (Discovery Feed launch)", url: "https://corporate.zalando.com/en/financials/zalando-q2-2025-results" },
    { label: "Ecommerce Germany — Zalando 2025 results + AI growth", url: "https://ecommercegermany.com/blog/zalando-results-ai-growth-share-buyback/" },
    { label: "WWD — Zalando Q4 2025 double-digit growth", url: "https://wwd.com/business-news/financial/https-wwd-com-business-news-financial-zalando-q4-2025-double-digit-growth-1238664441/" },
    { label: "Industry.fashion — Zalando double-digit growth + AI investment 2025", url: "https://www.theindustry.fashion/zalando-reports-double-digit-growth-in-2025-as-it-accelerates-investment-in-ai-innovation/" },
    { label: "RTÉ — Zalando 2026 profit AI productivity", url: "https://www.rte.ie/news/business/2026/0312/1562998-zalando-eyes-higher-2026-profit-as-ai-drives-productivty/" },
    { label: "EuropaWire — Zalando 2025 AI growth + ABOUT YOU integration", url: "https://news.europawire.eu/zalando-reports-strong-2025-growth-driven-by-ai-innovation-about-you-integration-and-expanding-fashion-platform/eu-press-release/2026/03/13/14/13/28/171568/" },
    { label: "Infotech Lead — Zalando AI tech innovation Q2 2025", url: "https://infotechlead.com/artificial-intelligence/zalando-leverages-ai-and-tech-innovation-to-drive-q2-2025-revenue-growth-90634" },
  ],
  askPrompts: ["What did Zalando report for FY2025?", "How did Zalando scale AI content from 0% to 90%?", "What is Google's Universal Commerce Protocol and Zalando's role?", "How does Zalando's Size & Fit AI reduce returns?"],
};

export const final: Record<string, Partial<CompanyTemplateData>> = {
  "adidas": adidas_final,
  "ab-inbev": ab_inbev_final,
  "ahold-delhaize": ahold_delhaize_final,
  "arla": arla_final,
  "asos": asos_final,
  "barilla": barilla_final,
  "beiersdorf": beiersdorf_final,
  "burberry": burberry_final,
  "campari": campari_final,
  "carlsberg": carlsberg_final,
  "carrefour": carrefour_final,
  "colruyt": colruyt_final,
  "danone": danone_final,
  "decathlon": decathlon_final,
  "diageo": diageo_final,
  "essity": essity_final,
  "estee-lauder": estee_lauder_final,
  "ferrero": ferrero_final,
  "fnac-darty": fnac_darty_final,
  "haleon": haleon_final,
  "heineken": heineken_final,
  "hellofresh": hellofresh_final,
  "henkel": henkel_final,
  "hermes": hermes_final,
  "hm": hm_final,
  "ikea": ikea_final,
  "inditex": inditex_final,
  "jeronimo-martins": jeronimo_martins_final,
  "kering": kering_final,
  "kingfisher": kingfisher_final,
  "lavazza": lavazza_final,
  "lego": lego_final,
  "loreal": loreal_final,
  "lotus-bakeries": lotus_bakeries_final,
  "mango": mango_final,
  "marks-spencer": marks_spencer_final,
  "nespresso": nespresso_final,
  "nestle": nestle_final,
  "ocado": ocado_final,
  "on-running": on_running_final,
  "pernod-ricard": pernod_ricard_final,
  "puig": puig_final,
  "reckitt": reckitt_final,
  "richemont": richemont_final,
  "sainsburys": sainsburys_final,
  "sodexo": sodexo_final,
  "tesco": tesco_final,
  "unilever": unilever_final,
  "zalando": zalando_final,
};
