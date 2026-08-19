import type { Metadata } from "next";

import { InsightsIndex } from "@/components/insights/insights-index";

export const metadata: Metadata = {
  title: "Research notes",
  description:
    "Shorter technical observations from ongoing research: experiment commentary, hypotheses, methodological notes and early findings.",
  alternates: { canonical: "/insights/research-notes" },
};

export default function ResearchNotesPage() {
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
