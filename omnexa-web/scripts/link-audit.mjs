/**
 * Internal link integrity.
 *
 * Content flags withhold routes, and a withheld route returns 404. Anything
 * still linking to one is a dead end for a visitor and a crawl error for a
 * search engine. Finding those by grep does not work: links are written as JSX
 * attributes, as object properties in navigation and ContinueBlock arrays, and
 * as template literals that sometimes carry a query string. Three shapes, and
 * the third hides from any pattern written for the first.
 *
 * So this crawls what the server actually serves and follows every internal
 * link it finds, which is shape-independent by construction.
 *
 * Usage: node scripts/link-audit.mjs
 */
import { BASE } from "./audit-env.mjs";

/** Seeds. The crawl expands from here across every internal link found. */
const SEEDS = ["/", "/research", "/research/areas", "/engineering", "/insights", "/company", "/careers"];

/** Deliberately unreachable, used to prove the checker can actually fail. */
const CANARY = "/this-route-should-not-exist-anywhere";

const seen = new Map();
const queue = [...SEEDS];
const referrers = new Map();

function normalise(href) {
  if (!href) return null;
  if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return null;
  const [path] = href.split("#");
  if (!path.startsWith("/")) return null;
  // Query strings matter: /research/archive?area=X is a different assertion
  // about reachability than /research/archive, and both must resolve.
  return path;
}

async function check(path) {
  const response = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return response;
}

while (queue.length > 0) {
  const path = queue.shift();
  if (seen.has(path)) continue;

  const response = await check(path);
  seen.set(path, response.status);

  // Only parse HTML, and only for pages that resolved.
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes("text/html")) continue;

  const html = await response.text();
  for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const next = normalise(match[1]);
    if (!next || seen.has(next)) continue;
    if (!referrers.has(next)) referrers.set(next, path);
    queue.push(next);
  }
}

// Prove the checker is capable of reporting a failure before trusting a pass.
const canary = await check(CANARY);
const canaryDetects = canary.status === 404;

const broken = [...seen.entries()].filter(([, status]) => status >= 400);

console.log("=== LINK AUDIT ===\n");
console.log(`  crawled ${seen.size} internal routes from ${SEEDS.length} seeds`);
console.log(
  `  self-test: an unknown route returns ${canary.status} ${
    canaryDetects ? "(checker can detect 404s)" : "(BROKEN: cannot detect 404s)"
  }`,
);
console.log("");

if (!canaryDetects) {
  console.log("::error::the audit cannot detect a 404, so a pass would be meaningless");
  process.exitCode = 1;
} else if (broken.length === 0) {
  console.log(`[  ok  ] every internal link resolves (${seen.size} routes)`);
} else {
  for (const [path, status] of broken) {
    console.log(
      `[ FAIL ] ${status} ${path}   linked from ${referrers.get(path) ?? "(seed)"}`,
    );
  }
  process.exitCode = 1;
}

console.log("");
