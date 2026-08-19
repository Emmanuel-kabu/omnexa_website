import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { site } from "@/lib/site";

import styles from "./institutional-definition.module.css";

/**
 * Section 02: Institutional Definition.
 * Stage 3 §14
 *
 * Answers "What is Omnexa Labs?" and deliberately carries almost no motion:
 * its job is to restore cognitive clarity immediately after the hero.
 *
 * Copy is canonical (Stage 3 §26) and reproduced verbatim.
 */
export function InstitutionalDefinition({ index }: { index: string }) {
  return (
    <Section id="about-omnexa" tone="light" density="editorial">
      <div className={styles.meta}>
        <TechnicalLabel as="span" tone="muted">
          {index}
        </TechnicalLabel>
        <span className={styles.rule} aria-hidden="true" />
        <TechnicalLabel as="h2" tone="secondary">
          {site.name} / AI Research + Engineering
        </TechnicalLabel>
      </div>

      <div className={styles.body}>
        <p className={`omx-heading-2 ${styles.statement}`}>
          We research the foundations of intelligent systems and engineer them
          into technologies that can operate in the real world.
        </p>

        <div className={styles.support}>
          <p className="omx-body-lg">
            Our work spans autonomous intelligence, foundation models,
            reinforcement learning, computational discovery, software systems,
            healthcare, and the infrastructure required to advance them.
          </p>

          <p className={`omx-body-lg ${styles.closing}`}>
            Research is not separate from engineering here. It is where
            engineering begins.
          </p>
        </div>
      </div>
    </Section>
  );
}
