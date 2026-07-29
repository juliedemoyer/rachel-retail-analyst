// Batch 2: structural enrichments for the 38 companies that don't yet have
// hand-curated markdown profiles. Adds peer comparisons (derived from same
// sector + different quadrant), narrative framing inferred from quadrant,
// canonical IR / news source links, and three askPrompts per company.
// No quotes, named leadership, or vendor relationships are fabricated here.

import type { CompanyTemplateData } from "../schema";

// AB InBev — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const ab_inbev_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against AB InBev's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.ab-inbev.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=AB+InBev+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's AB InBev's position on generative AI?",
    "Who runs the AI agenda at AB InBev?",
    "What named tools is AB InBev running in production?",
  ],
};

// Adidas — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const adidas_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "H&M", note: "H&M sits as a Silent Builder in the same sector. Useful contrast against Adidas's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.adidas-group.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Adidas+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Adidas's position on generative AI?",
    "Who runs the AI agenda at Adidas?",
    "What named tools is Adidas running in production?",
  ],
};

// Ahold Delhaize — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const ahold_delhaize_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Carrefour", note: "Carrefour sits as a Performer in the same sector. Useful contrast against Ahold Delhaize's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.aholddelhaize.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ahold+Delhaize+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Ahold Delhaize's position on generative AI?",
    "Who runs the AI agenda at Ahold Delhaize?",
    "What named tools is Ahold Delhaize running in production?",
  ],
};

// Arla Foods — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const arla_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Arla Foods's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.arla.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Arla+Foods+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Arla Foods's position on generative AI?",
    "Who runs the AI agenda at Arla Foods?",
    "What named tools is Arla Foods running in production?",
  ],
};

// ASOS — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const asos_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Zalando", note: "Zalando sits as a Performer in the same sector. Useful contrast against ASOS's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=ASOS+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's ASOS's position on generative AI?",
    "Who runs the AI agenda at ASOS?",
    "What named tools is ASOS running in production?",
  ],
};

// Barilla — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const barilla_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Barilla's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.barilla.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Barilla+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Barilla's position on generative AI?",
    "Who runs the AI agenda at Barilla?",
    "What named tools is Barilla running in production?",
  ],
};

// Beiersdorf — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const beiersdorf_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Beiersdorf's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.beiersdorf.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Beiersdorf+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Beiersdorf's position on generative AI?",
    "Who runs the AI agenda at Beiersdorf?",
    "What named tools is Beiersdorf running in production?",
  ],
};

// Burberry — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const burberry_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "Estée Lauder", note: "Estée Lauder sits as a Silent Builder in the same sector. Useful contrast against Burberry's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "L'Oréal", note: "L'Oréal sits as a Performer in the same sector. Useful contrast against Burberry's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.burberryplc.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Burberry+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Burberry's position on generative AI?",
    "Who runs the AI agenda at Burberry?",
    "What named tools is Burberry running in production?",
  ],
};

// Campari Group — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const campari_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Campari Group's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.camparigroup.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Campari+Group+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Campari Group's position on generative AI?",
    "Who runs the AI agenda at Campari Group?",
    "What named tools is Campari Group running in production?",
  ],
};

// Carlsberg — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const carlsberg_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Carlsberg's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.carlsberggroup.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Carlsberg+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Carlsberg's position on generative AI?",
    "Who runs the AI agenda at Carlsberg?",
    "What named tools is Carlsberg running in production?",
  ],
};

// Carrefour — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const carrefour_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Customer-first AI.",
      body: "AI commentary occupies a meaningful share of earnings calls and investor materials, and is paired with named consumer-facing products.",
    },
  },
  peerComparison: [
    { peer: "Ahold Delhaize", note: "Ahold Delhaize sits as a Silent Builder in the same sector. Useful contrast against Carrefour's Performer posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Carrefour+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Carrefour's position on generative AI?",
    "Who runs the AI agenda at Carrefour?",
    "What named tools is Carrefour running in production?",
  ],
};

// Colruyt Group — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const colruyt_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Carrefour", note: "Carrefour sits as a Performer in the same sector. Useful contrast against Colruyt Group's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.colruytgroup.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Colruyt+Group+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Colruyt Group's position on generative AI?",
    "Who runs the AI agenda at Colruyt Group?",
    "What named tools is Colruyt Group running in production?",
  ],
};

// Danone — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const danone_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Danone's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.danone.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Danone+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Danone's position on generative AI?",
    "Who runs the AI agenda at Danone?",
    "What named tools is Danone running in production?",
  ],
};

// Decathlon — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const decathlon_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "H&M", note: "H&M sits as a Silent Builder in the same sector. Useful contrast against Decathlon's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.decathlon.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Decathlon+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Decathlon's position on generative AI?",
    "Who runs the AI agenda at Decathlon?",
    "What named tools is Decathlon running in production?",
  ],
};

// Diageo — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const diageo_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Diageo's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.diageo.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Diageo+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Diageo's position on generative AI?",
    "Who runs the AI agenda at Diageo?",
    "What named tools is Diageo running in production?",
  ],
};

// Essity — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const essity_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Essity's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.essity.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Essity+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Essity's position on generative AI?",
    "Who runs the AI agenda at Essity?",
    "What named tools is Essity running in production?",
  ],
};

// Estée Lauder — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const estee_lauder_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Burberry", note: "Burberry sits as Narrative-led in the same sector. Useful contrast against Estée Lauder's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "L'Oréal", note: "L'Oréal sits as a Performer in the same sector. Useful contrast against Estée Lauder's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.elcompanies.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Estée+Lauder+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Estée Lauder's position on generative AI?",
    "Who runs the AI agenda at Estée Lauder?",
    "What named tools is Estée Lauder running in production?",
  ],
};

// Ferrero — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const ferrero_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Ferrero's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.ferrero.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ferrero+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Ferrero's position on generative AI?",
    "Who runs the AI agenda at Ferrero?",
    "What named tools is Ferrero running in production?",
  ],
};

// Fnac Darty — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const fnac_darty_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Zalando", note: "Zalando sits as a Performer in the same sector. Useful contrast against Fnac Darty's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.fnacdarty.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Fnac+Darty+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Fnac Darty's position on generative AI?",
    "Who runs the AI agenda at Fnac Darty?",
    "What named tools is Fnac Darty running in production?",
  ],
};

// H&M — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const hm_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against H&M's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=H&M+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's H&M's position on generative AI?",
    "Who runs the AI agenda at H&M?",
    "What named tools is H&M running in production?",
  ],
};

// Haleon — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const haleon_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Haleon's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.haleon.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Haleon+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Haleon's position on generative AI?",
    "Who runs the AI agenda at Haleon?",
    "What named tools is Haleon running in production?",
  ],
};

// Heineken — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const heineken_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Heineken's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.theheinekencompany.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Heineken+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Heineken's position on generative AI?",
    "Who runs the AI agenda at Heineken?",
    "What named tools is Heineken running in production?",
  ],
};

// HelloFresh — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const hellofresh_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Zalando", note: "Zalando sits as a Performer in the same sector. Useful contrast against HelloFresh's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.hellofreshgroup.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=HelloFresh+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's HelloFresh's position on generative AI?",
    "Who runs the AI agenda at HelloFresh?",
    "What named tools is HelloFresh running in production?",
  ],
};

// Henkel — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const henkel_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Henkel's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.henkel.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Henkel+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Henkel's position on generative AI?",
    "Who runs the AI agenda at Henkel?",
    "What named tools is Henkel running in production?",
  ],
};

// Hermès — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const hermes_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Burberry", note: "Burberry sits as Narrative-led in the same sector. Useful contrast against Hermès's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "L'Oréal", note: "L'Oréal sits as a Performer in the same sector. Useful contrast against Hermès's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://finance.hermes.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Hermès+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Hermès's position on generative AI?",
    "Who runs the AI agenda at Hermès?",
    "What named tools is Hermès running in production?",
  ],
};

// IKEA / Ingka — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const ikea_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against IKEA / Ingka's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.ikea.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=IKEA+/+Ingka+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's IKEA / Ingka's position on generative AI?",
    "Who runs the AI agenda at IKEA / Ingka?",
    "What named tools is IKEA / Ingka running in production?",
  ],
};

// Inditex — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const inditex_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against Inditex's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Inditex+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Inditex's position on generative AI?",
    "Who runs the AI agenda at Inditex?",
    "What named tools is Inditex running in production?",
  ],
};

// Jeronimo Martins — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const jeronimo_martins_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Carrefour", note: "Carrefour sits as a Performer in the same sector. Useful contrast against Jeronimo Martins's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.jeronimomartins.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Jeronimo+Martins+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Jeronimo Martins's position on generative AI?",
    "Who runs the AI agenda at Jeronimo Martins?",
    "What named tools is Jeronimo Martins running in production?",
  ],
};

// Kering — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const kering_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Burberry", note: "Burberry sits as Narrative-led in the same sector. Useful contrast against Kering's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "L'Oréal", note: "L'Oréal sits as a Performer in the same sector. Useful contrast against Kering's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Kering+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Kering's position on generative AI?",
    "Who runs the AI agenda at Kering?",
    "What named tools is Kering running in production?",
  ],
};

// Kingfisher — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const kingfisher_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against Kingfisher's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.kingfisher.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Kingfisher+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Kingfisher's position on generative AI?",
    "Who runs the AI agenda at Kingfisher?",
    "What named tools is Kingfisher running in production?",
  ],
};

// L'Oréal — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const loreal_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Customer-first AI.",
      body: "AI commentary occupies a meaningful share of earnings calls and investor materials, and is paired with named consumer-facing products.",
    },
  },
  peerComparison: [
    { peer: "Burberry", note: "Burberry sits as Narrative-led in the same sector. Useful contrast against L'Oréal's Performer posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "Estée Lauder", note: "Estée Lauder sits as a Silent Builder in the same sector. Useful contrast against L'Oréal's Performer posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=L'Oréal+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's L'Oréal's position on generative AI?",
    "Who runs the AI agenda at L'Oréal?",
    "What named tools is L'Oréal running in production?",
  ],
};

// Lavazza — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const lavazza_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Lavazza's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.lavazzagroup.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Lavazza+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Lavazza's position on generative AI?",
    "Who runs the AI agenda at Lavazza?",
    "What named tools is Lavazza running in production?",
  ],
};

// LEGO Group — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const lego_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against LEGO Group's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.lego.com/en-us/aboutus" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=LEGO+Group+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's LEGO Group's position on generative AI?",
    "Who runs the AI agenda at LEGO Group?",
    "What named tools is LEGO Group running in production?",
  ],
};

// Lotus Bakeries — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const lotus_bakeries_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Lotus Bakeries's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.lotusbakeries.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Lotus+Bakeries+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Lotus Bakeries's position on generative AI?",
    "Who runs the AI agenda at Lotus Bakeries?",
    "What named tools is Lotus Bakeries running in production?",
  ],
};

// Mango — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const mango_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against Mango's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.mango.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Mango+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Mango's position on generative AI?",
    "Who runs the AI agenda at Mango?",
    "What named tools is Mango running in production?",
  ],
};

// Marks & Spencer — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const marks_spencer_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against Marks & Spencer's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://corporate.marksandspencer.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Marks+&+Spencer+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Marks & Spencer's position on generative AI?",
    "Who runs the AI agenda at Marks & Spencer?",
    "What named tools is Marks & Spencer running in production?",
  ],
};

// Nespresso — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const nespresso_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Nespresso's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.nestle-nespresso.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Nespresso+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Nespresso's position on generative AI?",
    "Who runs the AI agenda at Nespresso?",
    "What named tools is Nespresso running in production?",
  ],
};

// Nestlé — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const nestle_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Nestlé's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Nestlé+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Nestlé's position on generative AI?",
    "Who runs the AI agenda at Nestlé?",
    "What named tools is Nestlé running in production?",
  ],
};

// Ocado — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const ocado_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Carrefour", note: "Carrefour sits as a Performer in the same sector. Useful contrast against Ocado's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Ocado+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Ocado's position on generative AI?",
    "Who runs the AI agenda at Ocado?",
    "What named tools is Ocado running in production?",
  ],
};

// On Running — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const on_running_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Adidas", note: "Adidas sits as Narrative-led in the same sector. Useful contrast against On Running's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.on.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=On+Running+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's On Running's position on generative AI?",
    "Who runs the AI agenda at On Running?",
    "What named tools is On Running running in production?",
  ],
};

// Pernod Ricard — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const pernod_ricard_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Pernod Ricard's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.pernod-ricard.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Pernod+Ricard+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Pernod Ricard's position on generative AI?",
    "Who runs the AI agenda at Pernod Ricard?",
    "What named tools is Pernod Ricard running in production?",
  ],
};

// Puig — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const puig_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Puig's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.puig.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Puig+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Puig's position on generative AI?",
    "Who runs the AI agenda at Puig?",
    "What named tools is Puig running in production?",
  ],
};

// Reckitt — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const reckitt_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Reckitt's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.reckitt.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Reckitt+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Reckitt's position on generative AI?",
    "Who runs the AI agenda at Reckitt?",
    "What named tools is Reckitt running in production?",
  ],
};

// Richemont — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const richemont_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "Estée Lauder", note: "Estée Lauder sits as a Silent Builder in the same sector. Useful contrast against Richemont's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
    { peer: "L'Oréal", note: "L'Oréal sits as a Performer in the same sector. Useful contrast against Richemont's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market.", accent: "rust" },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.richemont.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Richemont+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Richemont's position on generative AI?",
    "Who runs the AI agenda at Richemont?",
    "What named tools is Richemont running in production?",
  ],
};

// Sainsbury's — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const sainsburys_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Carrefour", note: "Carrefour sits as a Performer in the same sector. Useful contrast against Sainsbury's's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.about.sainsburys.co.uk" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Sainsbury's+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Sainsbury's's position on generative AI?",
    "Who runs the AI agenda at Sainsbury's?",
    "What named tools is Sainsbury's running in production?",
  ],
};

// Sodexo — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const sodexo_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Quiet build.",
      body: "Few public AI claims, but real tools shipping inside the business. The public narrative has not caught up with the deployed footprint.",
    },
  },
  peerComparison: [
    { peer: "Arla Foods", note: "Arla Foods sits as Narrative-led in the same sector. Useful contrast against Sodexo's Silent Builder posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "🌐 Investor relations", url: "https://www.sodexo.com" },
    { label: "📰 News & press", url: "https://www.google.com/search?q=Sodexo+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Sodexo's position on generative AI?",
    "Who runs the AI agenda at Sodexo?",
    "What named tools is Sodexo running in production?",
  ],
};

// Tesco — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const tesco_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Customer-first AI.",
      body: "AI commentary occupies a meaningful share of earnings calls and investor materials, and is paired with named consumer-facing products.",
    },
  },
  peerComparison: [
    { peer: "Ahold Delhaize", note: "Ahold Delhaize sits as a Silent Builder in the same sector. Useful contrast against Tesco's Performer posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Tesco+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Tesco's position on generative AI?",
    "Who runs the AI agenda at Tesco?",
    "What named tools is Tesco running in production?",
  ],
};

// Unilever — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const unilever_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Front-and-centre.",
      body: "AI is a regular talking point on earnings calls but production deployments are still light. Watch for the gap to close in the next two quarters.",
    },
  },
  peerComparison: [
    { peer: "AB InBev", note: "AB InBev sits as a Silent Builder in the same sector. Useful contrast against Unilever's narrative-led posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Unilever+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Unilever's position on generative AI?",
    "Who runs the AI agenda at Unilever?",
    "What named tools is Unilever running in production?",
  ],
};

// Zalando — batch 2 enrichment (peer comparison, framing, sources, ask prompts)
export const zalando_b2: Partial<CompanyTemplateData> = {
  narrative: {
    framing: {
      headline: "Customer-first AI.",
      body: "AI commentary occupies a meaningful share of earnings calls and investor materials, and is paired with named consumer-facing products.",
    },
  },
  peerComparison: [
    { peer: "ASOS", note: "ASOS sits as a Silent Builder in the same sector. Useful contrast against Zalando's Performer posture; both serve overlapping retail customers but signal AI differently to the market." },
  ],
  sources: [
    { label: "📰 News & press", url: "https://www.google.com/search?q=Zalando+AI+earnings&tbm=nws" },
  ],
  askPrompts: [
    "What's Zalando's position on generative AI?",
    "Who runs the AI agenda at Zalando?",
    "What named tools is Zalando running in production?",
  ],
};

export const batch2: Record<string, Partial<CompanyTemplateData>> = {
  "ab-inbev": ab_inbev_b2,
  "adidas": adidas_b2,
  "ahold-delhaize": ahold_delhaize_b2,
  "arla": arla_b2,
  "asos": asos_b2,
  "barilla": barilla_b2,
  "beiersdorf": beiersdorf_b2,
  "burberry": burberry_b2,
  "campari": campari_b2,
  "carlsberg": carlsberg_b2,
  "carrefour": carrefour_b2,
  "colruyt": colruyt_b2,
  "danone": danone_b2,
  "decathlon": decathlon_b2,
  "diageo": diageo_b2,
  "essity": essity_b2,
  "estee-lauder": estee_lauder_b2,
  "ferrero": ferrero_b2,
  "fnac-darty": fnac_darty_b2,
  "hm": hm_b2,
  "haleon": haleon_b2,
  "heineken": heineken_b2,
  "hellofresh": hellofresh_b2,
  "henkel": henkel_b2,
  "hermes": hermes_b2,
  "ikea": ikea_b2,
  "inditex": inditex_b2,
  "jeronimo-martins": jeronimo_martins_b2,
  "kering": kering_b2,
  "kingfisher": kingfisher_b2,
  "loreal": loreal_b2,
  "lavazza": lavazza_b2,
  "lego": lego_b2,
  "lotus-bakeries": lotus_bakeries_b2,
  "mango": mango_b2,
  "marks-spencer": marks_spencer_b2,
  "nespresso": nespresso_b2,
  "nestle": nestle_b2,
  "ocado": ocado_b2,
  "on-running": on_running_b2,
  "pernod-ricard": pernod_ricard_b2,
  "puig": puig_b2,
  "reckitt": reckitt_b2,
  "richemont": richemont_b2,
  "sainsburys": sainsburys_b2,
  "sodexo": sodexo_b2,
  "tesco": tesco_b2,
  "unilever": unilever_b2,
  "zalando": zalando_b2,
};
