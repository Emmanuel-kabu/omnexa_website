# Omnexa Labs Website — Stage 5 Systems Experience

**Document type:** Implementation Specification  
**Audience:** Codex / Frontend Engineers / Product Designers / Systems Engineers / Content Engineers  
**Stage:** 5 — Systems Experience  
**Depends on:**
- `omnexa_labs_stage_1_visual_design_system.md`
- `omnexa_labs_stage_2_information_architecture.md`
- `omnexa_labs_stage_3_homepage_experience.md`
- `omnexa_labs_stage_4_research_experience.md`

---

# 1. Objective

Stage 5 defines the complete public systems experience for Omnexa Labs.

The Systems section must communicate:

> **Omnexa does not stop at research. It turns research into working systems.**

Cadence, MedApp, and ResearchOS must feel like major engineered systems with distinct purposes, architectures, research foundations, capabilities, and technical identities.

The experience must not feel like a SaaS pricing site, product-card gallery, feature checklist, or one duplicated landing-page template.

---

# 2. Systems Conceptual Model

```text
Research
   ↓
Methods
   ↓
Capabilities
   ↓
System Architecture
   ↓
Operational System
   ↓
Real-world Use
   ↓
Learning / Feedback
   ↺
Research
```

Every system page must connect visibly back to its research foundation.

---

# 3. Canonical Routes

```text
/systems/
├── cadence/
├── medapp/
├── researchos/
└── [future-system]/
```

The Systems landing page must be data-driven so future systems can be added without redesigning the architecture.

---

# 4. Systems Landing Page

Canonical order:

```text
01 Systems Hero
02 Systems Thesis
03 System Index
04 Cadence Preview
05 MedApp Preview
06 ResearchOS Preview
07 Research → Systems Map
08 Systems Principles
09 Related Research
10 Footer Transition
```

---

# 5. Systems Hero

Preferred headline:

```text
RESEARCH
IN OPERATION.
```

Supporting copy:

> Omnexa Labs transforms research into engineered systems that coordinate intelligence, support complex decision-making, and operate in real environments.

CTA:

```text
Explore systems ↓
```

---

# 6. Systems Thesis

Headline:

```text
A SYSTEM IS
WHERE RESEARCH
MEETS REALITY.
```

Supporting copy:

> Models, agents, algorithms, knowledge systems, and infrastructure become valuable when they can operate together reliably. Omnexa designs systems around that integration.

Secondary statement:

> Each Omnexa system has its own domain, but they share the same operating philosophy: intelligence should be coordinated, observable, testable, and capable of improving over time.

---

# 7. System Index

```text
001 / CADENCE
Autonomous Software Engineering

002 / MEDAPP
Medical Intelligence

003 / RESEARCHOS
AI-Native Research Infrastructure
```

Each item exposes:

```text
system ID
name
category
one-line thesis
status
related research areas
CTA
```

Do not render this as three equal cards.

---

# 8. Stable System IDs

```text
OMX-SYS-001  Cadence
OMX-SYS-002  MedApp
OMX-SYS-003  ResearchOS
```

IDs must remain stable over time.

---

# 9. System Status

Allowed:

```text
concept
research
development
alpha
beta
staging
production
internal
archived
```

Visibility remains separate:

```text
draft
public
unlisted
private
archived
```

---

# 10. Shared Detail Backbone

Every system should support:

```text
01 System Hero
02 Problem / Mission
03 Research Foundation
04 What the System Is
05 Architecture
06 Core Capabilities
07 Operating Model / Workflow
08 Technical Differentiators
09 Evidence / Current State
10 Use Cases
11 Related Research
12 Publications / Insights
13 Status / Roadmap Context
14 CTA
```

This is an information backbone, not a shared visual template.

---

# 11. System Data Model

```ts
type System = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  summary: string;
  status: SystemStatus;
  visibility: ContentVisibility;

  mission: string;
  problemStatement: RichContent;
  systemDefinition: RichContent;

  researchAreaIds: string[];
  researchProgramIds: string[];
  researchProjectIds: string[];
  publicationIds: string[];
  insightIds: string[];

  capabilities: SystemCapability[];
  architecture?: SystemArchitecture;
  workflows?: SystemWorkflow[];
  differentiators?: SystemDifferentiator[];
  useCases?: SystemUseCase[];
  evidence?: SystemEvidence[];

  externalUrl?: string;
  repositoryUrl?: string;
  createdAt?: string;
  updatedAt: string;
};
```

---

# 12. Capability Model

```ts
type SystemCapability = {
  id: string;
  title: string;
  summary: string;
  category?: string;
  maturity?: "research" | "experimental" | "operational";
  relatedResearchIds?: string[];
};
```

Capabilities are structured data, not prose hardcoded into components.

---

# 13. Evidence Model

Evidence must represent real proof.

```ts
type SystemEvidence =
  | {
      type: "architecture";
      title: string;
      description: string;
      artifactId?: string;
    }
  | {
      type: "metric";
      title: string;
      value: string;
      context: string;
      sourceId?: string;
    }
  | {
      type: "research";
      researchId: string;
    }
  | {
      type: "publication";
      publicationId: string;
    }
  | {
      type: "demo";
      title: string;
      mediaId: string;
    };
```

Only expose metrics backed by a verified source.

---

# 14. Shared System Visual Language

Use Stage 1 primitives:

```text
LINE
NODE
STATE
FLOW
LAYER
SIGNAL
GRID
TRAJECTORY
```

Each flagship system gets a different visual grammar:

```text
Cadence
→ lifecycle + specialized agent coordination

MedApp
→ knowledge + patient context + clinical relationships

ResearchOS
→ research pipeline + compute + experiment topology
```

---

# 15. CADENCE

Route:

```text
/systems/cadence/
```

Positioning:

> **A virtual software organization composed of specialized AI engineering roles coordinated across the software lifecycle.**

---

# 16. Cadence Hero

Metadata:

```text
SYSTEM / OMX-SYS-001
CATEGORY / AUTONOMOUS SOFTWARE ENGINEERING
```

Headline:

```text
CADENCE
```

Primary statement:

```text
A VIRTUAL
SOFTWARE
ORGANIZATION.
```

Supporting copy:

> Cadence coordinates specialized AI engineering agents across planning, design, development, quality, security, deployment, and monitoring — while keeping humans in control of direction, approvals, and critical decisions.

CTA:

```text
Explore architecture ↓
```

Do not use `Get Started` unless a real public flow exists.

---

# 17. Cadence Problem

Headline:

```text
SOFTWARE DELIVERY
IS A COORDINATION
PROBLEM.
```

Primary copy:

> Producing software is not one task. It is a coordinated sequence of planning, architecture, implementation, testing, security, deployment, and operation. Cadence treats AI engineering the same way: as a specialized organization rather than a single general-purpose assistant.

Core problem themes:

```text
requirements drift
handoffs
specialization
testing
security
deployment
context loss
operational feedback
```

---

# 18. Cadence Research Foundation

Potential research relationships:

```text
Autonomous Software Engineering
Multi-Agent Coordination
Long-Horizon Planning
Continual Learning
Agent Evaluation
Human-AI Collaboration
AI Systems Infrastructure
```

Only link to real research entities.

---

# 19. Cadence Lifecycle

```text
PLAN
  ↓
BUILD
  ↓
RUN
  ↓
DEPLOY
  ↓
MONITOR
  ↺
PLAN
```

Cross-cutting layers:

```text
Security
Memory
Evaluation
Observability
Human Approval
Knowledge
```

---

# 20. Cadence Organization View

```text
CLIENT / HUMAN
      ↓
PLANNING
├── Product Manager
├── Project Manager
├── Business Analyst
└── Tech Lead

BUILD
├── UI/UX
├── Frontend
├── Backend
├── Data
├── ML
└── DevOps

RUN
├── QA
└── Security

DEPLOY
└── Release / Infrastructure

MONITOR
└── Product / Reliability / Quality Signals
```

The interface should show work moving between roles, not just a static org chart.

---

# 21. Cadence Architecture

Public conceptual architecture:

```text
HUMAN DIRECTION
      ↓
PLANNING INTELLIGENCE
      ↓
WORK / PROJECT GRAPH
      ↓
SPECIALIZED ENGINEERING AGENTS
      ↓
TOOLS + SANDBOXES + REPOSITORIES
      ↓
QA + SECURITY
      ↓
DEPLOYMENT
      ↓
MONITORING / FEEDBACK
      ↺
MEMORY + LEARNING
```

Do not expose security-sensitive internals.

---

# 22. Cadence Interaction

Desktop:

```text
select lifecycle phase
→ highlight active roles
→ show inputs
→ show outputs
→ show tools
→ show next handoff
→ show feedback path
```

Mobile:

Use sequential lifecycle sections.

Never shrink the entire desktop architecture into unreadable nodes.

---

# 23. Cadence Capability Taxonomy

## Planning

```text
requirements analysis
feasibility
technical planning
project decomposition
architecture planning
continuous planning
```

## Engineering

```text
frontend engineering
backend engineering
data engineering
ML engineering
DevOps
design
```

## Quality

```text
web testing
mobile testing
desktop testing
regression
performance
```

## Security

```text
secure engineering
code analysis
defensive testing
vulnerability assessment
```

## Delivery

```text
environment management
deployment
release coordination
monitoring
```

## Coordination

```text
shared project context
agent handoffs
approval gates
human conferences
persistent memory
evaluation
```

---

# 24. Cadence Workspace Story

Publicly represent:

```text
Planning Workspace
Design Workspace
Engineering IDE
Project Board
QA Workspace
Security Workspace
Deployment
Monitoring
```

Do not expose private client data.

---

# 25. Cadence Differentiators

Defensible examples:

```text
specialized engineering roles rather than one agent
lifecycle-wide coordination
shared project state
human approval boundaries
role-specific tooling
quality/security as separate engineering functions
continuous feedback across delivery stages
```

Do not claim superiority over named competitors without evidence.

---

# 26. Cadence Evidence

Valid evidence patterns:

```text
architecture diagrams
real screenshots
workflow demonstrations
public technical notes
research references
measured evaluation results
```

Avoid:

```text
fake velocity multipliers
unsupported "50x" claims
fictional ROI
fabricated benchmark wins
```

---

# 27. Cadence Use Cases

```text
greenfield product development
large feature delivery
software modernization
multi-stack engineering
QA and security orchestration
continuous product improvement
```

These describe applicability, not guaranteed outcomes.

---

# 28. Cadence Section Order

```text
01 Hero
02 Coordination Problem
03 Research Foundation
04 Lifecycle
05 Organization View
06 Architecture
07 Capability Groups
08 Workspaces
09 Human-AI Collaboration
10 Evaluation / Evidence
11 Related Research
12 Engineering Insights
13 Current Status
14 CTA
```

---

# 29. MEDAPP

Route:

```text
/systems/medapp/
```

Positioning:

> **An intelligent healthcare platform built around medical knowledge, patient context, practitioner workflows, and specialized AI agents.**

---

# 30. MedApp Hero

Metadata:

```text
SYSTEM / OMX-SYS-002
CATEGORY / MEDICAL INTELLIGENCE
```

Headline:

```text
MEDAPP
```

Primary statement:

```text
MEDICAL
INTELLIGENCE.
```

Supporting copy:

> MedApp brings medical knowledge, patient context, clinical workflows, and specialized AI agents into one coordinated healthcare intelligence layer.

CTA:

```text
Explore the intelligence layer ↓
```

Avoid diagnostic or treatment claims that are not validated.

---

# 31. MedApp Problem

Headline:

```text
HEALTHCARE
CONTEXT IS
FRAGMENTED.
```

Primary copy:

> Healthcare information is distributed across people, records, measurements, medications, appointments, and medical knowledge. MedApp is designed to connect those signals into a structured intelligence layer that can support safer, more contextual healthcare experiences.

Preferred verbs:

```text
support
assist
organize
surface
coordinate
```

Avoid unsupported claims such as `replace doctors`, `guarantee`, or `diagnose accurately`.

---

# 32. MedApp Research Foundation

Possible relationships:

```text
Medical Knowledge Representation
Knowledge Graphs
Retrieval-Augmented Generation
Clinical NLP
Multimodal Understanding
Agent Coordination
Safety-Constrained AI
Personalized Recommendation
Human-AI Interaction
```

Link only to actual research entities.

---

# 33. MedApp Intelligence Layer

Central model:

```text
PATIENT CONTEXT
       ↕
MEDICAL KNOWLEDGE GRAPH
       ↕
SPECIALIZED AGENTS
       ↕
PRACTITIONER + HEALTHCARE WORKFLOWS
```

This should be the signature MedApp visual.

---

# 34. Medical Knowledge Graph

Potential public entities:

```text
Patient
Practitioner
Symptom
Disease
Lab Result
Medication
Drug
Appointment
Procedure
Condition
Allergy
Vital
Clinical Note
```

Potential grounding sources/standards may be referenced only when actually integrated or accurately described as planned:

```text
SNOMED CT
UMLS
ICD
LOINC
DrugBank
PubMed
ClinicalTrials.gov
```

Never imply licensing, certification, or production integration unless confirmed.

---

# 35. MedApp Agent Architecture

Possible public agents:

```text
MedAI / Medical Chat
Lab Reader
Smart Recommendation
Meal Planner
Booking
Medication Scanner
Concierge / Coordinator
```

Coordination:

```text
USER
  ↓
CONCIERGE
  ├── Medical Chat
  ├── Lab Reader
  ├── Medication Scanner
  ├── Recommendation
  ├── Meal Planner
  └── Booking
       ↓
MEDICAL KNOWLEDGE + PATIENT CONTEXT
```

---

# 36. MedAI Long-Session Experience

Describe MedAI as a persistent medical intelligence experience rather than a one-off chatbot.

Public concepts:

```text
session continuity
patient context
knowledge grounding
specialized agent handoff
structured medical history
```

Never expose private health data.

---

# 37. Medication Scanner

Public capability:

> Extract medication information from a photographed or uploaded medication container and connect recognized information to MedApp's medication intelligence layer.

Flow:

```text
PHOTO / UPLOAD
      ↓
VISION EXTRACTION
      ↓
MEDICATION ENTITY
      ↓
KNOWLEDGE MATCH
      ↓
PATIENT CONTEXT
```

Do not imply perfect recognition.

---

# 38. Lab Reader

```text
LAB REPORT
    ↓
STRUCTURED EXTRACTION
    ↓
TEST / VALUE / RANGE
    ↓
MEDICAL KNOWLEDGE
    ↓
PATIENT CONTEXT
```

Use careful framing:

```text
interpretive assistance
structured extraction
contextual explanation
```

---

# 39. MedApp Capability Taxonomy

## Medical Intelligence

```text
medical knowledge graph
context retrieval
medical Q&A
longitudinal context
```

## Multimodal Understanding

```text
lab document reading
medication image scanning
structured extraction
```

## Personalized Assistance

```text
recommendations
meal planning
context-aware guidance
```

## Healthcare Coordination

```text
booking
practitioner workflows
concierge routing
```

## Safety / Governance

```text
grounding
source attribution where available
risk-aware handoffs
human escalation
privacy boundaries
```

---

# 40. MedApp Safety Section

Mandatory headline:

```text
DESIGNED WITH
CLINICAL
BOUNDARIES.
```

Possible principles:

```text
assist rather than replace practitioners
distinguish information from diagnosis
use grounded medical knowledge
surface uncertainty
support human escalation
protect patient data
apply capability-specific safety rules
```

Only claim mechanisms that are real or explicitly planned.

---

# 41. MedApp Evidence

Possible evidence:

```text
architecture
knowledge schema
agent diagrams
evaluation methodology
extraction benchmarks
grounding evaluations
safety evaluation
real interface screenshots
```

Never fabricate medical accuracy metrics.

---

# 42. MedApp Section Order

```text
01 Hero
02 Fragmented Context Problem
03 Research Foundation
04 Intelligence Layer
05 Medical Knowledge Graph
06 Agent Architecture
07 MedAI Session
08 Lab Reader
09 Medication Scanner
10 Recommendations / Meal / Booking
11 Safety + Clinical Boundaries
12 Evidence / Evaluation
13 Related Research
14 Current Status
15 CTA
```

---

# 43. RESEARCHOS

Route:

```text
/systems/researchos/
```

Positioning:

> **An AI-native operating environment for human researchers and AI research agents.**

---

# 44. ResearchOS Hero

Metadata:

```text
SYSTEM / OMX-SYS-003
CATEGORY / RESEARCH INFRASTRUCTURE
STATUS / INTERNAL
```

Headline:

```text
RESEARCHOS
```

Primary statement:

```text
THE OPERATING
SYSTEM FOR
THE LAB.
```

Supporting copy:

> ResearchOS coordinates knowledge, datasets, experiments, agents, compute, evaluation, reproducibility, and publication across Omnexa's research workflow.

CTA:

```text
Explore the research runtime ↓
```

---

# 45. ResearchOS Problem

Headline:

```text
RESEARCH
FRAGMENTS
EASILY.
```

Primary copy:

> Research spans literature, datasets, notebooks, experiments, compute, model versions, evaluations, observations, and publications. Without a shared system, context disappears between tools and research becomes difficult to reproduce, coordinate, and extend.

---

# 46. ResearchOS Core Loop

```text
QUESTION
    ↓
KNOWLEDGE
    ↓
DATA
    ↓
EXPERIMENT
    ↓
COMPUTE
    ↓
EVALUATE
    ↓
DISCOVER
    ↓
PUBLISH
    ↺
KNOWLEDGE
```

Cross-cutting:

```text
Versioning
Reproducibility
Human Review
Agent Coordination
Security
Observability
Memory
```

---

# 47. ResearchOS Public Architecture

```text
RESEARCH EXPERIENCE
├── Human Researchers
└── AI Research Agents

KNOWLEDGE LAYER
├── Literature
├── Internal Knowledge
├── Research Memory
└── Search / Retrieval

EXPERIMENT LAYER
├── Projects
├── Hypotheses
├── Runs
├── Evaluations
└── Artifacts

DATA LAYER
├── Datasets
├── Acquisition
├── Annotation
└── Versioning

RUNTIME LAYER
├── CPU
├── GPU
├── Sandboxes
├── Notebooks
└── Scheduled Compute

EVALUATION LAYER
├── Benchmarks
├── Metrics
├── Critique
├── Safety
└── Reproducibility

OUTPUT LAYER
├── Reports
├── Publications
├── Models
└── Research Artifacts
```

---

# 48. Human + AI Research Collaboration

Core relationship:

```text
Human Researcher
       ↕
Shared Research State
       ↕
AI Research Agents
```

Public concepts:

```text
human direction
agent execution
review
critique
approval
shared context
repeatable experimentation
```

Avoid claiming autonomous science beyond actual capability.

---

# 49. ResearchOS Knowledge Layer

Potential capabilities:

```text
literature ingestion
research notes
vector search
knowledge graph
citation tracking
research memory
related-work discovery
```

---

# 50. ResearchOS Dataset Layer

```text
dataset catalog
versioning
data acquisition
annotation
lineage
quality checks
access boundaries
```

Do not expose private datasets.

---

# 51. ResearchOS Experiment Layer

```text
experiment definition
run tracking
config capture
artifact storage
comparison
reproduction
evaluation
```

Emphasize lineage rather than dashboard aesthetics.

---

# 52. ResearchOS Runtime

```text
Research Task
    ↓
Scheduler
    ↓
Sandbox
    ↓
CPU / GPU Pool
    ↓
Run
    ↓
Artifacts + Metrics
```

Never expose provider credentials or sensitive network topology.

---

# 53. ResearchOS Agent Layer

Potential classes:

```text
Literature Agent
Dataset Agent
Experiment Agent
Evaluation Agent
Critique Agent
Research Writer
Autonomous Scientist Variants
```

Present specialization and coordination, not magic autonomy.

---

# 54. ResearchOS Evaluation

Potential capabilities:

```text
benchmark harness
offline metrics
human review
automated critique
reproducibility checks
safety checks
experiment comparison
```

This should be one of the strongest credibility sections.

---

# 55. ResearchOS Publication Pipeline

```text
Experiment
    ↓
Results
    ↓
Review
    ↓
Figures
    ↓
Draft
    ↓
Citation / References
    ↓
Publication Artifact
```

Never imply automated scientific validity.

---

# 56. ResearchOS Section Order

```text
01 Hero
02 Research Fragmentation Problem
03 Research Lifecycle
04 Architecture
05 Human + AI Collaboration
06 Knowledge
07 Datasets
08 Experiments
09 Compute Runtime
10 Agent Layer
11 Evaluation
12 Reproducibility
13 Publication
14 Related Research
15 Internal Status / Public Boundary
16 CTA
```

---

# 57. Distinct Motion Grammar

## Cadence

```text
coordination
handoffs
parallel work
feedback loops
```

Geometry:

```text
lanes
role nodes
project graph
pipeline
```

## MedApp

```text
context accumulation
relationship traversal
agent routing
knowledge grounding
```

Geometry:

```text
knowledge graph
entity clusters
patient-centered relationships
```

## ResearchOS

```text
experiment lineage
pipeline progression
resource scheduling
knowledge accumulation
```

Geometry:

```text
layers
runtime topology
research DAG
artifact flow
```

---

# 58. Research → Systems Map

The Systems landing page should visualize real research lineage.

Conceptual example:

```text
DEVELOPMENTAL INTELLIGENCE
   ├── Lifelong Learning ───────────────┐
   └── Autonomous Research ────────┐    │
                                   │    │
FOUNDATION MODELS                  │    │
   ├── Agents ───────────────┐     │    │
   └── Multimodal ───────┐   │     │    │
                         │   │     │    │
AI SOFTWARE SYSTEMS      │   │     │    │
   └── Autonomous SE ────┼───┼─────┼──→ CADENCE
                         │   │     │
                         ├──→ MEDAPP
                         │
                         └──→ RESEARCHOS
```

Actual edges must come from structured relationships.

---

# 59. Systems Principles

Headline:

```text
HOW WE BUILD
SYSTEMS.
```

Potential principles:

```text
Research-grounded
Specialized over generic
Observable
Evaluated
Human-directed
Secure by design
Context-aware
Designed to learn
```

Only retain principles Omnexa intends to apply consistently.

---

# 60. Architecture Components

```text
src/components/systems/architecture/
├── architecture-canvas.tsx
├── architecture-layer.tsx
├── architecture-node.tsx
├── architecture-edge.tsx
├── architecture-detail-panel.tsx
├── architecture-mobile-list.tsx
├── architecture-static.tsx
└── use-architecture-selection.ts
```

Generic architecture components must not contain Cadence-specific assumptions.

---

# 61. System Component Structure

```text
src/components/systems/
├── landing/
│   ├── systems-hero.tsx
│   ├── systems-thesis.tsx
│   ├── systems-index.tsx
│   ├── system-preview.tsx
│   ├── research-system-map.tsx
│   └── systems-principles.tsx
│
├── cadence/
│   ├── cadence-hero.tsx
│   ├── cadence-lifecycle.tsx
│   ├── cadence-organization.tsx
│   ├── cadence-architecture.tsx
│   ├── cadence-capabilities.tsx
│   ├── cadence-workspaces.tsx
│   └── cadence-evidence.tsx
│
├── medapp/
│   ├── medapp-hero.tsx
│   ├── medapp-intelligence-layer.tsx
│   ├── medical-knowledge-graph.tsx
│   ├── medapp-agent-network.tsx
│   ├── medapp-lab-reader.tsx
│   ├── medication-scanner.tsx
│   ├── medapp-safety.tsx
│   └── medapp-evidence.tsx
│
├── researchos/
│   ├── researchos-hero.tsx
│   ├── researchos-lifecycle.tsx
│   ├── researchos-architecture.tsx
│   ├── researchos-collaboration.tsx
│   ├── researchos-knowledge.tsx
│   ├── researchos-datasets.tsx
│   ├── researchos-experiments.tsx
│   ├── researchos-runtime.tsx
│   ├── researchos-agents.tsx
│   ├── researchos-evaluation.tsx
│   └── researchos-publication.tsx
│
├── architecture/
├── capability/
├── evidence/
├── relationships/
└── shared/
```

---

# 62. Route Structure

```text
src/app/(site)/systems/
├── page.tsx
├── cadence/
│   └── page.tsx
├── medapp/
│   └── page.tsx
└── researchos/
    └── page.tsx
```

Dedicated flagship routes are preferred over one generic renderer because each needs different art direction.

---

# 63. Query Layer

```text
src/content/queries/systems/
├── get-systems-home.ts
├── get-cadence.ts
├── get-medapp.ts
├── get-researchos.ts
├── get-system-research.ts
├── get-system-insights.ts
└── get-system-evidence.ts
```

---

# 64. Architecture Data Contract

```ts
type SystemArchitecture = {
  title: string;
  description?: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  layers?: ArchitectureLayer[];
};

type ArchitectureNode = {
  id: string;
  label: string;
  type: string;
  summary?: string;
  group?: string;
};

type ArchitectureEdge = {
  id: string;
  source: string;
  target: string;
  label?: string;
  direction?: "forward" | "bidirectional";
};
```

Keep visualization data outside JSX.

---

# 65. Capability Presentation Rules

Avoid generic capability cards.

Preferred patterns:

```text
editorial index
interactive taxonomy
layered diagram
workflow annotation
technical table
```

---

# 66. Evidence vs Claims

Clearly distinguish:

```text
CAPABILITY
CLAIM
EVIDENCE
STATUS
```

Example:

```text
CAPABILITY
Multi-agent engineering coordination

EVIDENCE
Architecture demonstration
Research reference
Evaluation report

STATUS
Development
```

---

# 67. Maturity Labels

Optional:

```text
RESEARCH
EXPERIMENTAL
OPERATIONAL
```

Use only if Omnexa defines these internally.

---

# 68. Current Status

Every flagship system should show its actual state.

Example:

```text
STATUS / DEVELOPMENT
```

or:

```text
STATUS / INTERNAL
```

Explain what the state means. Avoid fake launch countdowns.

---

# 69. CTA Rules

Valid:

```text
Explore architecture
Read related research
View technical notes
Visit system
Contact Omnexa
```

Only use:

```text
Try now
Request access
Join waitlist
```

when a real corresponding flow exists.

---

# 70. Responsive Architecture

Desktop:

```text
diagram + contextual detail panel
```

Tablet:

```text
simplified diagram + stacked detail
```

Mobile:

```text
semantic step list
expandable layers
small supporting visual
```

Never shrink a complex desktop diagram into unreadable mobile content.

---

# 71. Accessibility

For informational architecture diagrams, provide semantic equivalents.

Example:

```text
Layer
  Node
  Relationship
```

Requirements:

```text
keyboard selection
visible focus
touch equivalents
reduced-motion version
textual architecture alternative
one H1 per route
logical headings
```

---

# 72. Motion Rules

Motion must reflect system behavior.

Cadence:

```text
work packet moves
handoff occurs
feedback returns
```

MedApp:

```text
context activates
knowledge relation traverses
agent receives grounded context
```

ResearchOS:

```text
experiment progresses
compute activates
evaluation returns
artifact enters knowledge
```

No random floating motion.

---

# 73. Reduced Motion

Replace animated diagrams with:

```text
static selected state
instant layer transitions
visible arrows
step labels
```

No critical information may depend on animation.

---

# 74. Performance

Heavy diagrams must:

```text
lazy load
pause offscreen
prefer SVG/Canvas over WebGL
avoid continuous force simulation
```

Targets:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

A stable DAG/layout is generally better than a live force simulation for architecture.

---

# 75. Search Integration

Global search should index:

```text
system title
system ID
capabilities
research relationships
insights
public architecture labels
```

Example:

```text
"medication scanner"
→ MedApp / Medication Scanner
```

---

# 76. SEO

```text
Systems — Omnexa Labs
Cadence — Autonomous Software Engineering | Omnexa Labs
MedApp — Medical Intelligence | Omnexa Labs
ResearchOS — AI Research Infrastructure | Omnexa Labs
```

Descriptions must reflect actual capability.

---

# 77. Structured Data

Possible:

```text
SoftwareApplication
WebApplication
Organization
BreadcrumbList
```

Use only when the classification is accurate.

Do not mark internal ResearchOS as a public software application if it is not publicly available.

---

# 78. Open Graph

Cadence:

```text
CADENCE
A VIRTUAL SOFTWARE ORGANIZATION
```

MedApp:

```text
MEDAPP
MEDICAL INTELLIGENCE
```

ResearchOS:

```text
RESEARCHOS
THE OPERATING SYSTEM FOR THE LAB
```

Each should retain Omnexa's master visual identity while using system-specific visual grammar.

---

# 79. Analytics

Recommended public events:

```text
systems_index_open
system_open
system_architecture_select
system_capability_open
system_research_open
system_publication_open
system_insight_open
system_evidence_open

cadence_phase_select
cadence_role_select

medapp_agent_select
medapp_knowledge_entity_select

researchos_layer_select
researchos_runtime_step_select
```

Never capture private health information or sensitive content.

---

# 80. MedApp Privacy

Public analytics must never include:

```text
patient data
symptoms
medication names entered by a user
lab values
health identifiers
uploaded medical content
```

The public website should not collect health data unless explicitly designed and governed for that purpose.

---

# 81. Content Integrity

Never invent:

```text
customer counts
deployment counts
clinical outcomes
benchmark wins
uptime
performance multipliers
revenue impact
engineering speedups
research citations
security guarantees
```

Unknown values must be omitted.

---

# 82. Medical Claims Integrity

MedApp must clearly distinguish:

```text
system capability
research hypothesis
clinical evidence
medical guidance
```

Never imply regulatory approval unless verified.

Avoid unsupported claims such as:

```text
clinically proven
diagnoses accurately
prevents disease
replaces consultation
guarantees treatment
```

---

# 83. Security Boundary

Cadence and ResearchOS pages must not expose:

```text
private IPs
credentials
network topology
security bypasses
internal access patterns
sensitive sandbox controls
```

Use conceptual architecture where appropriate.

---

# 84. Systems Anti-Template Rules

Codex must reject:

```text
three product cards
pricing sections
fake testimonials
gradient feature grids
device mockups everywhere
random 3D cubes
generic "AI-powered" badges
unsupported competitor comparison tables
```

The systems layer remains institutional and technical.

---

# 85. Local Navigation

Shared:

```text
Overview
Research
Architecture
Capabilities
Evidence
Related Work
```

Cadence extensions:

```text
Lifecycle
Organization
Workspaces
```

MedApp extensions:

```text
Knowledge
Agents
Safety
```

ResearchOS extensions:

```text
Runtime
Experiments
Evaluation
```

---

# 86. Codex Implementation Sequence

## Phase 1 — System Domain Models

Implement:

```text
System
SystemStatus
Capability
Architecture
Workflow
Differentiator
Evidence
UseCase
ResearchRelationship
```

Add validation schemas.

## Phase 2 — Systems Landing

Create `/systems` with:

```text
hero
thesis
system index
three flagship previews
research-system map
principles
```

Use static diagrams first.

## Phase 3 — Dedicated Routes

Create:

```text
/systems/cadence
/systems/medapp
/systems/researchos
```

Complete semantic hierarchy before advanced visuals.

## Phase 4 — Research Relationships

Connect systems to:

```text
research areas
programs
projects
publications
insights
```

Use explicit relationships.

## Phase 5 — Cadence Architecture

Implement:

```text
lifecycle
organization
architecture
capability taxonomy
workspace model
human-AI collaboration
```

## Phase 6 — MedApp Architecture

Implement:

```text
intelligence layer
knowledge graph
agent network
lab reader
medication scanner
safety
```

Run medical-claims review.

## Phase 7 — ResearchOS Architecture

Implement:

```text
research lifecycle
layered architecture
human-AI collaboration
knowledge
data
experiments
runtime
agents
evaluation
publication
```

Enforce public/private boundaries.

## Phase 8 — Evidence

Add only real:

```text
research links
screenshots
evaluation artifacts
technical notes
verified metrics
```

## Phase 9 — Responsive Architecture

Build mobile-native alternatives for each major diagram.

## Phase 10 — Motion

Add only semantic motion after static experience is approved.

## Phase 11 — SEO / Analytics / Accessibility

Implement metadata, breadcrumbs, analytics, keyboard equivalents, screen-reader alternatives, and reduced motion.

## Phase 12 — Performance Audit

Measure:

```text
LCP
INP
CLS
diagram render cost
bundle size
animation cost
mobile interaction
```

Remove unnecessary complexity.

---

# 87. Stage 5 Acceptance Criteria

## Systems Landing

- [ ] Systems hero exists.
- [ ] Systems thesis exists.
- [ ] Systems are data-driven.
- [ ] Cadence preview is distinct and substantial.
- [ ] MedApp preview is distinct and substantial.
- [ ] ResearchOS preview is distinct and substantial.
- [ ] Research → Systems map uses real relationships.
- [ ] No generic product-card grid is used.

## Cadence

- [ ] Approved hero positioning is used.
- [ ] Coordination problem is clear.
- [ ] Research foundation is linked.
- [ ] Plan → Build → Run → Deploy → Monitor is represented.
- [ ] Specialized roles are represented.
- [ ] Architecture is represented.
- [ ] Capability taxonomy is structured.
- [ ] Human-AI collaboration is described.
- [ ] Evidence is distinguished from claims.
- [ ] No unsupported productivity claims are present.
- [ ] Mobile architecture is readable.

## MedApp

- [ ] Approved hero positioning is used.
- [ ] Fragmented-context problem is clear.
- [ ] Research foundation is linked.
- [ ] Patient context / knowledge / agent architecture is represented.
- [ ] Medical knowledge graph is represented conceptually.
- [ ] Specialized agent network is represented.
- [ ] Lab Reader is represented.
- [ ] Medication Scanner is represented.
- [ ] Safety / clinical boundaries section exists.
- [ ] No unsupported clinical claims are present.
- [ ] Public analytics do not capture health data.

## ResearchOS

- [ ] Approved hero positioning is used.
- [ ] Research fragmentation problem is clear.
- [ ] Research lifecycle is represented.
- [ ] Layered architecture is represented.
- [ ] Human + AI collaboration is represented.
- [ ] Knowledge layer is represented.
- [ ] Dataset layer is represented.
- [ ] Experiment layer is represented.
- [ ] Compute runtime is represented.
- [ ] Agent layer is represented.
- [ ] Evaluation and reproducibility are represented.
- [ ] Publication workflow is represented.
- [ ] Public/private boundary is enforced.

## Content/Data

- [ ] System schemas exist.
- [ ] Capabilities are structured.
- [ ] Research relationships are structured.
- [ ] Evidence is structured.
- [ ] Status and visibility are separate.
- [ ] Architecture data is separate from JSX.

## Accessibility

- [ ] One H1 per route.
- [ ] Architecture diagrams have semantic equivalents.
- [ ] Keyboard mirrors pointer interaction.
- [ ] Reduced motion works.
- [ ] Mobile does not depend on hover.
- [ ] Focus is visible.
- [ ] 200% zoom preserves reading order.

## Performance

- [ ] Heavy diagrams are lazy-loaded.
- [ ] No unnecessary continuous force simulation.
- [ ] Offscreen animation pauses.
- [ ] Production performance is measured.
- [ ] No system route becomes one giant client bundle.

## Integrity

- [ ] No fabricated metrics.
- [ ] No fabricated deployments.
- [ ] No fabricated clinical outcomes.
- [ ] No fabricated research relationships.
- [ ] No unsupported regulatory claims.
- [ ] No security-sensitive details leak.

---

# 88. Non-Goals

Do not build in Stage 5:

```text
authenticated Cadence application
authenticated MedApp application
private ResearchOS runtime
live patient workflows
real deployment controls
private project data
private research experiments
billing/pricing
customer portal
company pages
careers application system
```

Stage 5 is the public systems experience.

---

# 89. Quality Bar

A sophisticated visitor should be able to answer:

```text
What problem does this system address?
Which research ideas inform it?
What is its architecture?
What are its major capabilities?
How does information or work flow through it?
What evidence exists?
What is its current maturity?
How does it connect back to Omnexa research?
```

without encountering generic marketing filler.

---

# 90. Final Systems Narrative

The visitor enters:

```text
RESEARCH
IN OPERATION.
```

They encounter three distinct expressions of Omnexa's research-to-system philosophy:

```text
CADENCE
→ intelligence coordinating software engineering

MEDAPP
→ intelligence organizing medical knowledge and context

RESEARCHOS
→ intelligence coordinating the research process itself
```

The systems layer demonstrates:

> **Research creates capability. Architecture coordinates capability. Systems make capability operational.**
