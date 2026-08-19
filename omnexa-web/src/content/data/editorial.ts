import type { CompanyPrinciple, Insight, Job, Person } from "../schemas/editorial";

/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SAMPLE CONTENT: insights, people and roles carry `sample: true`.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Person records are the most sensitive category here. Stage 6 §28 forbids
 * inventing degrees, employers, awards, publications, titles or social links,
 * so the sample person below carries a role and focus only: no history, no
 * credentials, no profile URLs. Replace with real profiles before launch.
 *
 * Company principles are NOT sample: the categories come from Stage 6 §15 and
 * are institutional commitments, not claims of fact.
 */

export const insights: Insight[] = [
  {
    id: "insight-specialized-engineering-agents",
    type: "engineering",
    title: "Designing Specialized Software Engineering Agents",
    slug: "designing-specialized-software-engineering-agents",
    summary:
      "Why we model engineering as coordinated roles rather than scaling one generalist agent.",
    excerpt:
      "A single agent asked to plan, build, test and secure the same change has no separation between the work and its verification. Specialisation is not about capability: it is about who checks whom.",
    authorIds: ["person-sample-research-lead"],
    researchAreaIds: ["area-ai-software-systems"],
    researchProgramIds: ["OMX-SE-002"],
    systemIds: ["OMX-SYS-001"],
    publicationIds: [],
    tags: ["agents", "software engineering", "evaluation"],
    publishedAt: "2026-08-12",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-12",
  },
  {
    id: "insight-continual-learning-infrastructure",
    type: "research-note",
    title: "When Continual Learning Becomes an Infrastructure Problem",
    slug: "when-continual-learning-becomes-an-infrastructure-problem",
    summary:
      "An observation from the Lifelong Model Learning program about where the difficulty actually sits.",
    excerpt:
      "The obstacle in our continual learning work has not usually been the learning algorithm. It has been knowing which version of which artefact produced a result, which is a systems problem wearing a research problem's clothes.",
    authorIds: ["person-sample-research-lead"],
    researchAreaIds: ["area-developmental-intelligence"],
    researchProgramIds: ["OMX-DI-004"],
    systemIds: ["OMX-SYS-003"],
    publicationIds: [],
    tags: ["continual learning", "reproducibility"],
    publishedAt: "2026-08-06",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 20,
    updatedAt: "2026-08-06",
  },
  {
    id: "insight-research-environments",
    type: "perspective",
    title: "Why Advanced AI Systems Need Better Research Environments",
    slug: "why-advanced-ai-systems-need-better-research-environments",
    summary:
      "A view on why research infrastructure, not model scale, is the current constraint.",
    excerpt:
      "Most of what slows a research program down is not the difficulty of the science. It is the cost of reconstructing context that was never captured in the first place.",
    authorIds: ["person-sample-research-lead"],
    researchAreaIds: ["area-developmental-intelligence"],
    researchProgramIds: [],
    systemIds: ["OMX-SYS-003"],
    publicationIds: [],
    tags: ["research infrastructure", "perspective"],
    publishedAt: "2026-07-29",
    visibility: "public",
    sample: true,
    featured: true,
    featuredPriority: 30,
    updatedAt: "2026-07-29",
  },
  {
    id: "insight-technical-report-013",
    type: "news",
    title: "Technical Report: Continual Adaptation in Autonomous Agent Systems",
    slug: "technical-report-continual-adaptation",
    summary: "A new technical report is available from the Lifelong Model Learning program.",
    excerpt:
      "OMX-PUB-013 sets out where adaptation should live in an agent system intended to run continuously, and how we separate the options during evaluation.",
    authorIds: ["person-omnexa-labs"],
    researchAreaIds: ["area-developmental-intelligence"],
    researchProgramIds: ["OMX-DI-004"],
    systemIds: [],
    publicationIds: ["OMX-PUB-013"],
    tags: ["publication"],
    publishedAt: "2026-08-14",
    visibility: "public",
    sample: true,
    featured: false,
    updatedAt: "2026-08-14",
  },
];

export const people: Person[] = [
  {
    id: "person-sample-research-lead",
    name: "Sample Researcher",
    slug: "sample-researcher",
    role: "Research Lead",
    team: "Research & Development",
    bio: "Placeholder profile used to demonstrate the person template and its research, publication and system relationships. Replace with a real profile before launch: Stage 6 §28 forbids publishing invented biographical detail.",
    researchAreaIds: [
      "area-developmental-intelligence",
      "area-ai-software-systems",
    ],
    researchProgramIds: ["OMX-DI-004", "OMX-SE-002"],
    researchProjectIds: ["OMX-DI-007"],
    publicationIds: ["OMX-PUB-013"],
    systemIds: ["OMX-SYS-001", "OMX-SYS-003"],
    insightIds: [
      "insight-specialized-engineering-agents",
      "insight-continual-learning-infrastructure",
    ],
    visibility: "public",
    sample: true,
    updatedAt: "2026-08-14",
  },
  {
    id: "person-omnexa-labs",
    name: "Omnexa Labs",
    slug: "omnexa-labs",
    role: "Institutional",
    bio: "Institutional authorship for news and announcements published by the lab rather than by a named researcher.",
    researchAreaIds: [],
    researchProgramIds: [],
    researchProjectIds: [],
    publicationIds: [],
    systemIds: [],
    insightIds: [],
    visibility: "unlisted",
    sample: false,
    updatedAt: "2026-08-14",
  },
];

/**
 * Stage 6 §40: no roles are manufactured to make the careers page look busy.
 * This array is intentionally empty so the zero-open-role state is the state
 * that actually ships until real roles exist.
 */
export const jobs: Job[] = [];

/** Stage 6 §15-16: commitments, presented without icon cards. */
export const companyPrinciples: CompanyPrinciple[] = [
  {
    id: "principle-scientific-rigor",
    title: "Scientific rigor",
    summary:
      "We separate observations, hypotheses and conclusions. We design research to survive scrutiny.",
    order: 1,
    visibility: "public",
  },
  {
    id: "principle-evidence-over-hype",
    title: "Evidence over hype",
    summary: "We prefer measured capability to promotional claims.",
    order: 2,
    visibility: "public",
  },
  {
    id: "principle-engineering-excellence",
    title: "Engineering excellence",
    summary:
      "We build from clear system models, make state observable, and design for failure.",
    order: 3,
    visibility: "public",
  },
  {
    id: "principle-human-direction",
    title: "Human direction",
    summary:
      "Humans hold direction, approvals and critical decisions. Autonomy without accountability is not a goal.",
    order: 4,
    visibility: "public",
  },
  {
    id: "principle-reproducibility",
    title: "Reproducibility",
    summary:
      "A result that cannot be reproduced is not yet a result. Lineage is infrastructure, not paperwork.",
    order: 5,
    visibility: "public",
  },
  {
    id: "principle-security-by-design",
    title: "Security by design",
    summary: "Security is architecture, not a final review gate.",
    order: 6,
    visibility: "public",
  },
  {
    id: "principle-long-term-thinking",
    title: "Long-term thinking",
    summary:
      "We value compounding knowledge and durable infrastructure over short product cycles.",
    order: 7,
    visibility: "public",
  },
];
