"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

import styles from "./intelligence-field.module.css";

/**
 * The Canvas runtime is a separate chunk that is never part of the initial
 * bundle: Stage 3 §40 requires the field to be code-split, and Stage 7 §39
 * requires it to load only where it is needed.
 */
const IntelligenceFieldCanvas = dynamic(
  () =>
    import("./intelligence-field-canvas").then(
      (module) => module.IntelligenceFieldCanvas,
    ),
  { ssr: false },
);

export type IntelligenceFieldProps = {
  /**
   * The server-rendered static field. Passed as children rather than imported
   * here so it stays a server component and ships inside the initial HTML:
   * the hero visual is present before any JavaScript executes.
   */
  children: ReactNode;
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * Decides which layer of the visualisation the visitor gets.
 *
 *     reduced motion / no JS  →  static SVG, permanently
 *     everything else         →  static SVG, then Canvas fades in over it
 *
 * There is no loading spinner at any point: the static visual *is* the
 * loading state, and the enhancement replaces it once painting (Stage 3 §50).
 */
export function IntelligenceField({
  children,
  scrollTargetRef,
  className,
}: IntelligenceFieldProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [idle, setIdle] = useState(false);
  const [canvasPainting, setCanvasPainting] = useState(false);

  /**
   * Both flags are DERIVED rather than stored. Stage 1 §32.1 requires reduced
   * motion to keep the static state and never mount a continuous runtime:
   * deriving it means switching the OS setting mid-session unmounts the Canvas
   * immediately, with no effect needed to undo anything.
   */
  const enhance = idle && !prefersReducedMotion;
  const ready = canvasPainting && enhance;

  const handleReady = useCallback(() => setCanvasPainting(true), []);

  useEffect(() => {
    // Defer to idle so the Canvas chunk never competes with the hero's LCP.
    // The callback is asynchronous, so this subscribes to an external signal
    // rather than writing state synchronously during the effect.
    const schedule =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (callback: () => void) => window.setTimeout(callback, 400);

    const handle = schedule(() => setIdle(true));

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle as number);
      } else {
        window.clearTimeout(handle as number);
      }
    };
  }, []);

  return (
    <div className={[styles.canvas, className].filter(Boolean).join(" ")}>
      <div className={[styles.layer, ready && styles.staticHidden].filter(Boolean).join(" ")}>
        {children}
      </div>

      {enhance ? (
        <div
          className={`${styles.layer} ${styles.enhanced}`}
          data-ready={ready || undefined}
        >
          <IntelligenceFieldCanvas
            scrollTargetRef={scrollTargetRef}
            onReady={handleReady}
          />
        </div>
      ) : null}
    </div>
  );
}
