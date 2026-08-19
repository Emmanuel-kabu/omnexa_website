import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./text-action.module.css";

/**
 * Arrow semantics: Stage 1 §15.
 *
 *   →  internal navigation
 *   ↗  external resource / publication
 *   ↓  continue vertically / scroll
 *
 * The glyph is `aria-hidden`: it duplicates information the link text and the
 * `external` affordance already carry, so announcing it would just add noise.
 */
export type ActionDirection = "internal" | "external" | "scroll" | "none";

const ARROW: Record<Exclude<ActionDirection, "none">, string> = {
  internal: "→",
  external: "↗",
  scroll: "↓",
};

export type TextActionProps = {
  href: string;
  direction?: ActionDirection | "auto";
  variant?: "text" | "primary" | "secondary";
  size?: "default" | "sm";
  className?: string;
  children: ReactNode;
};

function resolveDirection(
  href: string,
  direction: ActionDirection | "auto",
): ActionDirection {
  if (direction !== "auto") return direction;
  if (href.startsWith("http://") || href.startsWith("https://")) return "external";
  if (href.startsWith("#")) return "scroll";
  return "internal";
}

/**
 * The primary action language of the site.
 *
 * Stage 1 §15 rejects pill buttons for navigation: actions read as text with
 * a directional glyph and a rule beneath, which is why even the `primary`
 * variant stays square-cornered and restrained.
 */
export function TextAction({
  href,
  direction = "auto",
  variant = "text",
  size = "default",
  className,
  children,
}: TextActionProps) {
  const resolved = resolveDirection(href, direction);
  const isExternal = resolved === "external";

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {resolved !== "none" ? (
        <span className={styles.arrow} aria-hidden="true">
          {ARROW[resolved]}
        </span>
      ) : null}
    </>
  );

  const classes = [
    styles.action,
    styles[variant],
    size === "sm" && styles.sm,
    styles[`dir-${resolved}`],
    "omx-control",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        // Stage 7 §62: deny the opened page access to `window.opener`
        rel="noopener noreferrer"
      >
        {content}
        <span className="omx-visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
