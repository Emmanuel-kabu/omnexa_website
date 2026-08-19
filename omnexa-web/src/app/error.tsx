"use client";

import Link from "next/link";
import { useEffect } from "react";

import styles from "./not-found.module.css";

/**
 * Route-level error boundary: Stage 7 §54-55.
 *
 * Messages are clear, calm and free of internal detail: the digest is shown
 * because it helps support correlate a report, but no stack trace reaches the
 * browser (§133).
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(
      JSON.stringify({
        event: "route_error",
        digest: error.digest,
        message: error.message,
      }),
    );
  }, [error]);

  return (
    <main id="main" className={styles.page} data-tone="light">
      <div className={styles.inner}>
        <p className="omx-technical" style={{ color: "var(--text-muted)" }}>
          Error
        </p>

        <h1 className="omx-display-2">Something went wrong.</h1>

        <p className={`omx-body-lg ${styles.lede}`}>
          This page could not be displayed. The rest of the site is still
          available.
        </p>

        <div className={styles.actions}>
          <button type="button" onClick={reset} className="omx-control">
            Try again →
          </button>
          <Link href="/" className="omx-control">
            Return home →
          </Link>
        </div>

        {error.digest ? (
          <p className="omx-technical-sm" style={{ color: "var(--text-muted)" }}>
            Reference / {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
