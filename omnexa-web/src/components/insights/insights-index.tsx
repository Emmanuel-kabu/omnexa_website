import Link from "next/link";

import { EmptyState, EntityList, EntityRow } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { insightsRepository } from "@/content/repositories";
import type { InsightType } from "@/content/schemas/editorial";
import { isPublishedInsightType } from "@/lib/content-config";
import { formatDateTechnical } from "@/lib/format";

import styles from "./insights-index.module.css";

/**
 * The four categories as routes. The taxonomy was previously announced in the
 * mega menu, the footer and each article's breadcrumb, but was navigable from
 * none of them once you were inside Insights: the index rendered one flat list
 * with no way to reach a category, and the three category routes had no inbound
 * body link anywhere on the site.
 */
const ALL_INSIGHT_CATEGORIES: Array<{ type: InsightType; label: string; href: string }> = [
  { type: "research-note", label: "Research notes", href: "/insights/research-notes" },
  { type: "engineering", label: "Engineering", href: "/insights/engineering" },
  { type: "perspective", label: "Perspectives", href: "/insights/perspectives" },
  { type: "news", label: "News", href: "/insights/news" },
];

/**
 * Only the categories whose route currently resolves. Research notes are
 * withheld with the rest of the research output, and offering a tab to a route
 * that 404s is worse than not offering it.
 */
export const INSIGHT_CATEGORIES = ALL_INSIGHT_CATEGORIES.filter((category) =>
  isPublishedInsightType(category.type),
);

/**
 * Maps an article's type to the category route that lists it.
 *
 * Resolved against the unfiltered list, then checked: a withheld category
 * degrades to /insights rather than linking somewhere that 404s.
 */
export function insightCategoryHref(type: InsightType): string {
  if (!isPublishedInsightType(type)) return "/insights";
  return (
    ALL_INSIGHT_CATEGORIES.find((category) => category.type === type)?.href ??
    "/insights"
  );
}

export const INSIGHT_TYPE_LABELS: Record<InsightType, string> = {
  "research-note": "Research note",
  engineering: "Engineering",
  perspective: "Perspective",
  news: "News",
};

/**
 * Shared editorial index for `/insights` and its four category routes.
 * Stage 6 §41-45
 *
 * Editorial rows, never a three-column blog card grid (§98). The content type
 * always leads the row, because a research note and a perspective carry very
 * different weight and the reader is entitled to know which is which before
 * clicking (§48, §50).
 */
export async function InsightsIndex({
  type,
  headingLines,
  lede,
  eyebrow,
  breadcrumbLabel,
}: {
  type?: InsightType;
  headingLines: readonly string[];
  lede: string;
  eyebrow: string;
  breadcrumbLabel?: string;
}) {
  const insights = type
    ? await insightsRepository.getByType(type)
    : await insightsRepository.getAll();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={
          breadcrumbLabel
            ? [
                { label: "Insights", href: "/insights" },
                { label: breadcrumbLabel },
              ]
            : undefined
        }
        eyebrow={eyebrow}
        headingLines={headingLines}
        lede={lede}
      />

      <Section tone="light" density="editorial">
        {/* Facet row, mirroring the archive's model so the two discovery
            surfaces behave the same way. */}
        <nav className={styles.categories} aria-label="Insight categories">
          <Link
            href="/insights"
            className={styles.category}
            data-active={!type || undefined}
            aria-current={!type ? "page" : undefined}
          >
            All
          </Link>
          {INSIGHT_CATEGORIES.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className={styles.category}
              data-active={type === category.type || undefined}
              aria-current={type === category.type ? "page" : undefined}
            >
              {category.label}
            </Link>
          ))}
        </nav>

        {insights.length === 0 ? (
          <EmptyState
            message={
              type
                ? "No articles are currently published in this category."
                : "No articles are currently published."
            }
            hint="New writing appears here as it is published."
          />
        ) : (
          <EntityList>
            {insights.map((insight) => (
              <EntityRow
                key={insight.id}
                href={`/insights/${insight.slug}`}
                type={INSIGHT_TYPE_LABELS[insight.type]}
                title={insight.title}
                summary={insight.excerpt}
                sample={insight.sample}
                meta={
                  <TechnicalLabel as="span" size="sm">
                    {formatDateTechnical(insight.publishedAt)}
                  </TechnicalLabel>
                }
              />
            ))}
          </EntityList>
        )}
      </Section>
    </main>
  );
}
