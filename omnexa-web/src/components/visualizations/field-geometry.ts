/**
 * Intelligence Field: shared geometry
 * Stage 1 §19, Stage 3 §10-12
 *
 * The field represents:
 *
 *     potential → organization → learning → reasoning → discovery
 *
 * WHY ONE MODULE
 * --------------
 * The static SVG fallback and the Canvas enhancement generate their geometry
 * from this same seeded source, which buys three things:
 *
 *   1. No hydration mismatch. `Math.random()` would produce different node
 *      positions on the server and the client; a seeded PRNG produces the
 *      same field in both, so the Canvas can take over from the SVG without
 *      anything visibly jumping.
 *   2. The fallback is a real state of the visualisation, not a stand-in
 *      picture: it is S0/LATENT rendered honestly.
 *   3. The footer field is the *same* field evaluated at a later progress,
 *      which is what makes "hero = unstructured potential, footer = organised
 *      intelligence" true rather than merely thematic (Stage 1 §29).
 *
 * All coordinates are in the abstract 1000×700 space below; consumers scale
 * via `viewBox` or a canvas transform.
 */

export const FIELD_WIDTH = 1000;
export const FIELD_HEIGHT = 700;

export type FieldNode = {
  id: number;
  /** S0: unstructured potential */
  latentX: number;
  latentY: number;
  /** S2: organised into clusters */
  organizedX: number;
  organizedY: number;
  radius: number;
  cluster: number;
  /** Per-node phase so drift never looks synchronised */
  phase: number;
};

export type FieldEdge = {
  a: number;
  b: number;
  /** Normalised 0-1; shorter edges read as stronger relationships */
  strength: number;
  /** Edges that carry a signal pulse in S3/REASON */
  signal: boolean;
};

export type Field = {
  nodes: FieldNode[];
  edges: FieldEdge[];
};

/** mulberry32: small, fast, and identical across server and client. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type FieldOptions = {
  seed?: number;
  nodeCount: number;
  clusterCount?: number;
  /** Max neighbours each node may bond with when organised */
  maxDegree?: number;
};

/**
 * Build a field.
 *
 * Node budgets follow Stage 3 §12: 80-140 desktop, 50-80 low-capability
 * desktop, 30-60 mobile. The caller picks the count; this stays pure.
 */
export function createField({
  seed = 20260814,
  nodeCount,
  clusterCount = 4,
  maxDegree = 3,
}: FieldOptions): Field {
  const random = mulberry32(seed);

  // Cluster centres, inset from the edges so organised structure never
  // collides with the frame.
  const centers = Array.from({ length: clusterCount }, (_, index) => {
    const columns = Math.ceil(Math.sqrt(clusterCount));
    const row = Math.floor(index / columns);
    const column = index % columns;
    const rows = Math.ceil(clusterCount / columns);

    const cellW = FIELD_WIDTH / columns;
    const cellH = FIELD_HEIGHT / rows;

    return {
      x: cellW * (column + 0.5) + (random() - 0.5) * cellW * 0.3,
      y: cellH * (row + 0.5) + (random() - 0.5) * cellH * 0.3,
    };
  });

  const nodes: FieldNode[] = Array.from({ length: nodeCount }, (_, id) => {
    const cluster = id % clusterCount;
    const center = centers[cluster];

    // Organised position: polar offset from the cluster centre. sqrt on the
    // radius keeps density even rather than bunching at the middle.
    const angle = random() * Math.PI * 2;
    const spread = Math.sqrt(random()) * 150;

    return {
      id,
      latentX: 40 + random() * (FIELD_WIDTH - 80),
      latentY: 40 + random() * (FIELD_HEIGHT - 80),
      organizedX: clamp(center.x + Math.cos(angle) * spread, 30, FIELD_WIDTH - 30),
      organizedY: clamp(center.y + Math.sin(angle) * spread, 30, FIELD_HEIGHT - 30),
      radius: 1.4 + random() * 2.2,
      cluster,
      phase: random() * Math.PI * 2,
    };
  });

  // Bonds form between nodes that end up near each other once organised:
  // structure emerges from the arrangement rather than being imposed on it.
  const edges: FieldEdge[] = [];
  const degree = new Array<number>(nodeCount).fill(0);
  const MAX_DISTANCE = 210;

  for (let i = 0; i < nodeCount; i += 1) {
    if (degree[i] >= maxDegree) continue;

    const candidates: Array<{ index: number; distance: number }> = [];

    for (let j = i + 1; j < nodeCount; j += 1) {
      if (degree[j] >= maxDegree) continue;

      const dx = nodes[i].organizedX - nodes[j].organizedX;
      const dy = nodes[i].organizedY - nodes[j].organizedY;
      const distance = Math.hypot(dx, dy);

      if (distance < MAX_DISTANCE) candidates.push({ index: j, distance });
    }

    candidates.sort((a, b) => a.distance - b.distance);

    for (const candidate of candidates) {
      if (degree[i] >= maxDegree) break;
      if (degree[candidate.index] >= maxDegree) continue;

      edges.push({
        a: i,
        b: candidate.index,
        strength: 1 - candidate.distance / MAX_DISTANCE,
        // A minority of edges carry signal, so S3/REASON shows selected
        // paths active while the rest stay muted (Stage 3 §11).
        signal: random() < 0.22,
      });

      degree[i] += 1;
      degree[candidate.index] += 1;
    }
  }

  return { nodes, edges };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Smooth 0→1 ramp; gentler than a raw linear interpolation. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Evaluate a node at a given progress through the state machine.
 *
 * `progress` 0 → S0/LATENT, 1 → fully organised. Drift is a small
 * per-node oscillation that never accumulates, so the field breathes without
 * wandering off-composition. Pass `time = 0` for a still frame.
 */
export function nodeAt(
  node: FieldNode,
  progress: number,
  time = 0,
): { x: number; y: number } {
  const t = smoothstep(0, 1, progress);
  const drift = time === 0 ? 0 : Math.sin(time * 0.0004 + node.phase) * 6;

  return {
    x: node.latentX + (node.organizedX - node.latentX) * t + drift,
    y:
      node.latentY +
      (node.organizedY - node.latentY) * t +
      (time === 0 ? 0 : Math.cos(time * 0.0003 + node.phase) * 5),
  };
}

/**
 * Edge opacity at a given progress.
 * Connections are absent while latent and only resolve as the field organises,
 * so the visual states in Stage 3 §11 read in order.
 */
export function edgeOpacityAt(edge: FieldEdge, progress: number): number {
  return smoothstep(0.25, 0.85, progress) * (0.15 + edge.strength * 0.5);
}
