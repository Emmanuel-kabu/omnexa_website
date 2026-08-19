import { TextAction } from "@/components/actions/text-action";
import { SampleBadge } from "@/components/brand/sample-badge";
import { SectionHeader } from "@/components/home/shared/section-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import type { Insight } from "@/content/schemas/editorial";
import { formatDateTechnical } from "@/lib/format";

import styles from "./insights-section.module.css";

const TYPE_LABELS: Record<Insight["type"], string> = {
  "research-note": "Research note",
  engineering: "Engineering",
  perspective: "Perspective",
  news: "News",
};

/**
 * Section 09: Insights.
 * Stage 3 §22
 *
 * Three to four entries, editorial rows rather than a three-column blog card
 * grid (Stage 6 §44, §98). The content type leads each row because a research
 * note and a perspective carry very different epistemic weight, and the
 * visitor is entitled to know which one they are reading before they click.
 */
export function InsightsSection({
  items,
  index,
}: {
  items: Insight[];
  index: string;
}) {
  if (items.length === 0) return null;

  return (
    <Section id="insights" tone="subtle" density="editorial">
      <SectionHeader
        index={index}
        eyebrow="Insights"
        headingLines={["Notes,", "systems,", "ideas."]}
        lede="Notes from the work itself: research observations, engineering architecture, technical decisions, and perspectives on where intelligent systems are heading."
      />

      <ul className={styles.list} role="list">
        {items.map((insight) => (
          <li key={insight.id} className={styles.item}>
            <a
              href={`/insights/${insight.slug}`}
              className={styles.itemLink}
            >
              <div className={styles.itemType}>
                <TechnicalLabel as="span" tone="secondary">
                  {TYPE_LABELS[insight.type]}
                </TechnicalLabel>
                <SampleBadge sample={insight.sample} />
              </div>

              <div className={styles.itemBody}>
                <h3 className={`omx-heading-3 ${styles.itemTitle}`}>
                  {insight.title}
                </h3>
                <p className={`omx-body ${styles.itemExcerpt}`}>
                  {insight.excerpt}
                </p>
              </div>

              <div className={styles.itemMeta}>
                <TechnicalLabel as="span" size="sm">
                  <time dateTime={insight.publishedAt}>
                    {formatDateTechnical(insight.publishedAt)}
                  </time>
                </TechnicalLabel>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <TextAction href="/insights">Explore insights</TextAction>
      </div>
    </Section>
  );
}
