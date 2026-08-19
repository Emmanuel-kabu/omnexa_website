import { IntelligenceFieldStatic } from "./intelligence-field-static";

import styles from "./footer-field.module.css";

/**
 * The Intelligence Field, resolved: Stage 1 §29, Stage 3 §25.
 *
 * The same seeded field as the hero, evaluated near the end of its state
 * machine so it reads as organised structure rather than scattered potential.
 * Static only: this sits behind the footer, where continuous animation would
 * cost main-thread time for no narrative gain.
 */
export function FooterField() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <IntelligenceFieldStatic progress={0.94} nodeCount={54} />
    </div>
  );
}
