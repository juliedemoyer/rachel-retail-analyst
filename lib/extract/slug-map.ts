/**
 * Maps PDF filename prefixes → profile slugs.
 *
 * PDF filenames follow the pattern {Prefix}_{doc-type}-{period}.pdf
 * The prefix is the company name in CamelCase / PascalCase.
 * Profile slugs are lowercase-hyphen.
 *
 * Add a new entry here whenever a new company's PDFs land in the IR folder.
 */

export const PDF_PREFIX_TO_SLUG: Record<string, string> = {
  ABInBev:          "ab-inbev",
  ASOS:             "asos",
  Adidas:           "adidas",
  AholdDelhaize:    "ahold-delhaize",
  ArlaFoods:        "arla-foods",
  Beiersdorf:       "beiersdorf",
  Burberry:         "burberry",
  CampariGroup:     "campari-group",
  Carlsberg:        "carlsberg",
  Carrefour:        "carrefour",
  Colruyt:          "colruyt",
  Danone:           "danone",
  Diageo:           "diageo",
  Essity:           "essity",
  EsteeLauder:      "estee-lauder",
  Ferrero:          "ferrero",
  FnacDarty:        "fnac-darty",
  HM:               "hm",
  Heineken:         "heineken",
  Henkel:           "henkel",
  Hermes:           "hermes",
  "IKEA-Ingka":     "ikea",
  IKEA:             "ikea",
  Inditex:          "inditex",
  JeronimoMartins:  "jeronimo-martins",
  Kering:           "kering",
  Kingfisher:       "kingfisher",
  LEGO:             "lego",
  LOreal:           "loreal",
  LVMH:             "lvmh",
  LotusBakeries:    "lotus-bakeries",
  BelGroup:         "bel-group",
  Boots:            "boots",
  Chanel:           "chanel",
  ElCorteIngles:    "el-corte-ingles",
  Givaudan:         "givaudan",
  JDEPeets:         "jde-peets",
  Mango:            "mango",
  MarksSpencer:     "marks-spencer",
  Migros:           "migros",
  Moncler:          "moncler",
  PradaGroup:       "prada-group",
  SchwarzGroup:     "schwarz-group",
  Nestle:           "nestle",
  Ocado:            "ocado",
  OnRunning:        "on-running",
  PernodRicard:     "pernod-ricard",
  Puig:             "puig",
  Reckitt:          "reckitt",
  Richemont:        "richemont",
  Sainsburys:       "sainsburys",
  Sodexo:           "sodexo",
  Tesco:            "tesco",
  Unilever:         "unilever",
  Unliever:         "unilever",   // typo in some filenames
  Zalando:          "zalando",
};

/**
 * Extract the company prefix from a PDF filename.
 * "LVMH_annual-report-fy2025.pdf" → "LVMH"
 */
export function getPdfPrefix(filename: string): string | null {
  // Strip directory path if present
  const base = filename.split("/").pop() ?? filename;
  const match = base.match(/^([A-Za-z][A-Za-z0-9-]*)_/);
  return match ? match[1] : null;
}

/**
 * Resolve a PDF filename to a profile slug. Returns null if unknown.
 */
export function slugFromFilename(filename: string): string | null {
  const prefix = getPdfPrefix(filename);
  if (!prefix) return null;
  return PDF_PREFIX_TO_SLUG[prefix] ?? null;
}

/** All slugs we have a prefix mapping for (de-duped). */
export const ALL_MAPPED_SLUGS = [...new Set(Object.values(PDF_PREFIX_TO_SLUG))].sort();
