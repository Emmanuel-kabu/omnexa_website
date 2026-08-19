/**
 * Content Security Policy audit: Stage 7 §60, §61.
 *
 * The spec requires the policy to reflect real providers and forbids loosening
 * a directive for convenience. Reasoning about what a policy will break is not
 * good enough, because the framework emits markup the application never wrote.
 * So this drives a real browser and records what the policy actually refuses.
 *
 * Run the server with CSP_MODE=report so violations are reported without being
 * enforced; a page that has been broken by the policy cannot report the second
 * and third things the policy would also have broken.
 *
 * Usage: node scripts/csp-audit.mjs
 */
import puppeteer from "puppeteer-core";
import { BASE, LAUNCH, resolveChrome } from "./audit-env.mjs";

/**
 * Representative of every distinct rendering path that currently resolves.
 *
 * Routes withheld by a content flag return 404, and a 404 page renders almost
 * nothing: it exercises neither the inline flight payload at full size nor the
 * stylesheet and font loads that the policy actually governs. Listing one
 * therefore weakens the audit while appearing to broaden it.
 *
 * The single deliberate 404 at the end stays, because the header set must be
 * present on error responses too, and that is worth asserting explicitly.
 */
const PAGES = [
  "/",
  "/research",
  "/research/areas",
  "/research/areas/developmental-intelligence",
  "/engineering",
  "/insights",
  "/insights/engineering",
  "/company",
  "/company/people",
  "/company/people/sample-researcher",
  "/company/contact",
  "/company/mission",
  "/careers",
  "/careers/culture",
  "/search?q=intelligence",
  "/insights/designing-specialized-software-engineering-agents",
  "/this-route-does-not-exist",
];

/** Headers whose presence is asserted, per Stage 7 §60. */
const REQUIRED_HEADERS = [
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
  "cross-origin-opener-policy",
];

const results = [];
const note = (level, group, message) => {
  results.push({ level, group, message });
  const tag = level === "high" ? "FAIL" : level === "info" ? "info" : " ok ";
  console.log(`[ ${tag} ] ${group.padEnd(14)} ${message}`);
};

const browser = await puppeteer.launch({
  ...LAUNCH,
  executablePath: resolveChrome(),
});

try {
  console.log("=== CSP AUDIT ===\n");

  /* ---------------------------------------------------------------------
   * 1. The headers must actually be present on the wire.
   * ------------------------------------------------------------------ */
  const probe = await browser.newPage();
  const response = await probe.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const headers = response.headers();

  const cspHeader =
    headers["content-security-policy"] ??
    headers["content-security-policy-report-only"];
  const reporting = "content-security-policy-report-only" in headers;

  if (!cspHeader) {
    note("high", "headers", "no CSP header on the document response");
  } else {
    note(
      "ok",
      "headers",
      `CSP present (${reporting ? "report-only" : "enforcing"}), ${
        cspHeader.split(";").length
      } directives`,
    );
  }

  for (const name of REQUIRED_HEADERS) {
    if (headers[name]) {
      note("ok", "headers", `${name}: ${headers[name].slice(0, 60)}`);
    } else {
      note("high", "headers", `${name} is missing`);
    }
  }

  if ("x-powered-by" in headers) {
    note("high", "headers", "x-powered-by is still advertised");
  } else {
    note("ok", "headers", "x-powered-by suppressed");
  }
  await probe.close();

  /* ---------------------------------------------------------------------
   * 2. What does the policy actually refuse, page by page?
   *
   * The listener is installed before any document script runs, so violations
   * raised during initial parse are captured rather than missed.
   * ------------------------------------------------------------------ */
  const violations = new Map();

  for (const path of PAGES) {
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      window.__csp = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        window.__csp.push({
          directive: event.effectiveDirective || event.violatedDirective,
          blocked: event.blockedURI,
          sample: event.sample || "",
          source: event.sourceFile || "",
          line: event.lineNumber || 0,
        });
      });
    });

    await page.goto(`${BASE}${path}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Exercise the interactive surfaces, since a violation may only be raised
    // once a client component mounts and writes to the DOM.
    await page.evaluate(() => {
      const trigger = document.querySelector("[aria-expanded]");
      if (trigger instanceof HTMLElement) trigger.click();
    });
    await new Promise((resolve) => setTimeout(resolve, 400));

    const found = await page.evaluate(() => window.__csp || []);
    for (const entry of found) {
      const key = `${entry.directive}|${entry.blocked}|${entry.sample.slice(0, 60)}`;
      if (!violations.has(key)) {
        violations.set(key, { ...entry, pages: new Set() });
      }
      // A set, because one page can raise the same violation many times and the
      // useful figure is how many pages are affected, not how many nodes.
      violations.get(key).pages.add(path);
    }
    await page.close();
  }

  console.log("");
  if (violations.size === 0) {
    note("ok", "policy", `no violations across ${PAGES.length} pages`);
  } else {
    for (const entry of violations.values()) {
      const pages = [...entry.pages];
      note(
        "high",
        "policy",
        `${entry.directive} blocked "${entry.blocked}" ${
          entry.sample ? `sample="${entry.sample.slice(0, 70)}" ` : ""
        }on ${pages.length}/${PAGES.length} pages (e.g. ${pages[0]})`,
      );
    }
  }

  /* ---------------------------------------------------------------------
   * 3. Stage 7 §62: external links opened in a new tab need rel protection.
   * ------------------------------------------------------------------ */
  const linkPage = await browser.newPage();
  const unsafeLinks = [];
  for (const path of PAGES.slice(0, 8)) {
    await linkPage.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
    const bad = await linkPage.evaluate(() =>
      Array.from(document.querySelectorAll('a[target="_blank"]'))
        .filter((a) => {
          const rel = (a.getAttribute("rel") || "").toLowerCase();
          return !rel.includes("noopener") || !rel.includes("noreferrer");
        })
        .map((a) => a.getAttribute("href")),
    );
    unsafeLinks.push(...bad.map((href) => `${path} -> ${href}`));
  }
  await linkPage.close();

  if (unsafeLinks.length === 0) {
    note("ok", "links", 'every target="_blank" link carries noopener noreferrer');
  } else {
    for (const link of unsafeLinks.slice(0, 8)) {
      note("high", "links", `target="_blank" without noopener noreferrer: ${link}`);
    }
  }
} finally {
  await browser.close();
}

const high = results.filter((r) => r.level === "high").length;
const ok = results.filter((r) => r.level === "ok").length;

console.log(`\n  high: ${high}   passing: ${ok}\n`);
process.exitCode = high > 0 ? 1 : 0;
