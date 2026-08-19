import { z } from "zod";

import {
  BaseEntitySchema,
  FeatureSchema,
  ResearchIdSchema,
  SystemStatusSchema,
} from "./primitives";

/**
 * System schemas.
 * Stage 5 §11-13, §64
 *
 * Capabilities, architecture and evidence are structured data, never prose
 * hardcoded into components (Stage 5 §12), and architecture graph data lives
 * outside JSX so it can be rendered, listed semantically, or exported to a
 * static diagram from one source (Stage 5 §64).
 */

export const SystemCapabilitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  category: z.string().optional(),
  maturity: z.enum(["research", "experimental", "operational"]).optional(),
  relatedResearchIds: z.array(z.string()).default([]),
});

export const ArchitectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  type: z.string().min(1),
  summary: z.string().optional(),
  group: z.string().optional(),
});

export const ArchitectureEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
  direction: z.enum(["forward", "bidirectional"]).default("forward"),
});

export const ArchitectureLayerSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  summary: z.string().optional(),
  nodeIds: z.array(z.string()).default([]),
});

export const SystemArchitectureSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(ArchitectureNodeSchema).default([]),
  edges: z.array(ArchitectureEdgeSchema).default([]),
  layers: z.array(ArchitectureLayerSchema).default([]),
});

/**
 * Evidence: Stage 5 §13, §66.
 *
 * A discriminated union so the type system itself distinguishes a capability
 * claim from a measured result. `metric` deliberately requires a `sourceId`:
 * Stage 5 §13 says only expose metrics backed by a verified source, and the
 * cheapest way to guarantee that is to make an unsourced metric fail to
 * typecheck.
 */
export const SystemEvidenceSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("architecture"),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  z.object({
    type: z.literal("metric"),
    title: z.string().min(1),
    value: z.string().min(1),
    context: z.string().min(1),
    sourceId: z.string().min(1),
  }),
  z.object({
    type: z.literal("research"),
    researchId: z.string().min(1),
  }),
  z.object({
    type: z.literal("publication"),
    publicationId: z.string().min(1),
  }),
]);

export const SystemUseCaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
});

export const SystemDifferentiatorSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
});

export const SystemSchema = BaseEntitySchema.extend({
  id: ResearchIdSchema,
  /** Stage 5 §7: `001`, `002`, `003`. Stable, editorial. */
  index: z.string().regex(/^\d{3}$/),
  category: z.string().min(1),
  tagline: z.string().min(1),
  /** Display lines for the system's primary statement. */
  statement: z.array(z.string().min(1)).min(1),
  status: SystemStatusSchema,
  /** What the status actually means: Stage 5 §68 forbids bare status labels. */
  statusNote: z.string().min(1),
  mission: z.string().min(1),
  problemStatement: z.string().min(1),
  problemHeadline: z.array(z.string().min(1)).min(1),
  systemDefinition: z.string().min(1),

  researchAreaIds: z.array(z.string()).default([]),
  researchProgramIds: z.array(z.string()).default([]),
  researchProjectIds: z.array(z.string()).default([]),
  publicationIds: z.array(z.string()).default([]),
  insightIds: z.array(z.string()).default([]),

  capabilities: z.array(SystemCapabilitySchema).default([]),
  architecture: SystemArchitectureSchema.optional(),
  differentiators: z.array(SystemDifferentiatorSchema).default([]),
  useCases: z.array(SystemUseCaseSchema).default([]),
  evidence: z.array(SystemEvidenceSchema).default([]),

  /** Lifecycle or flow labels: Cadence's PLAN→BUILD→RUN→DEPLOY→MONITOR. */
  lifecycle: z.array(z.string()).default([]),

  externalUrl: z.url().optional(),
  repositoryUrl: z.url().optional(),
}).merge(FeatureSchema);

export type System = z.infer<typeof SystemSchema>;
export type SystemCapability = z.infer<typeof SystemCapabilitySchema>;
export type SystemArchitecture = z.infer<typeof SystemArchitectureSchema>;
export type SystemEvidence = z.infer<typeof SystemEvidenceSchema>;
export type ArchitectureNode = z.infer<typeof ArchitectureNodeSchema>;
export type ArchitectureEdge = z.infer<typeof ArchitectureEdgeSchema>;
