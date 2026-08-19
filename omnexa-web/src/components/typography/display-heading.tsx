import type { ReactNode } from "react";

import styles from "./display-heading.module.css";

export type DisplayHeadingProps = {
  /**
   * Each entry becomes its own line.
   *
   * Identity-defining line breaks are structural, not decorative: the break
   * in "ADVANCING / INTELLIGENCE." is part of the composition. Modelling them
   * as spans rather than hardcoded `<br />` keeps the text selectable, lets
   * screen readers announce one continuous heading, and lets each line be
   * revealed independently (Stage 3 §37).
   */
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  size?: "display-1" | "display-2" | "heading-1" | "heading-2";
  /** Renders the trailing period in the accent colour. */
  accentTerminal?: boolean;
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function DisplayHeading({
  lines,
  as: Element = "h2",
  size = "display-2",
  accentTerminal = false,
  id,
  className,
  children,
}: DisplayHeadingProps) {
  return (
    <Element
      id={id}
      className={[`omx-${size}`, styles.heading, className]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1;
        const endsWithPeriod = accentTerminal && isLast && line.endsWith(".");

        return (
          <span key={line + index} className={styles.line}>
            {endsWithPeriod ? (
              <>
                {line.slice(0, -1)}
                <span className={styles.terminal} aria-hidden="true">
                  .
                </span>
              </>
            ) : (
              line
            )}
          </span>
        );
      })}
      {children}
    </Element>
  );
}
