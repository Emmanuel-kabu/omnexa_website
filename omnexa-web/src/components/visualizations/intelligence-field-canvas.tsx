"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  createField,
  edgeOpacityAt,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  nodeAt,
  smoothstep,
} from "./field-geometry";

import styles from "./intelligence-field.module.css";

export type IntelligenceFieldCanvasProps = {
  /** Overrides the capability-derived budget. Mainly useful for testing. */
  nodeCount?: number;
  seed?: number;
  /** Element whose scroll progress drives the state machine. */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  onReady?: () => void;
};

/** Retina is worth paying for; 3× on a phone is not (Stage 3 §12). */
const MAX_DPR = 2;

/**
 * Node budget by capability: Stage 3 §12.
 *   desktop 80-140 · low-capability desktop 50-80 · mobile 30-60
 *
 * Deliberately coarse. Stage 7 §43 warns against brittle device scoring, so
 * this reads viewport width and the hardware-concurrency hint only, and
 * degrades toward the smaller budget whenever it is unsure.
 *
 * Safe to evaluate during render because this module is loaded with
 * `ssr: false`: it never executes on the server, so there is no snapshot to
 * mismatch.
 */
function resolveNodeBudget(): number {
  const wide = window.matchMedia("(min-width: 1024px)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (!wide) return 44;
  if (cores <= 4) return 70;
  return 96;
}

/**
 * The Canvas 2D enhancement layer.
 *
 * Chosen over WebGL deliberately: Stage 1 §41 and Stage 7 §44 both say not to
 * reach for Three.js unless Canvas proves insufficient, and for ~90 nodes with
 * proximity edges it does not.
 *
 * The whole runtime obeys Stage 3 §12:
 *   · device pixel ratio capped
 *   · loop stops entirely when scrolled out of view
 *   · loop stops when the tab is hidden
 *   · no allocation inside the frame loop
 *   · resize is debounced
 *   · no DOM measurement per frame: scroll and size are cached in refs
 */
export function IntelligenceFieldCanvas({
  nodeCount,
  seed,
  scrollTargetRef,
  onReady,
}: IntelligenceFieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Resolved once on mount via a lazy initialiser: no effect, no extra render.
  const [budget] = useState(() => nodeCount ?? resolveNodeBudget());

  // Built once. Regenerating per render would restart the composition.
  const field = useMemo(
    () => createField({ nodeCount: budget, seed }),
    [budget, seed],
  );

  // Everything the frame loop reads lives in refs, so the loop never closes
  // over stale state and never triggers a React render.
  const progressRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, scale: 1, offsetX: 0, offsetY: 0 });
  const colorsRef = useRef({ node: "#0a0a0a", edge: "#0a0a0a", accent: "#315cff" });
  const visibleRef = useRef(false);
  const tabVisibleRef = useRef(true);
  const frameRef = useRef(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    // A missing 2D context means the browser can't do this at all: bail and
    // leave the static SVG in place rather than painting nothing.
    if (!context) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    /* ---------------------------------------------------------------- size */
    const applySize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Mirror the SVG's `preserveAspectRatio="xMidYMid slice"` so the
      // enhanced layer lands exactly where the fallback was.
      const scale = Math.max(rect.width / FIELD_WIDTH, rect.height / FIELD_HEIGHT);

      sizeRef.current = {
        width: rect.width,
        height: rect.height,
        scale,
        offsetX: (rect.width - FIELD_WIDTH * scale) / 2,
        offsetY: (rect.height - FIELD_HEIGHT * scale) / 2,
      };

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Resolve theme colours here rather than per frame: getComputedStyle
      // forces style recalculation and must never run in the loop.
      const computed = getComputedStyle(canvas);
      colorsRef.current = {
        node: computed.getPropertyValue("--text-primary").trim() || "#0a0a0a",
        edge: computed.getPropertyValue("--text-primary").trim() || "#0a0a0a",
        accent: computed.getPropertyValue("--accent").trim() || "#315cff",
      };
    };

    applySize();

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applySize, 150);
    });
    resizeObserver.observe(parent);

    /*
     * Colours are resolved once in `applySize` and cached, because reading
     * them per frame would force a style recalculation. That cache has to be
     * invalidated when the colour scheme changes, or the field keeps painting
     * the previous palette until the next resize.
     */
    const schemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = () => applySize();
    schemeQuery.addEventListener("change", onSchemeChange);

    /* ------------------------------------------------------------- scroll */
    const readScroll = () => {
      const target = scrollTargetRef?.current ?? parent;
      const rect = target.getBoundingClientRect();
      const total = rect.height || 1;
      // 0 when the section top is at the viewport top, 1 once it has fully
      // scrolled past. Matches the choreography in Stage 3 §13.
      progressRef.current = Math.min(1, Math.max(0, -rect.top / total));
    };

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        readScroll();
      });
    };

    readScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------------------------------------------------------- visibility */
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(parent);

    const onVisibilityChange = () => {
      tabVisibleRef.current = document.visibilityState === "visible";
      if (tabVisibleRef.current) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* --------------------------------------------------------------- draw */
    const draw = (time: number) => {
      const { width, height, scale, offsetX, offsetY } = sizeRef.current;
      const { node: nodeColor, accent } = colorsRef.current;
      const progress = progressRef.current;

      // The field organises through the first ~70% of the scroll, then
      // disperses as the next section arrives (S5/DISSOLVE).
      const organize = smoothstep(0, 0.7, progress);
      const dissolve = smoothstep(0.72, 1, progress);
      const alpha = 1 - dissolve;

      context.clearRect(0, 0, width, height);

      if (alpha <= 0.01) {
        frameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const toX = (x: number) => x * scale + offsetX;
      const toY = (y: number) => y * scale + offsetY;

      /* edges */
      context.lineWidth = 1;
      for (let i = 0; i < field.edges.length; i += 1) {
        const edge = field.edges[i];
        const opacity = edgeOpacityAt(edge, organize) * alpha;
        if (opacity < 0.01) continue;

        const from = nodeAt(field.nodes[edge.a], organize, time);
        const to = nodeAt(field.nodes[edge.b], organize, time);

        context.globalAlpha = opacity;
        context.strokeStyle = edge.signal ? accent : nodeColor;
        context.beginPath();
        context.moveTo(toX(from.x), toY(from.y));
        context.lineTo(toX(to.x), toY(to.y));
        context.stroke();
      }

      /* signal pulses: S3/REASON: selected paths carry activity while the
         rest stay muted. Only drawn once the structure exists to carry them. */
      const signalStrength = smoothstep(0.45, 0.75, progress) * alpha;
      if (signalStrength > 0.01) {
        context.fillStyle = accent;
        for (let i = 0; i < field.edges.length; i += 1) {
          const edge = field.edges[i];
          if (!edge.signal) continue;

          // Offset per edge so pulses don't march in lockstep.
          const t = ((time * 0.00035 + i * 0.13) % 1 + 1) % 1;
          const from = nodeAt(field.nodes[edge.a], organize, time);
          const to = nodeAt(field.nodes[edge.b], organize, time);

          context.globalAlpha = signalStrength * (1 - Math.abs(t - 0.5) * 1.4);
          context.beginPath();
          context.arc(
            toX(from.x + (to.x - from.x) * t),
            toY(from.y + (to.y - from.y) * t),
            2,
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      }

      /* nodes */
      for (let i = 0; i < field.nodes.length; i += 1) {
        const node = field.nodes[i];
        const position = nodeAt(node, organize, time);
        const isAccent = node.id % 9 === 0;

        context.globalAlpha = (isAccent ? 0.9 : 0.55) * alpha;
        context.fillStyle = isAccent ? accent : nodeColor;
        context.beginPath();
        context.arc(toX(position.x), toY(position.y), node.radius * scale, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;

      if (!readyRef.current) {
        readyRef.current = true;
        onReady?.();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    function start() {
      if (frameRef.current) return;
      if (!visibleRef.current || !tabVisibleRef.current) return;
      frameRef.current = window.requestAnimationFrame(draw);
    }

    function stop() {
      if (!frameRef.current) return;
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      schemeQuery.removeEventListener("change", onSchemeChange);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearTimeout(resizeTimer);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, [field, onReady, scrollTargetRef]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
