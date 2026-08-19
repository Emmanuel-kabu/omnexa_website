import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SampleBadge } from "@/components/brand/sample-badge";
import { StatusLabel } from "@/components/brand/status-label";
import { EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import {
  experimentRepository,
  peopleRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "@/content/repositories";
import { formatDate } from "@/lib/format";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await researchRepository.getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await researchRepository.getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title}: Research`,
    description: project.summary,
    alternates: { canonical: `/research/projects/${project.slug}` },
  };
}

/**
 * Research project page.
 * Stage 4 §36-42
 *
 * Problem, objective and hypothesis are rendered as distinct blocks rather
 * than merged prose (§38), and every optional block: methodology, evaluation,
 * results, limitations, next steps: renders only when the content exists.
 * A project with no results shows no results section rather than an empty
 * heading (§91).
 */
export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await researchRepository.getProjectBySlug(slug);
  if (!project) notFound();

  const [area, program, allExperiments, allPublications, allSystems, contributors] =
    await Promise.all([
      researchRepository.getAreaById(project.researchAreaId),
      project.programId
        ? researchRepository
            .getPrograms()
            .then((all) => all.find((p) => p.id === project.programId) ?? null)
        : Promise.resolve(null),
      experimentRepository.getAll(),
      publicationRepository.getAll(),
      systemsRepository.getAll(),
      peopleRepository.getByIds(project.contributorIds),
    ]);

  const experiments = allExperiments.filter((e) => e.projectId === project.id);
  const publications = allPublications.filter((p) =>
    p.projectIds.includes(project.id),
  );
  const systems = allSystems.filter((s) => project.systemIds.includes(s.id));

  const blocks = [
    { title: "Problem", body: project.problem },
    { title: "Objective", body: project.objective },
    { title: "Hypothesis", body: project.hypothesis },
    { title: "Method", body: project.methodology },
    { title: "Evaluation", body: project.evaluation },
    { title: "Results", body: project.results },
    { title: "Limitations", body: project.limitations },
    { title: "Next steps", body: project.nextSteps },
  ].filter((block) => Boolean(block.body));

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Projects", href: "/research/projects" },
          { label: project.title },
        ]}
        eyebrow="Research project"
        headingLines={project.title.split(" ")}
        meta={
          <>
            <TechnicalLabel as="span">{project.id}</TechnicalLabel>
            <StatusLabel status={project.status} format="prefixed" />
            {program ? (
              <TechnicalLabel as="span">
                Program /{" "}
                <Link
                  href={`/research/programs/${program.slug}`}
                  data-underline
                >
                  {program.title}
                </Link>
              </TechnicalLabel>
            ) : null}
            <TechnicalLabel as="span">
              Updated / {formatDate(project.updatedAt)}
            </TechnicalLabel>
            <SampleBadge sample={project.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            {blocks.map((block) => (
              <div key={block.title} className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  {block.title}
                </h2>
                <p className="omx-body" style={{ color: "var(--text-secondary)" }}>
                  {block.body}
                </p>
              </div>
            ))}

            {experiments.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>Experiments</h2>
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
              </div>
            ) : null}

            {publications.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>Publications</h2>
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
              </div>
            ) : null}
          </div>

          <aside className={route.readingAside}>
            <div className={route.metaBlock}>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Identifier
                </TechnicalLabel>
                <span className={`omx-identifier ${route.metaValue}`}>
                  {project.id}
                </span>
              </div>
              {area ? (
                <div className={route.metaItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    Area
                  </TechnicalLabel>
                  <a
                    href={`/research/areas/${area.slug}`}
                    className={`omx-body-sm ${route.metaValue}`}
                    data-underline
                  >
                    {area.title}
                  </a>
                </div>
              ) : null}
              {project.repositoryUrl ? (
                <div className={route.metaItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    Code
                  </TechnicalLabel>
                  <a
                    href={project.repositoryUrl}
                    className={`omx-body-sm ${route.metaValue}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-underline
                  >
                    Repository ↗
                  </a>
                </div>
              ) : null}
            </div>

            {systems.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Applied in
                </TechnicalLabel>
                <ul className={route.list}>
                  {systems.map((system) => (
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

            {contributors.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Contributors
                </TechnicalLabel>
                <ul className={route.list}>
                  {contributors.map((person) => (
                    <li key={person.id}>
                      <a
                        href={`/company/people/${person.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {person.name}
                      </a>
                      <br />
                      <span className="omx-body-sm" style={{ color: "var(--text-muted)" }}>
                        {person.role}
                      </span>
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
