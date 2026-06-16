"use client";

import { motion } from "framer-motion";
import { FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { Publication } from "@/types";
import { cn } from "@/lib/utils";

interface PublicationCardProps {
  publication: Publication;
  index: number;
}

export default function PublicationCard({
  publication,
  index,
}: PublicationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative flex gap-5 p-6 rounded-2xl border border-border bg-bg-card hover:border-accent-cyan/30 transition-all duration-300"
    >
      {/* ── Left accent bar ──────────────────────────────────────────────────── */}
      <div className="hidden sm:flex flex-col items-center gap-2 flex-shrink-0">
        {/* Year badge */}
        <div className="w-16 h-16 rounded-xl bg-bg-surface border border-border flex flex-col items-center justify-center group-hover:border-accent-cyan/30 transition-colors">
          <span className="text-xs text-text-muted font-mono">Year</span>
          <span className="text-accent-cyan font-syne font-bold text-lg leading-none">
            {publication.year}
          </span>
        </div>
        {/* Vertical connector line */}
        <div className="flex-1 w-px bg-gradient-to-b from-accent-cyan/20 to-transparent min-h-[20px]" />
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        {publication.title === "PAPER TITLE HERE" ? (
          <div className="h-6 w-2/3 rounded bg-bg-hover border border-dashed border-accent-cyan/20 flex items-center px-3 mb-3">
            <span className="text-xs font-mono text-text-muted">
              ← Add paper title in /src/data/publications.ts
            </span>
          </div>
        ) : (
          <h3 className="text-text-bright font-syne font-bold text-lg leading-snug mb-1 group-hover:text-accent-cyan transition-colors">
            {publication.title}
          </h3>
        )}

        {/* Venue */}
        {publication.venue && publication.venue !== "VENUE OR PUBLISHER HERE" && (
          <p className="text-xs font-mono text-accent-gold mb-3">
            📚 {publication.venue}
          </p>
        )}

        {/* Abstract */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {publication.abstract === "ABSTRACT HERE — Briefly explain the problem you studied, your methodology, and the key findings. This is what university admissions officers will read first, so make it clear and compelling."
            ? "← Add your abstract in /src/data/publications.ts"
            : publication.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-bg-surface text-text-muted border border-border rounded-md"
            >
              {tag}
            </span>
          ))}
          {/* Mobile year badge */}
          <span className="sm:hidden px-2 py-0.5 text-[11px] font-mono bg-bg-surface text-accent-cyan border border-accent-cyan/20 rounded-md">
            {publication.year}
          </span>
        </div>

        {/* Action links */}
        <div className="flex flex-wrap gap-4">
          {publication.pdfUrl && (
            <a
              href={publication.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-mono hover:bg-accent-cyan/20 transition-colors"
              aria-label={`View PDF of ${publication.title}`}
            >
              <FaFilePdf />
              View PDF
            </a>
          )}
          {publication.doi && (
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-surface border border-border text-text-secondary text-xs font-mono hover:border-accent-gold/30 hover:text-accent-gold transition-colors"
              aria-label={`View DOI for ${publication.title}`}
            >
              <FaExternalLinkAlt className="text-[10px]" />
              DOI
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
