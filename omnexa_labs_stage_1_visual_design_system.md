# Omnexa Labs Website — Stage 1 Visual Design System

> **Document type:** Engineering implementation specification  
> **Audience:** Codex / frontend engineers / design engineers  
> **Status:** Stage 1 — Visual Design Language  
> **Product:** Omnexa Labs public website

---

## 1. Purpose

This document defines the visual and interaction system for the Omnexa Labs public website.

The website must present Omnexa Labs as a **frontier AI research and engineering institution**, not as a conventional SaaS startup, agency, or generic AI company.

The implementation should communicate four primary qualities:

1. **Intelligence** — research depth, experimentation, technical rigor.
2. **Precision** — disciplined grids, spacing, typography, motion, and hierarchy.
3. **Ambition** — frontier research, advanced systems, and long-term technological vision.
4. **Credibility** — real research, real systems, real engineering, real people, and evidence.

### Core brand statement

> **We research intelligence. We engineer it into real systems.**

### Primary design principle

> **Intelligence is demonstrated, not decorated.**

The site must avoid generic AI visual tropes such as glowing robot heads, abstract brains, excessive purple gradients, meaningless network animations, floating glass cards, and stock imagery of people pointing at dashboards.

---

# 2. Product Experience Direction

## 2.1 Experience model

The visual identity should combine:

- scientific editorial design,
- computational systems,
- architectural minimalism,
- research instrumentation,
- generative visualization,
- large-scale typography,
- controlled cinematic motion.

The interface should look simple from a distance while revealing complexity through interaction.

### Experience formula

```text
Editorial Minimalism
        +
Scientific Instrumentation
        +
Computational Visualization
        +
Architectural Grid
        +
Meaningful Motion
        =
Omnexa Labs Visual Language
```

---

# 3. Omnexa Design Laws

These rules are mandatory and should be treated as implementation constraints.

1. **Intelligence is demonstrated, not decorated.**
2. **Content has priority over containers.**
3. **White space is structural.**
4. **Motion communicates causality.**
5. **Complexity is revealed progressively.**
6. **Research should feel alive.**
7. **Technical information may remain technical.**
8. **The interface should reward exploration.**
9. **Every visualization must communicate information or state.**
10. **Systems inherit Omnexa's identity without losing their own identity.**
11. **Accessibility is not an alternate design.**
12. **Mobile receives a deliberate composition, not a compressed desktop layout.**
13. **Avoid visual trends with no functional purpose.**
14. **Every page must remain excellent with animation disabled.**
15. **Omnexa should be visually recognizable even when the logo is hidden.**

---

# 4. Visual Personality

The visual personality should be:

```text
Scientific
Precise
Experimental
Institutional
Ambitious
Editorial
Technical
Calm
Confident
```

It should not feel:

```text
Playful SaaS
Crypto-inspired
Cyberpunk
Gaming-oriented
Overly futuristic
Artificially mysterious
Corporate-template driven
```

---

# 5. Color System

## 5.1 Primary mode

The website should be predominantly **light mode**.

This distinguishes Omnexa Labs from the common dark-purple aesthetic used by many AI startups.

### Core palette

| Token | Value | Purpose |
|---|---:|---|
| `--omx-bg-primary` | `#F7F7F4` | Main page canvas |
| `--omx-bg-secondary` | `#EFEFEB` | Alternate surfaces |
| `--omx-bg-inverse` | `#080808` | Dark experiential sections |
| `--omx-text-primary` | `#0A0A0A` | Main text |
| `--omx-text-secondary` | `#555555` | Secondary text |
| `--omx-text-muted` | `#8A8A86` | Metadata / low emphasis |
| `--omx-text-inverse` | `#F1F1EE` | Text on dark surfaces |
| `--omx-border-primary` | `#D9D9D4` | Visible structural rules |
| `--omx-border-subtle` | `#E8E8E3` | Low-emphasis dividers |
| `--omx-accent` | `#315CFF` | Omnexa Electric |

## 5.2 Omnexa Electric

The primary accent is:

```css
--omx-accent: #315CFF;
```

The accent should be used sparingly.

Recommended visual balance:

```text
Neutral tones: ~95%
Omnexa Electric: ~5%
```

### The accent represents

- active computation,
- active state,
- selected items,
- experimentation,
- interactive elements,
- connected systems,
- highlighted research relationships.

It should not be used as decorative background fill across large areas without semantic meaning.

---

# 6. Research Domain Colors

Research domains may receive subordinate semantic colors for visualizations and metadata.

Example mapping:

| Research Domain | Suggested Semantic Color |
|---|---|
| Developmental Intelligence & Autonomous Research | Electric Blue |
| Foundation Models & Machine Intelligence | Signal Violet |
| Algorithms, Mathematics & Computational Discovery | Vermilion |
| AI for Software & Computational Systems | Emerald |

These colors should primarily appear in:

- charts,
- research maps,
- diagrams,
- node classifications,
- publication tags,
- research metadata,
- experimental status visualization.

They should not replace `--omx-accent` as the primary Omnexa brand color.

---

# 7. Dark Experience Mode

Dark mode is not simply a global inverted theme.

It should be used intentionally when the user conceptually moves deeper into Omnexa's systems, especially for:

- ResearchOS,
- runtime infrastructure,
- complex simulations,
- low-level computational environments,
- immersive research visualizations.

### Transition concept

```text
PUBLIC RESEARCH
    ↓
EXPERIMENTATION
    ↓
RUNTIME
    ↓
RESEARCHOS
```

The interface may progressively transition from light to dark while scrolling into these sections.

### Dark palette

```css
--omx-bg-inverse: #080808;
--omx-text-inverse: #F1F1EE;
```

Omnexa Electric remains visible in dark mode.

---

# 8. Typography System

Typography should carry a significant portion of the visual identity.

Use three typography roles.

## 8.1 Display typography

Use for major statements such as:

```text
ADVANCING
INTELLIGENCE.
```

Characteristics:

- modern grotesk,
- neutral rather than futuristic,
- variable font preferred,
- large scale,
- tight tracking,
- confident weight,
- optimized for large display sizes.

## 8.2 Interface / editorial typography

Use for:

- body text,
- navigation,
- system descriptions,
- research content,
- careers,
- articles,
- labels.

Requirements:

- excellent readability,
- modern sans-serif,
- strong small-size rendering,
- variable weights preferred.

## 8.3 Technical monospace

Use sparingly for:

- research IDs,
- experiment IDs,
- dates,
- model identifiers,
- system states,
- compute metadata,
- runtime information.

Example:

```text
OMX-ASI-0024
14.08.2026
STATUS / ACTIVE
MODEL / OMX-R1
COMPUTE / A100 × 8
```

Monospace should normally occupy no more than approximately 5–10% of visible typography.

---

# 9. Typography Scale

Recommended desktop scale:

```css
--omx-font-display-1: clamp(6rem, 11vw, 11rem);
--omx-font-display-2: clamp(4.5rem, 8vw, 7rem);
--omx-font-h1: clamp(3.5rem, 6vw, 5rem);
--omx-font-h2: clamp(2.75rem, 4vw, 3.5rem);
--omx-font-h3: clamp(1.75rem, 3vw, 2.25rem);
--omx-font-body-lg: clamp(1.25rem, 2vw, 1.5rem);
--omx-font-body: 1rem;
--omx-font-meta: 0.75rem;
```

Recommended display line-height:

```css
line-height: 0.86;
```

to:

```css
line-height: 0.92;
```

Recommended display tracking:

```css
letter-spacing: -0.04em;
```

to:

```css
letter-spacing: -0.06em;
```

Metadata treatment:

```css
font-family: var(--omx-font-mono);
font-size: 0.75rem;
letter-spacing: 0.08em;
text-transform: uppercase;
```

---

# 10. Grid System

## 10.1 Desktop

Target desktop canvas:

```text
1440px+
```

Recommended layout:

```text
12-column grid
24px gutters
48px minimum page margin
1600px maximum wide-content width
```

Suggested tokens:

```css
--omx-grid-columns: 12;
--omx-grid-gutter: 24px;
--omx-page-margin: 48px;
--omx-content-max: 1600px;
```

## 10.2 Asymmetry

The interface should deliberately use asymmetric compositions.

Preferred:

```text
| Research Area                         |
|                                       |
|                    FOUNDATION         |
|                    MODELS             |
|                                       |
| 01                 Systems capable    |
|                    of reasoning...    |
```

Avoid centering every heading, paragraph, and CTA.

---

# 11. Spacing System

```css
--omx-space-1: 4px;
--omx-space-2: 8px;
--omx-space-3: 12px;
--omx-space-4: 16px;
--omx-space-6: 24px;
--omx-space-8: 32px;
--omx-space-12: 48px;
--omx-space-16: 64px;
--omx-space-24: 96px;
--omx-space-32: 128px;
--omx-space-40: 160px;
--omx-space-48: 192px;
```

Large editorial sections should use generous vertical spacing.

Do not reduce whitespace simply to fit more content above the fold.

---

# 12. Structural Line Language

Thin lines should be a recurring graphical primitive.

Recommended thickness:

```css
0.5px to 1px
```

Use lines for:

- section boundaries,
- research metadata,
- diagrams,
- navigation hierarchy,
- archival layouts,
- coordinate systems,
- publication lists.

Example:

```text
─────────────────────────────────────────
RESEARCH / 01                OMX-R-001
─────────────────────────────────────────

DEVELOPMENTAL
INTELLIGENCE

─────────────────────────────────────────
ACTIVE PROGRAMS                         04
PUBLICATIONS                            12
EXPERIMENTS                             31
─────────────────────────────────────────
```

---

# 13. Radius Philosophy

Avoid excessive large-radius surfaces.

Recommended values:

```css
--omx-radius-xs: 2px;
--omx-radius-sm: 4px;
--omx-radius-md: 8px;
```

Large 24–40px SaaS-style rounded cards should be rare and only used when functionally justified.

Default components should feel architectural rather than soft or bubbly.

---

# 14. Shadows

Shadows should be extremely restrained.

Prefer:

- borders,
- negative space,
- tonal surface differences,
- grid lines,
- layering through motion.

Avoid heavy drop shadows on cards.

If necessary, use soft low-opacity shadows only for floating navigation, modals, popovers, or overlays.

---

# 15. Buttons and Actions

Avoid overly rounded pill buttons for primary navigation.

Preferred action language:

```text
Explore research              →
Read publication              ↗
Explore system                →
View experiment               ↗
Continue                      ↓
```

### Arrow semantics

| Symbol | Meaning |
|---|---|
| `→` | Internal navigation |
| `↗` | External resource / publication |
| `↓` | Continue vertically / scroll |

### Example primary button

```text
┌───────────────────────────┐
│ Explore our research    → │
└───────────────────────────┘
```

Button corners should remain small unless the context requires otherwise.

---

# 16. Navigation

## 16.1 Main desktop navigation

Recommended structure:

```text
OMNEXA LABS

Research      Systems      Company      Careers

Search                                  Menu
```

Do not overload the top-level navigation.

## 16.2 Scroll behavior

At page top:

- transparent background,
- integrated into hero.

After scrolling:

```css
background: rgba(..., 0.85);
backdrop-filter: blur(8px) to blur(12px);
```

Keep the effect subtle.

## 16.3 Mega navigation

Opening `Menu` may create a full-screen information layer.

Example:

```text
OMNEXA LABS                                         CLOSE ×

01
RESEARCH

Research Areas
Publications
Experiments
Research Notes

02
SYSTEMS

Cadence
MedApp
ResearchOS

03
COMPANY

About
People
Careers
Contact

                         ACCRA / GH
                         05°33'N 00°12'W
```

---

# 17. Motion Philosophy

Motion must communicate one or more of:

- causality,
- system state,
- hierarchy,
- structural change,
- progression,
- relationships,
- computation.

Do not animate elements simply because motion looks futuristic.

### Examples of acceptable motion

- nodes connecting as a research system forms,
- data flowing through an architecture diagram,
- a research graph expanding after selection,
- textual states changing during scroll,
- an experiment moving from one status to another,
- visualizations reacting to user exploration.

### Examples to avoid

- random floating cards,
- decorative bouncing icons,
- constant parallax everywhere,
- excessive spring motion,
- endless glowing particles with no meaning.

---

# 18. Motion Timing Tokens

```css
--omx-motion-fast: 160ms;
--omx-motion-ui: 240ms;
--omx-motion-section: 600ms;
--omx-motion-cinematic: 1200ms;
```

Recommended ranges:

| Interaction | Timing |
|---|---|
| Hover / fast state | 120–180ms |
| Controls / navigation | 180–260ms |
| Section transition | 400–700ms |
| Cinematic sequences | 800–1600ms |

Prefer custom easing curves over exaggerated spring animations.

---

# 19. Signature Motion System — Intelligence Field

The homepage hero should eventually support a signature generative visualization called the **Intelligence Field**.

## 19.1 Concept

The visualization represents:

```text
potential
    ↓
organization
    ↓
learning
    ↓
reasoning
    ↓
discovery
```

### Initial state

```text
•    •   •
   •       •
 •    •
      •     •
```

### Learning state

Nodes begin to cluster.

### Reasoning state

Connections form and higher-order structures emerge.

### Discovery state

A new structure forms from previously separate components.

### End state

The field transitions into the next homepage section.

## 19.2 Implementation requirements

The first implementation may use:

- Canvas 2D,
- WebGL,
- Three.js,
- PixiJS,
- SVG for lightweight fallback.

Do not block initial site delivery on a complex WebGL implementation.

Build progressive enhancement:

```text
static fallback
    ↓
SVG/canvas fallback
    ↓
full interactive visualization
```

---

# 20. Cursor Behavior

Desktop cursor interactions may become context-sensitive.

Examples:

```text
Default         → native cursor
Research node   → ○ OMX-32
Image           → VIEW ↗
Architecture    → EXPLORE +
```

Cursor behavior must never be the only way information is communicated.

Keyboard, touch, and screen-reader equivalents are required.

---

# 21. Imagery Direction

Use four visual families.

## 21.1 Real research photography

Preferred:

- researchers concentrating,
- whiteboard work,
- hardware close-ups,
- experiments,
- screens with real research work,
- team technical discussions,
- lab / engineering environments.

Avoid generic stock photography.

## 21.2 Scientific imagery

Use only when relevant to actual work.

Possible categories:

- microscopy,
- astronomy,
- biology,
- materials,
- robotics,
- medical systems,
- simulation.

## 21.3 Computational visualization

Preferred visual material:

- model topology,
- knowledge graphs,
- state spaces,
- manifolds,
- simulation,
- agent trajectories,
- architecture diagrams.

## 21.4 Generative brand graphics

Abstract visuals should be based on real mathematical or computational systems whenever possible.

Avoid decorative generated imagery with no relationship to the research.

---

# 22. Research Visualization Primitives

All visualizations should reuse a consistent set of graphical primitives.

```text
POINT
LINE
FIELD
GRID
TRAJECTORY
STATE
NODE
SIGNAL
```

These primitives should support:

- knowledge graphs,
- training progression,
- reinforcement learning trajectories,
- model architecture,
- agent networks,
- system architecture,
- experimental state,
- dataset relationships,
- simulations.

The goal is to create a recognizable Omnexa visualization language.

---

# 23. Cards and Content Regions

Prefer content regions over generic cards.

Avoid:

```text
┌──────────────┐
│ Foundation   │
│ Models       │
└──────────────┘
```

Prefer:

```text
01
────────────────────────────────────────────

FOUNDATION
MODELS

Language & Reasoning
Multimodal Intelligence
Efficient Models
AI Infrastructure

                              EXPLORE →
────────────────────────────────────────────
```

Use cards only when they represent discrete items such as:

- research publications,
- experiments,
- people,
- system modules,
- news entries.

---

# 24. Research Card Pattern

Example:

```text
OMX-RL-024                       RESEARCH

LIFELONG AGENTS
WITHOUT FULL
RETRAINING

Continual adaptation through
persistent knowledge and skill
acquisition.

14 AUG 2026                    EXPLORE ↗
```

Characteristics:

- minimal or zero radius,
- no heavy shadow,
- strong typography,
- structural borders,
- monospace metadata,
- visible research identifier.

---

# 25. Systems Presentation

Cadence, MedApp, and ResearchOS should be treated as **systems**, not SaaS product cards.

## 25.1 Cadence

Example:

```text
SYSTEM / 001

CADENCE

A VIRTUAL SOFTWARE
ORGANIZATION.

Plan
Build
Run
Deploy
Monitor

                               Explore system →
```

A deeper section may reveal an interactive architecture visualization.

## 25.2 MedApp

Example:

```text
SYSTEM / 002

MEDICAL
INTELLIGENCE.

Knowledge
Agents
Patients
Practitioners
Clinical context
```

## 25.3 ResearchOS

ResearchOS may use a more immersive dark visual environment because it represents the internal research machinery of the lab.

---

# 26. Numerical Identity

Large numerical identifiers should be used as brand elements.

Examples:

```text
04
RESEARCH
DOMAINS
```

```text
31
ACTIVE
EXPERIMENTS
```

```text
001
CADENCE
```

Numbers should reinforce the feeling of a technical archive or research institution.

---

# 27. Research Identifier System

Use Omnexa-native identifiers for research.

Suggested format:

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

| Code | Domain |
|---|---|
| `DI` | Developmental Intelligence |
| `FM` | Foundation Models |
| `AM` | Algorithms & Mathematics |
| `SE` | Software Engineering / Computational Systems |

Identifiers may appear in:

- research pages,
- experiments,
- publications,
- architecture diagrams,
- ResearchOS,
- research search results.

---

# 28. Research Status System

Recommended states:

```text
PROPOSED
EXPERIMENTAL
ACTIVE
VALIDATING
PUBLISHED
ARCHIVED
```

Example rendering:

```text
STATUS / ACTIVE
```

or:

```text
● ACTIVE
```

Status colors must maintain sufficient contrast and should not rely on color alone.

---

# 29. Footer Experience

The footer should be an intentional visual ending rather than a generic collection of columns.

Possible composition:

```text
WE'RE BUILDING
WHAT COMES NEXT.

OMNEXA LABS

Research
Systems
Company
Careers

Accra, Ghana
05°33'N 00°12'W

LinkedIn
GitHub
Research

© 2026 OMNEXA LABS
```

The Intelligence Field may return subtly in the background.

Conceptually:

```text
Hero        → unstructured potential
Footer      → organized intelligence
```

This creates visual closure across the homepage.

---

# 30. Responsive Design Philosophy

Do not simply stack the desktop layout vertically.

Each breakpoint should preserve the composition's meaning.

## 30.1 Desktop

May use:

```text
Research navigation | visualization | detail panel
```

## 30.2 Mobile

May transform into:

```text
Research title
↓
Visualization
↓
Research topics
↓
Details
```

Hero typography should remain large on mobile.

Suggested mobile display range:

```css
font-size: clamp(3.5rem, 15vw, 5rem);
```

Do not automatically reduce display typography to conventional 36–40px mobile headings.

---

# 31. Visual Density Levels

Use three different information density modes across the site.

## 31.1 Monumental

Use for:

- hero,
- manifesto,
- major transitions.

Characteristics:

- very large type,
- low information density,
- large whitespace.

## 31.2 Editorial

Use for:

- research descriptions,
- system explanations,
- company pages,
- articles.

Characteristics:

- moderate density,
- strong reading rhythm,
- clear hierarchy.

## 31.3 Instrumental

Use for:

- ResearchOS,
- experiment metadata,
- diagrams,
- runtime views,
- technical visualizations.

Characteristics:

- higher information density,
- monospace metadata,
- grid systems,
- analytical layouts.

---

# 32. Accessibility Requirements

Accessibility is mandatory.

## 32.1 Reduced motion

Support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable scroll choreography,
- remove non-essential transitions,
- replace animated diagrams with static states,
- preserve all information.

## 32.2 Keyboard

All interactive features must support keyboard navigation.

Includes:

- research explorer,
- navigation,
- menus,
- carousels,
- visual nodes,
- tabs,
- system diagrams when interactive.

## 32.3 Touch

All hover experiences must have touch equivalents.

## 32.4 Contrast

Meet WCAG AA contrast requirements at minimum.

## 32.5 Semantic HTML

Use semantic elements before generic containers.

Examples:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`

## 32.6 WebGL fallback

If advanced visualizations fail or are unsupported:

```text
WebGL visualization
       ↓ fallback
Canvas / SVG
       ↓ fallback
Static graphic / structured HTML
```

No critical content may depend on WebGL.

---

# 33. Audio Policy

Ambient sound should not autoplay.

Default:

```text
MUTED
```

If sound is ever used in research visualizations:

- it must be explicitly activated by the user,
- it must have visible mute controls,
- it must not be required to understand the content.

---

# 34. Recommended Frontend Technical Stack

This Stage 1 specification does not mandate the final stack, but the following is recommended for implementation:

```text
Next.js
React
TypeScript
CSS Modules / Tailwind CSS / design-token layer
Framer Motion or Motion
Canvas / SVG for lightweight visualizations
Three.js or React Three Fiber only where justified
```

Animation libraries should not determine the visual design.

Use the simplest implementation capable of delivering the intended experience.

---

# 35. Suggested Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── brand/
│   │   ├── omnexa-logo.tsx
│   │   ├── research-id.tsx
│   │   ├── status-label.tsx
│   │   └── coordinate-label.tsx
│   │
│   ├── navigation/
│   │   ├── site-header.tsx
│   │   ├── desktop-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   └── mega-menu.tsx
│   │
│   ├── typography/
│   │   ├── display-heading.tsx
│   │   ├── section-heading.tsx
│   │   ├── body-copy.tsx
│   │   └── technical-label.tsx
│   │
│   ├── layout/
│   │   ├── page-grid.tsx
│   │   ├── section.tsx
│   │   ├── content-region.tsx
│   │   └── divider.tsx
│   │
│   ├── actions/
│   │   ├── text-link.tsx
│   │   ├── primary-action.tsx
│   │   └── icon-action.tsx
│   │
│   ├── research/
│   │   ├── research-card.tsx
│   │   ├── research-status.tsx
│   │   ├── research-meta.tsx
│   │   └── research-domain-label.tsx
│   │
│   ├── systems/
│   │   ├── system-feature.tsx
│   │   ├── system-identifier.tsx
│   │   └── system-hero.tsx
│   │
│   └── visualizations/
│       ├── intelligence-field/
│       │   ├── intelligence-field.tsx
│       │   ├── intelligence-field-canvas.tsx
│       │   ├── intelligence-field-static.tsx
│       │   └── types.ts
│       ├── node.tsx
│       ├── trajectory.tsx
│       └── grid-field.tsx
│
├── design-system/
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   ├── typography.css
│   │   ├── motion.css
│   │   ├── radii.css
│   │   └── breakpoints.css
│   │
│   ├── primitives/
│   ├── themes/
│   └── index.ts
│
├── hooks/
│   ├── use-reduced-motion.ts
│   ├── use-media-query.ts
│   └── use-pointer-capability.ts
│
├── lib/
│   ├── motion/
│   ├── accessibility/
│   └── visualization/
│
└── styles/
    ├── reset.css
    ├── base.css
    └── utilities.css
```

---

# 36. Initial Design Token File

Codex may begin with the following CSS variables.

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

  --omx-space-1: 4px;
  --omx-space-2: 8px;
  --omx-space-3: 12px;
  --omx-space-4: 16px;
  --omx-space-6: 24px;
  --omx-space-8: 32px;
  --omx-space-12: 48px;
  --omx-space-16: 64px;
  --omx-space-24: 96px;
  --omx-space-32: 128px;
  --omx-space-40: 160px;
  --omx-space-48: 192px;

  --omx-radius-xs: 2px;
  --omx-radius-sm: 4px;
  --omx-radius-md: 8px;

  --omx-motion-fast: 160ms;
  --omx-motion-ui: 240ms;
  --omx-motion-section: 600ms;
  --omx-motion-cinematic: 1200ms;

  --omx-grid-gutter: 24px;
  --omx-page-margin: 48px;
  --omx-content-max: 1600px;
}
```

---

# 37. Example Hero Composition

The hero should be extremely minimal.

```text
┌────────────────────────────────────────────────────────────────┐
│ OMNEXA LABS                RESEARCH  SYSTEMS  COMPANY     MENU │
│                                                                │
│                                                                │
│  ADVANCING                                                     │
│  INTELLIGENCE.                                      •          │
│                                              •                 │
│                            •        •                         • │
│                                  ╱                             │
│                            •────•────•                          │
│                                  ╲                             │
│                                                                │
│  AI research and engineering                                  │
│  for intelligent systems that                                 │
│  learn, reason, build and discover.                            │
│                                                                │
│                                                                │
│  EXPLORE RESEARCH  ↓                                           │
│                                                                │
│────────────────────────────────────────────────────────────────│
│ OMX / 2026                          ACCRA / 05°33'N 00°12'W     │
└────────────────────────────────────────────────────────────────┘
```

The hero must prioritize:

1. typography,
2. whitespace,
3. research-oriented visual system,
4. concise copy,
5. minimal navigation.

---

# 38. Visual Anti-Patterns

Codex must not introduce the following unless explicitly requested later.

## Do not use

- giant glassmorphism panels,
- purple-to-blue gradient backgrounds everywhere,
- fake 3D robot imagery,
- glowing brains,
- random AI-generated abstract imagery,
- oversized rounded SaaS cards,
- excessive iconography,
- emoji-based UI,
- excessive pill buttons,
- random floating elements,
- unnecessary autoplay video,
- aggressive parallax,
- endless marquee text,
- decorative code snippets with no meaning,
- meaningless graph/network animations.

---

# 39. Engineering Constraints

1. Use reusable tokens rather than hard-coded arbitrary values.
2. Components must not define duplicate color systems locally.
3. All motion must have reduced-motion fallbacks.
4. Do not introduce complex WebGL before the static layout is correct.
5. Visualizations must degrade gracefully.
6. Prefer semantic HTML.
7. Keep major content server-renderable where possible.
8. Avoid client-side JavaScript for static editorial content.
9. Interactive components should be isolated client components.
10. Do not sacrifice Core Web Vitals for decorative animation.
11. Avoid cumulative layout shift from fonts or visualizations.
12. Mobile layouts must be intentionally designed.
13. Do not depend on hover for essential interaction.
14. Navigation should remain accessible without JavaScript where practical.
15. Design tokens should be the single source of truth.

---

# 40. Stage 1 Acceptance Criteria

Stage 1 is considered implemented when all of the following are true.

## Visual system

- [ ] Light-mode Omnexa palette is implemented.
- [ ] Dark experiential surface tokens exist.
- [ ] Omnexa Electric is implemented as the main accent.
- [ ] Typography hierarchy exists as reusable styles/components.
- [ ] Monospace metadata style exists.
- [ ] 12-column desktop grid exists.
- [ ] Responsive grid rules exist.
- [ ] Spacing tokens exist.
- [ ] Radius tokens exist.
- [ ] Motion tokens exist.
- [ ] Structural line/divider primitive exists.

## Components

- [ ] Global site header implemented.
- [ ] Responsive navigation implemented.
- [ ] Full-screen menu pattern implemented or scaffolded.
- [ ] Display heading component implemented.
- [ ] Technical label component implemented.
- [ ] Primary text action implemented.
- [ ] Research card primitive implemented.
- [ ] Research ID primitive implemented.
- [ ] Research status primitive implemented.
- [ ] System identifier primitive implemented.
- [ ] Layout section primitive implemented.

## Accessibility

- [ ] Keyboard navigation supported.
- [ ] Focus states implemented.
- [ ] `prefers-reduced-motion` supported.
- [ ] Hover actions have touch equivalents.
- [ ] WCAG AA color contrast checked.
- [ ] Semantic landmarks used.

## Responsive behavior

- [ ] Desktop composition is intentional.
- [ ] Tablet composition is intentional.
- [ ] Mobile composition is intentional.
- [ ] Display typography remains visually strong on small screens.
- [ ] Navigation works at all breakpoints.

## Performance

- [ ] No heavy visualization blocks initial content rendering.
- [ ] Interactive visualization code can be lazy-loaded.
- [ ] Static fallback exists for hero visualization.
- [ ] Fonts are optimized and preloaded appropriately.
- [ ] No unnecessary large client bundles are introduced.

---

# 41. Codex Implementation Sequence

Codex should implement Stage 1 in the following order.

## Phase 1 — Foundation

1. Create global reset/base styles.
2. Create design-token files.
3. Configure fonts.
4. Configure layout container and responsive grid.
5. Implement light and inverse theme primitives.

## Phase 2 — Typography and structure

1. Display heading.
2. Section heading.
3. Body styles.
4. Technical metadata.
5. Divider / structural line.
6. Page section primitive.

## Phase 3 — Navigation

1. Site header.
2. Desktop navigation.
3. Mobile navigation.
4. Full-screen menu.
5. Keyboard interactions.
6. Scroll-state behavior.

## Phase 4 — Brand components

1. Omnexa wordmark container.
2. Research identifier.
3. System identifier.
4. Status indicator.
5. Coordinate/location label.

## Phase 5 — Content primitives

1. Research card.
2. Research region.
3. System showcase region.
4. Text action links.
5. Large numerical statistic treatment.

## Phase 6 — Hero scaffold

Implement the hero without advanced animation first.

Required:

- headline,
- supporting copy,
- navigation,
- research CTA,
- static Intelligence Field placeholder,
- research metadata/footer line.

## Phase 7 — Motion foundation

1. Motion tokens.
2. Reveal patterns.
3. Navigation transitions.
4. Reduced-motion support.
5. Scroll state hooks.

## Phase 8 — Intelligence Field prototype

Implement a lightweight prototype after the static interface passes responsive and accessibility validation.

Preferred first version:

- Canvas 2D or SVG,
- approximately 40–100 nodes,
- deterministic seed,
- subtle pointer interaction,
- clustering behavior,
- no expensive physics requirement,
- reduced-motion static representation.

Do not introduce Three.js unless Canvas/SVG becomes insufficient.

---

# 42. Definition of Done for Codex

Codex must not treat Stage 1 as complete merely because the homepage looks visually similar to the specification.

The implementation is complete only when:

```text
visual identity
+ reusable design tokens
+ reusable components
+ responsive composition
+ accessibility
+ motion policy
+ visualization fallback
+ performance safeguards
```

are all present.

The goal is to create a **design system foundation that every future Omnexa page can inherit**.

---

# 43. Next Stage

After Stage 1 is implemented, proceed to:

> **Stage 2 — Omnexa Labs Information Architecture**

Stage 2 should define:

- all public routes,
- research hierarchy,
- systems hierarchy,
- publication structure,
- research project structure,
- experiment structure,
- ResearchOS presentation,
- company pages,
- careers,
- insights,
- search/navigation relationships,
- CMS/content model implications.

Do not finalize the homepage content architecture until Stage 2 is approved.

---

# 44. Compact Codex Directive

```text
Build the Omnexa Labs website as a frontier AI research and engineering institution,
not as a generic AI SaaS site.

Use scientific editorial minimalism, strong typography, asymmetric grids,
precise structural lines, sparse electric-blue accents, restrained motion,
and meaningful computational visualizations.

Prioritize content over cards, research evidence over decorative AI imagery,
and progressive enhancement over heavy visual effects.

The interface must remain visually complete, accessible, and understandable
when all animation and advanced visualizations are disabled.

Implement the design language as reusable tokens and components before
building page-specific styling.
```

