# Omnexa Labs Website — Stage 7 Technical Production Architecture & Implementation System

**Document type:** Production Engineering Specification  
**Audience:** Codex / Frontend Engineers / Platform Engineers / DevOps / QA / Security / Content Engineers  
**Stage:** 7 — Technical Production Architecture  
**Depends on:**
- `omnexa_labs_stage_1_visual_design_system.md`
- `omnexa_labs_stage_2_information_architecture.md`
- `omnexa_labs_stage_3_homepage_experience.md`
- `omnexa_labs_stage_4_research_experience.md`
- `omnexa_labs_stage_5_systems_experience.md`
- `omnexa_labs_stage_6_company_people_careers_insights.md`

---

# 1. Purpose

Stage 7 turns the previous design and information specifications into a production implementation architecture.

This document defines:

```text
application architecture
frontend boundaries
design-system implementation
content architecture
CMS abstraction
content validation
search
caching
revalidation
motion runtime
visualization runtime
analytics
observability
security
forms
SEO
testing
visual regression
accessibility verification
CI/CD
deployment
preview environments
performance budgets
failure handling
production-readiness gates
```

The goal is not merely to make the Omnexa Labs website render.

The goal is to make it:

```text
fast
maintainable
secure
observable
accessible
content-driven
testable
deployable
extensible
visually faithful
```

---

# 2. Production Architecture Principles

The implementation must follow these rules.

## 2.1 Server First

Render public content on the server whenever interactivity is not required.

Use client components only for:

```text
interactive visualizations
motion orchestration
menus
filters requiring client state
search interaction
copy controls
forms where client enhancement is useful
```

Do not mark the application root or entire pages as client components.

---

## 2.2 Content Is Data

Research, systems, people, jobs, insights, publications, and experiments must come through structured domain models.

Do not hardcode structured institutional content throughout JSX.

---

## 2.3 Visualizations Are Enhancements

The content hierarchy must work without:

```text
WebGL
Canvas
continuous animation
JavaScript-heavy graph rendering
```

Every advanced visualization needs a meaningful fallback.

---

## 2.4 Domain Modules Own Their Logic

Use feature/domain ownership:

```text
research owns research behavior
systems owns systems behavior
careers owns careers behavior
insights owns editorial behavior
```

Avoid one giant shared component folder containing unrelated implementation.

---

## 2.5 Infrastructure Must Be Replaceable

The presentation layer must not depend directly on:

```text
one CMS
one search provider
one analytics vendor
one deployment provider
```

Use adapters and repository interfaces.

---

## 2.6 Performance Is an Architecture Constraint

Do not build first and optimize later.

Bundle boundaries, image loading, visualization loading, caching, and server/client boundaries must be decided during implementation.

---

## 2.7 Security Is Default Behavior

Security must exist in:

```text
headers
forms
dependencies
content ingestion
preview access
webhooks
secrets
deployment
observability
```

not only at the perimeter.

---

# 3. Recommended Technology Baseline

Primary application:

```text
Next.js App Router
React
TypeScript
```

Styling:

```text
CSS Modules / global token CSS
or
Tailwind if the existing implementation standardizes it carefully
```

Recommendation:

Prefer:

```text
CSS variables for design tokens
component-local styles
small utility layer where helpful
```

Avoid making the visual system dependent on large amounts of inline utility duplication.

Validation:

```text
Zod
```

Testing:

```text
Vitest or Jest
React Testing Library
Playwright
axe-core integration
```

Motion:

```text
CSS
Motion
Canvas / SVG
Three.js only where justified
```

Content:

```text
MDX + typed frontmatter
or
headless CMS through repository adapters
```

Search:

```text
provider abstraction
```

Deployment:

```text
Vercel-compatible architecture
with no business logic unnecessarily coupled to Vercel
```

---

# 4. Framework Version Rule

Codex must inspect the repository's actual framework version before implementing framework-specific APIs.

Do not blindly assume that:

```text
caching APIs
route conventions
metadata APIs
middleware/proxy behavior
experimental flags
```

match an example from this document.

The architecture is stable.

API syntax must follow the installed framework version.

---

# 5. Repository Structure

Recommended production structure:

```text
omnexa-web/
├── public/
│   ├── brand/
│   ├── images/
│   ├── research/
│   ├── systems/
│   ├── people/
│   └── fonts/
│
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx
│   │   │   ├── research/
│   │   │   ├── systems/
│   │   │   ├── insights/
│   │   │   ├── company/
│   │   │   ├── careers/
│   │   │   └── search/
│   │   │
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   ├── preview/
│   │   │   ├── revalidate/
│   │   │   └── search/
│   │   │
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── not-found.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── manifest.ts
│   │
│   ├── components/
│   │   ├── primitives/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── typography/
│   │   ├── motion/
│   │   ├── visualization/
│   │   ├── research/
│   │   ├── systems/
│   │   ├── insights/
│   │   ├── company/
│   │   ├── careers/
│   │   ├── search/
│   │   └── forms/
│   │
│   ├── content/
│   │   ├── adapters/
│   │   ├── schemas/
│   │   ├── repositories/
│   │   ├── queries/
│   │   ├── relationships/
│   │   ├── search/
│   │   └── transforms/
│   │
│   ├── design-system/
│   │   ├── tokens/
│   │   ├── themes/
│   │   ├── typography/
│   │   ├── motion/
│   │   └── contracts/
│   │
│   ├── lib/
│   │   ├── analytics/
│   │   ├── observability/
│   │   ├── security/
│   │   ├── seo/
│   │   ├── cache/
│   │   ├── search/
│   │   ├── env/
│   │   ├── forms/
│   │   └── utils/
│   │
│   ├── hooks/
│   ├── types/
│   └── styles/
│
├── content/
│   ├── research/
│   ├── systems/
│   ├── insights/
│   ├── people/
│   ├── careers/
│   └── company/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── accessibility/
│   ├── visual/
│   └── fixtures/
│
├── scripts/
│   ├── validate-content.ts
│   ├── build-search-index.ts
│   ├── check-links.ts
│   ├── check-content-relationships.ts
│   └── performance-budget.ts
│
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── content/
│   ├── runbooks/
│   └── qa/
│
├── .github/
│   └── workflows/
│
├── next.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# 6. Dependency Direction

Use this dependency flow:

```text
app routes
   ↓
domain queries
   ↓
repositories
   ↓
content adapters
   ↓
CMS / MDX / external source
```

Components may depend on:

```text
domain types
presentation models
shared primitives
```

Components should not directly depend on:

```text
CMS SDK
database client
search vendor SDK
analytics vendor SDK
```

unless the component exists specifically as a thin vendor adapter.

---

# 7. Layer Responsibilities

## App Layer

Owns:

```text
routing
layouts
metadata composition
server-side page composition
route-level error boundaries
```

## Domain Query Layer

Owns:

```text
content aggregation
relationship joins
featured selection
filtering
presentation-ready page models
```

## Repository Layer

Owns:

```text
content retrieval
source-independent interfaces
visibility enforcement
```

## Adapter Layer

Owns:

```text
CMS APIs
filesystem MDX
external service transformation
```

## Presentation Layer

Owns:

```text
layout
interaction
visualization
accessibility
```

---

# 8. Design System Implementation

Stage 1 visual decisions must become code-level contracts.

Suggested:

```text
src/design-system/
├── tokens/
│   ├── color.css
│   ├── spacing.css
│   ├── typography.css
│   ├── radius.css
│   ├── motion.css
│   ├── layout.css
│   └── z-index.css
│
├── themes/
│   ├── light.css
│   └── dark.css
│
├── typography/
│   └── typography.ts
│
└── contracts/
    └── tokens.ts
```

---

# 9. Core CSS Tokens

Example baseline:

```css
:root {
  --omx-bg-primary: #f7f7f4;
  --omx-bg-secondary: #efefeb;
  --omx-bg-inverse: #080808;

  --omx-text-primary: #0a0a0a;
  --omx-text-secondary: #555555;
  --omx-text-muted: #8a8a86;
  --omx-text-inverse: #f1f1ee;

  --omx-border-primary: #d9d9d4;
  --omx-border-subtle: #e8e8e3;

  --omx-accent: #315cff;

  --omx-space-1: 0.25rem;
  --omx-space-2: 0.5rem;
  --omx-space-3: 0.75rem;
  --omx-space-4: 1rem;
  --omx-space-6: 1.5rem;
  --omx-space-8: 2rem;
  --omx-space-12: 3rem;
  --omx-space-16: 4rem;
  --omx-space-24: 6rem;
  --omx-space-32: 8rem;

  --omx-radius-xs: 2px;
  --omx-radius-sm: 4px;
  --omx-radius-md: 8px;

  --omx-motion-fast: 160ms;
  --omx-motion-ui: 240ms;
  --omx-motion-section: 600ms;
  --omx-motion-cinematic: 1200ms;
}
```

These are initial contracts and may be refined after visual QA.

Do not fork token values locally inside components without a documented reason.

---

# 10. Semantic Tokens

Do not use raw color names throughout component CSS.

Prefer:

```css
--surface-page
--surface-subtle
--surface-inverse

--text-primary
--text-secondary
--text-muted

--border-default
--border-subtle

--interactive-primary
--interactive-hover
--focus-ring
```

Then map semantic tokens to Omnexa primitives.

This supports dark sections and future themes without rewriting components.

---

# 11. Typography Runtime

Typography styles should be explicit.

Example categories:

```text
display-1
display-2
heading-1
heading-2
heading-3
body-large
body
caption
technical
navigation
control
```

Do not rely on browser-default typography for:

```text
buttons
forms
filters
menus
search
code controls
publication metadata
```

---

# 12. Font Loading

Requirements:

```text
optimized font loading
minimal families
variable fonts where appropriate
fallback metrics
no unnecessary weight downloads
```

Use framework font optimization where compatible with the selected font licensing/deployment strategy.

Avoid shipping large font families solely for one decorative word.

---

# 13. Primitive Components

Recommended primitives:

```text
Button
TextLink
Section
Container
Stack
Cluster
Grid
Divider
Metadata
Status
Figure
VisuallyHidden
SkipLink
FocusRing
```

Primitives should be visually restrained.

Avoid building an enormous generic component library before real page needs emerge.

---

# 14. Button Contract

Variants:

```text
primary
secondary
text
inverse
```

Do not add:

```text
glow
gradient
glass
pill
```

unless a future approved design requires them.

---

# 15. Content Source Strategy

The frontend must support two operating modes.

## Mode A — Repository-Managed Content

Use:

```text
MDX
YAML/JSON metadata
Git review
```

Best while:

```text
team is small
technical staff own publishing
content volume is moderate
```

## Mode B — Headless CMS

Use when:

```text
multiple editors publish regularly
preview workflow matters
scheduled publishing matters
content volume grows
non-engineers own editorial updates
```

Both modes must implement the same repository interfaces.

---

# 16. Content Provider Contract

Example:

```ts
interface ContentProvider {
  getById<T>(type: ContentType, id: string): Promise<T | null>;

  getBySlug<T>(
    type: ContentType,
    slug: string
  ): Promise<T | null>;

  list<T>(
    type: ContentType,
    query?: ContentQuery
  ): Promise<T[]>;
}
```

Domain repositories wrap this provider.

Page components never call `ContentProvider` directly.

---

# 17. Content Validation

All external or authored content must be validated before it reaches page rendering.

Example:

```ts
const ResearchProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  visibility: ContentVisibilitySchema,
  status: ResearchStatusSchema,
});
```

Validation should happen:

```text
at build for repository content
at ingestion for CMS content
at runtime at external service boundaries
```

---

# 18. Content Integrity Build Step

Create:

```text
pnpm content:validate
```

It should verify:

```text
schema validity
unique IDs
unique slugs in route scope
valid relationships
valid people references
valid publication references
visibility
required dates
broken asset references
broken internal links
```

Production builds should fail on critical integrity errors.

---

# 19. Relationship Validation

Create a graph validation script.

It should identify:

```text
missing target entity
duplicate relationship
relationship to private entity from public entity
invalid relationship type
orphan project
experiment without project/program
publication with missing author
system with missing referenced research
```

---

# 20. Rich Content

Rich content may contain:

```text
paragraphs
headings
lists
tables
figures
code
equations
citations
callouts
```

Rendering should use an allow-listed component mapping.

Do not allow arbitrary executable JavaScript from CMS-authored rich content.

---

# 21. MDX Security

If MDX is used:

```text
compile trusted repository content only
do not execute untrusted MDX submissions
restrict component imports
avoid dynamic eval-like content execution
```

User-generated content is out of scope.

---

# 22. Media Pipeline

Media metadata:

```ts
type MediaAsset = {
  id: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
  mimeType?: string;
  caption?: string;
  credit?: string;
  blurDataURL?: string;
};
```

All important images should have known intrinsic dimensions.

---

# 23. Image Rules

Use optimized responsive delivery.

Requirements:

```text
explicit dimensions/aspect ratio
correct sizes attribute
modern image format when supported
lazy-load below-fold images
do not preload arbitrary images
preserve documentary art direction
```

Hero media should only be preloaded when truly necessary for LCP.

---

# 24. Search Architecture

Global search should index:

```text
research areas
programs
projects
experiments
publications
systems
insights
people
jobs
company pages
```

Search must enforce public visibility before indexing.

---

# 25. Search Provider Abstraction

```ts
interface SearchProvider {
  search(query: SearchQuery): Promise<SearchResultPage>;
  index?(documents: SearchDocument[]): Promise<void>;
}
```

Potential backends can be swapped.

The frontend should depend only on the domain search contract.

---

# 26. Search Document

```ts
type SearchDocument = {
  id: string;
  entityId: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;

  researchAreaIds?: string[];
  systemIds?: string[];
  personIds?: string[];
  tags?: string[];

  status?: string;
  publishedAt?: string;
  updatedAt?: string;
};
```

Never index private text merely to hide it at presentation time.

---

# 27. Search Ranking

Recommended ranking order:

```text
exact ID match
exact title match
title prefix
title semantic/text relevance
summary relevance
research/system relationships
recency as secondary signal
```

Do not let recency dominate technical relevance.

---

# 28. Search Query API

Server route:

```text
GET /api/search?q=...
```

Requirements:

```text
input length limit
rate limit
validated filters
no raw backend query exposure
safe error handling
```

Search results should be cacheable where appropriate without leaking personalized state.

---

# 29. Search UI Performance

Use:

```text
debounced input only when live search is used
request cancellation
deferred rendering for expensive result updates
keyboard navigation
server fallback route
```

Do not fetch on every keystroke without control.

---

# 30. Caching Strategy

Public institutional content is an excellent caching candidate.

Use three concepts:

```text
request deduplication
cross-request content caching
on-demand invalidation
```

Avoid caching data whose correctness requires request-time freshness.

---

# 31. Cache Categories

## Long-Lived

```text
mission
principles
research areas
system definitions
person profiles
published historical publications
```

## Medium-Lived

```text
insight indexes
research indexes
featured research
system status
```

## Short-Lived / Dynamic

```text
open roles
search
contact form state
preview content
```

Exact cache APIs must match the installed Next.js version.

---

# 32. Revalidation Strategy

Preferred architecture:

```text
CMS publish event
      ↓
signed webhook
      ↓
revalidation route
      ↓
invalidate entity tag
      ↓
invalidate affected indexes
      ↓
next request receives refreshed content
```

Example tag concepts:

```text
research
research:OMX-DI-007
research-area:DI
publications
publication:OMX-PUB-013
systems
system:cadence
insights
people
jobs
```

---

# 33. Revalidation Security

Webhook endpoint must:

```text
authenticate signature/token
validate payload
allow only known entity types
rate limit
log mutation metadata
avoid returning secret details
```

Never expose an unauthenticated arbitrary path revalidation endpoint.

---

# 34. Draft Preview

Preview architecture:

```text
editor requests preview
      ↓
secure preview token/session
      ↓
preview mode enabled
      ↓
repository includes draft content
      ↓
noindex
      ↓
preview banner
```

Preview pages must never enter:

```text
public sitemap
public search
shared CDN public cache
```

---

# 35. Server Component Strategy

Default to server components for:

```text
page shells
article rendering
research metadata
system content
navigation content
publication lists
people
jobs
```

Use client components only at interaction boundaries.

---

# 36. Client Boundary Rule

A client component should receive the minimum serialized data needed.

Bad:

```text
pass entire research graph + publications + raw CMS objects
```

Preferred:

```text
pass compact visualization nodes
pass current selected metadata
pass IDs needed for interaction
```

---

# 37. Async Data Strategy

Independent server queries should execute in parallel.

Concept:

```ts
const [research, systems, insights] = await Promise.all([
  getResearch(),
  getSystems(),
  getInsights(),
]);
```

Avoid route-level sequential waterfalls where data sources are independent.

---

# 38. Suspense Boundaries

Use streaming boundaries for:

```text
non-critical related content
large archive sections
optional dynamic widgets
```

Do not wrap every small component in Suspense.

The initial visual hierarchy should remain stable.

---

# 39. Bundle Architecture

High-cost modules require dedicated chunks.

Examples:

```text
Research Atlas
Intelligence Field
Cadence Architecture
MedApp Knowledge Graph
ResearchOS Architecture
math renderer
syntax highlighting
chart packages
```

Load them only on routes where they are needed.

---

# 40. Import Discipline

Avoid broad barrel imports from large libraries.

Prefer direct imports where practical.

Do not import:

```text
all icons
all chart types
all motion helpers
all graph algorithms
```

for one component.

---

# 41. Third-Party Script Policy

Third-party scripts should be classified:

```text
essential
analytics
media
optional
```

Requirements:

```text
defer non-essential scripts
load after critical UI when possible
minimize vendors
document data collected
```

No third-party script may be added solely for a small visual effect.

---

# 42. Motion Runtime Architecture

Separate four layers:

```text
UI transitions
section reveals
narrative timelines
visual simulation
```

Suggested:

```text
src/components/motion/
├── reveal.tsx
├── transition.tsx
├── scroll-progress.ts
├── reduced-motion.ts
└── motion-provider.tsx
```

Visual simulations live separately.

---

# 43. Motion Capability Detection

At runtime consider:

```text
prefers-reduced-motion
viewport size
device memory if safely available
hardware concurrency if useful
visibility state
intersection state
```

Do not create brittle device scoring.

Use progressive degradation.

---

# 44. Visualization Runtime

Recommended hierarchy:

```text
SVG
↓
Canvas 2D
↓
WebGL
```

Choose the simplest technology capable of meeting the visual requirement.

Examples:

```text
Research Atlas → SVG/Canvas
Architecture diagrams → SVG
Hero Intelligence Field → Canvas/WebGL
Charts → SVG/Canvas
```

---

# 45. Visualization Lifecycle

Every continuous visualization should implement:

```text
initialize
resize
start
pause
resume
destroy
```

Pause when:

```text
offscreen
tab hidden
reduced motion enabled
component unmounted
```

---

# 46. Visualization Data Boundary

Transform domain data before the client.

Example:

```ts
type AtlasNodeView = {
  id: string;
  label: string;
  type: "area" | "program" | "project";
  status?: string;
  parentId?: string;
};
```

Do not send private CMS metadata into public visualization props.

---

# 47. Visualization Failure Fallback

If advanced rendering fails:

```text
show static diagram
or
show semantic hierarchy/list
```

Never leave a blank hero or architecture section.

---

# 48. Analytics Architecture

Create an internal analytics interface.

```ts
interface AnalyticsClient {
  track<T extends AnalyticsEvent>(
    event: T["name"],
    payload: T["payload"]
  ): void;
}
```

Components call Omnexa analytics abstractions, not vendor SDKs directly.

---

# 49. Analytics Privacy

Never include:

```text
health data
contact message body
email address
resume content
private research data
search text containing sensitive data if avoidable
```

in analytics events.

---

# 50. Analytics Event Naming

Use stable domain-based names.

Examples:

```text
navigation_click
research_project_open
research_atlas_area_select
system_open
publication_open
job_apply_click
contact_intent_select
```

Do not rename events casually after launch.

---

# 51. Web Performance Monitoring

Monitor field performance:

```text
LCP
INP
CLS
navigation timing
route-level performance
```

Also track:

```text
visualization initialization cost
search latency
form failure rate
content query failure
```

---

# 52. Observability Architecture

Observability domains:

```text
frontend errors
server errors
route latency
external service failures
content failures
webhook failures
search failures
form failures
deployment health
```

---

# 53. Structured Logging

Server logs should use structured fields.

Example:

```json
{
  "event": "content_query_failed",
  "entityType": "publication",
  "route": "/research/publications/...",
  "requestId": "...",
  "environment": "production"
}
```

Never log:

```text
secrets
full form payloads
health information
authorization tokens
```

---

# 54. Error Boundary Strategy

Use:

```text
route-level error.tsx
global-error.tsx
component-local recovery only for isolated heavy widgets
```

A visualization crash should not destroy the entire page.

---

# 55. User-Facing Error Philosophy

Error messages should be:

```text
clear
calm
specific enough to guide
free of internal details
```

Example:

```text
This research visualization could not be loaded.
The research content is still available below.
```

---

# 56. Health Checks

If deployment architecture supports health endpoints:

```text
/api/health
```

may return:

```text
application status
build/version identifier
basic dependency health
```

Do not expose sensitive infrastructure details.

---

# 57. Environment Variables

Categorize:

```text
public
server-only
build-time
deployment
```

Naming:

```text
NEXT_PUBLIC_*
```

only for values safe to expose to browsers.

All secrets remain server-only.

---

# 58. Environment Validation

Validate environment at startup/build.

Example categories:

```text
SITE_URL
CMS endpoint
CMS credentials
search credentials
analytics config
contact backend
preview secret
revalidation secret
```

Production should fail fast when mandatory secrets are absent.

---

# 59. Secret Handling

Rules:

```text
never commit secrets
never expose server secrets to client components
never print secrets in logs
rotate compromised secrets
use deployment secret manager
```

`.env.example` contains names and descriptions, never real values.

---

# 60. Security Headers

Production should define a reviewed header policy including, where applicable:

```text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
frame restrictions
```

Exact CSP must reflect real asset/script providers.

Do not use `unsafe-inline` broadly simply to make integration easier.

---

# 61. Content Security Policy

Start from a restrictive policy.

Explicitly enumerate:

```text
scripts
styles
images
fonts
connections
frames
workers
```

If nonce-based script execution is required, design it intentionally.

Do not copy a CSP from another project without matching actual dependencies.

---

# 62. External Link Security

For new-tab external links:

```text
rel="noopener noreferrer"
```

where appropriate.

Visually distinguish external resources using the established `↗` interaction language.

---

# 63. Form Security

Contact forms require:

```text
server-side validation
input size limits
rate limiting
spam prevention
bot resistance
safe HTML handling
CSRF protection where architecture requires it
```

Do not trust client-side validation alone.

---

# 64. File Upload Policy

The Stage 7 public site should not add file uploads by default.

If careers later supports CV upload:

```text
allow-list file types
strict file size
malware scanning
private storage
short-lived upload URLs
no public object listing
```

Applicant files must never be placed into a public static bucket.

---

# 65. Dependency Security

CI should run:

```text
dependency lockfile integrity
vulnerability scanning
license checks where required
```

Pin dependencies through the lockfile.

Avoid unmaintained visualization/motion packages for minor effects.

---

# 66. Content Webhook Security

CMS webhook events should include:

```text
signature verification
timestamp/replay protection where available
entity allow-list
bounded payload size
```

Log event metadata, not full confidential content.

---

# 67. Search Abuse Protection

Protect public search from:

```text
extreme query sizes
rapid automated scraping
backend query injection
expensive unbounded filters
```

Set:

```text
query length cap
filter allow-list
pagination cap
request rate control
```

---

# 68. SEO Architecture

Use framework metadata APIs for:

```text
title
description
canonical URL
Open Graph
Twitter/social metadata
robots
```

Dynamic entity routes generate metadata from validated public content.

---

# 69. Metadata Builder

Create:

```text
src/lib/seo/
├── metadata.ts
├── canonical.ts
├── structured-data.ts
├── og.ts
└── breadcrumbs.ts
```

Example:

```ts
function buildEntityMetadata(entity: PublicEntity): Metadata {
  // shared institutional defaults
}
```

---

# 70. Canonical URL Rules

Canonical URLs must:

```text
use production origin
remove irrelevant query state
preserve meaningful route identity
```

Filter/search pages may need separate indexing policy.

---

# 71. Robots

Public:

```text
allow
```

Block/noindex where appropriate:

```text
preview
draft
private
test routes
internal API surfaces
deployment previews if needed
```

Do not rely only on `robots.txt` to secure private data.

---

# 72. Sitemap

Generate from validated public entities.

Include:

```text
static pages
research entities
systems
insights
people
open public jobs
```

Exclude:

```text
draft
private
unlisted when policy requires
closed roles if intentionally not indexed
preview
```

---

# 73. Structured Data

Supported types may include:

```text
Organization
Person
Article
NewsArticle
ScholarlyArticle
JobPosting
BreadcrumbList
WebSite
```

Only emit schema types when content actually qualifies.

---

# 74. Open Graph Generation

Create reusable branded OG templates for:

```text
Research
Systems
Insights
People
Careers
Company
```

Avoid one generic image for every route.

OG rendering should be light enough for edge/server generation.

---

# 75. Accessibility Architecture

Accessibility is both code and test policy.

Required foundations:

```text
semantic landmarks
one H1
logical headings
skip link
visible focus
keyboard navigation
reduced motion
semantic forms
accessible data tables
figure alternatives
```

---

# 76. Accessible Visualization Contract

Every visualization declares:

```ts
type VisualizationA11y = {
  decorative: boolean;
  summary?: string;
  dataTableId?: string;
  semanticFallbackId?: string;
};
```

Do not decide accessibility ad hoc in every SVG.

---

# 77. Automated Accessibility Testing

Automated checks should cover:

```text
homepage
research
research detail
systems
system detail
insights article
careers
job detail
contact
```

Automated tools are not a replacement for manual keyboard/screen-reader review.

---

# 78. Unit Testing Strategy

Unit tests target:

```text
schema validation
content transforms
relationship logic
search transforms
URL builders
metadata builders
analytics payload sanitization
status helpers
```

Do not unit-test static markup for its own sake.

---

# 79. Component Testing

Use component tests for interactive behavior such as:

```text
mobile menu
research selector
archive filter
search interaction
copy citation
contact validation
architecture selection
reduced-motion state
```

---

# 80. Integration Tests

Integration tests should cover:

```text
content adapter → repository
repository → query
query → page model
CMS webhook → cache invalidation
search indexing → search results
contact route → backend adapter
```

---

# 81. End-to-End Tests

Critical flows:

```text
Home → Research → Project
Home → Cadence
Research Atlas → Program
Publication → citation copy
Insights → related research
Careers → role → apply
Contact → valid submission
Mobile navigation
404
```

---

# 82. Playwright Assertions

Prefer role/accessible-name locators.

Example concepts:

```text
getByRole("heading")
getByRole("link")
getByLabel()
```

Avoid brittle selectors tied to visual DOM structure.

Use auto-retrying web assertions for asynchronous UI behavior.

---

# 83. Visual Regression

Visual regression is mandatory for the art-directed site.

Baseline routes:

```text
/
research
research area
research project
systems
cadence
medapp
researchos
company
people
careers
insights
```

At minimum capture:

```text
desktop
mobile
reduced-motion static version where relevant
```

---

# 84. Visual Test Stability

Screenshot tests must run in a consistent environment.

Normalize:

```text
browser version
OS/container
font availability
viewport
animation state
timestamps
dynamic content fixtures
```

Freeze or mask intentionally unstable regions.

---

# 85. Fidelity QA

For every major page built from an approved visual reference:

```text
render
capture screenshot
compare to approved design
record mismatch
fix
repeat
```

Do not accept “functionally correct” as visual completion.

---

# 86. Accessibility Snapshot Testing

Use accessibility tree snapshots selectively for:

```text
navigation
article hierarchy
forms
menus
dialogs
```

Do not snapshot entire massive pages if changes become noisy and unreviewable.

---

# 87. Link Validation

CI should verify:

```text
internal route references
content relationship links
asset references
canonical URLs
```

External link checking may run separately because external availability is unstable.

---

# 88. Content Fixtures

Tests must use deterministic fixtures.

Do not run visual/E2E tests directly against constantly changing live CMS content.

Create:

```text
tests/fixtures/content/
```

with representative:

```text
research
systems
articles
people
jobs
```

---

# 89. Performance Budgets

Page experience targets:

```text
LCP target < 2.5s
INP target < 200ms
CLS target < 0.1
```

Additionally enforce project-level budgets.

Suggested initial budgets:

```text
critical initial JS:
keep as low as practical

homepage visualization chunk:
separate from base shell

route-specific chart/graph libraries:
never in global bundle

unoptimized hero video:
not allowed by default
```

Bundle limits should be measured from actual production output before final numeric thresholds are locked.

---

# 90. Route-Level Performance Classification

## Tier A — Critical Lightweight

```text
company
mission
principles
people index
careers
insights index
```

Expect very low JS.

## Tier B — Editorial Technical

```text
research project
publication
insight article
system detail
```

Moderate route-specific enhancements.

## Tier C — Visualization Heavy

```text
homepage hero
research atlas
Cadence architecture
MedApp graph
ResearchOS architecture
```

Strict chunk isolation required.

---

# 91. Long List Performance

For large archives:

```text
server pagination
content-visibility where useful
avoid rendering thousands of items
stable keys
minimal row client state
```

Do not virtualize small editorial lists unnecessarily.

---

# 92. Animation Performance

For continuous animation:

```text
transform/opacity where possible
requestAnimationFrame for Canvas
no layout reads per frame
bounded node count
DPR cap
visibility pause
```

Profile real mobile hardware or realistic throttling.

---

# 93. CI Pipeline

Recommended pull-request pipeline:

```text
01 Install
02 Typecheck
03 Lint
04 Unit Tests
05 Content Validation
06 Relationship Validation
07 Build
08 Integration Tests
09 Accessibility Tests
10 E2E Smoke
11 Visual Regression
12 Bundle / Performance Budget
13 Security / Dependency Scan
14 Preview Deployment
```

Some slow jobs may run in parallel.

---

# 94. CI Parallelization

Example:

```text
             ┌─ lint
install ─────┼─ typecheck
             ├─ unit
             ├─ content
             └─ security

build
  ├─ integration
  ├─ e2e
  ├─ a11y
  ├─ visual
  └─ performance
```

Do not make independent checks sequential.

---

# 95. Pull Request Gates

PR cannot merge when:

```text
type errors
build errors
critical content integrity errors
critical accessibility regressions
failed critical E2E
unreviewed visual regression
high-severity security issue
performance budget regression above agreed threshold
```

---

# 96. Preview Environments

Every PR should receive a preview environment when deployment infrastructure supports it.

Preview requirements:

```text
isolated URL
preview banner if needed
no production secrets unless required
preview-safe CMS credentials
noindex
safe analytics behavior
```

---

# 97. Preview Content

Preferred:

```text
public production content
+
authorized draft preview only when explicitly enabled
```

Do not make all drafts visible on ordinary PR previews.

---

# 98. Deployment Environments

Recommended:

```text
local
test
preview
staging
production
```

If staging is unnecessary for a static public website, preview + production may suffice.

If content workflows, forms, and external services are complex, keep staging.

---

# 99. Deployment Architecture

Preferred topology:

```text
Git repository
    ↓
CI
    ↓
Preview deployment
    ↓
approval / merge
    ↓
Production deployment
    ↓
CDN / edge
    ↓
Visitors
```

CMS/search/form providers remain external behind adapters.

---

# 100. Production Deployment Rules

Production deploy should require:

```text
green CI
validated production env
successful build
critical route smoke test
known migration/content compatibility
```

Do not deploy from an untracked local machine.

---

# 101. Rollback

Production must support rapid rollback to a known good deployment.

Rollback runbook should include:

```text
when to rollback
who can rollback
how to identify last good deployment
how to handle CMS schema incompatibility
how to communicate incident
```

---

# 102. Content Rollback

Content rollback is separate from code rollback.

CMS/content workflows should allow:

```text
restore previous revision
unpublish invalid content
invalidate cache
rebuild search index if needed
```

---

# 103. Feature Flags

Use feature flags for:

```text
new Research Atlas runtime
new visualization engine
experimental system sections
new search backend
```

Do not use flags for ordinary styling decisions.

Feature flags must have:

```text
owner
purpose
expiry/removal plan
default state
```

---

# 104. Deployment Verification

Immediately after production deploy:

```text
homepage loads
research loads
systems loads
insights loads
careers loads
contact route works
search works
metadata endpoint works
sitemap works
robots works
critical analytics starts
no major frontend errors
```

Automate as much as practical.

---

# 105. Monitoring Alerts

Alert on:

```text
elevated server error rate
contact submission failures
search failure rate
CMS query failure
revalidation webhook failure
high LCP regression
broken production deployment
```

Avoid noisy alerts for non-actionable minor client errors.

---

# 106. Incident Severity

Suggested website incidents:

## SEV-1

```text
site unavailable
security compromise
private content exposure
health/private data exposure
```

## SEV-2

```text
major route family broken
contact completely broken
search completely broken
critical production regression
```

## SEV-3

```text
isolated content/visual issue
single non-critical visualization broken
minor analytics failure
```

---

# 107. Runbooks

Create:

```text
docs/runbooks/
├── production-rollback.md
├── cms-outage.md
├── search-outage.md
├── contact-form-outage.md
├── cache-revalidation-failure.md
├── broken-publication.md
├── private-content-exposure.md
└── performance-regression.md
```

---

# 108. Graceful Degradation

## CMS unavailable

Serve cached public content when possible.

## Search unavailable

Show:

```text
Search is temporarily unavailable.
Explore Research, Systems, and Insights directly.
```

## Analytics unavailable

Website continues normally.

## Visualization failure

Render static/semantic fallback.

## Contact backend unavailable

Do not pretend submission succeeded.

Show a truthful failure state.

---

# 109. External Dependency Policy

Every external service must document:

```text
purpose
data sent
failure impact
fallback
credentials
owner
replacement path
```

This includes:

```text
CMS
search
analytics
error tracking
contact delivery
media CDN
```

---

# 110. Browser Support Policy

Support current major evergreen browsers based on actual visitor needs.

At minimum test:

```text
Chromium
Firefox
WebKit/Safari
```

Complex visualizations must fail gracefully where unsupported.

Do not block the website because one advanced API is missing.

---

# 111. Responsive Verification Matrix

Minimum:

```text
375 × 812
390 × 844
430 × 932
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1600 × 1000
1920 × 1080
```

Also:

```text
200% zoom
reduced motion
keyboard only
touch
slow network
CPU throttling
```

---

# 112. Content Editing Workflow

Recommended:

```text
Author
  ↓
Draft
  ↓
Schema Validation
  ↓
Editorial Review
  ↓
Technical/Scientific Review when required
  ↓
Preview
  ↓
Publish
  ↓
Revalidate
  ↓
Search Index Update
```

---

# 113. Research Publication Review

Research content should support a review gate before publication.

Check:

```text
authors
dates
status
method
results
limitations
citations
public/private boundaries
```

Do not expose internal research automatically when a CMS status changes accidentally.

---

# 114. Medical Content Review

MedApp public content requires an additional review gate for:

```text
clinical claims
safety language
standards/source references
privacy claims
accuracy metrics
```

---

# 115. Security Review Gate

Review security-sensitive pages/diagrams for:

```text
internal topology
credentials
sandbox internals
access controls
private provider details
attack surface disclosure
```

before publication.

---

# 116. Content Ownership

Every public entity should have internal metadata:

```text
owner
reviewer
lastReviewedAt
```

These need not be public.

Purpose:

```text
prevent stale content
assign corrections
enable scheduled review
```

---

# 117. Content Freshness

Suggested review cadence by category:

```text
mission/principles → infrequent
people → when role/profile changes
jobs → continuous while open
system status → regular
research projects → as research changes
news → immutable after corrections
```

Do not display internal review timestamps publicly unless useful.

---

# 118. Search Index Update

On publication/change:

```text
content change
    ↓
validate
    ↓
publish
    ↓
revalidate relevant pages
    ↓
upsert public search document
```

On unpublish/private:

```text
remove document immediately
```

Do not wait for a periodic full rebuild to remove private content.

---

# 119. Build-Time Search Option

For early-stage implementation with moderate content volume, Codex may use a generated static search index.

Build step:

```text
content
  ↓
public entity transform
  ↓
search-index.json
```

Then later migrate to hosted search without changing UI contracts.

---

# 120. Contact Backend Adapter

```ts
interface ContactService {
  submit(input: ContactSubmission): Promise<ContactSubmissionResult>;
}
```

Possible implementations:

```text
email provider
CRM
ticketing provider
database + notification
```

The UI does not depend on implementation.

---

# 121. Rate Limiting Adapter

```ts
interface RateLimiter {
  check(key: string, action: string): Promise<RateLimitResult>;
}
```

Use server-derived request identifiers carefully.

Do not create invasive browser fingerprinting.

---

# 122. Anti-Spam Strategy

Use layered controls:

```text
honeypot
rate limits
timing heuristics
provider challenge only when necessary
server validation
```

Avoid adding friction to every legitimate visitor by default.

---

# 123. Privacy Page Requirements

The Privacy page should accurately describe:

```text
analytics
contact information collection
cookies/storage if used
third-party processors
retention
user rights as applicable
```

Do not copy a generic privacy policy without legal review.

---

# 124. Cookie Strategy

Prefer minimizing cookies.

If analytics can run without unnecessary identification, choose that architecture.

Only show consent UI when legally/operationally required by actual data practices.

Do not implement a fake cookie banner disconnected from real behavior.

---

# 125. Dependency Update Policy

Use automated dependency update PRs if available.

Rules:

```text
patch/minor changes → automated tests
major changes → explicit review
visualization/motion upgrades → visual regression required
framework upgrades → staging/preview performance review
```

---

# 126. Architecture Decision Records

Use ADRs for decisions that affect long-term architecture.

Examples:

```text
ADR-001 Content provider strategy
ADR-002 Search backend
ADR-003 Motion library
ADR-004 Research Atlas renderer
ADR-005 Analytics provider
ADR-006 Deployment platform
ADR-007 CMS adoption
```

---

# 127. ADR Template

```text
# ADR-XXX — Decision

## Status
Proposed / Accepted / Superseded

## Context

## Decision

## Alternatives

## Consequences

## Migration / Reversal
```

---

# 128. Code Quality Rules

Codex should enforce:

```text
strict TypeScript
no implicit public any
small focused components
domain-specific names
minimal prop drilling
no giant page components
no hidden data fetching inside random UI primitives
```

---

# 129. Client State Policy

Use local state for:

```text
selected atlas node
menu state
active architecture layer
filter UI
```

Use URL state for:

```text
shareable filters
search query
archive pagination
important atlas selection
```

Avoid adding a global state manager unless a real cross-route/client-state need appears.

---

# 130. Data Fetching Policy

Server queries own public page data.

Client fetching is appropriate for:

```text
live search
progressive atlas expansion
non-critical interactive filters
```

Do not fetch static article content client-side after loading an empty shell.

---

# 131. Mutation Policy

Public site mutations are limited primarily to:

```text
contact
application handoff
preview/revalidation administration
```

Mutations must always:

```text
authenticate if privileged
validate
authorize
rate limit if public
log safely
```

---

# 132. Server Actions vs Route Handlers

Choose based on the installed framework and integration needs.

General rule:

```text
form tightly coupled to React UI → server-side action may fit
public API/webhook/external integration → route handler
```

Do not expose privileged mutations as unauthenticated public actions.

---

# 133. API Response Contract

Public APIs should use consistent error shape.

Example:

```ts
type ApiError = {
  code: string;
  message: string;
  requestId?: string;
};
```

Do not send stack traces to browsers.

---

# 134. Request Correlation

Generate/propagate a request ID where useful for:

```text
contact
search
webhooks
server errors
```

Expose it to users only when it helps support/debugging.

---

# 135. Time and Date Handling

Store structured dates in machine-readable format.

Render using:

```text
locale-aware formatting
explicit publication dates
consistent timezone policy
```

Research IDs and historical publication dates should not shift by viewer timezone.

---

# 136. Content Slug Policy

Slugs are:

```text
lowercase
hyphenated
stable
human-readable
```

If a title changes significantly, preserve old URLs through redirects when necessary.

---

# 137. Redirect Management

Maintain redirects for:

```text
renamed research
renamed insight
moved company pages
changed slugs
```

Do not silently break established public links.

---

# 138. 404 / Not Found

Unknown content should invoke the canonical not-found experience.

Do not return HTTP 200 with:

```text
"not found"
```

for absent research/project routes.

---

# 139. Draft Leakage Tests

CI/integration tests should verify that:

```text
draft research not in sitemap
draft research not in search
draft research route unavailable publicly
private system data not serialized into page source
preview metadata noindex
```

---

# 140. Sensitive Data Tests

Add tests ensuring analytics sanitation excludes:

```text
email
message
patient data
health content
auth tokens
```

where those code paths exist.

---

# 141. Production Build Audit

Before launch inspect:

```text
route rendering mode
JS chunk size
font payload
image payload
third-party scripts
source maps policy
security headers
sitemap
robots
Open Graph
structured data
```

---

# 142. Lighthouse / Lab Testing

Lab performance tools can be used as regression signals.

Do not treat one laboratory score as the sole truth.

Field metrics and real route profiling matter.

---

# 143. Performance Regression Policy

A PR that introduces a meaningful regression must either:

```text
fix it
or
document why the new capability justifies the cost
```

Unexplained bundle growth is not acceptable.

---

# 144. Visual Regression Review Policy

Screenshot changes require human review when they affect:

```text
hero
typography
layout
navigation
color
spacing
major visualizations
responsive composition
```

Do not auto-approve large snapshot updates.

---

# 145. Release Checklist

Before production release:

```text
[ ] Typecheck passes
[ ] Lint passes
[ ] Unit tests pass
[ ] Content validation passes
[ ] Relationship validation passes
[ ] Production build passes
[ ] E2E smoke passes
[ ] Accessibility checks pass
[ ] Visual regression reviewed
[ ] Critical mobile routes checked
[ ] Reduced motion checked
[ ] Security scan reviewed
[ ] Production environment validated
[ ] Sitemap generated
[ ] Robots verified
[ ] OG images verified
[ ] Contact tested
[ ] Search tested
[ ] Analytics validated
[ ] Error tracking validated
[ ] Rollback path known
```

---

# 146. Launch-Day Smoke Matrix

Routes:

```text
/
/research
/research/areas/developmental-intelligence
/research/archive
/research/publications
/systems
/systems/cadence
/systems/medapp
/systems/researchos
/insights
/company
/company/people
/careers
/careers/open-roles
/company/contact
/search
```

Test:

```text
desktop
mobile
navigation
metadata
errors
external links
```

---

# 147. Post-Launch Monitoring

First production window should watch:

```text
404 spikes
frontend exceptions
server exceptions
slow routes
LCP
INP
CLS
contact failures
search failures
broken content links
mobile layout problems
```

---

# 148. Production Readiness Definition

The website is production-ready only when:

```text
design fidelity is approved
content integrity is verified
security controls are active
critical routes are tested
performance is within budget
accessibility is reviewed
observability is live
rollback exists
```

Passing `next build` is not production readiness.

---

# 149. Codex Implementation Program

Codex should execute Stage 7 in controlled phases.

## Phase 1 — Repository Foundation

Implement:

```text
TypeScript strict mode
folder structure
lint
format
test setup
environment validation
CI skeleton
```

---

## Phase 2 — Design System

Implement:

```text
tokens
themes
typography
layout primitives
navigation primitives
focus/accessibility primitives
```

Verify Stage 1 visually before proceeding.

---

## Phase 3 — Content Domain

Implement:

```text
schemas
provider interface
repositories
queries
relationships
fixtures
content validation
```

---

## Phase 4 — Route Skeleton

Implement all Stage 2 routes.

Ensure:

```text
404
error boundaries
metadata
breadcrumbs
```

---

## Phase 5 — Static Experiences

Implement Stage 3–6 pages with static/semantic visual fallbacks first.

No WebGL priority yet.

---

## Phase 6 — Search

Implement:

```text
search documents
index pipeline
API
UI
filters
ID matching
```

---

## Phase 7 — Advanced Visualizations

Implement:

```text
Intelligence Field
Research Atlas
Cadence architecture
MedApp graph
ResearchOS architecture
```

Each receives:

```text
fallback
reduced motion
lazy loading
performance profile
```

---

## Phase 8 — CMS / Editorial Workflow

If CMS is required:

```text
adapter
preview
webhook revalidation
draft isolation
content ownership
```

Otherwise finalize MDX repository workflow.

---

## Phase 9 — Forms

Implement contact safely.

Only add careers uploads/application forms when required.

---

## Phase 10 — Observability / Analytics

Implement internal adapters, then selected providers.

Validate privacy before enabling production events.

---

## Phase 11 — Security Hardening

Implement/review:

```text
headers
CSP
secrets
rate limiting
webhooks
forms
dependency scan
preview access
```

---

## Phase 12 — Test Expansion

Complete:

```text
unit
integration
E2E
accessibility
visual regression
content leakage
```

---

## Phase 13 — Performance Pass

Measure production bundles and runtime.

Fix:

```text
waterfalls
global heavy imports
unnecessary client components
visualization cost
font/image issues
third-party overhead
```

---

## Phase 14 — CI/CD

Activate merge gates, preview deployments, production deployment, and smoke checks.

---

## Phase 15 — Production Readiness Review

Run every Stage 7 acceptance criterion and launch checklist.

---

# 150. Stage 7 Acceptance Criteria

## Architecture

- [ ] App, domain, repository, adapter, and presentation layers are separated.
- [ ] No CMS SDK is used directly in ordinary components.
- [ ] No analytics vendor SDK is scattered across feature components.
- [ ] Heavy visualizations have isolated bundles.
- [ ] Server components are the default for public content.

## Design System

- [ ] Stage 1 tokens exist in code.
- [ ] Semantic tokens exist.
- [ ] Typography styles are explicit.
- [ ] Focus primitives exist.
- [ ] Light/dark surfaces use the same semantic contracts.
- [ ] Components do not invent arbitrary local brand colors.

## Content

- [ ] Every public content type has a schema.
- [ ] Build-time/content validation exists.
- [ ] Relationship validation exists.
- [ ] Draft/private visibility is enforced at repository level.
- [ ] Broken critical content references fail CI.
- [ ] Rich content uses an allow-listed renderer.

## Search

- [ ] Search indexes only public content.
- [ ] Exact research/system IDs rank correctly.
- [ ] Search backend is abstracted.
- [ ] Search input is validated.
- [ ] Search has abuse limits.
- [ ] Search failure has graceful fallback.

## Caching

- [ ] Content cache strategy is documented.
- [ ] Entity-level invalidation exists where supported.
- [ ] Revalidation webhook is authenticated.
- [ ] Draft preview bypasses public discovery.
- [ ] Framework-specific cache APIs match the installed framework version.

## Client / Server Boundaries

- [ ] Entire app is not marked client-side.
- [ ] Client props are minimized.
- [ ] Independent server queries are parallelized.
- [ ] Heavy client features load only when required.
- [ ] No client-side fetch is used unnecessarily for static content.

## Motion / Visualization

- [ ] Every major visualization has a fallback.
- [ ] Continuous rendering pauses offscreen.
- [ ] Reduced motion works.
- [ ] SVG/Canvas is preferred over WebGL where sufficient.
- [ ] No meaningless continuous animation remains.
- [ ] Graph payloads contain only public presentation data.

## Security

- [ ] Environment variables are validated.
- [ ] Secrets are server-only.
- [ ] Security headers are configured.
- [ ] CSP is reviewed against actual dependencies.
- [ ] Contact is rate-limited and server-validated.
- [ ] Revalidation endpoints are authenticated.
- [ ] Search inputs are bounded.
- [ ] Dependency scanning runs.
- [ ] No sensitive data is logged.
- [ ] No private content appears in HTML/RSC payloads.

## Privacy

- [ ] Analytics excludes contact payloads.
- [ ] Analytics excludes health data.
- [ ] Contact collection is minimized.
- [ ] Privacy policy matches actual implementation.
- [ ] Cookie/consent behavior matches actual tracking.

## SEO

- [ ] Dynamic metadata works.
- [ ] Canonical URLs work.
- [ ] Sitemap contains only intended public content.
- [ ] Robots policy is correct.
- [ ] Structured data is type-correct.
- [ ] OG images work for major content types.

## Accessibility

- [ ] Skip link works.
- [ ] Keyboard navigation works.
- [ ] Focus remains visible.
- [ ] Complex visuals have semantic alternatives.
- [ ] Forms are labeled.
- [ ] Automated accessibility suite runs.
- [ ] Manual keyboard audit is complete.
- [ ] Reduced motion is verified.
- [ ] 200% zoom is verified.

## Testing

- [ ] Unit test suite exists.
- [ ] Integration suite exists.
- [ ] Critical Playwright flows exist.
- [ ] Visual regression exists.
- [ ] Accessibility tests exist.
- [ ] Draft leakage tests exist.
- [ ] Content fixture strategy exists.
- [ ] Link checks exist.

## Performance

- [ ] LCP target is measured.
- [ ] INP target is measured.
- [ ] CLS target is measured.
- [ ] Route bundle sizes are reviewed.
- [ ] Heavy libraries are route-scoped.
- [ ] Images have stable dimensions.
- [ ] Third-party scripts are deferred/minimized.
- [ ] Animation is profiled.
- [ ] Mid-range mobile experience is acceptable.

## CI/CD

- [ ] CI runs typecheck.
- [ ] CI runs lint.
- [ ] CI runs tests.
- [ ] CI validates content.
- [ ] CI builds production.
- [ ] CI runs critical E2E.
- [ ] CI runs accessibility.
- [ ] CI runs/reviews visual regression.
- [ ] Security scan is integrated.
- [ ] Preview deployments exist where supported.
- [ ] Production deployment is automated/controlled.
- [ ] Rollback process exists.

## Observability

- [ ] Frontend errors are observable.
- [ ] Server errors are observable.
- [ ] Contact failures are observable.
- [ ] Search failures are observable.
- [ ] Revalidation failures are observable.
- [ ] Performance metrics are observable.
- [ ] Logs do not contain sensitive payloads.

## Production

- [ ] Launch smoke test passes.
- [ ] Critical mobile routes pass.
- [ ] Contact works in production.
- [ ] Search works in production.
- [ ] Sitemap and robots are correct.
- [ ] Error pages work.
- [ ] Rollback is known.
- [ ] Runbooks exist for major dependencies.

---

# 151. Non-Goals for Stage 7

Stage 7 does not define the internal architecture of:

```text
Cadence application
MedApp healthcare platform
ResearchOS private platform
model serving infrastructure
agent runtimes
private research compute
internal employee systems
```

It defines only the production architecture of the **public Omnexa Labs web presence**.

---

# 152. Engineering Quality Bar

The website should be engineered so that:

```text
a new research program can be added without changing page architecture
a new system can be added without redesigning navigation
a CMS can replace MDX without rewriting pages
a search provider can change without rewriting search UI
an analytics provider can change without touching feature components
a visualization can fail without destroying content
a deployment can be rolled back safely
private content cannot leak through discovery
```

---

# 153. Final Production Architecture

Conceptual architecture:

```text
                           VISITOR
                              │
                              ▼
                    CDN / EDGE DELIVERY
                              │
                              ▼
                     NEXT.JS APPLICATION
                    ┌─────────┴─────────┐
                    │                   │
              SERVER CONTENT       CLIENT ISLANDS
                    │                   │
                    │            Motion / Atlas /
                    │            Graphs / Search
                    │
                    ▼
                 QUERIES
                    │
                    ▼
               REPOSITORIES
                    │
          ┌─────────┼──────────────┐
          │         │              │
          ▼         ▼              ▼
       CONTENT    SEARCH        SERVICES
       ADAPTER    ADAPTER        ADAPTERS
          │         │              │
          ▼         ▼              ▼
      MDX / CMS   INDEX       CONTACT / ANALYTICS
          │
          ▼
     RELATIONSHIP GRAPH

Cross-cutting:
────────────────────────────────────────
Design System
Validation
Caching
Security
SEO
Accessibility
Observability
Testing
CI/CD
Performance
────────────────────────────────────────
```

The production principle is:

> **Keep the content authoritative, the rendering fast, the interaction progressive, the architecture replaceable, and the public boundary explicit.**

---

# 154. Codex Completion Rule

Codex must not declare Stage 7 complete after implementing only the folder structure or successful production build.

Completion requires evidence that:

```text
the architecture works
the content relationships work
the advanced experiences degrade correctly
the site is visually faithful
the site is accessible
the site is secure
the site is observable
the site is performant
the deployment is repeatable
the rollback path exists
```

Stage 7 is complete only when the public Omnexa Labs website is ready to operate as a production research institution website rather than a frontend prototype.
