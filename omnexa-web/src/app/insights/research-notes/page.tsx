import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightsIndex } from "@/components/insights/insights-index";
import { contentConfig } from "@/lib/content-config";

export const metadata: Metadata = {
  title: "Research notes",
  description:
    "Shorter technical observations from ongoing research: experiment commentary, hypotheses, methodological notes and early findings.",
  alternates: { canonical: "/insights/research-notes" },
};

export default function ResearchNotesPage() {
  /*
   * A research note reports an observation from work in progress, so it is a
   * research output rather than editorial voice and is withheld with the rest.
   * A 404 is the honest answer: an empty index would imply the lab has
   * observed nothing, and would still be indexable. Restored by
   * NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS=true.
   */
  if (!contentConfig.publishResearchOutputs) notFound();

  return (
    <InsightsIndex
      type="research-note"
      breadcrumbLabel="Research notes"
      eyebrow="Insights / Research notes"
      headingLines={["Research", "notes."]}
      lede="Shorter technical material that is not a formal publication: experiment observations, hypotheses, methodological notes and early findings. Observations, hypotheses and open questions are distinguished within each note."
    />
  );
}
