import type { Metadata } from "next";

import { TextAction } from "@/components/actions/text-action";
import { CoordinateLabel } from "@/components/brand/coordinate-label";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { systemsRepository } from "@/content/repositories";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Omnexa Labs advances AI through research and applied engineering across machine intelligence, autonomous systems, computational discovery, software, healthcare, and research infrastructure.",
  alternates: { canonical: "/company/about" },
};

/**
 * About: Stage 6 §18-22.
 *
 * Explains Omnexa as an organisation without repeating the mission page.
 * Note the absence of a "Our story" timeline: Stage 6 §96 rejects one without
 * real events, and §99 forbids inventing founding dates or history.
 */
export default async function AboutPage() {
  const systems = await systemsRepository.getAll();

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Company", href: "/company" }, { label: "About" }]}
        headingLines={["Omnexa", "Labs."]}
        lede="Omnexa Labs advances AI through research and applied engineering across machine intelligence, autonomous systems, computational discovery, software, healthcare, and research infrastructure."
      />

      <Section tone="light" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              What we research
            </TechnicalLabel>
            <p className="omx-body" style={{ color: "var(--text-secondary)" }}>
              Four research areas, from developmental intelligence and
              foundation models through computational discovery and AI for
              software systems.
            </p>
            <div className={route.actions}>
              <TextAction href="/research/areas">Research areas</TextAction>
            </div>
          </div>

          {/* Engineered systems when published; otherwise the engineering
              practice, which is what the lab can actually point at today. */}
          {systems.length > 0 ? (
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Systems
            </TechnicalLabel>
            <ul className={route.list}>
              {systems.map((system) => (
                <li key={system.id}>
                  <a
                    href={`/systems/${system.slug}`}
                    className="omx-body"
                    data-underline
                  >
                    {system.index} · {system.title}
                  </a>
                  <span
                    className="omx-body-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {" "}
                    · {system.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <div className={route.stackTight}>
              <TechnicalLabel as="h2" tone="secondary">
                Applied engineering
              </TechnicalLabel>
              <p className="omx-body" style={{ color: "var(--text-secondary)" }}>
                Omnexa engineers research into systems that operate reliably and
                can be evaluated. Engineered systems are in development and are
                published once there is something substantiated to show.
              </p>
              <div className={route.actions}>
                <TextAction href="/engineering">
                  The engineering practice
                </TextAction>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section tone="subtle" density="editorial">
        <div className={route.grid2}>
          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Location
            </TechnicalLabel>
            <CoordinateLabel />
          </div>

          <div className={route.stackTight}>
            <TechnicalLabel as="h2" tone="secondary">
              Current stage
            </TechnicalLabel>
            <p className="omx-body" style={{ color: "var(--text-secondary)" }}>
              Omnexa Labs is an early-stage research and engineering
              organisation. Research programs and systems are in active
              development; details are published here as they become
              substantiated.
            </p>
            <div className={route.actions}>
              <TextAction href="/company/contact">Contact Omnexa</TextAction>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
