/**
 * Turns a Lighthouse report into a pass/fail gate.
 *
 * This was advisory for a long time because local scores swung 74 to 87 and a
 * threshold would have produced flakes rather than signal. That spread turned
 * out to be a workstation artefact. Two CI runs scored 93 with LCP agreeing to
 * within 0.2% (3164.5ms vs 3163.4ms) even though the runners differed by about
 * 6% in CPU benchmark, so the number is reproducible on CI hardware and worth
 * gating.
 *
 * PERF_MIN is set at 85 rather than nearer the observed 93 on purpose. Two
 * samples is a thin basis for a tight threshold, and TBT and TTI were the two
 * metrics that did move between runs (about 9%). 85 absorbs that wobble while
 * still catching a real regression.
 *
 * Usage: node scripts/lighthouse-gate.mjs [path-to-report.json]
 */
import { readFileSync } from "node:fs";

const REPORT = process.argv[2] ?? "./lh.json";
const PERF_MIN = Number(process.env.PERF_MIN ?? 85);

/** Categories that must be present for the report to count as a real run. */
const GATED = { performance: PERF_MIN };

let report;
try {
  report = JSON.parse(readFileSync(REPORT, "utf8"));
} catch (error) {
  console.log(`::error::could not read a Lighthouse report at ${REPORT}: ${error.message}`);
  process.exit(1);
}

const categories = report.categories ?? {};
if (Object.keys(categories).length === 0) {
  console.log("::error::the Lighthouse report contains no categories; the run failed");
  process.exit(1);
}

let failed = false;

for (const [key, category] of Object.entries(categories)) {
  /**
   * A crashed run still writes a report, with null scores. Treating that as a
   * pass would be worse than having no gate at all, so it fails loudly.
   */
  if (category.score === null || category.score === undefined) {
    console.log(`::error::${category.title} produced no score, so the Lighthouse run did not complete`);
    failed = true;
    continue;
  }

  const score = Math.round(category.score * 100);
  const floor = GATED[key];
  const verdict = floor === undefined ? "reported" : score >= floor ? `>= ${floor}` : `BELOW ${floor}`;
  console.log(`  ${category.title.padEnd(16)} ${String(score).padStart(3)}   ${verdict}`);

  if (floor !== undefined && score < floor) {
    console.log(`::error::${category.title} scored ${score}, below the gate of ${floor}`);
    failed = true;
  }
}

// Useful context in the log when a gate trips, so the cause is visible without
// downloading the artifact.
const metrics = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
];
console.log("");
for (const id of metrics) {
  const audit = report.audits?.[id];
  if (audit?.displayValue) {
    console.log(`  ${audit.title.padEnd(28)} ${audit.displayValue}`);
  }
}

process.exit(failed ? 1 : 0);
