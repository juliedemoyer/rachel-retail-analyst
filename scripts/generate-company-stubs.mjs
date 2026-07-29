/**
 * generate-company-stubs.mjs
 *
 * Parses _section.ts HTML to extract company data, then generates
 * minimal MD stub files for companies that don't yet have one.
 *
 * Usage:
 *   node scripts/generate-company-stubs.mjs [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const SECTION_PATH = join(ROOT, "app/(product)/app/companies/_section.ts");
const COMPANIES_DIR = join(ROOT, "data/companies");
const DRY_RUN = process.argv.includes("--dry-run");

// Map data-sector values to MD sector labels
const SECTOR_MAP = {
  grocery: "Grocery",
  luxury: "Luxury & Beauty",
  apparel: "Apparel & Home",
  cpg: "CPG / FMCG",
  ecommerce: "E-commerce",
  sports: "Sports & Outdoor",
};

// Map data-quadrant values to schema quadrant values
const QUADRANT_MAP = {
  performer: "performer",
  narrative_led: "narrative_led",
  silent: "silent_builder",
  not_visible: "not_visible",
  native: "ai_native",
};

// Parse country code from flag emoji or c-meta text
function parseCountry(cmeta) {
  // Pattern: "Sector · Country 🇫🇷" or "Sector &amp; Sub · Country 🇫🇷"
  const flagMatch = cmeta.match(/·\s*([^·🌍\d]+)\s*([\u{1F1E0}-\u{1F1FF}]{2})?/u);
  if (!flagMatch) return { country: "??" };

  const countryRaw = flagMatch[1]?.trim().replace(/&amp;/g, "&").trim();

  // Simple map for common countries
  const countryCodeMap = {
    "Belgium": "BE", "UK": "UK", "Germany": "DE", "France": "FR",
    "Netherlands": "NL", "Denmark": "DK", "Italy": "IT", "Sweden": "SE",
    "Switzerland": "CH", "Spain": "ES", "Norway": "NO", "Finland": "FI",
    "Portugal": "PT", "Austria": "AT", "US": "US", "US (EMEA ops)": "US",
    "Ireland": "IE", "Luxembourg": "LU", "Mexico": "MX", "Japan": "JP",
  };

  const country = countryCodeMap[countryRaw] || countryRaw?.substring(0, 2).toUpperCase() || "??";
  const aiActApplies = ["BE","DE","FR","NL","DK","IT","SE","CH","ES","NO","FI","PT","AT","IE","LU"].includes(country);
  return { country, aiActApplies };
}

// Count on segments in a mini-bar block
function countSegments(barHtml) {
  const matches = barHtml.match(/class="seg on"/g);
  return matches ? matches.length : 0;
}

// Extract text content from HTML
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
}

// Main parser
function parseSection() {
  const raw = readFileSync(SECTION_PATH, "utf8");

  // Extract each company card block
  const cardRegex = /<!-- ([^-]+) -->\s*<a class="company-card" href="\/app\/companies\/([^"]+)" data-sector="([^"]+)" data-quadrant="([^"]+)"[^>]*>([\s\S]*?)(?=\n\s*<!-- |export const sectionHtml)/g;

  const companies = [];
  let match;

  while ((match = cardRegex.exec(raw)) !== null) {
    const [, commentName, slug, sector, quadrant, cardHtml] = match;

    // Extract c-name
    const nameMatch = cardHtml.match(/<span class="c-name">([^<]+)<\/span>/);
    const company = nameMatch ? nameMatch[1].replace(/&amp;/g, "&") : commentName.trim();

    // Extract c-meta (for country)
    const metaMatch = cardHtml.match(/<span class="c-meta">([^<]+)<\/span>/);
    const cmeta = metaMatch ? metaMatch[1] : "";
    const { country, aiActApplies } = parseCountry(cmeta);

    // Extract rhetoric + production scores from mini-bars
    const miniBarMatches = [...cardHtml.matchAll(/<div class="mini-bar">([\s\S]*?)<\/div>/g)];
    const rhetoric = miniBarMatches[0] ? countSegments(miniBarMatches[0][1]) : 2;
    const production = miniBarMatches[1] ? countSegments(miniBarMatches[1][1]) : 1;

    // Composite score (simple average, scaled to 5)
    const composite = ((rhetoric + production) / 2).toFixed(1);

    // Extract vendor chips
    const chipMatches = [...cardHtml.matchAll(/<span class="source-chip"[^>]*>([^<]+)<\/span>/g)];
    const chips = chipMatches.map((m) => m[1].trim());

    // Extract financials text
    const finMatch = cardHtml.match(/Revenue:.*?(?=<\/div>)/s);
    const financialsRaw = finMatch ? stripHtml(finMatch[0]) : "";

    // Parse revenue from financials
    const revMatch = financialsRaw.match(/Revenue:\s*([^\s]+)\s*\(([^)]+)\)/);
    const revAbsolute = revMatch ? revMatch[1] : "";
    const revGrowth = revMatch ? revMatch[2] : "";

    // Extract notes
    const notesMatch = cardHtml.match(/<div class="cc-notes">([^<]+)<\/div>/);
    const notes = notesMatch ? notesMatch[1].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim() : "";

    // Vendor relationships from cc-vendor-row
    const vendorRows = [...cardHtml.matchAll(/<div class="cc-vendor-row">([\s\S]*?)(?=<div class="cc-vendor-row">|<div class="cc-notes">)/g)];
    const vendors = [];
    for (const [, rowHtml] of vendorRows) {
      const nameM = rowHtml.match(/cc-vendor-name[^>]*>.*?<\/span>([^<]+)/);
      const tierM = rowHtml.match(/evidence-tier ([^"]+)"/);
      if (nameM && tierM) {
        const vendorName = nameM[1].trim();
        const tier = tierM[1].trim(); // confirmed, estimated, signalled
        if (tier !== "none") vendors.push({ name: vendorName, tier });
      }
    }

    // Determine primary vendor for aiAnalyticsStack
    const hasMs = chips.some((c) => /azure|m365|microsoft|copilot/i.test(c));
    const hasGc = chips.some((c) => /gcp|google cloud/i.test(c));
    const hasAws = chips.some((c) => /aws|amazon/i.test(c));

    // Sector for MD
    const mdSector = SECTOR_MAP[sector] || sector;

    // Quadrant for MD
    const mdQuadrant = QUADRANT_MAP[quadrant] || quadrant;

    companies.push({
      slug,
      company,
      country,
      aiActApplies,
      sector: mdSector,
      quadrant: mdQuadrant,
      rhetoric,
      production,
      composite,
      chips,
      vendors,
      notes,
      revAbsolute,
      revGrowth,
      hasMs,
      hasGc,
      hasAws,
    });
  }

  return companies;
}

function generateStub(c) {
  const msVendor = c.vendors.find((v) => v.name.includes("Microsoft"));
  const gcVendor = c.vendors.find((v) => v.name.includes("Google"));
  const anVendor = c.vendors.find((v) => v.name.includes("Anthropic"));

  const vendorLines = [];
  if (msVendor) vendorLines.push(`    - { name: "Microsoft", sourceUrl: "https://www.microsoft.com", evidenceTier: ${msVendor.tier === "confirmed" ? "confirmed" : msVendor.tier === "estimated" ? "estimated" : "estimated"} }`);
  if (gcVendor) vendorLines.push(`    - { name: "Google Cloud", sourceUrl: "https://cloud.google.com", evidenceTier: ${gcVendor.tier === "confirmed" ? "confirmed" : "estimated"} }`);
  if (anVendor) vendorLines.push(`    - { name: "Anthropic", sourceUrl: "https://anthropic.com", evidenceTier: ${anVendor.tier === "confirmed" ? "confirmed" : "estimated"} }`);

  const stackLines = [];
  if (c.hasMs) stackLines.push(`    - { tech: "Azure", layer: cloud, evidenceTier: estimated }`);
  if (c.hasGc) stackLines.push(`    - { tech: "Google Cloud", layer: cloud, evidenceTier: estimated }`);
  if (c.hasAws) stackLines.push(`    - { tech: "AWS", layer: cloud, evidenceTier: estimated }`);

  return `---
slug: ${c.slug}
meta:
  company: ${c.company}
  hq: { city: "?", country: ${c.country}, aiActApplies: ${c.aiActApplies} }
  sector: ${c.sector}
  isGroup: false
  isAINative: false

investorSnapshot:
  revenue: { absolute: 0, currency: "?", yoyOrganicPct: 0, sourceUrl: "?", evidenceTier: estimated }
  operatingProfit: { absolute: 0, currency: "?", marginPct: 0, yoyPct: 0, sourceUrl: "?", evidenceTier: estimated }
  netCash: { absolute: 0, currency: "?", netDebtToEbitda: 0, sourceUrl: "?", evidenceTier: estimated }
  employees: { headcount: 0, sourceUrl: "?", evidenceTier: estimated }
  maisons: []
  retailStores: { total: 0, byType: [], sourceUrl: "?", evidenceTier: estimated }
  countries: { count: 1, regions: [EMEA], sourceUrl: "?" }
  hq: { city: "?", country: ${c.country}, aiActApplies: ${c.aiActApplies} }
  languages: [en]
  reporting: { latestReportDate: 2025-12-31, nextTradingUpdate: null }
  revenueStreams: []

aiPerception:
  score: { rhetoric: ${c.rhetoric}, production: ${c.production}, quadrant: ${c.quadrant}, rubricVersion: "1.0" }
  namedProductionTools: []
  aiFraming: { value: efficiency, evidenceTier: estimated }
  quantifiedROI: { stated: false }
  consumerFacingAIProduct: { exists: false }
  vendorPartners:
${vendorLines.length ? vendorLines.join("\n") : "    []"}
  aiAnalyticsStack:
${stackLines.length ? stackLines.join("\n") : "    []"}
  cSuiteAIPresenter: { exists: false, evidenceTier: estimated }
  genAIMentioned: { value: ${c.rhetoric >= 3}, mentions: 0, sourceUrl: "?", evidenceTier: estimated }
  dedicatedAISection: { value: false, evidenceTier: estimated }
  maisonHighlights: []
---

## Rachel's notes

${c.notes || "Stub generated from companies card. Update with sourced intel."}
`;
}

// Run
const companies = parseSection();
console.log(`Parsed ${companies.length} companies from _section.ts`);

const existing = new Set(readdirSync(COMPANIES_DIR).map((f) => f.replace(/\.md$/, "")));
console.log(`Existing MD files: ${existing.size} (${[...existing].join(", ")})`);

let created = 0;
let skipped = 0;

for (const c of companies) {
  if (existing.has(c.slug)) {
    skipped++;
    console.log(`  skip  ${c.slug}  (already has MD file)`);
    continue;
  }

  const path = join(COMPANIES_DIR, `${c.slug}.md`);
  if (DRY_RUN) {
    console.log(`  [dry] would create  ${c.slug}.md`);
  } else {
    writeFileSync(path, generateStub(c), "utf8");
    console.log(`  +     ${c.slug}.md`);
  }
  created++;
}

console.log(`\nDone. ${created} stubs ${DRY_RUN ? "would be " : ""}created, ${skipped} skipped.`);
