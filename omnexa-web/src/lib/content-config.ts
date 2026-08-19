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
} as const;

/**
 * Whether sample entities should be visibly marked in the UI.
 * Always true while they are being shown: unlabelled placeholder content is
 * precisely what the content-integrity rules exist to prevent.
 */
export const labelSampleContent = true;
