import type { Metadata } from "next";

import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { buildSearchIndex, rankDocuments } from "@/content/search/build-index";

import styles from "./search.module.css";

export const metadata: Metadata = {
  title: "Search",
  description: "Search research, systems, insights, people and roles at Omnexa Labs.",
  alternates: { canonical: "/search" },
  // A query-parameterised results page should not be indexed: Stage 7 §70.
  robots: { index: false, follow: true },
};

/** Stage 7 §67: bound the query rather than accepting arbitrary input. */
const MAX_QUERY_LENGTH = 120;
const MAX_RESULTS = 40;

/**
 * Global search: Stage 2 §37-38, Stage 7 §28-29.
 *
 * A server-rendered form. Search works with JavaScript disabled, every query
 * has a shareable URL, and there is no fetch-per-keystroke (§29). Searching an
 * exact research ID such as `OMX-DI-007` surfaces that entity first (§27).
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").slice(0, MAX_QUERY_LENGTH);

  const documents = await buildSearchIndex();
  const results = query ? rankDocuments(documents, query).slice(0, MAX_RESULTS) : [];

  return (
    <main id="main">
      <PageHeader
        eyebrow="Search"
        headingLines={["Search."]}
        lede="Search across research areas, programs, projects, experiments, publications, systems, insights, people and open roles."
      >
        <form action="/search" method="get" className={styles.form} role="search">
          <label htmlFor="q" className="omx-visually-hidden">
            Search Omnexa Labs
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Search by title, topic or research ID"
            className={styles.input}
            maxLength={MAX_QUERY_LENGTH}
            autoComplete="off"
          />
          <button type="submit" className={`omx-control ${styles.submit}`}>
            Search
          </button>
        </form>
      </PageHeader>

      <Section tone="light" density="editorial">
        {!query ? (
          <EmptyState
            message="Enter a search term to begin."
            hint="Try a research area, a system name, or an identifier such as OMX-DI-007."
          />
        ) : results.length === 0 ? (
          /* Stage 2 §67: the search empty state suggests a way forward */
          <div className={styles.noResults}>
            <h2 className="omx-heading-2">No results</h2>
            <p className="omx-body-lg">
              Nothing matches “{query}”.
            </p>
            <ul className={styles.suggestions}>
              <li className="omx-body">A broader research topic</li>
              <li className="omx-body">Another system name</li>
              <li className="omx-body">A researcher</li>
              <li className="omx-body">A publication title or research ID</li>
            </ul>
          </div>
        ) : (
          <>
            <TechnicalLabel as="p" tone="muted" className={styles.count}>
              {results.length} {results.length === 1 ? "result" : "results"} for “
              {query}”
            </TechnicalLabel>

            <EntityList>
              {results.map((result) => (
                <EntityRow
                  key={result.id}
                  href={result.url}
                  /* Stage 2 §37: results must visibly show content type */
                  type={result.typeLabel}
                  id={
                    result.entityId.startsWith("OMX-") ? result.entityId : undefined
                  }
                  title={result.title}
                  summary={result.description}
                  sample={result.sample}
                  meta={
                    result.status ? (
                      <TechnicalLabel as="span" size="sm">
                        {result.status}
                      </TechnicalLabel>
                    ) : null
                  }
                />
              ))}
            </EntityList>
          </>
        )}
      </Section>
    </main>
  );
}
