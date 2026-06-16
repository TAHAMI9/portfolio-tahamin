"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub, FaLinkedin, FaKaggle, FaDiscord,
  FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle,
} from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import { translations } from "@/lib/translations";

// ── Zod validation schema ─────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120).optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
});
type FormValues = z.infer<typeof schema>;

// ── Social links ──────────────────────────────────────────────────────────────
const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    handle: "@TAHAMI9", // ⬇ INFO: Change to your GitHub username
    href: "https://github.com/TAHAMI9",
    color: "hover:text-white hover:border-white/30",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    handle: "Md Tahamin Islam", // ⬇ INFO: Change to your LinkedIn display name
    href: "https://www.linkedin.com/in/md-tahamin-islam-mahin/",
    color: "hover:text-blue-400 hover:border-blue-400/30",
  },
  {
    icon: FaKaggle,
    label: "Kaggle",
    handle: "@mdtahaminislammahin", // ⬇ INFO: Change to your Kaggle username
    href: "https://www.kaggle.com/mdtahaminislammahin",
    color: "hover:text-accent-cyan hover:border-accent-cyan/30",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    handle: "Md Tahamin Islam",
    href: "https://discord.com/users/1371156037809209557",
    color: "hover:text-[#5865F2] hover:border-[#5865F2]/30",
  },
];

// ── Input field component ─────────────────────────────────────────────────────
function Field({
  label, id, error, required = false, children,
}: {
  label: string; id: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-mono text-text-secondary">
        {label}
        {required && <span className="text-accent-cyan ml-1">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-400 font-mono flex items-center gap-1"
            role="alert"
          >
            <FaExclamationTriangle className="text-[10px]" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full px-4 py-3 rounded-xl bg-bg-surface border text-text-primary placeholder:text-text-muted font-jakarta text-sm transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 focus:border-accent-cyan/50",
    hasError ? "border-red-400/50 bg-red-400/5" : "border-border hover:border-border-bright"
  );

export default function ContactSection() {
  const t = translations.en;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      reset();
      // Reset to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-bg-surface"
      aria-labelledby="contact-heading"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-accent-cyan/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={t.contact.sectionTag}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* ── LEFT: Form (3 cols) ────────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-bg-card backdrop-blur-sm"
            >
              {/* Success state */}
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-green/10 border border-accent-green/30 flex items-center justify-center">
                      <FaCheck className="text-2xl text-accent-green" />
                    </div>
                    <h3 className="font-syne font-bold text-text-bright text-xl">
                      {t.contact.form.successTitle}
                    </h3>
                    <p className="text-text-secondary max-w-sm">
                      {t.contact.form.successMsg}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                    aria-label="Contact form"
                  >
                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        label={t.contact.form.name}
                        id="name"
                        error={errors.name?.message}
                        required
                      >
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder={t.contact.form.namePlaceholder}
                          className={inputClass(!!errors.name)}
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          {...register("name")}
                        />
                      </Field>
                      <Field
                        label={t.contact.form.email}
                        id="email"
                        error={errors.email?.message}
                        required
                      >
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder={t.contact.form.emailPlaceholder}
                          className={inputClass(!!errors.email)}
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          {...register("email")}
                        />
                      </Field>
                    </div>

                    {/* Subject */}
                    <Field
                      label={t.contact.form.subject}
                      id="subject"
                      error={errors.subject?.message}
                    >
                      <input
                        id="subject"
                        type="text"
                        placeholder={t.contact.form.subjectPlaceholder}
                        className={inputClass(!!errors.subject)}
                        {...register("subject")}
                      />
                    </Field>

                    {/* Message */}
                    <Field
                      label={t.contact.form.message}
                      id="message"
                      error={errors.message?.message}
                      required
                    >
                      <textarea
                        id="message"
                        rows={5}
                        placeholder={t.contact.form.messagePlaceholder}
                        className={cn(inputClass(!!errors.message), "resize-none")}
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        {...register("message")}
                      />
                    </Field>

                    {/* Honeypot (anti-spam — hidden from real users) */}
                    <input
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      className="hidden"
                      aria-hidden="true"
                    />

                    {/* Error banner */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm font-mono"
                        role="alert"
                      >
                        <FaExclamationTriangle />
                        {t.contact.form.errorMsg}
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={cn(
                        "flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-syne font-bold text-sm transition-all duration-200",
                        status === "loading"
                          ? "bg-accent-cyan/50 text-bg-deep cursor-not-allowed"
                          : "bg-accent-cyan text-bg-deep hover:bg-accent-cyan/90 active:scale-95"
                      )}
                      aria-busy={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t.contact.form.submitting}
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-xs" />
                          {t.contact.form.submit}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ── RIGHT: Contact info + socials (2 cols) ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* Direct contact */}
            <div>
              <h3 className="font-syne font-bold text-text-bright mb-4">
                {t.contact.directContact}
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:thahaminislam@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-card hover:border-accent-cyan/30 hover:text-accent-cyan transition-all group"
                  aria-label="Send email"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-mono mb-0.5">Email</p>
                    {/* ⬇ INFO: Change to your real email */}
                    <p className="text-sm text-text-primary group-hover:text-accent-cyan transition-colors">
                      thahaminislam@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-card">
                  <div className="w-10 h-10 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-mono mb-0.5">Location</p>
                    <p className="text-sm text-text-primary">Dhaka, Bangladesh 🇧🇩</p>
                  </div>
                </div>

                {/* Response time badge */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-green/5 border border-accent-green/20">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  <span className="text-xs font-mono text-accent-green">
                    Usually responds within 24–48 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-syne font-bold text-text-bright mb-4">
                {t.contact.socials}
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-card transition-all duration-200 group",
                      color
                    )}
                    aria-label={`Visit ${label} profile`}
                  >
                    <Icon className="text-lg text-text-muted group-hover:inherit transition-colors flex-shrink-0" />
                    <div>
                      <p className="text-xs text-text-muted font-mono mb-0.5">{label}</p>
                      <p className="text-sm text-text-secondary group-hover:text-inherit transition-colors">
                        {handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              {/* ⬇ INFO: Update all social links in both this file AND Footer.tsx */}
              <p className="mt-3 text-xs font-mono text-text-muted italic">
                ← Update social links in ContactSection.tsx & Footer.tsx
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
