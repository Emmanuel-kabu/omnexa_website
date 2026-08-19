import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TextAction } from "@/components/actions/text-action";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { ArchitectureDiagram } from "@/components/systems/architecture-diagram";
import { insightsRepository, researchRepository, systemsRepository } from "@/content/repositories";

import route from "@/styles/route.module.css";
import styles from "./system.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const systems = await systemsRepository.getAll();
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = await systemsRepository.getBySlug(slug);
  if (!system) return { title: "System not found" };

  return {
    // Stage 5 §76
    title: `${system.title}: ${system.category}`,
    description: system.summary,
    alternates: { canonical: `/systems/${system.slug}` },
    openGraph: {
      title: `${system.title}: ${system.tagline}`,
      description: system.summary,
    },
  };
}

/**
 * System detail.
 * Stage 5 §10, §28, §42, §56
 *
 * One route serves all three systems, driven by the shared information
 * backbone (§10). Stage 5 §62 prefers dedicated flagship routes so each can be
 * separately art-directed: that is a Stage 5 deliverable. This template
 * covers the full backbone and each system's own architecture data and visual
 * grammar, so splitting it later is a move, not a rewrite.
 *
 * `SoftwareApplication` structured data is deliberately NOT emitted: Stage 5
 * §77 forbids marking internal software as a public application, and none of
 * the three is publicly available.
 */
export default async function SystemPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const system = await systemsRepository.getBySlug(slug);
  if (!system) notFound();

  const [areas, allInsights] = await Promise.all([
    researchRepository.getAreas(),
    insightsRepository.getAll(),
  ]);

  const relatedAreas = areas.filter((area) =>
    system.researchAreaIds.includes(area.id),
  );
  const relatedInsights = allInsights.filter((insight) =>
    insight.systemIds.includes(system.id),
  );

  const capabilityGroups = system.capabilities.reduce<
    Record<string, typeof system.capabilities>
  >((accumulator, capability) => {
    const key = capability.category ?? "Capabilities";
    accumulator[key] = [...(accumulator[key] ?? []), capability];
    return accumulator;
  }, {});

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Systems", href: "/systems" },
          { label: system.title },
        ]}
        eyebrow={`System / ${system.id}`}
        headingLines={[system.title]}
        meta={
          <>
            <TechnicalLabel as="span">
              Category / {system.category}
            </TechnicalLabel>
            <TechnicalLabel as="span">Status / {system.status}</TechnicalLabel>
          </>
        }
      >
        <DisplayHeading
          as="p"
          size="display-2"
          lines={system.statement}
          accentTerminal
          className={styles.statement}
        />
        <p className={`omx-body-lg ${styles.summary}`}>{system.summary}</p>
      </PageHeader>

      {/* Problem */}
      <Section tone="light" density="editorial">
        <div className={styles.problem}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={system.problemHeadline}
            accentTerminal
          />
          <p className={`omx-body-lg ${styles.problemBody}`}>
            {system.problemStatement}
          </p>
        </div>
      </Section>

      {/* Research foundation: Stage 5 §18, §32, only real relationships */}
      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>
          Research foundation
        </h2>
        {relatedAreas.length === 0 ? (
          <EmptyState message="No public research relationships are currently listed for this system." />
        ) : (
          <ul className={styles.areas} role="list">
            {relatedAreas.map((area) => (
              <li key={area.id} className={styles.area}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  {area.code}
                </TechnicalLabel>
                <h3 className={`omx-heading-3 ${styles.areaTitle}`}>
                  <a href={`/research/areas/${area.slug}`} className={styles.link}>
                    {area.title}
                  </a>
                </h3>
                <p className={`omx-body-sm ${styles.areaSummary}`}>
                  {area.summary}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Architecture */}
      {system.architecture ? (
        <Section tone="dark" density="editorial">
          <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Architecture</h2>
          <ArchitectureDiagram architecture={system.architecture} />
        </Section>
      ) : null}

      {/* Capabilities */}
      <Section tone="light" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>
          Core capabilities
        </h2>

        {system.capabilities.length === 0 ? (
          <EmptyState message="No capabilities are currently published for this system." />
        ) : (
          <div className={styles.capabilities}>
            {Object.entries(capabilityGroups).map(([group, capabilities]) => (
              <div key={group} className={styles.capabilityGroup}>
                <TechnicalLabel as="h3" tone="secondary">
                  {group}
                </TechnicalLabel>
                <ul className={styles.capabilityList} role="list">
                  {capabilities.map((capability) => (
                    <li key={capability.id} className={styles.capability}>
                      <div className={styles.capabilityHead}>
                        <h4 className="omx-heading-4">{capability.title}</h4>
                        {/* Maturity is a claim about readiness, so it is always
                            shown alongside the capability: Stage 5 §66-67 */}
                        {capability.maturity ? (
                          <TechnicalLabel as="span" tone="muted" size="sm">
                            {capability.maturity}
                          </TechnicalLabel>
                        ) : null}
                      </div>
                      <p className={`omx-body-sm ${styles.capabilitySummary}`}>
                        {capability.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Evidence: Stage 5 §26, §66. Empty until verifiable evidence exists. */}
      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Evidence</h2>
        {system.evidence.length === 0 ? (
          <EmptyState
            message="No published evidence is available for this system yet."
            hint="Architecture demonstrations, evaluation reports and measured results are listed here once they exist and have been reviewed."
          />
        ) : (
          <ul className={styles.evidence} role="list">
            {system.evidence.map((item, index) => (
              <li key={index} className={styles.evidenceItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  {item.type}
                </TechnicalLabel>
                {item.type === "metric" ? (
                  <>
                    <span className="omx-heading-4">{item.value}</span>
                    <p className="omx-body-sm">{item.context}</p>
                  </>
                ) : item.type === "architecture" ? (
                  <>
                    <span className="omx-heading-4">{item.title}</span>
                    <p className="omx-body-sm">{item.description}</p>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Status + related work */}
      <Section tone="light" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Current status
            </TechnicalLabel>
            <p className="omx-heading-4">Status / {system.status}</p>
            <p className={`omx-body ${styles.statusNote}`}>{system.statusNote}</p>
          </div>

          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Related insights
            </TechnicalLabel>
            {relatedInsights.length === 0 ? (
              <p className={`omx-body ${styles.statusNote}`}>
                No related articles are currently published.
              </p>
            ) : (
              <ul className={route.list}>
                {relatedInsights.map((insight) => (
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
            )}
          </div>
        </div>

        <div className={styles.cta}>
          {/* Stage 5 §69: no "Try now" or "Request access" without a real flow */}
          <TextAction href="/research">Read related research</TextAction>
          <TextAction href="/company/contact">Contact Omnexa</TextAction>
        </div>
      </Section>
    </main>
  );
}
