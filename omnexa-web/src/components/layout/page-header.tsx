import type { ReactNode } from "react";

import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/navigation/breadcrumb";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./page-header.module.css";

export type PageHeaderProps = {
  /** Monospace kicker: e.g. `RESEARCH AREA / 01` */
  eyebrow?: string;
  /** Authored display lines. Each becomes its own line. */
  headingLines: readonly string[];
  lede?: string;
  breadcrumb?: BreadcrumbItem[];
  /** Technical metadata row beneath the heading. */
  meta?: ReactNode;
  children?: ReactNode;
  tone?: "light" | "dark";
  size?: "display-1" | "display-2" | "heading-1";
};

/**
 * The shared page opening for every route below the homepage.
 *
 * Clears the fixed header, carries the breadcrumb trail on deep pages, and
 * keeps exactly one H1 per route (Stage 2 §80, §81).
 */
export function PageHeader({
  eyebrow,
  headingLines,
  lede,
  breadcrumb,
  meta,
  children,
  tone = "light",
  size = "display-2",
}: PageHeaderProps) {
  return (
    <header className={styles.header} data-tone={tone}>
      <div className={styles.inner}>
        {breadcrumb ? <Breadcrumb items={breadcrumb} /> : null}

        {eyebrow ? (
          <div className={styles.eyebrow}>
            <TechnicalLabel as="span" tone="secondary">
              {eyebrow}
            </TechnicalLabel>
            <span className={styles.rule} aria-hidden="true" />
          </div>
        ) : null}

        <DisplayHeading as="h1" size={size} lines={headingLines} accentTerminal />

        {lede ? <p className={`omx-body-lg ${styles.lede}`}>{lede}</p> : null}

        {meta ? <div className={styles.meta}>{meta}</div> : null}

        {children}
      </div>
    </header>
  );
}
