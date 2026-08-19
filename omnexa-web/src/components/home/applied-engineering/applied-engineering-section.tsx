import { TextAction } from "@/components/actions/text-action";
import { Tile, TileGrid } from "@/components/layout/tile";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { engineeringPrinciples } from "@/lib/engineering";

import styles from "./applied-engineering-section.module.css";

/**
 * Applied engineering, on the homepage.
 *
 * Omnexa is a research AND applied-engineering lab, so the homepage has to
 * carry both halves of that identity. This section does it without naming a
 * single engineered product: the claim it makes is about practice, which is
 * true today and stays true whatever ships later.
 *
 * It occupies the narrative position the research-to-systems transition used
 * to hold, so the page still reads as a progression rather than jumping from
 * research straight to published knowledge:
 *
 *     research → applied engineering → knowledge → operating model → next
 *
 * Rendered on the inverse surface. Stage 1 §7 reserves the dark tone for
 * moving deeper into how Omnexa works, and the engineering practice is exactly
 * that shift: from what the lab studies to how it builds.
 */
export function AppliedEngineeringSection({ index }: { index: string }) {
  return (
    <section id="engineering" className={styles.section} data-tone="dark">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.meta}>
            <TechnicalLabel as="span" tone="muted">
              {index}
            </TechnicalLabel>
            <span className={styles.rule} aria-hidden="true" />
            <TechnicalLabel as="h2" tone="secondary">
              Applied engineering
            </TechnicalLabel>
          </div>

          <div className={styles.headerBody}>
            <DisplayHeading
              as="p"
              size="display-2"
              lines={["Research", "becomes", "capability."]}
              accentTerminal
            />

            <div className={styles.headerAside}>
              <p className="omx-body-lg">
                Omnexa engineers research into systems that operate reliably,
                expose their own state, and can be evaluated. Engineering is not
                a phase that follows the research; it is how the research is
                tested.
              </p>
            </div>
          </div>
        </div>

        {/*
          Three of six. The CTA below leads to /engineering, which renders the
          full list: a teaser that already delivered its destination's entire
          payload gives the reader no reason to follow it.
        */}
        <TileGrid columns={3}>
          {engineeringPrinciples.slice(0, 3).map((principle, position) => (
            <Tile
              key={principle.title}
              index={String(position + 1).padStart(2, "0")}
              title={principle.title}
              detail={principle.detail}
            />
          ))}
        </TileGrid>

        <div className={styles.footer}>
          <TextAction href="/engineering">
            Explore applied engineering
          </TextAction>
          <TextAction href="/insights/engineering">
            Engineering insights
          </TextAction>
        </div>
      </div>
    </section>
  );
}
