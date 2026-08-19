import type { ReactNode } from "react";

import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./section-header.module.css";

export type SectionHeaderProps = {
  /** Large numerical identifier: Stage 1 §26 */
  index?: string;
  eyebrow?: string;
  headingLines: readonly string[];
  headingId?: string;
  as?: "h2" | "h3";
  size?: "display-1" | "display-2" | "heading-1";
  lede?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * The recurring section opening: a rule, technical metadata, a display
 * heading, and an optional lede held to a readable measure.
 *
 * Asymmetric by construction: Stage 1 §10.2 warns against centring every
 * heading, paragraph and CTA, so the lede sits in the right-hand columns
 * rather than beneath the title.
 */
export function SectionHeader({
  index,
  eyebrow,
  headingLines,
  headingId,
  as = "h2",
  size = "display-2",
  lede,
  children,
  className,
}: SectionHeaderProps) {
  return (
    <header className={[styles.header, className].filter(Boolean).join(" ")}>
      {index || eyebrow ? (
        <div className={styles.meta}>
          {index ? (
            <TechnicalLabel as="span" tone="muted">
              {index}
            </TechnicalLabel>
          ) : null}
          <span className={styles.rule} aria-hidden="true" />
          {eyebrow ? (
            <TechnicalLabel as="span" tone="secondary">
              {eyebrow}
            </TechnicalLabel>
          ) : null}
        </div>
      ) : null}

      <div className={styles.body}>
        <DisplayHeading
          as={as}
          size={size}
          lines={headingLines}
          id={headingId}
          accentTerminal
          className={styles.heading}
        />

        {lede || children ? (
          <div className={styles.aside}>
            {lede ? <p className={`omx-body-lg ${styles.lede}`}>{lede}</p> : null}
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
