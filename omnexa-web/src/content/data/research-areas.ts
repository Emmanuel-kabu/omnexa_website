import type { ResearchArea } from "../schemas/research";

/**
 * The four canonical research areas.
 * Stage 2 §9, Stage 4 §5, Stage 3 §15
 *
 * NOT sample content. Area titles, subdomains and research intents are
 * specified verbatim across the Stage 2-4 documents, so they are reproduced
 * here as authored institutional content.
 */
export const researchAreas: ResearchArea[] = [
  {
    id: "area-developmental-intelligence",
    code: "DI",
    index: "01",
    title: "Developmental Intelligence & Autonomous Research",
    slug: "developmental-intelligence",
    summary:
      "Intelligent systems that accumulate knowledge, improve over time, and participate in increasingly autonomous research and discovery.",
    thesis:
      "Study intelligent systems that can accumulate knowledge, improve over time, work with scientific information, and participate in increasingly autonomous research and discovery.",
    subdomains: [
      {
        id: "di-autonomous-data-intelligence",
        title: "Autonomous Data Intelligence",
        slug: "autonomous-data-intelligence",
        question:
          "How can systems acquire, structure and reason over data without continuous human curation?",
      },
      {
        id: "di-scientific-knowledge",
        title: "Scientific Knowledge & Education",
        slug: "scientific-knowledge-education",
        question:
          "How should scientific knowledge be represented so both researchers and machines can build on it?",
      },
      {
        id: "di-lifelong-model-learning",
        title: "Lifelong Model Learning",
        slug: "lifelong-model-learning",
        question:
          "How can a model acquire new capabilities without overwriting what it already knows?",
      },
      {
        id: "di-autonomous-scientist",
        title: "Autonomous Scientist Systems",
        slug: "autonomous-scientist-systems",
        question:
          "What is required for a system to propose, run and evaluate its own experiments under human direction?",
      },
    ],
    status: "active",
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 10,
    updatedAt: "2026-08-14",
  },
  {
    id: "area-foundation-models",
    code: "FM",
    index: "02",
    title: "Foundation Models & Machine Intelligence",
    slug: "foundation-models",
    summary:
      "The models, learning systems, multimodal capabilities and agent architectures behind increasingly capable machine intelligence.",
    thesis:
      "Advance the models, learning systems, multimodal capabilities, agent architectures, evaluation methods, and infrastructure required for increasingly capable machine intelligence.",
    subdomains: [
      {
        id: "fm-language-reasoning",
        title: "Language & Reasoning",
        slug: "language-reasoning",
        question:
          "What separates a model that produces plausible text from one that reasons reliably?",
      },
      {
        id: "fm-vision-multimodal",
        title: "Computer Vision & Multimodal Intelligence",
        slug: "computer-vision-multimodal",
        question:
          "How should systems integrate evidence that arrives in different modalities?",
      },
      {
        id: "fm-rl-agents",
        title: "Reinforcement Learning & Agents",
        slug: "reinforcement-learning-agents",
        question:
          "How do agents learn long-horizon behaviour that remains stable outside training conditions?",
      },
      {
        id: "fm-efficient-models",
        title: "Efficient Models & AI Infrastructure",
        slug: "efficient-models-infrastructure",
        question:
          "What does the infrastructure beneath capable models need to look like to keep them affordable?",
      },
    ],
    status: "active",
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 20,
    updatedAt: "2026-08-14",
  },
  {
    id: "area-algorithms-mathematics",
    code: "AM",
    index: "03",
    title: "Algorithms, Mathematics & Computational Discovery",
    slug: "algorithms-mathematics",
    summary:
      "How intelligent systems search, optimise, discover algorithms and uncover computational structures that are difficult to derive by hand.",
    thesis:
      "Investigate how intelligent systems can search, reason, optimize, discover algorithms, assist mathematical work, and uncover computational structures that are difficult to derive manually.",
    subdomains: [
      {
        id: "am-algorithm-discovery",
        title: "Algorithm Discovery",
        slug: "algorithm-discovery",
        question:
          "Can a system discover algorithms that outperform the ones we would have written?",
      },
      {
        id: "am-automated-mathematics",
        title: "Automated Mathematics",
        slug: "automated-mathematics",
        question:
          "Where can machine assistance genuinely accelerate mathematical work?",
      },
      {
        id: "am-automl",
        title: "AutoML",
        slug: "automl",
        question:
          "How much of the model development pipeline can be searched rather than hand-designed?",
      },
      {
        id: "am-architecture-discovery",
        title: "Architecture Discovery",
        slug: "architecture-discovery",
        question:
          "What makes a model architecture good, in terms a search process can optimise?",
      },
      {
        id: "am-computational-discovery",
        title: "Computational Discovery",
        slug: "computational-discovery",
        question:
          "How can computation surface structure in problems that resist analysis?",
      },
    ],
    status: "active",
    visibility: "public",
    sample: false,
    featured: false,
    updatedAt: "2026-08-14",
  },
  {
    id: "area-ai-software-systems",
    code: "SE",
    index: "04",
    title: "AI for Software & Computational Systems",
    slug: "ai-software-systems",
    summary:
      "Intelligent systems that engineer, test, secure, operate and improve complex software and computational environments.",
    thesis:
      "Develop intelligent systems capable of engineering, testing, securing, operating, and improving complex software and computational environments.",
    subdomains: [
      {
        id: "se-autonomous-software-engineering",
        title: "Autonomous Software Engineering",
        slug: "autonomous-software-engineering",
        question:
          "What has to be true for software delivery to be coordinated by specialised agents rather than one assistant?",
      },
      {
        id: "se-ai-systems",
        title: "AI Systems",
        slug: "ai-systems",
        question:
          "How should systems built out of models be architected, observed and evaluated?",
      },
      {
        id: "se-defensive-cybersecurity",
        title: "Defensive Cybersecurity",
        slug: "defensive-cybersecurity",
        question:
          "How can intelligent systems strengthen the defence of the software they help build?",
      },
      {
        id: "se-computational-infrastructure",
        title: "Computational Infrastructure",
        slug: "computational-infrastructure",
        question:
          "What infrastructure does continuous, agent-driven engineering actually require?",
      },
    ],
    status: "active",
    visibility: "public",
    sample: false,
    featured: true,
    featuredPriority: 30,
    updatedAt: "2026-08-14",
  },
];
