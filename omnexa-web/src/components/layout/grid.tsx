import type { ReactNode } from "react";

import styles from "./grid.module.css";

export type GridProps = {
  /** Columns at the `lg` breakpoint and above. Below that the grid collapses. */
  columns?: 2 | 3 | 4 | 12;
  gap?: "none" | "sm" | "md" | "lg";
  as?: "div" | "ul" | "ol";
  className?: string;
  children: ReactNode;
};

/**
 * The 12-column canvas: Stage 1 §10.
 *
 * Asymmetry is the house style (§10.2), so this primitive intentionally does
 * not centre or equalise anything. Callers place children with the
 * `col-*` helpers or their own grid-column rules.
 */
export function Grid({
  columns = 12,
  gap = "md",
  as: Element = "div",
  className,
  children,
}: GridProps) {
  return (
    <Element
      className={[styles.grid, styles[`cols${columns}`], styles[`gap-${gap}`], className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Element>
  );
}
