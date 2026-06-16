import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────────────────────
      colors: {
        bg: {
          deep:    "#060912",
          surface: "#0c1120",
          card:    "rgba(255,255,255,0.04)",
          hover:   "rgba(255,255,255,0.07)",
        },
        accent: {
          cyan:        "#22d3ee",
          "cyan-dark": "#0891b2",
          gold:        "#fbbf24",
          "gold-dark": "#d97706",
          green:       "#34d399",
          "green-dark":"#059669",
          purple:      "#a78bfa",
        },
        text: {
          bright:    "#f8fafc",
          primary:   "#e2e8f0",
          secondary: "#94a3b8",
          muted:     "#475569",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          bright:  "rgba(255,255,255,0.15)",
        },
      },

      // ── Fonts ────────────────────────────────────────────────────────────────
      // Now uses Poppins for headings and Inter for body
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"], // Poppins
        body:    ["var(--font-body)",    "sans-serif"], // Inter
        mono:    ["var(--font-mono)",    "monospace"],  // JetBrains Mono
        // Keep old names as aliases so nothing breaks
        syne:    ["var(--font-heading)", "sans-serif"],
        jakarta: ["var(--font-body)",    "sans-serif"],
      },

      // ── Animations ───────────────────────────────────────────────────────────
      animation: {
        "fade-in-up":  "fadeInUp 0.6s ease forwards",
        "fade-in":     "fadeIn 0.5s ease forwards",
        float:         "float 6s ease-in-out infinite",
        "float-slow":  "float 10s ease-in-out infinite",
        "pulse-slow":  "pulse 4s ease-in-out infinite",
        glow:          "glow 2s ease-in-out infinite alternate",
        "spin-slow":   "spin 8s linear infinite",
        shimmer:       "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        glow: {
          "0%":   { boxShadow: "0 0 5px #22d3ee40" },
          "100%": { boxShadow: "0 0 20px #22d3ee80, 0 0 40px #22d3ee40" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      // ── Background patterns ──────────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
        "grid-md": "60px 60px",
      },

      // ── Shadows ──────────────────────────────────────────────────────────────
      boxShadow: {
        glow:         "0 0 20px rgba(34,211,238,0.3)",
        "glow-gold":  "0 0 20px rgba(251,191,36,0.3)",
        "glow-green": "0 0 20px rgba(52,211,153,0.3)",
        card:         "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
