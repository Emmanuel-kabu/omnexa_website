import { labelSampleContent } from "@/lib/content-config";

import styles from "./sample-badge.module.css";

/**
 * Marks placeholder content in the interface.
 *
 * The content-integrity rules across Stage 3 §51, Stage 4 §101, Stage 5 §81
 * and Stage 6 §99 are not only about avoiding invented facts: they are about
 * not letting a visitor mistake something for a factual claim. Sample records
 * therefore carry a visible marker wherever they appear, so no publication,
 * experiment or profile can be read as real while placeholder content is
 * still in the repository.
 *
 * Renders nothing when the entity is real, so production is unaffected.
 */
export function SampleBadge({ sample }: { sample?: boolean }) {
  if (!sample || !labelSampleContent) return null;

  return (
    <span className={`omx-technical-sm ${styles.badge}`}>
      Sample
      <span className="omx-visually-hidden">
        {" "}
       : placeholder content, not a factual claim
      </span>
    </span>
  );
}
