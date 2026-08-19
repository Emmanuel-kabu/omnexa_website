import type { ElementType, ReactNode } from "react";

import styles from "./technical-label.module.css";

export type TechnicalLabelProps = {
  as?: ElementType;
  tone?: "muted" | "secondary" | "primary" | "accent";
  size?: "default" | "sm";
  className?: string;
  children: ReactNode;
};

/**
 * Monospace technical metadata: Stage 1 §8.3.
 *
 * Reserved for research IDs, dates, model identifiers, system state and
 * compute metadata. Monospace should hold at roughly 5-10% of visible
 * typography, so this is deliberately not a general-purpose label.
 */
export function TechnicalLabel({
  as: Element = "span",
  tone = "muted",
  size = "default",
  className,
  children,
}: TechnicalLabelProps) {
  return (
    <Element
      className={[
        size === "sm" ? "omx-technical-sm" : "omx-technical",
        styles[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Element>
  );
}

/**
 * A metadata row: `RESEARCH / 01 ═══════════ OMX-R-001`
 * The rule between the two ends is the Stage 1 §12 line language.
 */
export function TechnicalRow({
  start,
  end,
  className,
}: {
  start: ReactNode;
  end?: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(" ")}>
      <TechnicalLabel>{start}</TechnicalLabel>
      <span className={styles.rowRule} aria-hidden="true" />
      {end ? <TechnicalLabel>{end}</TechnicalLabel> : null}
    </div>
  );
}
