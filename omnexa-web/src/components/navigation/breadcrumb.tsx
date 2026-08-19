import Link from "next/link";

import { site } from "@/lib/site";

import styles from "./breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Breadcrumbs: Stage 2 §40, §80.
 *
 * Used on deep pages only, never on the homepage or major landing pages. The
 * trail is emitted twice on purpose: once as a navigation landmark for people,
 * and once as `BreadcrumbList` JSON-LD for machines (§40 requires both).
 *
 * The current page is the last item and carries no link: `aria-current="page"`
 * marks it rather than styling alone.
 */
export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className={styles.item}>
                {item.href && !isLast ? (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}

                {!isLast ? (
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
