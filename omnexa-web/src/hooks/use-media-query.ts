"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * Implemented with `useSyncExternalStore` rather than `useEffect` + `setState`.
 * A media query list IS an external store, and this is the API React provides
 * for reading one: it avoids the cascading re-render that setting state inside
 * an effect causes, and it gives a first-class SSR snapshot instead of a
 * transient wrong value on the first client render.
 *
 * The server snapshot is `false`: during SSR there is no viewport to measure.
 * Anything that would break while briefly false must be handled in CSS, which
 * is where layout belongs anyway; this hook is for behaviour.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Stage 1 §32.1: respected by every motion-bearing component.
 * Reads live, so toggling the OS setting updates the page without a reload.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Stage 1 §20: cursor affordances require a device that actually hovers. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
