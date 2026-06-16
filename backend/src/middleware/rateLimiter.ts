// ─────────────────────────────────────────────────────────────────────────────
// RATE LIMITER MIDDLEWARE
// Prevents spam and abuse on the API endpoints.
// ─────────────────────────────────────────────────────────────────────────────

import rateLimit from "express-rate-limit";

// ── Contact route limiter ─────────────────────────────────────────────────────
// Max 10 contact form submissions per IP per 15 minutes
export const contactLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "900000", 10), // 15 min
  max: parseInt(process.env.RATE_LIMIT_MAX ?? "10", 10),
  message: {
    success: false,
    message: "Too many contact requests from this IP. Please try again in 15 minutes.",
  },
  standardHeaders: true,  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,   // Disable the `X-RateLimit-*` headers
});

// ── Subscribe route limiter ───────────────────────────────────────────────────
// Max 5 subscribe requests per IP per 60 minutes
export const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many subscribe requests. Please try again in an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Global API limiter ────────────────────────────────────────────────────────
// Broad protection for all API routes
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
