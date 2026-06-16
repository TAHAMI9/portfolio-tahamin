"use client";

import Image from "next/image";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { education } from "@/data/media";
import SectionTitle from "@/components/ui/SectionTitle";
import { animateCounter } from "@/lib/utils";

/* ── Stat counter ─────────────────────────────────────────────────────────── */
function StatCounter({ value, suffix, label, emoji }: {
  value: number; suffix?: string; label: string; emoji: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false });
  useEffect(() => {
    if (inView && ref.current) animateCounter(ref.current, value);
  }, [inView, value]);

  return (
    <div className="flex flex-col items-center gap-1 p-5 rounded-2xl bg-bg-surface border border-border
                    hover:border-accent-cyan/30 transition-colors text-center group">
      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{emoji}</span>
      <div className="font-heading font-black text-3xl text-text-bright">
        <span ref={ref}>0</span>{suffix}
      </div>
      <span className="text-xs font-mono text-text-muted">{label}</span>
    </div>
  );
}

const stats = [
  { label: "Research Projects", value: 0, suffix: "", emoji: "🔬" },
  { label: "Kaggle Competitions", value: 5, suffix: "+", emoji: "📊" },
  { label: "GitHub Repos", value: 10, suffix: "+", emoji: "💻" },
  { label: "Spotify Listeners", value: 500, suffix: "+", emoji: "🎵" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-bg-surface" aria-labelledby="about-heading">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle tag="Who I Am" title="About Me" align="center" />

        {/* ── Bio + quick info ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">

          {/* Left: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >


            {/* Bio paragraphs — copy from Canva site */}
            <div className="flex flex-col gap-4">
              {[
                "I'm Mahin — a passionate learner, aspiring machine learning engineer, and tech enthusiast from Bangladesh. I believe the best technology is built where rigorous science meets creative curiosity.",
                "My journey into machine learning began when I built my first classifier and got hooked on the idea that computers could learn patterns from data. Since then I've worked on ML projects, participated in Kaggle competitions, and explored web development.",
                "Beyond code I compose and release music on Spotify and create motivational content. My goal is to study at a world-class university and contribute to AI research that genuinely benefits people.",
              ].map((para, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="text-text-primary text-lg leading-relaxed font-medium"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Interest tags (terminal style) */}
            <div className="p-4 rounded-xl bg-bg-deep border border-border font-mono text-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-text-muted">interests.sh</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["🤖 Machine Learning","🎵 Music","🌐 Web Dev","📚 Research","💡 Motivation","🇧🇩 Bangladesh",
                ].map((tag) => (
                  <span key={tag}
                        className="px-2.5 py-1 rounded-lg bg-bg-surface border border-border
                                   text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/30
                                   transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── More Details CTA ─────────────────────────────────────────── */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl
                         border border-accent-cyan/30 bg-accent-cyan/5 text-accent-cyan
                         font-medium text-sm hover:bg-accent-cyan/10 transition-all group"
            >
              More Details About Me
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Education + quick links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {/* Education */}
            <div>
              <h3 className="font-heading font-bold text-text-bright text-xl mb-6">Education</h3>
              <div className="flex flex-col">
                {education.map((item, i) => (
                  <motion.div
                    key={item.school}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-5 pb-8 last:pb-0"
                  >
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full border-2 z-10 ${
                        item.current
                          ? "border-accent-cyan bg-accent-cyan animate-pulse"
                          : "border-text-muted bg-bg-surface"
                      }`} />
                      <div className="w-px flex-1 bg-gradient-to-b from-border to-transparent mt-1 min-h-[24px]" />
                    </div>
                    <div className="flex-1 pb-2">
                      <h4 className="font-heading font-bold text-text-bright">{item.school}</h4>
                      <p className="text-sm text-accent-cyan font-mono mb-0.5">{item.degree}</p>
                      <p className="text-xs text-text-muted font-mono mb-1">{item.period}</p>
                      {item.description && (
                        <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                      )}
                      {item.current && (
                        <span className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-mono text-accent-green">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                          Currently Enrolled
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Aspirations */}
            <div className="p-5 rounded-2xl bg-bg-card border border-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <p className="font-heading font-bold text-text-bright text-sm">Target Universities</p>
                  <p className="text-xs text-text-muted font-mono">Cambridge / Oxford</p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Aiming to study Computer Science or AI at a world-class institution,
                with a focus on ML research that benefits communities across the Global South.
              </p>
            </div>

            {/* View Skills link */}
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl
                         border border-accent-gold/30 bg-accent-gold/5 text-accent-gold
                         font-medium text-sm hover:bg-accent-gold/10 transition-all group"
            >
              View All Skills & Download CV
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1 }}
            >
              <StatCounter {...s} />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs font-mono text-text-muted mt-4 italic">
          ← Update stat numbers in /src/components/sections/AboutSection.tsx → stats array
        </p>
      </div>
    </section>
  );
}
