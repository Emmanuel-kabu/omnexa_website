"use client";

import Link from "next/link";
import { useState } from "react";

import { TextAction } from "@/components/actions/text-action";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DomainVisual } from "@/components/visualizations/domain-visual";
import { SectionHeader } from "@/components/home/shared/section-header";
import type { ResearchArea } from "@/content/schemas/research";

import styles from "./research-areas-section.module.css";

/**
 * Section 03: Research Areas.
 * Stage 3 §15-16
 *
 * Explicitly NOT four rounded cards (§15). Desktop is an index on the left,
 * subdomains and description on the right, and a domain-responsive
 * visualisation behind them.
 *
 * ACCESSIBILITY MODEL
 * -------------------
 * The interaction has to satisfy three separate requirements at once: desktop
 * hover, a keyboard equivalent, and no hover dependency on mobile (§57). The
 * resolution:
 *
 *   · each row contains a real `<Link>` to the area page, so the content is
 *     reachable with no JavaScript and no pointer at all
 *   · `onMouseEnter` and `onFocus` both set the active area, so tabbing
 *     through the rows drives the panel exactly as hovering does
 *   · below `lg`, CSS renders every subdomain list inline and the shared panel
 *     is hidden, so nothing is gated behind an interaction that touch cannot
 *     perform
 *
 * The active state is a progressive nicety; the information is always present.
 */
export function ResearchAreasSection({
  areas,
  index,
}: {
  areas: ResearchArea[];
  index: string;
}) {
  const [activeId, setActiveId] = useState(areas[0]?.id ?? "");
  const active = areas.find((area) => area.id === activeId) ?? areas[0];

  if (areas.length === 0) return null;

  return (
    <section id="research" className={styles.section} data-tone="light">
      <div className={styles.inner}>
        <SectionHeader
          index={index}
          eyebrow="Research"
          headingLines={["What we", "research."]}
          headingId="research-areas-heading"
          lede="Omnexa Labs investigates intelligence across learning, reasoning, autonomous systems, computational discovery, and the infrastructure that makes advanced AI possible."
        />

        <div className={styles.layout}>
          <ul className={styles.index} role="list">
            {areas.map((area) => {
              const isActive = area.id === active?.id;

              return (
                <li
                  key={area.id}
                  className={styles.row}
                  data-active={isActive || undefined}
                  onMouseEnter={() => setActiveId(area.id)}
                >
                  <Link
                    href={`/research/areas/${area.slug}`}
                    className={styles.rowLink}
                    onFocus={() => setActiveId(area.id)}
                  >
                    <span className={styles.rowIndex}>
                      <TechnicalLabel as="span">{area.index}</TechnicalLabel>
                    </span>

                    <span className={styles.rowTitle}>{area.title}</span>

                    <span className={styles.rowArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>

                  {/* Inline on mobile, hidden on desktop where the shared
                      panel takes over. Always in the DOM either way. */}
                  <div className={styles.rowDetail}>
                    <p className={`omx-body-sm ${styles.rowSummary}`}>
                      {area.summary}
                    </p>
                    <ul className={styles.subdomains} role="list">
                      {area.subdomains.map((subdomain) => (
                        <li key={subdomain.id} className="omx-body-sm">
                          {subdomain.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* The desktop detail panel. `aria-hidden` because everything in it
              is duplicated by the per-row detail above, which screen readers
              and mobile both use: announcing it twice would be noise. */}
          {active ? (
            <div className={styles.panel} aria-hidden="true">
              <div className={styles.panelVisual}>
                <DomainVisual code={active.code} />
              </div>

              <div className={styles.panelBody}>
                <div className={styles.panelMeta}>
                  <TechnicalLabel as="span" tone="secondary">
                    Code / {active.code}
                  </TechnicalLabel>
                </div>

                <p className={`omx-body ${styles.panelThesis}`}>
                  {active.thesis}
                </p>

                <ul className={styles.panelSubdomains} role="list">
                  {active.subdomains.map((subdomain) => (
                    <li key={subdomain.id} className={styles.panelSubdomain}>
                      <TechnicalLabel as="span" tone="muted" size="sm">
                        {subdomain.title}
                      </TechnicalLabel>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        <div className={styles.footer}>
          <TextAction href="/research">Explore all research</TextAction>
        </div>
      </div>
    </section>
  );
}
