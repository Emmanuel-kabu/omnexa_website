# Omnexa Labs Website — Stage 4 Research Experience

**Document type:** Implementation Specification  
**Audience:** Codex / Frontend Engineers / Product Designers / Research Platform Engineers / Content Engineers  
**Stage:** 4 — Research Experience  
**Depends on:**
- `omnexa_labs_stage_1_visual_design_system.md`
- `omnexa_labs_stage_2_information_architecture.md`
- `omnexa_labs_stage_3_homepage_experience.md`

---

# 1. Objective

Stage 4 defines the complete public research experience for Omnexa Labs.

The research section must function as:

```text
an institutional research index
+
a navigable knowledge graph
+
an interactive research atlas
+
a publication and experiment archive
+
a technical storytelling system
```

It must not feel like:

```text
a blog
a services page
a four-card category grid
a generic list of research interests
a static academic department directory
```

The research experience should make visitors feel that Omnexa is an active, evolving research institution with real programs, projects, experiments, technical outputs, and relationships between them.

---

# 2. Research Experience Goals

A visitor should be able to answer:

```text
What does Omnexa research?
Why does it matter?
What specific questions are being investigated?
Which projects and experiments exist?
What has been published?
Which systems came from the research?
Who is working on it?
How is one body of work related to another?
What is active now?
What happened historically?
```

The architecture must support both:

```text
high-level institutional browsing
```

and:

```text
deep technical investigation
```

without forcing either audience into the other's preferred level of detail.

---

# 3. Research Route Map

Canonical research routes:

```text
/research/
│
├── areas/
│   ├── developmental-intelligence/
│   ├── foundation-models/
│   ├── algorithms-mathematics/
│   └── ai-software-systems/
│
├── programs/
│   └── [program-slug]/
│
├── projects/
│   └── [project-slug]/
│
├── experiments/
│   ├── page
│   └── [experiment-slug]/
│
├── publications/
│   ├── page
│   └── [publication-slug]/
│
└── archive/
```

These are hierarchical entry points into a relationship graph.

---

# 4. Research Conceptual Model

The primary hierarchy:

```text
Research Area
    ↓
Research Program
    ↓
Research Project
    ↓
Experiment
    ↓
Publication
```

The actual relationship graph:

```text
Research Area
    ↕
Program
    ↕
Project
    ↕
Experiment
    ↕
Publication
    ↕
System
    ↕
Person
    ↕
Insight
```

Codex must not model research as a pure tree.

---

# 5. Canonical Research Areas

## 5.1 Developmental Intelligence & Autonomous Research

Route:

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

Research intent:

> Study intelligent systems that can accumulate knowledge, improve over time, work with scientific information, and participate in increasingly autonomous research and discovery.

---

## 5.2 Foundation Models & Machine Intelligence

Route:

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

Research intent:

> Advance the models, learning systems, multimodal capabilities, agent architectures, evaluation methods, and infrastructure required for increasingly capable machine intelligence.

---

## 5.3 Algorithms, Mathematics & Computational Discovery

Route:

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

Research intent:

> Investigate how intelligent systems can search, reason, optimize, discover algorithms, assist mathematical work, and uncover computational structures that are difficult to derive manually.

---

## 5.4 AI for Software & Computational Systems

Route:

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

Research intent:

> Develop intelligent systems capable of engineering, testing, securing, operating, and improving complex software and computational environments.

---

# 6. Research Landing Page

Route:

```text
/research/
```

Purpose:

The research landing page is the front door to the lab's public research knowledge system.

It should not simply duplicate the homepage Research section.

Its role is to provide:

```text
orientation
current research state
research area exploration
featured programs
active experiments
recent publications
research map
archive entry
```

---

# 7. Research Landing Page Narrative

Canonical order:

```text
01  Research Hero
02  Research Thesis
03  Interactive Research Atlas
04  Research Areas
05  Active Programs
06  Research in Progress
07  Publications
08  Research → Systems
09  Researchers
10  Archive / Explore Everything
11  Research Footer Transition
```

---

# 8. Research Hero

Primary headline:

```text
RESEARCHING
INTELLIGENCE.
```

Alternative accepted composition:

```text
THE SCIENCE
OF INTELLIGENCE.
```

Preferred default:

```text
RESEARCHING
INTELLIGENCE.
```

Supporting copy:

> Omnexa Labs studies how intelligent systems learn, reason, adapt, discover, build, and operate — and how those capabilities can be engineered into real-world systems.

Metadata:

```text
RESEARCH / OMX
AREAS / 04
STATUS / ACTIVE
```

Do not display fabricated counts.

Use real counts only when backed by the content repository.

CTA:

```text
Explore the research atlas ↓
```

---

# 9. Research Hero Visual

The hero should evolve the Stage 3 Intelligence Field into a more structured research topology.

Concept:

```text
Research Area nodes
    ↓
Programs
    ↓
Projects
    ↓
Experiments
```

The visual should resemble a living institutional knowledge map, not a decorative constellation.

At initial load:

```text
4 large domain structures
```

Within each:

```text
program-level clusters
```

On interaction:

```text
highlight selected branch
dim unrelated branches
surface metadata
```

---

# 10. Research Thesis Section

Headline:

```text
INTELLIGENCE
IS NOT ONE
PROBLEM.
```

Supporting copy:

> Learning, reasoning, memory, perception, planning, discovery, engineering, and adaptation are deeply connected research problems. Omnexa studies them as parts of a larger system rather than isolated capabilities.

Secondary statement:

> Our research spans foundational models and algorithms through autonomous systems, scientific discovery, software engineering, and the infrastructure required to make advanced intelligence reliable.

This section should be mostly editorial and typographic.

---

# 11. Interactive Research Atlas

The **Research Atlas** is the signature interaction of Stage 4.

It is the primary high-level research discovery interface.

Route location:

```text
/research/#atlas
```

The atlas is not a separate application.

It should be usable directly in the public research page.

---

# 12. Research Atlas Goals

The atlas should allow users to explore:

```text
research areas
subdomains
programs
projects
experiments
publications
systems
people
```

without presenting every entity at once.

The interaction must progressively disclose complexity.

---

# 13. Atlas Hierarchy

Level 0:

```text
OMNEXA RESEARCH
```

Level 1:

```text
4 Research Areas
```

Level 2:

```text
Subdomains
```

Level 3:

```text
Programs
```

Level 4:

```text
Projects
```

Supporting relationships:

```text
Experiments
Publications
Systems
People
```

---

# 14. Atlas Desktop Layout

Suggested layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ RESEARCH ATLAS                              FILTER / SEARCH  │
├─────────────────┬────────────────────────────────────────────┤
│                 │                                            │
│ AREAS           │         INTERACTIVE RESEARCH MAP           │
│                 │                                            │
│ 01 Developmental│                 ●──●                       │
│ 02 Foundation   │            ●────●     ●                    │
│ 03 Algorithms   │         ●──●                               │
│ 04 Software     │                                            │
│                 │                                            │
├─────────────────┴────────────────────────────────────────────┤
│ SELECTED / FOUNDATION MODELS                                │
│ Language & Reasoning · Multimodal · RL & Agents · Infra     │
└──────────────────────────────────────────────────────────────┘
```

The atlas should feel like a scientific instrument, not a dashboard.

---

# 15. Atlas Interaction Model

Interaction:

```text
select research area
    ↓
center selected domain
    ↓
expand subdomains
    ↓
select subdomain
    ↓
show programs
    ↓
select program
    ↓
show projects + metadata
```

Secondary relationships may appear as peripheral links.

Example:

```text
Project
 ├── experiments
 ├── publications
 ├── system
 └── contributors
```

---

# 16. Atlas Selection Panel

Selected entity metadata may include:

```text
type
ID
title
status
summary
research area
program
related output counts
updated date
```

Example:

```text
PROGRAM
OMX-DI-004

LIFELONG MODEL LEARNING

STATUS / ACTIVE

Researching how intelligent systems can continue
acquiring knowledge and skills without requiring
complete retraining.

Projects / 03
Experiments / 07
Publications / 02

Explore program →
```

Only display counts when real.

---

# 17. Atlas URL State

Important atlas selections should be shareable.

Example:

```text
/research/?area=foundation-models
/research/?area=developmental-intelligence&program=lifelong-model-learning
```

Do not put every transient visual state into the URL.

Persist:

```text
area
subdomain
program
```

Optional:

```text
project
```

Do not persist:

```text
hover state
camera coordinates
temporary animation state
```

---

# 18. Atlas Mobile Experience

Do not shrink the desktop graph.

Mobile should use a hierarchical research explorer.

Example:

```text
RESEARCH ATLAS

01 Developmental Intelligence
   04 subdomains
   03 active programs

02 Foundation Models
   04 subdomains
   05 active programs

03 Algorithms & Mathematics
   ...

04 AI for Software Systems
   ...
```

Selecting an area opens:

```text
Area overview
↓
Subdomains
↓
Programs
↓
Projects
```

A small abstract visualization may accompany the content, but navigation is content-first.

---

# 19. Atlas Accessibility

The visual graph may be `aria-hidden`.

Provide a semantic equivalent:

```text
Research Area
  Subdomain
    Program
      Project
```

Keyboard users must be able to access the same entities.

Do not expose hundreds of SVG graph nodes directly to assistive technology.

---

# 20. Atlas Performance

The public site should not load the full research graph if the dataset becomes very large.

Strategy:

```text
initial:
areas + subdomains + featured programs

on selection:
load deeper branches

on project:
load relationship metadata
```

Do not fetch every publication and experiment on initial atlas load.

---

# 21. Atlas Technical Architecture

Suggested components:

```text
src/components/research/atlas/
├── research-atlas.tsx
├── research-atlas-shell.tsx
├── research-atlas-graph.tsx
├── research-atlas-list.tsx
├── research-atlas-sidebar.tsx
├── research-atlas-detail.tsx
├── research-atlas-filters.tsx
├── research-atlas-search.tsx
├── research-atlas-mobile.tsx
├── atlas-node.tsx
├── atlas-edge.tsx
├── atlas-layout.ts
├── atlas-transform.ts
├── atlas-query-state.ts
└── use-research-atlas.ts
```

---

# 22. Atlas Visualization Technology

Preferred implementation options:

```text
SVG + D3
Canvas + custom layout
React Flow only if interaction complexity requires it
WebGL only for unusually large graph scale
```

For the expected public graph size, SVG or Canvas is preferred over Three.js.

Do not add 3D merely because the site is about AI.

---

# 23. Research Areas Section

Below or integrated with the atlas, present the four areas editorially.

Headline:

```text
FOUR AREAS.
ONE QUESTION:
WHAT CAN
INTELLIGENCE
BECOME?
```

Each area should include:

```text
index
title
research thesis
subdomains
active program preview
CTA
```

---

# 24. Research Area Detail Page

Route:

```text
/research/areas/[slug]/
```

Canonical structure:

```text
01 Area Hero
02 Research Thesis
03 Subdomains
04 Active Programs
05 Featured Projects
06 Experiments
07 Publications
08 Related Systems
09 Researchers
10 Related Insights
11 Explore Adjacent Areas
```

---

# 25. Area Hero

Example:

```text
RESEARCH AREA / 01

DEVELOPMENTAL
INTELLIGENCE
& AUTONOMOUS
RESEARCH
```

Metadata:

```text
CODE / DI
STATUS / ACTIVE
```

Primary thesis:

> How can intelligent systems continue developing after deployment — accumulating knowledge, learning new skills, conducting research, and adapting without repeatedly starting from zero?

Use area-specific visual behavior from Stage 3.

---

# 26. Subdomain Section

Example:

```text
01 / Autonomous Data Intelligence
02 / Scientific Knowledge & Education
03 / Lifelong Model Learning
04 / Autonomous Scientist Systems
```

Each subdomain includes:

```text
title
short research question
related programs
related projects
```

Subdomains are taxonomy entities, not necessarily full standalone pages in v1.

---

# 27. Active Programs

Programs are the main long-running research units.

Presentation example:

```text
PROGRAM / OMX-DI-004
STATUS / ACTIVE

LIFELONG MODEL
LEARNING

How can intelligent systems acquire new knowledge
and skills over long periods without catastrophic
forgetting or full retraining?

Explore program →
```

Do not use generic cards when editorial sections work better.

---

# 28. Research Program Page

Route:

```text
/research/programs/[slug]/
```

Purpose:

Represent a durable research initiative containing multiple projects and experiments.

Canonical order:

```text
01 Program Hero
02 Problem
03 Research Questions
04 Thesis / Hypotheses
05 Research Directions
06 Active Projects
07 Experiment Timeline
08 Current Findings
09 Publications
10 Related Systems
11 Team
12 Related Programs
```

---

# 29. Program Hero

Example:

```text
RESEARCH PROGRAM

OMX-DI-004
STATUS / ACTIVE


LIFELONG
MODEL
LEARNING
```

Support metadata:

```text
AREA / DEVELOPMENTAL INTELLIGENCE
STARTED / YYYY
UPDATED / DD MON YYYY
```

Dates must come from structured data.

---

# 30. Program Problem Section

Headline:

```text
THE
PROBLEM.
```

Content should explain:

```text
what is currently difficult
why existing approaches are insufficient
why the problem matters
what boundary Omnexa is investigating
```

This should be written in research language, not marketing language.

---

# 31. Program Research Questions

Use numbered questions.

Example:

```text
RQ-01
How can a model acquire new capabilities without
catastrophically overwriting previous knowledge?

RQ-02
Which information should live in model weights,
external memory, tools, or structured knowledge?

RQ-03
How should the system determine when retraining,
fine-tuning, retrieval, or memory updates are needed?
```

Research questions should be content-driven.

---

# 32. Research Directions

A program may contain multiple research directions.

Example:

```text
Persistent Knowledge
Experience Memory
Continual Fine-Tuning
Evaluation Across Time
Knowledge Consolidation
Adaptive Retrieval
```

These are not necessarily separate routes.

---

# 33. Program Project Index

Show active and completed projects.

Group by:

```text
ACTIVE
VALIDATING
PUBLISHED
ARCHIVED
```

Do not mix status without labels.

---

# 34. Experiment Timeline

Program pages may include a chronological research timeline.

Example:

```text
2026-05
OMX-EXP-021
Baseline memory retention study

2026-06
OMX-EXP-027
External memory consolidation

2026-07
OMX-EXP-032
Experience carryover evaluation
```

Timeline items link to experiment pages.

Use real dates only.

---

# 35. Current Findings

Program-level findings should be carefully scoped.

Allowed:

```text
confirmed observations
current hypotheses
limitations
open questions
```

Presentation should distinguish:

```text
OBSERVED
HYPOTHESIS
OPEN QUESTION
```

Never present preliminary hypotheses as established facts.

---

# 36. Research Project Page

Route:

```text
/research/projects/[slug]/
```

Purpose:

A project page explains a concrete research effort and its methodology, architecture, experiments, results, and relationships.

Canonical order:

```text
01 Project Hero
02 Problem / Objective
03 Hypothesis
04 Method
05 Architecture / System Design
06 Data / Models / Environment
07 Experiments
08 Evaluation
09 Results
10 Limitations
11 Current Status / Next Steps
12 Publications / Artifacts
13 Related System
14 Contributors
```

---

# 37. Project Hero

Example:

```text
RESEARCH PROJECT

OMX-DI-007
STATUS / VALIDATING


EXPERIENCE
CARRYOVER
FOR AUTONOMOUS
AGENTS
```

Metadata:

```text
PROGRAM / LIFELONG MODEL LEARNING
AREA / DEVELOPMENTAL INTELLIGENCE
UPDATED / 14 AUG 2026
```

---

# 38. Project Objective

Suggested structure:

```text
PROBLEM
...

OBJECTIVE
...

HYPOTHESIS
...
```

Do not bury the research question in long marketing prose.

---

# 39. Project Architecture Visualization

Technical projects may include architecture diagrams.

Visual language must inherit Stage 1:

```text
nodes
lines
states
flows
labels
metadata
```

Do not use arbitrary vendor-style cloud architecture graphics unless necessary.

Provide:

```text
semantic text description
zoom capability where needed
static export fallback
```

---

# 40. Project Data / Models / Environment

Use structured technical metadata.

Example:

```text
DATASET
OTTO behavior dataset

MODEL
SASRec baseline

EVALUATION
NDCG@10
Recall@10

RUNTIME
PyTorch
```

Only display fields relevant to the project.

Do not force all projects into the same technical metadata categories.

---

# 41. Project Evaluation

Evaluation should include:

```text
metrics
baseline
comparison
protocol
failure analysis
limitations
```

Where uncertainty exists, show it explicitly.

The page should support charts but must not require them.

---

# 42. Project Results

Results may contain:

```text
quantitative results
qualitative observations
failure cases
ablation results
unexpected findings
```

Every chart should answer a clear research question.

Avoid decorative dashboards.

---

# 43. Experiment Index

Route:

```text
/research/experiments/
```

Purpose:

A technical archive of public experiments.

Layout:

```text
EXPERIMENTS

Filters
Status
Area
Program
Year

──────────────────────────────────────────────
OMX-EXP-032      VALIDATING      14 AUG 2026
Experience Carryover Evaluation
Lifelong Model Learning
──────────────────────────────────────────────
```

This page should be high-density and instrument-like.

---

# 44. Experiment Detail Page

Route:

```text
/research/experiments/[slug]/
```

Canonical order:

```text
01 Experiment Header
02 Objective
03 Hypothesis
04 Setup
05 Data
06 Model / System
07 Configuration
08 Metrics
09 Results
10 Observations
11 Conclusion
12 Limitations
13 Artifacts
14 Related Project
```

---

# 45. Experiment Header

Example:

```text
EXPERIMENT

OMX-EXP-032
STATUS / VALIDATING

EXPERIENCE
CARRYOVER
EVALUATION
```

Metadata:

```text
PROJECT / OMX-DI-007
STARTED / 04 AUG 2026
COMPLETED / —
```

Use `—` or omit a field when incomplete.

---

# 46. Experiment Configuration

Technical configuration may include:

```text
model
dataset
hardware
software
hyperparameters
seed
training regime
evaluation set
```

Use collapsible technical blocks where density is high.

Do not hide the primary methodology behind collapsed UI.

---

# 47. Reproducibility

Where public artifacts exist, include:

```text
Code
Config
Dataset reference
Environment
Model checkpoint
Notebook
Report
```

Possible actions:

```text
View code ↗
View configuration ↗
Download artifact ↗
```

Only show links that exist.

---

# 48. Experiment Results States

Results should support:

```text
PRELIMINARY
VALIDATING
CONFIRMED
INCONCLUSIVE
FAILED
```

Experiment outcome is separate from research status.

A failed experiment is valid research output and should not automatically be hidden.

---

# 49. Publication Index

Route:

```text
/research/publications/
```

Purpose:

Formal and semi-formal research output index.

Header:

```text
PUBLICATIONS
```

Filter dimensions:

```text
year
research area
program
publication type
author
system
```

Publication types:

```text
paper
technical report
whitepaper
dataset paper
benchmark
research brief
```

---

# 50. Publication Index Layout

Desktop:

```text
YEAR / 2026

OMX-PUB-013
CONTINUAL ADAPTATION IN AUTONOMOUS AGENT SYSTEMS
Technical Report
Emmanuel Kabu, ...
14 Aug 2026

OMX-PUB-012
...
```

Prefer editorial rows over card grids.

---

# 51. Publication Detail Page

Route:

```text
/research/publications/[slug]/
```

Canonical order:

```text
01 Publication Header
02 Abstract
03 Authors
04 Key Findings
05 Method
06 Figures
07 Results
08 Limitations
09 Citation
10 PDF / Code / Data
11 Related Research
12 Related System
```

---

# 52. Publication Header

Example:

```text
TECHNICAL REPORT

OMX-PUB-013
14 AUG 2026


CONTINUAL
ADAPTATION IN
AUTONOMOUS
AGENT SYSTEMS
```

Authors should link to person pages when available.

---

# 53. Citation Experience

Provide a dedicated citation block.

Support:

```text
Plain text
BibTeX
```

Optional:

```text
Copy citation
Copy BibTeX
```

Keyboard accessible.

Do not implement fake DOI metadata.

---

# 54. PDF Handling

If publication PDF exists:

```text
Read PDF ↗
Download PDF ↗
```

Optional embedded reader is not required in Stage 4.

The HTML publication page remains the primary discoverable route.

---

# 55. Research Archive

Route:

```text
/research/archive/
```

Purpose:

The complete high-density public research index.

It should include:

```text
Programs
Projects
Experiments
Publications
```

Potential future types:

```text
Datasets
Models
Benchmarks
Tools
```

Do not add future types until they exist.

---

# 56. Archive Filters

Canonical filters:

```text
Content Type
Research Area
Subdomain
Program
Status
Year
System
Researcher
Topic
```

Sort:

```text
Newest
Oldest
Recently Updated
A–Z
```

---

# 57. Archive Result Row

Example:

```text
PROJECT
OMX-DI-007

Experience Carryover for Autonomous Agents

Developmental Intelligence
Lifelong Model Learning
STATUS / VALIDATING
UPDATED / 14 AUG 2026
```

Use a clear entity-type label.

---

# 58. Archive URL State

Example:

```text
/research/archive/?type=experiment&area=DI&status=validating&year=2026
```

Filters should be shareable and browser-navigation friendly.

---

# 59. Archive Pagination

Use crawlable pagination.

Example:

```text
/research/archive/?page=2
```

Infinite scroll may enhance the experience but must not be the only navigation mechanism.

---

# 60. Research Search

Search may be integrated into:

```text
Research Atlas
Research Archive
Global Search
```

Research search prioritizes:

```text
titles
IDs
program names
research areas
abstracts/summaries
authors
systems
tags
```

Searching:

```text
OMX-DI-007
```

should directly surface the exact entity.

---

# 61. Research → Systems Relationships

Every system should expose the research it emerged from.

Example:

```text
Cadence
    ↕
Autonomous Software Engineering
Agent Systems
Continuous Learning
AI Infrastructure
```

Research pages should likewise expose related systems.

Example:

```text
APPLIED IN
CADENCE →
```

This relationship is central to Omnexa's identity.

---

# 62. Research → People Relationships

Area, program, project, and publication pages may show contributors.

People should be contextualized by work.

Prefer:

```text
NAME
ROLE
Related projects
Related publications
```

over decorative team-card galleries.

---

# 63. Research → Insights Relationships

Research notes and engineering articles can provide narrative context around formal research.

Example:

```text
RELATED NOTE
Why continual learning becomes an infrastructure problem
```

Insights must never replace the formal research artifact.

---

# 64. Research IDs

Canonical patterns:

```text
OMX-DI-001
OMX-FM-001
OMX-AM-001
OMX-SE-001
```

Experiment:

```text
OMX-EXP-001
```

Publication:

```text
OMX-PUB-001
```

Optional future:

```text
OMX-DATA-001
OMX-MODEL-001
OMX-BENCH-001
```

IDs must be stable.

---

# 65. Status Taxonomy

Research status:

```text
proposed
experimental
active
validating
published
paused
archived
```

Experiment outcome:

```text
preliminary
validating
confirmed
inconclusive
failed
```

Visibility:

```text
draft
public
unlisted
private
archived
```

These are separate concepts.

---

# 66. Research Metadata Bar

A reusable technical metadata component may display:

```text
ID
TYPE
STATUS
AREA
PROGRAM
UPDATED
```

Example:

```text
OMX-DI-007
PROJECT
VALIDATING
DI
LIFELONG MODEL LEARNING
14 AUG 2026
```

On mobile, stack or wrap semantically.

---

# 67. Technical Visualization System

Research pages may need:

```text
architecture diagrams
knowledge graphs
training curves
metric charts
experiment timelines
state diagrams
dependency graphs
model comparison plots
```

These should use a shared visualization system.

---

# 68. Visualization Design Rules

All research visualizations must:

```text
answer a research question
have a title
have a textual explanation
show units where relevant
show legend only when needed
support accessible alternatives
avoid decorative 3D
avoid meaningless animation
```

Charts should inherit the Omnexa visual language rather than using random library defaults.

---

# 69. Visualization Components

Suggested:

```text
src/components/research/visualization/
├── figure.tsx
├── figure-caption.tsx
├── metric-chart.tsx
├── comparison-chart.tsx
├── timeline-chart.tsx
├── architecture-diagram.tsx
├── relationship-graph.tsx
├── result-table.tsx
├── state-diagram.tsx
└── visual-fallback.tsx
```

---

# 70. Data Table Rules

Technical tables should be first-class content.

Requirements:

```text
semantic table markup
horizontal overflow on narrow screens
sticky headers only when useful
sortable only where meaningful
accessible labels
```

Do not convert every dataset into cards on mobile.

---

# 71. Long-Form Reading Experience

Project and publication pages may be long.

Recommended reading layout:

```text
left:
section index / local navigation

center:
main content

right:
metadata / related references
```

On smaller screens:

```text
main content first
metadata near header
local navigation collapses
```

---

# 72. Sticky Local Navigation

For long pages, desktop may use:

```text
Overview
Problem
Method
Experiments
Results
Limitations
Artifacts
```

Use `IntersectionObserver` for active state.

Do not require local navigation on short pages.

---

# 73. Research Page Width

Technical reading content:

```text
~680–820px readable measure
```

Wide diagrams and tables may break outside the text column.

Do not stretch prose across the full 1600px canvas.

---

# 74. Footnotes and References

Support:

```text
inline references
footnotes
external citations
related publications
```

Implementation should preserve semantic HTML.

Do not create fake citation numbering if source metadata is unavailable.

---

# 75. Equations

Research pages should be ready for mathematical notation.

Recommended:

```text
KaTeX
```

or another performant accessible math renderer.

Use only when content requires equations.

Do not load the math bundle globally if most pages do not need it.

---

# 76. Code Blocks

Technical research may include code/configuration.

Requirements:

```text
syntax highlighting
copy button
line wrapping option where appropriate
horizontal scroll
language label
keyboard accessible controls
```

Avoid turning every research page into a developer documentation page.

---

# 77. Research Content Schemas

Suggested TypeScript domain models.

```ts
type ResearchArea = {
  id: string;
  code: "DI" | "FM" | "AM" | "SE";
  title: string;
  slug: string;
  summary: string;
  thesis: string;
  subdomains: ResearchSubdomain[];
  status: ResearchStatus;
  featured?: boolean;
};

type ResearchProgram = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  researchAreaId: string;
  subdomainIds: string[];
  status: ResearchStatus;
  problemStatement: string;
  researchQuestions: ResearchQuestion[];
  researchDirections: string[];
  startedAt?: string;
  updatedAt: string;
  visibility: ContentVisibility;
};

type ResearchProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  researchAreaId: string;
  programId?: string;
  status: ResearchStatus;
  problem: string;
  objective: string;
  hypothesis?: string;
  methodology?: RichContent;
  evaluation?: RichContent;
  results?: RichContent;
  limitations?: RichContent;
  nextSteps?: RichContent;
  contributorIds: string[];
  systemIds: string[];
  visibility: ContentVisibility;
  createdAt: string;
  updatedAt: string;
};
```

---

# 78. Experiment Schema

```ts
type Experiment = {
  id: string;
  title: string;
  slug: string;
  projectId?: string;
  programId?: string;
  researchAreaId: string;
  researchStatus: ResearchStatus;
  outcomeStatus?: ExperimentOutcome;
  objective: string;
  hypothesis?: string;
  setup?: RichContent;
  dataset?: TechnicalReference[];
  models?: TechnicalReference[];
  environment?: TechnicalReference[];
  configuration?: Record<string, unknown>;
  metrics?: MetricDefinition[];
  results?: RichContent;
  observations?: RichContent;
  conclusion?: RichContent;
  limitations?: RichContent;
  artifactIds?: string[];
  contributorIds: string[];
  startedAt?: string;
  completedAt?: string;
  visibility: ContentVisibility;
};
```

---

# 79. Publication Schema

```ts
type Publication = {
  id: string;
  title: string;
  slug: string;
  publicationType:
    | "paper"
    | "technical-report"
    | "whitepaper"
    | "dataset-paper"
    | "benchmark"
    | "research-brief";
  abstract: string;
  authorIds: string[];
  researchAreaId: string;
  programIds: string[];
  projectIds: string[];
  experimentIds: string[];
  systemIds: string[];
  publishedAt: string;
  doi?: string;
  pdfUrl?: string;
  repositoryUrl?: string;
  citation?: string;
  bibtex?: string;
  visibility: ContentVisibility;
};
```

---

# 80. Relationship Graph Schema

Do not infer all relationships from tags.

Recommended explicit edges:

```ts
type ResearchRelationship = {
  sourceId: string;
  targetId: string;
  type:
    | "belongs_to"
    | "contains"
    | "produced"
    | "applied_in"
    | "authored_by"
    | "related_to"
    | "evaluated_by"
    | "derived_from";
};
```

Use this for atlas and related-content logic.

---

# 81. Research Repository Interfaces

Example:

```ts
interface ResearchRepository {
  getAreas(): Promise<ResearchArea[]>;
  getAreaBySlug(slug: string): Promise<ResearchArea | null>;

  getPrograms(filters?: ProgramFilters): Promise<ResearchProgram[]>;
  getProgramBySlug(slug: string): Promise<ResearchProgram | null>;

  getProjects(filters?: ProjectFilters): Promise<ResearchProject[]>;
  getProjectBySlug(slug: string): Promise<ResearchProject | null>;

  getResearchGraph(query?: ResearchGraphQuery): Promise<ResearchGraph>;
}
```

Dedicated experiment and publication repositories are acceptable.

---

# 82. Research Query Layer

Suggested:

```text
src/content/queries/research/
├── get-research-home.ts
├── get-research-area.ts
├── get-research-program.ts
├── get-research-project.ts
├── get-experiment.ts
├── get-publication.ts
├── get-research-archive.ts
├── get-research-atlas.ts
└── get-related-research.ts
```

Pages should call query functions rather than manually joining content.

---

# 83. Recommended Route Structure

```text
src/app/(site)/research/
├── page.tsx
│
├── areas/
│   └── [slug]/
│       └── page.tsx
│
├── programs/
│   └── [slug]/
│       └── page.tsx
│
├── projects/
│   └── [slug]/
│       └── page.tsx
│
├── experiments/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
├── publications/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
└── archive/
    └── page.tsx
```

---

# 84. Recommended Component Structure

```text
src/components/research/
├── landing/
│   ├── research-hero.tsx
│   ├── research-thesis.tsx
│   ├── research-areas.tsx
│   ├── active-programs.tsx
│   ├── research-in-progress.tsx
│   ├── recent-publications.tsx
│   ├── research-to-systems.tsx
│   └── research-people.tsx
│
├── atlas/
├── area/
├── program/
├── project/
├── experiment/
├── publication/
├── archive/
├── visualization/
├── metadata/
├── relationships/
└── shared/
```

---

# 85. Page Templates

Create dedicated templates:

```text
ResearchAreaTemplate
ResearchProgramTemplate
ResearchProjectTemplate
ExperimentTemplate
PublicationTemplate
```

Do not build one universal research detail renderer.

Shared sections may be reused, but the page hierarchy differs by entity type.

---

# 86. Research Landing Query

Suggested:

```ts
async function getResearchHome() {
  const [
    areas,
    featuredPrograms,
    activeProjects,
    activeExperiments,
    recentPublications,
    researchers,
    graph,
  ] = await Promise.all([
    researchRepo.getAreas(),
    researchRepo.getFeaturedPrograms(),
    researchRepo.getFeaturedProjects(),
    experimentRepo.getRecentPublic(),
    publicationRepo.getRecentPublic(),
    peopleRepo.getResearchPeople(),
    researchRepo.getResearchGraph({ depth: 2 }),
  ]);

  return {
    areas,
    featuredPrograms,
    activeProjects,
    activeExperiments,
    recentPublications,
    researchers,
    graph,
  };
}
```

---

# 87. Caching Strategy

Research content changes less frequently than application data.

Recommended:

```text
static generation
+
revalidation
+
tag-based invalidation when CMS changes
```

Archive/search endpoints may be dynamic.

Do not refetch static research area content on every client navigation unless needed.

---

# 88. Loading Strategy

Initial route should prioritize:

```text
page heading
thesis
research areas
atlas shell
```

Defer:

```text
deep graph branches
large figures
below-fold experiment visualizations
large code blocks
PDF previews
```

---

# 89. Research Atlas Data Loading

Suggested progressive strategy:

```text
initial:
areas + subdomains + featured programs

on area select:
programs + selected projects

on program select:
projects + selected relationships

on project select:
experiments/publications/system links
```

Do not expose private entities in the graph response.

---

# 90. Error States

If atlas graph fails:

```text
show semantic research area list
show program links
allow normal navigation
```

If chart fails:

```text
show textual result summary
```

If related content fails:

```text
omit that section
```

The page must remain usable.

---

# 91. Empty States

Examples:

No publications:

```text
No public publications are currently listed for this program.
```

No experiments:

```text
No public experiments are currently available.
```

No related system:

```text
omit the section
```

Do not render empty decorative boxes.

---

# 92. SEO

Research area metadata:

```text
[Area Name] — Research | Omnexa Labs
```

Program:

```text
[Program Name] — Omnexa Labs Research
```

Project:

```text
[Project Name] — Omnexa Labs Research
```

Publication:

```text
[Publication Title] | Omnexa Labs
```

Descriptions should come from structured summaries/abstracts.

---

# 93. Structured Data

Use where applicable:

```text
ScholarlyArticle
Article
Person
BreadcrumbList
```

Do not mark internal experiments as scholarly articles.

---

# 94. Open Graph

Research detail social preview should include:

```text
entity type
title
ID
research area
minimal Omnexa visual
```

Example:

```text
RESEARCH PROJECT
OMX-DI-007

EXPERIENCE CARRYOVER
FOR AUTONOMOUS AGENTS
```

---

# 95. Analytics

Recommended events:

```text
research_atlas_area_select
research_atlas_program_select
research_atlas_project_select
research_area_open
research_program_open
research_project_open
experiment_open
publication_open
publication_pdf_open
publication_citation_copy
research_filter_apply
research_archive_result_open
research_related_system_open
research_person_open
```

Do not track raw cursor movements over the atlas.

---

# 96. Accessibility

All research experiences must support:

```text
keyboard
screen reader
reduced motion
high zoom
touch
high contrast
```

Requirements:

- one H1 per route,
- semantic heading hierarchy,
- no graph-only navigation,
- table semantics,
- accessible figure captions,
- clear link labels,
- visible focus,
- textual equivalents for technical visualizations,
- no essential information encoded only through color.

---

# 97. Reduced Motion

Disable:

```text
atlas auto-layout animation
continuous graph movement
scroll-linked graph transitions
animated result lines
pulsing nodes
```

Keep:

```text
static graph
selected-node highlight
instant panel updates
```

---

# 98. Mobile Research Reading

Mobile pages should prioritize:

```text
title
summary
metadata
primary content
results
artifacts
related work
```

Local navigation may become:

```text
Sections ▾
```

Do not keep a desktop sticky sidebar consuming mobile width.

---

# 99. Research Performance Targets

The research experience should preserve:

```text
LCP < 2.5s target
INP < 200ms target
CLS < 0.1 target
```

Atlas interaction should remain responsive.

Avoid rendering hundreds of DOM nodes unnecessarily.

---

# 100. Research Design Integrity Rules

Codex must reject:

```text
four generic research cards
random gradient visualizations
3D globe because "research is global"
stock microscope images with no relevance
fake publication metrics
fake citation counts
paper-like layouts copied from arXiv
SaaS feature grids
dashboard charts with invented data
```

Research pages should feel like Omnexa's own institutional system.

---

# 101. Research Content Integrity

Never invent:

```text
results
citations
authors
publication dates
experiment outcomes
datasets
model names
metrics
hardware
research partnerships
funding
peer review status
DOIs
```

Unknown information should be omitted or marked as unavailable.

---

# 102. Stage 4 Codex Implementation Sequence

## Phase 1 — Research Domain Models

Implement:

```text
areas
subdomains
programs
projects
experiments
publications
relationships
statuses
visibility
```

Add validation schemas.

---

## Phase 2 — Static Research Routes

Create:

```text
/research
/research/areas/[slug]
/research/programs/[slug]
/research/projects/[slug]
/research/experiments
/research/experiments/[slug]
/research/publications
/research/publications/[slug]
/research/archive
```

Use real data interfaces with placeholder content only where required.

---

## Phase 3 — Research Page Templates

Build:

```text
Area
Program
Project
Experiment
Publication
```

Resolve responsive layout before advanced interactivity.

---

## Phase 4 — Relationship Layer

Implement:

```text
program → projects
project → experiments
project → publications
project → systems
publication → authors
person → research
research → insights
```

---

## Phase 5 — Archive

Implement:

```text
filtering
sorting
pagination
URL state
empty states
```

---

## Phase 6 — Research Atlas Static Version

Build:

```text
area list
subdomain hierarchy
program drilldown
selected entity panel
mobile hierarchy
```

Do not start with complex graph animation.

---

## Phase 7 — Atlas Visualization

Add:

```text
graph layout
selection states
progressive branch loading
URL synchronization
keyboard equivalence
responsive fallback
```

Profile before adding animation.

---

## Phase 8 — Technical Visualizations

Implement shared primitives for:

```text
figures
charts
architecture diagrams
timelines
result tables
state diagrams
```

---

## Phase 9 — Publication + Experiment Enhancements

Add:

```text
citation copy
BibTeX copy
artifact links
technical metadata
result state
configuration blocks
```

---

## Phase 10 — SEO + Structured Data

Implement:

```text
dynamic metadata
canonical URLs
breadcrumbs
ScholarlyArticle where valid
Open Graph
sitemap integration
```

---

## Phase 11 — Accessibility Audit

Verify:

```text
atlas keyboard access
screen-reader hierarchy
figure alternatives
table semantics
reduced motion
focus
zoom
touch
```

---

## Phase 12 — Performance Audit

Measure:

```text
research page LCP
atlas input latency
graph render cost
archive query performance
bundle size
chart bundle splitting
```

Remove unnecessary visual complexity.

---

# 103. Stage 4 Acceptance Criteria

## Research Landing

- [ ] Research hero is implemented.
- [ ] Research thesis is implemented.
- [ ] All four canonical research areas appear.
- [ ] Research Atlas exists.
- [ ] Active programs are data-driven.
- [ ] Active research is data-driven.
- [ ] Recent publications are data-driven.
- [ ] Research → Systems relationships are visible.
- [ ] Researchers can be surfaced from structured relationships.
- [ ] Archive entry is clearly available.

## Research Atlas

- [ ] All four areas are represented.
- [ ] Subdomains can be explored.
- [ ] Programs can be explored.
- [ ] Projects can be surfaced.
- [ ] Important selection state is shareable.
- [ ] Mobile has a dedicated hierarchical experience.
- [ ] Keyboard users can reach the same research entities.
- [ ] Graph failure falls back to semantic navigation.
- [ ] Private content cannot leak into graph data.
- [ ] Reduced motion disables unnecessary graph movement.

## Area Pages

- [ ] Research thesis is present.
- [ ] Subdomains are structured.
- [ ] Programs are related by data.
- [ ] Projects are related by data.
- [ ] Publications are related by data.
- [ ] Systems are related by data.
- [ ] Researchers are related by data.

## Program Pages

- [ ] Problem statement exists.
- [ ] Research questions are supported.
- [ ] Research directions are supported.
- [ ] Projects are grouped by status.
- [ ] Experiment timeline supports real dates.
- [ ] Findings distinguish observation/hypothesis/open question.
- [ ] Related publications and systems are supported.

## Project Pages

- [ ] Problem/objective/hypothesis are distinct.
- [ ] Methodology is supported.
- [ ] Technical architecture is supported.
- [ ] Data/model/environment metadata is supported.
- [ ] Experiments are linked.
- [ ] Evaluation is supported.
- [ ] Results and limitations are supported.
- [ ] Next steps are supported.
- [ ] Artifacts are supported.
- [ ] Contributors are linked.

## Experiments

- [ ] Experiment index exists.
- [ ] Detail pages support objective/hypothesis/setup/results.
- [ ] Experiment outcome is separate from research status.
- [ ] Failed/inconclusive outcomes can be represented.
- [ ] Configuration is structured.
- [ ] Public artifacts can be linked.
- [ ] Private artifacts are excluded.

## Publications

- [ ] Publication index exists.
- [ ] Publication types are explicit.
- [ ] Authors are structured.
- [ ] Abstract is supported.
- [ ] Citation block is supported.
- [ ] BibTeX is supported when available.
- [ ] PDF/code/data links are conditional.
- [ ] Related research is structured.
- [ ] No fake DOI/citation metadata is introduced.

## Archive

- [ ] Archive includes approved research entity types.
- [ ] Filters work.
- [ ] URL state works.
- [ ] Pagination works.
- [ ] Search by research ID works.
- [ ] Results clearly show entity type.
- [ ] Empty states are intentional.

## Visual System

- [ ] Stage 1 tokens are reused.
- [ ] Research visualizations use approved primitives.
- [ ] No generic card-grid research design is introduced.
- [ ] Technical metadata uses the established monospace system.
- [ ] Light/dark transitions remain intentional.

## Accessibility

- [ ] One H1 per route.
- [ ] Graph has semantic equivalent.
- [ ] Tables are semantic.
- [ ] Figures have captions/alternatives.
- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Reduced motion is complete.
- [ ] Mobile interactions do not depend on hover.
- [ ] 200% zoom preserves reading order.

## Performance

- [ ] Research Atlas does not block initial content.
- [ ] Deep graph data loads progressively.
- [ ] Chart/math/code bundles are loaded only when needed.
- [ ] Large diagrams are lazy-loaded.
- [ ] Atlas remains responsive on mid-range hardware.
- [ ] Production performance is measured.

## Integrity

- [ ] No fabricated research counts.
- [ ] No fabricated findings.
- [ ] No fabricated publications.
- [ ] No fabricated researchers.
- [ ] No fabricated citations.
- [ ] No unsupported scientific claims.

---

# 104. Non-Goals for Stage 4

Do not build in this stage:

```text
full Cadence system detail experience
full MedApp system detail experience
full ResearchOS system detail experience
Company experience
Careers application workflow
private researcher dashboards
private ResearchOS interfaces
experiment execution controls
internal datasets
model checkpoint hosting
public peer-review system
```

Stage 4 is the public research experience.

---

# 105. Stage 4 Quality Bar

The Research section should be strong enough that a technically sophisticated visitor can move from:

```text
"What does Omnexa research?"
```

to:

```text
"What exact research question is this project testing,
how is it being evaluated,
what experiments were run,
what was published,
and which system is applying it?"
```

without leaving the Omnexa research knowledge system.

---

# 106. Final Research Experience Narrative

The visitor enters:

```text
RESEARCHING
INTELLIGENCE.
```

They see the field as a structured body of inquiry.

The Research Atlas reveals:

```text
areas
→ subdomains
→ programs
→ projects
```

They can descend into:

```text
experiments
→ results
→ publications
```

Then follow the work outward into:

```text
systems
people
insights
```

The research experience therefore demonstrates the defining Omnexa model:

> **Research is not a page on the website. It is the knowledge structure from which the rest of Omnexa emerges.**
