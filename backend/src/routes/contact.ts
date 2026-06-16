// ─────────────────────────────────────────────────────────────────────────────
// CONTACT ROUTE
// POST /api/contact
// Receives the contact form, sends notification email to you,
// and sends an auto-reply to the visitor.
// ─────────────────────────────────────────────────────────────────────────────

import { Router, Request, Response } from "express";
import { validateContact } from "../middleware/validation";
import { contactLimiter } from "../middleware/rateLimiter";
import {
  sendEmail,
  buildContactNotificationEmail,
  buildAutoReplyEmail,
} from "../services/emailService";
import { ContactPayload, ApiResponse } from "../types";

const router = Router();

// POST /api/contact
router.post(
  "/",
  contactLimiter,          // Throttle: max 10 per 15 min per IP
  validateContact,          // Sanitize + validate body
  async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body as ContactPayload;

    try {
      // 1. Send notification email to you
      const notificationEmail = buildContactNotificationEmail({
        name,
        email,
        subject,
        message,
      });
      await sendEmail(notificationEmail);

      // 2. Send auto-reply to the visitor
      const autoReply = buildAutoReplyEmail({ name, email });
      await sendEmail(autoReply);

      // 3. Respond success
      const response: ApiResponse = {
        success: true,
        message: "Your message has been sent successfully! I'll reply within 24–48 hours.",
      };
      res.status(200).json(response);

    } catch (error) {
      // Log the error server-side (never expose stack traces to client)
      console.error("[Contact Route] Email send failed:", error);

      const response: ApiResponse = {
        success: false,
        message: "Failed to send your message. Please try again or email me directly.",
      };
      res.status(500).json(response);
    }
  }
);

export default router;
