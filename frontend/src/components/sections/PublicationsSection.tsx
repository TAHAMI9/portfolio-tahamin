"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { publications } from "@/data/publications";
import SectionTitle from "@/components/ui/SectionTitle";
import { translations } from "@/lib/translations";

export default function PublicationsSection() {
  const t = translations.en;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Total Papers", value: publications.length },
    {
      label: "Published",
      value: publications.filter((p) => p.doi).length,
    },
    {
      label: "With PDF",
      value: publications.filter((p) => p.pdfUrl).length,
    },
  ];

  return (
    <section
      id="publications"
      className="relative py-24 bg-bg-surface"
      aria-labelledby="publications-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag={t.publications.sectionTag}
          title={t.publications.title}
        />

        {/* Stats bar — all zeros while no research yet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="flex flex-wrap gap-6 justify-center mb-14"
        >
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-bg-card border border-border"
            >
              <span className="font-syne font-black text-2xl text-accent-cyan">
                {value}
              </span>
              <span className="text-sm text-text-muted font-mono">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Profile card — aligned like Media section platform cards */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-5 p-6 rounded-2xl border bg-bg-surface border-border w-full max-w-xs sm:max-w-sm"
            aria-busy={loading}
            aria-label="Research publications"
          >
            <div className="w-full flex items-center justify-start gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/profile.jpg"
                  alt="MD Tahamin Islam"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="w-px h-12 bg-border flex-shrink-0"></div>
              <div className="flex items-center text-text-secondary font-mono text-sm">
                Publication Loading...
                <span className="ml-2 w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
