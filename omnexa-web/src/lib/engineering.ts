/**
 * Applied engineering: the practice.
 *
 * Omnexa's mission is "rigorous research and applied engineering". That second
 * half is a discipline, not a product catalogue: it is how research is turned
 * into something that runs, is observed, and can be improved. It therefore has
 * a permanent home in the information architecture regardless of whether any
 * individual engineered system is published yet.
 *
 * Everything here is institutional commitment, not capability claim. The
 * principles are the Stage 5 §59 list, which previously lived on the systems
 * landing page and was orphaned when the systems were withheld; they describe
 * how Omnexa intends to build, and are true independent of what has shipped.
 */

export type EngineeringPrinciple = {
  title: string;
  detail: string;
};

/** Stage 5 §59 */
export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    title: "Research-grounded",
    detail: "Every system traces back to a research result.",
  },
  {
    title: "Specialized over generic",
    detail: "Specialise where specialisation changes the outcome.",
  },
  {
    title: "Observable",
    detail: "System state is visible rather than inferred.",
  },
  {
    title: "Evaluated",
    detail: "Capability is measured before it is claimed.",
  },
  {
    title: "Human-directed",
    detail: "Direction, approval and critical decisions remain human.",
  },
  {
    title: "Secure by design",
    detail: "Security is architecture, not a final review gate.",
  },
];

/**
 * Stage 6 §13. The engineering half of the institutional philosophy, stated as
 * working practice rather than as marketing capability.
 */
export const engineeringPractice: string[] = [
  "Build from clear system models.",
  "Specialize where specialization matters.",
  "Make state observable.",
  "Design for failure.",
  "Keep humans in critical loops.",
  "Treat security as architecture.",
  "Use evidence before claims.",
  "Design for continuous improvement.",
];
