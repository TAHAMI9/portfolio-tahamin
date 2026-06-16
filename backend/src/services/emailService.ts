// ─────────────────────────────────────────────────────────────────────────────
// EMAIL SERVICE
// Uses Nodemailer with Gmail SMTP.
// To switch to SendGrid or another provider, update createTransporter() only.
// ─────────────────────────────────────────────────────────────────────────────

import nodemailer from "nodemailer";
import { EmailOptions } from "../types";

// Create and return a Nodemailer transporter
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Gmail App Password (not your normal password)
    },
  });
}

// ── Send a generic email ──────────────────────────────────────────────────────
export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Tahamin Portfolio" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });
}

// ── Contact form notification email (sent to YOU when someone fills the form) ─
export function buildContactNotificationEmail(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): EmailOptions {
  const subject = data.subject
    ? `Portfolio Contact: ${data.subject}`
    : `Portfolio Contact from ${data.name}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>New Portfolio Contact</title>
    </head>
    <body style="margin:0;padding:0;background:#060912;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0"
             style="background:#060912;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0"
                   style="background:#0c1120;border-radius:16px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;max-width:600px;">

              <!-- Header -->
              <tr>
                <td style="background:linear-gradient(135deg,#22d3ee20,#fbbf2410);
                           padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <div style="width:40px;height:40px;border-radius:10px;
                                    background:linear-gradient(135deg,#22d3ee,#fbbf24);
                                    display:inline-flex;align-items:center;justify-content:center;
                                    color:#060912;font-weight:900;font-size:14px;
                                    font-family:'Segoe UI',Arial,sans-serif;vertical-align:middle;">
                          TI
                        </div>
                        <span style="margin-left:12px;font-size:18px;font-weight:700;
                                     color:#f8fafc;vertical-align:middle;">
                          Tahamin<span style="color:#22d3ee">.</span>
                        </span>
                      </td>
                      <td align="right">
                        <span style="background:#22d3ee15;border:1px solid #22d3ee30;
                                     color:#22d3ee;padding:4px 12px;border-radius:20px;
                                     font-size:11px;font-family:monospace;">
                          NEW MESSAGE
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:36px 40px;">
                  <h2 style="margin:0 0 8px;color:#f8fafc;font-size:22px;font-weight:700;">
                    New Contact Form Submission
                  </h2>
                  <p style="margin:0 0 28px;color:#94a3b8;font-size:14px;">
                    Someone reached out via your portfolio website.
                  </p>

                  <!-- Sender info -->
                  <table width="100%" cellpadding="0" cellspacing="0"
                         style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
                                border-radius:12px;overflow:hidden;margin-bottom:24px;">
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.07);">
                        <p style="margin:0;color:#475569;font-size:11px;font-family:monospace;
                                  text-transform:uppercase;letter-spacing:1px;">From</p>
                        <p style="margin:4px 0 0;color:#f8fafc;font-size:16px;font-weight:600;">
                          ${escapeHtml(data.name)}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.07);">
                        <p style="margin:0;color:#475569;font-size:11px;font-family:monospace;
                                  text-transform:uppercase;letter-spacing:1px;">Email</p>
                        <a href="mailto:${escapeHtml(data.email)}"
                           style="margin:4px 0 0;display:block;color:#22d3ee;font-size:15px;">
                          ${escapeHtml(data.email)}
                        </a>
                      </td>
                    </tr>
                    ${
                      data.subject
                        ? `<tr>
                      <td style="padding:16px 20px;">
                        <p style="margin:0;color:#475569;font-size:11px;font-family:monospace;
                                  text-transform:uppercase;letter-spacing:1px;">Subject</p>
                        <p style="margin:4px 0 0;color:#e2e8f0;font-size:15px;">
                          ${escapeHtml(data.subject)}
                        </p>
                      </td>
                    </tr>`
                        : ""
                    }
                  </table>

                  <!-- Message -->
                  <p style="margin:0 0 8px;color:#475569;font-size:11px;font-family:monospace;
                            text-transform:uppercase;letter-spacing:1px;">Message</p>
                  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
                              border-radius:12px;padding:20px;margin-bottom:28px;">
                    <p style="margin:0;color:#e2e8f0;font-size:15px;line-height:1.7;
                              white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                  </div>

                  <!-- Reply button -->
                  <div style="text-align:center;">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re: ${escapeHtml(
    data.subject ?? `Your message to Tahamin`
  )}"
                       style="display:inline-block;background:#22d3ee;color:#060912;
                              padding:14px 32px;border-radius:10px;font-size:14px;
                              font-weight:700;text-decoration:none;font-family:'Segoe UI',Arial,sans-serif;">
                      Reply to ${escapeHtml(data.name)}
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.07);
                           text-align:center;">
                  <p style="margin:0;color:#475569;font-size:12px;font-family:monospace;">
                    Sent via tahaminislam.com contact form
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return {
    to: process.env.EMAIL_RECEIVER ?? process.env.EMAIL_USER ?? "",
    subject,
    html,
    replyTo: data.email,
  };
}

// ── Auto-reply email (sent to the person who contacted you) ──────────────────
export function buildAutoReplyEmail(data: {
  name: string;
  email: string;
}): EmailOptions {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Thank you for your message</title>
    </head>
    <body style="margin:0;padding:0;background:#060912;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#060912;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0"
                   style="background:#0c1120;border-radius:16px;border:1px solid rgba(255,255,255,0.07);
                          max-width:600px;overflow:hidden;">
              <!-- Header -->
              <tr>
                <td style="padding:32px 40px;border-bottom:1px solid rgba(255,255,255,0.07);
                           text-align:center;background:linear-gradient(135deg,#22d3ee15,#fbbf2410);">
                  <div style="width:60px;height:60px;border-radius:50%;
                              background:linear-gradient(135deg,#22d3ee,#fbbf24);
                              margin:0 auto 16px;display:flex;align-items:center;justify-content:center;
                              color:#060912;font-weight:900;font-size:20px;">
                    TI
                  </div>
                  <h1 style="margin:0;color:#f8fafc;font-size:22px;font-weight:700;">
                    Thanks, ${escapeHtml(data.name)}! ✨
                  </h1>
                  <p style="margin:8px 0 0;color:#94a3b8;font-size:14px;">
                    Your message has been received.
                  </p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding:32px 40px;">
                  <p style="color:#e2e8f0;font-size:15px;line-height:1.7;margin:0 0 20px;">
                    Hi ${escapeHtml(data.name)},
                  </p>
                  <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 20px;">
                    Thank you for reaching out through my portfolio. I've received your message
                    and will get back to you within <strong style="color:#22d3ee;">24–48 hours</strong>.
                  </p>
                  <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 28px;">
                    In the meantime, feel free to explore my projects on GitHub or connect with me on LinkedIn.
                  </p>
                  <div style="text-align:center;margin-bottom:28px;">
                    <a href="https://github.com/yourusername"
                       style="display:inline-block;margin:0 8px;background:rgba(255,255,255,0.06);
                              color:#e2e8f0;padding:10px 20px;border-radius:8px;font-size:13px;
                              text-decoration:none;border:1px solid rgba(255,255,255,0.1);">
                      GitHub
                    </a>
                    <a href="https://linkedin.com/in/yourprofile"
                       style="display:inline-block;margin:0 8px;background:rgba(255,255,255,0.06);
                              color:#e2e8f0;padding:10px 20px;border-radius:8px;font-size:13px;
                              text-decoration:none;border:1px solid rgba(255,255,255,0.1);">
                      LinkedIn
                    </a>
                  </div>
                  <p style="color:#475569;font-size:13px;text-align:center;margin:0;">
                    Best regards,<br />
                    <strong style="color:#e2e8f0;">Md Tahamin Islam</strong> · Dhaka, Bangladesh 🇧🇩
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return {
    to: data.email,
    subject: "Thanks for reaching out — Md Tahamin Islam",
    html,
  };
}

// Simple HTML escape to prevent injection in email templates
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
