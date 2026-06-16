"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";

/* ── Typewriter hook ──────────────────────────────────────────────────────── */
const ROLES = ["Web Developer", "ML Engineer", "Researcher"];

function useTypewriter(words: string[], speed = 85, pause = 2200) {
  const [displayed, setDisplayed]   = useState("");
  const [wordIndex, setWordIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [deleting,  setDeleting]    = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          setCharIndex(0);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

/* ── Particle canvas ──────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.4 + 0.4,
      o: Math.random() * 0.45 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.o})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34,211,238,${0.07 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

/* ── Hero Section ─────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-bg-deep">
      <ParticleCanvas />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-25 pointer-events-none" aria-hidden />
      <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none animate-pulse-slow" aria-hidden />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent-gold/5 blur-3xl pointer-events-none animate-float-slow" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Text ────────────────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">

            {/* Name — ALL CAPS */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none mb-5 tracking-tight"
            >
              <span className="text-text-bright">MD&nbsp;</span>
              <span className="text-text-bright">TAHAMIN&nbsp;</span>
              <span className="bg-gradient-to-r from-accent-cyan via-accent-green to-accent-gold bg-clip-text text-transparent">
                ISLAM
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <span className="text-text-muted font-mono text-base">&gt;</span>
              <span className="text-accent-cyan font-mono text-xl font-semibold min-h-[1.75rem]">
                {role}
                <span className="animate-pulse text-accent-gold ml-0.5">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              Welcome to the official portfolio of <strong className="text-text-primary">MD TAHAMIN ISLAM (Mahin)</strong> — 
              a passionate learner, aspiring machine learning engineer,
              and tech enthusiast from Bangladesh.
            </motion.p>

            {/* CTAs — View My Details (about page) + View Projects */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.54 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/about"
                className="px-8 py-3.5 rounded-xl bg-accent-cyan text-bg-deep font-heading font-bold text-sm
                           hover:bg-accent-cyan/90 transition-all duration-200 active:scale-95"
              >
                View My Details
              </Link>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3.5 rounded-xl border border-border text-text-secondary font-medium text-sm
                           hover:border-accent-cyan/50 hover:text-accent-cyan transition-all duration-200 active:scale-95"
              >
                View Projects
              </button>
            </motion.div>
          </div>

          {/* ── Profile photo ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex-shrink-0"
          >
            <div className="absolute -inset-4 rounded-full border border-accent-cyan/20 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-full border border-accent-gold/10 animate-spin-slow"
                 style={{ animationDirection: "reverse" }} />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-cyan/25 via-transparent to-accent-gold/25 blur-sm" />

            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full
                            overflow-hidden border-2 border-bg-surface animate-float">
              <Image
                src="/images/profile.jpg"
                alt="MD Tahamin Islam"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5
                   text-text-muted hover:text-accent-cyan transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono">Scroll to explore</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <FaChevronDown />
        </motion.div>
      </motion.button>
    </section>
  );
}
