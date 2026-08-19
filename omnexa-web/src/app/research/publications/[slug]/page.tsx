import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SampleBadge } from "@/components/brand/sample-badge";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { CitationBlock } from "@/components/research/citation-block";
import {
  peopleRepository,
  publicationRepository,
  researchRepository,
} from "@/content/repositories";
import { formatDate, formatDateTechnical } from "@/lib/format";

import route from "@/styles/route.module.css";

type Params = { slug: string };

const TYPE_LABELS: Record<string, string> = {
  paper: "Paper",
  "technical-report": "Technical report",
  whitepaper: "Whitepaper",
  "dataset-paper": "Dataset paper",
  benchmark: "Benchmark",
  "research-brief": "Research brief",
};

export async function generateStaticParams(): Promise<Params[]> {
  const publications = await publicationRepository.getAll();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const publication = await publicationRepository.getBySlug(slug);
  if (!publication) return { title: "Publication not found" };
  return {
    title: publication.title,
    description: publication.abstract.slice(0, 200),
    alternates: { canonical: `/research/publications/${publication.slug}` },
  };
}

/**
 * Publication detail: Stage 4 §51-54.
 *
 * `ScholarlyArticle` structured data is emitted only for formally published
 * types. Stage 2 §60 and Stage 4 §93 both forbid labelling an internal
 * technical report or research brief as a scholarly article, so the type gates
 * the schema rather than every publication getting it.
 */
export default async function PublicationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const publication = await publicationRepository.getBySlug(slug);
  if (!publication) notFound();

  const [authors, area] = await Promise.all([
    peopleRepository.getByIds(publication.authorIds),
    researchRepository.getAreaById(publication.researchAreaId),
  ]);

  const isScholarly = publication.publicationType === "paper";

  const schema = isScholarly
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: publication.title,
        abstract: publication.abstract,
        datePublished: publication.publishedAt,
        author: authors.map((person) => ({
          "@type": "Person",
          name: person.name,
        })),
        // `identifier` only when a real DOI exists: never fabricated (§53).
        ...(publication.doi ? { identifier: publication.doi } : {}),
      }
    : null;

  return (
    <main id="main">
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Publications", href: "/research/publications" },
          { label: publication.title },
        ]}
        eyebrow={TYPE_LABELS[publication.publicationType] ?? "Publication"}
        headingLines={publication.title.split(" ")}
        meta={
          <>
            <TechnicalLabel as="span">{publication.id}</TechnicalLabel>
            <TechnicalLabel as="span">
              <time dateTime={publication.publishedAt}>
                {formatDateTechnical(publication.publishedAt)}
              </time>
            </TechnicalLabel>
            <SampleBadge sample={publication.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            <div className={route.block}>
              <h2 className={`omx-heading-3 ${route.blockTitle}`}>Abstract</h2>
              <p className="omx-body-lg" style={{ color: "var(--text-secondary)" }}>
                {publication.abstract}
              </p>
            </div>

            {authors.length > 0 ? (
              <div className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>Authors</h2>
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
                      <span
                        className="omx-body-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {" "}
                        · {person.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <CitationBlock
              title={publication.title}
              authors={authors.map((person) => person.name)}
              year={publication.publishedAt.slice(0, 4)}
              id={publication.id}
              doi={publication.doi}
              citation={publication.citation}
              bibtex={publication.bibtex}
            />
          </div>

          <aside className={route.readingAside}>
            <div className={route.metaBlock}>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Identifier
                </TechnicalLabel>
                <span className={`omx-identifier ${route.metaValue}`}>
                  {publication.id}
                </span>
              </div>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Type
                </TechnicalLabel>
                <span className={`omx-body-sm ${route.metaValue}`}>
                  {TYPE_LABELS[publication.publicationType]}
                </span>
              </div>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Published
                </TechnicalLabel>
                <span className={`omx-body-sm ${route.metaValue}`}>
                  {formatDate(publication.publishedAt)}
                </span>
              </div>
              {area ? (
                <div className={route.metaItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    Area
                  </TechnicalLabel>
                  <a
                    href={`/research/areas/${area.slug}`}
                    className={`omx-body-sm ${route.metaValue}`}
                    data-underline
                  >
                    {area.title}
                  </a>
                </div>
              ) : null}
            </div>

            {/* Conditional artifact links: Stage 4 §47, §54 */}
            {publication.pdfUrl || publication.repositoryUrl ? (
              <div className={route.stackTight}>
                <TechnicalLabel as="h2" tone="muted">
                  Artifacts
                </TechnicalLabel>
                <ul className={route.list}>
                  {publication.pdfUrl ? (
                    <li>
                      <a
                        href={publication.pdfUrl}
                        className="omx-body"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-underline
                      >
                        Read PDF ↗
                      </a>
                    </li>
                  ) : null}
                  {publication.repositoryUrl ? (
                    <li>
                      <a
                        href={publication.repositoryUrl}
                        className="omx-body"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-underline
                      >
                        View code ↗
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </main>
  );
}
