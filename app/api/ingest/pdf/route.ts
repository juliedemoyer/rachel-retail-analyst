import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { extractText, getDocumentProxy } from "unpdf";
import { z } from "zod";

import { ingestDocument } from "@/lib/kb/embed";
import type { DocSource, DocTier } from "@/lib/kb/types";

export const runtime = "nodejs";
// PDFs can be large — pdf.js tokenizing is CPU-bound. Give the route
// headroom beyond the default 60s serverless limit.
export const maxDuration = 300;

const MetaSchema = z.object({
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
    .default("manual_upload"),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
  url: z.string().url().optional(),
  publishedAt: z.string().datetime().optional(),
  accountIds: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const requestId = randomUUID();
  const started = Date.now();
  console.log(
    JSON.stringify({ level: "info", msg: "start", route: "/api/ingest/pdf", requestId }),
  );

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return Response.json({ error: "Missing `file` in multipart form" }, { status: 400 });
    }
    if (file.type && file.type !== "application/pdf") {
      return Response.json(
        { error: `Expected application/pdf, got ${file.type}` },
        { status: 400 },
      );
    }

    const metaRaw = form.get("meta");
    const metaParsed = metaRaw
      ? MetaSchema.safeParse(JSON.parse(String(metaRaw)))
      : MetaSchema.safeParse({});
    if (!metaParsed.success) {
      return Response.json(
        { error: "Invalid meta", issues: metaParsed.error.issues },
        { status: 400 },
      );
    }
    const meta = metaParsed.data;

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    // 1. Upload the raw PDF to Vercel Blob so citations can link back to
    //    the source file. `put()` wants a Blob/Buffer/Readable, so we wrap
    //    the bytes in a File — keeps the original filename as a bonus.
    const blobInput = new File([bytes], file.name, { type: "application/pdf" });
    const blob = await put(`rachel/kb/${randomUUID()}-${file.name}`, blobInput, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });

    // 2. Parse to text with unpdf (pdfjs-dist under the hood, zero native deps).
    const pdf = await getDocumentProxy(bytes);
    const { text } = await extractText(pdf, { mergePages: true });
    const mergedText = Array.isArray(text) ? text.join("\n\n") : text;

    if (!mergedText || mergedText.trim().length < 200) {
      return Response.json(
        { error: "Extracted text too short — PDF may be image-only" },
        { status: 422 },
      );
    }

    // 3. Funnel through the one-and-only KB ingest entry point.
    const title = meta.title ?? file.name.replace(/\.pdf$/i, "");
    const result = await ingestDocument({
      title,
      text: mergedText,
      source: meta.source as DocSource,
      tier: meta.tier as DocTier,
      url: meta.url,
      blobKey: blob.url,
      publishedAt: meta.publishedAt,
      accountIds: meta.accountIds,
      tags: meta.tags,
    });

    const ms = Date.now() - started;
    console.log(
      JSON.stringify({
        level: "info",
        msg: "done",
        route: "/api/ingest/pdf",
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
      blobUrl: blob.url,
      title,
    });
  } catch (error) {
    const ms = Date.now() - started;
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      JSON.stringify({
        level: "error",
        msg: "ingest_pdf_failed",
        route: "/api/ingest/pdf",
        requestId,
        ms,
        error: message,
      }),
    );
    return Response.json({ error: message }, { status: 500 });
  }
}
