import { TextAction } from "@/components/actions/text-action";
import { ResearchId } from "@/components/brand/research-id";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DisplayHeading } from "@/components/typography/display-heading";
import {
  CadenceVisual,
  MedAppVisual,
} from "@/components/visualizations/system-visual";
import type { System } from "@/content/schemas/systems";

import styles from "./systems-section.module.css";

/**
 * Section 06: Systems.
 * Stage 3 §19
 *
 * "Systems should be full editorial experiences, not equal-sized product
 * cards." Each system therefore gets a full-width band with its own visual
 * grammar, its own lifecycle vocabulary, and an alternating composition, so
 * the two never read as two instances of one card component.
 *
 * Status is always shown with the note explaining what it means, per Stage 5
 * §68. No metric or outcome is claimed anywhere in this section.
 */
export function SystemsSection({
  systems,
  index,
}: {
  systems: System[];
  index: string;
}) {
  if (systems.length === 0) return null;

  return (
    <section id="systems" className={styles.section} data-tone="dark">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <TechnicalLabel as="span" tone="muted">
              {index}
            </TechnicalLabel>
            <span className={styles.rule} aria-hidden="true" />
            <TechnicalLabel as="h2" tone="secondary">
              Systems
            </TechnicalLabel>
          </div>
        </header>

        <ul className={styles.list} role="list">
          {systems.map((system, index) => (
            <li
              key={system.id}
              className={styles.system}
              data-reverse={index % 2 === 1 || undefined}
            >
              <div className={styles.systemBody}>
                <div className={styles.systemMeta}>
                  <TechnicalLabel as="span" tone="muted">
                    System / {system.index}
                  </TechnicalLabel>
                  <ResearchId id={system.id} />
                </div>

                <h3 className={styles.systemName}>{system.title}</h3>

                <DisplayHeading
                  as="p"
                  size="heading-1"
                  lines={system.statement}
                  accentTerminal
                  className={styles.systemStatement}
                />

                <p className={`omx-body-lg ${styles.systemSummary}`}>
                  {system.summary}
                </p>

                {/* The semantic equivalent of the diagram beside it */}
                {system.lifecycle.length > 0 ? (
                  <ol className={styles.lifecycle}>
                    {system.lifecycle.map((stage, stageIndex) => (
                      <li key={stage} className={styles.lifecycleStage}>
                        <TechnicalLabel as="span" tone="muted" size="sm">
                          {String(stageIndex + 1).padStart(2, "0")}
                        </TechnicalLabel>
                        <span className="omx-body-sm">{stage}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}

                <div className={styles.systemFooter}>
                  <TextAction href={`/systems/${system.slug}`}>
                    Explore {system.title}
                  </TextAction>

                  <div className={styles.statusBlock}>
                    <TechnicalLabel as="span" tone="secondary">
                      Status / {system.status}
                    </TechnicalLabel>
                    <p className={`omx-body-sm ${styles.statusNote}`}>
                      {system.statusNote}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.systemVisual}>
                {system.slug === "cadence" ? <CadenceVisual /> : null}
                {system.slug === "medapp" ? <MedAppVisual /> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
