import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "";
const FROM_EMAIL   = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json() as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend || !NOTIFY_EMAIL) {
      // Log and succeed silently so the user gets confirmation even without email
      console.warn("Contact form: Resend not configured, message dropped", { name, email, message });
      return NextResponse.json({ ok: true });
    }

    const displayName = name?.trim() || "Someone";
    const replyTo     = email?.trim() || undefined;

    await resend.emails.send({
      from:    FROM_EMAIL,
      to:      NOTIFY_EMAIL,
      replyTo,
      subject: `Rachel Retail: message from ${displayName}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:540px;margin:0 auto;padding:32px 24px;color:#1C1914;background:#F0EAE0">
          <p style="font-family:'Space Grotesk',sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#B34E2A;margin:0 0 8px">Rachel Retail · Contact form</p>
          <h2 style="font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin:0 0 20px">Message from ${displayName}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px">
            <tr><td style="padding:8px 12px;background:#E8E2D5;font-weight:500;width:80px">Name</td><td style="padding:8px 12px;background:#E8E2D5">${displayName}</td></tr>
            <tr><td style="padding:8px 12px;background:#EDE7D9;font-weight:500">Email</td><td style="padding:8px 12px;background:#EDE7D9">${replyTo ?? "—"}</td></tr>
            <tr><td style="padding:8px 12px;background:#E8E2D5;font-weight:500;vertical-align:top">Message</td><td style="padding:8px 12px;background:#E8E2D5;white-space:pre-wrap">${message.trim()}</td></tr>
          </table>
          ${replyTo ? `<a href="mailto:${replyTo}" style="display:inline-block;background:#B34E2A;color:#fff;text-decoration:none;padding:10px 22px;border-radius:100px;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600">Reply to ${displayName}</a>` : ""}
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
