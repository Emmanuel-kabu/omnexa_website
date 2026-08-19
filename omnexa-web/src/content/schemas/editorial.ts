import { z } from "zod";

import {
  BaseEntitySchema,
  FeatureSchema,
  IsoDateSchema,
  MediaAssetSchema,
  SlugSchema,
} from "./primitives";

/**
 * Editorial, people and careers schemas.
 * Stage 6 §17, §27, §37, §47
 */

export const INSIGHT_TYPES = [
  "research-note",
  "engineering",
  "perspective",
  "news",
] as const;

export const InsightSchema = BaseEntitySchema.extend({
  type: z.enum(INSIGHT_TYPES),
  excerpt: z.string().min(1),
  body: z.string().optional(),
  /** Stage 6 §74: institutional content is authored as `Omnexa Labs`, never
      left anonymous by accident. */
  authorIds: z.array(z.string()).min(1),
  researchAreaIds: z.array(z.string()).default([]),
  researchProgramIds: z.array(z.string()).default([]),
  systemIds: z.array(z.string()).default([]),
  publicationIds: z.array(z.string()).default([]),
  heroMedia: MediaAssetSchema.optional(),
  tags: z.array(z.string()).default([]),
  publishedAt: IsoDateSchema,
}).merge(FeatureSchema);

/**
 * Stage 6 §48: research notes must visibly distinguish an observation from a
 * hypothesis from an open question, so early commentary can never be mistaken
 * for a settled result.
 */
export const RESEARCH_NOTE_CLAIM_KINDS = [
  "observation",
  "hypothesis",
  "early-result",
  "open-question",
] as const;

export const ResearchNoteClaimSchema = z.object({
  kind: z.enum(RESEARCH_NOTE_CLAIM_KINDS),
  statement: z.string().min(1),
});

export const PersonSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: SlugSchema,
  role: z.string().min(1),
  team: z.string().optional(),
  bio: z.string().min(1),
  portrait: MediaAssetSchema.optional(),

  researchAreaIds: z.array(z.string()).default([]),
  researchProgramIds: z.array(z.string()).default([]),
  researchProjectIds: z.array(z.string()).default([]),
  publicationIds: z.array(z.string()).default([]),
  systemIds: z.array(z.string()).default([]),
  insightIds: z.array(z.string()).default([]),

  /** Stage 6 §28: never invented, so every link is optional. */
  githubUrl: z.url().optional(),
  linkedinUrl: z.url().optional(),
  websiteUrl: z.url().optional(),

  visibility: z.enum(["draft", "public", "unlisted", "private", "archived"]),
  sample: z.boolean().default(false),
  updatedAt: IsoDateSchema,
});

export const JobSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: SlugSchema,
  department: z.string().min(1),
  team: z.string().optional(),
  /** Stage 6 §35: location is never hidden behind an interaction. */
  location: z.string().min(1),
  employmentType: z.string().min(1),
  workMode: z.enum(["onsite", "hybrid", "remote"]).optional(),

  summary: z.string().min(1),
  mission: z.string().min(1),
  responsibilities: z.array(z.string()).min(1),
  requirements: z.array(z.string()).min(1),
  preferred: z.array(z.string()).default([]),

  researchAreaIds: z.array(z.string()).default([]),
  systemIds: z.array(z.string()).default([]),

  applicationUrl: z.url().optional(),
  /** Stage 6 §38: draft roles are never public; closed roles cannot apply. */
  status: z.enum(["draft", "open", "closed"]),
  sample: z.boolean().default(false),
  publishedAt: IsoDateSchema.optional(),
  closingDate: IsoDateSchema.optional(),
});

export const CompanyPrincipleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  body: z.string().optional(),
  order: z.number().int(),
  visibility: z.enum(["draft", "public", "unlisted", "private", "archived"]),
});

export type Insight = z.infer<typeof InsightSchema>;
export type InsightType = (typeof INSIGHT_TYPES)[number];
export type Person = z.infer<typeof PersonSchema>;
export type Job = z.infer<typeof JobSchema>;
export type CompanyPrinciple = z.infer<typeof CompanyPrincipleSchema>;
