import "server-only";

import { ATLAS_ROOT_ID, type AtlasData, type AtlasNode } from "@/types/atlas";

import {
  experimentRepository,
  publicationRepository,
  researchRepository,
} from "../repositories";

export type { AtlasData, AtlasNode, AtlasNodeType } from "@/types/atlas";
export { ATLAS_ROOT_ID } from "@/types/atlas";

/**
 * Research Atlas data.
 * Stage 4 §12-13, §20, Stage 7 §46
 *
 * A deliberately narrow view model. Stage 7 §46 requires domain data to be
 * transformed before it crosses to the client, and §89 forbids private
 * entities appearing in graph data, so this carries only what the atlas
 * actually draws and labels. No abstracts, no problem statements, no
 * contributor identities, no visibility fields.
 *
 * Counts are computed from the repositories, so they are real. Stage 4 §16 is
 * explicit: "Only display counts when real", which is why they are derived
 * here rather than authored anywhere.
 */

export async function getResearchAtlas(): Promise<AtlasData> {
  const [areas, programs, projects, experiments, publications] =
    await Promise.all([
      researchRepository.getAreas(),
      researchRepository.getPrograms(),
      researchRepository.getProjects(),
      experimentRepository.getAll(),
      publicationRepository.getAll(),
    ]);

  const nodes: AtlasNode[] = [
    {
      id: ATLAS_ROOT_ID,
      type: "root",
      label: "Omnexa Research",
      // The root's children are AREAS. Reporting this as a subdomain count
      // would put a true number under a false label.
      counts: { areas: areas.length },
    },
  ];

  for (const area of areas) {
    const areaPrograms = programs.filter(
      (program) => program.researchAreaId === area.id,
    );
    const areaProjects = projects.filter(
      (project) => project.researchAreaId === area.id,
    );

    nodes.push({
      id: area.id,
      parentId: ATLAS_ROOT_ID,
      type: "area",
      label: area.title,
      code: area.code,
      href: `/research/areas/${area.slug}`,
      status: area.status,
      summary: area.summary,
      sample: area.sample,
      counts: {
        subdomains: area.subdomains.length,
        programs: areaPrograms.length,
        projects: areaProjects.length,
        experiments: experiments.filter((e) => e.researchAreaId === area.id).length,
        publications: publications.filter((p) => p.researchAreaId === area.id)
          .length,
      },
    });

    for (const subdomain of area.subdomains) {
      // A program belongs to a subdomain by explicit id, never by tag
      // similarity: Stage 4 §80.
      const subdomainPrograms = areaPrograms.filter((program) =>
        program.subdomainIds.includes(subdomain.id),
      );

      nodes.push({
        id: subdomain.id,
        parentId: area.id,
        type: "subdomain",
        label: subdomain.title,
        code: area.code,
        summary: subdomain.question,
        counts: { programs: subdomainPrograms.length },
      });

      for (const program of subdomainPrograms) {
        const programProjects = areaProjects.filter(
          (project) => project.programId === program.id,
        );

        nodes.push({
          id: program.id,
          parentId: subdomain.id,
          type: "program",
          label: program.title,
          code: area.code,
          href: `/research/programs/${program.slug}`,
          status: program.status,
          summary: program.summary,
          sample: program.sample,
          counts: {
            projects: programProjects.length,
            experiments: experiments.filter((e) => e.programId === program.id)
              .length,
            publications: publications.filter((p) =>
              p.programIds.includes(program.id),
            ).length,
          },
        });

        for (const project of programProjects) {
          nodes.push({
            id: project.id,
            parentId: program.id,
            type: "project",
            label: project.title,
            code: area.code,
            href: `/research/projects/${project.slug}`,
            status: project.status,
            summary: project.summary,
            sample: project.sample,
            counts: {
              experiments: experiments.filter((e) => e.projectId === project.id)
                .length,
              publications: publications.filter((p) =>
                p.projectIds.includes(project.id),
              ).length,
            },
          });
        }
      }
    }
  }

  return { nodes };
}
