"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

import { CoordinateLabel } from "@/components/brand/coordinate-label";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { menuSections, utilityLinks } from "@/lib/site";

import styles from "./mega-menu.module.css";

export type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * The full-screen information layer: Stage 1 §16.3, Stage 2 §5.
 *
 * This is the mobile navigation as well as the desktop expanded menu: Stage 2
 * §57 requires mobile to preserve the same hierarchy while changing
 * presentation, so rather than maintaining two divergent menus, one component
 * re-composes from a single column on phones to a five-column index on
 * desktop. It is explicitly *not* the desktop mega menu shrunk down: the
 * numbering, type scale and grouping are all re-laid out per breakpoint.
 */
export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);

  useFocusTrap(panelRef, open, handleEscape);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      className={styles.overlay}
      data-open={open || undefined}
      // Hidden from the a11y tree and from tab order when closed. `inert`
      // is the reliable part; `aria-hidden` covers older engines.
      inert={!open}
      aria-hidden={!open}
      data-tone="dark"
    >
      <div className={styles.inner}>
        <nav className={styles.sections} aria-label="All sections">
          {menuSections.map((section) => (
            <div key={section.href} className={styles.section}>
              <TechnicalLabel as="span" className={styles.sectionIndex}>
                {section.index}
              </TechnicalLabel>

              <Link href={section.href} className={styles.sectionTitle}>
                {section.label}
              </Link>

              <ul className={styles.links} role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          <ul className={styles.utility} role="list">
            {utilityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.utilityLink}>
                  <TechnicalLabel as="span">{link.label}</TechnicalLabel>
                </Link>
              </li>
            ))}
          </ul>

          <CoordinateLabel />
        </div>
      </div>
    </div>
  );
}
