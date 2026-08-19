/**
 * Content surface configuration.
 *
 * Each flag here is a single switch governing what reaches the public surface.
 * They are read by the repository layer and the navigation definition, so a
 * flag applies uniformly to every index, feed, related-content list, sitemap
 * entry, search document and menu: there is no path around it.
 */
export const contentConfig = {
  /**
   * Whether entities marked `sample: true` reach the public surface.
   *
   * Default is ON so templates, filters and relationships are demonstrably
   * working during development and review. Setting
   *
   *     NEXT_PUBLIC_INCLUDE_SAMPLE_CONTENT=false
   *
   * removes all sample content in one step; every affected index then renders
   * its intentional empty state (Stage 2 §65).
   */
  includeSampleContent:
    process.env.NEXT_PUBLIC_INCLUDE_SAMPLE_CONTENT !== "false",

  /**
   * Whether the Omnexa systems (Cadence, MedApp, ResearchOS) are shown.
   *
   * All three are in development and none is publicly available, so they are
   * withheld until they are ready to present. This is deliberately a flag
   * rather than a deletion: the content in `content/data/systems.ts`, the
   * page templates, the architecture diagram and the per-system visuals all
   * remain intact and typechecked. Publishing is one value change:
   *
   *     NEXT_PUBLIC_PUBLISH_SYSTEMS=true
   *
   * With it OFF the systems disappear from navigation, the homepage, the
   * sitemap, search, and every related-content list, and `/systems` returns a
   * real 404 rather than an empty page.
   */
  publishSystems: process.env.NEXT_PUBLIC_PUBLISH_SYSTEMS === "true",

  /**
   * Whether research *outputs* are shown: programs, projects, experiments,
   * publications, and the research-note insight category.
   *
   * The research itself is under way and results are not expected soon, so
   * there is nothing truthful to publish here yet. Every record currently in
   * `content/data/research.ts` is marked `sample: true`, meaning a visitor
   * would otherwise read invented findings, methods and publication records as
   * claims this lab is making.
   *
   * Note what this does NOT withhold: the four research areas in
   * `content/data/research-areas.ts` are real and stay published, as does the
   * operating model. That distinction is the point. A lab that states what it
   * is investigating but has not yet published results is being accurate; one
   * that lists fabricated publications is not. The research half of the
   * mission rests on direction, not on output that does not exist.
   *
   * Publishing is one value change:
   *
   *     NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS=true
   *
   * With it OFF these disappear from navigation, the homepage, the sitemap,
   * search and every related-content list; the routes return a real 404; and
   * two dependent surfaces stand down with them, because both become
   * meaningless without outputs: `/research/archive`, whose entries are drawn
   * exclusively from these four types, and the research atlas, which
   * visualises the area-to-programme-to-publication graph and would otherwise
   * render four childless nodes.
   */
  publishResearchOutputs:
    process.env.NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS === "true",
} as const;

/**
 * Insight categories withheld while research outputs are unpublished.
 *
 * A research note reports an observation from work in progress, so it is a
 * research output wearing editorial clothes and belongs behind the same gate.
 * Engineering notes, perspectives and news make no claim about research
 * results, so they stay published.
 *
 * Typed as a plain string rather than `Insight["type"]` on purpose: this module
 * is imported by client components (the navigation and the Insights category
 * tabs both need it), and the content layer that owns that union is
 * `server-only`.
 */
const RESEARCH_OUTPUT_INSIGHT_TYPES = new Set(["research-note"]);

export function isPublishedInsightType(type: string): boolean {
  if (!RESEARCH_OUTPUT_INSIGHT_TYPES.has(type)) return true;
  return contentConfig.publishResearchOutputs;
}

/**
 * Whether sample entities should be visibly marked in the UI.
 * Always true while they are being shown: unlabelled placeholder content is
 * precisely what the content-integrity rules exist to prevent.
 */
export const labelSampleContent = true;
