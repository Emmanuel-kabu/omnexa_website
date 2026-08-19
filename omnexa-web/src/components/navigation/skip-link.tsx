import styles from "./skip-link.module.css";

/**
 * Skip navigation: Stage 2 §80, Stage 3 §38.
 *
 * A plain anchor with no JavaScript, rendered first in the body so it is the
 * very first thing a keyboard or screen-reader user reaches. Visually hidden
 * until focused, then it becomes a real, visible control.
 */
export function SkipLink() {
  return (
    <a href="#main" className={styles.skip}>
      Skip to content
    </a>
  );
}
