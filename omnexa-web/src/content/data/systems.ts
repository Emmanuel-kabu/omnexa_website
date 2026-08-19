import type { System } from "../schemas/systems";

/**
 * The three Omnexa systems.
 * Stage 3 §19-20, Stage 5 §15-56
 *
 * NOT sample content: positioning, headlines, lifecycle stages and
 * architecture concepts are specified across Stage 3 and Stage 5.
 *
 * Two integrity constraints are enforced by construction here:
 *   · `evidence` is empty for all three. Stage 5 §13/§26/§41 permit only
 *     verified, sourced evidence, and none has been supplied, so rather than
 *     inventing benchmark wins or velocity multipliers, the sections that
 *     consume evidence render their empty state.
 *   · MedApp's copy uses only the permitted verbs (support, assist, organise,
 *     surface, coordinate) and makes no diagnostic or outcome claim
 *     (Stage 5 §31, §82).
 */
export const systems: System[] = [
  {
    id: "OMX-SYS-001",
    index: "001",
    title: "Cadence",
    slug: "cadence",
    category: "Autonomous Software Engineering",
    tagline: "A virtual software organization.",
    statement: ["A virtual", "software", "organization."],
    summary:
      "Cadence coordinates specialized AI engineering agents across planning, building, testing, security, deployment, and monitoring: creating a software delivery system designed around collaborative intelligence.",
    status: "development",
    statusNote:
      "Cadence is in active development. Architecture and coordination model are established; the system is not publicly available.",
    mission:
      "Treat AI engineering as a specialized organization rather than a single general-purpose assistant.",
    problemHeadline: ["Software delivery", "is a coordination", "problem."],
    problemStatement:
      "Producing software is not one task. It is a coordinated sequence of planning, architecture, implementation, testing, security, deployment, and operation. Cadence treats AI engineering the same way: as a specialized organization rather than a single general-purpose assistant.",
    systemDefinition:
      "Cadence coordinates specialized AI engineering agents across planning, design, development, quality, security, deployment, and monitoring, while keeping humans in control of direction, approvals, and critical decisions.",
    lifecycle: ["Plan", "Build", "Run", "Deploy", "Monitor"],

    researchAreaIds: ["area-ai-software-systems", "area-foundation-models"],
    researchProgramIds: ["OMX-SE-002"],
    researchProjectIds: [],
    publicationIds: [],
    insightIds: ["insight-specialized-engineering-agents"],

    capabilities: [
      {
        id: "cadence-planning",
        title: "Planning",
        summary:
          "Requirements analysis, feasibility, technical planning, project decomposition and architecture planning as continuous rather than up-front activities.",
        category: "Planning",
        maturity: "experimental",
        relatedResearchIds: ["area-ai-software-systems"],
      },
      {
        id: "cadence-engineering",
        title: "Engineering",
        summary:
          "Frontend, backend, data, ML and DevOps engineering handled by role-specific agents with role-specific tooling.",
        category: "Engineering",
        maturity: "experimental",
        relatedResearchIds: ["area-ai-software-systems"],
      },
      {
        id: "cadence-quality",
        title: "Quality",
        summary:
          "Web, mobile and desktop testing, regression and performance work treated as a distinct engineering function.",
        category: "Quality",
        maturity: "research",
        relatedResearchIds: [],
      },
      {
        id: "cadence-security",
        title: "Security",
        summary:
          "Secure engineering, code analysis, defensive testing and vulnerability assessment as a separate function rather than a final gate.",
        category: "Security",
        maturity: "research",
        relatedResearchIds: ["area-ai-software-systems"],
      },
      {
        id: "cadence-delivery",
        title: "Delivery",
        summary:
          "Environment management, deployment, release coordination and monitoring.",
        category: "Delivery",
        maturity: "research",
        relatedResearchIds: [],
      },
      {
        id: "cadence-coordination",
        title: "Coordination",
        summary:
          "Shared project context, agent handoffs, approval gates and persistent memory across the delivery lifecycle.",
        category: "Coordination",
        maturity: "experimental",
        relatedResearchIds: ["area-foundation-models"],
      },
    ],

    architecture: {
      title: "Cadence conceptual architecture",
      description:
        "Human direction enters at the top and returns as approval throughout. Work moves down through planning into specialised engineering, and operational feedback returns to memory and learning.",
      nodes: [
        { id: "human", label: "Human direction", type: "actor", group: "direction" },
        { id: "planning", label: "Planning intelligence", type: "layer", group: "plan" },
        { id: "graph", label: "Work / project graph", type: "state", group: "plan" },
        { id: "agents", label: "Specialized engineering agents", type: "layer", group: "build" },
        { id: "tools", label: "Tools, sandboxes, repositories", type: "layer", group: "build" },
        { id: "qa", label: "QA + security", type: "layer", group: "run" },
        { id: "deploy", label: "Deployment", type: "layer", group: "deploy" },
        { id: "monitor", label: "Monitoring / feedback", type: "layer", group: "monitor" },
        { id: "memory", label: "Memory + learning", type: "state", group: "monitor" },
      ],
      edges: [
        { id: "e1", source: "human", target: "planning", direction: "bidirectional", label: "direction / approval" },
        { id: "e2", source: "planning", target: "graph", direction: "forward" },
        { id: "e3", source: "graph", target: "agents", direction: "forward" },
        { id: "e4", source: "agents", target: "tools", direction: "bidirectional" },
        { id: "e5", source: "agents", target: "qa", direction: "forward" },
        { id: "e6", source: "qa", target: "deploy", direction: "forward" },
        { id: "e7", source: "deploy", target: "monitor", direction: "forward" },
        { id: "e8", source: "monitor", target: "memory", direction: "forward" },
        { id: "e9", source: "memory", target: "planning", direction: "forward", label: "feedback" },
      ],
      layers: [
        { id: "direction", label: "Direction", nodeIds: ["human"] },
        { id: "plan", label: "Plan", nodeIds: ["planning", "graph"] },
        { id: "build", label: "Build", nodeIds: ["agents", "tools"] },
        { id: "run", label: "Run", nodeIds: ["qa"] },
        { id: "deploy", label: "Deploy", nodeIds: ["deploy"] },
        { id: "monitor", label: "Monitor", nodeIds: ["monitor", "memory"] },
      ],
    },

    differentiators: [
      {
        id: "cadence-diff-roles",
        title: "Specialized roles rather than one agent",
        summary:
          "Engineering functions are modelled as distinct roles with distinct tooling and distinct evaluation.",
      },
      {
        id: "cadence-diff-lifecycle",
        title: "Lifecycle-wide coordination",
        summary:
          "Coordination spans planning through monitoring rather than stopping at code generation.",
      },
      {
        id: "cadence-diff-human",
        title: "Human approval boundaries",
        summary:
          "Direction, approvals and critical decisions remain explicitly human.",
      },
    ],

    useCases: [
      {
        id: "cadence-uc-greenfield",
        title: "Greenfield product development",
        summary: "Coordinated delivery from planning through first release.",
      },
      {
        id: "cadence-uc-modernization",
        title: "Software modernization",
        summary: "Multi-stack engineering across an existing codebase.",
      },
      {
        id: "cadence-uc-quality",
        title: "QA and security orchestration",
        summary: "Quality and defensive testing as continuous functions.",
      },
    ],

    evidence: [],
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-14",
  },

  {
    id: "OMX-SYS-002",
    index: "002",
    title: "MedApp",
    slug: "medapp",
    category: "Medical Intelligence",
    tagline: "Medical intelligence.",
    statement: ["Medical", "intelligence."],
    summary:
      "MedApp brings together medical knowledge, patient context, clinical workflows, and specialized AI agents to create a more intelligent healthcare experience.",
    status: "development",
    statusNote:
      "MedApp is in development. Described capabilities reflect system design, not validated clinical performance.",
    mission:
      "Connect distributed healthcare signals into a structured intelligence layer that can support safer, more contextual healthcare experiences.",
    problemHeadline: ["Healthcare", "context is", "fragmented."],
    problemStatement:
      "Healthcare information is distributed across people, records, measurements, medications, appointments, and medical knowledge. MedApp is designed to connect those signals into a structured intelligence layer that can support safer, more contextual healthcare experiences.",
    systemDefinition:
      "MedApp brings medical knowledge, patient context, clinical workflows, and specialized AI agents into one coordinated healthcare intelligence layer.",
    lifecycle: [
      "Patient context",
      "Medical knowledge",
      "Specialized agents",
      "Clinical workflows",
    ],

    researchAreaIds: ["area-foundation-models", "area-developmental-intelligence"],
    researchProgramIds: [],
    researchProjectIds: [],
    publicationIds: [],
    insightIds: [],

    capabilities: [
      {
        id: "medapp-knowledge",
        title: "Medical intelligence",
        summary:
          "A medical knowledge graph with context retrieval and longitudinal patient context.",
        category: "Medical Intelligence",
        maturity: "research",
        relatedResearchIds: ["area-foundation-models"],
      },
      {
        id: "medapp-multimodal",
        title: "Multimodal understanding",
        summary:
          "Structured extraction from lab documents and medication images.",
        category: "Multimodal Understanding",
        maturity: "research",
        relatedResearchIds: ["area-foundation-models"],
      },
      {
        id: "medapp-assistance",
        title: "Personalized assistance",
        summary:
          "Context-aware guidance, recommendations and planning surfaced to the person, not prescribed to them.",
        category: "Personalized Assistance",
        maturity: "research",
        relatedResearchIds: [],
      },
      {
        id: "medapp-coordination",
        title: "Healthcare coordination",
        summary:
          "Booking, practitioner workflows and concierge routing between specialised agents.",
        category: "Healthcare Coordination",
        maturity: "research",
        relatedResearchIds: [],
      },
      {
        id: "medapp-safety",
        title: "Safety and governance",
        summary:
          "Grounding, source attribution where available, risk-aware handoffs, human escalation and privacy boundaries.",
        category: "Safety / Governance",
        maturity: "research",
        relatedResearchIds: [],
      },
    ],

    architecture: {
      title: "MedApp intelligence layer",
      description:
        "Patient context and medical knowledge ground a set of specialised agents, which surface information into practitioner and clinical workflows. Every relationship is bidirectional: context informs knowledge retrieval, and clinical workflows return new context.",
      nodes: [
        { id: "patient", label: "Patient context", type: "context", group: "context" },
        { id: "knowledge", label: "Medical knowledge graph", type: "knowledge", group: "knowledge" },
        { id: "agents", label: "Specialized agents", type: "layer", group: "agents" },
        { id: "practitioner", label: "Practitioner + clinical workflows", type: "actor", group: "workflow" },
      ],
      edges: [
        { id: "m1", source: "patient", target: "knowledge", direction: "bidirectional" },
        { id: "m2", source: "knowledge", target: "agents", direction: "bidirectional" },
        { id: "m3", source: "agents", target: "practitioner", direction: "bidirectional" },
      ],
      layers: [],
    },

    differentiators: [
      {
        id: "medapp-diff-context",
        title: "Context as the primary structure",
        summary:
          "Patient context is a first-class part of the system rather than a prompt appended to a chat.",
      },
      {
        id: "medapp-diff-grounding",
        title: "Grounded rather than generative-only",
        summary:
          "Responses are connected to structured medical knowledge, with uncertainty surfaced rather than hidden.",
      },
      {
        id: "medapp-diff-boundaries",
        title: "Explicit clinical boundaries",
        summary:
          "The system is designed to assist practitioners and to escalate to humans, not to replace consultation.",
      },
    ],

    useCases: [],
    evidence: [],
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 20,
    updatedAt: "2026-08-14",
  },

  {
    id: "OMX-SYS-003",
    index: "003",
    title: "ResearchOS",
    slug: "researchos",
    category: "Research Infrastructure",
    tagline: "The operating system for the lab.",
    statement: ["The operating", "system for", "the lab."],
    summary:
      "ResearchOS coordinates knowledge, datasets, experiments, agents, compute, evaluation, reproducibility, and publication across Omnexa's research workflow.",
    status: "internal",
    statusNote:
      "ResearchOS is internal research infrastructure. This page describes the platform conceptually; the environment itself is not publicly available.",
    mission:
      "Help human researchers and AI research agents work inside the same research system.",
    problemHeadline: ["Research", "fragments", "easily."],
    problemStatement:
      "Research spans literature, datasets, notebooks, experiments, compute, model versions, evaluations, observations, and publications. Without a shared system, context disappears between tools and research becomes difficult to reproduce, coordinate, and extend.",
    systemDefinition:
      "ResearchOS is Omnexa Labs' internal research environment for coordinating knowledge, datasets, experiments, agents, compute, evaluation, and reproducible scientific work.",
    lifecycle: [
      "Question",
      "Knowledge",
      "Data",
      "Experiment",
      "Compute",
      "Evaluate",
      "Discover",
      "Publish",
    ],

    researchAreaIds: ["area-developmental-intelligence", "area-ai-software-systems"],
    researchProgramIds: ["OMX-DI-004"],
    researchProjectIds: [],
    publicationIds: [],
    insightIds: ["insight-research-environments"],

    capabilities: [
      {
        id: "researchos-knowledge",
        title: "Knowledge",
        summary:
          "Literature ingestion, research notes, search and retrieval, citation tracking and research memory.",
        category: "Knowledge",
        maturity: "operational",
        relatedResearchIds: ["area-developmental-intelligence"],
      },
      {
        id: "researchos-datasets",
        title: "Datasets",
        summary:
          "Dataset catalog, versioning, acquisition, annotation, lineage and access boundaries.",
        category: "Data",
        maturity: "operational",
        relatedResearchIds: [],
      },
      {
        id: "researchos-experiments",
        title: "Experiments",
        summary:
          "Experiment definition, run tracking, config capture, artifact storage, comparison and reproduction.",
        category: "Experiments",
        maturity: "operational",
        relatedResearchIds: [],
      },
      {
        id: "researchos-runtime",
        title: "Compute runtime",
        summary:
          "Scheduling of research tasks into sandboxed CPU and GPU execution, returning artifacts and metrics.",
        category: "Runtime",
        maturity: "experimental",
        relatedResearchIds: [],
      },
      {
        id: "researchos-agents",
        title: "Agent layer",
        summary:
          "Literature, dataset, experiment, evaluation and critique agents working under human direction.",
        category: "Agents",
        maturity: "experimental",
        relatedResearchIds: ["area-developmental-intelligence"],
      },
      {
        id: "researchos-evaluation",
        title: "Evaluation",
        summary:
          "Benchmark harness, offline metrics, human review, automated critique and reproducibility checks.",
        category: "Evaluation",
        maturity: "operational",
        relatedResearchIds: [],
      },
    ],

    architecture: {
      title: "ResearchOS layered architecture",
      description:
        "Human researchers and AI research agents share one research state. Knowledge, data, experiment, runtime, evaluation and output layers sit beneath that shared surface.",
      nodes: [
        { id: "experience", label: "Research experience", type: "layer", group: "surface" },
        { id: "knowledge", label: "Knowledge layer", type: "layer", group: "core" },
        { id: "experiment", label: "Experiment layer", type: "layer", group: "core" },
        { id: "data", label: "Data layer", type: "layer", group: "core" },
        { id: "runtime", label: "Runtime layer", type: "layer", group: "core" },
        { id: "evaluation", label: "Evaluation layer", type: "layer", group: "core" },
        { id: "output", label: "Output layer", type: "layer", group: "output" },
      ],
      edges: [
        { id: "r1", source: "experience", target: "knowledge", direction: "bidirectional" },
        { id: "r2", source: "knowledge", target: "experiment", direction: "forward" },
        { id: "r3", source: "data", target: "experiment", direction: "forward" },
        { id: "r4", source: "experiment", target: "runtime", direction: "forward" },
        { id: "r5", source: "runtime", target: "evaluation", direction: "forward" },
        { id: "r6", source: "evaluation", target: "output", direction: "forward" },
        { id: "r7", source: "output", target: "knowledge", direction: "forward", label: "accumulates" },
      ],
      layers: [
        { id: "surface", label: "Research experience", nodeIds: ["experience"] },
        {
          id: "core",
          label: "Core layers",
          nodeIds: ["knowledge", "experiment", "data", "runtime", "evaluation"],
        },
        { id: "output", label: "Output", nodeIds: ["output"] },
      ],
    },

    differentiators: [
      {
        id: "researchos-diff-lineage",
        title: "Lineage over dashboards",
        summary:
          "The system emphasises where a result came from rather than how a metric looks.",
      },
      {
        id: "researchos-diff-shared-state",
        title: "One shared research state",
        summary:
          "Human researchers and research agents operate on the same context rather than parallel copies.",
      },
      {
        id: "researchos-diff-reproducibility",
        title: "Reproducibility as infrastructure",
        summary:
          "Versioning, config capture and reproduction checks are properties of the environment, not per-project discipline.",
      },
    ],

    useCases: [],
    evidence: [],
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 30,
    updatedAt: "2026-08-14",
  },
];
