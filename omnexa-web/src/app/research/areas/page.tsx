import type { Metadata } from "next";
import Link from "next/link";

import { TextAction } from "@/components/actions/text-action";
import { StatusLabel } from "@/components/brand/status-label";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ContinueBlock } from "@/components/navigation/continue-block";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DomainVisual } from "@/components/visualizations/domain-visual";
import { researchRepository } from "@/content/repositories";
import { contentConfig } from "@/lib/content-config";

import styles from "./areas.module.css";

export const metadata: Metadata = {
  title: "Research areas",
  description:
    "The four areas Omnexa Labs researches, and the subdomain questions inside each: developmental intelligence, foundation models, algorithms and computational discovery, and AI for software and systems.",
  alternates: { canonical: "/research/areas" },
};

/**
 * Research areas index.
 *
 * Areas are the top of the content model, and until now the only level with no
 * index of its own: `/research/areas/{slug}` resolved while `/research/areas`
 * 404'd, and the menu entry pointed at an in-page anchor rather than a route.
 *
 * This page is also where the subdomain titles and questions now live as a
 * crawlable, no-JavaScript surface. The Research Atlas presents the same
 * hierarchy as an instrument for exploring relationships; this presents it as
 * a directory you can read, link to and index. The two are different jobs, not
 * two renderings of one job.
 */
export default async function ResearchAreasPage() {
  const areas = await researchRepository.getAreas();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Research", href: "/research" },
          { label: "Areas" },
        ]}
        headingLines={["Research", "areas."]}
        lede="Four areas, each holding the subdomain questions Omnexa is actually working on."
      />

      <Section tone="light" density="editorial">
        {areas.length === 0 ? (
          <EmptyState message="No public research areas are currently listed." />
        ) : (
          <ol className={styles.areas}>
            {areas.map((area) => (
              <li key={area.id} className={styles.area}>
                <div className={styles.visual}>
                  <DomainVisual code={area.code} />
                </div>

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <TechnicalLabel as="span" tone="muted">
                      Area / {area.index}
                    </TechnicalLabel>
                    <TechnicalLabel as="span" tone="secondary">
                      Code / {area.code}
                    </TechnicalLabel>
                    <StatusLabel status={area.status} />
                  </div>

                  <h2 className={`omx-heading-2 ${styles.title}`}>
                    <Link
                      href={`/research/areas/${area.slug}`}
                      className={styles.link}
                    >
                      {area.title}
                    </Link>
                  </h2>

                  <p className={`omx-body-lg ${styles.thesis}`}>{area.thesis}</p>

                  {/* The subdomain question is the substance of an area, and
                      this is the only crawlable surface that carries it. */}
                  <ul className={styles.subdomains} role="list">
                    {area.subdomains.map((subdomain) => (
                      <li key={subdomain.id} className={styles.subdomain}>
                        <span className={`omx-body-sm ${styles.subdomainTitle}`}>
                          {subdomain.title}
                        </span>
                        <span
                          className={`omx-body-sm ${styles.subdomainQuestion}`}
                        >
                          {subdomain.question}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.actions}>
                    <TextAction href={`/research/areas/${area.slug}`}>
                      Explore {area.title}
                    </TextAction>
                    {/* The archive is withheld with the output it indexes. */}
                    {contentConfig.publishResearchOutputs ? (
                      <TextAction href={`/research/archive?area=${area.id}`}>
                        All work in this area
                      </TextAction>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </Section>

      {/* Every link in the "Browse research" form points at a research output
          index, so the whole block is replaced rather than filtered while those
          are withheld. It is replaced and not simply dropped because this page
          would otherwise end cold, which is the defect ContinueBlock exists to
          prevent. */}
      <Section tone="light" density="compact">
        {contentConfig.publishResearchOutputs ? (
          <ContinueBlock
            title="Browse research"
            links={[
              { label: "All research in the archive", href: "/research/archive" },
              { label: "Programs", href: "/research/programs" },
              { label: "Projects", href: "/research/projects" },
              { label: "Publications", href: "/research/publications" },
            ]}
          />
        ) : (
          <ContinueBlock
            title="Continue"
            links={[
              {
                label: "Applied engineering",
                href: "/engineering",
                detail:
                  "The other half of the mission: how research becomes systems that run and can be evaluated.",
              },
              {
                label: "How the lab works",
                href: "/company/mission",
              },
            ]}
          />
        )}
      </Section>
    </main>
  );
}
