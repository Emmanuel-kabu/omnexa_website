import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StatusLabel } from "@/components/brand/status-label";
import { SampleBadge } from "@/components/brand/sample-badge";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import {
  experimentRepository,
  publicationRepository,
  researchRepository,
} from "@/content/repositories";
import { formatDate, formatMonth } from "@/lib/format";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const programs = await researchRepository.getPrograms();
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await researchRepository.getProgramBySlug(slug);
  if (!program) return { title: "Program not found" };

  return {
    title: `${program.title}: Research`,
    description: program.summary,
    alternates: { canonical: `/research/programs/${program.slug}` },
  };
}

/**
 * Research program page.
 * Stage 4 §28-35
 *
 * Note what is absent: there is no "Current findings" block rendered with
 * invented observations. Stage 4 §35 requires findings to distinguish
 * OBSERVED / HYPOTHESIS / OPEN QUESTION, and §101 forbids fabricating them:
 * so the section appears only when a program actually carries them.
 */
export default async function ProgramPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const program = await researchRepository.getProgramBySlug(slug);
  if (!program) notFound();

  const [area, allProjects, allExperiments, allPublications] = await Promise.all([
    researchRepository.getAreaById(program.researchAreaId),
    researchRepository.getProjects(),
    experimentRepository.getAll(),
    publicationRepository.getAll(),
  ]);

  const projects = allProjects.filter((p) => p.programId === program.id);
  const experiments = allExperiments
    .filter((e) => e.programId === program.id)
    .sort((a, b) => (a.startedAt ?? "").localeCompare(b.startedAt ?? ""));
  const publications = allPublications.filter((p) =>
    p.programIds.includes(program.id),
  );

  return (
    <main id="main">
      <PageHeader
        /* Route trail, not taxonomy trail: every crumb is a real ancestor
           URL, so trimming the address bar never strands the reader. Area
           lineage lives in the meta row below instead. */
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Programs", href: "/research/programs" },
          { label: program.title },
        ]}
        eyebrow="Research program"
        headingLines={program.title.split(" ")}
        meta={
          <>
            <TechnicalLabel as="span">{program.id}</TechnicalLabel>
            <StatusLabel status={program.status} format="prefixed" />
            {area ? (
              <TechnicalLabel as="span">Area / {area.code}</TechnicalLabel>
            ) : null}
            {program.startedAt ? (
              <TechnicalLabel as="span">
                Started / {formatMonth(program.startedAt)}
              </TechnicalLabel>
            ) : null}
            <TechnicalLabel as="span">
              Updated / {formatDate(program.updatedAt)}
            </TechnicalLabel>
            <SampleBadge sample={program.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            <div className={route.block}>
              <h2 className={`omx-heading-2 ${route.blockTitle}`}>The problem.</h2>
              <p className="omx-body-lg" style={{ color: "var(--text-secondary)" }}>
                {program.problemStatement}
              </p>
            </div>

            {program.researchQuestions.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  Research questions
                </h2>
                <ol className={route.list}>
                  {program.researchQuestions.map((question) => (
                    <li key={question.id} className={route.listItem}>
                      <TechnicalLabel as="span" tone="accent" size="sm">
                        {question.id}
                      </TechnicalLabel>
                      <span className="omx-body">{question.question}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {program.researchDirections.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  Research directions
                </h2>
                <ul className={route.list}>
                  {program.researchDirections.map((direction) => (
                    <li key={direction} className="omx-body">
                      {direction}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                Active projects
              </h2>
              {projects.length === 0 ? (
                <EmptyState message="No public projects are currently listed for this program." />
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

            {/* Experiment timeline: Stage 4 §34. Real dates only. */}
            {experiments.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  Experiment timeline
                </h2>
                <ol className={route.list}>
                  {experiments.map((experiment) => (
                    <li key={experiment.id} className={route.listItem}>
                      <TechnicalLabel as="span" tone="muted" size="sm">
                        {experiment.startedAt
                          ? formatMonth(experiment.startedAt)
                          : "Undated"}
                      </TechnicalLabel>
                      <span>
                        <a
                          href={`/research/experiments/${experiment.slug}`}
                          className="omx-body"
                          data-underline
                        >
                          {experiment.title}
                        </a>{" "}
                        <TechnicalLabel as="span" tone="muted" size="sm">
                          {experiment.id}
                        </TechnicalLabel>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Publications</h2>
              {publications.length === 0 ? (
                <EmptyState message="No public publications are currently listed for this program." />
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
            <div className={route.metaBlock}>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Identifier
                </TechnicalLabel>
                <span className={`omx-identifier ${route.metaValue}`}>
                  {program.id}
                </span>
              </div>
              {area ? (
                <div className={route.metaItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    Research area
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
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Status
                </TechnicalLabel>
                <span className={route.metaValue}>
                  <StatusLabel status={program.status} />
                </span>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
