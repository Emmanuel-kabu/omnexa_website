import type { Metadata } from "next";

import { InsightsIndex } from "@/components/insights/insights-index";

export const metadata: Metadata = {
  title: "Perspectives",
  description:
    "Long-form institutional views on AI research direction, human-AI systems and responsible development.",
  alternates: { canonical: "/insights/perspectives" },
};

export default function PerspectivesPage() {
  return (
    <InsightsIndex
      type="perspective"
      breadcrumbLabel="Perspectives"
      eyebrow="Insights / Perspectives"
      headingLines={["Perspectives."]}
      lede="Long-form institutional views on research direction, human-AI systems, responsible development and future technology. These are clearly identified as opinion rather than result."
    />
  );
}
