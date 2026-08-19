import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StatusLabel } from "@/components/brand/status-label";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DomainVisual } from "@/components/visualizations/domain-visual";
import {
  experimentRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "@/content/repositories";
import { site } from "@/lib/site";

import route from "@/styles/route.module.css";

type Params = { slug: string };

/** Static generation for every public area: Stage 4 §87. */
export async function generateStaticParams(): Promise<Params[]> {
  const areas = await researchRepository.getAreas();
  return areas.map((area) => ({ slug: area.slug }));
}

/** Stage 4 §92: metadata generated from validated structured content. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await researchRepository.getAreaBySlug(slug);
  if (!area) return { title: "Research area not found" };

  return {
    title: `${area.title}: Research`,
    description: area.summary,
    alternates: { canonical: `/research/areas/${area.slug}` },
    openGraph: {
      title: `${area.title}: Research | ${site.name}`,
      description: area.summary,
    },
  };
}

/**
 * Research area detail.
 * Stage 4 §24-26
 */
export default async function ResearchAreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const area = await researchRepository.getAreaBySlug(slug);

  // Stage 7 §138: an unknown entity must produce a real 404, not a 200 page
  // that says "not found".
  if (!area) notFound();

  const [allPrograms, allProjects, allExperiments, allPublications, allSystems] =
    await Promise.all([
      researchRepository.getPrograms(),
      researchRepository.getProjects(),
      experimentRepository.getAll(),
      publicationRepository.getAll(),
      systemsRepository.getAll(),
    ]);

  const programs = allPrograms.filter((p) => p.researchAreaId === area.id);
  const projects = allProjects.filter((p) => p.researchAreaId === area.id);
  const experiments = allExperiments.filter((e) => e.researchAreaId === area.id);
  const publications = allPublications.filter(
    (p) => p.researchAreaId === area.id,
  );
  const relatedSystems = allSystems.filter((s) =>
    s.researchAreaIds.includes(area.id),
  );

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Areas", href: "/research/areas" },
          { label: area.title },
        ]}
        eyebrow={`Research area / ${area.index}`}
        headingLines={area.title.split(" & ").map((part, index, all) =>
          index < all.length - 1 ? `${part} &` : part,
        )}
        lede={area.thesis}
        meta={
          <>
            <TechnicalLabel as="span">Code / {area.code}</TechnicalLabel>
            <StatusLabel status={area.status} format="prefixed" />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Subdomains</h2>
              <ol className={route.list}>
                {area.subdomains.map((subdomain, index) => (
                  <li key={subdomain.id} className={route.listItem}>
                    <TechnicalLabel as="span" tone="muted" size="sm">
                      {String(index + 1).padStart(2, "0")}
                    </TechnicalLabel>
                    <span>
                      <span className="omx-body">{subdomain.title}</span>
                      <br />
                      <span className="omx-body-sm" style={{ color: "var(--text-muted)" }}>
                        {subdomain.question}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                Active programs
              </h2>
              {programs.length === 0 ? (
                <EmptyState message="No public research programs are currently listed for this area." />
              ) : (
                <EntityList>
                  {programs.map((program) => (
                    <EntityRow
                      key={program.id}
                      href={`/research/programs/${program.slug}`}
                      type="Program"
                      id={program.id}
                      title={program.title}
                      summary={program.summary}
                      sample={program.sample}
                      meta={<StatusLabel status={program.status} />}
                    />
                  ))}
                </EntityList>
              )}
            </div>

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                Selected projects
              </h2>
              {projects.length === 0 ? (
                <EmptyState message="No public research projects are currently listed for this area." />
              ) : (
                <EntityList>
                  {projects.map((project) => (
                    <EntityRow
                      key={project.id}
                      href={`/research/projects/${project.slug}`}
                      type="Project"
                      id={project.id}
                      title={project.title}
                      summary={project.summary}
                      sample={project.sample}
                      meta={<StatusLabel status={project.status} />}
                    />
                  ))}
                </EntityList>
              )}
            </div>

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Experiments</h2>
              {experiments.length === 0 ? (
                <EmptyState message="No public experiments are currently available for this area." />
              ) : (
                <EntityList>
                  {experiments.map((experiment) => (
                    <EntityRow
                      key={experiment.id}
                      href={`/research/experiments/${experiment.slug}`}
                      type="Experiment"
                      id={experiment.id}
                      title={experiment.title}
                      sample={experiment.sample}
                    />
                  ))}
                </EntityList>
              )}
            </div>

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Publications</h2>
              {publications.length === 0 ? (
                <EmptyState message="No public publications are currently listed for this area." />
              ) : (
                <EntityList>
                  {publications.map((publication) => (
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
              )}
            </div>
          </div>

          <aside className={route.readingAside}>
            <DomainVisual code={area.code} />

            {/* Stage 4 §61: the research → systems relationship is central to
                Omnexa's identity, so it is surfaced on the area page too.
                Omitted entirely when there is nothing real to show (§91). */}
            {relatedSystems.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Applied in
                </TechnicalLabel>
                <ul className={route.list}>
                  {relatedSystems.map((system) => (
                    <li key={system.id}>
                      <a
                        href={`/systems/${system.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {system.title} →
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
