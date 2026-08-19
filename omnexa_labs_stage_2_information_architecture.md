# Omnexa Labs Website — Stage 2 Information Architecture

**Document type:** Implementation Specification  
**Audience:** Codex / Frontend Engineers / Product Designers / Content Engineers  
**Stage:** 2 — Information Architecture  
**Depends on:** `omnexa_labs_stage_1_visual_design_system.md`

---

## 1. Purpose

This document defines the information architecture for the public Omnexa Labs website.

The implementation must make Omnexa Labs feel like a frontier AI research and engineering institution rather than a conventional SaaS company.

The site must organize the public experience around:

```text
Research
    ↓
Technology
    ↓
Systems
    ↓
Impact
```

The architecture should make it easy for visitors to:

1. Understand what Omnexa Labs is.
2. Explore research areas and individual research programs.
3. Discover systems built from Omnexa research.
4. Read publications, experiments, research notes, and engineering insights.
5. Understand Omnexa's mission, principles, and people.
6. Discover career opportunities.
7. Navigate between related research, systems, publications, and insights.
8. Search the entire public knowledge surface.

The public site must not feel like:

```text
About → Services → Testimonials → Contact
```

There should be no generic “AI services company” information hierarchy.

---

# 2. Information Architecture Principles

## 2.1 Research First

Research must be a first-class top-level navigation category.

Research should not be buried inside “About” or “Blog”.

---

## 2.2 Systems, Not Product Cards

Cadence, MedApp, and future Omnexa technologies should live under a top-level `Systems` area.

Each system receives a case-study-like experience rather than a simple marketing product page.

---

## 2.3 Publications Are Knowledge Assets

Publications, experiments, research notes, and engineering articles are distinct content types.

Do not merge everything into a generic `Blog`.

---

## 2.4 Progressive Disclosure

The architecture should support multiple depths:

```text
Homepage
→ Domain
→ Program
→ Research project
→ Publication / experiment / artifact
```

Visitors who only want a high-level understanding must not be forced into technical detail.

Technical users must still be able to explore deeply.

---

## 2.5 Strong Cross-Linking

Research, systems, experiments, publications, people, and insights should be connected by explicit relationships.

Example:

```text
Research Program
    ├── related projects
    ├── related publications
    ├── related experiments
    ├── related systems
    └── researchers
```

Avoid isolated pages.

---

# 3. Top-Level Sitemap

```text
/
│
├── research/
│   ├── areas/
│   │   ├── developmental-intelligence/
│   │   ├── foundation-models/
│   │   ├── algorithms-mathematics/
│   │   └── ai-software-systems/
│   │
│   ├── programs/
│   │   └── [program-slug]/
│   │
│   ├── projects/
│   │   └── [project-slug]/
│   │
│   ├── experiments/
│   │   └── [experiment-id-or-slug]/
│   │
│   ├── publications/
│   │   └── [publication-slug]/
│   │
│   └── archive/
│
├── systems/
│   ├── cadence/
│   ├── medapp/
│   ├── researchos/
│   └── [future-system]/
│
├── insights/
│   ├── research-notes/
│   ├── engineering/
│   ├── perspectives/
│   ├── news/
│   └── [article-slug]/
│
├── company/
│   ├── about/
│   ├── mission/
│   ├── principles/
│   ├── people/
│   │   └── [person-slug]/
│   └── contact/
│
├── careers/
│   ├── open-roles/
│   │   └── [role-slug]/
│   ├── research/
│   ├── engineering/
│   └── culture/
│
├── search/
│
├── privacy/
├── terms/
└── 404
```

---

# 4. Primary Navigation

Desktop navigation should expose only the most important destinations.

```text
OMNEXA LABS

Research
Systems
Insights
Company
Careers

Search
Menu
```

Recommended primary navigation order:

```text
Research → Systems → Insights → Company → Careers
```

Rationale:

- `Research` establishes institutional identity.
- `Systems` demonstrates applied engineering.
- `Insights` exposes ongoing thinking.
- `Company` explains organization and mission.
- `Careers` supports recruitment.

Do not add `Home` to desktop navigation.

The logo links to `/`.

---

# 5. Full-Screen Menu Architecture

The expanded menu may expose deeper hierarchy.

```text
01 / RESEARCH

Research Areas
Programs
Projects
Experiments
Publications
Archive


02 / SYSTEMS

Cadence
MedApp
ResearchOS


03 / INSIGHTS

Research Notes
Engineering
Perspectives
News


04 / COMPANY

About
Mission
Principles
People
Contact


05 / CAREERS

Open Roles
Research
Engineering
Culture
```

Secondary utility links:

```text
GitHub
LinkedIn
Contact
Search
Privacy
```

---

# 6. Homepage Information Hierarchy

Route:

```text
/
```

The homepage is an institutional overview, not a content dump.

Recommended hierarchy:

```text
01  Hero / Manifesto
02  Institutional Definition
03  Research Areas
04  Featured Research
05  Research → Systems Transition
06  Systems
07  ResearchOS / Research Infrastructure
08  Latest Publications + Experiments
09  Research / Engineering Insights
10  Omnexa Operating Model
11  Careers / Join Omnexa
12  Footer Manifesto
```

The homepage must not show every possible piece of content.

Its purpose is to lead visitors into deeper areas.

---

# 7. Homepage Content Relationships

## Hero

Primary message:

```text
ADVANCING
INTELLIGENCE.
```

Supporting themes:

```text
learn
reason
build
discover
```

Primary CTA:

```text
Explore research →
```

Secondary CTA:

```text
Explore systems →
```

---

## Institutional Definition

This should answer:

```text
What is Omnexa Labs?
What does it research?
Why does it exist?
What does it build?
```

Keep this concise.

---

## Research Areas

Expose all four major research areas.

```text
01 Developmental Intelligence & Autonomous Research

02 Foundation Models & Machine Intelligence

03 Algorithms, Mathematics & Computational Discovery

04 AI for Software & Computational Systems
```

Each area links to its dedicated page.

---

## Featured Research

One to three important research programs/projects.

Do not render a carousel by default.

Prefer editorial composition.

---

## Research → Systems

Bridge research to applied engineering.

Message concept:

```text
RESEARCH
BECOMES
SYSTEMS.
```

Then introduce Cadence and MedApp.

---

## ResearchOS

ResearchOS may be publicly described as Omnexa's research infrastructure.

The public website should expose:

- vision,
- capabilities,
- architecture concepts,
- research workflow,
- selected screenshots/visualizations where appropriate.

The public site should **not** expose private internal data, credentials, experiment controls, or operational interfaces.

---

## Latest Knowledge

Show a mixed editorial feed of:

- publications,
- research notes,
- experiments,
- engineering insights.

Each item must clearly display its content type.

---

# 8. Research Architecture

Root:

```text
/research/
```

The Research landing page should present three layers:

```text
Research Areas
Research Programs
Research Output
```

---

# 9. Research Areas

Canonical area definitions:

## 9.1 Developmental Intelligence & Autonomous Research

Slug:

```text
/research/areas/developmental-intelligence/
```

Subdomains:

```text
Autonomous Data Intelligence
Scientific Knowledge & Education
Lifelong Model Learning
Autonomous Scientist Systems
```

---

## 9.2 Foundation Models & Machine Intelligence

Slug:

```text
/research/areas/foundation-models/
```

Subdomains:

```text
Language & Reasoning
Computer Vision & Multimodal Intelligence
Reinforcement Learning & Agents
Efficient Models & AI Infrastructure
```

---

## 9.3 Algorithms, Mathematics & Computational Discovery

Slug:

```text
/research/areas/algorithms-mathematics/
```

Subdomains:

```text
Algorithm Discovery
Automated Mathematics
AutoML
Architecture Discovery
Computational Discovery
```

---

## 9.4 AI for Software & Computational Systems

Slug:

```text
/research/areas/ai-software-systems/
```

Subdomains:

```text
Autonomous Software Engineering
AI Systems
Defensive Cybersecurity
Computational Infrastructure
```

---

# 10. Research Area Page Template

Each area page should contain:

```text
Area Header
Research Thesis
Subdomains
Active Programs
Featured Projects
Recent Experiments
Publications
Related Systems
Researchers
Related Insights
```

Suggested hierarchy:

```text
RESEARCH AREA / 01

DEVELOPMENTAL
INTELLIGENCE

[research thesis]

Subdomains

Active research programs

Selected projects

Latest experiments

Publications

Related systems

People working in this area
```

---

# 11. Research Program Model

Route:

```text
/research/programs/[program-slug]/
```

A research program represents a long-running thematic initiative.

Examples:

```text
Lifelong Model Learning
Autonomous Scientist Systems
Agentic Software Engineering
Machine Reasoning
```

Required content:

```text
title
slug
program_id
status
research_area
research_thesis
problem_statement
objectives
research_questions
methods
active_projects
experiments
publications
systems
team
timeline
related_topics
```

---

# 12. Research Project Model

Route:

```text
/research/projects/[project-slug]/
```

A project is narrower and more implementation-oriented than a program.

Required fields:

```text
project_id
title
slug
summary
status
research_area
program
problem
hypothesis
methodology
system_architecture
datasets
models
evaluation
current_results
limitations
next_steps
related_experiments
related_publications
related_systems
contributors
repository_url
external_links
created_at
updated_at
```

---

# 13. Research Identifiers

Research identifiers should be stable and visible.

Recommended pattern:

```text
OMX-{DOMAIN}-{NUMBER}
```

Examples:

```text
OMX-DI-001
OMX-FM-018
OMX-AM-007
OMX-SE-031
```

Suggested domain codes:

```text
DI = Developmental Intelligence
FM = Foundation Models
AM = Algorithms & Mathematics
SE = Software Engineering / Computational Systems
```

Program/project IDs must not be generated from page ordering.

They should remain stable over time.

---

# 14. Research Status Taxonomy

Allowed statuses:

```text
proposed
experimental
active
validating
published
paused
archived
```

UI labels:

```text
PROPOSED
EXPERIMENTAL
ACTIVE
VALIDATING
PUBLISHED
PAUSED
ARCHIVED
```

Status should be stored as structured metadata, not hardcoded text.

---

# 15. Experiments

Root:

```text
/research/experiments/
```

Detail:

```text
/research/experiments/[experiment-id]/
```

Experiments should feel more technical than standard articles.

Required fields:

```text
experiment_id
title
slug
status
research_project
research_program
objective
hypothesis
setup
dataset
model
compute
parameters
metrics
results
visualizations
observations
conclusion
limitations
artifacts
started_at
completed_at
contributors
```

Suggested display:

```text
OMX-EXP-0032
STATUS / VALIDATING
STARTED / 2026-08-04

OBJECTIVE
...

SETUP
...

RESULTS
...

ARTIFACTS
...
```

---

# 16. Publications

Root:

```text
/research/publications/
```

Detail:

```text
/research/publications/[publication-slug]/
```

Publication types:

```text
paper
technical-report
whitepaper
dataset-paper
benchmark
research-brief
```

Required metadata:

```text
title
slug
publication_id
publication_type
abstract
authors
research_area
program
projects
publication_date
pdf_url
doi
citation
repository_url
datasets
models
related_experiments
related_systems
```

Publication pages should support:

```text
Abstract
Authors
Key findings
Method
Figures
Citation
PDF
Code
Related research
```

---

# 17. Research Archive

Route:

```text
/research/archive/
```

Purpose:

Provide a high-density searchable/filterable interface.

Filters:

```text
research area
subdomain
content type
status
year
researcher
system
tag
```

Sort:

```text
newest
oldest
recently updated
alphabetical
```

Archive entries may contain:

```text
Program
Project
Experiment
Publication
```

---

# 18. Systems Architecture

Root:

```text
/systems/
```

Systems landing page should answer:

```text
What technologies has Omnexa built from its research?
```

Current public system architecture:

```text
Systems
├── Cadence
├── MedApp
└── ResearchOS
```

Future systems must be data-driven and automatically included from the CMS/content source.

Do not hardcode the entire systems directory into a page component.

---

# 19. System Page Template

Route:

```text
/systems/[system-slug]/
```

Each system page should support:

```text
System Manifesto
Problem
Research Foundation
What the System Is
Core Capabilities
System Architecture
How It Works
Technical Differentiators
Use Cases
Research Connections
Development Status
Selected Media
Related Insights
Related Publications
CTA
```

System metadata:

```text
system_id
title
slug
tagline
summary
status
category
launch_status
research_areas
research_programs
capabilities
architecture
related_publications
related_projects
related_insights
external_url
repository_url
media
```

---

# 20. Cadence Route

```text
/systems/cadence/
```

Information should focus on:

```text
Autonomous software engineering
Specialized engineering agents
Coordinated delivery
Planning → Build → Run → Deploy → Monitor
Human-AI collaboration
Engineering systems
```

Cadence should have a distinct interactive architecture experience while retaining Omnexa's master visual system.

---

# 21. MedApp Route

```text
/systems/medapp/
```

Information should focus on:

```text
Medical intelligence
Knowledge graph
Patient context
Medical agents
Clinical knowledge
Healthcare workflows
```

Avoid medical claims that are not supported by actual product capabilities.

---

# 22. ResearchOS Route

```text
/systems/researchos/
```

Public content should describe the platform conceptually.

Possible sections:

```text
Why Research Needs an Operating System
Knowledge
Datasets
Experiments
Agents
Compute
Evaluation
Reproducibility
Human-AI Research
Publication
```

Internal functionality must remain separate from the public marketing/institutional page.

---

# 23. Insights Architecture

Root:

```text
/insights/
```

This replaces the conventional `Blog`.

Categories:

```text
Research Notes
Engineering
Perspectives
News
```

---

# 24. Research Notes

Route:

```text
/insights/research-notes/
```

Purpose:

Shorter technical observations that are not full publications.

Examples:

```text
experiment commentary
research hypotheses
methodological notes
model observations
dataset findings
research retrospectives
```

---

# 25. Engineering Insights

Route:

```text
/insights/engineering/
```

Content examples:

```text
engineering architecture
ML infrastructure
agent systems
distributed systems
data infrastructure
MLOps
research tooling
system reliability
```

---

# 26. Perspectives

Route:

```text
/insights/perspectives/
```

For:

```text
long-form views
AI research direction
responsible AI
industry transformation
future systems
scientific commentary
```

---

# 27. News

Route:

```text
/insights/news/
```

For institutional updates:

```text
product announcements
research releases
partnerships
events
company milestones
new publications
```

Do not mix news into research notes.

---

# 28. Insight Article Model

Route:

```text
/insights/[article-slug]/
```

Fields:

```text
title
slug
type
excerpt
body
authors
published_at
updated_at
hero_media
research_areas
research_programs
systems
tags
related_content
seo
```

---

# 29. Company Architecture

Root:

```text
/company/
```

Sections:

```text
About
Mission
Principles
People
Contact
```

---

# 30. Company / About

Route:

```text
/company/about/
```

Should explain:

```text
what Omnexa Labs is
what Omnexa researches
what Omnexa builds
institutional structure
where Omnexa operates
long-term ambition
```

Avoid generic corporate history unless meaningful.

---

# 31. Mission

Route:

```text
/company/mission/
```

This should be manifesto-like.

Topics:

```text
why intelligence research matters
research-to-system philosophy
long-term orientation
science and engineering
impact
```

---

# 32. Principles

Route:

```text
/company/principles/
```

Possible categories:

```text
Scientific rigor
Engineering excellence
Responsible development
Evidence over hype
Open inquiry
Human benefit
Long-term thinking
Reproducibility
Security
```

Principles should only contain commitments Omnexa intends to follow.

---

# 33. People

Root:

```text
/company/people/
```

Person detail:

```text
/company/people/[person-slug]/
```

Person model:

```text
name
slug
role
team
bio
research_areas
projects
publications
systems
portrait
github
linkedin
personal_site
```

A person page should automatically display their related research and publications.

---

# 34. Careers Architecture

Root:

```text
/careers/
```

The careers landing page should communicate:

```text
Mission
Research environment
Engineering environment
Culture
How Omnexa works
Open roles
```

Subroutes:

```text
/careers/open-roles/
/careers/research/
/careers/engineering/
/careers/culture/
```

---

# 35. Job Detail Page

Route:

```text
/careers/open-roles/[role-slug]/
```

Fields:

```text
title
slug
department
team
location
employment_type
work_mode
summary
mission
responsibilities
requirements
preferred
research_areas
systems
application_url
status
published_at
closing_date
```

Do not render closed roles in the primary careers list.

---

# 36. Contact

Route:

```text
/company/contact/
```

Contact types can include:

```text
Research collaboration
Partnership
Careers
Press
General inquiry
```

Use structured routing rather than one generic form where practical.

---

# 37. Search

Route:

```text
/search/
```

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
careers
```

Search results must visibly show content type.

Example:

```text
PUBLICATION
Continual Learning for Autonomous Agents
OMX-PUB-013

PROJECT
Autonomous Scientist Runtime
OMX-DI-007

SYSTEM
Cadence
```

---

# 38. Search Filters

Recommended filters:

```text
Content type
Research area
System
Year
Author
Status
```

Search should support keyboard navigation.

---

# 39. URL Rules

URLs must be:

- lowercase,
- semantic,
- stable,
- hyphenated,
- human readable.

Correct:

```text
/research/projects/lifelong-agent-memory/
```

Avoid:

```text
/research/project?id=4718
```

Research IDs may appear visually without being the only URL identifier.

---

# 40. Breadcrumbs

Use breadcrumbs on deep pages.

Example:

```text
Research
/
Developmental Intelligence
/
Lifelong Model Learning
/
Project Name
```

Breadcrumbs should be available in both UI and structured data.

Do not show them prominently on the homepage or major landing pages.

---

# 41. Cross-Linking Rules

Every detail page should expose relevant connected entities.

## Research project

Must link to:

```text
research area
program
experiments
publications
systems
contributors
```

## Publication

Must link to:

```text
authors
research program
projects
experiments
code
datasets
```

## System

Must link to:

```text
research areas
research programs
publications
engineering insights
```

## Person

Must link to:

```text
projects
publications
systems
research areas
```

---

# 42. Related Content Algorithm

Related content should prioritize:

```text
1. explicit editorial relationships
2. same research program
3. same research area
4. shared system
5. shared tags
6. recency
```

Do not rely exclusively on tag similarity.

---

# 43. Taxonomy

Core taxonomy dimensions:

```text
content_type
research_area
subdomain
program
system
status
year
person
topic
```

Avoid uncontrolled free-form tags becoming the primary information architecture.

Tags should supplement structured categories.

---

# 44. Content Types

Canonical content types:

```text
research_area
research_program
research_project
experiment
publication
system
insight
person
job
news
```

Each type should have its own schema.

Do not store all content in one generic “page” model.

---

# 45. Content Layer Architecture

Recommended separation:

```text
Content Source
    ↓
Validation Schema
    ↓
Repository / Query Layer
    ↓
Page Composition
    ↓
Presentation Components
```

Example:

```text
CMS / MDX
    ↓
Zod schema
    ↓
content service
    ↓
route loader
    ↓
page template
```

Do not query the CMS directly from every UI component.

---

# 46. Recommended Content Storage Strategy

For the first implementation, either of these is acceptable:

## Option A — MDX + Typed Metadata

Best for:

```text
small team
developer-controlled research content
version-controlled publications
fast implementation
```

Example:

```text
content/
├── research/
│   ├── areas/
│   ├── programs/
│   ├── projects/
│   ├── experiments/
│   └── publications/
├── systems/
├── insights/
├── people/
└── careers/
```

---

## Option B — Headless CMS

Best when:

```text
non-engineers publish frequently
large publication volume
complex editorial workflow
scheduled publishing
multiple editors
```

The frontend architecture must remain CMS-agnostic.

---

# 47. Suggested Content Schema Directory

```text
src/
└── content/
    ├── schemas/
    │   ├── research-area.schema.ts
    │   ├── research-program.schema.ts
    │   ├── research-project.schema.ts
    │   ├── experiment.schema.ts
    │   ├── publication.schema.ts
    │   ├── system.schema.ts
    │   ├── insight.schema.ts
    │   ├── person.schema.ts
    │   └── job.schema.ts
    │
    ├── repositories/
    │   ├── research.repository.ts
    │   ├── publications.repository.ts
    │   ├── systems.repository.ts
    │   ├── insights.repository.ts
    │   └── people.repository.ts
    │
    ├── queries/
    ├── relationships/
    └── search/
```

---

# 48. Recommended Route Structure — Next.js

If using Next.js App Router:

```text
src/app/
├── (site)/
│   ├── page.tsx
│   │
│   ├── research/
│   │   ├── page.tsx
│   │   ├── areas/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── programs/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── experiments/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── publications/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── archive/
│   │       └── page.tsx
│   │
│   ├── systems/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── insights/
│   │   ├── page.tsx
│   │   ├── research-notes/
│   │   ├── engineering/
│   │   ├── perspectives/
│   │   ├── news/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── company/
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── mission/
│   │   ├── principles/
│   │   ├── people/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── contact/
│   │
│   ├── careers/
│   │   ├── page.tsx
│   │   ├── open-roles/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── research/
│   │   ├── engineering/
│   │   └── culture/
│   │
│   └── search/
│       └── page.tsx
│
├── privacy/
├── terms/
├── sitemap.ts
├── robots.ts
├── layout.tsx
├── not-found.tsx
└── error.tsx
```

---

# 49. Page Template Architecture

Create reusable page-level templates.

```text
src/components/templates/
├── research-area-template/
├── research-program-template/
├── research-project-template/
├── experiment-template/
├── publication-template/
├── system-template/
├── insight-template/
├── person-template/
└── job-template/
```

Page templates should compose smaller components.

Do not create a monolithic universal page renderer.

---

# 50. Navigation Components

```text
src/components/navigation/
├── site-header.tsx
├── site-logo.tsx
├── desktop-nav.tsx
├── mobile-nav.tsx
├── mega-menu.tsx
├── search-trigger.tsx
├── breadcrumb.tsx
├── section-nav.tsx
└── footer-nav.tsx
```

---

# 51. Discovery Components

```text
src/components/discovery/
├── research-explorer.tsx
├── research-filter.tsx
├── archive-filter.tsx
├── search-results.tsx
├── related-content.tsx
├── publication-index.tsx
├── experiment-index.tsx
└── system-index.tsx
```

---

# 52. Global Footer Structure

The footer should contain:

```text
Omnexa Labs
Research
Systems
Insights
Company
Careers

GitHub
LinkedIn

Accra, Ghana

Privacy
Terms
Copyright
```

Optional final statement:

```text
WE'RE BUILDING
WHAT COMES NEXT.
```

Avoid a large number of marketing links.

---

# 53. User Journey — Researcher

Target journey:

```text
Homepage
→ Research
→ Research Area
→ Program
→ Project
→ Publication
→ Code / artifact
```

Success:

The visitor can understand both the research context and the technical output.

---

# 54. User Journey — Engineer

```text
Homepage
→ Systems
→ Cadence
→ Architecture
→ Related Engineering Insight
→ GitHub / technical artifact
```

Success:

The visitor understands that Omnexa builds real engineering systems.

---

# 55. User Journey — Potential Candidate

```text
Homepage
→ Company
→ Mission
→ People
→ Careers
→ Open Role
→ Apply
```

Success:

The candidate understands both mission and technical environment before applying.

---

# 56. User Journey — Investor / Partner / Collaborator

```text
Homepage
→ Research
→ Systems
→ Company
→ Contact
```

Success:

The visitor sees evidence of technical depth before reaching a commercial/contact path.

---

# 57. Mobile Information Architecture

Mobile should preserve the same hierarchy but change presentation.

Primary mobile menu:

```text
Research
Systems
Insights
Company
Careers
```

Each may expand into nested navigation.

Do not display the full desktop mega menu shrunk into a phone viewport.

---

# 58. Mobile Research Navigation

Recommended pattern:

```text
RESEARCH

01 Developmental Intelligence
02 Foundation Models
03 Algorithms & Mathematics
04 AI for Software Systems

Explore all research →
```

Then users enter a research area.

Avoid multiple nested overlay menus where possible.

---

# 59. SEO Architecture

Every indexable page requires:

```text
title
description
canonical_url
open_graph_title
open_graph_description
open_graph_image
twitter_card
robots
```

Dynamic detail pages must generate metadata from structured content.

---

# 60. Structured Data

Where relevant, use Schema.org structured data.

Examples:

```text
Organization
Person
Article
ScholarlyArticle
JobPosting
BreadcrumbList
WebSite
SearchAction
```

Do not label informal research notes as scholarly publications.

---

# 61. Sitemap Generation

Generate sitemap automatically from content.

Include:

```text
static routes
research areas
programs
projects
experiments
publications
systems
insights
people
jobs
```

Do not maintain sitemap URLs manually.

---

# 62. Robots and Indexing

Public institutional content:

```text
index
follow
```

Do not index:

```text
preview routes
draft content
internal tooling
private ResearchOS pages
test routes
development-only routes
```

---

# 63. Content Visibility

Every content entity should support:

```text
draft
public
unlisted
private
archived
```

These are visibility states and are separate from research status.

Example:

```text
research status = active
visibility = public
```

---

# 64. Draft Preview

If a CMS is used, support secure draft preview.

Draft pages must:

```text
not appear in sitemap
not appear in search
use noindex
require authorized preview access
```

---

# 65. Empty States

Every dynamic index must support an intentional empty state.

Examples:

```text
No open roles
No publications for this filter
No matching experiments
No search results
```

Do not render broken blank regions.

---

# 66. 404 Information Architecture

404 should preserve institutional identity.

Suggested content:

```text
404
SIGNAL LOST.

The page you're looking for could not be found.

Return home →
Explore research →
Search →
```

Do not make the 404 an unrelated joke.

---

# 67. Search Empty State

Example:

```text
NO RESULTS

Try:
- a broader research topic
- another system name
- a researcher
- a publication title
```

---

# 68. Content Loading Strategy

Index pages should load progressively.

Prioritize:

```text
page heading
primary content
filters
first result set
```

Heavy research visualizations should not block initial content rendering.

---

# 69. Performance Rules for IA

Avoid:

```text
loading entire publication archive client-side
loading every experiment into homepage
rendering all related content eagerly
```

Use:

```text
server-side querying
pagination
incremental loading
static generation where appropriate
cached content relationships
```

---

# 70. Pagination

Large archives should use stable pagination.

Recommended:

```text
?page=2
```

or cursor-based data fetching with crawlable page URLs.

Infinite scroll may supplement pagination but should not be the only navigation mechanism.

---

# 71. Filters and URL State

Filters should be shareable where practical.

Example:

```text
/research/archive/?area=foundation-models&type=publication&year=2026
```

Do not keep important discovery state exclusively in JavaScript memory.

---

# 72. Analytics Events

Track navigation and discovery behavior without polluting the component architecture.

Suggested events:

```text
navigation_click
research_area_open
research_project_open
publication_open
publication_download
experiment_open
system_open
related_content_click
search_submit
search_result_click
filter_apply
job_open
application_click
external_repository_click
```

Events should include structured IDs where available.

Example:

```json
{
  "event": "research_project_open",
  "project_id": "OMX-DI-007",
  "research_area": "developmental-intelligence"
}
```

---

# 73. Content Governance

Required editorial rules:

1. Every research project has a research area.
2. Every experiment belongs to a project or program.
3. Every publication must have author metadata.
4. Every system must declare its research relationships.
5. Every public page has an owner.
6. Every page has a last-reviewed date internally.
7. Draft content never leaks into public indexes.
8. Archived research remains addressable unless legally/security-required to remove.

---

# 74. Naming Rules

Prefer:

```text
Research
Systems
Insights
Company
Careers
```

Avoid generic startup terminology:

```text
Solutions
Features
Resources
Customers
Why Us
```

unless a future business requirement specifically justifies them.

---

# 75. Homepage Exclusions

Do not include by default:

```text
pricing tables
customer logos without real partnerships
fake testimonials
generic feature grids
FAQ immediately after hero
"trusted by thousands" claims
random AI statistics
generic newsletter popups
```

---

# 76. Public vs Internal Boundaries

The public website may describe internal technical capabilities without exposing operational surfaces.

Examples:

Public:

```text
ResearchOS supports experiment tracking.
```

Private:

```text
actual internal experiment dashboard
private datasets
internal agent sessions
API keys
compute control
researcher notes
unpublished findings
security details
```

Architecture must maintain this boundary.

---

# 77. Recommended Component-to-Content Relationship

Bad:

```text
CadencePage.tsx
contains all Cadence copy directly
```

Preferred:

```text
Cadence content entity
        ↓
system repository
        ↓
system page template
        ↓
Cadence-specific interactive modules
```

This keeps content editable and reusable.

---

# 78. Static vs Dynamic Pages

Mostly static/generated:

```text
research area
program
project
publication
system
insight
company pages
people
job detail
```

Dynamic/search-driven:

```text
global search
research archive
filters
publication index
experiment index
job listing
```

---

# 79. Internationalization Readiness

The first version may be English-only.

However:

- do not concatenate UI strings in ways that prevent translation,
- keep navigation labels centralized,
- use locale-aware date formatting,
- avoid hardcoding English copy into low-level components.

Do not implement full i18n unless required.

---

# 80. Accessibility Requirements

Information architecture must remain usable with:

```text
keyboard only
screen reader
reduced motion
high zoom
mobile touch
JavaScript-degraded rendering where practical
```

Requirements:

- semantic landmarks,
- one logical H1 per page,
- hierarchical headings,
- skip navigation link,
- visible focus,
- semantic links,
- descriptive link labels,
- breadcrumb semantics,
- no interaction that requires hover only.

---

# 81. Heading Hierarchy

Example research page:

```text
H1 Developmental Intelligence

H2 Research Thesis
H2 Research Programs
    H3 Lifelong Model Learning
    H3 Autonomous Scientist Systems
H2 Selected Projects
H2 Publications
H2 Researchers
```

Do not use heading levels for visual size alone.

---

# 82. Recommended Frontend Architecture

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── typography/
│   ├── research/
│   ├── systems/
│   ├── insights/
│   ├── company/
│   ├── careers/
│   ├── discovery/
│   ├── visualization/
│   ├── motion/
│   ├── templates/
│   └── primitives/
│
├── content/
│   ├── schemas/
│   ├── repositories/
│   ├── queries/
│   ├── relationships/
│   └── search/
│
├── data/
├── hooks/
├── lib/
│   ├── analytics/
│   ├── seo/
│   ├── search/
│   ├── metadata/
│   └── accessibility/
│
├── styles/
└── types/
```

---

# 83. Recommended Domain Types

```ts
type ContentVisibility =
  | "draft"
  | "public"
  | "unlisted"
  | "private"
  | "archived";

type ResearchStatus =
  | "proposed"
  | "experimental"
  | "active"
  | "validating"
  | "published"
  | "paused"
  | "archived";

type ResearchAreaCode =
  | "DI"
  | "FM"
  | "AM"
  | "SE";
```

Actual implementation should place these in shared domain types.

---

# 84. Relationship Model

Conceptual relationship graph:

```text
ResearchArea
    ↓
ResearchProgram
    ↓
ResearchProject
    ↓
Experiment
    ↓
Publication

ResearchProject ↔ System

Person ↔ ResearchProgram
Person ↔ ResearchProject
Person ↔ Publication

Insight ↔ ResearchArea
Insight ↔ System
```

Do not model the content purely as a tree.

The website is a graph with hierarchical entry points.

---

# 85. Navigation State

The header should know the active top-level section.

Examples:

```text
/research/... → Research active
/systems/...  → Systems active
/insights/... → Insights active
```

Deep route navigation should preserve context through breadcrumbs and section navigation.

---

# 86. Section Navigation

Long institutional pages may use local section navigation.

Example system page:

```text
Overview
Research
Architecture
Capabilities
Insights
```

This should be sticky on desktop only when useful.

On mobile, prefer compact anchored navigation.

---

# 87. Search Index Document

Search indexing may normalize entities into:

```ts
type SearchDocument = {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  researchAreas?: string[];
  systems?: string[];
  people?: string[];
  tags?: string[];
  status?: string;
  publishedAt?: string;
};
```

Do not expose private entities to the public search index.

---

# 88. Content IDs vs Slugs

Use both.

Example:

```text
id: OMX-DI-007
slug: lifelong-agent-memory
```

`id` is institutional identity.

`slug` is human-readable routing.

Never use a mutable title as the database primary key.

---

# 89. Content Dates

Support:

```text
created_at
published_at
updated_at
```

Experiments additionally support:

```text
started_at
completed_at
```

Display dates according to content type.

Do not label `updated_at` as publication date.

---

# 90. Visual IA Metadata

Metadata presentation should use the Stage 1 visual system.

Example:

```text
RESEARCH / PROJECT

OMX-DI-007
STATUS / ACTIVE
UPDATED / 14 AUG 2026
```

This reinforces institutional structure without introducing new visual conventions.

---

# 91. Content Ordering

Do not rely on filesystem order.

Indexes should support explicit fields:

```text
featured
priority
published_at
updated_at
display_order
```

Use `display_order` sparingly for curated landing pages.

---

# 92. Featured Content

Homepage and landing-page features should be editorially controlled.

Example:

```ts
featured: true
featuredPriority: 10
```

Do not infer homepage prominence solely from recency.

---

# 93. Future-Proofing

The architecture must support future additions without redesigning navigation fundamentals.

Potential future entities:

```text
Datasets
Models
Benchmarks
Open-source tools
Events
Research fellowships
Partner labs
```

These should be addable beneath `Research`, `Systems`, or `Company` depending on purpose.

Do not prematurely expose empty top-level navigation categories.

---

# 94. Information Architecture Acceptance Criteria

The implementation passes Stage 2 when:

- [ ] Every top-level route exists.
- [ ] Navigation reflects the approved hierarchy.
- [ ] Deep routes have correct breadcrumbs.
- [ ] Research Areas are data-driven.
- [ ] Research Programs are data-driven.
- [ ] Research Projects are data-driven.
- [ ] Experiments use a dedicated schema.
- [ ] Publications use a dedicated schema.
- [ ] Systems use a dedicated schema.
- [ ] Insights are separate from publications.
- [ ] People connect to research and publications.
- [ ] Jobs use structured content.
- [ ] Search spans all approved public content types.
- [ ] Filters preserve shareable state where appropriate.
- [ ] Draft/private content is excluded from public discovery.
- [ ] Sitemap generation is automatic.
- [ ] Metadata generation is automatic for dynamic routes.
- [ ] Related content uses structured relationships.
- [ ] Mobile navigation preserves the same hierarchy.
- [ ] ResearchOS public/internal boundaries are enforced.
- [ ] Accessibility landmarks and heading hierarchy are correct.
- [ ] No generic `Services`, `Solutions`, or `Features` architecture has been introduced without an explicit requirement.

---

# 95. Codex Implementation Sequence

Codex should implement Stage 2 in this order.

## Phase 1 — Domain Model

Create:

```text
types
schemas
content visibility
research status
IDs
relationships
```

Do not build visual pages first.

---

## Phase 2 — Routing Skeleton

Implement:

```text
research
systems
insights
company
careers
search
```

Add nested dynamic routes.

Use placeholder content only temporarily.

---

## Phase 3 — Content Repository

Implement a provider-independent content interface.

Example:

```ts
interface ResearchRepository {
  getAreas(): Promise<ResearchArea[]>;
  getAreaBySlug(slug: string): Promise<ResearchArea | null>;
  getPrograms(): Promise<ResearchProgram[]>;
  getProgramBySlug(slug: string): Promise<ResearchProgram | null>;
  getProjects(): Promise<ResearchProject[]>;
  getProjectBySlug(slug: string): Promise<ResearchProject | null>;
}
```

The page layer should not depend directly on CMS internals.

---

## Phase 4 — Navigation

Build:

```text
SiteHeader
DesktopNav
MobileNav
MegaMenu
Breadcrumb
Footer
```

Verify active-route behavior.

---

## Phase 5 — Page Templates

Implement templates for:

```text
Research Area
Research Program
Research Project
Experiment
Publication
System
Insight
Person
Job
```

---

## Phase 6 — Relationship Layer

Implement helpers for:

```text
related research
related publications
related systems
related people
related insights
```

---

## Phase 7 — Discovery

Implement:

```text
Research Archive
Publication Index
Experiment Index
Systems Index
Global Search
Filters
Pagination
```

---

## Phase 8 — Metadata + SEO

Implement:

```text
dynamic metadata
canonical URLs
structured data
sitemap
robots
breadcrumbs
```

---

## Phase 9 — Accessibility + Mobile

Verify:

```text
keyboard navigation
semantic landmarks
screen reader hierarchy
mobile menus
touch behavior
reduced motion compatibility
```

---

## Phase 10 — Stage 2 Verification

Run all Stage 2 acceptance criteria before moving to Stage 3 homepage implementation.

---

# 96. Non-Goals for Stage 2

Do not yet implement:

```text
full homepage cinematic animations
WebGL intelligence field
final photography
complete Cadence animation
complete MedApp visualization
ResearchOS animated architecture
final production copy
backend application forms
private ResearchOS platform
```

Those belong to later stages.

Stage 2 is responsible for:

```text
structure
routes
schemas
relationships
navigation
discovery
content hierarchy
```

---

# 97. Final Architecture Principle

The Omnexa Labs website must behave less like a collection of marketing pages and more like a navigable institutional knowledge system.

The conceptual architecture is:

```text
                    OMNEXA LABS
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     RESEARCH          SYSTEMS         COMPANY
        │                │                │
   ┌────┼────┐      ┌────┼────┐      ┌────┼────┐
 Areas Programs      Cadence MedApp   Mission People
        │             ResearchOS             Careers
     Projects
        │
   Experiments
        │
   Publications
        │
      └──────────→ INSIGHTS ←──────────┘
```

Every major entity should be discoverable both hierarchically and relationally.

That architecture gives Omnexa enough structure to grow from a small research lab website into a substantial public research knowledge surface without replacing the foundation later.
