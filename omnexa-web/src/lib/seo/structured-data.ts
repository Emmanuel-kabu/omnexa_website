import { site } from "@/lib/site";

/**
 * Schema.org structured data.
 * Stage 3 §47, Stage 7 §73
 *
 * "Only include structured data that accurately reflects real content." So
 * these builders emit a deliberately small graph:
 *
 *   · no `foundingDate`, `numberOfEmployees`, `award` or `funding`: Stage 6
 *     §99 forbids inventing any of them
 *   · no `sameAs` array, because no social profile has been verified yet
 *   · `SearchAction` is emitted because /search genuinely exists
 *
 * Every field below is traceable to real site content or the specification.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.country,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Serialises a JSON-LD graph for embedding.
 *
 * `<` is escaped so a stray character in content can never close the script
 * element early: the standard XSS vector for inline JSON-LD.
 */
export function jsonLd(...schemas: Array<Record<string, unknown>>): string {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas).replace(
    /</g,
    "\\u003c",
  );
}
