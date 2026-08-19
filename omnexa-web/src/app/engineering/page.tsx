import type { Metadata } from "next";
import Link from "next/link";

import { TextAction } from "@/components/actions/text-action";
import { PageHeader } from "@/components/layout/page-header";
import { ContinueBlock } from "@/components/navigation/continue-block";
import { Section } from "@/components/layout/section";
import { Tile, TileGrid } from "@/components/layout/tile";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { researchRepository, systemsRepository } from "@/content/repositories";
import { engineeringPractice, engineeringPrinciples } from "@/lib/engineering";

import route from "@/styles/route.module.css";
import styles from "./engineering.module.css";

export const metadata: Metadata = {
  title: "Applied engineering",
  description:
    "Omnexa Labs engineers research into systems that operate reliably in real environments. This is the engineering practice: how we build, evaluate and operate what research produces.",
  alternates: { canonical: "/engineering" },
};

/**
 * Applied engineering.
 *
 * The Omnexa mission is rigorous research AND applied engineering. Engineering
 * is the discipline that makes research usable, so it holds a permanent place
 * in the information architecture; it does not depend on any particular
 * engineered system being public yet.
 *
 * CONTENT INTEGRITY
 * -----------------
 * This page describes practice and commitment only. It names no engineered
 * product, claims no capability, and reports no metric. The engineering
 * disciplines are read from the real research areas through the repository, so
 * they cannot drift from the research the lab actually does. When systems are
 * published the closing section links to them; until then it states plainly
 * that they are in development, which is the honest answer rather than a gap.
 */
export default async function EngineeringPage() {
  const [areas, systems] = await Promise.all([
    researchRepository.getAreas(),
    systemsRepository.getAll(),
  ]);

  /*
   * The engineering-facing research areas, derived rather than hardcoded: these
   * are the areas whose subdomains are themselves engineering problems, so the
   * disciplines below always reflect current research.
   */
  const engineeringAreaCodes = new Set(["SE", "FM"]);
  const engineeringAreas = areas.filter((area) =>
    engineeringAreaCodes.has(area.code),
  );

  return (
    <main id="main">
      <PageHeader
        eyebrow="Engineering / OMX"
        headingLines={["Applied", "engineering."]}
        size="display-2"
        lede="Research becomes useful when it runs. Omnexa engineers research results into systems that operate reliably, expose their own state, and can be evaluated."
        meta={
          <>
            <TechnicalLabel as="span">Practice / Active</TechnicalLabel>
            <TextAction href="/research">Explore research</TextAction>
          </>
        }
      />

      {/* Thesis */}
      <Section tone="light" density="editorial">
        <div className={styles.thesis}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["Engineering", "is evidence."]}
            accentTerminal
          />

          <div className={styles.thesisBody}>
            <p className="omx-body-lg">
              Models, agents, algorithms, knowledge systems and infrastructure
              become valuable when they operate together reliably. Omnexa
              designs for that integration rather than treating it as a step
              that happens once the research is finished.
            </p>
            <p className={`omx-body ${styles.thesisSupport}`}>
              Engineering is not a phase that follows research here. It is how
              research is tested: a result that cannot be built, operated and
              observed is not yet a result.
            </p>
          </div>
        </div>
      </Section>

      {/* Disciplines, derived from real research areas */}
      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>
          What we engineer
        </h2>

        <TileGrid columns={2}>
          {engineeringAreas.map((area) => (
            <Tile
              key={area.id}
              index={area.code}
              title={area.title}
              href={`/research/areas/${area.slug}`}
            >
              <ul className={styles.subdomains} role="list">
                {area.subdomains.map((subdomain) => (
                  <li key={subdomain.id} className="omx-body-sm">
                    {subdomain.title}
                  </li>
                ))}
              </ul>
            </Tile>
          ))}
        </TileGrid>
      </Section>

      {/* How we build */}
      <Section tone="light" density="editorial">
        <DisplayHeading
          as="h2"
          size="display-2"
          lines={["How we", "build."]}
          accentTerminal
          className={route.sectionTitle}
        />

        {/* Six equal-weight, non-sequential commitments the reader scans and
            compares: a grid of peers, which is exactly what a tile is for. */}
        <TileGrid columns={3}>
          {engineeringPrinciples.map((principle, position) => (
            <Tile
              key={principle.title}
              index={String(position + 1).padStart(2, "0")}
              title={principle.title}
              detail={principle.detail}
            />
          ))}
        </TileGrid>
      </Section>

      {/* Working practice */}
      <Section tone="dark" density="editorial">
        <div className={styles.practice}>
          <TechnicalLabel as="h2" tone="secondary">
            Working practice
          </TechnicalLabel>

          <ul className={styles.practiceList} role="list">
            {engineeringPractice.map((item) => (
              <li key={item} className="omx-heading-4">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Current stage: honest about what is and is not public */}
      <Section tone="light" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Engineered systems
            </TechnicalLabel>

            {systems.length > 0 ? (
              <ul className={route.list}>
                {systems.map((system) => (
                  <li key={system.id}>
                    <Link
                      href={`/systems/${system.slug}`}
                      className="omx-body"
                      data-underline
                    >
                      {system.title}
                    </Link>
                    <span
                      className="omx-body-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {" "}
                      &middot; {system.category}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.notice}>
                <p className="omx-body-lg">
                  Omnexa&rsquo;s engineered systems are in active development,
                  and none is publicly available yet.
                </p>
                <p className={`omx-body ${styles.noticeDetail}`}>
                  Rather than describe systems that cannot yet be examined, this
                  page documents the engineering practice they are being built
                  with. Individual systems appear here once there is something
                  substantiated to show.
                </p>
              </div>
            )}
          </div>

          <ContinueBlock
            links={[
              { label: "Engineering insights", href: "/insights/engineering" },
              { label: "Engineering at Omnexa", href: "/careers/engineering" },
              { label: "The research behind it", href: "/research" },
            ]}
          />
        </div>
      </Section>
    </main>
  );
}
