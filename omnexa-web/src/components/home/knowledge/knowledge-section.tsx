import { TextAction } from "@/components/actions/text-action";
import { ResearchId } from "@/components/brand/research-id";
import { SampleBadge } from "@/components/brand/sample-badge";
import { OutcomeLabel, StatusLabel } from "@/components/brand/status-label";
import { SectionHeader } from "@/components/home/shared/section-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import type { KnowledgeItem } from "@/content/queries/get-home-page-content";
import { formatDateTechnical } from "@/lib/format";

import styles from "./knowledge-section.module.css";

const PUBLICATION_TYPE_LABELS: Record<string, string> = {
  paper: "Paper",
  "technical-report": "Technical report",
  whitepaper: "Whitepaper",
  "dataset-paper": "Dataset paper",
  benchmark: "Benchmark",
  "research-brief": "Research brief",
};

function itemHref(item: KnowledgeItem): string {
  return item.kind === "publication"
    ? `/research/publications/${item.entity.slug}`
    : `/research/experiments/${item.entity.slug}`;
}

function itemType(item: KnowledgeItem): string {
  return item.kind === "publication"
    ? (PUBLICATION_TYPE_LABELS[item.entity.publicationType] ?? "Publication")
    : "Experiment";
}

function itemDate(item: KnowledgeItem): string | null {
  if (item.kind === "publication") {
    return formatDateTechnical(item.entity.publishedAt);
  }
  return item.entity.startedAt
    ? formatDateTechnical(item.entity.startedAt)
    : null;
}

/**
 * Section 08: Publications + Experiments.
 * Stage 3 §21
 *
 * "One large leading item, 2-4 compact supporting items": explicitly not a
 * generic blog-card grid. Every row states its content type, because a
 * publication and an experiment are different kinds of claim and the visitor
 * needs to know which they are looking at (Stage 2 §2.3).
 *
 * Experiments show BOTH their research status and their outcome, since Stage 4
 * §48 keeps those separate, and an inconclusive result stays visible rather
 * than being quietly filtered out.
 */
export function KnowledgeSection({
  items,
  index,
}: {
  items: KnowledgeItem[];
  index: string;
}) {
  const [lead, ...rest] = items;

  return (
    <Section id="knowledge" tone="light" density="editorial">
      <SectionHeader
        index={index}
        eyebrow="Publications + experiments"
        headingLines={["From the", "lab."]}
        lede="Publications, experiments, technical reports, and research artifacts from ongoing work across Omnexa Labs."
      />

      {items.length === 0 ? (
        /* Stage 2 §65: an intentional empty state, not a blank region */
        <p className={`omx-body-lg ${styles.empty}`}>
          No public publications or experiments are currently listed.
        </p>
      ) : (
        <div className={styles.feed}>
          {lead ? (
            <article className={styles.lead}>
              <div className={styles.leadMeta}>
                <div className={styles.metaGroup}>
                  <TechnicalLabel as="span" tone="accent">
                    {itemType(lead)}
                  </TechnicalLabel>
                  <span className={styles.metaDivider} aria-hidden="true" />
                  <ResearchId id={lead.entity.id} />
                  <SampleBadge sample={lead.entity.sample} />
                </div>

                {itemDate(lead) ? (
                  <TechnicalLabel as="span">{itemDate(lead)}</TechnicalLabel>
                ) : null}
              </div>

              <h3 className={`omx-heading-2 ${styles.leadTitle}`}>
                <a href={itemHref(lead)} className={styles.link}>
                  {lead.entity.title}
                </a>
              </h3>

              <p className={`omx-body-lg ${styles.leadAbstract}`}>
                {lead.kind === "publication"
                  ? lead.entity.abstract
                  : lead.entity.objective}
              </p>

              <div className={styles.leadFooter}>
                <TextAction href={itemHref(lead)}>
                  {lead.kind === "publication"
                    ? "Read publication"
                    : "View experiment"}
                </TextAction>

                {lead.kind === "experiment" ? (
                  <div className={styles.statusPair}>
                    <StatusLabel
                      status={lead.entity.researchStatus}
                      format="prefixed"
                    />
                    {lead.entity.outcomeStatus ? (
                      <OutcomeLabel outcome={lead.entity.outcomeStatus} />
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <ul className={styles.supporting} role="list">
              {rest.map((item) => (
                <li key={item.entity.id} className={styles.row}>
                  <div className={styles.rowMeta}>
                    <TechnicalLabel as="span" tone="secondary">
                      {itemType(item)}
                    </TechnicalLabel>
                    <ResearchId id={item.entity.id} />
                    <SampleBadge sample={item.entity.sample} />
                  </div>

                  <h3 className={`omx-heading-4 ${styles.rowTitle}`}>
                    <a href={itemHref(item)} className={styles.link}>
                      {item.entity.title}
                    </a>
                  </h3>

                  <div className={styles.rowFooter}>
                    {itemDate(item) ? (
                      <TechnicalLabel as="span" size="sm">
                        {itemDate(item)}
                      </TechnicalLabel>
                    ) : (
                      <span />
                    )}

                    {item.kind === "experiment" && item.entity.outcomeStatus ? (
                      <OutcomeLabel outcome={item.entity.outcomeStatus} />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      <div className={styles.actions}>
        <TextAction href="/research/publications">
          Explore publications
        </TextAction>
        <TextAction href="/research/archive">View research archive</TextAction>
      </div>
    </Section>
  );
}
