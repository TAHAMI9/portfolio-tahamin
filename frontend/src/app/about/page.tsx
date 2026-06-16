"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaDownload, FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaSpotify, FaDiscord } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const socials = [
  { icon: FaGithub,    label: "GitHub",    href: "https://github.com/TAHAMI9",          color: "hover:text-white" },
  { icon: FaLinkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/md-tahamin-islam-mahin/",       color: "hover:text-blue-400" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/tahami9n",         color: "hover:text-pink-400" },
  { icon: FaFacebook,  label: "Facebook",  href: "https://www.facebook.com/tahami9n",          color: "hover:text-blue-500" },
  { icon: FaSpotify,   label: "Spotify",   href: "https://open.spotify.com/playlist/0j3zJ4JfKqg40P91rK40IR?si=qp_BBfdOT2qIUFlydM4rmw",    color: "hover:text-accent-green" },
  { icon: FaDiscord,   label: "Discord",   href: "https://discord.com/users/1371156037809209557",    color: "hover:text-[#5865F2]" },
];

const interests = [
  { emoji: "🤖", title: "Machine Learning", desc: "Building and training models for classification, prediction, and NLP — especially for Bangla language tasks." },
  { emoji: "🎵", title: "Music", desc: "Composing and releasing original music. My album 'Xcape,By Mahin' is available on Spotify." },
  { emoji: "🌐", title: "Web Development", desc: "Building full-stack applications with React, Next.js, Node.js, and modern web technologies." },
  { emoji: "💡", title: "Motivation & Content", desc: "Creating motivational content to inspire young learners in Bangladesh and beyond." },
];

const timeline = [
  {
    year: "2022 – Present",
    title: "Sunup International School and College",
    subtitle: "Secondary School Certificate (SSC)",
    desc: "Focusing on science subjects with a strong emphasis on mathematics and physics. Actively involved in school research initiatives and tech clubs.",
    current: true,
  },
];

const achievements = [
  { emoji: "🏆", text: "Participated in multiple Kaggle ML competitions" },
  { emoji: "🎵", text: "Released debut album 'Xcape,By Mahin' on Spotify" },
  { emoji: "💻", text: "Built 10+ open-source projects on GitHub" },
  { emoji: "🌍", text: "Aspiring to study at Cambridge or Oxford" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-deep pt-20">

        {/* Hero banner */}
        <section className="relative py-20 bg-bg-surface overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-cyan/5 blur-3xl rounded-full pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <Link href="/"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent-cyan
                         font-mono text-sm transition-colors mb-10 group">
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src="/images/profile.jpg" alt="MD Tahamin Islam" fill className="object-cover" />
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/30
                                   bg-accent-cyan/5 text-accent-cyan text-xs font-mono mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    Full Profile
                  </span>
                  <h1 className="font-heading font-black text-4xl sm:text-5xl text-text-bright mb-2 tracking-tight">
                    MD TAHAMIN ISLAM
                  </h1>
                  <p className="text-text-secondary text-lg mb-4">Mahin · Web Developer · ML Engineer</p>
                  <div className="flex flex-wrap gap-3 items-center">
                    {socials.map(({ icon: Icon, label, href, color }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                         aria-label={label}
                         className={`w-9 h-9 rounded-lg bg-bg-surface border border-border flex items-center justify-center
                                     text-text-muted ${color} hover:border-opacity-50 transition-all hover:scale-110`}>
                        <Icon className="text-sm" />
                      </a>
                    ))}
                    <a href="/resume.pdf" download="Md_Tahamin_Islam_CV.pdf"
                       className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-cyan text-bg-deep
                                  font-mono font-bold text-xs hover:bg-accent-cyan/90 transition-colors">
                      <FaDownload className="text-xs" />
                      Download CV
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-16">

          {/* About me */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl text-text-bright mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm">✦</span>
              About Me
            </h2>
            <div className="p-6 rounded-2xl bg-bg-surface border border-border">
              <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
                <p>
                  Welcome to the official portfolio of <strong className="text-text-primary">MD TAHAMIN ISLAM (Mahin)</strong> — a passionate learner, aspiring machine learning engineer, and tech enthusiast from Bangladesh.
                </p>
                <p>
                  My journey into technology started with a deep curiosity about how machines can learn from data. I've since built classifiers, worked on NLP projects, and competed on Kaggle — all while still in secondary school.
                </p>
                <p>
                  I'm also a musician — my debut album <strong className="text-accent-green">'Xcape,By Mahin'</strong> is available on Spotify. I compose music as a creative outlet alongside my technical pursuits, and I create motivational content.
                </p>
                <p>
                  My ultimate goal is to study at Cambridge or Oxford, contribute to AI research that genuinely helps people, and build technology that makes a difference in South Asia and beyond.
                </p>
                {/* ⬇ INFO: Add more paragraphs about yourself here */}
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl text-text-bright mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center text-accent-gold text-sm">🎓</span>
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {timeline.map((item) => (
                <div key={item.title}
                     className="p-6 rounded-2xl bg-bg-surface border border-border relative overflow-hidden">
                  {item.current && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-gold" />
                  )}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading font-bold text-text-bright text-lg">{item.title}</h3>
                    {item.current && (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-accent-green flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-accent-cyan font-mono text-sm mb-1">{item.subtitle}</p>
                  <p className="text-text-muted font-mono text-xs mb-3">{item.year}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
              {/* ⬇ INFO: Add more education entries by copying the block above */}
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl text-text-bright mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-green/10 border border-accent-green/20 flex items-center justify-center text-accent-green text-sm">💡</span>
              Interests & Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {interests.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.07 }}
                  className="p-5 rounded-2xl bg-bg-surface border border-border
                             hover:border-accent-cyan/30 transition-colors group"
                >
                  <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform">{item.emoji}</span>
                  <h3 className="font-heading font-bold text-text-bright text-base mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl text-text-bright mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple text-sm">🏆</span>
              Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-bg-surface border border-border
                             hover:border-accent-cyan/20 transition-colors"
                >
                  <span className="text-xl flex-shrink-0">{a.emoji}</span>
                  <p className="text-text-secondary text-sm">{a.text}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-xs font-mono text-text-muted mt-4 italic">
              ← Edit achievements in /src/app/about/page.tsx → achievements array
            </p>
          </motion.section>

          {/* Goals */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-2xl text-text-bright mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan text-sm">🚀</span>
              Goals & Aspirations
            </h2>
            <div className="p-6 rounded-2xl bg-bg-surface border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Short-term", items: ["Complete SSC with outstanding results", "Build more ML projects", "Expand music on Spotify", "Grow open-source contributions"] },
                  { title: "Long-term",  items: ["Study CS / AI at Cambridge or Oxford", "Build AI products for South Asia", "Contribute to open-source ML projects", "Mentor young Bangladeshi tech talent"] },
                ].map(({ title, items }) => (
                  <div key={title}>
                    <h3 className="font-heading font-bold text-text-bright mb-3">{title}</h3>
                    <ul className="flex flex-col gap-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA row */}
          <div className="flex flex-wrap gap-4 justify-center pb-4">
            <Link href="/skills"
              className="px-8 py-3.5 rounded-xl bg-accent-cyan text-bg-deep font-heading font-bold text-sm
                         hover:bg-accent-cyan/90 transition-all active:scale-95">
              View My Skills
            </Link>
            <Link href="/#projects"
              className="px-8 py-3.5 rounded-xl border border-border text-text-secondary font-medium text-sm
                         hover:border-accent-cyan/50 hover:text-accent-cyan transition-all active:scale-95">
              View Projects
            </Link>
            <a href="/resume.pdf" download="Md_Tahamin_Islam_CV.pdf"
               className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-accent-gold/30
                          text-accent-gold font-medium text-sm hover:bg-accent-gold/10 transition-all active:scale-95">
              <FaDownload className="text-xs" />
              Download CV
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
