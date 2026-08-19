import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Research careers",
  description: "What research work at Omnexa Labs looks like.",
  alternates: { canonical: "/careers/research" },
};

const THEMES = [
  {
    title: "Research questions",
    body: "Work starts from a question that is worth the cost of answering properly, not from a technique looking for an application.",
  },
  {
    title: "Experimentation",
    body: "Experiments are designed so their result is informative either way. Negative results are recorded, not discarded.",
  },
  {
    title: "Reproducibility",
    body: "Configuration, data and lineage are captured as a property of the environment rather than individual discipline.",
  },
  {
    title: "AI research agents",
    body: "Research agents work inside the same research state as human researchers, under human direction and review.",
  },
  {
    title: "Publication",
    body: "Findings are written up with their limitations attached, and reviewed before they become public claims.",
  },
];

/** Stage 6 §32 */
export default function ResearchCareersPage() {
  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Careers", href: "/careers" }, { label: "Research" }]}
        headingLines={["Research", "at Omnexa."]}
        lede="Research here is expected to survive scrutiny, connect to systems, and produce the next question."
      />
      <Section tone="light" density="editorial">
        <div className={route.stack}>
          {THEMES.map((theme) => (
            <div key={theme.title} className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                {theme.title}
              </h2>
              <p className="omx-body-lg" style={{ color: "var(--text-secondary)", maxWidth: "var(--omx-measure-prose)" }}>
                {theme.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Research areas", href: "/research" },
            { label: "How we work", href: "/careers/culture" },
            { label: "Open roles", href: "/careers/open-roles" },
          ]}
        />
      </Section>

    </main>
  );
}
