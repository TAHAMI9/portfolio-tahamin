"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

// Color map for category badges
const categoryColors: Record<string, string> = {
  "machine-learning":
    "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
  "web-development":
    "bg-accent-green/10 text-accent-green border-accent-green/20",
  python: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
  other: "bg-gray-400/10 text-gray-400 border-gray-400/20",
};

// Human-readable category labels
const categoryLabels: Record<string, string> = {
  "machine-learning": "Machine Learning",
  "web-development": "Web Dev",
  python: "Python",
  other: "Other",
};

const statusColors: Record<string, string> = {
  completed: "text-accent-green",
  "in-progress": "text-accent-gold",
  planned: "text-text-muted",
};

const statusDots: Record<string, string> = {
  completed: "bg-accent-green",
  "in-progress": "bg-accent-gold animate-pulse",
  planned: "bg-text-muted",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col h-full rounded-2xl border border-border bg-bg-card backdrop-blur-sm overflow-hidden hover:border-accent-cyan/30 transition-all duration-300 hover:shadow-card-hover"
    >
      {/* ── Project Image / Placeholder ─────────────────────────────────────── */}
      <div className="relative w-full h-48 bg-bg-surface overflow-hidden">
        {project.imagePath ? (
          <Image
            src={project.imagePath}
            alt={`Screenshot of ${project.title}`}
            fill
            className="object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          // Placeholder shown when no image is set
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            {/* Grid pattern background */}
            <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-30" />
            <div className="relative z-10 w-16 h-16 rounded-2xl border-2 border-dashed border-accent-cyan/30 flex items-center justify-center">
              <span className="text-2xl">📸</span>
            </div>
            {/* ↓ INFO: This placeholder disappears once you set imagePath */}
            <p className="relative z-10 text-xs font-mono text-text-muted text-center px-4 leading-relaxed">
              Add project screenshot
              <br />
              <span className="text-accent-cyan/60">/public/images/projects/</span>
            </p>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-accent-gold/90 text-bg-deep text-[10px] font-mono font-bold rounded-full">
            ★ FEATURED
          </div>
        )}

        {/* Category badge */}
        <div
          className={cn(
            "absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full border text-[10px] font-mono font-medium",
            categoryColors[project.category]
          )}
        >
          {categoryLabels[project.category]}
        </div>
      </div>

      {/* ── Card Body ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              statusDots[project.status]
            )}
          />
          <span
            className={cn(
              "text-[11px] font-mono uppercase tracking-wider",
              statusColors[project.status]
            )}
          >
            {project.status === "in-progress"
              ? "In Progress"
              : project.status.charAt(0).toUpperCase() +
                project.status.slice(1)}
          </span>
          <span className="ml-auto text-[11px] text-text-muted font-mono">
            {project.year}
          </span>
        </div>

        {/* Title */}
        {project.title === "PROJECT TITLE HERE" ? (
          // ↓ INFO: Shown until you fill in real data
          <div className="h-6 w-3/4 rounded bg-bg-hover border border-dashed border-accent-cyan/20 flex items-center px-3">
            <span className="text-xs font-mono text-text-muted">
              ← Add project title in /src/data/projects.ts
            </span>
          </div>
        ) : (
          <h3 className="text-text-bright font-syne font-bold text-lg leading-snug group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
        )}

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description === "SHORT DESCRIPTION HERE — A 1–2 sentence overview of what this project does and why it matters."
            ? "← Add your project description in /src/data/projects.ts"
            : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-mono bg-bg-surface text-text-muted border border-border rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2 pt-4 border-t border-border">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-cyan transition-colors font-mono group/btn"
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub className="text-sm" />
              <span>GitHub</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-gold transition-colors font-mono"
              aria-label={`View live demo of ${project.title}`}
            >
              <FaExternalLinkAlt className="text-[10px]" />
              <span>Live Demo</span>
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-[11px] text-text-muted font-mono italic">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
