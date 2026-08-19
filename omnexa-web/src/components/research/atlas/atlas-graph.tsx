"use client";

import type { AtlasNode } from "@/types/atlas";

import {
  ATLAS_SIZE,
  domainVar,
  type AtlasLayout,
} from "./atlas-layout";
import styles from "./atlas-graph.module.css";

/**
 * The atlas graph.
 * Stage 4 §14, §19, §22, §97
 *
 * A visual mirror of the semantic tree beside it, and nothing more. The whole
 * SVG is `aria-hidden` because every entity it draws is already reachable as a
 * button or link in that tree: §19 is explicit that hundreds of SVG nodes
 * must not be exposed to assistive technology.
 *
 * Nodes are still clickable for pointer users. That is an enhancement on top
 * of a control surface that already works without it, not the only way in.
 *
 * Node positions transition between selections; the duration comes from a
 * motion token, so `prefers-reduced-motion` collapses it to an instant state
 * switch and the graph simply redraws (§97).
 */
export function AtlasGraph({
  layout,
  onSelect,
}: {
  layout: AtlasLayout;
  onSelect: (node: AtlasNode) => void;
}) {
  return (
    <svg
      className={styles.graph}
      viewBox={`0 0 ${ATLAS_SIZE} ${ATLAS_SIZE}`}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Orbit guides: the structural ring language of Stage 1 §12 */}
      {layout.orbits.map((radius) => (
        <circle
          key={radius}
          cx={ATLAS_SIZE / 2}
          cy={ATLAS_SIZE / 2}
          r={radius}
          className={styles.orbit}
        />
      ))}

      <g>
        {layout.edges.map((edge) => (
          <line
            key={edge.id}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            className={styles.edge}
            data-active={edge.active || undefined}
            data-dimmed={edge.dimmed || undefined}
            style={{ ["--node-color" as string]: domainVar(edge.to.node) }}
          />
        ))}
      </g>

      <g>
        {layout.nodes.map((positioned) => {
          const { node } = positioned;
          const interactive = node.type !== "root" && node.type !== "project";

          return (
            <g
              key={node.id}
              className={styles.node}
              data-active={positioned.active || undefined}
              data-dimmed={positioned.dimmed || undefined}
              data-type={node.type}
              style={{ ["--node-color" as string]: domainVar(node) }}
              onClick={interactive ? () => onSelect(node) : undefined}
            >
              {/* Generous invisible hit area: the visible dot is far below
                  any reasonable pointer target size. */}
              {interactive ? (
                <circle
                  cx={positioned.x}
                  cy={positioned.y}
                  r={Math.max(positioned.radius * 2.6, 14)}
                  className={styles.hit}
                />
              ) : null}

              <circle
                cx={positioned.x}
                cy={positioned.y}
                r={positioned.radius}
                className={styles.dot}
              />

              {/* Labelled: areas, the open branch, and the first ring, so a
                  visitor never faces an unexplained bare dot. Deeper inactive
                  nodes stay unlabelled, because labelling everything at this
                  density produces unreadable soup. */}
              {node.type === "area" || positioned.active || positioned.depth === 1 ? (
                <text
                  x={positioned.x + Math.cos(positioned.angle) * 16 * labelDirection(positioned.depth)}
                  y={positioned.y + Math.sin(positioned.angle) * 16 * labelDirection(positioned.depth)}
                  className={styles.label}
                  textAnchor={anchorFor(positioned.angle, positioned.depth)}
                  dominantBaseline="middle"
                >
                  {truncate(node.label, positioned.depth === 4 ? 18 : 24)}
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

/**
 * Outer-ring labels point INWARD.
 *
 * The SVG allows overflow so labels are not clipped mid-word, but the context
 * ring sits close to the viewBox edge: pointing those labels outward pushes
 * them across the neighbouring column. Turning them inward keeps the whole
 * instrument inside its own bounds at every selection state.
 */
function labelDirection(depth: number): 1 | -1 {
  return depth === 4 ? -1 : 1;
}

function anchorFor(angle: number, depth: number): "start" | "middle" | "end" {
  const cos = Math.cos(angle) * labelDirection(depth);
  if (cos < -0.3) return "end";
  if (cos > 0.3) return "start";
  return "middle";
}
