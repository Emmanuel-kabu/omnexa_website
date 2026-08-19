import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SampleBadge } from "@/components/brand/sample-badge";
import { EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import {
  insightsRepository,
  peopleRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "@/content/repositories";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const people = await peopleRepository.getPublicPeople();
  return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await peopleRepository.getBySlug(slug);
  if (!person) return { title: "Profile not found" };
  return {
    title: person.name,
    description: person.bio.slice(0, 200),
    alternates: { canonical: `/company/people/${person.slug}` },
  };
}

/**
 * Person page: Stage 6 §26-28, §81.
 *
 * Everything shown comes from the content record: role, bio, and relationships
 * to research, publications and systems. Nothing is inferred and nothing is
 * embellished: §28 forbids inventing degrees, employers, awards, titles or
 * social links, so each external link renders only if it actually exists.
 */
export default async function PersonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const person = await peopleRepository.getBySlug(slug);
  if (!person) notFound();

  const [areas, projects, publications, systems, insights] = await Promise.all([
    researchRepository.getAreas(),
    researchRepository.getProjects(),
    publicationRepository.getAll(),
    systemsRepository.getAll(),
    insightsRepository.getAll(),
  ]);

  const personAreas = areas.filter((area) =>
    person.researchAreaIds.includes(area.id),
  );
  const personProjects = projects.filter((project) =>
    person.researchProjectIds.includes(project.id),
  );
  const personPublications = publications.filter((publication) =>
    person.publicationIds.includes(publication.id),
  );
  const personSystems = systems.filter((system) =>
    person.systemIds.includes(system.id),
  );
  const personInsights = insights.filter((insight) =>
    person.insightIds.includes(insight.id),
  );

  const links = [
    { label: "GitHub", href: person.githubUrl },
    { label: "LinkedIn", href: person.linkedinUrl },
    { label: "Website", href: person.websiteUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    ...(links.length > 0 ? { sameAs: links.map((link) => link.href) } : {}),
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        breadcrumb={[
          { label: "Company", href: "/company" },
          { label: "People", href: "/company/people" },
          { label: person.name },
        ]}
        eyebrow="Person"
        headingLines={[person.name]}
        size="heading-1"
        meta={
          <>
            <TechnicalLabel as="span">{person.role}</TechnicalLabel>
            {person.team ? (
              <TechnicalLabel as="span">{person.team}</TechnicalLabel>
            ) : null}
            <SampleBadge sample={person.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Biography</h2>
              <p className="omx-body-lg" style={{ color: "var(--text-secondary)" }}>
                {person.bio}
              </p>
            </div>

            {personProjects.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>Projects</h2>
                <EntityList>
                  {personProjects.map((project) => (
                    <EntityRow
                      key={project.id}
                      href={`/research/projects/${project.slug}`}
                      type="Project"
                      id={project.id}
                      title={project.title}
                      sample={project.sample}
                    />
                  ))}
                </EntityList>
              </div>
            ) : null}

            {personPublications.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  Publications
                </h2>
                <EntityList>
                  {personPublications.map((publication) => (
                    <EntityRow
                      key={publication.id}
                      href={`/research/publications/${publication.slug}`}
                      type="Publication"
                      id={publication.id}
                      title={publication.title}
                      sample={publication.sample}
                    />
                  ))}
                </EntityList>
              </div>
            ) : null}

            {personInsights.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>Writing</h2>
                <ul className={route.list}>
                  {personInsights.map((insight) => (
                    <li key={insight.id}>
                      <a
                        href={`/insights/${insight.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {insight.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className={route.readingAside}>
            {personAreas.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Research areas
                </TechnicalLabel>
                <ul className={route.list}>
                  {personAreas.map((area) => (
                    <li key={area.id}>
                      <a
                        href={`/research/areas/${area.slug}`}
                        className="omx-body-sm"
                        data-underline
                      >
                        {area.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {personSystems.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Systems
                </TechnicalLabel>
                <ul className={route.list}>
                  {personSystems.map((system) => (
                    <li key={system.id}>
                      <a
                        href={`/systems/${system.slug}`}
                        className="omx-body-sm"
                        data-underline
                      >
                        {system.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {links.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Elsewhere
                </TechnicalLabel>
                <ul className={route.list}>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="omx-body-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-underline
                      >
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </main>
  );
}
