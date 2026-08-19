import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { peopleRepository, publicationRepository } from "@/content/repositories";
import { formatDateTechnical } from "@/lib/format";

import styles from "./publications.module.css";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Papers, technical reports and research briefs from Omnexa Labs.",
  alternates: { canonical: "/research/publications" },
};

const TYPE_LABELS: Record<string, string> = {
  paper: "Paper",
  "technical-report": "Technical report",
  whitepaper: "Whitepaper",
  "dataset-paper": "Dataset paper",
  benchmark: "Benchmark",
  "research-brief": "Research brief",
};

/**
 * Publication index: Stage 4 §49-50.
 * Grouped by year, editorial rows rather than a card grid.
 */
export default async function PublicationsPage() {
  const publications = await publicationRepository.getAll();

  // Author names are resolved up front rather than inside the render map: an
  // async callback in `.map()` yields promises into JSX, which never render.
  const authorNames = new Map<string, string>();
  await Promise.all(
    publications.map(async (publication) => {
      const authors = await peopleRepository.getByIds(publication.authorIds);
      authorNames.set(
        publication.id,
        authors.map((person) => person.name).join(", "),
      );
    }),
  );

  const byYear = publications.reduce<Record<string, typeof publications>>(
    (accumulator, publication) => {
      const year = publication.publishedAt.slice(0, 4);
      accumulator[year] = [...(accumulator[year] ?? []), publication];
      return accumulator;
    },
    {},
  );

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Publications" },
        ]}
        headingLines={["Publications."]}
        lede="Formal and semi-formal research output from across the lab."
      />

      <Section tone="light" density="editorial">
        {publications.length === 0 ? (
          <EmptyState message="No public publications are currently listed." />
        ) : (
          years.map((year) => (
            <div key={year} className={styles.year}>
              <TechnicalLabel as="h2" tone="secondary" className={styles.yearLabel}>
                Year / {year}
              </TechnicalLabel>

              <EntityList>
                {byYear[year].map((publication) => (
                  <EntityRow
                    key={publication.id}
                    href={`/research/publications/${publication.slug}`}
                    type={TYPE_LABELS[publication.publicationType] ?? "Publication"}
                    id={publication.id}
                    title={publication.title}
                    summary={authorNames.get(publication.id)}
                    sample={publication.sample}
                    meta={
                      <TechnicalLabel as="span" size="sm">
                        {formatDateTechnical(publication.publishedAt)}
                      </TechnicalLabel>
                    }
                  />
                ))}
              </EntityList>
            </div>
          ))
        )}
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          title="Browse research"
          links={[
            { label: "All research in the archive", href: "/research/archive?type=publication" },
            { label: "Programs", href: "/research/programs" },
            { label: "Projects", href: "/research/projects" },
            { label: "Experiments", href: "/research/experiments" },
          ]}
        />
      </Section>

    </main>
  );
}
