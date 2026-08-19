import {
  EXPERIMENT_OUTCOME_LABELS,
  RESEARCH_STATUS_LABELS,
  type ExperimentOutcome,
  type ResearchStatus,
} from "@/types/content";

import styles from "./status-label.module.css";

export type StatusLabelProps = {
  status: ResearchStatus;
  /** `dot` renders `● ACTIVE`; `prefixed` renders `STATUS / ACTIVE`. */
  format?: "dot" | "prefixed" | "bare";
  className?: string;
};

/**
 * Research status: Stage 1 §28, Stage 2 §14.
 *
 * Status is structured metadata, never hardcoded text, and never carried by
 * colour alone: the written label is always present, so the component stays
 * legible in greyscale, under forced-colors, and to screen readers.
 */
export function StatusLabel({
  status,
  format = "dot",
  className,
}: StatusLabelProps) {
  const label = RESEARCH_STATUS_LABELS[status];

  return (
    <span
      className={["omx-technical", styles.status, className]
        .filter(Boolean)
        .join(" ")}
      data-status={status}
    >
      {format === "dot" ? (
        <span className={styles.dot} aria-hidden="true" />
      ) : null}
      {format === "prefixed" ? (
        <span className={styles.prefix}>Status /</span>
      ) : null}
      {label}
    </span>
  );
}

/**
 * Experiment outcome: Stage 4 §48.
 * Distinct from research status: an experiment can be `failed` while its
 * parent project is `active`, and that is a meaningful result, not an error.
 */
export function OutcomeLabel({
  outcome,
  className,
}: {
  outcome: ExperimentOutcome;
  className?: string;
}) {
  return (
    <span
      className={["omx-technical", styles.status, className]
        .filter(Boolean)
        .join(" ")}
      data-outcome={outcome}
    >
      <span className={styles.dot} aria-hidden="true" />
      {EXPERIMENT_OUTCOME_LABELS[outcome]}
    </span>
  );
}
