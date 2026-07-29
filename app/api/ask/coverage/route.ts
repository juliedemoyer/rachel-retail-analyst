import { listDocs } from "@/lib/kb/embed";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 min — coverage barely changes between syncs

export async function GET() {
  const docs = await listDocs();

  const byClass: Record<string, number> = {};
  const companySlugs = new Set<string>();
  let latestBriefDate: string | null = null;

  for (const d of docs) {
    const cls =
      d.tags?.find((t) =>
        [
          "company-profile",
          "investor-filing",
          "rachel-brief",
          "rachel-domain",
          "pulse-item",
          "market-calendar",
        ].includes(t),
      ) ?? "uncategorised";
    byClass[cls] = (byClass[cls] ?? 0) + 1;

    for (const id of d.accountIds ?? []) companySlugs.add(id);

    if (cls === "rachel-brief" && d.publishedAt) {
      if (!latestBriefDate || d.publishedAt > latestBriefDate) {
        latestBriefDate = d.publishedAt;
      }
    }
  }

  return Response.json({
    totalDocs: docs.length,
    byClass,
    companiesCovered: companySlugs.size,
    latestBriefDate,
  });
}
