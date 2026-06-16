import { Project } from "@/types";

export const projects: Project[] = [
  // ─── FEATURED: Portfolio Website ──────────────────────────────────────────
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A modern, responsive personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion — the very site you're browsing right now.",
    longDescription:
      "Full-stack portfolio featuring a sleek dark theme with glassmorphism effects, smooth scroll animations, a working contact form with backend API, Spotify playlist embed, social media integration, and SEO optimization. Built from scratch with a Node.js/Express backend for form handling.",
    imagePath: "/images/profile.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    category: "web-development",
    githubUrl: "https://github.com/TAHAMI9/MD-TAHAMIN-ISLAM",
    liveUrl: "",
    status: "completed",
    featured: true,
    year: 2025,
  },

  // ─── FEATURED: Colorful Calendar ──────────────────────────────────────────
  {
    id: "colorful-calendar",
    title: "Colorful Calendar",
    description:
      "A visually rich terminal-based calendar application built with Python using the Rich library for beautifully formatted, color-coded monthly views.",
    longDescription:
      "This Python script generates a full 12-month calendar for any given year, rendered with vibrant colors and clean table formatting in the terminal. Uses Python's built-in calendar module for date calculations and the Rich library for styled console output with colored weekdays and weekends.",
    imagePath: "/images/profile.jpg",
    tags: ["Python", "Rich", "CLI", "Calendar"],
    category: "python",
    githubUrl: "https://github.com/TAHAMI9/Python/blob/main/PYTHON/calander.py",
    liveUrl: "",
    status: "completed",
    featured: true,
    year: 2025,
  },

  // ─── FEATURED: Python Projects Collection ────────────────────────────────
  {
    id: "python-projects",
    title: "Python Projects Collection",
    description:
      "A growing collection of Python mini-projects covering games, utilities, algorithms, and automation — showcasing core programming skills.",
    longDescription:
      "A curated repository of Python scripts including a number guessing game, FizzBuzz solver, age calculator, banking system simulator, odd/even checker, traffic light simulator, and more. Each project demonstrates fundamental programming concepts like conditionals, loops, functions, and user input handling.",
    imagePath: "/images/profile.jpg",
    tags: ["Python", "Algorithms", "CLI", "Automation"],
    category: "python",
    githubUrl: "https://github.com/TAHAMI9/Python",
    liveUrl: "",
    status: "in-progress",
    featured: true,
    year: 2025,
  },

  // ─── Codex ────────────────────────────────────────────────────────────────
  {
    id: "codex",
    title: "Codex",
    description:
      "An open-source code repository exploring various programming concepts and experiments across multiple languages.",
    longDescription:
      "A collection of coding experiments and learning projects covering different programming paradigms. Serves as a personal knowledge base and reference for frequently used patterns and algorithms.",
    imagePath: "/images/profile.jpg",
    tags: ["Python", "JavaScript", "Open Source"],
    category: "other",
    githubUrl: "https://github.com/TAHAMI9/codex",
    liveUrl: "",
    status: "in-progress",
    featured: false,
    year: 2025,
  },
];

// Export just the featured projects (for the highlights/hero area)
export const featuredProjects = projects.filter((p) => p.featured);
