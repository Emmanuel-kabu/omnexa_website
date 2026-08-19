/**
 * Interaction audit.
 *
 * Everything here is a check a person would perform in a real browser, made
 * repeatable: keyboard order, focus visibility, touch target size, the menu
 * focus trap, reduced motion, colour scheme, and horizontal overflow.
 *
 * It exists because static analysis and axe cannot see any of it. axe reports
 * zero violations on a page whose Escape key does nothing and whose focus ring
 * is invisible.
 *
 * Run against a PRODUCTION build with the server already up:
 *   npm run audit:interaction
 */
import puppeteer from "puppeteer-core";
import { BASE, LAUNCH, resolveChrome } from "./audit-env.mjs";

const findings = [];
const note = (severity, area, message) =>
  findings.push({ severity, area, message });

const browser = await puppeteer.launch({
  executablePath: resolveChrome(),
  ...LAUNCH,
});

async function newPage(width = 1440, height = 900, extra = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, ...extra });
  return page;
}

/* ════════════════════════════════════ 1. keyboard order + focus visibility */
{
  const page = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });

  const seq = await page.evaluate(async () => {
    const out = [];
    // Walk the tab order by repeatedly advancing focus.
    const focusables = Array.from(
      document.querySelectorAll(
        'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      // include off-screen-but-focusable (skip link) and exclude inert regions
      return cs.visibility !== "hidden" && cs.display !== "none" && !el.closest("[inert]");
    });

    for (const el of focusables.slice(0, 40)) {
      el.focus();
      const cs = getComputedStyle(el);
      const outlineWidth = parseFloat(cs.outlineWidth) || 0;
      out.push({
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 42),
        href: el.getAttribute("href") || "",
        focused: document.activeElement === el,
        outlineWidth,
        outlineStyle: cs.outlineStyle,
      });
    }
    return out;
  });

  if (seq.length === 0) note("high", "keyboard", "no focusable elements found");

  const first = seq[0];
  if (!first || !/skip/i.test(first.label)) {
    note("high", "keyboard", `first tab stop is "${first?.label}", expected the skip link`);
  } else {
    note("ok", "keyboard", `first tab stop is the skip link ("${first.label}")`);
  }

  const unfocusable = seq.filter((s) => !s.focused);
  if (unfocusable.length) {
    note("high", "keyboard", `${unfocusable.length} element(s) could not receive focus`);
  } else {
    note("ok", "keyboard", `all ${seq.length} sampled controls accept focus`);
  }

  note("info", "keyboard", `tab order begins: ${seq.slice(0, 6).map((s) => s.label || s.tag).join(" -> ")}`);
}

/* ═══════════════════════════════════════ 2. focus ring actually renders */
{
  const page = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
  // :focus-visible only applies for keyboard interaction, so drive real keys.
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const ring = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    return {
      label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40),
      outlineStyle: cs.outlineStyle,
      outlineWidth: cs.outlineWidth,
      outlineColor: cs.outlineColor,
      matchesFocusVisible: el.matches(":focus-visible"),
    };
  });
  if (!ring) {
    note("high", "focus", "keyboard Tab did not move focus to any control");
  } else if (!ring.matchesFocusVisible) {
    note("medium", "focus", `focused element "${ring.label}" does not match :focus-visible`);
  } else if (ring.outlineStyle === "none" || parseFloat(ring.outlineWidth) === 0) {
    note("high", "focus", `"${ring.label}" is focused but renders no outline`);
  } else {
    note("ok", "focus", `visible ring on keyboard focus: ${ring.outlineWidth} ${ring.outlineStyle} ${ring.outlineColor}`);
  }
}

/* ═════════════════════════════════ 3. touch targets at a phone viewport */
{
  const page = await newPage(390, 844, { isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  for (const path of ["/", "/research", "/engineering", "/careers"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2" });
    const small = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll("a[href],button:not([disabled])")) {
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // off-screen (skip link) is exempt until focused
        if (r.bottom < 0 || r.right < 0) continue;
        if (r.height < 24 || r.width < 24) {
          bad.push({
            label: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 34),
            w: Math.round(r.width),
            h: Math.round(r.height),
          });
        }
      }
      return bad;
    });
    if (small.length) {
      note("medium", "touch", `${path}: ${small.length} target(s) under 24x24 - ${small.slice(0, 3).map((s) => `"${s.label}" ${s.w}x${s.h}`).join(", ")}`);
    } else {
      note("ok", "touch", `${path}: every visible target is at least 24x24`);
    }
  }
}

/* ═════════════════════════════════ 4. horizontal overflow at key widths */
{
  for (const w of [320, 390, 768, 1024, 1440, 1920]) {
    const page = await newPage(w, 900);
    let worst = 0;
    for (const path of ["/", "/research", "/engineering", "/research/archive"]) {
      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2" });
      const over = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      });
      worst = Math.max(worst, over);
    }
    if (worst > 0) note("high", "overflow", `${w}px: page scrolls horizontally by ${worst}px`);
    else note("ok", "overflow", `${w}px: no horizontal overflow`);
    await page.close();
  }
}

/* ══════════════════════════════ 5. mega menu: focus trap + Escape + inert */
{
  const page = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });

  const closedState = await page.evaluate(() => {
    const menu = document.getElementById("site-menu");
    return { inert: menu?.hasAttribute("inert"), hidden: menu?.getAttribute("aria-hidden") };
  });
  if (closedState.inert) note("ok", "menu", "closed menu is inert (out of tab order)");
  else note("high", "menu", "closed menu is NOT inert, so it stays tabbable behind the page");

  // open it
  await page.click('button[aria-controls="site-menu"]');
  await new Promise((r) => setTimeout(r, 400));

  const opened = await page.evaluate(() => {
    const menu = document.getElementById("site-menu");
    return {
      expanded: document.querySelector('button[aria-controls="site-menu"]')?.getAttribute("aria-expanded"),
      inert: menu?.hasAttribute("inert"),
      focusInside: !!(document.activeElement && menu?.contains(document.activeElement)),
      activeLabel: (document.activeElement?.textContent || "").trim().slice(0, 30),
    };
  });
  if (opened.expanded !== "true") note("medium", "menu", `aria-expanded is "${opened.expanded}" after opening`);
  else note("ok", "menu", "aria-expanded flips to true on open");
  if (opened.inert) note("high", "menu", "open menu is still inert");
  if (!opened.focusInside) note("medium", "menu", `focus did not move into the menu (it is on "${opened.activeLabel}")`);
  else note("ok", "menu", `focus moved into the menu ("${opened.activeLabel}")`);

  // tab a long way and confirm focus never escapes the overlay
  let escaped = false;
  for (let i = 0; i < 30; i += 1) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => {
      const menu = document.getElementById("site-menu");
      return !!(document.activeElement && menu?.contains(document.activeElement));
    });
    if (!inside) { escaped = true; break; }
  }
  if (escaped) note("high", "menu", "focus escaped the open menu while tabbing (no trap)");
  else note("ok", "menu", "focus stayed trapped inside the menu across 30 tabs");

  // Escape closes and returns focus
  await page.keyboard.press("Escape");
  await new Promise((r) => setTimeout(r, 400));
  const afterEsc = await page.evaluate(() => ({
    expanded: document.querySelector('button[aria-controls="site-menu"]')?.getAttribute("aria-expanded"),
    inert: document.getElementById("site-menu")?.hasAttribute("inert"),
    onTrigger: document.activeElement?.getAttribute("aria-controls") === "site-menu",
  }));
  if (afterEsc.expanded === "false" && afterEsc.inert) note("ok", "menu", "Escape closes the menu and restores inert");
  else note("high", "menu", `Escape did not fully close the menu (expanded=${afterEsc.expanded}, inert=${afterEsc.inert})`);
  if (afterEsc.onTrigger) note("ok", "menu", "focus returned to the menu trigger");
  else note("medium", "menu", "focus did not return to the trigger after Escape");
}

/* ═══════════════════════════════════════════════ 6. reduced motion */
{
  const page = await newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
  await new Promise((r) => setTimeout(r, 2500));
  const state = await page.evaluate(() => ({
    canvases: document.querySelectorAll("canvas").length,
    staticSvgs: document.querySelectorAll("svg").length,
    transitionMs: getComputedStyle(document.documentElement).getPropertyValue("--omx-motion-ui").trim(),
  }));
  if (state.canvases > 0) note("high", "reduced-motion", `${state.canvases} canvas element(s) mounted despite reduce`);
  else note("ok", "reduced-motion", "no canvas runtime mounted; static field retained");
  if (state.transitionMs && !/^1ms$/.test(state.transitionMs)) {
    note("medium", "reduced-motion", `--omx-motion-ui is "${state.transitionMs}", expected 1ms`);
  } else {
    note("ok", "reduced-motion", "motion tokens collapse to 1ms");
  }
}

/* ═══════════════════════════════════════════════ 7. colour scheme */
{
  for (const scheme of ["light", "dark"]) {
    const page = await newPage();
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
    await page.goto(`${BASE}/`, { waitUntil: "networkidle2" });
    const t = await page.evaluate(() => {
      const cs = getComputedStyle(document.body);
      const root = getComputedStyle(document.documentElement);
      return {
        bg: cs.backgroundColor,
        fg: cs.color,
        surfacePage: root.getPropertyValue("--surface-page").trim(),
      };
    });
    const isDark = /rgb\((\d+)/.test(t.bg) && Number(t.bg.match(/\d+/)[0]) < 60;
    const correct = scheme === "dark" ? isDark : !isDark;
    if (correct) note("ok", "scheme", `${scheme}: body background ${t.bg} (--surface-page ${t.surfacePage})`);
    else note("high", "scheme", `${scheme}: body background ${t.bg} does not match the requested scheme`);
    await page.close();
  }
}

await browser.close();

/* ══════════════════════════════════════════════════════════ report */
const order = { high: 0, medium: 1, info: 2, ok: 3 };
findings.sort((a, b) => order[a.severity] - order[b.severity]);

const counts = findings.reduce((acc, f) => ((acc[f.severity] = (acc[f.severity] || 0) + 1), acc), {});
console.log("=== INTERACTION AUDIT ===\n");
for (const f of findings) {
  const tag = f.severity === "ok" ? "  ok  " : f.severity === "info" ? " info " : ` ${f.severity.toUpperCase()} `;
  console.log(`[${tag}] ${f.area.padEnd(15)} ${f.message}`);
}
console.log("");
console.log(`  high: ${counts.high || 0}   medium: ${counts.medium || 0}   passing: ${counts.ok || 0}`);
process.exitCode = counts.high ? 1 : 0;
