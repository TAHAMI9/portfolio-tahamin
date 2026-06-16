"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  tag: string; // Small label above the title (e.g. "Who I Am")
  title: string; // Main heading
  subtitle?: string; // Optional sub-line
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  tag,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-14",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {/* Tag / label */}
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan text-xs font-mono font-medium tracking-widest uppercase mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow" />
        {tag}
      </span>

      {/* Main heading */}
      <h2 className="font-syne text-3xl sm:text-4xl lg:text-5xl font-bold text-text-bright leading-tight">
        {title}
      </h2>

      {/* Decorative underline */}
      <div
        className={cn(
          "mt-4 h-px w-20 bg-gradient-to-r from-accent-cyan to-accent-gold",
          align === "center" ? "mx-auto" : "mx-0"
        )}
      />

      {/* Optional subtitle */}
      {subtitle && (
        <p className="mt-5 text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
