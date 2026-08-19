import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { engineeringPractice } from "@/lib/engineering";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Advance artificial intelligence through rigorous research and applied engineering, and build systems that expand what people and institutions can accomplish.",
  alternates: { canonical: "/company/mission" },
};

const RESEARCH_PHILOSOPHY = [
  "Ask important questions.",
  "Measure what matters.",
  "Preserve uncertainty.",
  "Build reproducibly.",
  "Treat failed experiments as information.",
  "Connect research to systems.",
  "Let systems create new research questions.",
];


/** Stage 6 §14: a distinctive institutional section, kept concise and serious. */
const REFUSALS = [
  "Hype over evidence",
  "Speed over correctness",
  "Autonomy without accountability",
  "Growth without safety",
  "Complexity without purpose",
  "Claims without measurement",
];

/**
 * Mission: Stage 6 §7-14.
 * Reads as a manifesto rather than a corporate About page. Impact claims are
 * deliberately restrained: §8 warns against overstating societal impact and
 * §12 against inventing timelines.
 */
export default function MissionPage() {
  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Company", href: "/company" }, { label: "Mission" }]}
        headingLines={["Advance", "intelligence.", "Build what", "matters."]}
        lede="Our mission is to advance artificial intelligence through rigorous research and applied engineering, and to build systems that expand what individuals, organizations, and scientific institutions can accomplish."
      />

      <Section tone="light" density="editorial">
        <div className={route.prose}>
          <h2 className="omx-heading-2">Why Omnexa exists</h2>
          <p className="omx-body-lg">
            The most important AI systems will not be created by treating models
            as isolated products. They will emerge from better research methods,
            better learning systems, better infrastructure, better coordination,
            and better ways for humans and intelligent systems to work together.
          </p>
        </div>
      </Section>

      <Section tone="subtle" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Research philosophy
            </TechnicalLabel>
            <ul className={route.list}>
              {RESEARCH_PHILOSOPHY.map((item) => (
                <li key={item} className="omx-body">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Engineering philosophy
            </TechnicalLabel>
            <ul className={route.list}>
              {engineeringPractice.map((item) => (
                <li key={item} className="omx-body">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="light" density="editorial">
        <div className={route.prose}>
          <h2 className="omx-heading-2">Long-term orientation</h2>
          <p className="omx-body-lg">
            Omnexa is being built for research programs and systems that may
            evolve over years, not only short product cycles. We value
            compounding knowledge, durable infrastructure, and research that
            becomes more valuable as it connects to future work.
          </p>
        </div>
      </Section>

      <Section tone="dark" density="editorial">
        <DisplayHeading
          as="h2"
          size="display-2"
          lines={["What we refuse", "to optimize for."]}
          accentTerminal
          className={route.sectionTitle}
        />
        <ul className={route.list}>
          {REFUSALS.map((item) => (
            <li key={item} className="omx-heading-4">
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Principles", href: "/company/principles" },
            { label: "People", href: "/company/people" },
            { label: "Applied engineering", href: "/engineering" },
          ]}
        />
      </Section>

    </main>
  );
}
