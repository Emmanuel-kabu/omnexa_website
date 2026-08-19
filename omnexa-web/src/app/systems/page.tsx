import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TextAction } from "@/components/actions/text-action";
import { ResearchId } from "@/components/brand/research-id";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { researchRepository, systemsRepository } from "@/content/repositories";
import { contentConfig } from "@/lib/content-config";
import { engineeringPrinciples } from "@/lib/engineering";

import styles from "./systems.module.css";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Omnexa Labs transforms research into engineered systems that coordinate intelligence, support complex decision-making, and operate in real environments.",
  alternates: { canonical: "/systems" },
};


/**
 * Systems landing.
 * Stage 5 §4-8, §58-59
 *
 * Data-driven so future systems appear without redesigning the page (§3), and
 * deliberately not three equal cards (§7): each system gets an indexed row
 * with its own thesis, status and research lineage.
 */
export default async function SystemsPage() {
  /*
   * While the systems are unpublished this route does not exist as far as the
   * web is concerned. A real 404 is the honest answer: an empty "no systems
   * listed" page would imply Omnexa has none, and would still be indexable.
   */
  if (!contentConfig.publishSystems) notFound();

  const [systems, areas] = await Promise.all([
    systemsRepository.getAll(),
    researchRepository.getAreas(),
  ]);

  const areaTitle = (id: string) =>
    areas.find((area) => area.id === id)?.title ?? null;

  return (
    <main id="main">
      <PageHeader
        eyebrow="Systems / OMX"
        headingLines={["Research", "in operation."]}
        /* Matches the other landing pages; display-1 belongs to the hero. */
        size="display-2"
        lede="Omnexa Labs transforms research into engineered systems that coordinate intelligence, support complex decision-making, and operate in real environments."
      />

      <Section tone="light" density="editorial">
        <div className={styles.thesis}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["A system is", "where research", "meets reality."]}
            accentTerminal
          />
          <div className={styles.thesisBody}>
            <p className="omx-body-lg">
              Models, agents, algorithms, knowledge systems, and infrastructure
              become valuable when they can operate together reliably. Omnexa
              designs systems around that integration.
            </p>
            <p className={`omx-body ${styles.thesisSupport}`}>
              Each Omnexa system has its own domain, but they share the same
              operating philosophy: intelligence should be coordinated,
              observable, testable, and capable of improving over time.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${styles.sectionTitle}`}>System index</h2>

        {systems.length === 0 ? (
          <EmptyState message="No public systems are currently listed." />
        ) : (
          <ol className={styles.index}>
            {systems.map((system) => (
              <li key={system.id} className={styles.system}>
                <div className={styles.systemIndex}>
                  <span className="omx-numeral">{system.index}</span>
                </div>

                <div className={styles.systemBody}>
                  <div className={styles.systemMeta}>
                    <ResearchId id={system.id} />
                    <TechnicalLabel as="span" tone="secondary">
                      {system.category}
                    </TechnicalLabel>
                    <TechnicalLabel as="span" tone="muted">
                      Status / {system.status}
                    </TechnicalLabel>
                  </div>

                  <h3 className={`omx-heading-1 ${styles.systemTitle}`}>
                    <a href={`/systems/${system.slug}`} className={styles.link}>
                      {system.title}
                    </a>
                  </h3>

                  <p className={`omx-body-lg ${styles.systemSummary}`}>
                    {system.summary}
                  </p>

                  {/* Research lineage: Stage 5 §58, from real relationships */}
                  {system.researchAreaIds.length > 0 ? (
                    <div className={styles.lineage}>
                      <TechnicalLabel as="span" tone="muted" size="sm">
                        Emerges from
                      </TechnicalLabel>
                      <ul className={styles.lineageList} role="list">
                        {system.researchAreaIds.map((id) => {
                          const title = areaTitle(id);
                          return title ? (
                            <li key={id} className="omx-body-sm">
                              {title}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  ) : null}

                  <TextAction href={`/systems/${system.slug}`}>
                    Explore {system.title}
                  </TextAction>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Section>

      <Section tone="light" density="editorial">
        <DisplayHeading
          as="h2"
          size="display-2"
          lines={["How we build", "systems."]}
          accentTerminal
          className={styles.sectionTitle}
        />

        <ul className={styles.principles} role="list">
          {engineeringPrinciples.map((principle, index) => (
            <li key={principle.title} className={styles.principle}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {String(index + 1).padStart(2, "0")}
              </TechnicalLabel>
              <h3 className={`omx-heading-4 ${styles.principleTitle}`}>
                {principle.title}
              </h3>
              <p className={`omx-body-sm ${styles.principleDetail}`}>
                {principle.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
