import Link from "next/link";

import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./continue-block.module.css";

export type ContinueLink = {
  label: string;
  href: string;
  /** Optional one-line description of what is at the other end. */
  detail?: string;
};

export type ContinueBlockProps = {
  /** Defaults to "Continue"; override where a page needs a truer label. */
  title?: string;
  links: ContinueLink[];
  className?: string;
};

/**
 * The onward-navigation block.
 *
 * Every page needs an exit. Before this existed the site had a complete
 * navigation model in the chrome (header, mega menu, footer directory) and
 * almost none in the page bodies, so a reader who arrived on a leaf from
 * search had a breadcrumb up and nothing sideways. Eleven pages ended cold.
 *
 * That absence was also what drove the institutional copy-paste elsewhere in
 * the codebase: with no shared way to point at a sibling page, the text got
 * restated instead of linked.
 *
 * Rendering only: it invents no relationships. Callers pass links they already
 * know are real, and pages that genuinely have nowhere onward simply do not
 * render one.
 */
export function ContinueBlock({
  title = "Continue",
  links,
  className,
}: ContinueBlockProps) {
  if (links.length === 0) return null;

  return (
    <nav
      className={[styles.block, className].filter(Boolean).join(" ")}
      aria-label={title}
    >
      <TechnicalLabel as="h2" tone="muted">
        {title}
      </TechnicalLabel>

      <ul className={styles.list} role="list">
        {links.map((link) => (
          <li key={link.href + link.label} className={styles.item}>
            <Link href={link.href} className={styles.link}>
              <span className={styles.label}>{link.label}</span>
              <span className={styles.arrow} aria-hidden="true">
                &rarr;
              </span>
            </Link>
            {link.detail ? (
              <p className={`omx-body-sm ${styles.detail}`}>{link.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
