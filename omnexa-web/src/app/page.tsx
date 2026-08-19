import type { Metadata } from "next";

import { CareersSection } from "@/components/home/careers/careers-section";
import { FeaturedResearchSection } from "@/components/home/featured-research/featured-research-section";
import { AppliedEngineeringSection } from "@/components/home/applied-engineering/applied-engineering-section";
import { HeroSection } from "@/components/home/hero/hero-section";
import { InsightsSection } from "@/components/home/insights/insights-section";
import { InstitutionalDefinition } from "@/components/home/institutional-definition/institutional-definition";
import { KnowledgeSection } from "@/components/home/knowledge/knowledge-section";
import { OperatingModelSection } from "@/components/home/operating-model/operating-model-section";
import { ResearchAreasSection } from "@/components/home/research-areas/research-areas-section";
import { ResearchOSSection } from "@/components/home/researchos/researchos-section";
import { ResearchToSystemsTransition } from "@/components/home/systems-transition/research-to-systems-transition";
import { SystemsSection } from "@/components/home/systems/systems-section";
import { getHomePageContent } from "@/content/queries/get-home-page-content";
import { contentConfig } from "@/lib/content-config";
import {
  jsonLd,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/structured-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // The root layout's title template appends the site name; the homepage
  // carries the full institutional title on its own.
  title: {
    absolute: site.title,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * The Omnexa Labs homepage.
 * Stage 3 §3, §4, §55
 *
 * A server component. Only three sections cross into the client: the header,
 * the research-area interaction, and the Intelligence Field's Canvas layer:
 * so the page is not converted wholesale to `"use client"` (Stage 3 §43).
 *
 * Section order is canonical and must not be reordered without an explicit
 * design decision (Stage 3 §3). The narrative it carries:
 *
 *     potential → intelligence → research → discovery → systems
 *     → infrastructure → knowledge → impact → next
 *
 * Tone descends from light through the systems layer and returns to light for
 * the lab's public output, closing dark in the footer: the research → runtime
 * descent described in Stage 1 §7.
 */
/** Every numbered homepage section, in no particular order. */
type SectionKey =
  | "definition"
  | "areas"
  | "featured"
  | "engineering"
  | "transition"
  | "systems"
  | "researchos"
  | "knowledge"
  | "insights"
  | "operatingModel"
  | "careers";

export default async function HomePage() {
  const content = await getHomePageContent();

  /*
   * The systems sections are omitted while Cadence, MedApp and ResearchOS are
   * unpublished. The Research-to-Systems transition goes with them: it exists
   * purely to pivot the narrative INTO the systems layer, so on its own it
   * would announce a descent that never arrives.
   *
   * The remaining sections are numbered from what actually renders rather than
   * from hardcoded strings, so the eyebrow indices stay contiguous instead of
   * reading 01, 02, 03, 07. Restoring the systems renumbers everything back
   * automatically.
   */
  const showSystems = contentConfig.publishSystems;

  /*
   * Section numbers are derived from the order that actually renders, so they
   * stay contiguous in both states and cannot drift out of sync with the
   * composition below. Computed as a pure lookup rather than an incrementing
   * counter: mutating during render is exactly what `react-hooks/immutability`
   * exists to catch.
   */
  const showOutputs = contentConfig.publishResearchOutputs;

  /*
   * Derived by filtering one canonical order rather than enumerating variants.
   * With two independent flags there are four combinations, and keeping four
   * hand-written arrays in step is precisely how a numbering gap gets shipped.
   */
  const SYSTEMS_SECTIONS = new Set<SectionKey>([
    "transition",
    "systems",
    "researchos",
  ]);

  /*
   * Both of these present research output and nothing else: "featured" lists
   * programs and projects, "knowledge" lists publications and experiments. With
   * output withheld they would render a heading over an empty state on the
   * front page, which reads as an admission rather than a design.
   */
  const OUTPUT_SECTIONS = new Set<SectionKey>(["featured", "knowledge"]);

  const order: readonly SectionKey[] = (
    [
      "definition",
      "areas",
      "featured",
      "engineering",
      "transition",
      "systems",
      "researchos",
      "knowledge",
      "insights",
      "operatingModel",
      "careers",
    ] as const satisfies readonly SectionKey[]
  ).filter((key) => {
    if (SYSTEMS_SECTIONS.has(key)) return showSystems;
    if (OUTPUT_SECTIONS.has(key)) return showOutputs;
    return true;
  });

  const n = (key: SectionKey): string => {
    const position = order.indexOf(key);
    // A key absent from the active order is a composition bug, not a runtime
    // condition: fail loudly rather than silently rendering "00".
    if (position < 0) throw new Error(`Section "${key}" is not in the active order`);
    return String(position + 1).padStart(2, "0");
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised via `jsonLd`, which escapes `<`.
        dangerouslySetInnerHTML={{
          __html: jsonLd(organizationSchema(), websiteSchema()),
        }}
      />

      <main id="main">
        <HeroSection />
        <InstitutionalDefinition index={n("definition")} />
        <ResearchAreasSection
          areas={content.researchAreas}
          index={n("areas")}
        />
        {showOutputs ? (
          <FeaturedResearchSection
            items={content.featuredResearch}
            areas={content.researchAreas}
            index={n("featured")}
          />
        ) : null}

        <AppliedEngineeringSection index={n("engineering")} />

        {showSystems ? (
          <>
            <ResearchToSystemsTransition index={n("transition")} />
            <SystemsSection systems={content.systems} index={n("systems")} />
            <ResearchOSSection
              system={content.researchOS}
              index={n("researchos")}
            />
          </>
        ) : null}

        {showOutputs ? (
          <KnowledgeSection items={content.knowledge} index={n("knowledge")} />
        ) : null}
        <InsightsSection items={content.insights} index={n("insights")} />
        <OperatingModelSection index={n("operatingModel")} />
        <CareersSection jobs={content.openRoles} index={n("careers")} />
      </main>
    </>
  );
}
