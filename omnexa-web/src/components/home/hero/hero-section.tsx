import { TextAction } from "@/components/actions/text-action";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { IntelligenceField } from "@/components/visualizations/intelligence-field";
import { IntelligenceFieldStatic } from "@/components/visualizations/intelligence-field-static";
import { site } from "@/lib/site";

import styles from "./hero-section.module.css";

/**
 * Section 01: Hero.
 * Stage 3 §7-9, §13
 *
 * A server component. The headline, supporting copy, both actions and the
 * static field all arrive in the initial HTML, so the hero is complete before
 * any JavaScript runs, which is what makes the LCP target achievable and
 * satisfies "hero copy renders before advanced visualization" (Stage 3 §57).
 *
 * `IntelligenceField` is the only client boundary, and it receives the static
 * SVG as children so that fallback stays server-rendered.
 *
 * Exactly two calls to action, per Stage 3 §7.
 */
export function HeroSection() {
  return (
    <section id="hero" className={styles.hero} data-tone="light">
      <div className={styles.field}>
        <IntelligenceField>
          {/*
            Sits at S1/CONNECT rather than S0/LATENT. Pure latency renders as
            unconnected dots, which reads as the "random particles with no
            meaning" Stage 3 §10 rejects, and the hero sketch in Stage 1 §37
            shows bonded nodes. A little structure has to be visible for the
            field to look like a field.
          */}
          <IntelligenceFieldStatic progress={0.34} nodeCount={64} />
        </IntelligenceField>
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <DisplayHeading
            as="h1"
            size="display-1"
            lines={["Advancing", "Intelligence."]}
            accentTerminal
            className={styles.headline}
          />

          <p className={`omx-body-lg ${styles.lede}`}>
            {site.name} is an AI research and engineering lab developing
            intelligent systems that learn, reason, build, and discover.
          </p>

          <div className={styles.actions}>
            <TextAction href="/research" variant="primary">
              Explore research
            </TextAction>
            {/*
              Stage 3 §7 allows exactly two calls to action, and they carry the
              two halves of the mission: research and applied engineering. That
              pairing holds whether or not any individual system is published,
              so engineering is the permanent second destination.
            */}
            <TextAction href="/engineering" variant="secondary">
              Applied engineering
            </TextAction>
          </div>
        </div>
      </div>

      <div className={styles.footerLine}>
        <div className={styles.footerInner}>
          <TechnicalLabel as="span">
            OMX / {site.founded}
          </TechnicalLabel>
          <TechnicalLabel as="span">{site.location.short}</TechnicalLabel>
        </div>
      </div>
    </section>
  );
}
