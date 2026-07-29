import type { KbSearchResult } from "./types";

const TIER_BOOST: Record<1 | 2 | 3, number> = { 1: 0.15, 2: 0.05, 3: 0 };

const HALF_LIFE_DAYS_BY_SOURCE: Partial<Record<string, number>> = {
  industry_press: 60,
  josh_briefing: 30,
};

function recencyBoost(publishedAt: string | undefined, source: string): number {
  if (!publishedAt) return 0;
  const halfLife = HALF_LIFE_DAYS_BY_SOURCE[source];
  if (!halfLife) return 0;
  const ageDays =
    (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60 * 24);
  if (!Number.isFinite(ageDays) || ageDays < 0) return 0;
  return 0.1 * Math.pow(0.5, ageDays / halfLife);
}

type RerankProvider = "cohere" | "voyage" | "none";

function provider(): RerankProvider {
  if (process.env.COHERE_API_KEY) return "cohere";
  if (process.env.VOYAGE_API_KEY) return "voyage";
  return "none";
}

async function cohereRerank(
  query: string,
  results: KbSearchResult[],
): Promise<number[] | null> {
  try {
    const res = await fetch("https://api.cohere.com/v2/rerank", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "rerank-v3.5",
        query,
        documents: results.map((r) => r.chunk.text.slice(0, 4000)),
        top_n: results.length,
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      results: Array<{ index: number; relevance_score: number }>;
    };
    const scores = new Array<number>(results.length).fill(0);
    for (const r of json.results) scores[r.index] = r.relevance_score;
    return scores;
  } catch {
    return null;
  }
}

export async function rerank(
  query: string,
  results: KbSearchResult[],
  topN: number,
): Promise<KbSearchResult[]> {
  if (results.length === 0) return results;

  const ce =
    provider() === "cohere" ? await cohereRerank(query, results) : null;

  const scored = results.map((r, i) => {
    const ceScore = ce ? ce[i] : r.score;
    const tier = TIER_BOOST[r.doc.tier];
    const recency = recencyBoost(r.doc.publishedAt, r.doc.source);
    return { r, finalScore: ceScore + tier + recency };
  });

  scored.sort((a, b) => b.finalScore - a.finalScore);
  return scored.slice(0, topN).map(({ r, finalScore }) => ({
    ...r,
    score: finalScore,
  }));
}
