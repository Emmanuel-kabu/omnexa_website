"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SampleBadge } from "@/components/brand/sample-badge";
import { StatusLabel } from "@/components/brand/status-label";
import { TechnicalLabel } from "@/components/typography/technical-label";
import type { AtlasData, AtlasNode } from "@/types/atlas";
import { ATLAS_ROOT_ID } from "@/types/atlas";

import { AtlasGraph } from "./atlas-graph";
import { buildAtlasLayout, type AtlasSelection } from "./atlas-layout";
import styles from "./research-atlas.module.css";

/**
 * The Research Atlas.
 * Stage 4 §11-22
 *
 * The signature research interaction: area → subdomain → program → project,
 * disclosed progressively rather than all at once.
 *
 * CONTROL SURFACE
 * ---------------
 * The nested list on the left is the real interface. It is built from buttons
 * and links, so it works with a keyboard, a screen reader and touch, and it is
 * what §19 means by "provide a semantic equivalent". The SVG graph mirrors it
 * for pointer users and is `aria-hidden`: assistive technology never has to
 * traverse a few hundred circles to reach the same entities.
 *
 * Both surfaces read the same selection and write the same URL, so they cannot
 * disagree.
 *
 * URL STATE: §17
 * Area, subdomain and program persist and are shareable. Hover state and
 * transient visual state deliberately do not. Selection uses `replace` rather
 * than `push`: exploring the atlas is a view change, not a navigation, and
 * should not fill the back button with intermediate states.
 */
export function ResearchAtlas({ data }: { data: AtlasData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selection: AtlasSelection = useMemo(
    () => ({
      areaId: searchParams.get("area") ?? undefined,
      subdomainId: searchParams.get("subdomain") ?? undefined,
      programId: searchParams.get("program") ?? undefined,
    }),
    [searchParams],
  );

  const byId = useMemo(
    () => new Map(data.nodes.map((node) => [node.id, node])),
    [data.nodes],
  );

  const areas = useMemo(
    () => data.nodes.filter((node) => node.type === "area"),
    [data.nodes],
  );

  const childrenOf = useCallback(
    (parentId: string) => data.nodes.filter((node) => node.parentId === parentId),
    [data.nodes],
  );

  const layout = useMemo(
    () => buildAtlasLayout(data.nodes, selection),
    [data.nodes, selection],
  );

  /**
   * Selecting a level clears the levels beneath it, so the URL can never
   * describe an impossible state such as a program under a different area.
   */
  const select = useCallback(
    (node: AtlasNode | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!node || node.type === "root") {
        params.delete("area");
        params.delete("subdomain");
        params.delete("program");
      } else if (node.type === "area") {
        const same = selection.areaId === node.id;
        if (same) params.delete("area");
        else params.set("area", node.id);
        params.delete("subdomain");
        params.delete("program");
      } else if (node.type === "subdomain") {
        const same = selection.subdomainId === node.id;
        if (node.parentId) params.set("area", node.parentId);
        if (same) params.delete("subdomain");
        else params.set("subdomain", node.id);
        params.delete("program");
      } else if (node.type === "program") {
        const same = selection.programId === node.id;
        if (same) params.delete("program");
        else params.set("program", node.id);
      }

      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}#atlas`, {
        scroll: false,
      });
    },
    [pathname, router, searchParams, selection],
  );

  // The deepest selected entity drives the detail panel.
  const selected =
    (selection.programId ? byId.get(selection.programId) : undefined) ??
    (selection.subdomainId ? byId.get(selection.subdomainId) : undefined) ??
    (selection.areaId ? byId.get(selection.areaId) : undefined) ??
    byId.get(ATLAS_ROOT_ID);

  return (
    <div className={styles.atlas} id="atlas">
      <div className={styles.header}>
        <TechnicalLabel as="h2" tone="secondary">
          Research atlas
        </TechnicalLabel>

        {selection.areaId ? (
          <button
            type="button"
            className={`omx-technical-sm ${styles.reset}`}
            onClick={() => select(null)}
          >
            Reset view
          </button>
        ) : null}
      </div>

      <div className={styles.body}>
        {/* ---------------------------------------------------------------
            The semantic control surface. Primary on mobile, and the keyboard
            and screen-reader path on every breakpoint.
        --------------------------------------------------------------- */}
        <nav className={styles.tree} aria-label="Research hierarchy">
          <ul className={styles.level} role="list">
            {areas.map((area) => {
              const areaOpen = selection.areaId === area.id;
              const subdomains = childrenOf(area.id);

              return (
                <li key={area.id} className={styles.areaItem}>
                  <button
                    type="button"
                    className={styles.areaButton}
                    aria-expanded={areaOpen}
                    data-active={areaOpen || undefined}
                    onClick={() => select(area)}
                    style={{ ["--node-color" as string]: domainColor(area) }}
                  >
                    <span className={styles.marker} aria-hidden="true" />
                    <span className={styles.areaLabel}>{area.label}</span>
                    <span className={styles.areaCode}>
                      <TechnicalLabel as="span" tone="muted" size="sm">
                        {area.code}
                      </TechnicalLabel>
                    </span>
                  </button>

                  {areaOpen ? (
                    <ul className={styles.subLevel} role="list">
                      {subdomains.map((subdomain) => {
                        const subOpen = selection.subdomainId === subdomain.id;
                        const programs = childrenOf(subdomain.id);

                        return (
                          <li key={subdomain.id}>
                            <button
                              type="button"
                              className={styles.subButton}
                              aria-expanded={subOpen}
                              data-active={subOpen || undefined}
                              onClick={() => select(subdomain)}
                            >
                              {subdomain.label}
                              {/* Real counts only: §16 */}
                              {subdomain.counts?.programs ? (
                                <span className={styles.count}>
                                  {subdomain.counts.programs}
                                </span>
                              ) : null}
                            </button>

                            {subOpen ? (
                              programs.length > 0 ? (
                                <ul className={styles.subLevel} role="list">
                                  {programs.map((program) => {
                                    const programOpen =
                                      selection.programId === program.id;
                                    const projects = childrenOf(program.id);

                                    return (
                                      <li key={program.id}>
                                        <button
                                          type="button"
                                          className={styles.programButton}
                                          aria-expanded={programOpen}
                                          data-active={programOpen || undefined}
                                          onClick={() => select(program)}
                                        >
                                          {program.label}
                                          <SampleBadge sample={program.sample} />
                                        </button>

                                        {programOpen && projects.length > 0 ? (
                                          <ul className={styles.subLevel} role="list">
                                            {projects.map((project) => (
                                              <li key={project.id}>
                                                <Link
                                                  href={project.href ?? "#"}
                                                  className={styles.projectLink}
                                                >
                                                  {project.label} →
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        ) : null}
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <p className={`omx-body-sm ${styles.empty}`}>
                                  No public programs are listed for this
                                  subdomain yet.
                                </p>
                              )
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Visual mirror: decorative, aria-hidden (§19) */}
        <div className={styles.graph}>
          <AtlasGraph layout={layout} onSelect={select} />
        </div>

        {/* Selection panel: §16 */}
        <aside className={styles.detail} aria-live="polite">
          {selected ? (
            <>
              <div className={styles.detailHead}>
                <TechnicalLabel as="p" tone="muted" size="sm">
                  {selected.type === "root" ? "Atlas" : selected.type}
                </TechnicalLabel>
                {selected.status ? (
                  <StatusLabel status={selected.status} />
                ) : null}
              </div>

              <h3 className={`omx-heading-3 ${styles.detailTitle}`}>
                {selected.label}
              </h3>

              {selected.summary ? (
                <p className={`omx-body-sm ${styles.detailSummary}`}>
                  {selected.summary}
                </p>
              ) : (
                <p className={`omx-body-sm ${styles.detailSummary}`}>
                  Select a research area to explore its subdomains, programs and
                  projects.
                </p>
              )}

              {selected.counts ? (
                <dl className={styles.counts}>
                  {countEntries(selected).map(([label, value]) => (
                    <div key={label} className={styles.countRow}>
                      <dt>
                        <TechnicalLabel as="span" tone="muted" size="sm">
                          {label}
                        </TechnicalLabel>
                      </dt>
                      <dd className={styles.countValue}>
                        {String(value).padStart(2, "0")}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {selected.href ? (
                <Link href={selected.href} className={styles.detailLink}>
                  Explore {selected.type} →
                </Link>
              ) : null}
            </>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function domainColor(node: AtlasNode): string {
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

/** Only counts that exist and are non-zero: Stage 4 §16, §101. */
function countEntries(node: AtlasNode): Array<[string, number]> {
  const counts = node.counts;
  if (!counts) return [];

  return (
    [
      ["Research areas", counts.areas],
      ["Subdomains", counts.subdomains],
      ["Programs", counts.programs],
      ["Projects", counts.projects],
      ["Experiments", counts.experiments],
      ["Publications", counts.publications],
    ] as Array<[string, number | undefined]>
  ).filter((entry): entry is [string, number] =>
    typeof entry[1] === "number" && entry[1] > 0,
  );
}
