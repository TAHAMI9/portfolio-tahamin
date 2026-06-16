"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { skills } from "@/data/media";
import { cn } from "@/lib/utils";

/* ── Animated skill bar ───────────────────────────────────────────────────── */
function SkillBar({ name, level, category, index }: {
  name: string; level: number; category: string; index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  const barColor: Record<string, string> = {
    languages: "bg-gradient-to-r from-accent-cyan to-cyan-300",
    ml:        "bg-gradient-to-r from-accent-green to-emerald-300",
    tools:     "bg-gradient-to-r from-accent-gold to-yellow-300",
    other:     "bg-gradient-to-r from-accent-purple to-violet-300",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary font-medium">{name}</span>
        <span className="text-xs font-mono text-text-muted">{level}%</span>
      </div>
      <div className="h-2 w-full bg-bg-surface rounded-full overflow-hidden border border-border">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 + index * 0.05 }}
          className={cn("h-full rounded-full", barColor[category] ?? "bg-accent-cyan")}
        />
      </div>
    </motion.div>
  );
}

const categories = [
  { key: "languages", label: "Programming Languages", emoji: "💻", color: "text-accent-cyan",  border: "border-accent-cyan/20",  bg: "bg-accent-cyan/5"  },
  { key: "ml",        label: "Machine Learning & AI", emoji: "🤖", color: "text-accent-green", border: "border-accent-green/20", bg: "bg-accent-green/5" },
  { key: "tools",     label: "Tools & Platforms",     emoji: "🛠️",  color: "text-accent-gold",  border: "border-accent-gold/20",  bg: "bg-accent-gold/5"  },
];

// Other tools & soft skills (non-bar items)
const otherSkills = [
  "Problem Solving", "Research Writing", "Data Analysis",
  "Team Collaboration", "Content Creation", "Public Speaking",
  "Bangla NLP", "Music Production",
];

export default function SkillsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-deep pt-20">

        {/* Hero */}
        <section className="relative py-20 bg-bg-surface overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan
                         font-mono text-sm transition-colors mb-10 group">
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/30
                               bg-accent-cyan/5 text-accent-cyan text-xs font-mono mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                Skills & Experience
              </span>
              <h1 className="font-heading font-black text-4xl sm:text-5xl text-text-bright mb-4 tracking-tight">
                My Skills <span className="text-accent-cyan">&</span> Tools
              </h1>
              <p className="text-text-secondary text-lg max-w-xl mb-8 leading-relaxed">
                A snapshot of my technical skills, tools I use daily,
                and the competencies I've built across ML and web development.
              </p>

              {/* Download CV — prominently here */}
              <a
                href="/resume.pdf"
                download="Md_Tahamin_Islam_CV.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent-cyan text-bg-deep
                           font-heading font-bold text-sm hover:bg-accent-cyan/90 transition-all duration-200 active:scale-95"
              >
                <FaDownload />
                Download My CV / Resume
              </a>
              <p className="mt-3 text-xs font-mono text-text-muted">
                {/* ⬇ INFO: Place your CV PDF at /public/resume.pdf */}
                Place your CV at <span className="text-accent-gold">frontend/public/resume.pdf</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-14">

          {/* Skill bars by category */}
          {categories.map(({ key, label, emoji, color, border, bg }) => {
            const catSkills = skills.filter((s) => s.category === key);
            if (catSkills.length === 0) return null;
            return (
              <motion.section
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${border} ${bg} mb-6`}>
                  <span className="text-lg">{emoji}</span>
                  <h2 className={`font-heading font-bold text-lg ${color}`}>{label}</h2>
                </div>
                <div className="p-6 rounded-2xl bg-bg-surface border border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {catSkills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      category={skill.category}
                      index={i}
                    />
                  ))}
                </div>
                <p className="text-xs font-mono text-text-muted mt-2 italic">
                  ← Edit levels in /src/data/media.ts → skills array
                </p>
              </motion.section>
            );
          })}

          {/* Other / soft skills tags */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-xl text-text-bright mb-6">
              Other Skills & Competencies
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-xl bg-bg-surface border border-border text-text-secondary
                             text-sm hover:border-accent-cyan/30 hover:text-accent-cyan transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Currently learning */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-xl text-text-bright mb-6 flex items-center gap-2">
              <span className="text-accent-cyan animate-pulse">▶</span>
              Currently Learning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { emoji: "🧠", title: "Deep Learning",  desc: "Transformers, attention mechanisms, and large language models." },
                { emoji: "📡", title: "Cloud & MLOps",  desc: "Deploying ML models with Docker, AWS, and CI/CD pipelines." },
                { emoji: "🌐", title: "Full-Stack Web",  desc: "Building modern apps with React, Next.js, and Node.js." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-bg-surface border border-accent-cyan/20 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan to-transparent" />
                  <span className="text-2xl mb-3 block">{item.emoji}</span>
                  <h3 className="font-heading font-bold text-text-bright mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Bottom CTA */}
          <div className="flex flex-wrap gap-4 justify-center pb-4">
            <Link href="/about"
              className="px-8 py-3.5 rounded-xl border border-border text-text-secondary font-medium text-sm
                         hover:border-accent-cyan/50 hover:text-accent-cyan transition-all active:scale-95">
              About Me
            </Link>
            <Link href="/#projects"
              className="px-8 py-3.5 rounded-xl bg-accent-cyan text-bg-deep font-heading font-bold text-sm
                         hover:bg-accent-cyan/90 transition-all active:scale-95">
              View Projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
