import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Phase 0 foundations. Cache Components will be enabled once vendor
  // lens / trends surfaces land — keeping it off for now avoids churn on
  // the legacy JS dashboard still mounted at app/page.js.
  // cacheComponents: true,

  async rewrites() {
    return [
      // Serve the hand-written static landing.html at the apex. With
      // `cleanUrls: true` in vercel.json the file is mapped to /landing
      // (extension stripped); rewriting to the .html path causes a
      // 308 → /landing redirect inside the rewrite, which 404s the apex.
      { source: "/", destination: "/landing" },
      // Note: /app is now handled by app/(product)/app/page.tsx (which
      // redirects to /app/priority). The previous rewrite to /app.html
      // shadowed that page, so it's been removed.
    ];
  },

  async redirects() {
    return [
      // Old invitation emails referenced /wireframes.html; bounce to the
      // new clean URL.
      {
        source: "/wireframes.html",
        destination: "/app",
        permanent: false,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  // Only upload source maps when a real DSN is configured
  sourcemaps: { disable: !process.env.SENTRY_DSN },
  // Disable Sentry's automatic instrumentation wrappers — we use explicit
  // wrappers only where we need them, to avoid wrapping every route.
  autoInstrumentServerFunctions: false,
  autoInstrumentMiddleware: false,
  autoInstrumentAppDirectory: false,
});
