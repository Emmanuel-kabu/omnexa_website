import styles from "./divider.module.css";

export type DividerProps = {
  /** `subtle` for low-emphasis dividers, `strong` for section boundaries. */
  weight?: "subtle" | "default" | "strong";
  /** Draws the rule in the accent colour to mark an active relationship. */
  active?: boolean;
  className?: string;
};

/**
 * The structural line: Stage 1 §12.
 *
 * Thin rules are a recurring graphical primitive across section boundaries,
 * research metadata, archival layouts and publication lists. Rendered as an
 * `<hr>` because it is a genuine thematic break, and browsers already expose
 * that meaning to assistive technology.
 */
export function Divider({
  weight = "default",
  active = false,
  className,
}: DividerProps) {
  return (
    <hr
      className={[styles.divider, styles[weight], active && styles.active, className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
