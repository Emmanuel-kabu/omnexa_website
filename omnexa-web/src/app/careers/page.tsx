import type { Metadata } from "next";

import { TextAction } from "@/components/actions/text-action";
import { SampleBadge } from "@/components/brand/sample-badge";
import { EmptyState } from "@/components/discovery/entity-row";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { jobsRepository } from "@/content/repositories";

import route from "@/styles/route.module.css";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Omnexa Labs to work on machine intelligence, autonomous systems, research infrastructure, software engineering, healthcare AI, and the systems that connect them.",
  alternates: { canonical: "/careers" },
};

/** Stage 6 §31: technical substance, not perks. */
const WHY_JOIN = [
  { title: "Important technical problems", detail: "Work on questions that stay hard after the demo." },
  { title: "Research ownership", detail: "Own a question end to end, including the negative results." },
  { title: "Engineering depth", detail: "Systems that have to run, not prototypes that have to demo." },
  { title: "Cross-disciplinary work", detail: "Research and engineering sit in the same loop here." },
  { title: "High agency", detail: "Decide what to investigate next, and defend the choice." },
  { title: "Long-term growth", detail: "Compounding knowledge over short product cycles." },
];

/** Stage 6 §39: only steps that actually exist. */
const HIRING_PROCESS = [
  "Application",
  "Technical conversation",
  "Practical evaluation",
  "Team discussion",
  "Final decision",
];

export default async function CareersPage() {
  const openRoles = await jobsRepository.getOpenRoles();

  return (
    <main id="main">
      <PageHeader
        eyebrow="Careers / OMX"
        headingLines={["Build", "what comes", "next."]}
        size="display-2"
        lede="Join Omnexa Labs to work on machine intelligence, autonomous systems, research infrastructure, software engineering, healthcare AI, and the systems that connect them."
      />

      <Section tone="light" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Why join</h2>
        <ul className={styles.reasons} role="list">
          {WHY_JOIN.map((reason) => (
            <li key={reason.title} className={styles.reason}>
              <h3 className="omx-heading-4">{reason.title}</h3>
              <p className={`omx-body-sm ${styles.reasonDetail}`}>
                {reason.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle" density="editorial">
        <h2 className={`omx-heading-1 ${route.sectionTitle}`}>Open roles</h2>

        {openRoles.length === 0 ? (
          /* Stage 6 §40: no manufactured roles to look active */
          <EmptyState
            message="No open roles are currently listed."
            hint="We are not currently listing open positions. Follow Omnexa Labs for future opportunities."
          />
        ) : (
          <ul className={styles.roles} role="list">
            {openRoles.map((role) => (
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

        <div className={route.actions} style={{ marginTop: "var(--omx-space-10)" }}>
          <TextAction href="/careers/open-roles">All open roles</TextAction>
          <TextAction href="/careers/culture">Life at Omnexa</TextAction>
        </div>
      </Section>

      <Section tone="light" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Environments
            </TechnicalLabel>
            <ul className={route.list}>
              <li>
                <a href="/careers/research" className="omx-body" data-underline>
                  Research at Omnexa →
                </a>
              </li>
              <li>
                <a href="/careers/engineering" className="omx-body" data-underline>
                  Engineering at Omnexa →
                </a>
              </li>
            </ul>
          </div>

          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Hiring process
            </TechnicalLabel>
            <ol className={route.list}>
              {HIRING_PROCESS.map((step, index) => (
                <li key={step} className={route.listItem}>
                  <TechnicalLabel as="span" tone="muted" size="sm">
                    {String(index + 1).padStart(2, "0")}
                  </TechnicalLabel>
                  <span className="omx-body">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </main>
  );
}
