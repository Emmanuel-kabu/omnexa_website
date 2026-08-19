import type { Metadata } from "next";

import { TextAction } from "@/components/actions/text-action";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { IntelligenceFieldStatic } from "@/components/visualizations/intelligence-field-static";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Signal lost",
  robots: { index: false, follow: true },
};

/**
 * 404: Stage 2 §66.
 *
 * Preserves institutional identity and offers three real ways forward. It is
 * deliberately not a joke: §66 says so explicitly. The field appears here in a
 * dispersed state, which reads as the signal actually being lost rather than
 * as decoration.
 */
export default function NotFound() {
  return (
    <main id="main" className={styles.page} data-tone="dark">
      <div className={styles.field} aria-hidden="true">
        <IntelligenceFieldStatic progress={0.08} nodeCount={40} />
      </div>

      <div className={styles.inner}>
        <TechnicalLabel as="p" tone="muted">
          Error / 404
        </TechnicalLabel>

        <DisplayHeading
          as="h1"
          size="display-1"
          lines={["Signal", "lost."]}
          accentTerminal
        />

        <p className={`omx-body-lg ${styles.lede}`}>
          The page you&rsquo;re looking for could not be found.
        </p>

        <div className={styles.actions}>
          <TextAction href="/">Return home</TextAction>
          <TextAction href="/research">Explore research</TextAction>
          <TextAction href="/search">Search</TextAction>
        </div>
      </div>
    </main>
  );
}
