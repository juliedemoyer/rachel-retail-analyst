import { randomUUID } from "node:crypto";

import { z } from "zod";

import { ingestDocument } from "@/lib/kb/embed";
import type { DocSource, DocTier } from "@/lib/kb/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const BodySchema = z.object({
  url: z.string().url(),
  title: z.string().min(1).max(300).optional(),
  source: z
    .enum([
      "strategy_firm",
      "vendor_stack",
      "ir_filing",
      "industry_press",
      "analyst_report",
      "framework",
      "manual_upload",
    ])
    .default("industry_press"),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
  accountIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Rough Readability-style HTML → text extractor. Zero dependencies, so it
 * boots instantly in a serverless cold start. Strips scripts/styles/nav,
 * keeps paragraph structure. Phase 2 can swap in @mozilla/readability if
 * recall needs improvement.
 */
function htmlToText(html: string): { title: string | null; text: string } {
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : null;

  // Prefer <main> or <article> if present.
  const mainMatch = html.match(/<(main|article)\b[\s\S]*?<\/\1>/i);
  const source = mainMatch ? mainMatch[0] : html;

  const stripped = source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    // Turn block closers into paragraph breaks before stripping tags.
    .replace(/<\/(p|div|section|li|h[1-6]|blockquote|article)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { title, text: decodeEntities(stripped) };
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

export async function POST(req: Request) {
  const requestId = randomUUID();
  const started = Date.now();
  console.log(
    JSON.stringify({ level: "info", msg: "start", route: "/api/ingest/url", requestId }),
  );

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return Response.json(
        { error: "Invalid body", issues: parsed.error.issues },
        { status: 400 },
      );
    }
    const body = parsed.data;

    const fetched = await fetch(body.url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; RachelBot/0.1; +https://your-deployment.vercel.app)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!fetched.ok) {
      return Response.json(
        { error: `Fetch failed: ${fetched.status} ${fetched.statusText}` },
        { status: 502 },
      );
    }
    const html = await fetched.text();
    const { title: extractedTitle, text } = htmlToText(html);

    if (!text || text.length < 200) {
      return Response.json(
        { error: "Extracted text too short — page may be JS-rendered or behind a paywall" },
        { status: 422 },
      );
    }

    const title = body.title ?? extractedTitle ?? body.url;
    const result = await ingestDocument({
      title,
      text,
      source: body.source as DocSource,
      tier: body.tier as DocTier,
      url: body.url,
      accountIds: body.accountIds,
      tags: body.tags,
    });

    const ms = Date.now() - started;
    console.log(
      JSON.stringify({
        level: "info",
        msg: "done",
        route: "/api/ingest/url",
        requestId,
        ms,
        docId: result.docId,
        chunkCount: result.chunkCount,
        deduped: result.deduped,
      }),
    );

    return Response.json({
      ok: true,
      docId: result.docId,
      chunkCount: result.chunkCount,
      deduped: result.deduped,
      title,
    });
  } catch (error) {
    const ms = Date.now() - started;
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      JSON.stringify({
        level: "error",
        msg: "ingest_url_failed",
        route: "/api/ingest/url",
        requestId,
        ms,
        error: message,
      }),
    );
    return Response.json({ error: message }, { status: 500 });
  }
}
