import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { writeProfile, rebuildProfilesAll } from "@/lib/profiles/store";
import type { CompanyProfile as TCompanyProfile } from "@/lib/profiles/schema";

const EU = new Set(["FR", "DE", "NL", "BE", "SE", "IT", "DK", "PT", "ES"]);

function hq(country: string, city: string) {
  return { city, country, aiActApplies: EU.has(country) };
}

interface Row {
  slug: string;
  name: string;
  sector: TCompanyProfile["meta"]["sector"];
  country: string;
  city: string;
  quadrant: TCompanyProfile["aiPerception"]["score"]["quadrant"];
  rhetoric: number;
  production: number;
  composite: number;
  isAINative: boolean;
  rev: number;
  cur: string;
  growthPct: number | null;
  opPct: number | null;
  headcount: number;
  ms: "confirmed" | "estimated" | "none";
  gc: "confirmed" | "estimated" | "none";
  notes: string;
}

function build(r: Row): TCompanyProfile {
  const location = hq(r.country, r.city);
  const vendors: TCompanyProfile["aiPerception"]["vendorPartners"] = [];
  if (r.ms !== "none") vendors.push({ name: "Microsoft", evidenceTier: r.ms === "confirmed" ? "confirmed" : "estimated" });
  if (r.gc !== "none") vendors.push({ name: "Google Cloud", evidenceTier: r.gc === "confirmed" ? "confirmed" : "estimated" });
  return {
    slug: r.slug,
    recentSources: [],
    meta: { company: r.name, hq: location, sector: r.sector, isGroup: false, isAINative: r.isAINative },
    investorSnapshot: {
      revenue: { absolute: r.rev, currency: r.cur, yoyPublishedPct: r.growthPct, evidenceTier: "estimated" },
      operatingProfit: { absolute: 0, currency: r.cur, marginPct: r.opPct, evidenceTier: "estimated" },
      netCash: { absolute: 0, currency: r.cur, evidenceTier: "estimated" },
      employees: { headcount: r.headcount, evidenceTier: "estimated" },
      maisons: [],
      retailStores: { byType: [], evidenceTier: "estimated" },
      countries: { regions: ["EMEA"] },
      hq: location,
      languages: ["en"],
      reporting: { latestReportDate: "2025-12-31", nextTradingUpdate: null },
      revenueStreams: [],
    },
    aiPerception: {
      score: { rhetoric: r.rhetoric, production: r.production, composite: r.composite, quadrant: r.quadrant, rubricVersion: "1.0" },
      namedProductionTools: [],
      aiFraming: { value: "efficiency", evidenceTier: "estimated" },
      quantifiedROI: { stated: false, evidenceTier: "estimated" },
      consumerFacingAIProduct: { exists: false, evidenceTier: "estimated" },
      vendorPartners: vendors,
      aiAnalyticsStack: [],
      notes: r.notes,
      cSuiteAIPresenter: { exists: false, evidenceTier: "estimated" },
      sectorAppointments: [],
      genAIMentioned: { value: true, evidenceTier: "estimated" },
      dedicatedAISection: { value: false, evidenceTier: "estimated" },
      maisonHighlights: [],
    },
  };
}

const SEED: Row[] = [
  { slug:"ab-inbev", name:"AB InBev", sector:"CPG", country:"BE", city:"Leuven", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:57.5, cur:"$B", growthPct:2.7, opPct:28.3, headcount:150000, ms:"confirmed", gc:"estimated", notes:"World's largest brewer. Azure IoT for production. 150K employees across brewery and logistics." },
  { slug:"adidas", name:"Adidas", sector:"Sports & Outdoor", country:"DE", city:"Herzogenaurach", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:23.7, cur:"€B", growthPct:11.3, opPct:8.8, headcount:59000, ms:"estimated", gc:"estimated", notes:"Growth has recovered under the current CEO. +11% growth. Multi-cloud (Azure + AWS). DTC push is the stated strategic priority." },
  { slug:"ahold-delhaize", name:"Ahold Delhaize", sector:"Grocery", country:"NL", city:"Zaandam", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:99.4, cur:"€B", growthPct:1.3, opPct:4, headcount:414000, ms:"confirmed", gc:"estimated", notes:"Largest employer on watchlist (414K). Strong digital/e-commerce DNA. Albert Heijn, Stop & Shop, Food Lion." },
  { slug:"arla", name:"Arla Foods", sector:"CPG", country:"DK", city:"Aarhus", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:13.8, cur:"€B", growthPct:5, opPct:4, headcount:22000, ms:"estimated", gc:"estimated", notes:"Danish-UK-German farmer cooperative. Arla, Lurpak, Castello, Puck. 9,400 farmer-owners. Azure mentioned in sustainability tech stack." },
  { slug:"asos", name:"ASOS", sector:"Apparel & E-commerce", country:"GB", city:"London", quadrant:"not_visible", rhetoric:2, production:2, composite:2.0, isAINative:false, rev:1.4, cur:"£B", growthPct:-5.2, opPct:-1.8, headcount:3300, ms:"estimated", gc:"none", notes:"Profitability crisis dominates the agenda. AI investment is discretionary and deferred. On the watchlist as a cautionary benchmark." },
  { slug:"barilla", name:"Barilla", sector:"CPG", country:"IT", city:"Parma", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:4.0, cur:"€B", growthPct:3.5, opPct:9, headcount:8700, ms:"estimated", gc:"estimated", notes:"World's largest pasta maker. Barilla, Academia Barilla, Mulino Bianco, Harry's. Private Italian family group." },
  { slug:"beiersdorf", name:"Beiersdorf", sector:"CPG", country:"DE", city:"Hamburg", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:9.7, cur:"€B", growthPct:5.2, opPct:14, headcount:22000, ms:"confirmed", gc:"estimated", notes:"Skincare-focused CPG. Nivea (#1 global skincare brand), Eucerin, La Prairie, Hansaplast. Azure OpenAI rollout announced 2024." },
  { slug:"burberry", name:"Burberry", sector:"Luxury & Beauty", country:"GB", city:"London", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:2.5, cur:"£B", growthPct:-17, opPct:1.5, headcount:9000, ms:"estimated", gc:"estimated", notes:"Only UK-listed luxury house. Under turnaround (Joshua Schulman CEO). AI maturity lower than continental peers." },
  { slug:"campari", name:"Campari Group", sector:"CPG", country:"IT", city:"Milan", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:2.7, cur:"€B", growthPct:-0.6, opPct:22, headcount:6500, ms:"confirmed", gc:"estimated", notes:"Italian spirits house. Aperol, Campari, Wild Turkey, Grand Marnier, Espolòn. Microsoft stack confirmed via M365 and Azure workloads." },
  { slug:"carlsberg", name:"Carlsberg", sector:"CPG", country:"DK", city:"Copenhagen", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:9.4, cur:"€B", growthPct:1.2, opPct:16.5, headcount:40000, ms:"confirmed", gc:"estimated", notes:"Third-largest global brewer. SAIL'27 strategy explicitly names AI/data as pillar. Published Microsoft case study on Azure AI." },
  { slug:"carrefour", name:"Carrefour", sector:"Grocery", country:"FR", city:"Paris", quadrant:"performer", rhetoric:4, production:3, composite:3.5, isAINative:false, rev:83.3, cur:"€B", growthPct:1.2, opPct:3.0, headcount:335000, ms:"none", gc:"confirmed", notes:"Sovereign-AI first posture. Chose Mistral (French) deliberately for Hopla. Google Cloud is the ops backbone. Structurally resistant to Microsoft given GCP depth." },
  { slug:"colruyt", name:"Colruyt Group", sector:"Grocery", country:"BE", city:"Halle", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:9.8, cur:"€B", growthPct:4.5, opPct:3.8, headcount:32000, ms:"confirmed", gc:"estimated", notes:"Belgium's largest retailer. The algorithmic pricing guarantee has been AI-powered since the 1980s. One of Europe's oldest retail AI stories." },
  { slug:"danone", name:"Danone", sector:"CPG", country:"FR", city:"Paris", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:27.4, cur:"€B", growthPct:4.3, opPct:13, headcount:90000, ms:"confirmed", gc:"estimated", notes:"France's #2 food giant. Renew Danone strategy is productivity and AI-led. Mixed cloud but Microsoft-leaning on productivity and AI workloads." },
  { slug:"decathlon", name:"Decathlon", sector:"Sports & Outdoor", country:"FR", city:"Villeneuve-d'Ascq", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:16.1, cur:"€B", growthPct:4.8, opPct:5.5, headcount:101000, ms:"estimated", gc:"estimated", notes:"Private company. 101K employees, 1,700+ stores. Strong innovation and sustainability culture. No public vendor relationships disclosed." },
  { slug:"diageo", name:"Diageo", sector:"CPG", country:"GB", city:"London", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:15.5, cur:"£B", growthPct:-1.4, opPct:27.5, headcount:30000, ms:"estimated", gc:"estimated", notes:"Premium spirits (Johnnie Walker, Guinness, Tanqueray). Marketing-driven and data-rich. D2C ambition growing." },
  { slug:"essity", name:"Essity", sector:"CPG", country:"SE", city:"Stockholm", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:13.1, cur:"€B", growthPct:2, opPct:11, headcount:48000, ms:"confirmed", gc:"estimated", notes:"Swedish hygiene and health company. Tena, Tork, Leukoplast. One of the more Microsoft-deep CPG companies: Dynamics 365 confirmed, M365 Copilot broad rollout." },
  { slug:"estee-lauder", name:"Estée Lauder", sector:"Luxury & Beauty", country:"US", city:"New York", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:15.9, cur:"$B", growthPct:-2.3, opPct:8.1, headcount:62000, ms:"confirmed", gc:"estimated", notes:"Building GenAI ecosystem with Copilot. Under margin pressure. AI seen as efficiency lever. Publicly cited by Microsoft." },
  { slug:"ferrero", name:"Ferrero", sector:"CPG", country:"IT", city:"Alba", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:17.2, cur:"€B", growthPct:5.5, opPct:9, headcount:47000, ms:"estimated", gc:"estimated", notes:"Private Italian family company. Nutella, Kinder, Ferrero Rocher, Tic Tac. SAP is likely ERP backbone; Azure presence inferred from M365 patterns." },
  { slug:"fnac-darty", name:"Fnac Darty", sector:"Apparel & E-commerce", country:"FR", city:"Paris", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:7.8, cur:"€B", growthPct:-1.5, opPct:2.5, headcount:25000, ms:"confirmed", gc:"estimated", notes:"French electronics and culture retailer. Fnac (books, tech, music) + Darty (appliances). Darty's after-sales network is its moat." },
  { slug:"hm", name:"H&M", sector:"Apparel & E-commerce", country:"SE", city:"Stockholm", quadrant:"silent_builder", rhetoric:3, production:3, composite:3.0, isAINative:false, rev:236, cur:"SEK B", growthPct:0.1, opPct:6.2, headcount:107000, ms:"estimated", gc:"confirmed", notes:"Quiet builder. Low investor AI rhetoric vs. real tooling in production. Revenue flat, op margin recovering. Shein pressure is the defining commercial threat." },
  { slug:"haleon", name:"Haleon", sector:"CPG", country:"GB", city:"Weybridge", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:10.8, cur:"£B", growthPct:3.5, opPct:20, headcount:22000, ms:"confirmed", gc:"confirmed", notes:"Demerged from GSK in 2022. Consumer healthcare. Sensodyne, Voltaren, Panadol, Advil, Centrum. Dual cloud (Azure + GCP)." },
  { slug:"heineken", name:"Heineken", sector:"CPG", country:"NL", city:"Amsterdam", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:36, cur:"€B", growthPct:0.8, opPct:13.5, headcount:95000, ms:"confirmed", gc:"estimated", notes:"Published Microsoft reference customer. Multi-year cloud migration largely on Azure. Competitor to AB InBev. EverGreen strategy is data-led." },
  { slug:"hellofresh", name:"HelloFresh", sector:"Apparel & E-commerce", country:"DE", city:"Berlin", quadrant:"performer", rhetoric:5, production:5, composite:5.0, isAINative:false, rev:6.5, cur:"€B", growthPct:-5.2, opPct:2.8, headcount:18000, ms:"estimated", gc:"confirmed", notes:"German meal-kit pioneer. GCP-primary and AI-native from founding. Only meal-kit account on the watchlist and the strongest Google Cloud reference in EMEA e-commerce." },
  { slug:"henkel", name:"Henkel", sector:"CPG", country:"DE", city:"Düsseldorf", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:21.6, cur:"€B", growthPct:2.8, opPct:13.5, headcount:79000, ms:"confirmed", gc:"estimated", notes:"Dual-division structure (Adhesives + Consumer Brands). SAP on Azure is the ERP backbone. M365 Copilot rollout confirmed 2024. Persil, Schwarzkopf, Fa brands." },
  { slug:"hermes", name:"Hermès", sector:"Luxury & Beauty", country:"FR", city:"Paris", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:14.7, cur:"€B", growthPct:7, opPct:42, headcount:23000, ms:"confirmed", gc:"none", notes:"French ultra-luxury house. Birkin, Kelly. Family-controlled (~66%). Highest operating margins in luxury at 42%+. AI posture deliberately conservative: used to protect craft." },
  { slug:"ikea", name:"IKEA / Ingka", sector:"Home & DIY", country:"SE", city:"Leiden", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:47.6, cur:"€B", growthPct:3.9, opPct:7.2, headcount:177000, ms:"confirmed", gc:"estimated", notes:"Private company (Ingka Group). Strong sustainability focus aligns with CSRD requirements. Digital transformation ongoing." },
  { slug:"inditex", name:"Inditex", sector:"Apparel & E-commerce", country:"ES", city:"Arteixo", quadrant:"silent_builder", rhetoric:1, production:3, composite:2.0, isAINative:false, rev:39.9, cur:"€B", growthPct:3.2, opPct:20.1, headcount:165000, ms:"none", gc:"none", notes:"Silent Builder, textbook. CEO barely mentions AI until directly asked, but Try-On is shipping at global scale. Hardest account to penetrate on vendor logos." },
  { slug:"jeronimo-martins", name:"Jeronimo Martins", sector:"Grocery", country:"PT", city:"Lisbon", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:29.1, cur:"€B", growthPct:9.5, opPct:5.2, headcount:120000, ms:"confirmed", gc:"estimated", notes:"Portuguese family-controlled retailer. Biedronka (Poland's #1 grocer, 3,400+ stores), Pingo Doce (Portugal), Ara (Colombia). Eastern Europe's largest food retailer." },
  { slug:"kering", name:"Kering", sector:"Luxury & Beauty", country:"FR", city:"Paris", quadrant:"silent_builder", rhetoric:3, production:3, composite:3.0, isAINative:false, rev:17.2, cur:"€B", growthPct:-11.7, opPct:11.8, headcount:47000, ms:"estimated", gc:"none", notes:"Revenue down 12% (Gucci downturn). Appointed first Chief Data, AI & IT Officer to ExCom Mar 2026: a buying signal. Digital leadership in flux." },
  { slug:"kingfisher", name:"Kingfisher", sector:"Home & DIY", country:"GB", city:"London", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:12.7, cur:"£B", growthPct:1.2, opPct:5.8, headcount:78000, ms:"confirmed", gc:"estimated", notes:"Europe's largest DIY and home improvement retailer. B&Q (UK), Castorama (FR/PL), Brico Dépôt. Named Microsoft reference customer for M365 Copilot frontline worker deployment." },
  { slug:"loreal", name:"L'Oréal", sector:"Luxury & Beauty", country:"FR", city:"Clichy", quadrant:"performer", rhetoric:5, production:4, composite:4.5, isAINative:false, rev:41.2, cur:"€B", growthPct:5.6, opPct:20.0, headcount:90000, ms:"confirmed", gc:"estimated", notes:"Best-in-class AI narrative. Beauty Genius is the clearest consumer-facing GenAI product in EMEA retail. 5yr Microsoft enterprise deal confirmed 2024." },
  { slug:"lavazza", name:"Lavazza", sector:"CPG", country:"IT", city:"Turin", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:2.7, cur:"€B", growthPct:4, opPct:10, headcount:5200, ms:"estimated", gc:"estimated", notes:"Italian family-owned coffee group. Lavazza, Carte Noire, Kicking Horse. Sustainability and premiumisation strategy. Limited public tech disclosures." },
  { slug:"lego", name:"LEGO Group", sector:"CPG", country:"DK", city:"Billund", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:9.9, cur:"DKK B", growthPct:13, opPct:28, headcount:28000, ms:"confirmed", gc:"estimated", notes:"Private Danish toy giant. World's largest toy company by revenue. Responsible AI use is a core brand value (child safety). Azure and M365 Copilot confirmed 2024." },
  { slug:"lotus-bakeries", name:"Lotus Bakeries", sector:"CPG", country:"BE", city:"Lembeke", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:3.2, cur:"€B", growthPct:8.5, opPct:17, headcount:3900, ms:"confirmed", gc:"estimated", notes:"Belgian family-controlled biscuit company. Biscoff (global cult brand), Lotus, Dinosaurus. Premium growth story driving double-digit growth. One of the more surprising Microsoft reference accounts." },
  { slug:"lvmh", name:"LVMH", sector:"Luxury & Beauty", country:"FR", city:"Paris", quadrant:"silent_builder", rhetoric:2, production:4, composite:3.0, isAINative:false, rev:84.7, cur:"€B", growthPct:-1.3, opPct:23.1, headcount:213000, ms:"confirmed", gc:"confirmed", notes:"Quiet-build posture. Arnault won't make AI the story publicly. Multi-cloud across Google (ML) and Azure (GenAI). Watch Sephora DACH expansion in 2026." },
  { slug:"mango", name:"Mango", sector:"Apparel & E-commerce", country:"ES", city:"Palau-solità i Plegamans", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:3.8, cur:"€B", growthPct:14, opPct:9, headcount:16000, ms:"confirmed", gc:"estimated", notes:"Spanish family-owned fast-fashion retailer. Published Azure OpenAI for fashion design and trend forecasting in 2024. One of the more distinctive AI stories in EMEA apparel." },
  { slug:"marks-spencer", name:"Marks & Spencer", sector:"Apparel & E-commerce", country:"GB", city:"London", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:13.8, cur:"£B", growthPct:9, opPct:5.8, headcount:64000, ms:"confirmed", gc:"none", notes:"Public Microsoft strategic partnership announced 2023, deepened 2024. Flagship UK retail AI reference. Sparks programme is central data asset." },
  { slug:"nespresso", name:"Nespresso", sector:"CPG", country:"CH", city:"Lausanne", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:6.5, cur:"€B", growthPct:5.3, opPct:9.1, headcount:14000, ms:"estimated", gc:"estimated", notes:"Dynamics CS showcase. Premium D2C brand. Vertuo driving growth. Digital transformation a key enabler." },
  { slug:"nestle", name:"Nestlé", sector:"CPG", country:"CH", city:"Vevey", quadrant:"narrative_led", rhetoric:4, production:3, composite:3.5, isAINative:false, rev:93.4, cur:"CHF B", growthPct:2.1, opPct:17.3, headcount:275000, ms:"confirmed", gc:"estimated", notes:"Deep Microsoft relationship confirmed via NesGPT on Azure. Rhetoric outpaces confirmed production tool count. Largest CPG by revenue on the watchlist." },
  { slug:"ocado", name:"Ocado", sector:"Grocery", country:"GB", city:"Hatfield", quadrant:"native", rhetoric:5, production:5, composite:5.0, isAINative:true, rev:3.2, cur:"£B", growthPct:12.1, opPct:-2.9, headcount:18000, ms:"none", gc:"none", notes:"The only AI-native on the list. Robotics and ML are not a layer on top of retail: they are the licensed product sold to other grocers. Operationally loss-making but the tech platform is the investment thesis." },
  { slug:"on-running", name:"On Running", sector:"Sports & Outdoor", country:"CH", city:"Zurich", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:2.3, cur:"CHF B", growthPct:46.6, opPct:9.5, headcount:4100, ms:"estimated", gc:"estimated", notes:"Fastest-growing premium sports brand. Swiss-HQ, US-listed (NYSE). AWS-primary infra but M365 + Databricks on data. Direct peer to Adidas/Nike premium segment." },
  { slug:"pernod-ricard", name:"Pernod Ricard", sector:"CPG", country:"FR", city:"Paris", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:12.1, cur:"€B", growthPct:-4, opPct:27, headcount:19000, ms:"confirmed", gc:"none", notes:"Direct Diageo peer. Strong Microsoft partnership. Published case study on Matrix AI platform. Marketing and commercial AI are strategic priorities." },
  { slug:"puig", name:"Puig", sector:"CPG", country:"ES", city:"Barcelona", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:4.3, cur:"€B", growthPct:11, opPct:16, headcount:12000, ms:"estimated", gc:"estimated", notes:"Spanish prestige beauty and fashion house. Carolina Herrera, Rabanne, Nina Ricci, Jean Paul Gaultier, Byredo. IPO'd on BME (Barcelona) in 2024." },
  { slug:"reckitt", name:"Reckitt", sector:"CPG", country:"GB", city:"Slough", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:14.1, cur:"£B", growthPct:-0.8, opPct:22.7, headcount:43000, ms:"estimated", gc:"estimated", notes:"New CEO, transformation programme underway. Revenue under pressure. Data leadership in transition. Multiple clouds in play." },
  { slug:"richemont", name:"Richemont", sector:"Luxury & Beauty", country:"CH", city:"Geneva", quadrant:"narrative_led", rhetoric:2, production:1, composite:2.0, isAINative:false, rev:21.4, cur:"€B", growthPct:4.1, opPct:18.9, headcount:39000, ms:"estimated", gc:"estimated", notes:"Owns Cartier, Van Cleef, IWC, Montblanc. YNAP divestiture creates cloud strategy reset moment." },
  { slug:"sainsburys", name:"Sainsbury's", sector:"Grocery", country:"GB", city:"London", quadrant:"silent_builder", rhetoric:3, production:2, composite:3.0, isAINative:false, rev:32.8, cur:"£B", growthPct:3.1, opPct:3.1, headcount:148000, ms:"estimated", gc:"confirmed", notes:"Second UK grocer after Tesco. Historically GCP-leaning on data and AI, M365 on productivity. Nectar360 is key first-party data asset." },
  { slug:"sodexo", name:"Sodexo", sector:"CPG", country:"FR", city:"Paris", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:23.8, cur:"€B", growthPct:7.4, opPct:4.5, headcount:422000, ms:"confirmed", gc:"estimated", notes:"World's second-largest food services company (behind Compass). 422k employees, 45 countries. One of the largest M365 Copilot enterprise deployments in the world." },
  { slug:"tesco", name:"Tesco", sector:"Grocery", country:"GB", city:"Welwyn Garden City", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:68.2, cur:"£B", growthPct:3.8, opPct:4.6, headcount:345000, ms:"confirmed", gc:"confirmed", notes:"UK grocery leader with 20M+ Clubcard households. The data asset is the moat. CDIO Ken Towle runs a genuine tech organisation. AI spend accelerated materially in FY25 per capex disclosure." },
  { slug:"unilever", name:"Unilever", sector:"CPG", country:"GB", city:"London", quadrant:"narrative_led", rhetoric:4, production:2, composite:3.0, isAINative:false, rev:50.5, cur:"€B", growthPct:-3.8, opPct:20.0, headcount:127000, ms:"none", gc:"none", notes:"Narrative-led pattern. CEO puts AI, LLMs, and agentic shopping centre-stage in FY2025 close, but the deck names no vendor, no tool, no ROI." },
  { slug:"zalando", name:"Zalando", sector:"Apparel & E-commerce", country:"DE", city:"Berlin", quadrant:"performer", rhetoric:4, production:4, composite:4.0, isAINative:false, rev:11.0, cur:"€B", growthPct:5.0, opPct:4.1, headcount:16000, ms:"estimated", gc:"confirmed", notes:"Tech-culture company first, retailer second. Active GitHub org (500+ ML repos). CTO-led AI investment. Returns reduction is the clearest ROI narrative in the sector." },
];

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check which profiles already exist (skip to avoid overwriting richer data)
    const existing = new Set(
      (await redis.keys("rachel:profile:*")).map((k) => k.replace("rachel:profile:", ""))
    );

    const seeded: string[] = [];
    const skipped: string[] = [];

    for (const row of SEED) {
      if (existing.has(row.slug)) {
        skipped.push(row.slug);
        continue;
      }
      const profile = build(row);
      await writeProfile(profile);
      seeded.push(row.slug);
    }

    // Rebuild the denormalized list to include all profiles
    const all = await rebuildProfilesAll();

    return NextResponse.json({
      ok: true,
      seeded: seeded.length,
      skipped: skipped.length,
      total: all.length,
      seededSlugs: seeded,
      skippedSlugs: skipped,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
