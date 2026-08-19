import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SampleBadge } from "@/components/brand/sample-badge";
import { OutcomeLabel, StatusLabel } from "@/components/brand/status-label";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { experimentRepository, researchRepository } from "@/content/repositories";
import { formatOptionalDate } from "@/lib/format";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const experiments = await experimentRepository.getAll();
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experiment = await experimentRepository.getBySlug(slug);
  if (!experiment) return { title: "Experiment not found" };
  return {
    title: `${experiment.title}: Experiment`,
    description: experiment.objective,
    alternates: { canonical: `/research/experiments/${experiment.slug}` },
    // Stage 4 §93: an internal experiment is NOT a scholarly article, so no
    // ScholarlyArticle structured data is emitted here.
  };
}

/** Experiment detail: Stage 4 §44-48. */
export default async function ExperimentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const experiment = await experimentRepository.getBySlug(slug);
  if (!experiment) notFound();

  const area = await researchRepository.getAreaById(experiment.researchAreaId);

  const blocks = [
    { title: "Objective", body: experiment.objective },
    { title: "Hypothesis", body: experiment.hypothesis },
    { title: "Setup", body: experiment.setup },
    { title: "Results", body: experiment.results },
    { title: "Observations", body: experiment.observations },
    { title: "Conclusion", body: experiment.conclusion },
    { title: "Limitations", body: experiment.limitations },
  ].filter((block) => Boolean(block.body));

  const references = [
    { label: "Dataset", items: experiment.dataset },
    { label: "Model", items: experiment.models },
    { label: "Environment", items: experiment.environment },
  ].filter((group) => group.items.length > 0);

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Experiments", href: "/research/experiments" },
          { label: experiment.title },
        ]}
        eyebrow="Experiment"
        headingLines={experiment.title.split(" ")}
        meta={
          <>
            <TechnicalLabel as="span">{experiment.id}</TechnicalLabel>
            <StatusLabel status={experiment.researchStatus} format="prefixed" />
            {experiment.outcomeStatus ? (
              <OutcomeLabel outcome={experiment.outcomeStatus} />
            ) : null}
            <TechnicalLabel as="span">
              Started / {formatOptionalDate(experiment.startedAt)}
            </TechnicalLabel>
            <TechnicalLabel as="span">
              Completed / {formatOptionalDate(experiment.completedAt)}
            </TechnicalLabel>
            <SampleBadge sample={experiment.sample} />
          </>
        }
      />

      <Section tone="light" density="instrumental">
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

            {/* Stage 4 §47: only link artifacts that exist. */}
            {references.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  Configuration
                </h2>
                {references.map((group) => (
                  <div key={group.label} className={route.metaBlock}>
                    {group.items.map((item) => (
                      <div key={item.label} className={route.metaItem}>
                        <TechnicalLabel as="span" tone="muted" size="sm">
                          {group.label} / {item.label}
                        </TechnicalLabel>
                        <span className={`omx-body-sm ${route.metaValue}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
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
                  {experiment.id}
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
              {experiment.projectId ? (
                <div className={route.metaItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    Project
                  </TechnicalLabel>
                  <span className={`omx-identifier ${route.metaValue}`}>
                    {experiment.projectId}
                  </span>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
