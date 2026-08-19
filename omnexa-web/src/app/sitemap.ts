import type { MetadataRoute } from "next";

import {
  experimentRepository,
  insightsRepository,
  jobsRepository,
  peopleRepository,
  publicationRepository,
  researchRepository,
  systemsRepository,
} from "@/content/repositories";
import { contentConfig } from "@/lib/content-config";
import { site } from "@/lib/site";

/**
 * Sitemap: Stage 2 §61, Stage 7 §72.
 *
 * Generated entirely from validated public content; no URL is maintained by
 * hand. Because every entry comes through the repository layer, draft, private
 * and (when disabled) sample content are excluded automatically: the same
 * boundary the site itself uses, so the two cannot drift apart.
 *
 * Deliberately excluded: `/search` (query-parameterised results), and any
 * closed role.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [areas, programs, projects, experiments, publications, systems, insights, people, jobs] =
    await Promise.all([
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

  const url = (path: string) => `${site.url}${path}`;

  /*
   * The /systems landing route is only listed when the systems are published.
   * Entity URLs beneath it come from the repository, which already returns
   * nothing while they are withheld.
   */
  const staticRoutes: MetadataRoute.Sitemap = [
    ...(contentConfig.publishSystems
      ? [{ url: url("/systems"), priority: 0.9 }]
      : []),
    { url: url("/"), priority: 1 },
    { url: url("/research"), priority: 0.9 },
    { url: url("/engineering"), priority: 0.9 },
    { url: url("/research/areas"), priority: 0.8 },
    { url: url("/research/programs"), priority: 0.7 },
    { url: url("/research/projects"), priority: 0.7 },
    { url: url("/research/experiments"), priority: 0.7 },
    { url: url("/research/publications"), priority: 0.8 },
    { url: url("/research/archive"), priority: 0.6 },
    { url: url("/insights"), priority: 0.8 },
    { url: url("/insights/research-notes"), priority: 0.6 },
    { url: url("/insights/engineering"), priority: 0.6 },
    { url: url("/insights/perspectives"), priority: 0.6 },
    { url: url("/insights/news"), priority: 0.6 },
    { url: url("/company"), priority: 0.7 },
    { url: url("/company/about"), priority: 0.6 },
    { url: url("/company/mission"), priority: 0.6 },
    { url: url("/company/principles"), priority: 0.6 },
    { url: url("/company/people"), priority: 0.6 },
    { url: url("/company/contact"), priority: 0.5 },
    { url: url("/careers"), priority: 0.7 },
    ...(jobs.length > 0
      ? [{ url: url("/careers/open-roles"), priority: 0.7 }]
      : []),
    { url: url("/careers/research"), priority: 0.5 },
    { url: url("/careers/engineering"), priority: 0.5 },
    { url: url("/careers/culture"), priority: 0.5 },
    { url: url("/privacy"), priority: 0.2 },
    { url: url("/terms"), priority: 0.2 },
  ];

  const entityRoutes: MetadataRoute.Sitemap = [
    ...areas.map((item) => ({
      url: url(`/research/areas/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.8,
    })),
    ...programs.map((item) => ({
      url: url(`/research/programs/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.7,
    })),
    ...projects.map((item) => ({
      url: url(`/research/projects/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.7,
    })),
    ...experiments.map((item) => ({
      url: url(`/research/experiments/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.6,
    })),
    ...publications.map((item) => ({
      url: url(`/research/publications/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.8,
    })),
    ...systems.map((item) => ({
      url: url(`/systems/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.9,
    })),
    ...insights.map((item) => ({
      url: url(`/insights/${item.slug}`),
      lastModified: item.updatedAt ?? item.publishedAt,
      priority: 0.6,
    })),
    ...people.map((item) => ({
      url: url(`/company/people/${item.slug}`),
      lastModified: item.updatedAt,
      priority: 0.5,
    })),
    ...jobs.map((item) => ({
      url: url(`/careers/open-roles/${item.slug}`),
      lastModified: item.publishedAt,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...entityRoutes];
}
