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
  title: "Research projects",
  description:
    "Concrete research efforts at Omnexa Labs, with methodology, experiments, evaluation and limitations.",
  alternates: { canonical: "/research/projects" },
};

export default async function ProjectsPage() {
  /*
   * Withheld until there is real research output to publish. A 404 is the
   * honest answer: an empty index would imply the lab has produced nothing,
   * and would still be indexable. Restored by
   * NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS=true.
   */
  if (!contentConfig.publishResearchOutputs) notFound();

  const projects = await researchRepository.getProjects();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Research", href: "/research" }, { label: "Projects" }]}
        headingLines={["Research", "projects."]}
        lede="A project is narrower and more implementation-oriented than a program."
      />
      <Section tone="light" density="editorial">
        {projects.length === 0 ? (
          <EmptyState message="No public research projects are currently listed." />
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
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          title="Browse research"
          links={[
            { label: "All research in the archive", href: "/research/archive?type=project" },
            { label: "Programs", href: "/research/programs" },
            { label: "Experiments", href: "/research/experiments" },
            { label: "Publications", href: "/research/publications" },
          ]}
        />
      </Section>

    </main>
  );
}
