"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";
import { ProjectCategory } from "@/types";
import { translations } from "@/lib/translations";

type FilterKey = "all" | ProjectCategory;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "machine-learning", label: "Machine Learning" },
  { key: "web-development", label: "Web Dev" },
];

export default function ProjectsSection() {
  const t = translations.en;
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="relative py-24 bg-bg-deep"
      aria-labelledby="projects-heading"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={t.projects.sectionTag}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />

        {/* ── Featured highlight strip ────────────────────────────────────── */}
        {featured.length > 0 && active === "all" && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-gold text-sm font-mono font-medium">
                ★ Featured Work
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-accent-gold/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── Category filter pills ────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-mono font-medium transition-all duration-200",
                active === key
                  ? "text-bg-deep"
                  : "text-text-secondary hover:text-text-primary border border-border hover:border-accent-cyan/30"
              )}
            >
              {active === key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-accent-cyan"
                  style={{ zIndex: -1 }}
                />
              )}
              {label}
            </button>
          ))}
        </div>

        {/* ── Projects grid ─────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="tabpanel"
          >
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-text-muted font-mono">
                {t.projects.noProjects}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
