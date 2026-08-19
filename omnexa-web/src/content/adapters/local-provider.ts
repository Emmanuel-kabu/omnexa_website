import "server-only";

import type { z } from "zod";

import { companyPrinciples, insights, jobs, people } from "../data/editorial";
import {
  experiments,
  publications,
  researchPrograms,
  researchProjects,
} from "../data/research";
import { researchAreas } from "../data/research-areas";
import { systems } from "../data/systems";
import {
  CompanyPrincipleSchema,
  InsightSchema,
  JobSchema,
  PersonSchema,
} from "../schemas/editorial";
import {
  ExperimentSchema,
  PublicationSchema,
  ResearchAreaSchema,
  ResearchProgramSchema,
  ResearchProjectSchema,
} from "../schemas/research";
import { SystemSchema } from "../schemas/systems";

/**
 * Local content adapter.
 * Stage 7 §15 Mode A, §16-17
 *
 * This is the ONLY module that knows content currently lives in TypeScript
 * data files. Repositories above it depend on the shape, never the source, so
 * swapping in a headless CMS (Mode B) means writing a sibling adapter and
 * changing one import: no page, template or component changes (Stage 7 §152).
 *
 * `server-only` makes that boundary enforceable rather than advisory: if a
 * client component ever imports content directly, the build fails instead of
 * silently shipping the whole corpus to the browser.
 *
 * Everything is validated on first access. Invalid content throws loudly at
 * build time, which is the behaviour Stage 7 §18 requires: a malformed
 * research record should fail the build, not render as a broken page.
 */

function validate<S extends z.ZodType>(
  schema: S,
  items: unknown[],
  label: string,
): z.infer<S>[] {
  return items.map((item, index) => {
    const result = schema.safeParse(item);

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `    · ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n");

      throw new Error(
        `Invalid ${label} at index ${index}:\n${issues}\n` +
          `  Fix the content in src/content/data: schemas are the contract.`,
      );
    }

    return result.data;
  });
}

/** Validated once per server process, then reused. */
function once<T>(factory: () => T): () => T {
  let value: T | undefined;
  let resolved = false;
  return () => {
    if (!resolved) {
      value = factory();
      resolved = true;
    }
    return value as T;
  };
}

export const localContent = {
  researchAreas: once(() =>
    validate(ResearchAreaSchema, researchAreas, "research area"),
  ),
  researchPrograms: once(() =>
    validate(ResearchProgramSchema, researchPrograms, "research program"),
  ),
  researchProjects: once(() =>
    validate(ResearchProjectSchema, researchProjects, "research project"),
  ),
  experiments: once(() => validate(ExperimentSchema, experiments, "experiment")),
  publications: once(() =>
    validate(PublicationSchema, publications, "publication"),
  ),
  systems: once(() => validate(SystemSchema, systems, "system")),
  insights: once(() => validate(InsightSchema, insights, "insight")),
  people: once(() => validate(PersonSchema, people, "person")),
  jobs: once(() => validate(JobSchema, jobs, "job")),
  companyPrinciples: once(() =>
    validate(CompanyPrincipleSchema, companyPrinciples, "company principle"),
  ),
};
