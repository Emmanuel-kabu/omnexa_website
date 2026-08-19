import type { Metadata } from "next";

import { SampleBadge } from "@/components/brand/sample-badge";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { jobsRepository } from "@/content/repositories";

import styles from "../careers.module.css";

export const metadata: Metadata = {
  title: "Open roles",
  description: "Current openings at Omnexa Labs.",
  alternates: { canonical: "/careers/open-roles" },
};

/** Open roles index: Stage 6 §35, §38, §40. */
export default async function OpenRolesPage() {
  const roles = await jobsRepository.getOpenRoles();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[
          { label: "Careers", href: "/careers" },
          { label: "Open roles" },
        ]}
        headingLines={["Open roles."]}
        lede="Every listed role shows its team, location and employment type up front."
      />

      <Section tone="light" density="editorial">
        {roles.length === 0 ? (
          <EmptyState
            message="No open roles are currently listed."
            hint="We are not currently listing open positions. Follow Omnexa Labs for future opportunities."
          />
        ) : (
          <ul className={styles.roles} role="list">
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
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </main>
  );
}
