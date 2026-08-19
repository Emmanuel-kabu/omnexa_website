/**
 * The Omnexa operating model: one canonical definition.
 *
 * The site previously published TWO different versions of its own loop. The
 * homepage ran Question, Research, Experiment, Engineer, Deploy, Learn; the
 * company page ran Research, Experiment, Engineer, System, Deploy, Learn.
 * Both carried comments claiming to be canonical, and the company page's
 * comment further claimed to be "consistent with earlier stages", which was
 * false. An institution contradicting itself about how it works is the worst
 * category of duplication on the site.
 *
 * The homepage sequence is the one kept, for three reasons:
 *   1. It opens on "Question", which is what actually starts the loop and what
 *      makes "Learn" close it.
 *   2. It carries per-state detail, so it is the richer definition.
 *   3. "System" as a state is a product noun, not a verb in a process, and it
 *      duplicates what "Engineer" already describes.
 *
 * Both surfaces now read from here.
 */

export type OperatingModelState = {
  label: string;
  detail: string;
};

export const operatingModel: OperatingModelState[] = [
  {
    label: "Question",
    detail: "A research question worth the cost of answering properly.",
  },
  {
    label: "Research",
    detail: "Prior work, method design, and what would count as evidence.",
  },
  {
    label: "Experiment",
    detail: "Run it. Record the configuration. Keep the failures.",
  },
  {
    label: "Engineer",
    detail: "Translate what held up under scrutiny into a working system.",
  },
  {
    label: "Deploy",
    detail: "Operate it in a real environment, where assumptions get tested.",
  },
  {
    label: "Learn",
    detail: "Deployment produces the next question. The loop closes.",
  },
];

/** Just the state names, for surfaces that show the loop without detail. */
export const operatingModelLabels: string[] = operatingModel.map(
  (state) => state.label,
);
