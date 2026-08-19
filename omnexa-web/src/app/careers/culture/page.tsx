import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Culture",
  description: "How Omnexa Labs works.",
  alternates: { canonical: "/careers/culture" },
};

/**
 * Culture: Stage 6 §34, §97.
 *
 * Derived from the operating principles rather than invented. No perks, no
 * "rockstar" language, no manufactured urgency: §97 rejects all of it, and
 * §34 says not to fabricate culture that does not exist.
 */
const PRACTICES = [
  { title: "High ownership", detail: "You own the question and the consequences of answering it." },
  { title: "Deep work", detail: "Long uninterrupted blocks are protected, not apologised for." },
  { title: "Direct communication", detail: "Disagreement is stated plainly and early." },
  { title: "Technical rigor", detail: "Claims are separated from evidence, always." },
  { title: "Documentation", detail: "Context that is not written down does not survive the quarter." },
  { title: "Review", detail: "Work is reviewed by someone who did not build it." },
  { title: "Long-term thinking", detail: "We optimise for the second year, not the second week." },
];

export default function CulturePage() {
  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Careers", href: "/careers" }, { label: "Culture" }]}
        headingLines={["How we", "work."]}
        lede="These are operating practices rather than aspirations: the way work actually moves through the lab."
      />
      <Section tone="light" density="editorial">
        <ol className={route.stack}>
          {PRACTICES.map((practice, index) => (
            <li key={practice.title} className={route.block} style={{ listStyle: "none" }}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {String(index + 1).padStart(2, "0")}
              </TechnicalLabel>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                {practice.title}
              </h2>
              <p className="omx-body-lg" style={{ color: "var(--text-secondary)", maxWidth: "var(--omx-measure-prose)" }}>
                {practice.detail}
              </p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Research at Omnexa", href: "/careers/research" },
            { label: "Engineering at Omnexa", href: "/careers/engineering" },
            { label: "Open roles", href: "/careers/open-roles" },
          ]}
        />
      </Section>

    </main>
  );
}
