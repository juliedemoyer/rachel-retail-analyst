// Batch 5: real multi-brand counts with portfolio-page citations.
// Each entry sets investor.operatingComplexity.brands to a public number
// (annual report or brand-portfolio page) and adds the portfolio page to
// furtherReading so the source is one click away from every profile.

import type { CompanyTemplateData } from "../schema";

// ab-inbev
export const ab_inbev_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "500+", note: "iconic brewing brands worldwide" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.ab-inbev.com/our-brands/" },
  ],
};

// adidas
export const adidas_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "3", note: "Adidas, Reebok (divested 2022), Y-3 (collab)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.adidas-group.com/en/about/profile/" },
  ],
};

// ahold-delhaize
export const ahold_delhaize_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "23", note: "store brands across US + Europe (Stop & Shop, Food Lion, Albert Heijn, Delhaize, Maxi, Mega Image, etc.)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.aholddelhaize.com/brands/" },
  ],
};

// arla
export const arla_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "11", note: "dairy brands (Arla, Lurpak, Castello, Anchor, Cravendale)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.arla.com/products/our-brands/" },
  ],
};

// asos
export const asos_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single ASOS marketplace + 25+ private labels" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.asosplc.com" },
  ],
};

// barilla
export const barilla_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "11", note: "food brands (Barilla, Mulino Bianco, Pavesi, Wasa, Harrys, Voiello)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.barilla.com/en-us/our-brands" },
  ],
};

// beiersdorf
export const beiersdorf_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "50+", note: "brands across Consumer (NIVEA, Eucerin, La Prairie) + Tesa" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.beiersdorf.com/brands/our-brands" },
  ],
};

// burberry
export const burberry_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single-brand luxury house" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.burberryplc.com" },
  ],
};

// campari
export const campari_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "50", note: "spirits brands (Campari, Aperol, Wild Turkey, Skyy, Espolòn)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.camparigroup.com/en/brands" },
  ],
};

// carlsberg
export const carlsberg_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "140+", note: "brands across major + craft + speciality + alcohol-free" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.carlsberggroup.com/products-and-brands/our-brands/" },
  ],
};

// carrefour
export const carrefour_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1+", note: "Carrefour banners + own-brands (Carrefour Market, Express, Bio, Sélection, Reflets de France)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.carrefour.com/en/group/own-brand-portfolio" },
  ],
};

// colruyt
export const colruyt_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "16+", note: "store + own brands (Colruyt, Bio-Planet, Cru, Spar, OKay, Dreambaby, Boni, Everyday)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.colruytgroup.com/en/our-brands" },
  ],
};

// danone
export const danone_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "30+", note: "brands across Dairy & Plant-Based, Waters, Specialized Nutrition" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.danone.com/brands.html" },
  ],
};

// decathlon
export const decathlon_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "80+", note: "passion brands designed in-house (Quechua, Domyos, Rockrider, Kipsta, Tribord, etc.)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.decathlon.com/pages/passion-brands" },
  ],
};

// diageo
export const diageo_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "200+", note: "premium drinks brands sold in 180 countries" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.diageo.com/en/our-brands" },
  ],
};

// essity
export const essity_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "12+", note: "hygiene + health brands (Tena, Tork, Libresse, Libero, Tempo, Cushelle)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.essity.com/brands/" },
  ],
};

// estee-lauder
export const estee_lauder_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "28", note: "prestige brands worldwide" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.elcompanies.com/en/our-brands" },
  ],
};

// fenty-beauty
export const fenty_beauty_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "Fenty Beauty" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.fentybeauty.com" },
  ],
};

// ferrero
export const ferrero_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "30+", note: "confectionery brands (Nutella, Kinder, Ferrero Rocher, Tic Tac, Raffaello)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.ferrero.com/products" },
  ],
};

// fnac-darty
export const fnac_darty_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "2", note: "retail banners (Fnac + Darty)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.fnacdarty.com/en" },
  ],
};

// haleon
export const haleon_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "25", note: "consumer-health brands (Sensodyne, Voltaren, Panadol, Centrum, Advil)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.haleon.com/our-brands" },
  ],
};

// heineken
export const heineken_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "300+", note: "beer + cider brands sold in 190 countries" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.theheinekencompany.com/our-company/our-brands" },
  ],
};

// hellofresh
export const hellofresh_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "8", note: "meal-kit brands" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.hellofreshgroup.com/en/our-brands/" },
  ],
};

// henkel
export const henkel_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "50+", note: "brands across Adhesive Technologies + Consumer Brands" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.henkel.com/brands" },
  ],
};

// hermes
export const hermes_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single Maison across 16 métiers" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://finance.hermes.com" },
  ],
};

// hm
export const hm_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "8", note: "store brands (H&M, COS, Arket, Weekday, Monki, Other Stories, H&M Home, & Other Stories)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://hmgroup.com/about-us/brands/" },
  ],
};

// ikea
export const ikea_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "2", note: "core retailers (IKEA Retail under Ingka + IKEA Industry)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.ikea.com" },
  ],
};

// inditex
export const inditex_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "8", note: "store brands (Zara, Pull&Bear, Massimo Dutti, Bershka, Stradivarius, Oysho, Zara Home, Lefties)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.inditex.com/itxcomweb/en/about-us/our-brands" },
  ],
};

// jeronimo-martins
export const jeronimo_martins_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "3", note: "retail banners (Pingo Doce, Recheio, Biedronka)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.jeronimomartins.com/en/about-us/companies-and-brands/" },
  ],
};

// kering
export const kering_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "6", note: "luxury houses (Gucci, YSL, Bottega Veneta, Balenciaga, McQueen, Brioni)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.kering.com/en/houses/" },
  ],
};

// kingfisher
export const kingfisher_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "4", note: "DIY banners (B&Q, Castorama, Brico Dépôt, Screwfix)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.kingfisher.com/en/our-business/our-brands.html" },
  ],
};

// lavazza
export const lavazza_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "4", note: "coffee brands (Lavazza, Carte Noire, Kicking Horse, Merrild)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.lavazzagroup.com/en/our-brands.html" },
  ],
};

// lego
export const lego_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single LEGO brand" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.lego.com/en-us/aboutus" },
  ],
};

// loreal
export const loreal_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "36", note: "international brands across 4 divisions" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.loreal.com/en/our-global-brands-portfolio/" },
  ],
};

// lotus-bakeries
export const lotus_bakeries_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "4", note: "Lotus, Lotus Biscoff, Trek/Nakd, BEAR" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.lotusbakeries.com/our-brands" },
  ],
};

// lvmh
export const lvmh_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "75", note: "named maisons across 6 business groups" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.lvmh.com/houses/" },
  ],
};

// mango
export const mango_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single Mango brand" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.mango.com" },
  ],
};

// marks-spencer
export const marks_spencer_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single Marks & Spencer brand (Food + Clothing & Home)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://corporate.marksandspencer.com" },
  ],
};

// nespresso
export const nespresso_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single Nestlé Group coffee brand" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.nestle-nespresso.com" },
  ],
};

// nestle
export const nestle_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "2000+", note: "brands across 7 categories" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.nestle.com/brands" },
  ],
};

// ocado
export const ocado_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "3", note: "Ocado Retail + Ocado Logistics + Ocado Technology" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.ocadogroup.com" },
  ],
};

// on-running
export const on_running_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single On brand" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.on.com" },
  ],
};

// pernod-ricard
export const pernod_ricard_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "240", note: "premium brands across spirits + champagne + wine" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.pernod-ricard.com/en/brands" },
  ],
};

// puig
export const puig_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "25+", note: "fashion + beauty brands across fashion-fragrance, makeup, skincare" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.puig.com/en/our-brands/" },
  ],
};

// reckitt
export const reckitt_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "11", note: "Powerbrands (Dettol, Lysol, Durex, Strepsils, Nurofen, Mucinex, Gaviscon, Finish, Vanish, Harpic, Veet)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.reckitt.com/brands" },
  ],
};

// richemont
export const richemont_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "28", note: "maisons (4 jewellery, 8 watchmakers, 16 fashion/other)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.richemont.com/en/home/maisons/" },
  ],
};

// sainsburys
export const sainsburys_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "3", note: "Sainsbury's, Argos, Habitat banners" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.about.sainsburys.co.uk/about-us/our-brands" },
  ],
};

// sodexo
export const sodexo_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1+", note: "Sodexo brand + sub-brands across food + facilities" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.sodexo.com/brands" },
  ],
};

// tesco
export const tesco_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1+", note: "Tesco + own-brands (Tesco Finest, F&F, Booker, One Stop)" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.tescoplc.com/our-business/" },
  ],
};

// unilever
export const unilever_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "400+", note: "brands across Beauty & Wellbeing, Personal Care, Home Care, Foods, Ice Cream" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://www.unilever.com/brands/" },
  ],
};

// zalando
export const zalando_b5: Partial<CompanyTemplateData> = {
  investor: {
    operatingComplexity: {
      brands: { value: "1", note: "single Zalando platform + private labels" },
    },
  },
  furtherReading: [
    { label: "🌐 Brand portfolio", url: "https://corporate.zalando.com" },
  ],
};

export const batch5: Record<string, Partial<CompanyTemplateData>> = {
  "ab-inbev": ab_inbev_b5,
  "adidas": adidas_b5,
  "ahold-delhaize": ahold_delhaize_b5,
  "arla": arla_b5,
  "asos": asos_b5,
  "barilla": barilla_b5,
  "beiersdorf": beiersdorf_b5,
  "burberry": burberry_b5,
  "campari": campari_b5,
  "carlsberg": carlsberg_b5,
  "carrefour": carrefour_b5,
  "colruyt": colruyt_b5,
  "danone": danone_b5,
  "decathlon": decathlon_b5,
  "diageo": diageo_b5,
  "essity": essity_b5,
  "estee-lauder": estee_lauder_b5,
  "fenty-beauty": fenty_beauty_b5,
  "ferrero": ferrero_b5,
  "fnac-darty": fnac_darty_b5,
  "haleon": haleon_b5,
  "heineken": heineken_b5,
  "hellofresh": hellofresh_b5,
  "henkel": henkel_b5,
  "hermes": hermes_b5,
  "hm": hm_b5,
  "ikea": ikea_b5,
  "inditex": inditex_b5,
  "jeronimo-martins": jeronimo_martins_b5,
  "kering": kering_b5,
  "kingfisher": kingfisher_b5,
  "lavazza": lavazza_b5,
  "lego": lego_b5,
  "loreal": loreal_b5,
  "lotus-bakeries": lotus_bakeries_b5,
  "lvmh": lvmh_b5,
  "mango": mango_b5,
  "marks-spencer": marks_spencer_b5,
  "nespresso": nespresso_b5,
  "nestle": nestle_b5,
  "ocado": ocado_b5,
  "on-running": on_running_b5,
  "pernod-ricard": pernod_ricard_b5,
  "puig": puig_b5,
  "reckitt": reckitt_b5,
  "richemont": richemont_b5,
  "sainsburys": sainsburys_b5,
  "sodexo": sodexo_b5,
  "tesco": tesco_b5,
  "unilever": unilever_b5,
  "zalando": zalando_b5,
};
