import type { Metadata } from "next";

import { InsightsIndex } from "@/components/insights/insights-index";

export const metadata: Metadata = {
  title: "News",
  description:
    "Research releases, system updates, publications and milestones from Omnexa Labs.",
  alternates: { canonical: "/insights/news" },
};

export default function NewsPage() {
  return (
    <InsightsIndex
      type="news"
      breadcrumbLabel="News"
      eyebrow="Insights / News"
      headingLines={["News."]}
      lede="Factual, date-specific institutional updates: research releases, system status changes, new publications and milestones."
    />
  );
}
