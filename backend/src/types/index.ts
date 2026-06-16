// ─────────────────────────────────────────────────────────────────────────────
// BACKEND SHARED TYPES
// ─────────────────────────────────────────────────────────────────────────────

// Contact form payload sent from the frontend
export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Newsletter subscribe payload
export interface SubscribePayload {
  email: string;
  name?: string;
}

// Standard API response shape
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

// Email options passed to emailService
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}
