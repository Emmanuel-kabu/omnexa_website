/**
 * Shared domain types.
 * Stage 2 §83, Stage 4 §65
 *
 * Three taxonomies that are routinely conflated are kept strictly separate:
 *
 *   ResearchStatus   : where the work sits in the research lifecycle
 *   ExperimentOutcome: what an experiment actually found
 *   ContentVisibility: whether the public may see it at all
 *
 * A confirmed experiment can be private; an active project can be draft.
 * Collapsing these is how private research leaks, so they never merge.
 */

/** Stage 2 §63 */
export const CONTENT_VISIBILITIES = [
  "draft",
  "public",
  "unlisted",
  "private",
  "archived",
] as const;
export type ContentVisibility = (typeof CONTENT_VISIBILITIES)[number];

/** Stage 2 §14 */
export const RESEARCH_STATUSES = [
  "proposed",
  "experimental",
  "active",
  "validating",
  "published",
  "paused",
  "archived",
] as const;
export type ResearchStatus = (typeof RESEARCH_STATUSES)[number];

/** Stage 4 §48: a failed experiment is valid research output. */
export const EXPERIMENT_OUTCOMES = [
  "preliminary",
  "validating",
  "confirmed",
  "inconclusive",
  "failed",
] as const;
export type ExperimentOutcome = (typeof EXPERIMENT_OUTCOMES)[number];

/** Stage 1 §27, Stage 2 §13 */
export const RESEARCH_AREA_CODES = ["DI", "FM", "AM", "SE"] as const;
export type ResearchAreaCode = (typeof RESEARCH_AREA_CODES)[number];

/** Stage 5 §9 */
export const SYSTEM_STATUSES = [
  "concept",
  "research",
  "development",
  "alpha",
  "beta",
  "staging",
  "production",
  "internal",
  "archived",
] as const;
export type SystemStatus = (typeof SYSTEM_STATUSES)[number];

/** Stage 2 §44: canonical content types. Each gets its own schema. */
export const CONTENT_TYPES = [
  "research_area",
  "research_program",
  "research_project",
  "experiment",
  "publication",
  "system",
  "insight",
  "person",
  "job",
] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/** Stage 4 §80: relationships are explicit edges, never inferred from tags. */
export const RELATIONSHIP_TYPES = [
  "belongs_to",
  "contains",
  "produced",
  "applied_in",
  "authored_by",
  "related_to",
  "evaluated_by",
  "derived_from",
] as const;
export type RelationshipType = (typeof RELATIONSHIP_TYPES)[number];

/**
 * The single source of truth for public discoverability.
 * Used by repositories, sitemap generation and the search index alike so the
 * boundary cannot drift between them (Stage 7 §150).
 */
export function isPubliclyVisible(visibility: ContentVisibility): boolean {
  return visibility === "public";
}

/** `unlisted` is reachable by direct URL but excluded from every index. */
export function isDirectlyAddressable(visibility: ContentVisibility): boolean {
  return visibility === "public" || visibility === "unlisted";
}

export const RESEARCH_STATUS_LABELS: Record<ResearchStatus, string> = {
  proposed: "Proposed",
  experimental: "Experimental",
  active: "Active",
  validating: "Validating",
  published: "Published",
  paused: "Paused",
  archived: "Archived",
};

export const EXPERIMENT_OUTCOME_LABELS: Record<ExperimentOutcome, string> = {
  preliminary: "Preliminary",
  validating: "Validating",
  confirmed: "Confirmed",
  inconclusive: "Inconclusive",
  failed: "Failed",
};

export const RESEARCH_AREA_CODE_LABELS: Record<ResearchAreaCode, string> = {
  DI: "Developmental Intelligence",
  FM: "Foundation Models",
  AM: "Algorithms & Mathematics",
  SE: "AI for Software & Systems",
};
