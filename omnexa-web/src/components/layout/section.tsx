import type { ElementType, ReactNode } from "react";

import styles from "./section.module.css";

/** Stage 1 §31, Stage 3 §5: the three information density modes. */
export type SectionDensity =
  | "monumental"
  | "editorial"
  | "instrumental"
  | "compact";

/** Stage 1 §7: tone is a property of a region, not a global theme. */
export type SectionTone = "light" | "dark" | "subtle";

export type SectionProps = {
  id?: string;
  tone?: SectionTone;
  density?: SectionDensity;
  /** Render the inner container, or let children span the full viewport. */
  contained?: boolean;
  as?: ElementType;
  className?: string;
  /** Applied to the inner container rather than the outer surface. */
  innerClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/**
 * The section layout primitive.
 *
 * Owns exactly four things: max width, horizontal padding, vertical rhythm
 * and surface tone. Section-specific visual logic deliberately lives in the
 * section components themselves, not here (Stage 3 §28).
 */
export function Section({
  id,
  tone = "light",
  density = "editorial",
  contained = true,
  as: Element = "section",
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  const surface = [styles.section, styles[density], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Element
      id={id}
      // `subtle` is still a light tone; it only shifts the surface a step.
      data-tone={tone === "dark" ? "dark" : "light"}
      data-surface={tone}
      className={surface}
      {...rest}
    >
      {contained ? (
        <div className={[styles.inner, innerClassName].filter(Boolean).join(" ")}>
          {children}
        </div>
      ) : (
        children
      )}
    </Element>
  );
}
