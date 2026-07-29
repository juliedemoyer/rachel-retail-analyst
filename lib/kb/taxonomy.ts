import { z } from "zod";

export const DOC_CLASSES = [
  "company-profile",
  "investor-filing",
  "rachel-brief",
  "rachel-domain",
  "pulse-item",
  "market-calendar",
] as const;

export type DocClass = (typeof DOC_CLASSES)[number];

export const DOC_TIER_BY_CLASS: Record<DocClass, 1 | 2 | 3> = {
  "company-profile": 1,
  "investor-filing": 1,
  "rachel-brief": 2,
  "rachel-domain": 2,
  "market-calendar": 2,
  "pulse-item": 3,
};

export const SECTORS = [
  "grocery",
  "luxury",
  "apparel",
  "cpg",
  "ecommerce",
  "sports",
] as const;
export type Sector = (typeof SECTORS)[number];

export const AI_QUADRANTS = [
  "performer",
  "narrative_led",
  "silent_builder",
  "not_visible",
  "ai_native",
] as const;
export type AiQuadrant = (typeof AI_QUADRANTS)[number];

const ISO_DATE = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}(T.*)?$/, "ISO date expected");

const CommonTags = z.object({
  docClass: z.enum(DOC_CLASSES),
  title: z.string().min(1),
  section: z.string().optional(),
  archived: z.boolean().optional(),
  ingestedAt: ISO_DATE,
});

const CompanyProfileTags = CommonTags.extend({
  docClass: z.literal("company-profile"),
  slug: z.string().min(1),
  sector: z.enum(SECTORS),
  aiQuadrant: z.enum(AI_QUADRANTS).optional(),
  vendors: z.array(z.string()).optional(),
});

const InvestorFilingTags = CommonTags.extend({
  docClass: z.literal("investor-filing"),
  slug: z.string().min(1),
  docType: z.enum([
    "annual-report",
    "press-release",
    "presentation",
    "transcript",
    "fact-sheet",
    "other",
  ]),
  period: z.string().optional(),
  fiscalYear: z.string().optional(),
  publishedAt: ISO_DATE.optional(),
});

const RachelBriefTags = CommonTags.extend({
  docClass: z.literal("rachel-brief"),
  date: ISO_DATE,
  topics: z.array(z.string()).default([]),
  slugs: z.array(z.string()).default([]),
});

const RachelDomainTags = CommonTags.extend({
  docClass: z.literal("rachel-domain"),
  topic: z.string(),
  slugs: z.array(z.string()).default([]),
  sectors: z.array(z.enum(SECTORS)).default([]),
});

const PulseItemTags = CommonTags.extend({
  docClass: z.literal("pulse-item"),
  slug: z.string().optional(),
  url: z.string().url().optional(),
  publishedAt: ISO_DATE,
});

const MarketCalendarTags = CommonTags.extend({
  docClass: z.literal("market-calendar"),
  slug: z.string(),
  next_earnings: z.string(),
});

export const DocTagsSchema = z.discriminatedUnion("docClass", [
  CompanyProfileTags,
  InvestorFilingTags,
  RachelBriefTags,
  RachelDomainTags,
  PulseItemTags,
  MarketCalendarTags,
]);

export type DocTags = z.infer<typeof DocTagsSchema>;

export function validateDocTags(input: unknown): DocTags {
  return DocTagsSchema.parse(input);
}

export const TAXONOMY_VERSION = "2026-05-11.v1";
