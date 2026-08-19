"use client";

import { useEffect, useState } from "react";

export type HeaderTone = "light" | "dark";

export type HeaderState = {
  /** Past the scroll threshold: the header takes on a translucent surface. */
  scrolled: boolean;
  /** Tone of whichever section currently sits beneath the header. */
  tone: HeaderTone;
};

const SCROLL_THRESHOLD = 24;

/**
 * Drives the header's visual state: Stage 3 §6.
 *
 *   top of page     → transparent, integrated with the hero
 *   after threshold → subtle translucent surface
 *   over dark section → dark-compatible header
 *
 * Tone is resolved by observing a 1px band directly beneath the header and
 * asking which `[data-tone]` region intersects it. That reads the *rendered*
 * layout rather than duplicating a map of which routes are dark, so a section
 * reordering can never desynchronise the header.
 *
 * Scroll is sampled via rAF rather than on every scroll event, so the listener
 * does no layout work on the scroll thread (Stage 7 §92).
 */
export function useHeaderState(): HeaderState {
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<HeaderTone>("light");

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    // The footer is a toned region too, and it sits outside `main`. Omitting
    // it left the header light while overlaying the dark footer manifesto.
    const regions = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main [data-tone], footer[data-tone]",
      ),
    );
    if (regions.length === 0) return;

    const headerHeight =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--omx-header-height",
        ),
      ) * 16 || 64;

    // A 1px detection band sitting just below the header.
    const band = Math.round(headerHeight * 0.5);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const next = entry.target.getAttribute("data-tone");
          if (next === "dark" || next === "light") setTone(next);
        }
      },
      {
        rootMargin: `-${band}px 0px -${Math.max(0, window.innerHeight - band - 1)}px 0px`,
        threshold: 0,
      },
    );

    for (const region of regions) observer.observe(region);
    return () => observer.disconnect();
  }, []);

  return { scrolled, tone };
}
