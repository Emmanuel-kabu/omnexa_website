"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Wordmark } from "@/components/brand/wordmark";
import { useHeaderState } from "@/hooks/use-header-state";
import { primaryNavigation } from "@/lib/site";

import { MegaMenu } from "./mega-menu";
import styles from "./site-header.module.css";

/**
 * The global header: Stage 1 §16, Stage 3 §6.
 *
 * Progressive enhancement: the wordmark and every primary navigation link are
 * ordinary anchors that work with JavaScript disabled. Only the expanded menu
 * depends on the client runtime, and it is purely additive, since all of its
 * destinations are also reachable from the section landing pages
 * (Stage 1 §39.14).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { scrolled, tone } = useHeaderState();

  /**
   * The menu's open state is stored as "which route was it opened on", so
   * navigating anywhere closes it as a matter of derivation rather than via an
   * effect that fires after the new page has already painted with the overlay
   * still up.
   */
  const [openedOnPath, setOpenedOnPath] = useState<string | null>(null);
  const menuOpen = openedOnPath === pathname;

  const toggleMenu = () => setOpenedOnPath(menuOpen ? null : pathname);
  const closeMenu = () => setOpenedOnPath(null);

  return (
    <>
      <header
        className={styles.header}
        data-tone={tone}
        data-scrolled={scrolled || undefined}
        data-menu-open={menuOpen || undefined}
      >
        <div className={styles.inner}>
          <Wordmark />

          <nav className={styles.primary} aria-label="Primary">
            <ul className={styles.navList} role="list">
              {primaryNavigation.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`omx-navigation ${styles.navLink}`}
                      // Stage 2 §85: the header knows the active section
                      aria-current={active ? "page" : undefined}
                      data-active={active || undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.utility}>
            <Link href="/search" className={`omx-navigation ${styles.navLink}`}>
              Search
            </Link>

            <button
              type="button"
              className={`omx-navigation ${styles.menuTrigger}`}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={toggleMenu}
            >
              <span className={styles.menuLabel}>
                {menuOpen ? "Close" : "Menu"}
              </span>
              <span className={styles.menuGlyph} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MegaMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
