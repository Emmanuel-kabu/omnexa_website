import type { Metadata } from "next";

import { InsightsIndex } from "@/components/insights/insights-index";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Architecture, ML infrastructure, agent systems, data systems, reliability and research tooling.",
  alternates: { canonical: "/insights/engineering" },
};

export default function EngineeringInsightsPage() {
  return (
    <InsightsIndex
      type="engineering"
      breadcrumbLabel="Engineering"
      eyebrow="Insights / Engineering"
      headingLines={["Engineering."]}
      lede="Architecture, ML infrastructure, agent systems, distributed and data systems, reliability, security and research tooling: explanatory rather than promotional."
    />
  );
}
