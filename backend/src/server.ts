// ─────────────────────────────────────────────────────────────────────────────
// EXPRESS SERVER
// Main entry point for the portfolio backend API.
// Run in development: npm run dev
// Run in production:  npm run build && npm start
// ─────────────────────────────────────────────────────────────────────────────

import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import compression from "compression";
import http from "node:http";
import process from "node:process";

import { globalLimiter } from "./middleware/rateLimiter";
import contactRouter from "./routes/contact";
import subscribeRouter from "./routes/subscribe";

const app = express();
const PORT = parseInt(process.env.PORT ?? "5000", 10);
const WORKER_ID = process.env.WORKER_ID ?? "standalone";
const serverStartTime = Date.now();

// ── Trust Proxy ────────────────────────────────────────────────────────────────
app.set("trust proxy", 1);

// ── Security middleware ────────────────────────────────────────────────────────
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL ?? "http://localhost:3000",
  "http://localhost:3000",
  "https://tahaminislam.com", // ⬇ INFO: Add your production domain here
  "https://www.tahaminislam.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: Origin '${origin}' not allowed.`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ── Request parsing & optimization ──────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(hpp()); // Protect against HTTP Parameter Pollution

// ── Logging ────────────────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "test") {
  // Prefix log lines with worker ID so you can trace which instance handled each request
  morgan.token("worker", () => `W${WORKER_ID}`);
  const logFormat =
    process.env.NODE_ENV === "production"
      ? "[:worker] :remote-addr :method :url :status :res[content-length] - :response-time ms"
      : "[:worker] :method :url :status :response-time ms";
  app.use(morgan(logFormat));
}

// ── Global rate limiter ────────────────────────────────────────────────────────
app.use("/api", globalLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
// GET /api/health — used by CI/CD, monitoring tools, and Nginx upstream checks
app.get("/api/health", (_req: Request, res: Response) => {
  const memUsage = process.memoryUsage();

  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    version: "1.0.0",
    instance: {
      workerId: WORKER_ID,
      pid: process.pid,
      label: `worker-${WORKER_ID} (PID: ${process.pid})`,
    },
    uptime: {
      seconds: Math.floor((Date.now() - serverStartTime) / 1000),
      formatted: formatUptime(Date.now() - serverStartTime),
    },
    memory: {
      rss: `${(memUsage.rss / 1024 / 1024).toFixed(1)}MB`,
      heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(1)}MB`,
      heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(1)}MB`,
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
// All routes live under /api/
app.get("/", (_req: Request, res: Response) => {
  res.redirect(301, process.env.FRONTEND_URL ?? "http://localhost:3000");
});
app.use("/api/contact", contactRouter);     // POST /api/contact
app.use("/api/subscribe", subscribeRouter); // POST /api/subscribe

// ── 404 handler ────────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Check the API documentation.",
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Don't expose error details in production
  const isDev = process.env.NODE_ENV !== "production";
  console.error(`[Server Error] [W${WORKER_ID}]`, err.message);

  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
    ...(isDev && { error: err.message }),
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║  🚀 Portfolio Backend API running             ║
  ║  Port     : ${PORT}                             ║
  ║  Worker   : ${WORKER_ID}                              ║
  ║  PID      : ${process.pid}                            ║
  ║  Env      : ${process.env.NODE_ENV ?? "development"}                  ║
  ║  Frontend : ${process.env.FRONTEND_URL ?? "http://localhost:3000"} ║
  ╚═══════════════════════════════════════════════╝
  `);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
// Handles SIGTERM (Docker stop, Kubernetes, etc.) and cluster shutdown messages
function gracefulShutdown(reason: string) {
  console.log(`  [W${WORKER_ID}] Graceful shutdown initiated: ${reason}`);

  server.close(() => {
    console.log(`  [W${WORKER_ID}] HTTP server closed — exiting cleanly`);
    process.exit(0);
  });

  // Force exit if server hasn't closed in 10 seconds
  setTimeout(() => {
    console.error(`  [W${WORKER_ID}] Forced exit — shutdown timeout`);
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Listen for shutdown message from cluster master
process.on("message", (msg) => {
  if (msg === "shutdown") {
    gracefulShutdown("cluster master requested shutdown");
  }
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
}

export default app;
