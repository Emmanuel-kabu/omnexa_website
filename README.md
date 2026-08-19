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
```

`verify` runs typecheck → lint → production build → accessibility → interaction,
and exits non-zero on any failure. The audits need a production build, since
dev-mode timings and bundles are not representative. CI runs the same pipeline
on every pull request.

Current state: **0 axe violations** across 12 pages, **23 interaction checks
passing**, Lighthouse accessibility / best-practices / SEO at 100. Performance
is reported but not gated, because measured scores varied 74–87 run to run.

## Configuration

All flags are read in `src/lib/content-config.ts` and `src/lib/site.ts`.

| Variable | Default | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://omnexalabs.com` | Canonical URLs, sitemap, structured data |
| `NEXT_PUBLIC_CONTACT_EMAIL` | unset | Activates the contact channels. While unset, `/company/contact` says so plainly rather than showing a form that discards input |
| `NEXT_PUBLIC_PUBLISH_SYSTEMS` | `false` | Publishes Cadence / MedApp / ResearchOS. While off they are absent from navigation, the homepage, search and the sitemap, and `/systems` returns 404 |
| `NEXT_PUBLIC_INCLUDE_SAMPLE_CONTENT` | `true` | Set `false` to strip every entity marked `sample: true` from all indexes, feeds and the sitemap |

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

## Content integrity

Entities marked `sample: true` are structurally complete but **not factual**.
They are labelled in the UI wherever they appear. Nothing in this repository
invents a research result, metric, DOI, publication, person, or contact detail;
where a value does not exist the interface says so instead of filling the gap.

## Known gaps

- Content is largely sample. Real research records are the highest-value change.
- `/privacy` and `/terms` describe actual current behaviour but need legal review.
- No CSP or security headers yet.
- The dedicated per-system routes (Stage 5 §62) are not built; one template
  currently serves all three systems from the shared backbone.
