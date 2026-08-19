import type { Metadata } from "next";

import { InsightsIndex } from "@/components/insights/insights-index";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research observations, engineering decisions, technical perspectives, and institutional updates from Omnexa Labs.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <InsightsIndex
      eyebrow="Insights / OMX"
      headingLines={["Notes,", "systems,", "ideas."]}
      lede="Research observations, engineering decisions, technical perspectives, and institutional updates from Omnexa Labs."
    />
  );
}
