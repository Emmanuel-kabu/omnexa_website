"use client";

import { useState } from "react";

import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./citation-block.module.css";

export type CitationBlockProps = {
  title: string;
  authors: string[];
  year: string;
  id: string;
  doi?: string;
  citation?: string;
  bibtex?: string;
};

/**
 * Citation block: Stage 4 §53.
 *
 * Supports plain text and BibTeX with keyboard-accessible copy controls.
 *
 * INTEGRITY: no DOI is ever fabricated. When the publication has no DOI, the
 * generated citation simply omits it, and the `doi` field never appears:
 * §53 and §101 both forbid inventing citation metadata. The generated forms
 * are derived only from fields that exist on the record.
 */
export function CitationBlock({
  title,
  authors,
  year,
  id,
  doi,
  citation,
  bibtex,
}: CitationBlockProps) {
  const [copied, setCopied] = useState<"text" | "bibtex" | null>(null);

  const authorList = authors.length > 0 ? authors.join(", ") : "Omnexa Labs";

  const plainText =
    citation ??
    `${authorList} (${year}). ${title}. Omnexa Labs. ${id}${doi ? `. ${doi}` : ""}`;

  const bibtexEntry =
    bibtex ??
    [
      `@techreport{${id.toLowerCase().replace(/-/g, "")},`,
      `  title  = {${title}},`,
      `  author = {${authors.join(" and ") || "Omnexa Labs"}},`,
      `  year   = {${year}},`,
      `  number = {${id}},`,
      `  institution = {Omnexa Labs}${doi ? "," : ""}`,
      ...(doi ? [`  doi    = {${doi}}`] : []),
      `}`,
    ].join("\n");

  const copy = async (value: string, kind: "text" | "bibtex") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard access can be denied; the text stays selectable either way,
      // so failing silently is better than an alarming error state.
    }
  };

  return (
    <div className={styles.block}>
      <h2 className={`omx-heading-3 ${styles.title}`}>Citation</h2>

      <div className={styles.entry}>
        <div className={styles.entryHead}>
          <TechnicalLabel as="h3" tone="muted" size="sm">
            Plain text
          </TechnicalLabel>
          <button
            type="button"
            className={`omx-technical-sm ${styles.copy}`}
            onClick={() => copy(plainText, "text")}
          >
            {copied === "text" ? "Copied" : "Copy"}
            <span className="omx-visually-hidden"> plain text citation</span>
          </button>
        </div>
        <p className={`omx-body-sm ${styles.value}`}>{plainText}</p>
      </div>

      <div className={styles.entry}>
        <div className={styles.entryHead}>
          <TechnicalLabel as="h3" tone="muted" size="sm">
            BibTeX
          </TechnicalLabel>
          <button
            type="button"
            className={`omx-technical-sm ${styles.copy}`}
            onClick={() => copy(bibtexEntry, "bibtex")}
          >
            {copied === "bibtex" ? "Copied" : "Copy"}
            <span className="omx-visually-hidden"> BibTeX entry</span>
          </button>
        </div>
        <pre className={styles.pre}>
          <code>{bibtexEntry}</code>
        </pre>
      </div>

      {/* Announces copy success to screen readers without stealing focus */}
      <p aria-live="polite" className="omx-visually-hidden">
        {copied ? "Citation copied to clipboard" : ""}
      </p>
    </div>
  );
}
