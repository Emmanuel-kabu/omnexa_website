import Link from "next/link";

import { site } from "@/lib/site";

import styles from "./wordmark.module.css";

export type WordmarkProps = {
  /** Wraps the mark in a link to `/`. The header uses this; the footer does not. */
  asLink?: boolean;
  className?: string;
};

/**
 * The Omnexa wordmark.
 *
 * Set in the display grotesk rather than shipped as an SVG asset so it
 * inherits the page's tone, weight and optical sizing, and so the site
 * remains recognisable through typography (Stage 3 §60).
 */
export function Wordmark({ asLink = true, className }: WordmarkProps) {
  const mark = (
    <span className={[styles.mark, className].filter(Boolean).join(" ")}>
      {/*
        The space is real text, not a CSS gap. Without it the element's text
        content is "OmnexaLabs", which is not a substring of the accessible
        name, and WCAG 2.5.3 (label in name) fails: voice-control users saying
        "click Omnexa Labs" would not match the element.
      */}
      <span className={styles.primary}>Omnexa</span>{" "}
      <span className={styles.secondary}>Labs</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href="/" className={styles.link} aria-label={`${site.name}, home`}>
      {mark}
    </Link>
  );
}
