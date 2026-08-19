import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { companyRepository } from "@/content/repositories";

import styles from "./principles.module.css";

export const metadata: Metadata = {
  title: "Principles",
  description:
    "The values that shape research, engineering, product and institutional decisions at Omnexa Labs.",
  alternates: { canonical: "/company/principles" },
};

/**
 * Principles: Stage 6 §15-17.
 * Numbered editorial entries separated by rules. Explicitly not icon cards
 * (§16), and only commitments Omnexa intends to follow (§15).
 */
export default async function PrinciplesPage() {
  const principles = await companyRepository.getPrinciples();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Company", href: "/company" },
          { label: "Principles" },
        ]}
        headingLines={["Principles."]}
        lede="The commitments that shape how research, engineering and institutional decisions are made here."
      />

      <Section tone="light" density="editorial">
        <ol className={styles.list}>
          {principles.map((principle, index) => (
            <li key={principle.id} className={styles.principle}>
              <TechnicalLabel as="span" tone="muted">
                {String(index + 1).padStart(2, "0")} /{" "}
                {principle.title.toUpperCase()}
              </TechnicalLabel>
              <p className={`omx-heading-3 ${styles.summary}`}>
                {principle.summary}
              </p>
              {principle.body ? (
                <p className={`omx-body ${styles.body}`}>{principle.body}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Mission", href: "/company/mission" },
            { label: "How we work", href: "/careers/culture" },
            { label: "About Omnexa", href: "/company/about" },
          ]}
        />
      </Section>

    </main>
  );
}
