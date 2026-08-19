import type { Metadata } from "next";

import { TextAction } from "@/components/actions/text-action";
import { CoordinateLabel } from "@/components/brand/coordinate-label";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ContinueBlock } from "@/components/navigation/continue-block";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { companyRepository, researchRepository } from "@/content/repositories";
import { operatingModelLabels } from "@/lib/operating-model";

import route from "@/styles/route.module.css";
import styles from "./company.module.css";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Omnexa Labs is an AI research and engineering lab focused on advancing machine intelligence and building systems that apply that research to real problems.",
  alternates: { canonical: "/company" },
};


export default async function CompanyPage() {
  const [principles, areas] = await Promise.all([
    companyRepository.getPrinciples(),
    researchRepository.getAreas(),
  ]);

  return (
    <main id="main">
      <PageHeader
        eyebrow="Company / OMX"
        headingLines={["Building", "an institution", "for intelligence."]}
        size="display-2"
        lede="Omnexa Labs is an AI research and engineering lab focused on advancing machine intelligence and building systems that apply that research to real problems."
      />

      <Section tone="light" density="editorial">
        <div className={styles.positioning}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["We are", "a research", "and engineering", "lab."]}
            accentTerminal
          />

          <div className={styles.positioningBody}>
            <p className="omx-body-lg">
              Omnexa combines long-term research with applied engineering. We
              study intelligent systems, build the infrastructure required to
              improve them, and turn promising ideas into operational
              technologies.
            </p>

            <ul className={styles.framing} role="list">
              <li className="omx-heading-4">Research creates knowledge.</li>
              <li className="omx-heading-4">Engineering creates capability.</li>
              <li className="omx-heading-4">Systems create impact.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Research divisions: Stage 6 §20 */}
      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>
          Research areas
        </h2>
        <ul className={styles.divisions} role="list">
          {areas.map((area) => (
            <li key={area.id} className={styles.division}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {area.index}
              </TechnicalLabel>
              <h3 className={`omx-heading-3 ${styles.divisionTitle}`}>
                <a href={`/research/areas/${area.slug}`} className={styles.link}>
                  {area.title}
                </a>
              </h3>
              <p className={`omx-body-sm ${styles.divisionSummary}`}>
                {area.summary}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Operating model */}
      <Section tone="light" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Operating model</h2>
        <ol className={styles.loop}>
          {operatingModelLabels.map((stage, index) => (
            <li key={stage} className={styles.loopStage}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {String(index + 1).padStart(2, "0")}
              </TechnicalLabel>
              <span className="omx-heading-4">{stage}</span>
            </li>
          ))}
        </ol>
        <p className={`omx-body ${styles.loopNote}`}>
          Learning feeds the next research question. The loop closes.
        </p>
      </Section>

      {/* Principles preview */}
      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Principles</h2>
        <ol className={styles.principles}>
          {principles.slice(0, 4).map((principle, index) => (
            <li key={principle.id} className={styles.principle}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {String(index + 1).padStart(2, "0")} /{" "}
                {principle.title.toUpperCase()}
              </TechnicalLabel>
              <p className="omx-body">{principle.summary}</p>
            </li>
          ))}
        </ol>
        <div className={route.actions} style={{ marginTop: "var(--omx-space-10)" }}>
          <TextAction href="/company/principles">All principles</TextAction>
          <TextAction href="/company/mission">Read our mission</TextAction>
        </div>
      </Section>

      {/* Directory: /company/about and /company/people had zero inbound
          body links anywhere on the site before this. */}
      <Section tone="light" density="editorial">
        <ContinueBlock
          title="In this section"
          links={[
            {
              label: "About",
              href: "/company/about",
              detail: "What Omnexa is, and the current stage of the lab.",
            },
            {
              label: "Mission",
              href: "/company/mission",
              detail: "Why Omnexa exists, and what it refuses to optimise for.",
            },
            {
              label: "Principles",
              href: "/company/principles",
              detail: "The commitments that shape research and engineering decisions.",
            },
            {
              label: "People",
              href: "/company/people",
              detail: "The researchers and engineers behind the work.",
            },
            {
              label: "Contact",
              href: "/company/contact",
              detail: "Research collaboration, partnerships, press and careers.",
            },
          ]}
        />
      </Section>

      {/* Where we work */}
      <Section tone="light" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Where we work
            </TechnicalLabel>
            <CoordinateLabel />
          </div>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Get in touch
            </TechnicalLabel>
            <div className={route.actions}>
              <TextAction href="/company/contact">Contact Omnexa</TextAction>
              <TextAction href="/careers">Join Omnexa</TextAction>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
