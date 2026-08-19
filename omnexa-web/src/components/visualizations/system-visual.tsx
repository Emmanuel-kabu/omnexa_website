import styles from "./system-visual.module.css";

/**
 * System visual grammars: Stage 3 §19, Stage 5 §14, §57.
 *
 * Each flagship system gets a DIFFERENT geometry, because the specs are
 * explicit that they must not read as one duplicated template:
 *
 *   Cadence  → lanes, lifecycle, handoffs, feedback
 *   MedApp   → knowledge graph, entity clusters, patient-centred relations
 *
 * Both are static SVG (Stage 5 §74 prefers SVG/Canvas over WebGL, and a stable
 * layout over a live force simulation), server-rendered, and `aria-hidden`:
 * the lifecycle and concept lists beside them carry the same content as text,
 * which is the semantic equivalent Stage 5 §71 requires.
 */

/**
 * Cadence: the software lifecycle as coordinated specialised work.
 *
 * Reads left to right through the five phases, with parallel engineering roles
 * branching under BUILD and a feedback arc returning from MONITOR to PLAN.
 * The arc is the point: this is a loop, not a pipeline.
 */
export function CadenceVisual() {
  const phases = [
    { label: "Plan", x: 70 },
    { label: "Build", x: 215 },
    { label: "Run", x: 360 },
    { label: "Deploy", x: 505 },
    { label: "Monitor", x: 650 },
  ];

  const lane = 150;

  /* Specialised roles working in parallel beneath BUILD */
  const roles = [
    { label: "Frontend", y: 218 },
    { label: "Backend", y: 252 },
    { label: "Data / ML", y: 286 },
  ];

  return (
    <svg
      className={styles.visual}
      viewBox="0 0 720 380"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Human direction enters above the lane */}
      <text x={70} y={68} className={styles.labelSmCenter}>
        HUMAN DIRECTION
      </text>
      <line x1={70} y1={82} x2={70} y2={lane - 14} className={styles.lineDashed} />
      <line x1={505} y1={82} x2={505} y2={lane - 14} className={styles.lineDashed} />
      <text x={505} y={68} className={styles.labelSmCenter}>
        APPROVAL
      </text>

      {/* The lifecycle lane */}
      <line x1={70} y1={lane} x2={650} y2={lane} className={styles.line} />

      {phases.map((phase, index) => (
        <g key={phase.label}>
          <circle
            cx={phase.x}
            cy={lane}
            r={index === 1 ? 7 : 5}
            className={index === 1 ? styles.nodeAccent : styles.node}
          />
          <text x={phase.x} y={lane - 22} className={styles.label}>
            {phase.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Parallel engineering roles under BUILD */}
      {roles.map((role) => (
        <g key={role.label}>
          <path
            d={`M215 ${lane + 8} C 215 ${role.y - 20}, 250 ${role.y}, 300 ${role.y}`}
            className={styles.lineFaint}
          />
          <circle cx={300} cy={role.y} r={3.5} className={styles.node} />
          <text x={314} y={role.y + 4} className={styles.labelSm}>
            {role.label.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Work rejoining the lane at RUN: QA and security as a real gate */}
      <path
        d={`M420 252 C 470 252, 360 200, 360 ${lane + 8}`}
        className={styles.lineFaint}
      />

      {/* Feedback arc: MONITOR back to PLAN */}
      <path
        d={`M650 ${lane + 14} C 650 350, 70 350, 70 ${lane + 14}`}
        className={styles.pathAccent}
      />
      <text x={360} y={368} className={styles.labelAccent}>
        FEEDBACK / MEMORY
      </text>
    </svg>
  );
}

/**
 * MedApp: the intelligence layer as a knowledge graph around a person.
 *
 * Patient context sits at the centre; medical knowledge entities orbit it;
 * specialised agents read from that grounding; practitioner workflows sit on
 * the far side. Every relationship is drawn bidirectional because context and
 * knowledge inform each other (Stage 5 §33).
 */
export function MedAppVisual() {
  const cx = 250;
  const cy = 190;

  /* Public knowledge entities only: Stage 5 §34 */
  const entities = [
    { label: "Symptom", angle: -100, radius: 108 },
    { label: "Condition", angle: -35, radius: 122 },
    { label: "Medication", angle: 28, radius: 112 },
    { label: "Lab result", angle: 92, radius: 124 },
    { label: "Vital", angle: 152, radius: 104 },
    { label: "Appointment", angle: 205, radius: 118 },
  ];

  const agents = [
    { label: "Medical chat", y: 96 },
    { label: "Lab reader", y: 158 },
    { label: "Med. scanner", y: 220 },
    { label: "Coordinator", y: 282 },
  ];

  const point = (angle: number, radius: number) => ({
    x: cx + Math.cos((angle * Math.PI) / 180) * radius,
    y: cy + Math.sin((angle * Math.PI) / 180) * radius,
  });

  return (
    <svg
      className={styles.visual}
      viewBox="0 0 720 380"
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      {/* Knowledge field boundary */}
      <circle cx={cx} cy={cy} r={140} className={styles.ring} />

      {/* Entity relations: through the centre, and around the rim */}
      {entities.map((entity, index) => {
        const position = point(entity.angle, entity.radius);
        const next = entities[(index + 1) % entities.length];
        const nextPosition = point(next.angle, next.radius);

        return (
          <g key={entity.label}>
            <line
              x1={cx}
              y1={cy}
              x2={position.x}
              y2={position.y}
              className={styles.lineFaint}
            />
            <line
              x1={position.x}
              y1={position.y}
              x2={nextPosition.x}
              y2={nextPosition.y}
              className={styles.line}
            />
            <circle
              cx={position.x}
              cy={position.y}
              r={4}
              className={styles.node}
            />
            <text
              x={position.x}
              y={position.y - 12}
              className={styles.labelSm}
            >
              {entity.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Patient context at the centre */}
      <circle cx={cx} cy={cy} r={9} className={styles.nodeAccent} />
      <text x={cx} y={cy + 30} className={styles.labelAccent}>
        PATIENT CONTEXT
      </text>

      {/* Specialised agents reading grounded context */}
      <line x1={470} y1={70} x2={470} y2={310} className={styles.lineDashed} />
      {agents.map((agent) => (
        <g key={agent.label}>
          <path
            d={`M${cx + 145} ${cy} C 420 ${cy}, 430 ${agent.y}, 470 ${agent.y}`}
            className={styles.lineFaint}
          />
          <circle cx={470} cy={agent.y} r={3.5} className={styles.node} />
          <text x={484} y={agent.y + 4} className={styles.labelSm}>
            {agent.label.toUpperCase()}
          </text>
        </g>
      ))}

      <text x={470} y={54} className={styles.label}>
        AGENTS
      </text>
    </svg>
  );
}
