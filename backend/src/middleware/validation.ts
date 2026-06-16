// ─────────────────────────────────────────────────────────────────────────────
// VALIDATION MIDDLEWARE
// Uses express-validator to sanitize and validate request bodies.
// ─────────────────────────────────────────────────────────────────────────────

import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

// ── Check validation results ──────────────────────────────────────────────────
// Add this after your validation chain to reject invalid requests
export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      message: "Validation failed. Please check your input.",
      errors: errors.array().map((err) => ({
        field: "path" in err ? String(err.path) : "unknown",
        message: err.msg,
      })),
    };
    res.status(422).json(response);
    return;
  }

  next();
}

// ── Contact form validation rules ─────────────────────────────────────────────
export const validateContact = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required.")
    .isLength({ min: 2, max: 80 }).withMessage("Name must be 2–80 characters.")
    .escape(),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("subject")
    .optional()
    .trim()
    .isLength({ max: 120 }).withMessage("Subject must be at most 120 characters.")
    .escape(),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required.")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be 10–2000 characters.")
    .escape(),

  handleValidationErrors,
];

// ── Subscribe form validation rules ──────────────────────────────────────────
export const validateSubscribe = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Please provide a valid email address.")
    .normalizeEmail(),

  body("name")
    .optional()
    .trim()
    .isLength({ max: 80 }).withMessage("Name must be at most 80 characters.")
    .escape(),

  handleValidationErrors,
];
