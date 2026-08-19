import type { ResearchAreaCode } from "@/types/content";

import styles from "./domain-visual.module.css";

/**
 * Domain visual mapping: Stage 3 §16.
 *
 * The four areas share one set of primitives (POINT, LINE, FIELD, GRID,
 * TRAJECTORY: Stage 1 §22) but each behaves differently, so the visuals read
 * as one visual language rather than four unrelated graphics:
 *
 *   DI  evolving clustered structures
 *   FM  layered representations / token-like trajectories
 *   AM  geometric constraints / state transformations
 *   SE  graph topology / dependency flow
 *
 * Every variant is deterministic, server-rendered, and `aria-hidden`: the
 * subdomain list beside it carries the same information as text, which is what
 * Stage 3 §38 asks for on informational visuals.
 */
export function DomainVisual({ code }: { code: ResearchAreaCode }) {
  return (
    <svg
      className={styles.visual}
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      data-domain={code}
    >
      {code === "DI" ? <DevelopmentalIntelligence /> : null}
      {code === "FM" ? <FoundationModels /> : null}
      {code === "AM" ? <AlgorithmsMathematics /> : null}
      {code === "SE" ? <SoftwareSystems /> : null}
    </svg>
  );
}

/** Clusters at three stages of consolidation: knowledge accumulating. */
function DevelopmentalIntelligence() {
  const clusters = [
    { cx: 110, cy: 130, r: 46, count: 7, seed: 1 },
    { cx: 262, cy: 168, r: 58, count: 10, seed: 2 },
    { cx: 178, cy: 288, r: 40, count: 6, seed: 3 },
  ];

  return (
    <g>
      {clusters.map((cluster) => (
        <circle
          key={`ring-${cluster.seed}`}
          cx={cluster.cx}
          cy={cluster.cy}
          r={cluster.r}
          className={styles.ring}
        />
      ))}

      {/* Bonds between cluster centres: structure forming across groups */}
      <line x1={110} y1={130} x2={262} y2={168} className={styles.line} />
      <line x1={262} y1={168} x2={178} y2={288} className={styles.line} />
      <line x1={110} y1={130} x2={178} y2={288} className={styles.lineFaint} />

      {clusters.flatMap((cluster) =>
        Array.from({ length: cluster.count }, (_, index) => {
          const angle = (index / cluster.count) * Math.PI * 2 + cluster.seed;
          const radius = cluster.r * (0.35 + ((index * 37) % 60) / 100);
          return (
            <circle
              key={`n-${cluster.seed}-${index}`}
              cx={cluster.cx + Math.cos(angle) * radius}
              cy={cluster.cy + Math.sin(angle) * radius}
              r={2.6}
              className={index === 0 ? styles.nodeAccent : styles.node}
            />
          );
        }),
      )}
    </g>
  );
}

/** Stacked representation layers with trajectories passing through them. */
function FoundationModels() {
  const layers = [88, 138, 188, 238, 288];

  return (
    <g>
      {layers.map((y, index) => (
        <g key={y}>
          <line x1={60} y1={y} x2={340} y2={y} className={styles.line} />
          {Array.from({ length: 8 }, (_, column) => (
            <circle
              key={`${y}-${column}`}
              cx={72 + column * 37}
              cy={y}
              r={2.4}
              className={
                (column + index) % 5 === 0 ? styles.nodeAccent : styles.node
              }
            />
          ))}
        </g>
      ))}

      {/* Token-like paths ascending through the layers */}
      <path
        d="M72 288 C 140 260, 150 200, 220 188 S 300 130, 331 88"
        className={styles.trajectoryAccent}
      />
      <path
        d="M109 288 C 160 250, 190 220, 183 188 S 220 120, 257 88"
        className={styles.trajectory}
      />
    </g>
  );
}

/** A constrained region and a state transformation across it. */
function AlgorithmsMathematics() {
  return (
    <g>
      {/* Field grid: the search space */}
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`v-${index}`}
          x1={70 + index * 43}
          y1={70}
          x2={70 + index * 43}
          y2={330}
          className={styles.lineFaint}
        />
      ))}
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={`h-${index}`}
          x1={70}
          y1={70 + index * 43}
          x2={330}
          y2={70 + index * 43}
          className={styles.lineFaint}
        />
      ))}

      {/* The constraint boundary */}
      <path
        d="M113 242 L156 113 L285 156 L242 285 Z"
        className={styles.constraint}
      />

      {/* Descent path toward the optimum */}
      <path
        d="M96 306 C 150 280, 160 220, 199 199 S 250 180, 264 156"
        className={styles.trajectoryAccent}
      />

      <circle cx={96} cy={306} r={3.4} className={styles.node} />
      <circle cx={264} cy={156} r={5} className={styles.nodeAccent} />
    </g>
  );
}

/** A dependency graph with directed flow through it. */
function SoftwareSystems() {
  const nodes = [
    { id: "a", x: 200, y: 74 },
    { id: "b", x: 116, y: 152 },
    { id: "c", x: 284, y: 152 },
    { id: "d", x: 80, y: 244 },
    { id: "e", x: 190, y: 236 },
    { id: "f", x: 310, y: 244 },
    { id: "g", x: 148, y: 326 },
    { id: "h", x: 258, y: 326 },
  ];

  const edges: Array<[string, string, boolean]> = [
    ["a", "b", true],
    ["a", "c", false],
    ["b", "d", false],
    ["b", "e", true],
    ["c", "e", false],
    ["c", "f", false],
    ["e", "g", true],
    ["e", "h", false],
    ["d", "g", false],
    ["f", "h", false],
  ];

  const find = (id: string) => nodes.find((node) => node.id === id)!;

  return (
    <g>
      {edges.map(([from, to, active]) => {
        const a = find(from);
        const b = find(to);
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className={active ? styles.lineAccent : styles.line}
          />
        );
      })}

      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.id === "e" ? 6 : 4}
          className={node.id === "e" ? styles.nodeAccent : styles.node}
        />
      ))}
    </g>
  );
}
