import type { Metadata } from "next";
import Link from "next/link";

import { StatusLabel } from "@/components/brand/status-label";
import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import {
  experimentRepository,
  publicationRepository,
  researchRepository,
} from "@/content/repositories";
import { formatDateTechnical } from "@/lib/format";
import { RESEARCH_STATUS_LABELS, type ResearchStatus } from "@/types/content";

import styles from "./archive.module.css";

export const metadata: Metadata = {
  title: "Research archive",
  description:
    "The complete public research index: programs, projects, experiments and publications.",
  alternates: { canonical: "/research/archive" },
};

const PAGE_SIZE = 12;

type ArchiveEntry = {
  key: string;
  type: "Program" | "Project" | "Experiment" | "Publication";
  typeParam: string;
  id: string;
  title: string;
  summary: string;
  href: string;
  areaId: string;
  status?: ResearchStatus;
  date: string;
  sample: boolean;
};

type SearchParams = {
  type?: string;
  area?: string;
  status?: string;
  year?: string;
  q?: string;
  sort?: string;
  page?: string;
};

/**
 * Research archive.
 * Stage 4 §55-59, Stage 2 §71
 *
 * URL-driven by design. Every filter, the sort order and the page number all
 * live in the query string, so a filtered view is shareable, back/forward
 * works, and crawlers can reach page two: Stage 2 §71 is explicit that
 * discovery state must not live only in JavaScript memory, and §59 requires
 * crawlable pagination rather than infinite scroll alone.
 *
 * Implemented as a server component: filtering happens on the server, so the
 * client never downloads the whole archive to filter it (Stage 2 §69).
 */
export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = await searchParams;

  const [programs, projects, experiments, publications, areas] =
    await Promise.all([
      researchRepository.getPrograms(),
      researchRepository.getProjects(),
      experimentRepository.getAll(),
      publicationRepository.getAll(),
      researchRepository.getAreas(),
    ]);

  const entries: ArchiveEntry[] = [
    ...programs.map((item): ArchiveEntry => ({
      key: item.id,
      type: "Program",
      typeParam: "program",
      id: item.id,
      title: item.title,
      summary: item.summary,
      href: `/research/programs/${item.slug}`,
      areaId: item.researchAreaId,
      status: item.status,
      date: item.updatedAt,
      sample: item.sample,
    })),
    ...projects.map((item): ArchiveEntry => ({
      key: item.id,
      type: "Project",
      typeParam: "project",
      id: item.id,
      title: item.title,
      summary: item.summary,
      href: `/research/projects/${item.slug}`,
      areaId: item.researchAreaId,
      status: item.status,
      date: item.updatedAt,
      sample: item.sample,
    })),
    ...experiments.map((item): ArchiveEntry => ({
      key: item.id,
      type: "Experiment",
      typeParam: "experiment",
      id: item.id,
      title: item.title,
      summary: item.summary,
      href: `/research/experiments/${item.slug}`,
      areaId: item.researchAreaId,
      status: item.researchStatus,
      date: item.startedAt ?? item.updatedAt,
      sample: item.sample,
    })),
    ...publications.map((item): ArchiveEntry => ({
      key: item.id,
      type: "Publication",
      typeParam: "publication",
      id: item.id,
      title: item.title,
      summary: item.summary,
      href: `/research/publications/${item.slug}`,
      areaId: item.researchAreaId,
      status: undefined,
      date: item.publishedAt,
      sample: item.sample,
    })),
  ];

  // Filters
  const search = (query.q ?? "").trim().toLowerCase();
  let filtered = entries.filter((entry) => {
    if (query.type && entry.typeParam !== query.type) return false;
    if (query.area && entry.areaId !== query.area) return false;
    // Publications carry no research status; a status facet should narrow
    // the statused types rather than erase the unstatused one entirely.
    if (query.status && entry.status && entry.status !== query.status) return false;
    if (query.status && !entry.status && query.type !== entry.typeParam) return false;
    if (query.year && !entry.date.startsWith(query.year)) return false;
    if (search) {
      // Searching an exact research ID must surface that entity: §60
      const haystack = `${entry.id} ${entry.title} ${entry.summary}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });

  const sort = query.sort ?? "newest";
  filtered = [...filtered].sort((a, b) => {
    if (sort === "oldest") return a.date.localeCompare(b.date);
    if (sort === "alphabetical") return a.title.localeCompare(b.title);
    return b.date.localeCompare(a.date);
  });

  const page = Math.max(1, Number.parseInt(query.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const years = Array.from(
    new Set(entries.map((entry) => entry.date.slice(0, 4))),
  ).sort((a, b) => b.localeCompare(a));

  /** Builds a filter URL while preserving the other active filters. */
  const buildHref = (patch: Partial<SearchParams>) => {
    const next = new URLSearchParams();
    const merged = { ...query, ...patch, page: undefined };
    for (const [key, value] of Object.entries(merged)) {
      if (value) next.set(key, String(value));
    }
    const suffix = next.toString();
    return `/research/archive${suffix ? `?${suffix}` : ""}`;
  };

  const pageHref = (target: number) => {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value && key !== "page") next.set(key, String(value));
    }
    if (target > 1) next.set("page", String(target));
    const suffix = next.toString();
    return `/research/archive${suffix ? `?${suffix}` : ""}`;
  };

  const filterGroups = [
    {
      label: "Type",
      param: "type" as const,
      options: (
        [
          { value: "program", label: "Program" },
          { value: "project", label: "Project" },
          { value: "experiment", label: "Experiment" },
          { value: "publication", label: "Publication" },
        ] as const
      ).filter((option) =>
        entries.some((entry) => entry.typeParam === option.value),
      ),
    },
    {
      label: "Area",
      param: "area" as const,
      options: areas.map((area) => ({ value: area.id, label: area.code })),
    },
    {
      // Derived from statuses actually present, and labelled properly.
      // Previously hardcoded from all seven RESEARCH_STATUSES, so four chips
      // could never match anything.
      label: "Status",
      param: "status" as const,
      options: Array.from(
        new Set(
          entries
            .map((entry) => entry.status)
            .filter((status): status is ResearchStatus => Boolean(status)),
        ),
      )
        .sort()
        .map((status) => ({
          value: status,
          label: RESEARCH_STATUS_LABELS[status],
        })),
    },
    {
      label: "Year",
      param: "year" as const,
      options: years.map((year) => ({ value: year, label: year })),
    },
  ];

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Archive" },
        ]}
        headingLines={["Research", "archive."]}
        lede="Every public program, project, experiment and publication in one index. Filter by type, area, status and year: every filtered view has its own shareable URL."
      />

      <Section tone="light" density="instrumental">
        <div className={styles.layout}>
          <aside className={styles.filters} aria-label="Archive filters">
            {filterGroups.map((group) => (
              <div key={group.param} className={styles.group}>
                <TechnicalLabel as="h2" tone="muted" size="sm">
                  {group.label}
                </TechnicalLabel>
                <ul className={styles.options} role="list">
                  {group.options.map((option) => {
                    const active = query[group.param] === option.value;
                    return (
                      <li key={option.value}>
                        <Link
                          href={buildHref({
                            [group.param]: active ? undefined : option.value,
                          })}
                          className={styles.option}
                          data-active={active || undefined}
                          /*
                           * aria-current, not aria-pressed. These facets are
                           * links that navigate to a filtered URL, and
                           * aria-pressed is only valid on elements with a
                           * button role: axe flags it as a critical
                           * aria-allowed-attr violation on an anchor.
                           */
                          aria-current={active ? "true" : undefined}
                        >
                          {option.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className={styles.group}>
              <TechnicalLabel as="h2" tone="muted" size="sm">
                Sort
              </TechnicalLabel>
              <ul className={styles.options} role="list">
                {[
                  { value: "newest", label: "Newest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "alphabetical", label: "A-Z" },
                ].map((option) => (
                  <li key={option.value}>
                    <Link
                      href={buildHref({ sort: option.value })}
                      className={styles.option}
                      data-active={sort === option.value || undefined}
                    >
                      {option.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {Object.keys(query).length > 0 ? (
              <Link href="/research/archive" className={styles.clear}>
                <TechnicalLabel as="span" tone="accent" size="sm">
                  Clear all filters
                </TechnicalLabel>
              </Link>
            ) : null}
          </aside>

          <div className={styles.results}>
            {/* A no-JS search that still produces a shareable URL */}
            {/*
              A GET form submits ONLY its own named controls, so without these
              hidden inputs searching silently discarded every active facet:
              the reader filters to Experiments, types a term, and lands back
              in an unfiltered archive with no indication why.
            */}
            <form action="/research/archive" method="get" className={styles.search}>
              {query.type ? (
                <input type="hidden" name="type" value={query.type} />
              ) : null}
              {query.area ? (
                <input type="hidden" name="area" value={query.area} />
              ) : null}
              {query.status ? (
                <input type="hidden" name="status" value={query.status} />
              ) : null}
              {query.year ? (
                <input type="hidden" name="year" value={query.year} />
              ) : null}
              {query.sort ? (
                <input type="hidden" name="sort" value={query.sort} />
              ) : null}
              <label htmlFor="archive-q" className="omx-visually-hidden">
                Search the research archive by title or identifier
              </label>
              <input
                id="archive-q"
                name="q"
                type="search"
                defaultValue={query.q ?? ""}
                placeholder="Search title or ID, e.g. OMX-DI-007"
                className={styles.input}
                maxLength={120}
              />
              <button type="submit" className={`omx-control ${styles.submit}`}>
                Search
              </button>
            </form>

            <div className={styles.count}>
              <TechnicalLabel as="p" tone="muted" size="sm">
                {filtered.length === 0
                  ? "No results"
                  : `${filtered.length} ${filtered.length === 1 ? "entry" : "entries"} · page ${current} of ${totalPages}`}
              </TechnicalLabel>
            </div>

            {visible.length === 0 ? (
              <EmptyState
                message="No entries match these filters."
                hint="Try a broader research area, another content type, or clear the filters."
              />
            ) : (
              <EntityList>
                {visible.map((entry) => (
                  <EntityRow
                    key={entry.key}
                    href={entry.href}
                    type={entry.type}
                    id={entry.id}
                    title={entry.title}
                    summary={entry.summary}
                    sample={entry.sample}
                    meta={
                      <>
                        {entry.status ? (
                          <StatusLabel status={entry.status} />
                        ) : null}
                        <TechnicalLabel as="span" size="sm">
                          {formatDateTechnical(entry.date)}
                        </TechnicalLabel>
                      </>
                    }
                  />
                ))}
              </EntityList>
            )}

            {/* Crawlable pagination: Stage 4 §59 */}
            {totalPages > 1 ? (
              <nav className={styles.pagination} aria-label="Archive pagination">
                {current > 1 ? (
                  <Link href={pageHref(current - 1)} className={styles.pageLink}>
                    ← Previous
                  </Link>
                ) : (
                  <span />
                )}

                <ol className={styles.pages}>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (number) => (
                      <li key={number}>
                        <Link
                          href={pageHref(number)}
                          className={styles.pageNumber}
                          data-active={number === current || undefined}
                          aria-current={number === current ? "page" : undefined}
                        >
                          {number}
                        </Link>
                      </li>
                    ),
                  )}
                </ol>

                {current < totalPages ? (
                  <Link href={pageHref(current + 1)} className={styles.pageLink}>
                    Next →
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}
