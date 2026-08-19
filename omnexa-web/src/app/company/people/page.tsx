import type { Metadata } from "next";
import Link from "next/link";

import { SampleBadge } from "@/components/brand/sample-badge";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { peopleRepository, researchRepository, systemsRepository } from "@/content/repositories";

import styles from "./people.module.css";

export const metadata: Metadata = {
  title: "People",
  description:
    "Researchers and engineers building Omnexa's models, systems, infrastructure, and research programs.",
  alternates: { canonical: "/company/people" },
};

/**
 * People index: Stage 6 §23-25.
 *
 * Work-first, not a gallery of employee cards. Each row leads with the person's
 * role and then the research and systems they actually work on, drawn from
 * structured relationships rather than free text.
 */
export default async function PeoplePage() {
  const [people, areas, systems] = await Promise.all([
    peopleRepository.getPublicPeople(),
    researchRepository.getAreas(),
    systemsRepository.getAll(),
  ]);

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Company", href: "/company" }, { label: "People" }]}
        headingLines={["The people", "behind", "the work."]}
        lede="Researchers and engineers building Omnexa's models, systems, infrastructure, and research programs."
      />

      <Section tone="light" density="editorial">
        {people.length === 0 ? (
          <EmptyState message="No public profiles are currently listed." />
        ) : (
          <ul className={styles.list} role="list">
            {people.map((person) => {
              const personAreas = areas.filter((area) =>
                person.researchAreaIds.includes(area.id),
              );
              const personSystems = systems.filter((system) =>
                person.systemIds.includes(system.id),
              );

              return (
                <li key={person.id} className={styles.person}>
                  <div className={styles.identity}>
                    <h2 className={`omx-heading-2 ${styles.name}`}>
                      <Link
                        href={`/company/people/${person.slug}`}
                        className={styles.link}
                      >
                        {person.name}
                      </Link>
                    </h2>
                    <div className={styles.role}>
                      <TechnicalLabel as="span" tone="secondary">
                        {person.role}
                      </TechnicalLabel>
                      {person.team ? (
                        <TechnicalLabel as="span" tone="muted">
                          {person.team}
                        </TechnicalLabel>
                      ) : null}
                      <SampleBadge sample={person.sample} />
                    </div>
                  </div>

                  <div className={styles.work}>
                    {personAreas.length > 0 ? (
                      <div className={styles.workGroup}>
                        <TechnicalLabel as="h3" tone="muted" size="sm">
                          Research
                        </TechnicalLabel>
                        <ul className={styles.workList} role="list">
                          {personAreas.map((area) => (
                            <li key={area.id} className="omx-body-sm">
                              {area.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {personSystems.length > 0 ? (
                      <div className={styles.workGroup}>
                        <TechnicalLabel as="h3" tone="muted" size="sm">
                          Systems
                        </TechnicalLabel>
                        <ul className={styles.workList} role="list">
                          {personSystems.map((system) => (
                            <li key={system.id} className="omx-body-sm">
                              {system.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </main>
  );
}
