import {
  createField,
  edgeOpacityAt,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  nodeAt,
} from "./field-geometry";

import styles from "./intelligence-field.module.css";

export type IntelligenceFieldStaticProps = {
  /** 0 → S0/LATENT · 1 → fully organised */
  progress?: number;
  nodeCount?: number;
  seed?: number;
  className?: string;
};

/**
 * The Intelligence Field, rendered as a still SVG on the server.
 *
 * This is the baseline layer of the progressive-enhancement ladder required by
 * Stage 1 §19.2 and §32.6:
 *
 *     static SVG  →  Canvas 2D  →  (WebGL, only if ever justified)
 *
 * It ships in the initial HTML, needs no JavaScript, and is what a
 * reduced-motion visitor keeps permanently. Because it draws from the same
 * seeded geometry as the Canvas layer, the enhancement swap is invisible.
 *
 * `aria-hidden` is correct here: the field is decorative. Every idea it
 * expresses is already stated in the hero copy beside it, so exposing ~90
 * circles to a screen reader would add noise, not information (Stage 3 §38).
 */
export function IntelligenceFieldStatic({
  progress = 0.18,
  nodeCount = 64,
  seed,
  className,
}: IntelligenceFieldStaticProps) {
  const field = createField({ nodeCount, seed });

  const positions = field.nodes.map((node) => nodeAt(node, progress));

  return (
    <svg
      className={[styles.canvas, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <g className={styles.edges}>
        {field.edges.map((edge) => {
          const opacity = edgeOpacityAt(edge, progress);
          if (opacity < 0.01) return null;

          const from = positions[edge.a];
          const to = positions[edge.b];

          return (
            <line
              key={`${edge.a}-${edge.b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeOpacity={opacity}
              className={edge.signal ? styles.edgeSignal : undefined}
            />
          );
        })}
      </g>

      <g className={styles.nodes}>
        {field.nodes.map((node, index) => (
          <circle
            key={node.id}
            cx={positions[index].x}
            cy={positions[index].y}
            r={node.radius}
            className={node.id % 9 === 0 ? styles.nodeAccent : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
