import Link from "next/link";
import type { ReactNode } from "react";

import { ResearchId } from "@/components/brand/research-id";
import { SampleBadge } from "@/components/brand/sample-badge";
import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./entity-row.module.css";

export type EntityRowProps = {
  href: string;
  /** Always shown: a visitor must be able to tell a publication from a note. */
  type: string;
  id?: string;
  title: string;
  summary?: string;
  meta?: ReactNode;
  sample?: boolean;
};

/**
 * The canonical index row.
 * Stage 4 §50, §57, Stage 6 §44
 *
 * Editorial rows rather than card grids, and the entity type always leads:
 * Stage 2 §37 requires search and index results to show content type visibly.
 */
export function EntityRow({
  href,
  type,
  id,
  title,
  summary,
  meta,
  sample,
}: EntityRowProps) {
  return (
    <li className={styles.row}>
      <Link href={href} className={styles.link}>
        <div className={styles.head}>
          <TechnicalLabel as="span" tone="secondary">
            {type}
          </TechnicalLabel>
          {id ? <ResearchId id={id} /> : null}
          <SampleBadge sample={sample} />
        </div>

        <div className={styles.body}>
          <h3 className={`omx-heading-3 ${styles.title}`}>{title}</h3>
          {summary ? (
            <p className={`omx-body-sm ${styles.summary}`}>{summary}</p>
          ) : null}
        </div>

        <div className={styles.meta}>
          {meta}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}

/** A list wrapper so index pages share the same rules and spacing. */
export function EntityList({ children }: { children: ReactNode }) {
  return (
    <ul className={styles.list} role="list">
      {children}
    </ul>
  );
}

/**
 * Stage 2 §65 / Stage 4 §91: every dynamic index needs a deliberate empty
 * state. Never a blank region.
 */
export function EmptyState({
  message,
  hint,
}: {
  message: string;
  hint?: string;
}) {
  return (
    <div className={styles.empty}>
      <p className={`omx-body-lg ${styles.emptyMessage}`}>{message}</p>
      {hint ? <p className={`omx-body ${styles.emptyHint}`}>{hint}</p> : null}
    </div>
  );
}
