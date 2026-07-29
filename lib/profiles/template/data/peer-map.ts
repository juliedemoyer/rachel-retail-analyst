// Subsector → peer map. Source of truth for peerComparison entries on
// company profile pages. The coarse `sectorPath` buckets used elsewhere
// (Apparel & E-commerce, CPG / FMCG, etc.) are too wide for meaningful
// peer comparison: Adidas vs H&M is not a like-for-like read, but both
// live under "Apparel & E-commerce". This map narrows that down.
//
// Each entry lists the watchlist companies in the subsector. When a company
// asks for peers, draw from its subsector first; if there is only one other
// company in the subsector, fall back to one external (non-watchlist) reference
// peer named in `externalReference` so the comparison still has weight.

export type Subsector =
  | "sportswear"
  | "sports-retail"
  | "fast-fashion"
  | "general-retail"
  | "home-improvement"
  | "furniture-home"
  | "luxury-fashion"
  | "luxury-beauty"
  | "beer"
  | "spirits"
  | "coffee"
  | "dairy"
  | "confectionery-snacks"
  | "packaged-food"
  | "home-personal-care"
  | "consumer-health"
  | "toys"
  | "meal-kits"
  | "foodservice"
  | "grocery"
  | "online-marketplace";

export const SUBSECTOR: Record<string, Subsector> = {
  // Sports
  "adidas": "sportswear",
  "on-running": "sportswear",
  "decathlon": "sports-retail",

  // Apparel
  "hm": "fast-fashion",
  "inditex": "fast-fashion",
  "mango": "fast-fashion",
  "asos": "fast-fashion",
  "zalando": "online-marketplace",

  // General retail
  "marks-spencer": "general-retail",
  "fnac-darty": "general-retail",

  // Home / DIY
  "kingfisher": "home-improvement",
  "ikea": "furniture-home",

  // Luxury
  "lvmh": "luxury-fashion",
  "kering": "luxury-fashion",
  "hermes": "luxury-fashion",
  "richemont": "luxury-fashion",
  "burberry": "luxury-fashion",

  // Beauty
  "loreal": "luxury-beauty",
  "estee-lauder": "luxury-beauty",
  "beiersdorf": "luxury-beauty",
  "puig": "luxury-beauty",

  // Beer
  "ab-inbev": "beer",
  "heineken": "beer",
  "carlsberg": "beer",

  // Spirits
  "diageo": "spirits",
  "pernod-ricard": "spirits",
  "campari": "spirits",

  // Coffee
  "lavazza": "coffee",
  "nespresso": "coffee",

  // Dairy
  "arla": "dairy",
  "danone": "dairy",

  // Confectionery / snacks
  "ferrero": "confectionery-snacks",
  "lotus-bakeries": "confectionery-snacks",
  "barilla": "confectionery-snacks",

  // Packaged food (big-cap, multi-category)
  "nestle": "packaged-food",
  "unilever": "packaged-food",

  // Home & personal care
  "reckitt": "home-personal-care",
  "henkel": "home-personal-care",
  "essity": "home-personal-care",

  // Consumer health
  "haleon": "consumer-health",

  // Toys
  "lego": "toys",

  // Meal kits / delivery
  "hellofresh": "meal-kits",

  // Foodservice
  "sodexo": "foodservice",

  // Grocery
  "ahold-delhaize": "grocery",
  "carrefour": "grocery",
  "tesco": "grocery",
  "sainsburys": "grocery",
  "ocado": "grocery",
  "colruyt": "grocery",
  "jeronimo-martins": "grocery",
};

export const SUBSECTOR_LABEL: Record<Subsector, string> = {
  "sportswear": "Sportswear",
  "sports-retail": "Sports retail",
  "fast-fashion": "Fast fashion / apparel",
  "general-retail": "General retail / department",
  "home-improvement": "Home improvement / DIY",
  "furniture-home": "Furniture & home",
  "luxury-fashion": "Luxury fashion & leather",
  "luxury-beauty": "Beauty & personal care",
  "beer": "Beer",
  "spirits": "Spirits",
  "coffee": "Coffee",
  "dairy": "Dairy",
  "confectionery-snacks": "Confectionery & snacks",
  "packaged-food": "Packaged food (multi-category)",
  "home-personal-care": "Home & personal care",
  "consumer-health": "Consumer health (OTC)",
  "toys": "Toys",
  "meal-kits": "Meal kits & delivery",
  "foodservice": "Foodservice",
  "grocery": "Grocery / food retail",
  "online-marketplace": "Online marketplace",
};

// External (non-watchlist) reference peers, used when a subsector has fewer
// than two watchlist members. Useful for sportswear (Nike), spirits (Brown-Forman),
// luxury beauty (Shiseido), etc.
export const EXTERNAL_PEERS: Record<Subsector, string[]> = {
  "sportswear": ["Nike", "Puma", "Under Armour"],
  "sports-retail": ["JD Sports", "Foot Locker"],
  "fast-fashion": ["Uniqlo (Fast Retailing)", "Shein", "Primark"],
  "general-retail": ["John Lewis", "El Corte Inglés"],
  "home-improvement": ["Home Depot", "Lowe's"],
  "furniture-home": ["Maisons du Monde", "Wayfair"],
  "luxury-fashion": ["Prada Group", "Chanel"],
  "luxury-beauty": ["Shiseido", "Coty", "Procter & Gamble (beauty)"],
  "beer": ["Asahi", "Molson Coors"],
  "spirits": ["Brown-Forman", "Rémy Cointreau"],
  "coffee": ["JDE Peet's", "Starbucks (retail)"],
  "dairy": ["FrieslandCampina", "Lactalis", "Yili"],
  "confectionery-snacks": ["Mondelez", "Mars", "Hershey"],
  "packaged-food": ["Mondelez", "Kraft Heinz", "General Mills"],
  "home-personal-care": ["Procter & Gamble", "Colgate-Palmolive"],
  "consumer-health": ["Kenvue", "Bayer Consumer Health"],
  "toys": ["Mattel", "Hasbro"],
  "meal-kits": ["Blue Apron", "Gousto"],
  "foodservice": ["Compass Group", "Aramark"],
  "grocery": ["Walmart", "Kroger", "Aldi"],
  "online-marketplace": ["Amazon", "eBay", "Vinted"],
};

// Build a reverse index: subsector → list of watchlist slugs in it.
export function peersForSlug(slug: string): { subsector: Subsector | null; watchlistPeers: string[]; externals: string[] } {
  const subsector = SUBSECTOR[slug] ?? null;
  if (!subsector) return { subsector: null, watchlistPeers: [], externals: [] };
  const watchlistPeers = Object.entries(SUBSECTOR)
    .filter(([s, sub]) => sub === subsector && s !== slug)
    .map(([s]) => s);
  return { subsector, watchlistPeers, externals: EXTERNAL_PEERS[subsector] ?? [] };
}
