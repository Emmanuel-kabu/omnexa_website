import { SectionHeader } from "@/components/home/shared/section-header";
import { Section } from "@/components/layout/section";
import { operatingModel } from "@/lib/operating-model";
import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./operating-model-section.module.css";


/**
 * Section 10: Operating Model.
 * Stage 3 §23
 *
 * "Avoid six marketing cards." So this is one continuous trajectory: an
 * ordered list drawn as a connected path, with the sixth state returning to
 * the first. The loop is expressed structurally: an `<ol>` with a visible
 * spine and a closing return edge: rather than as six boxes in a row.
 */
export function OperatingModelSection({ index }: { index: string }) {
  return (
    <Section id="how-we-work" tone="light" density="editorial">
      <SectionHeader
        index={index}
        eyebrow="Operating model"
        headingLines={["How we", "work."]}
        lede="Omnexa combines scientific investigation with engineering execution. Ideas are tested through experiments, translated into systems, evaluated in real environments, and used to create the next research question."
      />

      <div className={styles.loop}>
        <ol className={styles.states}>
          {operatingModel.map((state, index) => (
            <li key={state.label} className={styles.state}>
              <div className={styles.stateMarker} aria-hidden="true">
                <span className={styles.stateDot} />
              </div>

              <div className={styles.stateBody}>
                <div className={styles.stateHead}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    {String(index + 1).padStart(2, "0")}
                  </TechnicalLabel>
                  <h3 className={`omx-heading-4 ${styles.stateLabel}`}>
                    {state.label}
                  </h3>
                </div>
                <p className={`omx-body-sm ${styles.stateDetail}`}>
                  {state.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* The return edge. Decorative in itself: the closing statement below
            says the same thing in words. */}
        <div className={styles.returnEdge} aria-hidden="true">
          <span className={styles.returnLine} />
          <TechnicalLabel as="span" tone="accent" size="sm">
            ↺ Learning feeds research
          </TechnicalLabel>
        </div>
      </div>

    </Section>
  );
}
