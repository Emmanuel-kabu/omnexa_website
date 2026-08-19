import "server-only";

import {
  experimentRepository,
  insightsRepository,
  jobsRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "../repositories";
import type { Insight, Job } from "../schemas/editorial";
import type {
  Experiment,
  Publication,
  ResearchArea,
  ResearchProgram,
  ResearchProject,
} from "../schemas/research";
import type { System } from "../schemas/systems";

export type FeaturedResearchItem = ResearchProgram | ResearchProject;

/** A publication or experiment, tagged so the feed can label its type. */
export type KnowledgeItem =
  | { kind: "publication"; entity: Publication }
  | { kind: "experiment"; entity: Experiment };

export type HomePageContent = {
  researchAreas: ResearchArea[];
  featuredResearch: FeaturedResearchItem[];
  systems: System[];
  researchOS: System | null;
  knowledge: KnowledgeItem[];
  insights: Insight[];
  openRoles: Job[];
};

/**
 * Resilient wrapper: Stage 3 §49.
 *
 * "No dynamic homepage query may crash the entire page." A failure in one
 * section degrades that section to its empty state and logs structured
 * context (Stage 7 §53); the rest of the page is unaffected.
 */
async function safely<T>(
  label: string,
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "content_query_failed",
        query: label,
        route: "/",
        message: error instanceof Error ? error.message : "unknown error",
      }),
    );
    return fallback;
  }
}

/**
 * Compose the homepage.
 * Stage 3 §30: independent queries run in parallel; no route-level waterfall
 * (Stage 7 §37). Page components stay data-source agnostic.
 */
export async function getHomePageContent(): Promise<HomePageContent> {
  const [
    researchAreas,
    featuredResearch,
    systems,
    researchOS,
    publications,
    experiments,
    insights,
    openRoles,
  ] = await Promise.all([
    safely("researchAreas", () => researchRepository.getAreas(), []),
    safely("featuredResearch", () => researchRepository.getFeatured(2), []),
    safely("systems", () => systemsRepository.getHomepageSystems(), []),
    safely("researchOS", () => systemsRepository.getResearchOS(), null),
    safely("publications", () => publicationRepository.getRecent(2), []),
    safely("experiments", () => experimentRepository.getRecent(2), []),
    safely("insights", () => insightsRepository.getFeatured(3), []),
    safely("openRoles", () => jobsRepository.getOpenRoles(), []),
  ]);

  // Interleave so the feed leads with a publication but still shows type
  // diversity: Stage 3 §31.
  const knowledge: KnowledgeItem[] = [
    ...publications.map(
      (entity): KnowledgeItem => ({ kind: "publication", entity }),
    ),
    ...experiments.map(
      (entity): KnowledgeItem => ({ kind: "experiment", entity }),
    ),
  ].slice(0, 4);

  return {
    researchAreas,
    featuredResearch,
    systems,
    researchOS,
    knowledge,
    insights,
    openRoles,
  };
}
