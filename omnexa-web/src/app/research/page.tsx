import type { Metadata } from "next";
import { Suspense } from "react";

import { TextAction } from "@/components/actions/text-action";
import { ContinueBlock } from "@/components/navigation/continue-block";
import { ResearchAtlas } from "@/components/research/atlas/research-atlas";
import { getResearchAtlas } from "@/content/queries/get-research-atlas";
import { EntityList, EntityRow, EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { StatusLabel } from "@/components/brand/status-label";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DomainVisual } from "@/components/visualizations/domain-visual";
import {
  experimentRepository,
  publicationRepository,
  researchRepository,
} from "@/content/repositories";
import { contentConfig } from "@/lib/content-config";
import { formatDateTechnical } from "@/lib/format";

import styles from "./research.module.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Omnexa Labs studies how intelligent systems learn, reason, adapt, discover, build, and operate. We engineer those capabilities into real-world systems.",
  alternates: { canonical: "/research" },
};

/**
 * The Research landing page.
 * Stage 4 §6-8, §23
 *
 * The front door to the lab's public research knowledge system. It does not
 * duplicate the homepage Research section: this page orients, exposes current
 * research state, and hands off into areas, programs and the archive.
 *
 * The Research Atlas (Stage 4 §11-22) is embedded directly in this page rather
 * than living at its own route: §11 is explicit that the atlas is not a
 * separate application.
 *
 * Counts shown inside the atlas are derived from the repositories, never
 * authored: Stage 4 §8 and §16 permit counts only when they are real, and a
 * hardcoded "31 EXPERIMENTS" is exactly the fabrication §101 forbids.
 */
export default async function ResearchPage() {
  /*
   * While research output is withheld this landing page presents the areas
   * alone. The atlas and the output sections are not merely empty without it:
   * the atlas visualises the area-to-programme-to-publication graph and would
   * draw four childless nodes, and "Active programs" would announce a heading
   * over an empty-state message. Removing them leaves one honest statement of
   * what the lab is investigating.
   *
   * A side benefit: the atlas and the areas list below it were two
   * presentations of the same four areas stacked back to back, which was a
   * standing information-architecture defect.
   */
  const showOutputs = contentConfig.publishResearchOutputs;

  const [areas, programs, experiments, publications, atlas] = await Promise.all([
    researchRepository.getAreas(),
    researchRepository.getPrograms(),
    experimentRepository.getRecent(4),
    publicationRepository.getRecent(4),
    getResearchAtlas(),
  ]);

  return (
    <main id="main">
      <PageHeader
        eyebrow="Research / OMX"
        headingLines={["Researching", "intelligence."]}
        /*
         * display-2, not display-1. The largest step is reserved for the
         * homepage hero, which is a dedicated full-height section. On a
         * landing page it consumes the entire first screen before any content
         * appears, which inverts the Stage 1 §31 density intent: monumental
         * type is meant to open a composition, not replace it.
         */
        size="display-2"
        lede="Omnexa Labs studies how intelligent systems learn, reason, adapt, discover, build, and operate. We engineer those capabilities into real-world systems."
        meta={
          <>
            <TechnicalLabel as="span">Status / Active</TechnicalLabel>
            <TextAction href="#atlas" direction="scroll">
              Explore the research atlas
            </TextAction>
          </>
        }
      />

      {/* Research thesis: Stage 4 §10 */}
      <Section tone="light" density="editorial">
        <div className={styles.thesis}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["Intelligence", "is not one", "problem."]}
            accentTerminal
          />

          <div className={styles.thesisBody}>
            <p className="omx-body-lg">
              Learning, reasoning, memory, perception, planning, discovery,
              engineering, and adaptation are deeply connected research
              problems. Omnexa studies them as parts of a larger system rather
              than isolated capabilities.
            </p>
            <p className={`omx-body ${styles.thesisSupport}`}>
              Our research spans foundational models and algorithms through
              autonomous systems, scientific discovery, software engineering,
              and the infrastructure required to make advanced intelligence
              reliable.
            </p>
          </div>
        </div>
      </Section>

      {/* Research Atlas: Stage 4 §11.
          Suspense is required because the atlas reads its selection from the
          URL via `useSearchParams`; with the boundary in place this route
          still prerenders statically and the params resolve on the client. */}
      {showOutputs ? (
        <Section tone="light" density="instrumental">
          <Suspense
            fallback={
              <p className="omx-technical" style={{ color: "var(--text-muted)" }}>
                Loading research atlas…
              </p>
            }
          >
            <ResearchAtlas data={atlas} />
          </Suspense>
        </Section>
      ) : null}

      {/* Areas: editorial presentation of the same hierarchy */}
      <Section id="areas" tone="subtle" density="editorial">
        <DisplayHeading
          as="h2"
          size="display-2"
          lines={["Four areas.", "One question:", "what can", "intelligence", "become?"]}
          accentTerminal
          className={styles.areasHeading}
        />

        <div className={styles.areas}>
          {areas.map((area) => (
            <article key={area.id} className={styles.area}>
              <div className={styles.areaVisual}>
                <DomainVisual code={area.code} />
              </div>

              <div className={styles.areaBody}>
                <div className={styles.areaMeta}>
                  <TechnicalLabel as="span" tone="muted">
                    Research area / {area.index}
                  </TechnicalLabel>
                  <TechnicalLabel as="span" tone="secondary">
                    Code / {area.code}
                  </TechnicalLabel>
                </div>

                <h3 className={`omx-heading-2 ${styles.areaTitle}`}>
                  <a href={`/research/areas/${area.slug}`} className={styles.link}>
                    {area.title}
                  </a>
                </h3>

                <p className={`omx-body-lg ${styles.areaThesis}`}>
                  {area.thesis}
                </p>

                <ul className={styles.subdomains} role="list">
                  {area.subdomains.map((subdomain) => (
                    <li key={subdomain.id} className={styles.subdomain}>
                      <span className={`omx-body-sm ${styles.subdomainTitle}`}>
                        {subdomain.title}
                      </span>
                      <span className={`omx-body-sm ${styles.subdomainQuestion}`}>
                        {subdomain.question}
                      </span>
                    </li>
                  ))}
                </ul>

                <TextAction href={`/research/areas/${area.slug}`}>
                  Explore {area.title}
                </TextAction>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Active programs: Stage 4 §27 */}
      {showOutputs ? (
      <Section tone="light" density="editorial">
        <h2 className={`omx-heading-1 ${styles.sectionTitle}`}>
          Active programs
        </h2>

        {programs.length === 0 ? (
          <EmptyState message="No public research programs are currently listed." />
        ) : (
          <EntityList>
            {programs.map((program) => (
              <EntityRow
                key={program.id}
                href={`/research/programs/${program.slug}`}
                type="Program"
                id={program.id}
                title={program.title}
                summary={program.summary}
                sample={program.sample}
                meta={<StatusLabel status={program.status} />}
              />
            ))}
          </EntityList>
        )}
      </Section>
      ) : null}

      {/* Research in progress + publications */}
      <Section tone="subtle" density="editorial">
        {showOutputs ? (
        <div className={styles.split}>
          <div>
            <h2 className={`omx-heading-3 ${styles.splitTitle}`}>
              Recent experiments
            </h2>
            {experiments.length === 0 ? (
              <EmptyState message="No public experiments are currently available." />
            ) : (
              <EntityList>
                {experiments.map((experiment) => (
                  <EntityRow
                    key={experiment.id}
                    href={`/research/experiments/${experiment.slug}`}
                    type="Experiment"
                    id={experiment.id}
                    title={experiment.title}
                    sample={experiment.sample}
                    meta={
                      experiment.startedAt ? (
                        <TechnicalLabel as="span" size="sm">
                          {formatDateTechnical(experiment.startedAt)}
                        </TechnicalLabel>
                      ) : null
                    }
                  />
                ))}
              </EntityList>
            )}
          </div>

          <div>
            <h2 className={`omx-heading-3 ${styles.splitTitle}`}>
              Recent publications
            </h2>
            {publications.length === 0 ? (
              <EmptyState message="No public publications are currently listed." />
            ) : (
              <EntityList>
                {publications.map((publication) => (
                  <EntityRow
                    key={publication.id}
                    href={`/research/publications/${publication.slug}`}
                    type="Publication"
                    id={publication.id}
                    title={publication.title}
                    sample={publication.sample}
                    meta={
                      <TechnicalLabel as="span" size="sm">
                        {formatDateTechnical(publication.publishedAt)}
                      </TechnicalLabel>
                    }
                  />
                ))}
              </EntityList>
            )}
          </div>
        </div>
        ) : null}

        {/* Every child index that currently resolves, not a subset: this
            landing is the entry point for the whole research section. The
            withheld indexes are omitted rather than linked to a 404. */}
        <div className={styles.actions}>
          <TextAction href="/research/areas">Research areas</TextAction>
          {showOutputs ? (
            <>
              <TextAction href="/research/archive">
                View research archive
              </TextAction>
              <TextAction href="/research/programs">All programs</TextAction>
              <TextAction href="/research/projects">All projects</TextAction>
              <TextAction href="/research/experiments">
                All experiments
              </TextAction>
              <TextAction href="/research/publications">
                All publications
              </TextAction>
            </>
          ) : null}
        </div>
      </Section>

      <Section tone="light" density="compact">
        <ContinueBlock
          title="The other half of the mission"
          links={[
            {
              label: "Applied engineering",
              href: "/engineering",
              detail:
                "How research results become systems that run, are observed and can be evaluated.",
            },
            {
              label: "Engineering insights",
              href: "/insights/engineering",
            },
          ]}
        />
      </Section>
    </main>
  );
}
