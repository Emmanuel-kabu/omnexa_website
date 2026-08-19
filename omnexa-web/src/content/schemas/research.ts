import { z } from "zod";

import {
  BaseEntitySchema,
  ExperimentOutcomeSchema,
  FeatureSchema,
  IsoDateSchema,
  ResearchAreaCodeSchema,
  ResearchIdSchema,
  ResearchStatusSchema,
  SlugSchema,
} from "./primitives";

/**
 * Research content schemas.
 * Stage 2 §11-16, Stage 4 §77-79
 *
 * Each entity gets its own schema: Stage 2 §44 forbids storing everything in
 * one generic "page" model, because that is what turns a research institution
 * into a blog.
 */

/** Stage 4 §26: subdomains are taxonomy, not necessarily standalone routes. */
export const ResearchSubdomainSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: SlugSchema,
  question: z.string().min(1),
});

export const ResearchAreaSchema = BaseEntitySchema.extend({
  id: z.string().min(1),
  code: ResearchAreaCodeSchema,
  /** Stage 4 §5: the area's research intent, in research language. */
  thesis: z.string().min(1),
  subdomains: z.array(ResearchSubdomainSchema).min(1),
  status: ResearchStatusSchema,
  /** Display index: `01`-`04`. Editorial, not derived from array order. */
  index: z.string().regex(/^\d{2}$/),
}).merge(FeatureSchema);

/** Stage 4 §31: numbered research questions. */
export const ResearchQuestionSchema = z.object({
  id: z.string().regex(/^RQ-\d{2}$/, "Research question id must look like RQ-01"),
  question: z.string().min(1),
});

export const ResearchProgramSchema = BaseEntitySchema.extend({
  id: ResearchIdSchema,
  researchAreaId: z.string().min(1),
  subdomainIds: z.array(z.string()).default([]),
  status: ResearchStatusSchema,
  problemStatement: z.string().min(1),
  researchQuestions: z.array(ResearchQuestionSchema).default([]),
  researchDirections: z.array(z.string()).default([]),
  startedAt: IsoDateSchema.optional(),
}).merge(FeatureSchema);

export const ResearchProjectSchema = BaseEntitySchema.extend({
  id: ResearchIdSchema,
  researchAreaId: z.string().min(1),
  programId: z.string().optional(),
  status: ResearchStatusSchema,
  /** Stage 4 §38: kept as distinct fields so the research question is never
      buried in marketing prose. */
  problem: z.string().min(1),
  objective: z.string().min(1),
  hypothesis: z.string().optional(),
  methodology: z.string().optional(),
  evaluation: z.string().optional(),
  results: z.string().optional(),
  limitations: z.string().optional(),
  nextSteps: z.string().optional(),
  contributorIds: z.array(z.string()).default([]),
  systemIds: z.array(z.string()).default([]),
  repositoryUrl: z.url().optional(),
}).merge(FeatureSchema);

/** Stage 4 §40: only the fields a given project actually has. */
export const TechnicalReferenceSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  href: z.url().optional(),
});

export const ExperimentSchema = BaseEntitySchema.extend({
  id: ResearchIdSchema,
  projectId: z.string().optional(),
  programId: z.string().optional(),
  researchAreaId: z.string().min(1),
  /** Lifecycle position … */
  researchStatus: ResearchStatusSchema,
  /** … kept separate from what the experiment found (Stage 4 §48). */
  outcomeStatus: ExperimentOutcomeSchema.optional(),
  objective: z.string().min(1),
  hypothesis: z.string().optional(),
  setup: z.string().optional(),
  dataset: z.array(TechnicalReferenceSchema).default([]),
  models: z.array(TechnicalReferenceSchema).default([]),
  environment: z.array(TechnicalReferenceSchema).default([]),
  results: z.string().optional(),
  observations: z.string().optional(),
  conclusion: z.string().optional(),
  limitations: z.string().optional(),
  contributorIds: z.array(z.string()).default([]),
  startedAt: IsoDateSchema.optional(),
  completedAt: IsoDateSchema.optional(),
}).merge(FeatureSchema);

export const PUBLICATION_TYPES = [
  "paper",
  "technical-report",
  "whitepaper",
  "dataset-paper",
  "benchmark",
  "research-brief",
] as const;

export const PublicationSchema = BaseEntitySchema.extend({
  id: ResearchIdSchema,
  publicationType: z.enum(PUBLICATION_TYPES),
  abstract: z.string().min(1),
  authorIds: z.array(z.string()).min(1, "Every publication needs author metadata"),
  researchAreaId: z.string().min(1),
  programIds: z.array(z.string()).default([]),
  projectIds: z.array(z.string()).default([]),
  experimentIds: z.array(z.string()).default([]),
  systemIds: z.array(z.string()).default([]),
  /** Distinct from `updatedAt`: Stage 2 §89 forbids conflating them. */
  publishedAt: IsoDateSchema,
  /** Optional and never fabricated: Stage 4 §53, §101. */
  doi: z.string().optional(),
  pdfUrl: z.string().optional(),
  repositoryUrl: z.url().optional(),
  citation: z.string().optional(),
  bibtex: z.string().optional(),
}).merge(FeatureSchema);

export type ResearchArea = z.infer<typeof ResearchAreaSchema>;
export type ResearchSubdomain = z.infer<typeof ResearchSubdomainSchema>;
export type ResearchProgram = z.infer<typeof ResearchProgramSchema>;
export type ResearchProject = z.infer<typeof ResearchProjectSchema>;
export type Experiment = z.infer<typeof ExperimentSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type PublicationType = (typeof PUBLICATION_TYPES)[number];
