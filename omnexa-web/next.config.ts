import type { NextConfig } from "next";

/**
 * Security headers: Stage 7 §60, CSP: Stage 7 §61.
 *
 * The spec requires the policy to reflect real asset and script providers, and
 * forbids reaching for `unsafe-inline` merely to make integration easier. So the
 * directives below were derived from an inventory of the built output rather
 * than copied from a template. As of this writing that output contains:
 *
 *   - stylesheets  3 files, all /_next/static/chunks/*.css
 *   - fonts        3 files, all /_next/static/media/*.woff2 (vendored, no CDN)
 *   - scripts      chunk files under /_next/static/chunks, plus 4 to 9 inline
 *                  blocks per page carrying the React flight payload
 *                  (self.__next_f.push) and one application/ld+json block
 *   - images       none. no <img>, no next/image, no data: URIs
 *   - frames       none. no <iframe>
 *   - workers      none. no new Worker
 *   - connections  same-origin only. no fetch() in application code
 *
 * There is no third-party origin anywhere in the site, which is what allows
 * `default-src 'self'` to stand as a real floor rather than a decoration.
 *
 * CSP_MODE controls enforcement. It ships enforcing; CSP_MODE=report emits
 * Content-Security-Policy-Report-Only instead, which is how the directive list
 * gets validated against a real browser after any change to what the site
 * loads. scripts/csp-audit.mjs drives that check.
 *
 * CSP_MODE is a BUILD-time variable, not a runtime one. Next compiles the
 * result of headers() into .next/routes-manifest.json, so setting it only on
 * `next start` has no effect; the value baked at build time is what ships. Use
 * `CSP_MODE=report npx next build` when you need report-only.
 */

/**
 * Inline scripts are a structural property of the App Router, not a shortcut.
 *
 * Next streams the RSC payload as a sequence of inline `self.__next_f.push(...)`
 * blocks whose contents differ per page and per build, so a hash allowlist is
 * not maintainable. The alternative, a per-request nonce issued from
 * middleware, forces every route to render dynamically and would give up the
 * static generation this site depends on, regressing LCP, which is already the
 * weakest metric in the Lighthouse profile.
 *
 * So this is a deliberate, documented trade rather than convenience: hydration
 * needs inline script execution, and everything else is held closed. Note what
 * this does NOT concede: no external script origin is permitted, `object-src`
 * and `base-uri` are locked, so an injected `<base>` or plugin cannot redirect
 * relative script URLs.
 *
 * This was measured, not assumed. Building with `script-src 'self'` alone and
 * running scripts/csp-audit.mjs reports script-src-elem blocking inline script
 * on 17 of 17 audited pages, i.e. the entire site fails to hydrate.
 */
const SCRIPT_INLINE = "'unsafe-inline'";

const CSP_DIRECTIVES: Record<string, string[]> = {
  // Anything not named below falls back to same-origin only.
  "default-src": ["'self'"],

  // Chunk files plus the inline flight payload. See SCRIPT_INLINE above.
  "script-src": ["'self'", SCRIPT_INLINE],

  /**
   * All CSS arrives as linked chunk files, so stylesheet elements need nothing
   * beyond 'self'. That is the directive that matters: it means an injected
   * `<style>` or `<link>` cannot introduce rules, and it is measured clean.
   *
   * style-src-attr governs inline style attributes, which the audit finds on 6
   * of 17 pages. It is open, for one reason that cannot be refactored away:
   * app/global-error.tsx replaces the entire document when the root layout has
   * itself failed, so it cannot depend on a stylesheet having loaded, and its
   * styles are inline by necessity. Closing this would leave the catastrophic
   * error page unstyled.
   *
   * Being honest about what this concedes: very little, here. Injecting a style
   * attribute requires HTML injection, and script-src already permits inline
   * script, so an attacker able to inject markup would inject a `<script>`
   * rather than a style attribute. There is also no exfiltration path, since
   * default-src and img-src confine every fetch to this origin. The directive
   * worth hardening is script-src, not this one.
   *
   * The three directives are layered deliberately and style-src does NOT defeat
   * style-src-elem. Where the granular directives are supported they win
   * outright, so stylesheet elements stay restricted to 'self' and only
   * attributes are permitted inline. style-src is the fallback consulted by
   * clients too old to implement -elem/-attr, and it has to carry
   * 'unsafe-inline' for the global-error case to remain styled on those.
   */
  "style-src": ["'self'", "'unsafe-inline'"],
  "style-src-elem": ["'self'"],
  "style-src-attr": ["'unsafe-inline'"],

  // Vendored woff2 under /_next/static/media. No font CDN is contacted, which
  // is also what keeps the build hermetic.
  "font-src": ["'self'"],

  // No raster images ship today. `data:` is permitted because inline SVG and
  // favicons are cheap to express that way and it grants no network reach.
  "img-src": ["'self'", "data:"],

  // Client-side route transitions fetch RSC payloads from the same origin.
  "connect-src": ["'self'"],

  // Nothing is embedded, embeds nothing, and spawns nothing.
  "frame-src": ["'none'"],
  "worker-src": ["'none'"],
  "object-src": ["'none'"],
  "media-src": ["'none'"],
  "manifest-src": ["'self'"],

  // Blocks an injected <base> from re-pointing every relative URL on the page.
  "base-uri": ["'self'"],

  // No form posts to third parties. The contact route has no action endpoint.
  "form-action": ["'self'"],

  // The modern replacement for X-Frame-Options; both are sent, since the legacy
  // header still covers clients that predate frame-ancestors.
  "frame-ancestors": ["'none'"],
};

function buildCsp(): string {
  const policy = Object.entries(CSP_DIRECTIVES)
    .map(([directive, values]) => `${directive} ${values.join(" ")}`)
    .join("; ");

  // upgrade-insecure-requests is valueless, so it is appended rather than
  // mapped. It is a no-op in local http development and matters in production.
  return `${policy}; upgrade-insecure-requests`;
}

const cspHeaderName =
  process.env.CSP_MODE === "report"
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";

const securityHeaders = [
  {
    key: cspHeaderName,
    value: buildCsp(),
  },
  /**
   * Two years, subdomains included, preload-eligible. This is only honoured
   * over https, so it has no effect on local development. Deliberately set
   * here rather than left to the host, so the policy is versioned with the
   * code that depends on it.
   */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Stops a response being reinterpreted as a type it did not declare, which is
  // what turns an upload or a text response into script execution.
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Send the full URL within the origin, only the origin cross-origin, and
  // nothing when downgrading to http.
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  /**
   * Denies the powerful features outright rather than leaving them at the
   * browser default. The site uses none of them; naming them means a future
   * dependency cannot quietly start using one.
   */
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  // Legacy counterpart to frame-ancestors 'none', for older clients.
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Opts out of implicit prefetch lookups to origins the page never contacts.
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  // Isolates this browsing context group from cross-origin openers.
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  // Requires cross-origin subresources to opt in. Safe here, because every
  // subresource is same-origin.
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  // Suppresses the framework version banner in responses.
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Every route, including static assets and the RSC payload requests.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
