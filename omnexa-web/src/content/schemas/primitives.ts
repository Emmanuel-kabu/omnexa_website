import { z } from "zod";

import {
  CONTENT_VISIBILITIES,
  EXPERIMENT_OUTCOMES,
  RESEARCH_AREA_CODES,
  RESEARCH_STATUSES,
  SYSTEM_STATUSES,
} from "@/types/content";

/**
 * Shared schema primitives.
 * Stage 7 §17: all authored content is validated before it reaches rendering.
 *
 * These constraints are not decoration. Several of the integrity rules the
 * specs repeat ("IDs must be stable", "slugs are lowercase and hyphenated",
 * "do not label updated_at as publication date") are only enforceable if the
 * shape is checked at the boundary, so they are encoded here rather than left
 * to editorial discipline.
 */

/** Stage 1 §27: `OMX-{DOMAIN}-{NUMBER}`, stable and never order-derived. */
export const ResearchIdSchema = z
  .string()
  .regex(
    /^OMX-[A-Z]{2,6}-\d{3,4}$/,
    "Identifier must look like OMX-DI-007, OMX-EXP-032 or OMX-SYS-001",
  );

/** Stage 2 §39: lowercase, hyphenated, human readable. */
export const SlugSchema = z
  .string()
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase and hyphenated, e.g. lifelong-model-learning",
  );

/** Stage 7 §135: dates are stored machine-readable and timezone-stable. */
export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(value)), "Date must be a real date");

export const VisibilitySchema = z.enum(CONTENT_VISIBILITIES);
export const ResearchStatusSchema = z.enum(RESEARCH_STATUSES);
export const ExperimentOutcomeSchema = z.enum(EXPERIMENT_OUTCOMES);
export const ResearchAreaCodeSchema = z.enum(RESEARCH_AREA_CODES);
export const SystemStatusSchema = z.enum(SYSTEM_STATUSES);

/** Stage 7 §22: intrinsic dimensions are required, so images cannot shift layout. */
export const MediaAssetSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: z.string().optional(),
  credit: z.string().optional(),
  blurDataURL: z.string().optional(),
});

/**
 * Editorial curation: Stage 2 §91-92.
 * Homepage prominence is an explicit decision, never inferred from recency.
 */
export const FeatureSchema = z.object({
  featured: z.boolean().default(false),
  featuredPriority: z.number().int().optional(),
  displayOrder: z.number().int().optional(),
});

/**
 * Internal governance: Stage 7 §116.
 * Present on every public entity, exposed to nobody. Enables scheduled review
 * and assigns corrections without leaking process into the public surface.
 */
export const OwnershipSchema = z.object({
  owner: z.string().optional(),
  reviewer: z.string().optional(),
  lastReviewedAt: IsoDateSchema.optional(),
});

/**
 * The base every content entity extends.
 * `sample` is not part of the spec: it is how this build honours the
 * content-integrity rules (Stage 3 §51, Stage 4 §101, Stage 5 §81, Stage 6
 * §99) while still exercising every template. Entities marked `sample: true`
 * carry structurally realistic but non-factual content, are visibly labelled
 * in the UI, and are excluded from the public surface unless explicitly
 * allowed. Replacing them with real content is a data change, never a code
 * change.
 */
export const BaseEntitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: SlugSchema,
  summary: z.string().min(1),
  visibility: VisibilitySchema,
  sample: z.boolean().default(false),
  createdAt: IsoDateSchema.optional(),
  updatedAt: IsoDateSchema,
});

export type MediaAsset = z.infer<typeof MediaAssetSchema>;
