import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { StatusLabel } from "@/components/brand/status-label";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { researchRepository } from "@/content/repositories";
import { contentConfig } from "@/lib/content-config";

export const metadata: Metadata = {
  title: "Research programs",
  description:
    "Long-running thematic research initiatives at Omnexa Labs, each containing multiple projects and experiments.",
  alternates: { canonical: "/research/programs" },
};

export default async function ProgramsPage() {
  /*
   * Withheld until there is real research output to publish. A 404 is the
   * honest answer: an empty index would imply the lab has produced nothing,
   * and would still be indexable. Restored by
   * NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS=true.
   */
  if (!contentConfig.publishResearchOutputs) notFound();

  const programs = await researchRepository.getPrograms();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Research", href: "/research" }, { label: "Programs" }]}
        headingLines={["Research", "programs."]}
        lede="A program is a durable research initiative containing multiple projects and experiments."
      />
      <Section tone="light" density="editorial">
        {programs.length === 0 ? (
          <EmptyState
            message="No public research programs are currently listed."
            hint="Programs appear here once they are published."
          />
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
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          title="Browse research"
          links={[
            { label: "All research in the archive", href: "/research/archive?type=program" },
            { label: "Projects", href: "/research/projects" },
            { label: "Experiments", href: "/research/experiments" },
            { label: "Publications", href: "/research/publications" },
          ]}
        />
      </Section>

    </main>
  );
}
