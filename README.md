# Omnexa Labs

Institutional website for Omnexa Labs, an AI research and applied engineering lab.

```
omnexa_website/
├─ omnexa-web/                  the Next.js 16 application
└─ omnexa_labs_stage_*.md       the 7 Stage specifications this is built to
```

The Stage documents are the source of truth for the design system, information
architecture and content rules. Code comments cite them by section (for example
`Stage 1 §32.1`) so a decision can always be traced back to its origin.

## Running it

```bash
cd omnexa-web
npm ci
npm run dev          # http://localhost:3000
```

Fonts are vendored in `src/fonts`, so the build never contacts a font CDN and
works offline or behind a restrictive proxy.

## Verification

```bash
npm run verify              # everything CI runs, in order
npm run audit:a11y          # axe-core, WCAG 2.2 AA, 12 pages
npm run audit:interaction   # keyboard, focus, touch targets, overflow, motion, scheme
npm run audit:csp           # security headers on the wire + real CSP violations
npm run audit:links         # crawls the served site; every internal link must resolve
```

`verify` runs seven stages in order — typecheck → lint → production build →
accessibility → interaction → CSP → links — and exits non-zero on any failure.
The audits need a production build, since dev-mode timings and bundles are not
representative. CI runs the same pipeline on every pull request.

Current state: **0 axe violations** across 12 pages, **23 interaction checks
passing**, **0 CSP violations** across 17 pages, **31 internal routes with no broken links**, and Lighthouse at **93 / 100 /
100 / 100**.

Performance is gated at 85. It was advisory for a long time because local scores
swung 74–87, but that was a workstation artefact: two CI runs both scored 93 with
LCP agreeing to within 0.2% (3164.5ms vs 3163.4ms) despite the runners differing
about 6% in CPU benchmark. Trust CI numbers over local ones. The threshold sits
well below the observed score deliberately, since two samples is a thin basis for
a tight gate and TBT/TTI did move about 9% between runs.

LCP, at 3.2s against a perfect 1.1s FCP, is the one weak metric. The largest
element is the hero lede paragraph, so nothing heavy blocks it; the cost is
render-blocking CSS (119 KB raw across 3 files) and framework JavaScript. Note
that a `browserslist` narrowing was tried against the "legacy JavaScript"
Lighthouse reports and produced a byte-identical bundle, because that code is in
prebuilt framework packages Next does not retranspile.

## Configuration

All flags are read in `src/lib/content-config.ts` and `src/lib/site.ts`.

| Variable | Default | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://omnexalabs.com` | Canonical URLs, sitemap, structured data |
| `NEXT_PUBLIC_CONTACT_EMAIL` | unset | Activates the contact channels. While unset, `/company/contact` says so plainly rather than showing a form that discards input |
| `NEXT_PUBLIC_PUBLISH_SYSTEMS` | `false` | Publishes Cadence / MedApp / ResearchOS. While off they are absent from navigation, the homepage, search and the sitemap, and `/systems` returns 404 |
| `NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS` | `false` | Publishes research **output**: programs, projects, experiments, publications and the research-note insight category. See below |
| `NEXT_PUBLIC_INCLUDE_SAMPLE_CONTENT` | `true` | Set `false` to strip every entity marked `sample: true` from all indexes, feeds and the sitemap |

### Research direction vs research output

The research is under way and results are not expected soon, so
`NEXT_PUBLIC_PUBLISH_RESEARCH_OUTPUTS` is off and every research **output** is
withheld. Each of those six records is `sample: true`, meaning a visitor would
otherwise read invented findings and publication records as claims the lab is
making.

The four **research areas** are real and stay published, as does the operating
model. That line is the whole point: a lab that states what it is investigating
but has not yet published results is being accurate, whereas one listing
fabricated publications is not. The research half of the mission rests on
direction, not on output that does not exist.

Two dependent surfaces stand down with the output, because both become
meaningless without it rather than merely shorter: `/research/archive`, whose
entries are drawn exclusively from those four types, and the research atlas,
which visualises the area→programme→publication graph and would otherwise render
four childless nodes. Removing the atlas also resolved a standing
information-architecture defect, since it and the areas list below it were two
presentations of the same four areas stacked back to back.

## Architecture

`routes → queries → repositories → adapters → data`

The content layer is the part worth understanding first. Visibility is enforced
in the repositories, once, so routes, the sitemap and the search index cannot
disagree about what is public. `src/content/adapters` is the only place that
knows content currently lives in TypeScript files; it is marked `server-only`,
which turns a content leak into a build failure rather than a shipped bundle.

Design tokens flow primitives → semantic → components. Components consume only
semantic tokens, which is what lets a region opt into a dark tone with
`data-tone="dark"` and what makes the OS colour-scheme support work without
touching a component.

## Security headers

Defined in `omnexa-web/next.config.ts` and versioned with the code that depends
on them, rather than configured at the host. `npm run audit:csp` asserts they are
actually on the wire and drives a real browser to find what the policy refuses.

The policy was derived from an inventory of the built output, not copied: there is
**no third-party origin anywhere in the site**, fonts included, which is what lets
`default-src 'self'` be a real floor. `frame-ancestors`, `frame-src`,
`worker-src`, `object-src` and `media-src` are all `'none'`; `base-uri` and
`form-action` are `'self'`. Alongside CSP: HSTS (2 years, preload-eligible),
`nosniff`, `strict-origin-when-cross-origin`, COOP/CORP, `X-Frame-Options: DENY`
for pre-`frame-ancestors` clients, and `poweredByHeader: false`.

Two directives are deliberately open, and the reasoning is worth reading before
changing either:

- **`script-src 'unsafe-inline'`** is required, not convenient. Next streams the
  RSC payload as inline `self.__next_f.push(...)` blocks that differ per page and
  per build, so hashes are unmaintainable. Building without it makes
  `script-src-elem` block inline script on **17 of 17 audited pages**, i.e. the
  site does not hydrate. The alternative is a per-request nonce from middleware,
  which forces every route to render dynamically and would regress LCP, already
  the weakest metric. **This is the one directive where real hardening remains
  available**, at that cost.
- **`style-src-attr 'unsafe-inline'`** exists because `app/global-error.tsx`
  replaces the whole document when the root layout has failed and so cannot
  depend on a stylesheet having loaded. Note that `style-src-elem` stays at
  `'self'`, so injected `<style>`/`<link>` elements are still refused. Closing
  the attribute case would add little while inline script is permitted: injecting
  a style attribute requires HTML injection, and an attacker with that could
  inject a `<script>` instead.

`CSP_MODE=report` switches to `Content-Security-Policy-Report-Only`. It is a
**build-time** variable, since Next compiles `headers()` into
`.next/routes-manifest.json`; setting it on `next start` has no effect.

## Content integrity

Entities marked `sample: true` are structurally complete but **not factual**.
They are labelled in the UI wherever they appear. Nothing in this repository
invents a research result, metric, DOI, publication, person, or contact detail;
where a value does not exist the interface says so instead of filling the gap.

## Known gaps

- Content is largely sample. Real research records are the highest-value change.
- `/privacy` and `/terms` describe actual current behaviour but need legal review.
- CSP still permits inline script; see **Security headers** for why and the cost
  of closing it.
- The dedicated per-system routes (Stage 5 §62) are not built; one template
  currently serves all three systems from the shared backbone.
