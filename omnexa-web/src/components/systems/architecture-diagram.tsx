import { TechnicalLabel } from "@/components/typography/technical-label";
import type { SystemArchitecture } from "@/content/schemas/systems";

import styles from "./architecture-diagram.module.css";

/**
 * System architecture diagram.
 * Stage 5 §60, §64, §70, §71, §73
 *
 * Built from semantic HTML rather than SVG, on purpose. Stage 5 §71 requires
 * every informational architecture diagram to have a semantic equivalent, and
 * §70 forbids shrinking a complex desktop diagram into unreadable mobile
 * content. Constructing the diagram *as* a structured list and styling it into
 * a layered graph satisfies both at once:
 *
 *   · screen readers get a real layer → node → relationship hierarchy
 *   · mobile degrades to a legible step list with no separate code path
 *   · nothing depends on animation, hover, or a canvas runtime (§73)
 *
 * Graph data comes from the content layer, never from JSX (§64).
 */
export function ArchitectureDiagram({
  architecture,
}: {
  architecture: SystemArchitecture;
}) {
  const { nodes, edges, layers } = architecture;

  const nodeById = new Map(nodes.map((node) => [node.id, node]));

  // Group by declared layers where present; otherwise treat the node list as
  // one layer so the component works for flat architectures too.
  const groups =
    layers.length > 0
      ? layers.map((layer) => ({
          id: layer.id,
          label: layer.label,
          summary: layer.summary,
          nodes: layer.nodeIds
            .map((id) => nodeById.get(id))
            .filter((node): node is NonNullable<typeof node> => Boolean(node)),
        }))
      : [{ id: "all", label: "Components", summary: undefined, nodes }];

  const outgoing = (nodeId: string) =>
    edges.filter((edge) => edge.source === nodeId);

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <h3 className={`omx-heading-4 ${styles.captionTitle}`}>
          {architecture.title}
        </h3>
        {architecture.description ? (
          <p className={`omx-body-sm ${styles.captionBody}`}>
            {architecture.description}
          </p>
        ) : null}
      </figcaption>

      <ol className={styles.layers}>
        {groups.map((group, groupIndex) => (
          <li key={group.id} className={styles.layer}>
            <div className={styles.layerHead}>
              <TechnicalLabel as="span" tone="muted" size="sm">
                {String(groupIndex + 1).padStart(2, "0")}
              </TechnicalLabel>
              <TechnicalLabel as="h4" tone="secondary">
                {group.label}
              </TechnicalLabel>
            </div>

            <ul className={styles.nodes} role="list">
              {group.nodes.map((node) => {
                const relations = outgoing(node.id);

                return (
                  <li key={node.id} className={styles.node} data-type={node.type}>
                    <span className={styles.nodeLabel}>{node.label}</span>

                    {node.summary ? (
                      <span className={`omx-body-sm ${styles.nodeSummary}`}>
                        {node.summary}
                      </span>
                    ) : null}

                    {/* Relationships as text: the semantic equivalent of the
                        arrows a drawn diagram would use. */}
                    {relations.length > 0 ? (
                      <ul className={styles.relations} role="list">
                        {relations.map((edge) => {
                          const target = nodeById.get(edge.target);
                          if (!target) return null;

                          return (
                            <li key={edge.id} className={styles.relation}>
                              <span className={styles.arrow} aria-hidden="true">
                                {edge.direction === "bidirectional" ? "↕" : "→"}
                              </span>
                              <span className="omx-technical-sm">
                                {edge.direction === "bidirectional"
                                  ? "exchanges with"
                                  : "flows to"}{" "}
                                {target.label}
                                {edge.label ? ` · ${edge.label}` : ""}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
