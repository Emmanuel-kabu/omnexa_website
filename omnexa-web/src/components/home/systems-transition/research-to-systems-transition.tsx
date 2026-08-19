import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";

import styles from "./research-to-systems-transition.module.css";

/**
 * Section 05: Research → Systems.
 * Stage 3 §18
 *
 * The major conceptual pivot of the page, and one of the few places the specs
 * explicitly sanction a cinematic transition. This is where the site descends
 * from public research into operating systems, so it is also where the light
 * surface hands over to the inverse one (Stage 1 §7).
 *
 * The visual states the pivot literally: dispersed research trajectories on
 * the left converge into ordered system paths on the right. It is CSS and SVG
 * only: no runtime, no scroll hijacking (§32).
 */
export function ResearchToSystemsTransition({ index }: { index: string }) {
  return (
    <section
      id="research-to-systems"
      className={styles.section}
      data-tone="dark"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <TechnicalLabel as="span" tone="muted">
            {index} / Transition
          </TechnicalLabel>

          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["Research", "becomes", "systems."]}
            accentTerminal
          />
        </div>

        <div className={styles.body}>
          <ConvergenceVisual />

          <p className={`omx-body-lg ${styles.lede}`}>
            We turn research into working systems: platforms that coordinate
            intelligence, operate in real environments, and create measurable
            capability.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Research trajectories resolving into system paths.
 *
 * The same LINE and TRAJECTORY primitives as the hero field and the domain
 * visuals, so the pivot reads as the same visual language changing state
 * rather than a new graphic appearing (Stage 1 §22).
 */
function ConvergenceVisual() {
  const sources = [40, 92, 144, 196, 248, 300, 352];
  const targets = [140, 180, 220, 260];

  return (
    <svg
      className={styles.visual}
      viewBox="0 0 800 400"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Dispersed research trajectories entering from the left */}
      {sources.map((y, index) => {
        const target = targets[index % targets.length];
        return (
          <path
            key={y}
            d={`M0 ${y} C 220 ${y}, 300 ${target}, 420 ${target}`}
            className={index % 3 === 0 ? styles.pathAccent : styles.path}
          />
        );
      })}

      {/* Ordered system lanes leaving to the right */}
      {targets.map((y, index) => (
        <g key={`lane-${y}`}>
          <line
            x1={420}
            y1={y}
            x2={800}
            y2={y}
            className={index === 1 ? styles.laneAccent : styles.lane}
          />
          <circle
            cx={420}
            cy={y}
            r={index === 1 ? 5 : 3.5}
            className={index === 1 ? styles.nodeAccent : styles.node}
          />
        </g>
      ))}

      {/* The convergence boundary */}
      <line x1={420} y1={80} x2={420} y2={320} className={styles.boundary} />
    </svg>
  );
}
