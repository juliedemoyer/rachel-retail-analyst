// Curated industry events calendar. Hand-maintained — auto-pulling from each
// event site is brittle and not worth the engineering. Refresh once per year
// (every November for the following year). Keep the list focused: retail,
// consumer, AI, vendor and policy events that move EMEA buyer agendas.
//
// Schema is rendered on /app/calendar (Events tab) and /app/today (Events
// this week strip). Past events stay on the list for ~6 weeks so users can
// see what just happened.

export type EventCategory =
  | "retail"
  | "luxury"
  | "tech_ai"
  | "vendor_day"
  | "marketing"
  | "policy"
  | "sustainability";

export interface IndustryEvent {
  id: string;
  name: string;
  /** ISO date YYYY-MM-DD */
  startDate: string;
  /** ISO date YYYY-MM-DD, omit if single day */
  endDate?: string;
  city: string;
  country: string; // ISO-2 country code
  category: EventCategory;
  /** Personas it serves */
  audience: Array<"GTM" | "Retail leader" | "AI buyer" | "Investor" | "CMO">;
  /** Vendors that anchor or sponsor this event meaningfully */
  vendors?: string[];
  url: string;
  whyMatters: string;
}

// Sorted alphabetically; runtime sorts by startDate.
export const EVENTS: IndustryEvent[] = [
  {
    id: "changenow-2026",
    name: "ChangeNOW Summit",
    startDate: "2026-05-07",
    endDate: "2026-05-09",
    city: "Paris",
    country: "FR",
    category: "sustainability",
    audience: ["Retail leader", "CMO"],
    vendors: [],
    url: "https://www.changenow.world/",
    whyMatters:
      "Largest sustainability summit in Europe. Where CSRD-driven retail data infrastructure conversations happen one floor up from the AI booths.",
  },
  {
    id: "world-retail-congress-2026",
    name: "World Retail Congress",
    startDate: "2026-05-12",
    endDate: "2026-05-14",
    city: "Barcelona",
    country: "ES",
    category: "retail",
    audience: ["Retail leader", "GTM", "Investor"],
    vendors: ["Salesforce", "Microsoft", "Google Cloud"],
    url: "https://www.worldretailcongress.com/",
    whyMatters:
      "Tier-1 EMEA retailers' annual board-level summit. Inditex, Carrefour, Ahold, Tesco, M&S keynotes are where the year's strategic narrative lands.",
  },
  {
    id: "money-2020-europe-2026",
    name: "Money 20/20 Europe",
    startDate: "2026-06-02",
    endDate: "2026-06-05",
    city: "Amsterdam",
    country: "NL",
    category: "tech_ai",
    audience: ["GTM", "AI buyer"],
    vendors: ["Visa", "Mastercard", "Stripe"],
    url: "https://europe.money2020.com/",
    whyMatters:
      "Where agentic-checkout payment rails (Visa Intelligent Commerce Connect, Stripe Agent SDK) get demoed to acquirers. Heavy retail-PSP overlap.",
  },
  {
    id: "shoptalk-europe-2026",
    name: "Shoptalk Europe",
    startDate: "2026-06-09",
    endDate: "2026-06-11",
    city: "Barcelona",
    country: "ES",
    category: "retail",
    audience: ["Retail leader", "GTM", "AI buyer"],
    vendors: ["Microsoft", "Google Cloud", "Salesforce", "Anthropic"],
    url: "https://shoptalkeurope.com/",
    whyMatters:
      "The single most concentrated EMEA retail-AI buyer audience of the year. Example entry: replace with the events you actually track.",
  },
  {
    id: "vivatech-2026",
    name: "Viva Technology",
    startDate: "2026-06-11",
    endDate: "2026-06-14",
    city: "Paris",
    country: "FR",
    category: "tech_ai",
    audience: ["AI buyer", "Retail leader", "Investor"],
    vendors: ["LVMH", "Microsoft", "Mistral", "Google"],
    url: "https://vivatechnology.com/",
    whyMatters:
      "Europe's biggest tech festival. LVMH stand is the consistent luxury × AI showcase. Mistral always announces a flagship model. French sovereign-AI thesis lives here.",
  },
  {
    id: "cannes-lions-2026",
    name: "Cannes Lions International Festival of Creativity",
    startDate: "2026-06-22",
    endDate: "2026-06-26",
    city: "Cannes",
    country: "FR",
    category: "marketing",
    audience: ["CMO", "Retail leader"],
    vendors: ["Meta", "Google", "TikTok", "Adobe"],
    url: "https://www.canneslions.com/",
    whyMatters:
      "AI in creative and ad tech is the dominant track now. Where Adobe Firefly / Google Veo / Mistral Le Chat case studies get pitched to CMOs.",
  },
  {
    id: "adopt-ai-paris-2026",
    name: "AdoptAI Paris",
    startDate: "2026-07-01",
    city: "Paris",
    country: "FR",
    category: "tech_ai",
    audience: ["AI buyer", "Retail leader"],
    vendors: ["Mistral", "OpenAI", "Anthropic"],
    url: "https://adoptai.fr/",
    whyMatters:
      "French enterprise-AI adoption summit. Where the post-AI-Act compliance + sovereign-AI buyer questions get aired in the original language.",
  },
  {
    id: "dreamforce-2026",
    name: "Dreamforce",
    startDate: "2026-09-15",
    endDate: "2026-09-18",
    city: "San Francisco",
    country: "US",
    category: "vendor_day",
    audience: ["GTM", "AI buyer"],
    vendors: ["Salesforce"],
    url: "https://www.salesforce.com/dreamforce/",
    whyMatters:
      "Salesforce's annual buyer-facing tentpole. Agentforce roadmap, retail Agentforce Operations follow-ons, Slack-as-front-end pitches all get unveiled here.",
  },
  {
    id: "nrf-europe-2026",
    name: "NRF Europe",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    city: "Paris",
    country: "FR",
    category: "retail",
    audience: ["Retail leader", "GTM", "AI buyer"],
    vendors: ["Microsoft", "Google Cloud", "Salesforce", "Oracle", "AWS"],
    url: "https://nrfeurope.nrf.com/",
    whyMatters:
      "NRF's first European edition, anchored in Paris. Compresses the EMEA retail-tech buyer agenda for the autumn into three days. Vendor keynotes here set the narrative through year-end planning.",
  },
  {
    id: "anthropic-code-with-claude-2026",
    name: "Anthropic Code with Claude",
    startDate: "2026-09-16",
    city: "San Francisco",
    country: "US",
    category: "vendor_day",
    audience: ["AI buyer"],
    vendors: ["Anthropic"],
    url: "https://www.anthropic.com/events",
    whyMatters:
      "Anthropic's annual developer + enterprise conference. Where the Claude Enterprise retail-pack and MCP-for-retail roadmap get unveiled.",
  },
  {
    id: "openai-dev-day-2026",
    name: "OpenAI DevDay",
    startDate: "2026-10-06",
    city: "San Francisco",
    country: "US",
    category: "vendor_day",
    audience: ["AI buyer"],
    vendors: ["OpenAI"],
    url: "https://devday.openai.com/",
    whyMatters:
      "OpenAI's flagship platform announcement event. Agentic-commerce / Operator retail integrations historically debut here.",
  },
  {
    id: "bof-voices-2026",
    name: "BoF VOICES",
    startDate: "2026-12-02",
    endDate: "2026-12-04",
    city: "Oxfordshire",
    country: "GB",
    category: "luxury",
    audience: ["CMO", "Retail leader"],
    vendors: [],
    url: "https://www.businessoffashion.com/voices/",
    whyMatters:
      "Where luxury and fashion CEOs say things off-record that they won't repeat on earnings calls. Anchor read-out for the start of the next year's narrative.",
  },
  {
    id: "web-summit-2026",
    name: "Web Summit",
    startDate: "2026-11-09",
    endDate: "2026-11-12",
    city: "Lisbon",
    country: "PT",
    category: "tech_ai",
    audience: ["AI buyer", "Investor"],
    vendors: ["OpenAI", "Anthropic", "Mistral", "Google"],
    url: "https://websummit.com/",
    whyMatters:
      "EU sovereign-AI policy + startup-fundraising signal. Stratechery / Bay Area Times newsletters all dispatch from here.",
  },
  {
    id: "ms-ignite-2026",
    name: "Microsoft Ignite",
    startDate: "2026-11-17",
    endDate: "2026-11-21",
    city: "San Francisco",
    country: "US",
    category: "vendor_day",
    audience: ["AI buyer"],
    vendors: ["Microsoft"],
    url: "https://ignite.microsoft.com/",
    whyMatters:
      "Microsoft's annual platform event. Copilot-for-X and Cloud-for-Retail roadmap reset for the next year. Multi-cloud retail buyers all attend.",
  },
  {
    id: "nrf-2027",
    name: "NRF Big Show",
    startDate: "2027-01-11",
    endDate: "2027-01-13",
    city: "New York",
    country: "US",
    category: "retail",
    audience: ["Retail leader", "GTM", "AI buyer"],
    vendors: ["Microsoft", "Google Cloud", "Salesforce", "Oracle", "AWS"],
    url: "https://nrfbigshow.nrf.com/",
    whyMatters:
      "World's biggest retail trade show. EMEA buyers send small delegations; the keynote announcements set the year's vendor narrative globally.",
  },
  {
    id: "wef-davos-2027",
    name: "World Economic Forum (Davos)",
    startDate: "2027-01-19",
    endDate: "2027-01-23",
    city: "Davos",
    country: "CH",
    category: "policy",
    audience: ["Retail leader", "Investor"],
    vendors: [],
    url: "https://www.weforum.org/events/world-economic-forum-annual-meeting/",
    whyMatters:
      "Where retail/CPG CEOs lock in the year's macro narrative. AI Act implementation tone gets set on stage; Bernard Arnault, Doug McMillon, Hein Schumacher all speak here.",
  },
  {
    id: "ces-2027",
    name: "CES",
    startDate: "2027-01-06",
    endDate: "2027-01-09",
    city: "Las Vegas",
    country: "US",
    category: "tech_ai",
    audience: ["CMO", "AI buyer"],
    vendors: ["Nvidia", "Samsung", "LG", "Google", "Amazon"],
    url: "https://www.ces.tech/",
    whyMatters:
      "Consumer-electronics anchor. Nvidia keynote sets the year's compute narrative. Increasingly the first place new agentic-commerce demos surface for mass-market.",
  },
  {
    id: "shoptalk-spring-2027",
    name: "Shoptalk (US)",
    startDate: "2027-03-15",
    endDate: "2027-03-18",
    city: "Las Vegas",
    country: "US",
    category: "retail",
    audience: ["Retail leader", "GTM"],
    vendors: ["Microsoft", "Google Cloud", "Salesforce", "Anthropic"],
    url: "https://shoptalk.com/",
    whyMatters:
      "US retail counterpart to Shoptalk Europe. Often where Europe-first AI deployments are pitched back to US retailers.",
  },
];
