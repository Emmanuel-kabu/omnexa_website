import type { AtlasNode, AtlasNodeType } from "@/types/atlas";
import { ATLAS_ROOT_ID } from "@/types/atlas";

/**
 * Atlas layout: a deterministic radial tree.
 * Stage 4 §13, §22, §97
 *
 * Deliberately NOT a force simulation. Stage 4 §22 prefers SVG/Canvas over
 * heavier options for a graph this size, §99 requires the interaction to stay
 * responsive, and §97 requires reduced motion to disable auto-layout movement.
 * A closed-form radial layout satisfies all three: positions are a pure
 * function of the data and the current selection, so the same input always
 * produces the same picture, there is nothing to converge, and nothing moves
 * unless the user selects something.
 *
 * Depth → radius:
 *   0 root · 1 area · 2 subdomain · 3 program · 4 project
 */

export const ATLAS_SIZE = 900;
const CENTER = ATLAS_SIZE / 2;

/** Overview: root at centre, the four areas on one ring. */
const OVERVIEW_RADII = [0, 245];

/**
 * Focused: the selected area takes the centre and its branch radiates across
 * the full circle. Stage 4 §15: "select research area → centre selected
 * domain → expand subdomains". Keeping the branch inside its original 90°
 * wedge would leave three quarters of the instrument empty.
 */
const FOCUS_RADII = [0, 150, 265, 350];

/** Where the unselected areas park as peripheral context. */
const CONTEXT_RADIUS = 398;

/** Node radius by type: hierarchy is legible before any label is read. */
const NODE_RADIUS: Record<AtlasNodeType, number> = {
  root: 9,
  area: 7,
  subdomain: 4.5,
  program: 5.5,
  project: 3.5,
};

export type AtlasSelection = {
  areaId?: string;
  subdomainId?: string;
  programId?: string;
};

export type PositionedNode = {
  node: AtlasNode;
  x: number;
  y: number;
  radius: number;
  depth: number;
  /** Mid-angle in radians, used to place labels outside the ring. */
  angle: number;
  /** On the selected branch: drawn at full strength. */
  active: boolean;
  /** Rendered but de-emphasised, so unrelated branches recede (§15). */
  dimmed: boolean;
};

export type PositionedEdge = {
  id: string;
  from: PositionedNode;
  to: PositionedNode;
  active: boolean;
  dimmed: boolean;
};

export type AtlasLayout = {
  nodes: PositionedNode[];
  edges: PositionedEdge[];
  /** Guide rings for the current mode, so the graph never draws stale orbits. */
  orbits: number[];
};

/**
 * Progressive disclosure: Stage 4 §12, §15.
 *
 * Visibility is not filtered after the fact: the layout simply never places a
 * node the visitor has not opened, so "what is drawn" and "what is reachable"
 * cannot drift apart. Areas are always placed; deeper levels appear only along
 * the opened branch.
 */

export function buildAtlasLayout(
  allNodes: AtlasNode[],
  selection: AtlasSelection,
): AtlasLayout {
  const byId = new Map(allNodes.map((node) => [node.id, node]));
  const positions = new Map<string, PositionedNode>();

  const childrenOf = (parentId: string) =>
    allNodes.filter((node) => node.parentId === parentId);

  const root = byId.get(ATLAS_ROOT_ID);
  const areas = allNodes.filter((node) => node.type === "area");
  const selectedArea = selection.areaId ? byId.get(selection.areaId) : undefined;

  const put = (
    node: AtlasNode,
    x: number,
    y: number,
    depth: number,
    angle: number,
    active: boolean,
    dimmed: boolean,
  ) => {
    positions.set(node.id, {
      node,
      x,
      y,
      radius: NODE_RADIUS[node.type],
      depth,
      angle,
      active,
      dimmed,
    });
  };

  /** Even distribution over a sector, starting at the top of the circle. */
  const ring = (
    items: AtlasNode[],
    radius: number,
    depth: number,
    startAngle: number,
    endAngle: number,
    active: boolean,
    dimmed: boolean,
  ) => {
    const span = endAngle - startAngle;
    const slice = span / Math.max(items.length, 1);

    items.forEach((item, index) => {
      const angle = startAngle + slice * index + slice / 2;
      put(
        item,
        CENTER + Math.cos(angle) * radius,
        CENTER + Math.sin(angle) * radius,
        depth,
        angle,
        active,
        dimmed,
      );
    });
  };

  const TOP = -Math.PI / 2;
  const FULL = Math.PI * 2;

  if (!selectedArea) {
    /* ---------------------------------------------------- overview state */
    if (root) put(root, CENTER, CENTER, 0, 0, true, false);
    ring(areas, OVERVIEW_RADII[1], 1, TOP, TOP + FULL, false, false);
  } else {
    /* ----------------------------------------------------- focused state */
    // The selected area becomes the centre of the instrument.
    put(selectedArea, CENTER, CENTER, 0, 0, true, false);

    const subdomains = childrenOf(selectedArea.id);
    const slice = FULL / Math.max(subdomains.length, 1);

    subdomains.forEach((subdomain, index) => {
      const sliceStart = TOP + slice * index;
      const angle = sliceStart + slice / 2;
      const isOpen = selection.subdomainId === subdomain.id;

      put(
        subdomain,
        CENTER + Math.cos(angle) * FOCUS_RADII[1],
        CENTER + Math.sin(angle) * FOCUS_RADII[1],
        1,
        angle,
        isOpen,
        Boolean(selection.subdomainId) && !isOpen,
      );

      if (!isOpen) return;

      // Programs fan within the open subdomain's wedge, widened slightly so a
      // single program does not sit exactly on top of its parent.
      const programs = childrenOf(subdomain.id);
      const wedge = slice * 0.9;
      const programSlice = wedge / Math.max(programs.length, 1);

      programs.forEach((program, programIndex) => {
        const programAngle =
          angle - wedge / 2 + programSlice * programIndex + programSlice / 2;
        const programOpen = selection.programId === program.id;

        put(
          program,
          CENTER + Math.cos(programAngle) * FOCUS_RADII[2],
          CENTER + Math.sin(programAngle) * FOCUS_RADII[2],
          2,
          programAngle,
          true,
          false,
        );

        if (!programOpen) return;

        const projects = childrenOf(program.id);
        const projectWedge = programSlice * 0.85;
        const projectSlice = projectWedge / Math.max(projects.length, 1);

        projects.forEach((project, projectIndex) => {
          const projectAngle =
            programAngle -
            projectWedge / 2 +
            projectSlice * projectIndex +
            projectSlice / 2;

          put(
            project,
            CENTER + Math.cos(projectAngle) * FOCUS_RADII[3],
            CENTER + Math.sin(projectAngle) * FOCUS_RADII[3],
            3,
            projectAngle,
            true,
            false,
          );
        });
      });
    });

    // The other areas remain visible as peripheral context, so the visitor can
    // see where they are in the whole and switch branch in one click.
    const others = areas.filter((area) => area.id !== selectedArea.id);
    ring(others, CONTEXT_RADIUS, 4, TOP, TOP + FULL, false, true);
  }

  /* ------------------------------------------------------------- edges */
  const edges: PositionedEdge[] = [];
  for (const positioned of positions.values()) {
    const { node } = positioned;
    if (!node.parentId) continue;

    // In the focused state the selected area is the root of the drawn tree,
    // so context areas deliberately have no edge back to it.
    const from = positions.get(node.parentId);
    if (!from) continue;

    edges.push({
      id: `${node.parentId}->${node.id}`,
      from,
      to: positioned,
      active: positioned.active,
      dimmed: positioned.dimmed,
    });
  }

  return {
    nodes: Array.from(positions.values()),
    edges,
    orbits: selectedArea
      ? [FOCUS_RADII[1], FOCUS_RADII[2], FOCUS_RADII[3], CONTEXT_RADIUS]
      : [OVERVIEW_RADII[1]],
  };
}

/** Domain colour variable for a node, falling back to the accent. */
export function domainVar(node: AtlasNode): string {
  switch (node.code) {
    case "DI":
      return "var(--domain-di)";
    case "FM":
      return "var(--domain-fm)";
    case "AM":
      return "var(--domain-am)";
    case "SE":
      return "var(--domain-se)";
    default:
      return "var(--accent)";
  }
}
