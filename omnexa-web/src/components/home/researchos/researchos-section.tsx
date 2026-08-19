import { TextAction } from "@/components/actions/text-action";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { DisplayHeading } from "@/components/typography/display-heading";
import type { System } from "@/content/schemas/systems";

import styles from "./researchos-section.module.css";

/** Cross-cutting layers: Stage 3 §20 */
const CROSS_CUTTING = [
  "Reproducibility",
  "Versioning",
  "Human review",
  "Security",
  "Observability",
];

/**
 * Section 07: ResearchOS.
 * Stage 3 §20
 *
 * The deepest point of the descent: this is the lab's own machinery, so it gets
 * the most instrumental treatment on the page (Stage 1 §31.3): higher density,
 * monospace metadata, a visible pipeline.
 *
 * PUBLIC/PRIVATE BOUNDARY
 * -----------------------
 * Everything rendered here comes from the system's public conceptual
 * description. There is no dataset name, no experiment result, no credential,
 * no compute control and no network topology: the section is built from the
 * lifecycle vocabulary and capability summaries only, which is the boundary
 * Stage 2 §76 and Stage 3 §20 both draw.
 */
export function ResearchOSSection({
  system,
  index,
}: {
  system: System | null;
  index: string;
}) {
  if (!system) return null;

  return (
    <section id="researchos" className={styles.section} data-tone="dark">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <TechnicalLabel as="span" tone="muted">
              {index}
            </TechnicalLabel>
            <span className={styles.rule} aria-hidden="true" />
            <TechnicalLabel as="span" tone="secondary">
              System / {system.index} · {system.category}
            </TechnicalLabel>
          </div>

          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["The lab", "has an", "operating system."]}
            accentTerminal
          />

          <div className={styles.reveal}>
            <TechnicalLabel as="p" tone="accent">
              {system.title}
            </TechnicalLabel>
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.copy}>
            <p className="omx-body-lg">{system.summary}</p>
            <p className={`omx-body ${styles.support}`}>
              It is designed to help human researchers and AI research agents
              work inside the same research system.
            </p>

            <div className={styles.statusBlock}>
              <TechnicalLabel as="span" tone="secondary">
                Status / {system.status}
              </TechnicalLabel>
              <p className={`omx-body-sm ${styles.statusNote}`}>
                {system.statusNote}
              </p>
            </div>

            <TextAction href={`/systems/${system.slug}`}>
              Explore ResearchOS
            </TextAction>
          </div>

          <div className={styles.pipeline}>
            <TechnicalLabel as="h3" tone="muted" className={styles.pipelineTitle}>
              Research lifecycle
            </TechnicalLabel>

            {/* An ordered list, not a diagram: the sequence IS the content, so
                it is expressed semantically and styled into a pipeline. */}
            <ol className={styles.stages}>
              {system.lifecycle.map((stage, index) => (
                <li key={stage} className={styles.stage}>
                  <span className={styles.stageMarker} aria-hidden="true" />
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    {String(index + 1).padStart(2, "0")}
                  </TechnicalLabel>
                  <span className={`omx-body-sm ${styles.stageLabel}`}>
                    {stage}
                  </span>
                </li>
              ))}
            </ol>

            <div className={styles.crossCutting}>
              <TechnicalLabel as="h3" tone="muted" size="sm">
                Across every stage
              </TechnicalLabel>
              <ul className={styles.crossList} role="list">
                {CROSS_CUTTING.map((layer) => (
                  <li key={layer} className="omx-body-sm">
                    {layer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
