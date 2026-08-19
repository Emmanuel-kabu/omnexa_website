# Omnexa Labs Website — Stage 3 Homepage Experience

**Document type:** Implementation Specification  
**Audience:** Codex / Frontend Engineers / Product Designers / Motion Designers / Content Engineers  
**Stage:** 3 — Homepage Experience  
**Depends on:**
- `omnexa_labs_stage_1_visual_design_system.md`
- `omnexa_labs_stage_2_information_architecture.md`

---

# 1. Objective

Build the Omnexa Labs homepage as a high-end institutional research experience.

The homepage must establish Omnexa Labs as:

> **An AI research and engineering lab advancing intelligence and turning research into real systems.**

It must not feel like a SaaS landing page, an agency portfolio, an AI template, a generic startup, or a static corporate brochure.

The experience should feel:

```text
scientific
editorial
architectural
technical
alive
precise
experimental
credible
```

Within the first meaningful scroll, visitors should understand:

1. Omnexa Labs researches intelligence.
2. Omnexa Labs builds real systems from that research.
3. The work spans multiple research domains.
4. Cadence, MedApp, and ResearchOS are expressions of that research.
5. Omnexa operates as an active research and engineering institution.

---

# 2. Homepage Narrative

The homepage is one continuous story:

```text
POTENTIAL
   ↓
INTELLIGENCE
   ↓
RESEARCH
   ↓
DISCOVERY
   ↓
SYSTEMS
   ↓
INFRASTRUCTURE
   ↓
KNOWLEDGE
   ↓
IMPACT
   ↓
NEXT
```

Sections should flow into one another rather than feeling like unrelated blocks.

---

# 3. Canonical Section Order

```text
00  Global Header
01  Hero / Intelligence Field
02  Institutional Definition
03  Research Areas
04  Featured Research
05  Research → Systems Transition
06  Systems
07  ResearchOS
08  Publications + Experiments
09  Insights / Engineering Notes
10  Operating Model
11  Careers / Join Omnexa
12  Footer Manifesto
```

Do not reorder without an explicit design decision.

---

# 4. Global React Structure

```text
<HomePage>
  <SiteHeader />

  <main>
    <HeroSection />
    <InstitutionalDefinition />
    <ResearchAreasSection />
    <FeaturedResearchSection />
    <ResearchToSystemsTransition />
    <SystemsSection />
    <ResearchOSSection />
    <KnowledgeSection />
    <InsightsSection />
    <OperatingModelSection />
    <CareersSection />
  </main>

  <FooterManifesto />
</HomePage>
```

Each section must render independently, support reduced motion, and permit lazy loading of heavy visual modules.

---

# 5. Page Rhythm

Use three density modes.

## Monumental

Used for hero, major transitions, footer.

```text
very large typography
few elements
large negative space
strong scroll pacing
```

## Editorial

Used for institutional explanation, research, systems, careers.

```text
asymmetric layout
structured content
large headlines
moderate density
```

## Instrumental

Used for ResearchOS, research metadata, experiments, publications.

```text
high information density
monospace metadata
lines
grids
status indicators
```

The page should intentionally move between these modes.

---

# 6. Global Header

Desktop:

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

Behavior:

```text
top of page       → transparent / integrated with hero
after threshold   → subtle solid/translucent surface
dark section      → dark-compatible header state
scroll upward     → remain visible
```

Required visual states:

```text
transparent-light
transparent-dark
solid-light
solid-dark
menu-open
search-open
```

Mobile:

```text
OMNEXA LABS                        MENU
```

Do not compress desktop navigation into a tiny horizontal row.

---

# 7. Section 01 — Hero

Target height:

```text
desktop: 90–100svh
mobile: 90–100svh
```

Prefer `svh` with reasonable fallback behavior.

Primary copy:

```text
ADVANCING
INTELLIGENCE.
```

Supporting copy:

> Omnexa Labs is an AI research and engineering lab developing intelligent systems that learn, reason, build, and discover.

Primary CTA:

```text
Explore research →
```

Secondary CTA:

```text
Explore systems →
```

Optional metadata:

```text
OMX / 2026
ACCRA / GH
```

Do not add more than two hero CTAs.

---

# 8. Hero Desktop Composition

```text
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ADVANCING                                                          │
│  INTELLIGENCE.                                      •               │
│                                              •                      │
│                                •        •                           │
│                                       ╱                             │
│                                •─────•─────•                        │
│                                       ╲                             │
│                                                                     │
│  Omnexa Labs is an AI research and engineering lab                  │
│  developing intelligent systems that learn, reason,                 │
│  build, and discover.                                               │
│                                                                     │
│  Explore research →     Explore systems →                           │
│                                                                     │
│  OMX / 2026                                ACCRA / GH                │
└─────────────────────────────────────────────────────────────────────┘
```

The headline dominates. The visualization supports it.

---

# 9. Hero Mobile Composition

```text
OMNEXA LABS

ADVANCING

INTELLI-
GENCE.

[visual field]

Omnexa Labs is an AI research and
engineering lab developing intelligent
systems that learn, reason, build,
and discover.

Explore research →

Explore systems →
```

Mobile must be art-directed instead of behaving like a collapsed desktop layout.

---

# 10. Intelligence Field

The hero signature visual is the **Intelligence Field**.

Concept:

```text
potential
→ organization
→ learning
→ reasoning
→ discovery
```

Allowed visual primitives:

```text
POINT
LINE
FIELD
TRAJECTORY
CLUSTER
STATE
SIGNAL
```

Do not use:

```text
brain silhouettes
robot faces
glowing circuit heads
generic neural-network stock visuals
futuristic HUD overlays
random particles with no meaning
```

---

# 11. Intelligence Field State Machine

```text
S0 / LATENT
    ↓
S1 / CONNECT
    ↓
S2 / ORGANIZE
    ↓
S3 / REASON
    ↓
S4 / DISCOVER
    ↓
S5 / DISSOLVE
```

### S0 / LATENT
Independent points, low connection density, minimal movement.

### S1 / CONNECT
Nearby nodes selectively discover each other.

### S2 / ORGANIZE
Small clusters emerge and movement becomes coordinated.

### S3 / REASON
Signals move through selected paths. Inactive paths remain muted.

### S4 / DISCOVER
A higher-order structure emerges from prior organization. Do not form a literal logo.

### S5 / DISSOLVE
The field disperses and selected trajectories become the lines/grids of the next section.

---

# 12. Intelligence Field Implementation

Preferred order:

```text
1. WebGL / Three.js when justified
2. Canvas 2D for simpler implementation
3. SVG fallback
4. Static fallback for reduced motion / unsupported environments
```

Loading strategy:

```text
SSR renders hero text + static visual
        ↓
client hydrates
        ↓
advanced visual enhancement loads asynchronously
```

The visual must never block the hero copy.

Suggested node budgets:

```text
desktop high capability: 80–140
desktop low capability: 50–80
mobile: 30–60
reduced motion: static
```

Rules:

- cap device pixel ratio,
- pause offscreen,
- pause in background tabs,
- avoid per-frame allocations,
- debounce resize,
- avoid per-frame DOM measurement.

---

# 13. Hero Scroll Choreography

Recommended progression:

```text
0–20%   headline stable / field latent
20–45%  field organizes
45–70%  signal paths appear
70–90%  visual begins dissolving
90–100% next section enters
```

Do not turn the hero into a long scroll trap.

Optional conceptual sequence:

```text
INTELLIGENCE THAT LEARNS.
INTELLIGENCE THAT REASONS.
INTELLIGENCE THAT BUILDS.
INTELLIGENCE THAT DISCOVERS.
```

Only implement if it remains concise, performant, and strong on mobile.

---

# 14. Section 02 — Institutional Definition

Purpose: answer **What is Omnexa Labs?**

Eyebrow:

```text
OMNEXA LABS / AI RESEARCH + ENGINEERING
```

Primary statement:

> We research the foundations of intelligent systems and engineer them into technologies that can operate in the real world.

Supporting copy:

> Our work spans autonomous intelligence, foundation models, reinforcement learning, computational discovery, software systems, healthcare, and the infrastructure required to advance them.

Closing line:

> Research is not separate from engineering here. It is where engineering begins.

Desktop composition:

```text
01
────────────────────────────────────────────────────────────

OMNEXA LABS /
AI RESEARCH + ENGINEERING

                We research the foundations
                of intelligent systems and
                engineer them into technologies
                that can operate in the real world.

                [supporting copy]

────────────────────────────────────────────────────────────
```

Keep motion minimal. This section restores cognitive clarity after the hero.

---

# 15. Section 03 — Research Areas

Headline:

```text
WHAT WE
RESEARCH.
```

Supporting copy:

> Omnexa Labs investigates intelligence across learning, reasoning, autonomous systems, computational discovery, and the infrastructure that makes advanced AI possible.

Canonical areas:

```text
01
DEVELOPMENTAL INTELLIGENCE
& AUTONOMOUS RESEARCH

Autonomous Data Intelligence
Scientific Knowledge & Education
Lifelong Model Learning
Autonomous Scientist Systems
```

```text
02
FOUNDATION MODELS
& MACHINE INTELLIGENCE

Language & Reasoning
Computer Vision & Multimodal Intelligence
Reinforcement Learning & Agents
Efficient Models & AI Infrastructure
```

```text
03
ALGORITHMS, MATHEMATICS
& COMPUTATIONAL DISCOVERY

Algorithm Discovery
Automated Mathematics
AutoML
Architecture Discovery
Computational Discovery
```

```text
04
AI FOR SOFTWARE
& COMPUTATIONAL SYSTEMS

Autonomous Software Engineering
AI Systems
Defensive Cybersecurity
Computational Infrastructure
```

Do not render these as four rounded cards.

Desktop:

```text
left         → index + active title
center/right → subdomains + description
background   → domain-responsive visualization
```

Interaction:

```text
hover/focus area
    ↓
area becomes active
    ↓
visualization changes
    ↓
subdomains update
```

Mobile: stacked editorial blocks. No hover dependency.

---

# 16. Domain Visual Mapping

Use consistent primitives with different behaviors:

```text
Developmental Intelligence
→ evolving clustered structures

Foundation Models
→ layered representations / token-like trajectories

Algorithms & Mathematics
→ geometric constraints / state transformations

AI for Software Systems
→ graph topology / dependency flow
```

Keep visuals abstract and meaningful.

---

# 17. Section 04 — Featured Research

Headline:

```text
RESEARCH
IN MOTION.
```

Supporting copy:

> Selected programs, experiments, and technical investigations from across the lab.

Allowed content types:

```text
ResearchProgram
ResearchProject
Experiment
Publication
```

Feature only 1–3 items by default.

Example:

```text
FEATURED / OMX-DI-007
STATUS / ACTIVE


LIFELONG MODEL
LEARNING

How can intelligent systems continue acquiring
knowledge and skills without repeatedly rebuilding
the entire model from the beginning?

Research program
Developmental Intelligence

Explore research →
```

Metadata may include:

```text
project ID
research area
status
publication date
experiment state
```

Do not invent results or metrics.

---

# 18. Section 05 — Research → Systems Transition

Primary copy:

```text
RESEARCH
BECOMES
SYSTEMS.
```

Supporting copy:

> We turn research into working systems — platforms that coordinate intelligence, operate in real environments, and create measurable capability.

This is a major conceptual pivot.

The light visual language may transition toward darker tones, and research lines may become system architecture paths.

This is one of the few places where a cinematic transition is justified.

---

# 19. Section 06 — Systems

Current homepage systems:

```text
001 / Cadence
002 / MedApp
```

ResearchOS is handled separately.

## Cadence

Label:

```text
SYSTEM / 001
```

Headline:

```text
CADENCE
```

Subheadline:

```text
A VIRTUAL SOFTWARE
ORGANIZATION.
```

Description:

> Cadence coordinates specialized AI engineering agents across planning, building, testing, security, deployment, and monitoring — creating a software delivery system designed around collaborative intelligence.

Lifecycle:

```text
PLAN
BUILD
RUN
DEPLOY
MONITOR
```

CTA:

```text
Explore Cadence →
```

Homepage visual:

```text
human/client
     ↓
planning intelligence
     ↓
engineering agents
     ↓
QA + security
     ↓
deployment
     ↓
monitoring
```

Show coordination and feedback, not the complete internal architecture.

---

## MedApp

Label:

```text
SYSTEM / 002
```

Headline:

```text
MEDAPP
```

Subheadline:

```text
MEDICAL
INTELLIGENCE.
```

Description:

> MedApp brings together medical knowledge, patient context, clinical workflows, and specialized AI agents to create a more intelligent healthcare experience.

Concepts:

```text
KNOWLEDGE
PATIENT CONTEXT
MEDICAL AGENTS
CLINICAL WORKFLOWS
```

CTA:

```text
Explore MedApp →
```

Conceptual visual:

```text
Patient
   ↕
Medical Knowledge Graph
   ↕
Specialized Agents
   ↕
Practitioner / Clinical Workflow
```

Possible entities:

```text
Patient
Practitioner
Symptom
Disease
Lab Result
Medication
Appointment
```

Do not make unsupported clinical outcome claims.

Systems should be full editorial experiences, not equal-sized product cards.


# 20. Section 07 — ResearchOS

Purpose: reveal the infrastructure beneath Omnexa research.

Primary headline:

```text
THE LAB
HAS AN
OPERATING SYSTEM.
```

Reveal:

```text
ResearchOS
```

Primary description:

> ResearchOS is Omnexa Labs' internal research environment for coordinating knowledge, datasets, experiments, agents, compute, evaluation, and reproducible scientific work.

Supporting line:

> It is designed to help human researchers and AI research agents work inside the same research system.

Conceptual system map:

```text
KNOWLEDGE
    ↓
DATASETS
    ↓
EXPERIMENTS
    ↓
AGENTS
    ↓
COMPUTE
    ↓
EVALUATION
    ↓
DISCOVERY
    ↓
PUBLICATION
```

Cross-cutting layers:

```text
Reproducibility
Versioning
Human Review
Security
Observability
```

Desktop interaction:

```text
Knowledge active
→ explanation

Datasets active
→ explanation

Experiments active
→ explanation
```

Do not force the user through many pinned full-screen scenes.

Public homepage may show:

```text
conceptual architecture
public capability descriptions
approved screenshots
public visualizations
```

Never expose:

```text
private datasets
private experiment results
credentials
compute controls
private agent sessions
security-sensitive topology
```

---

# 21. Section 08 — Publications + Experiments

Headline:

```text
FROM THE
LAB.
```

Supporting copy:

> Publications, experiments, technical reports, and research artifacts from ongoing work across Omnexa Labs.

Allowed feed types:

```text
PUBLICATION
EXPERIMENT
TECHNICAL REPORT
RESEARCH BRIEF
```

Example:

```text
PUBLICATION
OMX-PUB-013

Continual Adaptation in Autonomous Agent Systems

14 AUG 2026
Read publication ↗
```

Preferred layout:

```text
one large leading item
2–4 compact supporting items
```

Do not use a generic blog-card grid.

Example:

```text
────────────────────────────────────────────────────
PUBLICATION / OMX-PUB-013

CONTINUAL ADAPTATION
IN AUTONOMOUS AGENT SYSTEMS

Abstract...
                                      READ ↗
────────────────────────────────────────────────────

EXPERIMENT / OMX-EXP-032
...

TECHNICAL REPORT / OMX-TR-004
...
```

CTAs:

```text
Explore publications →
View research archive →
```

---

# 22. Section 09 — Insights

Headline:

```text
NOTES,
SYSTEMS,
IDEAS.
```

Supporting copy:

> Notes from the work itself — research observations, engineering architecture, technical decisions, and perspectives on where intelligent systems are heading.

Content types:

```text
Research Note
Engineering
Perspective
News
```

Show 3–4 entries maximum.

Example:

```text
ENGINEERING
Designing Specialized Software Engineering Agents

RESEARCH NOTE
When Continual Learning Becomes an Infrastructure Problem

PERSPECTIVE
Why Advanced AI Systems Need Better Research Environments
```

CTA:

```text
Explore insights →
```

---

# 23. Section 10 — Operating Model

Headline:

```text
HOW WE
WORK.
```

Canonical loop:

```text
QUESTION
   ↓
RESEARCH
   ↓
EXPERIMENT
   ↓
ENGINEER
   ↓
DEPLOY
   ↓
LEARN
   ↺
```

Primary copy:

> Omnexa combines scientific investigation with engineering execution. Ideas are tested through experiments, translated into systems, evaluated in real environments, and used to create the next research question.

The section should reinforce:

```text
Research is iterative.
Engineering is evidence.
Deployment creates learning.
Learning feeds research.
```

Visual:

```text
continuous trajectory
six labeled states
one feedback loop
```

Avoid six marketing cards.

---

# 24. Section 11 — Careers

Headline:

```text
BUILD
WHAT COMES
NEXT.
```

Supporting copy:

> Join a team working across research, machine intelligence, autonomous systems, software engineering, scientific infrastructure, and applied AI.

Primary CTA:

```text
Explore open roles →
```

Secondary CTA:

```text
Life at Omnexa →
```

Homepage may show three broad paths:

```text
RESEARCH
ENGINEERING
SYSTEMS
```

If open roles exist, show 2–4.

If none exist:

```text
No open roles are currently listed.
Follow Omnexa for future opportunities.
```

Do not create fake urgency.

---

# 25. Section 12 — Footer Manifesto

Preferred statement:

```text
WE'RE BUILDING
WHAT COMES NEXT.
```

Footer:

```text
OMNEXA LABS

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

© 2026 Omnexa Labs
```

The Intelligence Field may return in a more structured state.

Narrative relationship:

```text
Hero    → unstructured potential
Footer  → organized intelligence
```

Keep the effect subtle.

---

# 26. Canonical Homepage Copy

## Hero

```text
ADVANCING
INTELLIGENCE.

Omnexa Labs is an AI research and engineering lab developing intelligent systems that learn, reason, build, and discover.

Explore research →
Explore systems →
```

## Institutional Definition

```text
We research the foundations of intelligent systems and engineer them into technologies that can operate in the real world.

Our work spans autonomous intelligence, foundation models, reinforcement learning, computational discovery, software systems, healthcare, and the infrastructure required to advance them.

Research is not separate from engineering here. It is where engineering begins.
```

## Research

```text
WHAT WE
RESEARCH.

Omnexa Labs investigates intelligence across learning, reasoning, autonomous systems, computational discovery, and the infrastructure that makes advanced AI possible.
```

## Featured Research

```text
RESEARCH
IN MOTION.

Selected programs, experiments, and technical investigations from across the lab.
```

## Systems Transition

```text
RESEARCH
BECOMES
SYSTEMS.

We turn research into working systems — platforms that coordinate intelligence, operate in real environments, and create measurable capability.
```

## ResearchOS

```text
THE LAB
HAS AN
OPERATING SYSTEM.

ResearchOS is Omnexa Labs' internal research environment for coordinating knowledge, datasets, experiments, agents, compute, evaluation, and reproducible scientific work.
```

## Knowledge

```text
FROM THE
LAB.

Publications, experiments, technical reports, and research artifacts from ongoing work across Omnexa Labs.
```

## Insights

```text
NOTES,
SYSTEMS,
IDEAS.

Notes from the work itself — research observations, engineering architecture, technical decisions, and perspectives on where intelligent systems are heading.
```

## Operating Model

```text
HOW WE
WORK.

Omnexa combines scientific investigation with engineering execution. Ideas are tested through experiments, translated into systems, evaluated in real environments, and used to create the next research question.
```

## Careers

```text
BUILD
WHAT COMES
NEXT.

Join a team working across research, machine intelligence, autonomous systems, software engineering, scientific infrastructure, and applied AI.
```

## Footer

```text
WE'RE BUILDING
WHAT COMES NEXT.
```

---

# 27. Homepage Component Architecture

Recommended:

```text
src/components/home/
├── hero/
│   ├── hero-section.tsx
│   ├── hero-copy.tsx
│   ├── hero-actions.tsx
│   ├── hero-metadata.tsx
│   ├── intelligence-field.tsx
│   ├── intelligence-field-canvas.tsx
│   ├── intelligence-field-static.tsx
│   └── use-intelligence-field.ts
│
├── institutional-definition/
│   └── institutional-definition.tsx
│
├── research-areas/
│   ├── research-areas-section.tsx
│   ├── research-area-item.tsx
│   ├── research-area-visual.tsx
│   └── research-area-mobile.tsx
│
├── featured-research/
│   ├── featured-research-section.tsx
│   └── featured-research-item.tsx
│
├── systems-transition/
│   └── research-to-systems-transition.tsx
│
├── systems/
│   ├── systems-section.tsx
│   ├── system-feature.tsx
│   ├── cadence-visual.tsx
│   └── medapp-visual.tsx
│
├── researchos/
│   ├── researchos-section.tsx
│   ├── researchos-map.tsx
│   └── researchos-step.tsx
│
├── knowledge/
│   ├── knowledge-section.tsx
│   └── knowledge-item.tsx
│
├── insights/
│   ├── insights-section.tsx
│   └── insight-item.tsx
│
├── operating-model/
│   ├── operating-model-section.tsx
│   └── operating-loop.tsx
│
├── careers/
│   ├── careers-section.tsx
│   └── role-preview.tsx
│
└── footer-manifesto/
    ├── footer-manifesto.tsx
    └── footer-field.tsx
```

---

# 28. Section Container Primitive

Create a lightweight layout primitive.

```ts
type SectionProps = {
  id?: string;
  tone?: "light" | "dark";
  density?: "monumental" | "editorial" | "instrumental";
  className?: string;
  children: React.ReactNode;
};
```

It may handle:

```text
max width
horizontal padding
vertical rhythm
tone
layout constraints
```

Do not put section-specific visual logic into this primitive.

---

# 29. Homepage Data Model

```ts
type HomePageContent = {
  hero: HeroContent;
  institutionalDefinition: InstitutionalDefinitionContent;
  researchAreas: ResearchArea[];
  featuredResearch: FeaturedResearchItem[];
  systems: System[];
  researchOS: System;
  knowledge: KnowledgeItem[];
  insights: Insight[];
  careers: Job[];
};
```

Structured content must not be buried in visual components.

---

# 30. Homepage Content Query

Recommended server-side composition:

```ts
async function getHomePageContent(): Promise<HomePageContent> {
  const [
    researchAreas,
    featuredResearch,
    systems,
    publications,
    experiments,
    insights,
    jobs,
  ] = await Promise.all([
    researchRepository.getAreas(),
    researchRepository.getFeatured(),
    systemsRepository.getFeatured(),
    publicationRepository.getRecent(),
    experimentRepository.getRecent(),
    insightsRepository.getFeatured(),
    jobsRepository.getOpenRoles(),
  ]);

  return composeHomePageContent({
    researchAreas,
    featuredResearch,
    systems,
    publications,
    experiments,
    insights,
    jobs,
  });
}
```

Repository naming can differ, but page components should remain data-source agnostic.

---

# 31. Content Selection Rules

Featured Research:

```text
1. explicit homepage featured flag
2. editorial priority
3. status relevance
4. recency
```

Knowledge feed should prefer type diversity.

Example:

```text
1 publication
1 experiment
1 technical report
1 research brief
```

Insights should prefer:

```text
1 engineering
1 research note
1 perspective
```

where available.

---

# 32. Scroll Behavior

Rule:

> Scroll reveals structure; it does not fight the user.

Avoid:

```text
wheel hijacking
mandatory section snapping
blocking scroll during animation
excessively long pinned sections
mandatory horizontal scroll
```

Use scroll-driven animation only when it has narrative value.

---

# 33. Motion Architecture

Separate:

```text
UI motion
Section motion
Narrative motion
Visualization motion
```

Do not create one global timeline for everything.

## UI motion

Examples:

```text
link underline
arrow movement
menu transition
focus state
button state
```

Duration:

```text
120–260ms
```

## Section motion

Examples:

```text
heading entrance
divider growth
metadata reveal
small content shift
```

Duration:

```text
400–700ms
```

## Narrative motion

Examples:

```text
hero field
research → systems
ResearchOS layer activation
operating loop
```

Duration:

```text
700–1600ms
```

---

# 34. Animation Stack

Preferred:

```text
CSS transitions / keyframes
Motion for React orchestration
Three.js or Canvas for advanced visualization
```

Use GSAP only if timeline complexity clearly justifies it.

Do not use multiple overlapping motion libraries without need.

---

# 35. Reduced Motion

For:

```css
@media (prefers-reduced-motion: reduce)
```

disable:

```text
scroll-linked transforms
parallax
continuous field movement
long entrance animation
signal pulsing
```

Replace with:

```text
static final visualization state
simple opacity changes
instant section-state switches
```

The full information hierarchy must remain intact.

---

# 36. Responsive Architecture

Suggested semantic breakpoints:

```text
xs  < 480
sm  480–767
md  768–1023
lg  1024–1439
xl  1440+
```

Use container queries where local component width matters more than viewport width.

Desktop grid:

```text
12 columns
24px gutter
48px standard outer margin
larger margins at xl
max canvas ≈ 1600px
```

Mobile:

```text
horizontal padding: 20–24px
section spacing: 80–120px
hero top padding: header-aware
```

Do not make mobile artificially dense.

---

# 37. Typography

Follow Stage 1 hierarchy.

Suggested hero:

```text
desktop:
clamp(5.5rem, 10vw, 11rem)

mobile:
clamp(3.5rem, 17vw, 5rem)
```

Major section titles:

```text
clamp(3rem, 7vw, 7rem)
```

Tune after the final font is selected.

For identity-defining line breaks:

```tsx
<h1>
  <span>Advancing</span>
  <span>Intelligence.</span>
</h1>
```

Do not hardcode `<br />` across normal editorial copy.

---

# 38. Accessibility

Required:

```text
semantic header
main landmark
footer
one page H1
logical H2/H3 hierarchy
skip link
keyboard support
visible focus
screen-reader-safe visualizations
touch equivalents
```

Complex decorative visual:

```text
aria-hidden="true"
```

Informational visual:

```text
provide equivalent semantic text/list
visual may remain aria-hidden
```

Do not make screen-reader users traverse dozens of raw SVG nodes.

Link copy should be descriptive:

```text
Explore Developmental Intelligence
Explore Cadence
Read publication
View experiment
Explore ResearchOS
```

Avoid generic `Click here`.

---

# 39. Focus Treatment

Do not remove native focus without replacement.

Recommended:

```text
2px accent outline
2–4px offset
```

Adapt for dark surfaces.

---

# 40. Performance Targets

Target:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Treat these as product requirements, not optional optimizations.

Heavy modules:

```text
Intelligence Field
Cadence visual
MedApp visual
ResearchOS map
footer field
```

must be:

```text
code-split
lazy-loaded below fold
paused offscreen
rendered only when useful
```

Do not load all advanced graphics during initial boot.



# 41. Image Strategy

If real photography is used:

- use responsive images,
- define explicit dimensions,
- use optimized modern formats,
- avoid loading assets larger than necessary,
- preload only truly hero-critical assets,
- keep imagery documentary rather than corporate.

Avoid:

```text
generic office teamwork
people pointing at dashboards
robot imagery
AI-generated sci-fi environments
decorative background video
```

Prefer:

```text
researchers working
whiteboards
technical diagrams
hardware
experiments
real system interfaces
scientific imagery tied to actual work
```

---

# 42. Font Strategy

Use:

```text
optimized web fonts
variable fonts where useful
font-display strategy
subsetting where practical
```

Avoid loading many redundant weights or multiple decorative font families.

---

# 43. JavaScript Strategy

The homepage should be mostly server-rendered content with isolated client components.

Server-rendered:

```text
copy
research data
systems data
publications
insights
careers content
```

Client-side:

```text
interactive field
research area interactions
motion orchestration
complex diagrams
menu behavior
```

Do not convert the whole homepage into `"use client"`.

---

# 44. Progressive Enhancement

Baseline:

```text
HTML + CSS
```

Enhanced:

```text
JavaScript interactions
```

Advanced:

```text
Canvas / WebGL
```

The website must remain understandable if the advanced layer fails.

---

# 45. Homepage SEO

Recommended title:

```text
Omnexa Labs — AI Research & Engineering
```

Recommended description:

```text
Omnexa Labs researches advanced intelligence and engineers AI systems across autonomous agents, foundation models, computational discovery, software systems, healthcare, and research infrastructure.
```

Do not keyword-stuff.

---

# 46. Social Preview

Open Graph image direction:

```text
OMNEXA LABS

ADVANCING
INTELLIGENCE.

[minimal intelligence field]
```

Avoid a generic logo card.

---

# 47. Structured Data

Homepage may include:

```text
Organization
WebSite
```

Only include structured data that accurately reflects real content.

---

# 48. Analytics

Recommended events:

```text
home_hero_research_click
home_hero_systems_click
home_research_area_open
home_featured_research_open
home_system_open
home_researchos_open
home_publication_open
home_experiment_open
home_insight_open
home_careers_open
home_job_open
home_external_github_click
home_external_linkedin_click
```

Do not fire analytics for every passive scroll animation.

Example payload:

```json
{
  "event": "home_system_open",
  "system_id": "OMX-SYS-001",
  "system_slug": "cadence",
  "source_section": "systems"
}
```

---

# 49. Dynamic Content Failure Behavior

If featured research fails to load:

```text
retain the page
log the error
omit broken cards/items
show static section framing only if meaningful
```

If jobs fail:

```text
show the careers mission
show the careers CTA
omit job previews
```

No dynamic homepage query may crash the entire page.

---

# 50. Visualization Loading States

Do not use spinners for decorative or narrative visualizations.

Preferred:

```text
static visual
    ↓
enhanced visual replaces it when ready
```

This prevents visual dead zones.

---

# 51. Content Integrity Rules

Never invent:

```text
research results
publication counts
active experiment counts
client counts
performance claims
clinical outcomes
partnerships
funding
team size
```

If real data is unavailable, omit the claim.

---

# 52. Anti-AI-Template Rules

Codex must reject patterns such as:

```text
purple/blue gradient hero
glassmorphism card grid
random glowing orbs
sparkle icons everywhere
robot imagery
gradient borders on every card
pill labels everywhere
32px rounded containers everywhere
three-column "feature cards" immediately after hero
"Transform your business with AI" copy
fake customer logos
stock office photography
meaningless animated particles
```

The site should look designed for Omnexa, not generated from an AI startup template.

---

# 53. Design Integrity Questions

Every section must pass:

```text
Does this section have a narrative purpose?
Does it feel editorial rather than templated?
Does motion explain something?
Is content stronger than decoration?
Does it work without animation?
Is mobile intentionally composed?
Is the information real?
```

If not, simplify or redesign it.

---

# 54. Suggested DOM Outline

```html
<body>
  <a href="#main">Skip to content</a>

  <header>...</header>

  <main id="main">
    <section id="hero">...</section>
    <section id="about-omnexa">...</section>
    <section id="research">...</section>
    <section id="featured-research">...</section>
    <section id="research-to-systems">...</section>
    <section id="systems">...</section>
    <section id="researchos">...</section>
    <section id="knowledge">...</section>
    <section id="insights">...</section>
    <section id="how-we-work">...</section>
    <section id="careers">...</section>
  </main>

  <footer>...</footer>
</body>
```

---

# 55. Suggested Next.js Homepage

```tsx
export default async function HomePage() {
  const content = await getHomePageContent();

  return (
    <>
      <SiteHeader />

      <main id="main">
        <HeroSection content={content.hero} />

        <InstitutionalDefinition
          content={content.institutionalDefinition}
        />

        <ResearchAreasSection
          areas={content.researchAreas}
        />

        <FeaturedResearchSection
          items={content.featuredResearch}
        />

        <ResearchToSystemsTransition />

        <SystemsSection
          systems={content.systems}
        />

        <ResearchOSSection
          system={content.researchOS}
        />

        <KnowledgeSection
          items={content.knowledge}
        />

        <InsightsSection
          items={content.insights}
        />

        <OperatingModelSection />

        <CareersSection
          jobs={content.careers}
        />
      </main>

      <FooterManifesto />
    </>
  );
}
```

---

# 56. Visual Testing Matrix

Minimum viewport tests:

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

Also test:

```text
200% zoom
prefers-reduced-motion
keyboard-only navigation
touch interaction
slow network
low-end mobile CPU simulation
high-DPI display
```

---

# 57. Stage 3 Acceptance Criteria

## Structure

- [ ] All canonical homepage sections exist in the approved order.
- [ ] Header uses Stage 2 navigation.
- [ ] Hero has no more than two primary CTAs.
- [ ] Research areas are data-driven.
- [ ] Featured research is data-driven.
- [ ] Systems are data-driven.
- [ ] Publications/experiments are data-driven.
- [ ] Insights are data-driven.
- [ ] Careers gracefully supports zero open roles.
- [ ] Footer preserves the global IA.

## Visual System

- [ ] Stage 1 color tokens are used.
- [ ] Stage 1 typography is used.
- [ ] Stage 1 grid and spacing are used.
- [ ] Rounded SaaS-card patterns have not been introduced.
- [ ] Radius usage remains restrained.
- [ ] Monospace is limited to technical metadata.
- [ ] Accent color retains semantic meaning rather than becoming decoration.

## Hero

- [ ] Intelligence Field has a static fallback.
- [ ] Hero copy renders before advanced visualization.
- [ ] Intelligence Field pauses offscreen.
- [ ] Intelligence Field respects reduced motion.
- [ ] Hero works without advanced JavaScript.
- [ ] Mobile hero is independently composed.
- [ ] Hero does not become an excessive scroll trap.

## Research

- [ ] All four canonical areas are represented.
- [ ] Desktop interaction has keyboard equivalent.
- [ ] Mobile does not depend on hover.
- [ ] Domain visualizations use approved visual primitives.
- [ ] Research links resolve to Stage 2 routes.

## Systems

- [ ] Cadence is not presented as a generic product card.
- [ ] MedApp is not presented as a generic product card.
- [ ] Cadence visual communicates coordination/lifecycle.
- [ ] MedApp visual communicates knowledge/context/agents.
- [ ] Unsupported clinical or product claims are absent.
- [ ] ResearchOS public/private boundaries are respected.

## Motion

- [ ] No scroll hijacking.
- [ ] No mandatory long pinned sequence.
- [ ] Motion communicates structure or state.
- [ ] Reduced motion produces a complete static experience.
- [ ] Motion never blocks navigation or reading.

## Accessibility

- [ ] Exactly one H1 exists.
- [ ] Major sections use logical headings.
- [ ] Skip link works.
- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Visualizations have appropriate accessibility treatment.
- [ ] Hover behaviors have keyboard/touch equivalents.
- [ ] Text contrast meets accessibility targets.
- [ ] 200% zoom does not destroy reading order.

## Performance

- [ ] Heavy visualization bundles are code-split.
- [ ] Below-fold visualizations are lazy-loaded.
- [ ] Media dimensions prevent layout shift.
- [ ] No blocking hero video is required.
- [ ] Main thread remains responsive.
- [ ] Performance is measured using a production build.
- [ ] Advanced graphics pause when not visible.

## Content Integrity

- [ ] No fake metrics.
- [ ] No fake publications.
- [ ] No fake experiments.
- [ ] No fake partnerships.
- [ ] No unsupported claims.
- [ ] No generic AI marketing language has replaced approved institutional copy.

---

# 58. Codex Implementation Sequence

Codex must implement Stage 3 in this order.

## Phase 1 — Static Composition

Build all sections using:

```text
semantic HTML
Stage 1 tokens
Stage 1 typography
Stage 2 routing
real content models
static visualization placeholders
```

Do **not** start with Three.js or WebGL.

---

## Phase 2 — Responsive Layout

Resolve:

```text
mobile
tablet
desktop
large desktop
```

Every section must work visually before advanced motion is introduced.

---

## Phase 3 — Header + Navigation Context

Implement:

```text
transparent/solid state
light/dark state
mobile menu
active navigation
skip link
focus behavior
```

---

## Phase 4 — Research Interaction

Implement:

```text
desktop research active states
keyboard interactions
mobile stacked version
domain-responsive visuals
```

---

## Phase 5 — System Visualizations

Implement lightweight, meaningful versions of:

```text
Cadence architecture
MedApp knowledge/agent graph
ResearchOS flow
Operating Model loop
```

Do not overbuild.

---

## Phase 6 — Intelligence Field

Only after the static hero is approved:

```text
create visual runtime
implement field states
connect selectively to scroll
add capability detection
add static fallback
add reduced-motion behavior
profile performance
```

---

## Phase 7 — Narrative Motion

Add only high-value choreography:

```text
hero dissolve
research → systems transition
ResearchOS layer activation
operating model trajectory
footer field resolution
```

Keep motion sparse.

---

## Phase 8 — Dynamic Content

Connect:

```text
featured research
publications
experiments
insights
open roles
```

Verify empty and error states.

---

## Phase 9 — Performance Pass

Measure:

```text
bundle size
LCP
INP
CLS
main-thread work
GPU usage
mobile FPS
```

Remove or simplify effects that fail the budget.

---

## Phase 10 — Accessibility Pass

Audit:

```text
keyboard
screen reader
reduced motion
contrast
zoom
headings
focus
touch interaction
```

---

## Phase 11 — Final Visual QA

Compare against:

```text
Stage 1 design laws
Stage 2 information architecture
Stage 3 homepage narrative
```

Reject components that look like off-the-shelf AI landing-page patterns.

---

# 59. Non-Goals for Stage 3

Do not build yet:

```text
full research archive
full research-project detail page
full experiment detail page
full publication reader
full Cadence system page
full MedApp system page
full ResearchOS system page
Company detail pages
Careers detail pages
global search implementation
CMS editorial interface
private ResearchOS
```

Stage 3 is specifically the homepage experience.

---

# 60. Stage 3 Quality Bar

The homepage should remain identifiable even if the logo is temporarily removed.

Recognition should come from:

```text
typography
spacing
line/grid system
research IDs
editorial layout
motion discipline
Intelligence Field
research-to-systems relationship
technical metadata
```

The site's sophistication should come from:

```text
clarity
structure
real content
meaningful motion
information hierarchy
purposeful visualization
```

—not trendy effects.

---

# 61. Final Experience Narrative

The homepage begins with:

```text
unstructured potential
```

The Intelligence Field organizes.

The visitor discovers:

```text
what Omnexa is
what Omnexa researches
what Omnexa is investigating
```

Research becomes:

```text
Cadence
MedApp
```

The lab infrastructure is revealed:

```text
ResearchOS
```

Then the public output:

```text
publications
experiments
technical thinking
```

Finally:

```text
how Omnexa works
who should join
what comes next
```

The page closes with the same intelligence motif from the hero, now more organized.

The complete narrative is:

> **Intelligence begins as possibility. Research gives it structure. Engineering gives it form. Systems give it impact.**
