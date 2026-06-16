"use client";

import { motion } from "framer-motion";
import { Locale } from "@/types";

interface LanguageSwitcherProps {
  locale: Locale;
  onToggle: (locale: Locale) => void;
  compact?: boolean; // Use compact styling in the header
}

export default function LanguageSwitcher({
  locale,
  onToggle,
  compact = false,
}: LanguageSwitcherProps) {
  const isEn = locale === "en";

  return (
    <button
      onClick={() => onToggle(isEn ? "bn" : "en")}
      aria-label={`Switch to ${isEn ? "Bangla" : "English"}`}
      className={`
        relative flex items-center gap-2 rounded-full border border-border
        bg-bg-surface hover:border-accent-cyan/40 transition-all duration-200
        font-mono text-xs font-medium
        ${compact ? "px-3 py-1.5" : "px-4 py-2"}
      `}
    >
      {/* Sliding pill indicator */}
      <motion.span
        layout
        className="absolute inset-y-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20"
        style={{
          left: isEn ? "4px" : "auto",
          right: isEn ? "auto" : "4px",
          width: "calc(50% - 4px)",
        }}
      />

      {/* EN label */}
      <span
        className={`relative z-10 transition-colors duration-200 px-1 ${
          isEn ? "text-accent-cyan" : "text-text-muted"
        }`}
      >
        EN
      </span>

      {/* Divider */}
      <span className="relative z-10 text-border-bright">|</span>

      {/* BN label */}
      <span
        className={`relative z-10 transition-colors duration-200 px-1 ${
          !isEn ? "text-accent-cyan" : "text-text-muted"
        }`}
      >
        বাং
      </span>
    </button>
  );
}
