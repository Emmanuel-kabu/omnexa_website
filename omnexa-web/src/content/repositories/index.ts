import "server-only";

import { contentConfig } from "@/lib/content-config";
import { isDirectlyAddressable, isPubliclyVisible } from "@/types/content";

import { localContent } from "../adapters/local-provider";
import type { CompanyPrinciple, Insight, Job, Person } from "../schemas/editorial";
import type {
  Experiment,
  Publication,
  ResearchArea,
  ResearchProgram,
  ResearchProject,
} from "../schemas/research";
import type { System } from "../schemas/systems";

/**
 * Repository layer.
 * Stage 2 §95 Phase 3, Stage 7 §7
 *
 * Owns content retrieval, source-independent interfaces and, critically,
 * visibility enforcement. Filtering happens HERE rather than in pages or
 * components, so there is exactly one place where private or draft content
 * could leak, and it is the same place for every consumer: routes, related
 * content, the sitemap and the search index alike (Stage 7 §150).
 */

type Visible = { visibility: string; sample?: boolean };

/** The public-surface predicate. Everything indexable passes through this. */
function isListable<T extends Visible>(entity: T): boolean {
  if (!isPubliclyVisible(entity.visibility as never)) return false;
  if (entity.sample && !contentConfig.includeSampleContent) return false;
  return true;
}

/** Direct URL access is slightly wider than indexing: `unlisted` resolves. */
function isAddressable<T extends Visible>(entity: T): boolean {
  if (!isDirectlyAddressable(entity.visibility as never)) return false;
  if (entity.sample && !contentConfig.includeSampleContent) return false;
  return true;
}

function bySlug<T extends Visible & { slug: string }>(
  items: T[],
  slug: string,
): T | null {
  return items.find((item) => item.slug === slug && isAddressable(item)) ?? null;
}

/** Editorial priority first, then recency: Stage 2 §92, Stage 3 §31. */
function byFeaturePriority<
  T extends { featuredPriority?: number; updatedAt: string },
>(a: T, b: T): number {
  const priorityA = a.featuredPriority ?? Number.MAX_SAFE_INTEGER;
  const priorityB = b.featuredPriority ?? Number.MAX_SAFE_INTEGER;
  if (priorityA !== priorityB) return priorityA - priorityB;
  return b.updatedAt.localeCompare(a.updatedAt);
}

/* ══════════════════════════════════════════════════════════════ research ══ */

export const researchRepository = {
  async getAreas(): Promise<ResearchArea[]> {
    return localContent
      .researchAreas()
      .filter(isListable)
      .sort((a, b) => a.index.localeCompare(b.index));
  },

  async getAreaBySlug(slug: string): Promise<ResearchArea | null> {
    return bySlug(localContent.researchAreas(), slug);
  },

  async getAreaById(id: string): Promise<ResearchArea | null> {
    return localContent.researchAreas().find((area) => area.id === id) ?? null;
  },

  async getPrograms(): Promise<ResearchProgram[]> {
    return localContent.researchPrograms().filter(isListable).sort(byFeaturePriority);
  },

  async getProgramBySlug(slug: string): Promise<ResearchProgram | null> {
    return bySlug(localContent.researchPrograms(), slug);
  },

  async getProjects(): Promise<ResearchProject[]> {
    return localContent.researchProjects().filter(isListable).sort(byFeaturePriority);
  },

  async getProjectBySlug(slug: string): Promise<ResearchProject | null> {
    return bySlug(localContent.researchProjects(), slug);
  },

  /** Stage 3 §31: featured is an editorial flag, never inferred from recency. */
  async getFeatured(limit = 3): Promise<Array<ResearchProgram | ResearchProject>> {
    const programs = localContent
      .researchPrograms()
      .filter((item) => isListable(item) && item.featured);
    const projects = localContent
      .researchProjects()
      .filter((item) => isListable(item) && item.featured);

    return [...programs, ...projects].sort(byFeaturePriority).slice(0, limit);
  },
};

export const experimentRepository = {
  async getAll(): Promise<Experiment[]> {
    return localContent
      .experiments()
      .filter(isListable)
      .sort((a, b) => (b.startedAt ?? "").localeCompare(a.startedAt ?? ""));
  },

  async getBySlug(slug: string): Promise<Experiment | null> {
    return bySlug(localContent.experiments(), slug);
  },

  async getRecent(limit = 3): Promise<Experiment[]> {
    return (await experimentRepository.getAll()).slice(0, limit);
  },
};

export const publicationRepository = {
  async getAll(): Promise<Publication[]> {
    return localContent
      .publications()
      .filter(isListable)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async getBySlug(slug: string): Promise<Publication | null> {
    return bySlug(localContent.publications(), slug);
  },

  async getRecent(limit = 3): Promise<Publication[]> {
    return (await publicationRepository.getAll()).slice(0, limit);
  },
};

/* ═══════════════════════════════════════════════════════════════ systems ══ */

export const systemsRepository = {
  /**
   * Systems are gated as a group by `contentConfig.publishSystems`.
   *
   * The gate lives here rather than in the pages so that every consumer
   * inherits it automatically: homepage sections, the sitemap, the search
   * index, and the "applied in" / "related systems" lists on research,
   * insight and person pages all go quiet together. There is no page that can
   * forget to check.
   */
  async getAll(): Promise<System[]> {
    if (!contentConfig.publishSystems) return [];

    return localContent
      .systems()
      .filter(isListable)
      .sort((a, b) => a.index.localeCompare(b.index));
  },

  async getBySlug(slug: string): Promise<System | null> {
    if (!contentConfig.publishSystems) return null;
    return bySlug(localContent.systems(), slug);
  },

  /**
   * The homepage shows Cadence and MedApp; ResearchOS gets its own section
   * because it represents the lab's own infrastructure (Stage 3 §19).
   */
  async getHomepageSystems(): Promise<System[]> {
    const all = await systemsRepository.getAll();
    return all.filter((system) => system.slug !== "researchos");
  },

  async getResearchOS(): Promise<System | null> {
    return systemsRepository.getBySlug("researchos");
  },
};

/* ═════════════════════════════════════════════════════════════ editorial ══ */

export const insightsRepository = {
  async getAll(): Promise<Insight[]> {
    return localContent
      .insights()
      .filter(isListable)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async getBySlug(slug: string): Promise<Insight | null> {
    return bySlug(localContent.insights(), slug);
  },

  async getByType(type: Insight["type"]): Promise<Insight[]> {
    return (await insightsRepository.getAll()).filter((item) => item.type === type);
  },

  /**
   * Stage 3 §31: the homepage feed prefers type diversity over pure recency,
   * so one strong category cannot crowd out the others.
   */
  async getFeatured(limit = 3): Promise<Insight[]> {
    const all = await insightsRepository.getAll();
    const preferredOrder: Insight["type"][] = [
      "engineering",
      "research-note",
      "perspective",
      "news",
    ];

    const picked: Insight[] = [];
    for (const type of preferredOrder) {
      const next = all.find(
        (item) => item.type === type && !picked.includes(item),
      );
      if (next) picked.push(next);
      if (picked.length === limit) return picked;
    }

    for (const item of all) {
      if (picked.length === limit) break;
      if (!picked.includes(item)) picked.push(item);
    }

    return picked;
  },
};

export const peopleRepository = {
  async getPublicPeople(): Promise<Person[]> {
    return localContent.people().filter(isListable);
  },

  async getBySlug(slug: string): Promise<Person | null> {
    return bySlug(localContent.people(), slug);
  },

  /** Resolves author IDs for display; unknown IDs are dropped, never guessed. */
  async getByIds(ids: string[]): Promise<Person[]> {
    const all = localContent.people();
    return ids
      .map((id) => all.find((person) => person.id === id))
      .filter((person): person is Person => Boolean(person));
  },
};

export const jobsRepository = {
  /** Stage 6 §38: only open roles are listed. Draft never appears at all. */
  async getOpenRoles(): Promise<Job[]> {
    return localContent
      .jobs()
      .filter((job) => job.status === "open")
      .filter((job) => !job.sample || contentConfig.includeSampleContent);
  },

  async getBySlug(slug: string): Promise<Job | null> {
    const job = localContent.jobs().find((item) => item.slug === slug);
    if (!job || job.status === "draft") return null;
    if (job.sample && !contentConfig.includeSampleContent) return null;
    return job;
  },
};

export const companyRepository = {
  async getPrinciples(): Promise<CompanyPrinciple[]> {
    return localContent
      .companyPrinciples()
      .filter((principle) => principle.visibility === "public")
      .sort((a, b) => a.order - b.order);
  },
};
