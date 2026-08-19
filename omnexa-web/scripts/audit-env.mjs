/**
 * Environment resolution shared by the audit scripts.
 *
 * The audits must run in three places: a Windows workstation, a CI runner, and
 * anyone else's checkout. Hardcoding a Chrome path or a localhost URL produces
 * an audit that only works where it was written, which is much the same as not
 * having one.
 */
import { existsSync } from "node:fs";

/** Where the site under test is served. */
export const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";

const CANDIDATES = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  // CI (ubuntu-latest ships Chrome)
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  // macOS
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  // Windows
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].filter(Boolean);

export function resolveChrome() {
  for (const path of CANDIDATES) {
    if (existsSync(path)) return path;
  }
  const tried = CANDIDATES.join(", ");
  throw new Error(
    "No Chrome or Chromium found. Set CHROME_PATH to a browser executable. Tried: " +
      tried,
  );
}

export const LAUNCH = {
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
};
