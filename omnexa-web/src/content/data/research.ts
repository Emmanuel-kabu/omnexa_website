import type {
  Experiment,
  Publication,
  ResearchProgram,
  ResearchProject,
} from "../schemas/research";

/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SAMPLE CONTENT: every entity in this file carries `sample: true`.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Stage 3 §51, Stage 4 §101, Stage 5 §81 and Stage 6 §99 all forbid inventing
 * research results, publications, experiments, metrics or people. Nothing here
 * is a factual claim about Omnexa Labs.
 *
 * What these entries ARE: structurally complete records that exercise every
 * template, relationship, filter, sort and empty state, so the architecture is
 * demonstrably correct before real research content arrives.
 *
 * How they behave:
 *   · every one renders with a visible SAMPLE marker in the UI
 *   · `NEXT_PUBLIC_INCLUDE_SAMPLE_CONTENT=false` removes them from every
 *     index, feed, sitemap and search result in one step
 *   · replacing them is a data change: no component is coupled to them
 *
 * IDs follow the Stage 1 §27 scheme and are deliberately drawn from the
 * examples used in the specification documents themselves.
 *
 * Note the deliberate omissions: no metrics, no citation counts, no DOI, no
 * results presented as established. `currentFindings` distinguishes an
 * observation from a hypothesis, per Stage 4 §35.
 */

export const researchPrograms: ResearchProgram[] = [
  {
    id: "OMX-DI-004",
    title: "Lifelong Model Learning",
    slug: "lifelong-model-learning",
    summary:
      "How intelligent systems can continue acquiring knowledge and skills without requiring complete retraining.",
    researchAreaId: "area-developmental-intelligence",
    subdomainIds: ["di-lifelong-model-learning"],
    status: "active",
    problemStatement:
      "Models are largely fixed once trained. Extending them usually means retraining from the beginning, and updating them in place tends to degrade capabilities that were previously reliable. Neither option describes how a system that operates over years should behave. The boundary this program investigates is what a model should hold in its weights versus in external memory, and how a system decides which to update.",
    researchQuestions: [
      {
        id: "RQ-01",
        question:
          "How can a model acquire new capabilities without catastrophically overwriting previous knowledge?",
      },
      {
        id: "RQ-02",
        question:
          "Which information should live in model weights, external memory, tools, or structured knowledge?",
      },
      {
        id: "RQ-03",
        question:
          "How should the system determine when retraining, fine-tuning, retrieval, or memory updates are needed?",
      },
    ],
    researchDirections: [
      "Persistent Knowledge",
      "Experience Memory",
      "Continual Fine-Tuning",
      "Evaluation Across Time",
      "Knowledge Consolidation",
      "Adaptive Retrieval",
    ],
    startedAt: "2026-02-02",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-14",
  },
  {
    id: "OMX-SE-002",
    title: "Agentic Software Engineering",
    slug: "agentic-software-engineering",
    summary:
      "How specialised engineering agents coordinate across a software lifecycle without losing shared context.",
    researchAreaId: "area-ai-software-systems",
    subdomainIds: ["se-autonomous-software-engineering"],
    status: "active",
    problemStatement:
      "A single general-purpose coding agent degrades as task horizon grows: context is lost at handoffs, decisions are re-litigated, and there is no separation between building something and verifying it. This program studies whether modelling engineering as coordinated specialised roles produces more reliable long-horizon delivery than scaling one generalist.",
    researchQuestions: [
      {
        id: "RQ-01",
        question:
          "What project state must be shared between specialised agents for a handoff to preserve intent?",
      },
      {
        id: "RQ-02",
        question:
          "Where should human approval boundaries sit for oversight to remain meaningful rather than ceremonial?",
      },
      {
        id: "RQ-03",
        question:
          "How should agent output be evaluated when correctness is only observable after deployment?",
      },
    ],
    researchDirections: [
      "Multi-Agent Coordination",
      "Long-Horizon Planning",
      "Shared Project State",
      "Agent Evaluation",
      "Human-AI Collaboration",
    ],
    startedAt: "2026-03-16",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 20,
    updatedAt: "2026-08-11",
  },
];

export const researchProjects: ResearchProject[] = [
  {
    id: "OMX-DI-007",
    title: "Experience Carryover for Autonomous Agents",
    slug: "experience-carryover-for-autonomous-agents",
    summary:
      "Whether experience accumulated on one task transfers to related tasks without a full retraining cycle.",
    researchAreaId: "area-developmental-intelligence",
    programId: "OMX-DI-004",
    status: "validating",
    problem:
      "An agent that solves a task well rarely carries what it learned into the next one. Experience is discarded at the session boundary, so improvement does not compound.",
    objective:
      "Determine whether structured experience memory allows an agent to improve on related tasks without modifying model weights.",
    hypothesis:
      "If prior episodes are stored as structured experience rather than raw transcripts, an agent will show measurable improvement on related-but-unseen tasks without fine-tuning.",
    methodology:
      "Agents are evaluated on task families sharing structure but differing in surface detail. A baseline with no persistence is compared against variants with transcript memory and with structured experience memory. Evaluation is held out from the memory-writing phase.",
    evaluation:
      "Comparison is against a no-memory baseline on held-out tasks in the same family. Protocol and failure analysis are recorded per run; results are not yet reported.",
    limitations:
      "Task families are synthetic and narrower than real deployment. Results should not be read as evidence of general transfer.",
    nextSteps:
      "Extend to task families with conflicting strategies, where carrying prior experience forward may actively hurt.",
    contributorIds: ["person-sample-research-lead"],
    systemIds: ["OMX-SYS-003"],
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 10,
    createdAt: "2026-06-01",
    updatedAt: "2026-08-14",
  },
];

export const experiments: Experiment[] = [
  {
    id: "OMX-EXP-032",
    title: "Experience Carryover Evaluation",
    slug: "experience-carryover-evaluation",
    summary:
      "Held-out evaluation of structured experience memory against a no-memory baseline.",
    projectId: "OMX-DI-007",
    programId: "OMX-DI-004",
    researchAreaId: "area-developmental-intelligence",
    researchStatus: "validating",
    outcomeStatus: "validating",
    objective:
      "Measure whether structured experience memory improves performance on held-out tasks within a family, relative to a no-memory baseline.",
    hypothesis:
      "Structured experience memory will outperform both no memory and raw transcript memory on held-out tasks in the same family.",
    setup:
      "Three arms: no memory, transcript memory, structured experience memory: evaluated on a held-out split written by no arm. Seeds fixed across arms.",
    dataset: [],
    models: [],
    environment: [],
    observations:
      "Runs are in progress. No results are reported until the evaluation completes and the protocol has been reviewed.",
    limitations:
      "Single task family. Nothing here generalises beyond the evaluated setting.",
    contributorIds: ["person-sample-research-lead"],
    startedAt: "2026-08-04",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-14",
  },
  {
    id: "OMX-EXP-027",
    title: "External Memory Consolidation",
    slug: "external-memory-consolidation",
    summary:
      "Whether periodic consolidation of external memory reduces retrieval degradation as memory grows.",
    projectId: "OMX-DI-007",
    programId: "OMX-DI-004",
    researchAreaId: "area-developmental-intelligence",
    researchStatus: "published",
    outcomeStatus: "inconclusive",
    objective:
      "Test whether consolidating external memory on a schedule preserves retrieval quality as the store grows.",
    hypothesis:
      "Periodic consolidation will slow retrieval degradation relative to an append-only store.",
    setup:
      "Append-only and consolidated stores grown to matched sizes, then queried with a fixed retrieval set.",
    dataset: [],
    models: [],
    environment: [],
    observations:
      "Differences fell within run-to-run variance at the sizes tested. The experiment does not support a conclusion in either direction, which is why it is recorded as inconclusive rather than withheld.",
    conclusion:
      "Inconclusive at this scale. A larger memory regime is needed for the comparison to be meaningful.",
    limitations:
      "Memory sizes tested were likely too small for consolidation effects to appear.",
    contributorIds: ["person-sample-research-lead"],
    startedAt: "2026-06-18",
    completedAt: "2026-07-09",
    visibility: "public",
    sample: true,
    featured: false,
    updatedAt: "2026-07-12",
  },
];

export const publications: Publication[] = [
  {
    id: "OMX-PUB-013",
    title: "Continual Adaptation in Autonomous Agent Systems",
    slug: "continual-adaptation-in-autonomous-agent-systems",
    summary:
      "A technical report on where adaptation should live in an agent system that operates continuously.",
    publicationType: "technical-report",
    abstract:
      "Agent systems intended to operate continuously face a design question that is usually answered implicitly: where adaptation lives. This report sets out the options: model weights, external memory, retrieval, tool configuration, and orchestration policy, and argues that treating them as one undifferentiated capability is what makes continual adaptation hard to evaluate. We describe the evaluation structure we use to separate them and the failure modes each exhibits.",
    authorIds: ["person-sample-research-lead"],
    researchAreaId: "area-developmental-intelligence",
    programIds: ["OMX-DI-004"],
    projectIds: ["OMX-DI-007"],
    experimentIds: ["OMX-EXP-032"],
    systemIds: [],
    publishedAt: "2026-08-14",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-14",
  },
];
