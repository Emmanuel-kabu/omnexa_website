import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SampleBadge } from "@/components/brand/sample-badge";
import {
  INSIGHT_TYPE_LABELS,
  insightCategoryHref,
} from "@/components/insights/insights-index";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import {
  insightsRepository,
  peopleRepository,
  researchRepository,
  systemsRepository,
} from "@/content/repositories";
import { formatDate, formatDateTechnical } from "@/lib/format";
import { site } from "@/lib/site";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const insights = await insightsRepository.getAll();
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = await insightsRepository.getBySlug(slug);
  if (!insight) return { title: "Article not found" };

  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.excerpt,
      publishedTime: insight.publishedAt,
    },
  };
}

/**
 * Insight article.
 * Stage 6 §46-52
 *
 * `NewsArticle` is emitted only for the news type and `Article` for the rest:
 * Stage 6 §79 permits structured data only where the content qualifies, and a
 * research note is not a news article.
 */
export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const insight = await insightsRepository.getBySlug(slug);
  if (!insight) notFound();

  const [authors, areas, systems, related] = await Promise.all([
    peopleRepository.getByIds(insight.authorIds),
    researchRepository.getAreas(),
    systemsRepository.getAll(),
    insightsRepository.getAll(),
  ]);

  const relatedAreas = areas.filter((area) =>
    insight.researchAreaIds.includes(area.id),
  );
  const relatedSystems = systems.filter((system) =>
    insight.systemIds.includes(system.id),
  );
  /*
   * Prefer same-category, then fall back to anything else recent. The
   * same-type filter alone returns nothing for every article in the current
   * corpus, so the block silently never rendered.
   */
  const sameType = related.filter(
    (item) => item.id !== insight.id && item.type === insight.type,
  );
  const otherArticles = related.filter(
    (item) => item.id !== insight.id && item.type !== insight.type,
  );
  const relatedArticles = [...sameType, ...otherArticles].slice(0, 3);
  const relatedTitle =
    sameType.length > 0
      ? `More ${INSIGHT_TYPE_LABELS[insight.type].toLowerCase()}`
      : "More from Insights";

  const schema = {
    "@context": "https://schema.org",
    "@type": insight.type === "news" ? "NewsArticle" : "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.publishedAt,
    ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
    author: authors.map((person) => ({
      "@type": "Person",
      name: person.name,
    })),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHeader
        breadcrumb={[
          { label: "Insights", href: "/insights" },
          {
            // Was a dead <span> with no href, and shipped a JSON-LD ListItem
            // with no URL, while all four category routes exist.
            label: INSIGHT_TYPE_LABELS[insight.type],
            href: insightCategoryHref(insight.type),
          },
          { label: insight.title },
        ]}
        eyebrow={INSIGHT_TYPE_LABELS[insight.type]}
        headingLines={[insight.title]}
        size="heading-1"
        lede={insight.excerpt}
        meta={
          <>
            <TechnicalLabel as="span">
              <time dateTime={insight.publishedAt}>
                {formatDateTechnical(insight.publishedAt)}
              </time>
            </TechnicalLabel>
            {authors.length > 0 ? (
              <TechnicalLabel as="span">
                {authors.map((person) => person.name).join(", ")}
              </TechnicalLabel>
            ) : null}
            <SampleBadge sample={insight.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <article className={route.readingMain}>
            <div className={route.prose}>
              {insight.body ? (
                insight.body
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="omx-body-lg">
                      {paragraph}
                    </p>
                  ))
              ) : (
                /* Honest state: the record has an excerpt but no body yet. */
                <p className="omx-body-lg">
                  The full text of this article has not been published yet.
                </p>
              )}
            </div>
          </article>

          <aside className={route.readingAside}>
            {authors.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  {authors.length === 1 ? "Author" : "Authors"}
                </TechnicalLabel>
                <ul className={route.list}>
                  {authors.map((person) => (
                    <li key={person.id}>
                      <a
                        href={`/company/people/${person.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {person.name}
                      </a>
                      <br />
                      <span
                        className="omx-body-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {person.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedAreas.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Related research
                </TechnicalLabel>
                <ul className={route.list}>
                  {relatedAreas.map((area) => (
                    <li key={area.id}>
                      <a
                        href={`/research/areas/${area.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {area.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedSystems.length > 0 ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Related systems
                </TechnicalLabel>
                <ul className={route.list}>
                  {relatedSystems.map((system) => (
                    <li key={system.id}>
                      <a
                        href={`/systems/${system.slug}`}
                        className="omx-body"
                        data-underline
                      >
                        {system.title} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className={route.stackTight}>
              <TechnicalLabel as="h2" tone="muted">
                Published
              </TechnicalLabel>
              <p className="omx-body-sm">{formatDate(insight.publishedAt)}</p>
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 ? (
          <div className={route.block} style={{ marginTop: "var(--omx-space-16)" }}>
            <h2 className={`omx-heading-3 ${route.blockTitle}`}>
              {relatedTitle}
            </h2>
            <ul className={route.list}>
              {relatedArticles.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/insights/${item.slug}`}
                    className="omx-body"
                    data-underline
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
    </main>
  );
}
