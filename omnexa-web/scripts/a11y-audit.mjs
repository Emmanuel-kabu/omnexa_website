import puppeteer from "puppeteer-core";
import { createRequire } from "node:module";
import { BASE, LAUNCH, resolveChrome } from "./audit-env.mjs";
const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

const PAGES = [
  "/", "/research", "/research/areas", "/engineering", "/research/archive",
  "/company", "/company/people", "/insights", "/careers",
  "/research/programs/lifelong-model-learning",
  "/insights/designing-specialized-software-engineering-agents",
  "/search?q=OMX-DI-007",
];
const TAGS = ["wcag2a","wcag2aa","wcag21a","wcag21aa","wcag22aa"];

const browser = await puppeteer.launch({
  executablePath: resolveChrome(),
  ...LAUNCH,
});

let total = 0;
const byRule = new Map();

for (const p of PAGES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  try {
    await page.goto(BASE + p, { waitUntil: "networkidle2", timeout: 45000 });
    await page.addScriptTag({ path: axePath });
    const r = await page.evaluate(async (tags) => {
      const res = await window.axe.run(document, { runOnly: { type: "tag", values: tags } });
      return {
        violations: res.violations.map(v => ({
          id: v.id, impact: v.impact, help: v.help,
          nodes: v.nodes.length,
          targets: v.nodes.slice(0, 2).map(n => (n.target || []).join(" ")),
        })),
        passes: res.passes.length,
      };
    }, TAGS);
    total += r.violations.length;
    console.log(`  ${p.padEnd(58)} viol ${String(r.violations.length).padStart(2)}   passed ${r.passes}`);
    for (const v of r.violations) {
      byRule.set(v.id, (byRule.get(v.id) || 0) + v.nodes);
      console.log(`      [${v.impact}] ${v.id} — ${v.help} (${v.nodes} node/s)`);
      v.targets.forEach(t => console.log(`           ${t.slice(0, 95)}`));
    }
  } catch (e) {
    console.log(`  ${p.padEnd(58)} ERROR ${String(e).slice(0, 70)}`);
  }
  await page.close();
}

await browser.close();
console.log("");
console.log("  TOTAL VIOLATIONS: " + total);
// Non-zero exit so CI fails rather than printing violations into a green build.
process.exitCode = total > 0 ? 1 : 0;
if (byRule.size) {
  console.log("  by rule:");
  for (const [id, n] of [...byRule].sort((a,b)=>b[1]-a[1])) console.log(`    ${id}: ${n} nodes`);
}
