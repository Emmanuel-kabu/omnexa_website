import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { OutcomeLabel, StatusLabel } from "@/components/brand/status-label";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { experimentRepository } from "@/content/repositories";
import { formatDateTechnical } from "@/lib/format";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "A technical archive of public experiments from Omnexa Labs, including inconclusive and failed outcomes.",
  alternates: { canonical: "/research/experiments" },
};

/**
 * Experiment index: Stage 4 §43.
 * High-density and instrument-like. Failed and inconclusive experiments are
 * listed rather than hidden, per §48.
 */
export default async function ExperimentsPage() {
  const experiments = await experimentRepository.getAll();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Experiments" },
        ]}
        headingLines={["Experiments."]}
        lede="Public experiments across the lab. Inconclusive and failed outcomes are recorded here too: a failed experiment is valid research output."
      />
      <Section tone="light" density="instrumental">
        {experiments.length === 0 ? (
          <EmptyState message="No public experiments are currently available." />
        ) : (
          <EntityList>
            {experiments.map((experiment) => (
              <EntityRow
                key={experiment.id}
                href={`/research/experiments/${experiment.slug}`}
                type="Experiment"
                id={experiment.id}
                title={experiment.title}
                summary={experiment.summary}
                sample={experiment.sample}
                meta={
                  <>
                    <StatusLabel status={experiment.researchStatus} />
                    {experiment.outcomeStatus ? (
                      <OutcomeLabel outcome={experiment.outcomeStatus} />
                    ) : null}
                    {experiment.startedAt ? (
                      <TechnicalLabel as="span" size="sm">
                        {formatDateTechnical(experiment.startedAt)}
                      </TechnicalLabel>
                    ) : null}
                  </>
                }
              />
            ))}
          </EntityList>
        )}
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          title="Browse research"
          links={[
            { label: "All research in the archive", href: "/research/archive?type=experiment" },
            { label: "Programs", href: "/research/programs" },
            { label: "Projects", href: "/research/projects" },
            { label: "Publications", href: "/research/publications" },
          ]}
        />
      </Section>

    </main>
  );
}
