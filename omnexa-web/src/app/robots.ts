import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Robots: Stage 2 §62, Stage 7 §71.
 *
 * Public institutional content is indexable. Preview, API and the
 * query-parameterised search results are not.
 *
 * Note that this is a crawling directive, not a security control: Stage 7 §71
 * is explicit that robots.txt must never be relied on to protect private data.
 * That boundary is enforced in the repository layer instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/search", "/preview"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
