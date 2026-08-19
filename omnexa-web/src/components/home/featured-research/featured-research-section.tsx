import { TextAction } from "@/components/actions/text-action";
import { ResearchId } from "@/components/brand/research-id";
import { SampleBadge } from "@/components/brand/sample-badge";
import { StatusLabel } from "@/components/brand/status-label";
import { SectionHeader } from "@/components/home/shared/section-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import type { FeaturedResearchItem } from "@/content/queries/get-home-page-content";
import type { ResearchArea } from "@/content/schemas/research";

import styles from "./featured-research-section.module.css";

/** Programs and projects live on different routes and read differently. */
function isProgram(item: FeaturedResearchItem): boolean {
  return "researchQuestions" in item;
}

function leadQuestion(item: FeaturedResearchItem): string {
  if ("researchQuestions" in item && item.researchQuestions.length > 0) {
    return item.researchQuestions[0].question;
  }
  if ("problem" in item) return item.problem;
  return item.summary;
}

/**
 * Section 04: Featured Research.
 * Stage 3 §17
 *
 * One to three items, editorial composition, and explicitly no carousel by
 * default. Nothing here reports a result or a metric: the lead line is the
 * research *question*, which is what makes the section credible without
 * inventing findings (§51).
 */
export function FeaturedResearchSection({
  items,
  areas,
  index,
}: {
  items: FeaturedResearchItem[];
  areas: ResearchArea[];
  index: string;
}) {
  // Stage 3 §49: a failed query omits the section rather than rendering an
  // empty frame.
  if (items.length === 0) return null;

  const areaTitle = (id: string) =>
    areas.find((area) => area.id === id)?.title ?? null;

  return (
    <Section id="featured-research" tone="light" density="editorial">
      <SectionHeader
        index={index}
        eyebrow="Featured"
        headingLines={["Research", "in motion."]}
        lede="Selected programs, experiments, and technical investigations from across the lab."
      />

      <ul className={styles.list} role="list">
        {items.map((item) => {
          const program = isProgram(item);
          const href = program
            ? `/research/programs/${item.slug}`
            : `/research/projects/${item.slug}`;
          const area = areaTitle(item.researchAreaId);

          return (
            <li key={item.id} className={styles.item}>
              <div className={styles.meta}>
                <div className={styles.metaGroup}>
                  <TechnicalLabel as="span" tone="muted">
                    Featured /
                  </TechnicalLabel>
                  <ResearchId id={item.id} tone="primary" />
                  <SampleBadge sample={item.sample} />
                </div>
                <StatusLabel status={item.status} format="prefixed" />
              </div>

              <div className={styles.body}>
                <h3 className={`omx-heading-1 ${styles.title}`}>
                  <a href={href} className={styles.titleLink}>
                    {item.title}
                  </a>
                </h3>

                <div className={styles.detail}>
                  <p className={`omx-body-lg ${styles.question}`}>
                    {leadQuestion(item)}
                  </p>

                  <dl className={styles.attributes}>
                    <div className={styles.attribute}>
                      <dt>
                        <TechnicalLabel as="span" tone="muted" size="sm">
                          Type
                        </TechnicalLabel>
                      </dt>
                      <dd className="omx-body-sm">
                        {program ? "Research program" : "Research project"}
                      </dd>
                    </div>

                    {area ? (
                      <div className={styles.attribute}>
                        <dt>
                          <TechnicalLabel as="span" tone="muted" size="sm">
                            Area
                          </TechnicalLabel>
                        </dt>
                        <dd className="omx-body-sm">{area}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <TextAction href={href}>
                    {program ? "Explore program" : "Explore project"}
                  </TextAction>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
