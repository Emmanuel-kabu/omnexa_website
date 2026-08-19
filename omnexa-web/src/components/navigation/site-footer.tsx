import Link from "next/link";

import { CoordinateLabel } from "@/components/brand/coordinate-label";
import { DisplayHeading } from "@/components/typography/display-heading";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { FooterField } from "@/components/visualizations/footer-field";
import { menuSections, site, socialLinks } from "@/lib/site";

import styles from "./site-footer.module.css";

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * The footer manifesto: Stage 1 §29, Stage 3 §25.
 *
 * Deliberately an ending rather than a column dump. The Intelligence Field
 * returns here in a resolved, organised state, closing the narrative the hero
 * opens:
 *
 *     Hero   → unstructured potential
 *     Footer → organised intelligence
 *
 * Rendered on the inverse surface so the page finishes at the same depth the
 * ResearchOS section introduced.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer} data-tone="dark">
      <FooterField />

      <div className={styles.inner}>
        <DisplayHeading
          as="p"
          size="display-2"
          lines={["We're building", "what comes next."]}
          accentTerminal
          className={styles.manifesto}
        />

        <div className={styles.directory}>
          {menuSections.map((section) => (
            <nav
              key={section.href}
              className={styles.column}
              aria-label={section.label}
            >
              {/* The heading is the link to the section itself, matching the
                  mega menu. Without this the footer could only reach a section
                  through its children. */}
              <TechnicalLabel as="h2" className={styles.columnTitle}>
                <Link href={section.href} className={styles.columnTitleLink}>
                  {section.label}
                </Link>
              </TechnicalLabel>
              <ul className={styles.columnLinks} role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.meta}>
          <div className={styles.metaBlock}>
            <TechnicalLabel as="span" tone="secondary">
              {site.name}
            </TechnicalLabel>
            <CoordinateLabel />
          </div>

          {/* Rendered only when a verified profile exists: Stage 6 §99 */}
          {socialLinks.length > 0 ? (
            <ul className={styles.social} role="list">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <span className="omx-visually-hidden">
                      {" "}
                      (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <div className={styles.legal}>
            <ul className={styles.legalLinks} role="list">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    <TechnicalLabel as="span">{link.label}</TechnicalLabel>
                  </Link>
                </li>
              ))}
            </ul>
            <TechnicalLabel as="p" size="sm">
              © {site.founded} {site.name}
            </TechnicalLabel>
          </div>
        </div>
      </div>
    </footer>
  );
}
