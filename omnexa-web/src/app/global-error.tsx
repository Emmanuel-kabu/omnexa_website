"use client";

/**
 * Global error boundary: Stage 7 §54.
 *
 * Replaces the root layout when the layout itself fails, so it must render its
 * own `<html>` and `<body>` and cannot rely on the design tokens loading.
 * Styles are therefore inline and minimal by necessity.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f7f4",
          color: "#0a0a0a",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#6e6e6a",
              margin: "0 0 1.5rem",
            }}
          >
            Omnexa Labs / Error
          </p>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              margin: "0 0 1.5rem",
            }}
          >
            Something went wrong.
          </h1>

          <p style={{ fontSize: "1.125rem", lineHeight: 1.6, color: "#555", margin: "0 0 2rem" }}>
            The application could not be loaded. Please try again.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              font: "inherit",
              fontSize: "0.875rem",
              fontWeight: 500,
              padding: "1rem 1.5rem",
              background: "#0a0a0a",
              color: "#f1f1ee",
              border: 0,
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Try again →
          </button>

          {error.digest ? (
            <p
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.6875rem",
                color: "#6e6e6a",
                marginTop: "2rem",
              }}
            >
              Reference / {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
