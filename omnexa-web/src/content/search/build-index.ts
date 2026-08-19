import "server-only";

import type { ContentType } from "@/types/content";
import type { InsightType } from "../schemas/editorial";

/** Kept beside the index so search labels match the Insights UI. */
const INSIGHT_SEARCH_LABELS: Record<InsightType, string> = {
  "research-note": "Research note",
  engineering: "Engineering",
  perspective: "Perspective",
  news: "News",
};

import {
  experimentRepository,
  insightsRepository,
  jobsRepository,
  peopleRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "../repositories";

/** Stage 2 §87, Stage 7 §26 */
export type SearchDocument = {
  id: string;
  entityId: string;
  type: ContentType;
  typeLabel: string;
  title: string;
  description: string;
  url: string;
  researchAreaIds: string[];
  systemIds: string[];
  status?: string;
  publishedAt?: string;
  sample: boolean;
};

/**
 * Builds the public search index.
 * Stage 7 §24, §26, §119
 *
 * Every document is sourced through the repositories, so visibility filtering
 * has already been applied: private and draft content cannot reach the index
 * by construction rather than by a filter someone has to remember. Stage 7 §26
 * is emphatic: never index private text and hide it at presentation time.
 *
 * This is the build-time index option from §119. Moving to a hosted provider
 * later means implementing `SearchProvider` against the same document shape,
 * with no change to the search UI.
 */
export async function buildSearchIndex(): Promise<SearchDocument[]> {
  const [
    areas,
    programs,
    projects,
    experiments,
    publications,
    systems,
    insights,
    people,
    jobs,
  ] = await Promise.all([
    researchRepository.getAreas(),
    researchRepository.getPrograms(),
    researchRepository.getProjects(),
    experimentRepository.getAll(),
    publicationRepository.getAll(),
    systemsRepository.getAll(),
    insightsRepository.getAll(),
    peopleRepository.getPublicPeople(),
    jobsRepository.getOpenRoles(),
  ]);

  return [
    ...areas.map((item): SearchDocument => ({
      id: `area:${item.id}`,
      entityId: item.id,
      type: "research_area",
      typeLabel: "Research area",
      title: item.title,
      description: item.summary,
      url: `/research/areas/${item.slug}`,
      researchAreaIds: [item.id],
      systemIds: [],
      status: item.status,
      sample: item.sample,
    })),

    ...programs.map((item): SearchDocument => ({
      id: `program:${item.id}`,
      entityId: item.id,
      type: "research_program",
      typeLabel: "Program",
      title: item.title,
      description: item.summary,
      url: `/research/programs/${item.slug}`,
      researchAreaIds: [item.researchAreaId],
      systemIds: [],
      status: item.status,
      publishedAt: item.updatedAt,
      sample: item.sample,
    })),

    ...projects.map((item): SearchDocument => ({
      id: `project:${item.id}`,
      entityId: item.id,
      type: "research_project",
      typeLabel: "Project",
      title: item.title,
      description: item.summary,
      url: `/research/projects/${item.slug}`,
      researchAreaIds: [item.researchAreaId],
      systemIds: item.systemIds,
      status: item.status,
      publishedAt: item.updatedAt,
      sample: item.sample,
    })),

    ...experiments.map((item): SearchDocument => ({
      id: `experiment:${item.id}`,
      entityId: item.id,
      type: "experiment",
      typeLabel: "Experiment",
      title: item.title,
      description: item.summary,
      url: `/research/experiments/${item.slug}`,
      researchAreaIds: [item.researchAreaId],
      systemIds: [],
      status: item.researchStatus,
      publishedAt: item.startedAt,
      sample: item.sample,
    })),

    ...publications.map((item): SearchDocument => ({
      id: `publication:${item.id}`,
      entityId: item.id,
      type: "publication",
      typeLabel: "Publication",
      title: item.title,
      description: item.abstract,
      url: `/research/publications/${item.slug}`,
      researchAreaIds: [item.researchAreaId],
      systemIds: item.systemIds,
      publishedAt: item.publishedAt,
      sample: item.sample,
    })),

    ...systems.map((item): SearchDocument => ({
      id: `system:${item.id}`,
      entityId: item.id,
      type: "system",
      typeLabel: "System",
      // Capability titles are folded into the description so a query like
      // "medication scanner" resolves to MedApp: Stage 5 §75.
      title: item.title,
      description: [
        item.summary,
        ...item.capabilities.map((capability) => capability.title),
      ].join(" · "),
      url: `/systems/${item.slug}`,
      researchAreaIds: item.researchAreaIds,
      systemIds: [item.id],
      status: item.status,
      sample: item.sample,
    })),

    ...insights.map((item): SearchDocument => ({
      id: `insight:${item.id}`,
      entityId: item.id,
      type: "insight",
      // The insight taxonomy is meaningful (a research note and a perspective
      // carry different weight), so search must not flatten all four to
      // "Insight" the way it previously did.
      typeLabel: INSIGHT_SEARCH_LABELS[item.type],
      title: item.title,
      description: item.excerpt,
      url: `/insights/${item.slug}`,
      researchAreaIds: item.researchAreaIds,
      systemIds: item.systemIds,
      publishedAt: item.publishedAt,
      sample: item.sample,
    })),

    ...people.map((item): SearchDocument => ({
      id: `person:${item.id}`,
      entityId: item.id,
      type: "person",
      typeLabel: "Person",
      title: item.name,
      description: item.role,
      url: `/company/people/${item.slug}`,
      researchAreaIds: item.researchAreaIds,
      systemIds: item.systemIds,
      sample: item.sample,
    })),

    ...jobs.map((item): SearchDocument => ({
      id: `job:${item.id}`,
      entityId: item.id,
      type: "job",
      typeLabel: "Open role",
      title: item.title,
      description: `${item.department} · ${item.location}`,
      url: `/careers/open-roles/${item.slug}`,
      researchAreaIds: item.researchAreaIds ?? [],
      systemIds: item.systemIds ?? [],
      publishedAt: item.publishedAt,
      sample: item.sample,
    })),
  ];
}

/**
 * Ranks documents against a query.
 * Stage 7 §27: exact ID first, then exact title, then prefix, then text
 * relevance. Recency is a secondary signal and must never dominate technical
 * relevance, so it only breaks ties.
 */
export function rankDocuments(
  documents: SearchDocument[],
  rawQuery: string,
): SearchDocument[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const scored = documents
    .map((document) => {
      const id = document.entityId.toLowerCase();
      const title = document.title.toLowerCase();
      const description = document.description.toLowerCase();

      let score = 0;
      if (id === query) score = 1000;
      else if (title === query) score = 900;
      else if (id.includes(query)) score = 800;
      else if (title.startsWith(query)) score = 700;
      else if (title.includes(query)) score = 600;
      else if (description.includes(query)) score = 400;

      return { document, score };
    })
    .filter((entry) => entry.score > 0);

  return scored
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      // Tie-break on recency only.
      return (b.document.publishedAt ?? "").localeCompare(
        a.document.publishedAt ?? "",
      );
    })
    .map((entry) => entry.document);
}
