/**
 * One command that runs everything a pull request must pass.
 *
 * Sequenced deliberately: the cheap checks fail fast, and the browser audits
 * only run once there is a production build worth auditing. Dev-mode numbers
 * would be meaningless, so this always builds first.
 */
import { spawn } from "node:child_process";
import { once } from "node:events";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

/**
 * A shell is needed on Windows for npx (a .cmd shim) but must NOT be used for
 * node itself: spawning "C:\Program Files\nodejs\node.exe" through cmd
 * splits the path at the space and fails with "'C:\Program' is not
 * recognized".
 */
function run(cmd, args, opts = {}) {
  const needsShell = process.platform === "win32" && !cmd.endsWith(".exe");
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: needsShell, ...opts });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exited ${code}`))));
    child.on("error", reject);
  });
}

async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status < 500) return;
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`server did not become ready at ${url}`);
}

const steps = [];
let server;

try {
  console.log("\n=== 1/5 typecheck ===");
  await run(npx, ["tsc", "--noEmit"]);
  steps.push("typecheck");

  console.log("\n=== 2/5 lint ===");
  await run(npx, ["eslint", "src", "--max-warnings=0"]);
  steps.push("lint");

  console.log("\n=== 3/5 production build ===");
  await run(npx, ["next", "build"]);
  steps.push("build");

  console.log("\n=== starting production server ===");
  server = spawn(npx, ["next", "start", "-p", "3000"], {
    stdio: "ignore",
    shell: process.platform === "win32",
    detached: process.platform !== "win32",
  });
  await waitForServer(BASE);
  console.log("server ready");

  console.log("\n=== 4/5 accessibility (axe, WCAG 2.2 AA) ===");
  await run(process.execPath, ["scripts/a11y-audit.mjs"]);
  steps.push("a11y");

  console.log("\n=== 5/5 interaction (keyboard, focus, targets, overflow, motion, scheme) ===");
  await run(process.execPath, ["scripts/interaction-audit.mjs"]);
  steps.push("interaction");

  console.log(`\nALL CHECKS PASSED: ${steps.join(", ")}`);
} catch (err) {
  console.error(`\nVERIFY FAILED after [${steps.join(", ") || "nothing"}]: ${err.message}`);
  process.exitCode = 1;
} finally {
  if (server && !server.killed) {
    try {
      if (process.platform === "win32") spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
      else process.kill(-server.pid, "SIGTERM");
    } catch { /* already gone */ }
    await Promise.race([once(server, "exit"), new Promise((r) => setTimeout(r, 5000))]);
  }
}
