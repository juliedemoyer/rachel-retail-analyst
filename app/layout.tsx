import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import PostHogProvider from "@/app/components/PostHogProvider";
import "./theme.css";

export const metadata = {
  metadataBase: new URL("https://your-domain.example"),
  title: "Rachel Retail, The AI Intelligence Database for Consumer & Retail",
  description:
    "Vendor-neutral intelligence on AI adoption across EMEA retail and consumer brands. Track LVMH, Kering, Inditex, Carrefour and 50+ companies in one place.",
  keywords: [
    "retail AI intelligence",
    "EMEA retail",
    "consumer brands AI",
    "vendor analysis",
    "AI maturity",
    "LVMH AI",
    "Kering AI",
    "Inditex AI",
  ],
  alternates: { canonical: "https://your-domain.example" },
  openGraph: {
    title: "Rachel Retail, The AI Intelligence Database for Consumer & Retail",
    description:
      "Vendor-neutral intelligence on AI adoption across EMEA retail and consumer brands.",
    url: "https://your-domain.example",
    siteName: "Rachel Retail",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rachel Retail, The AI Intelligence Database for Consumer & Retail",
    description:
      "Vendor-neutral intelligence on AI adoption across EMEA retail and consumer brands.",
  },
  robots: { index: true, follow: true },
  // Your own Google Search Console token, if you use one: Search Console →
  // Settings → Ownership verification → HTML tag. Unset in the template, so
  // no verification meta tag is emitted.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://your-domain.example/#website",
      url: "https://your-domain.example",
      name: "Rachel Retail",
      description: "Vendor-neutral intelligence on AI adoption across EMEA retail and consumer brands.",
      inLanguage: "en-GB",
    },
    {
      "@type": "Organization",
      "@id": "https://your-domain.example/#organization",
      name: "Rachel Retail",
      url: "https://your-domain.example",
      description: "AI intelligence database tracking 50+ EMEA retail and consumer brands.",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="rachel-v2">
          <PostHogProvider>{children}</PostHogProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
