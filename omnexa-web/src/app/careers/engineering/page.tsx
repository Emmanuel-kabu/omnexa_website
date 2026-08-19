import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Engineering careers",
  description: "What engineering at Omnexa Labs looks like.",
  alternates: { canonical: "/careers/engineering" },
};

const THEMES = [
  {
    title: "Systems thinking",
    body: "We build from explicit system models. If the model is unclear, the code will be too.",
  },
  {
    title: "Specialization",
    body: "We specialise where specialisation changes the outcome, and stay general everywhere else.",
  },
  {
    title: "Observability",
    body: "System state is visible rather than inferred. What cannot be observed cannot be evaluated.",
  },
  {
    title: "Reliability and security",
    body: "Designed for failure, with security treated as architecture rather than a final review gate.",
  },
  {
    title: "ML infrastructure",
    body: "The infrastructure beneath research is a first-class engineering product, not glue.",
  },
];

/** Stage 6 §33 */
export default function EngineeringCareersPage() {
  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Careers", href: "/careers" },
          { label: "Engineering" },
        ]}
        headingLines={["Engineering", "at Omnexa."]}
        lede="Engineering here is evidence: systems that have to run, be observed, and be improved."
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
            { label: "Applied engineering", href: "/engineering" },
            { label: "Engineering insights", href: "/insights/engineering" },
            { label: "Open roles", href: "/careers/open-roles" },
          ]}
        />
      </Section>

    </main>
  );
}
