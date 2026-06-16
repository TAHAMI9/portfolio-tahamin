// ─────────────────────────────────────────────────────────────────────────────
// SUBSCRIBE ROUTE
// POST /api/subscribe
// Handles newsletter / update subscriptions.
//
// Currently stores subscriber emails in a simple JSON file.
// For production, replace with a proper database or use Mailchimp/ConvertKit API.
// ─────────────────────────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import { validateSubscribe } from "../middleware/validation";
import { subscribeLimiter } from "../middleware/rateLimiter";
import { SubscribePayload, ApiResponse } from "../types";
import * as fs from "fs";
import * as path from "path";

const router = Router();

// Path to the subscribers JSON file (simple file-based storage)
// ⬇ INFO: In production, replace this with a real database query
const SUBSCRIBERS_FILE = path.join(__dirname, "../../data/subscribers.json");

// Helper: read subscribers from file
function readSubscribers(): { email: string; name?: string; date: string }[] {
  try {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      // Create the file with an empty array if it doesn't exist
      const dir = path.dirname(SUBSCRIBERS_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(SUBSCRIBERS_FILE, "[]", "utf8");
      return [];
    }
    const raw = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// Helper: write subscribers to file
function writeSubscribers(
  subscribers: { email: string; name?: string; date: string }[]
): void {
  const dir = path.dirname(SUBSCRIBERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf8");
}

// POST /api/subscribe
router.post(
  "/",
  subscribeLimiter,         // Throttle: max 5 per hour per IP
  validateSubscribe,         // Sanitize + validate
  async (req: Request, res: Response) => {
    const { email, name } = req.body as SubscribePayload;

    try {
      const subscribers = readSubscribers();

      // Check for duplicate subscription
      const alreadySubscribed = subscribers.some(
        (s) => s.email.toLowerCase() === email.toLowerCase()
      );

      if (alreadySubscribed) {
        const response: ApiResponse = {
          success: true, // Still 200 — don't reveal whether email exists (privacy)
          message: "You're already subscribed! Watch out for updates.",
        };
        return res.status(200).json(response);
      }

      // Add new subscriber
      subscribers.push({
        email: email.toLowerCase(),
        name: name ?? undefined,
        date: new Date().toISOString(),
      });

      writeSubscribers(subscribers);

      console.log(`[Subscribe] New subscriber: ${email}`);

      const response: ApiResponse = {
        success: true,
        message: "Successfully subscribed! You'll get notified about new projects and content.",
      };
      return res.status(201).json(response);

    } catch (error) {
      console.error("[Subscribe Route] Error:", error);

      const response: ApiResponse = {
        success: false,
        message: "Subscription failed. Please try again later.",
      };
      return res.status(500).json(response);
    }
  }
);

export default router;
