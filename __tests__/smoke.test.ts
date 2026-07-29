/**
 * Smoke tests — no network, no Redis, no Clerk.
 * Tests auth logic, response shapes, and utility functions.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// Top-level mocks — hoisted before any imports by Vitest's module system
vi.mock("../lib/redis", () => ({ redis: { get: vi.fn(), set: vi.fn() } }));
vi.mock("@clerk/nextjs/server", () => ({ clerkClient: vi.fn(), auth: vi.fn() }));

// ── /api/health ───────────────────────────────────────────────────────────────

describe("GET /api/health", () => {
  it("returns ok:true with a numeric timestamp", async () => {
    const { GET } = await import("../app/api/health/route");
    const res = await GET();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(typeof body.ts).toBe("number");
    expect(res.status).toBe(200);
  });
});

// ── /api/cron auth ────────────────────────────────────────────────────────────

describe("GET /api/cron — auth guard", () => {
  beforeEach(() => {
    vi.stubEnv("CRON_SECRET", "test-secret");
  });

  it("rejects missing Authorization header with 401", async () => {
    const { GET } = await import("../app/api/cron/route");
    const req = new Request("https://your-domain.example/api/cron?job=rss-poll");
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("rejects wrong secret with 401", async () => {
    const { GET } = await import("../app/api/cron/route");
    const req = new Request("https://your-domain.example/api/cron?job=rss-poll", {
      headers: { Authorization: "Bearer wrong-secret" },
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("rejects unknown job name with 400", async () => {
    const { GET } = await import("../app/api/cron/route");
    const req = new Request("https://your-domain.example/api/cron?job=does-not-exist", {
      headers: { Authorization: "Bearer test-secret" },
    });
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/unknown job/i);
  });
});

// ── lib/admin — isAdminEmail ──────────────────────────────────────────────────

describe("isAdminEmail", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_EMAIL", "admin@your-domain.example");
  });

  it("returns true for the configured admin email (case-insensitive)", async () => {
    const { isAdminEmail } = await import("../lib/admin");
    expect(isAdminEmail("Admin@Example.com")).toBe(true);
    expect(isAdminEmail("admin@your-domain.example")).toBe(true);
  });

  it("returns false for any other email", async () => {
    const { isAdminEmail } = await import("../lib/admin");
    expect(isAdminEmail("other@example.com")).toBe(false);
    expect(isAdminEmail(null)).toBe(false);
    expect(isAdminEmail(undefined)).toBe(false);
  });
});
