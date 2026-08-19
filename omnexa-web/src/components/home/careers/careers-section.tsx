import { TextAction } from "@/components/actions/text-action";
import { SampleBadge } from "@/components/brand/sample-badge";
import { Section } from "@/components/layout/section";
import { Tile, TileGrid } from "@/components/layout/tile";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import type { Job } from "@/content/schemas/editorial";

import styles from "./careers-section.module.css";

/** Stage 3 §24: three broad paths, not a list of invented departments. */
/** Stage 3 §24: three broad paths, each pointing at a page that exists. */
const ALL_PATHS = [
  {
    label: "Research",
    detail:
      "Research questions, experimentation, publication and reproducibility.",
    href: "/careers/research",
  },
  {
    label: "Engineering",
    detail:
      "Systems thinking, ML infrastructure, reliability and security.",
    href: "/careers/engineering",
  },
  {
    label: "Infrastructure",
    detail:
      "Research platforms, ML pipelines and the tooling the lab runs on.",
    href: "/careers/engineering",
  },
] as const;

const PATHS = ALL_PATHS;

/**
 * Section 11: Careers.
 * Stage 3 §24, Stage 6 §40
 *
 * The zero-open-role path is the one that actually ships right now, and it is
 * treated as a real state rather than a fallback: no manufactured roles, no
 * fake urgency, no "we're always hiring" hedge. If `openRoles` is empty the
 * section states so plainly and still invites the reader onward.
 */
export function CareersSection({
  jobs,
  index,
}: {
  jobs: Job[];
  index: string;
}) {
  const roles = jobs.slice(0, 4);

  return (
    <Section id="careers" tone="light" density="editorial">
      <div className={styles.header}>
        <div className={styles.headerMeta}>
          <TechnicalLabel as="span" tone="muted">
            {index}
          </TechnicalLabel>
          <span className={styles.rule} aria-hidden="true" />
          <TechnicalLabel as="span" tone="secondary">
            Careers
          </TechnicalLabel>
        </div>

        <div className={styles.headerBody}>
          <DisplayHeading
            as="h2"
            size="display-2"
            lines={["Work on", "hard problems."]}
            accentTerminal
          />

          <div className={styles.headerAside}>
            <p className="omx-body-lg">
              Join a team working across research, machine intelligence,
              autonomous systems, software engineering, scientific
              infrastructure, and applied AI.
            </p>

            <div className={styles.actions}>
              <TextAction href="/careers/open-roles" variant="primary">
                Explore open roles
              </TextAction>
              <TextAction href="/careers/culture">Life at Omnexa</TextAction>
            </div>
          </div>
        </div>
      </div>

      {/* Three parallel routes into the lab, compared rather than read in
          order. */}
      <TileGrid columns={3} className={styles.paths}>
        {PATHS.map((path) => (
          <Tile
            key={path.label}
            title={path.label}
            detail={path.detail}
            href={path.href}
          />
        ))}
      </TileGrid>

      {/* While there are no open roles, the homepage should not close on an
          empty state: the section's three paths are the useful ending. */}
      {roles.length > 0 ? (
      <div className={styles.roles}>
        <TechnicalLabel as="h3" tone="muted" className={styles.rolesTitle}>
          Open roles
        </TechnicalLabel>

        {roles.length === 0 ? (
          /* Stage 6 §40: the honest empty state */
          <div className={styles.empty}>
            <p className={`omx-body-lg ${styles.emptyLead}`}>
              No open roles are currently listed.
            </p>
            <p className={`omx-body ${styles.emptyDetail}`}>
              Follow Omnexa Labs for future opportunities.
            </p>
          </div>
        ) : (
          <ul className={styles.roleList} role="list">
            {roles.map((role) => (
              <li key={role.id} className={styles.role}>
                <a
                  href={`/careers/open-roles/${role.slug}`}
                  className={styles.roleLink}
                >
                  <span className={styles.roleTitle}>
                    {role.title}
                    <SampleBadge sample={role.sample} />
                  </span>

                  {/* Location is never hidden behind interaction: §35 */}
                  <span className={styles.roleMeta}>
                    <TechnicalLabel as="span" size="sm">
                      {role.department}
                    </TechnicalLabel>
                    <TechnicalLabel as="span" size="sm">
                      {role.location}
                    </TechnicalLabel>
                    <TechnicalLabel as="span" size="sm">
                      {role.employmentType}
                    </TechnicalLabel>
                  </span>

                  <span className={styles.pathArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      ) : null}
    </Section>
  );
}
