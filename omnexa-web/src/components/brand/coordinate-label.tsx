import { site } from "@/lib/site";

import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./coordinate-label.module.css";

export type CoordinateLabelProps = {
  /** Adds the geographic coordinates beneath the city (Stage 1 §16.3, §29). */
  withCoordinates?: boolean;
  className?: string;
};

/**
 * Institutional location.
 *
 * City-level only: Stage 6 §22 explicitly forbids exposing precise private
 * addresses. The coordinates are the published city reference, used as a
 * recurring brand element rather than a wayfinding aid.
 */
export function CoordinateLabel({
  withCoordinates = true,
  className,
}: CoordinateLabelProps) {
  return (
    <address className={[styles.location, className].filter(Boolean).join(" ")}>
      <TechnicalLabel as="span">{site.location.short}</TechnicalLabel>
      {withCoordinates ? (
        <TechnicalLabel as="span" size="sm" tone="muted">
          {site.location.coordinates}
        </TechnicalLabel>
      ) : null}
    </address>
  );
}
