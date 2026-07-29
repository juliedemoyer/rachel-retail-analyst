import type { MetadataRoute } from "next";

const LAST_MODIFIED = new Date("2026-05-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://your-domain.example",
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
