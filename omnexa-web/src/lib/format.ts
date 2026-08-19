/**
 * Formatting helpers.
 * Stage 7 §135: dates render locale-aware but never shift by viewer timezone.
 *
 * `timeZone: "UTC"` is the load-bearing detail: a publication dated
 * 2026-08-14 must read as 14 Aug 2026 everywhere. Without it, a visitor west
 * of UTC sees 13 Aug, silently rewriting the publication record.
 */

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const MONTH_FORMAT = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** `2026-08-14` → `14 Aug 2026` */
export function formatDate(iso: string): string {
  return DATE_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/** Uppercase variant for monospace metadata rows. */
export function formatDateTechnical(iso: string): string {
  return formatDate(iso).toUpperCase();
}

/** `2026-08-14` → `Aug 2026` */
export function formatMonth(iso: string): string {
  return MONTH_FORMAT.format(new Date(`${iso}T00:00:00Z`));
}

/**
 * An incomplete date stays visible rather than being omitted, because
 * "COMPLETED / not recorded" is itself meaningful information (Stage 4 §45).
 *
 * The spec suggests a dash glyph for this. Words are used instead: a lone dash
 * is announced inconsistently by screen readers (often skipped entirely, or
 * read as "em dash"), so a visitor relying on one cannot tell an unfinished
 * experiment from a rendering fault.
 */
export function formatOptionalDate(iso?: string): string {
  return iso ? formatDate(iso) : "Not recorded";
}
