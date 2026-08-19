import Link from "next/link";
import type { ReactNode } from "react";

import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./tile.module.css";

export type TileProps = {
  /** Monospace index or code shown above the title, e.g. "01" or "SE". */
  index?: string;
  title: string;
  detail?: string;
  /** Renders the whole tile as a link when present. */
  href?: string;
  /** Extra content below the detail: a list, metadata row, anything. */
  children?: ReactNode;
  className?: string;
};

/**
 * A tile.
 *
 * DELIBERATELY NOT A CARD. The design language is architectural rather than
 * soft (Stage 1 §13, §38): a tile here is a region bounded by hairline rules
 * with a 2px radius, sitting flat on the page. No drop shadow, no elevation,
 * no 24-40px corner radius, no icon badge. What separates it from the rest of
 * the page is structure, not decoration.
 *
 * It exists because some content genuinely reads better as a grid of peers
 * than as a list of rows: short, equal-weight, non-sequential items the reader
 * compares rather than reads in order. Sequential content, long-form content,
 * and content where one item leads all stay as editorial rows.
 *
 * Tones are inherited: every colour comes from the semantic layer, so a tile
 * inside a `data-tone="dark"` region restyles itself with no extra work.
 */
export function Tile({
  index,
  title,
  detail,
  href,
  children,
  className,
}: TileProps) {
  const body = (
    <>
      {index ? (
        <TechnicalLabel as="span" tone="muted" size="sm">
          {index}
        </TechnicalLabel>
      ) : null}

      <h3 className={`omx-heading-4 ${styles.title}`}>{title}</h3>

      {detail ? <p className={`omx-body-sm ${styles.detail}`}>{detail}</p> : null}

      {children}

      {href ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <li className={[styles.tile, styles.interactive, className].filter(Boolean).join(" ")}>
        <Link href={href} className={styles.link}>
          {body}
        </Link>
      </li>
    );
  }

  return (
    <li className={[styles.tile, className].filter(Boolean).join(" ")}>{body}</li>
  );
}

export type TileGridProps = {
  /** Columns at the widest breakpoint. Collapses to 2, then 1. */
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

/**
 * The grid tiles sit in.
 *
 * Uses the standard gutter token, so tiles align to the same rhythm as every
 * other grid on the site rather than introducing a second spacing system.
 */
export function TileGrid({ columns = 3, children, className }: TileGridProps) {
  return (
    <ul
      className={[styles.grid, styles[`cols${columns}`], className]
        .filter(Boolean)
        .join(" ")}
      role="list"
    >
      {children}
    </ul>
  );
}
