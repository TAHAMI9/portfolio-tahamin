// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER ENTRY POINT
// Forks one worker per CPU core for parallel request handling.
// Each worker runs the Express server independently.
//
// Usage:
//   Development:  npm run dev:cluster
//   Production:   npm run build && npm run start:cluster
// ─────────────────────────────────────────────────────────────────────────────

import cluster from "node:cluster";
import os from "node:os";
import process from "node:process";

const NUM_WORKERS = parseInt(process.env.CLUSTER_WORKERS ?? "0", 10) || os.cpus().length;

if (cluster.isPrimary) {
  const startTime = Date.now();

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║  🔀 Cluster Master started                           ║
  ║  PID       : ${process.pid}                                 ║
  ║  Workers   : ${NUM_WORKERS}                                      ║
  ║  CPUs      : ${os.cpus().length}                                      ║
  ║  Platform  : ${os.platform()} ${os.arch()}                        ║
  ╚═══════════════════════════════════════════════════════╝
  `);

  // ── Fork workers ──────────────────────────────────────────────────────────
  for (let i = 0; i < NUM_WORKERS; i++) {
    const worker = cluster.fork({ WORKER_ID: String(i + 1) });
    console.log(`  [Master] Worker #${i + 1} spawned (PID: ${worker.process.pid})`);
  }

  // ── Respawn crashed workers ───────────────────────────────────────────────
  cluster.on("exit", (worker, code, signal) => {
    const uptime = ((Date.now() - startTime) / 1000).toFixed(1);

    if (signal) {
      console.log(`  [Master] Worker PID ${worker.process.pid} killed by signal ${signal}`);
    } else if (code !== 0) {
      console.error(`  [Master] Worker PID ${worker.process.pid} exited with code ${code} (uptime: ${uptime}s)`);
    }

    // Only respawn if the master didn't initiate shutdown
    if (!isShuttingDown) {
      console.log("  [Master] Spawning replacement worker...");
      const newWorker = cluster.fork({ WORKER_ID: String(Date.now()) });
      console.log(`  [Master] Replacement worker spawned (PID: ${newWorker.process.pid})`);
    }
  });

  cluster.on("online", (worker) => {
    console.log(`  [Master] Worker PID ${worker.process.pid} is online and ready`);
  });

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  let isShuttingDown = false;

  function gracefulShutdown(signal: string) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\n  [Master] Received ${signal} — shutting down ${NUM_WORKERS} workers gracefully...`);

    // Send shutdown signal to all workers
    for (const id in cluster.workers) {
      const worker = cluster.workers[id];
      if (worker) {
        worker.send("shutdown");
        worker.disconnect();
      }
    }

    // Force kill after timeout
    const SHUTDOWN_TIMEOUT = parseInt(process.env.SHUTDOWN_TIMEOUT_MS ?? "10000", 10);
    setTimeout(() => {
      console.log("  [Master] Forcing shutdown — timeout reached");
      process.exit(1);
    }, SHUTDOWN_TIMEOUT);
  }

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

} else {
  // ── Worker process — start the Express server ─────────────────────────────
  import("./server.js");
}
