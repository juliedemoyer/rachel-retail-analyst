// batch6_peers — same-subsector peer comparisons.
//
// Loads after batch2..5 and the enriched/lvmh layers, but BEFORE final
// hand-rebuilt records. Replaces the cross-sector peer entries shipped in
// batch2 (e.g. "Adidas vs H&M", "Arla vs AB InBev") with same-subsector peers
// drawn from `peer-map.ts`. The deep-merge in `index.ts` replaces the
// peerComparison array wholesale, which is what we want.
//
// Prose template per peer keeps the structure consistent: "<Peer> is a same-
// subsector peer (<subsector label>). Useful read on how a comparable
// operating model signals AI to the market." A second peer (or external) is
// added when the subsector has more than one watchlist member.

import type { CompanyTemplateData, PeerComparison } from "../schema";
import { SUBSECTOR, SUBSECTOR_LABEL, EXTERNAL_PEERS, type Subsector } from "./peer-map";

// Display name lookup for watchlist slugs. Kept here (instead of importing
// from stubs) so this file doesn't pull in the 80KB stubs module.
const NAME: Record<string, string> = {
  "ab-inbev": "AB InBev",
  "adidas": "Adidas",
  "ahold-delhaize": "Ahold Delhaize",
  "arla": "Arla Foods",
  "asos": "ASOS",
  "barilla": "Barilla",
  "beiersdorf": "Beiersdorf",
  "burberry": "Burberry",
  "campari": "Campari Group",
  "carlsberg": "Carlsberg",
  "carrefour": "Carrefour",
  "colruyt": "Colruyt Group",
  "danone": "Danone",
  "decathlon": "Decathlon",
  "diageo": "Diageo",
  "essity": "Essity",
  "estee-lauder": "Estée Lauder",
  "ferrero": "Ferrero",
  "fnac-darty": "Fnac Darty",
  "haleon": "Haleon",
  "heineken": "Heineken",
  "hellofresh": "HelloFresh",
  "henkel": "Henkel",
  "hermes": "Hermès",
  "hm": "H&M",
  "ikea": "IKEA / Ingka",
  "inditex": "Inditex",
  "jeronimo-martins": "Jeronimo Martins",
  "kering": "Kering",
  "kingfisher": "Kingfisher",
  "lavazza": "Lavazza",
  "lego": "LEGO Group",
  "loreal": "L'Oréal",
  "lotus-bakeries": "Lotus Bakeries",
  "lvmh": "LVMH",
  "mango": "Mango",
  "marks-spencer": "Marks & Spencer",
  "nespresso": "Nespresso",
  "nestle": "Nestlé",
  "ocado": "Ocado",
  "on-running": "On Running",
  "pernod-ricard": "Pernod Ricard",
  "puig": "Puig",
  "reckitt": "Reckitt",
  "richemont": "Richemont",
  "sainsburys": "Sainsbury's",
  "sodexo": "Sodexo",
  "tesco": "Tesco",
  "unilever": "Unilever",
  "zalando": "Zalando",
};

function buildPeers(slug: string): PeerComparison[] | undefined {
  const subsector = SUBSECTOR[slug];
  if (!subsector) return undefined;
  const label = SUBSECTOR_LABEL[subsector];
  const me = NAME[slug] ?? slug;

  // Same-subsector watchlist peers, deterministic order
  const watchlistPeers = Object.entries(SUBSECTOR)
    .filter(([s, sub]) => sub === subsector && s !== slug)
    .map(([s]) => s)
    .sort();

  const out: PeerComparison[] = [];

  // First peer: prefer a watchlist peer; otherwise an external reference.
  const firstWatch = watchlistPeers[0];
  if (firstWatch) {
    out.push({
      peer: NAME[firstWatch] ?? firstWatch,
      note: `${NAME[firstWatch] ?? firstWatch} is a same-subsector peer (${label}). Useful read on how a comparable operating model signals AI to the market versus ${me}.`,
    });
  } else {
    const ext = EXTERNAL_PEERS[subsector]?.[0];
    if (ext) {
      out.push({
        peer: ext,
        note: `${ext} is a non-watchlist reference peer in the same subsector (${label}). Useful external benchmark for ${me}'s AI posture.`,
      });
    }
  }

  // Second peer (rust-accent for visual contrast): another watchlist peer if
  // we have one, else the second external reference.
  const secondWatch = watchlistPeers[1];
  if (secondWatch) {
    out.push({
      peer: NAME[secondWatch] ?? secondWatch,
      note: `${NAME[secondWatch] ?? secondWatch} is another same-subsector peer (${label}). Three-way read against ${me}'s positioning.`,
      accent: "rust",
    });
  } else if (firstWatch) {
    // Subsector has exactly one watchlist peer; supplement with one external
    const ext = EXTERNAL_PEERS[subsector]?.[0];
    if (ext) {
      out.push({
        peer: ext,
        note: `${ext} is a non-watchlist reference peer (${label}). Adds an external benchmark alongside the in-watchlist comparison.`,
        accent: "rust",
      });
    }
  } else {
    const ext2 = EXTERNAL_PEERS[subsector]?.[1];
    if (ext2) {
      out.push({
        peer: ext2,
        note: `${ext2} is a second non-watchlist reference peer in the same subsector (${label}).`,
        accent: "rust",
      });
    }
  }

  return out.length > 0 ? out : undefined;
}

function buildAll(): Record<string, Partial<CompanyTemplateData>> {
  const out: Record<string, Partial<CompanyTemplateData>> = {};
  for (const slug of Object.keys(SUBSECTOR)) {
    const peers = buildPeers(slug);
    if (peers) out[slug] = { peerComparison: peers };
  }
  return out;
}

export const batch6_peers: Record<string, Partial<CompanyTemplateData>> = buildAll();
