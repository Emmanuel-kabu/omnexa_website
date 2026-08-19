import styles from "./research-id.module.css";

export type ResearchIdProps = {
  /** e.g. `OMX-DI-007`, `OMX-EXP-032`, `OMX-PUB-013` */
  id: string;
  tone?: "muted" | "primary" | "accent";
  className?: string;
};

/**
 * The institutional identifier: Stage 1 §27, Stage 4 §64.
 *
 * IDs are stable, visible and never derived from page ordering. Rendered as
 * `<data>` so the machine-readable value travels with the visible text.
 */
export function ResearchId({ id, tone = "muted", className }: ResearchIdProps) {
  return (
    <data
      value={id}
      className={["omx-identifier", styles.id, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
    >
      {id}
    </data>
  );
}
