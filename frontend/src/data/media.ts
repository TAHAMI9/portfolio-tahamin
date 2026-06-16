// ─────────────────────────────────────────────────────────────────────────────
// MEDIA & PROFILE DATA  (skills, education, stats, channels)
// Edit the values below to match your real information.
// ─────────────────────────────────────────────────────────────────────────────

import { Skill, EducationItem, StatItem } from "@/types";

// ── Skills ────────────────────────────────────────────────────────────────────
// ⬇ INFO: Change the `level` (0–100) for each skill to match your real proficiency
export const skills: Skill[] = [
  // Programming Languages
  { name: "Python",                  level: 85, category: "languages", icon: "SiPython"         },
  { name: "JavaScript / TypeScript", level: 70, category: "languages", icon: "SiJavascript"     },
  { name: "HTML & CSS",              level: 80, category: "languages", icon: "SiHtml5"           },
  { name: "SQL",                     level: 60, category: "languages", icon: "SiMysql"           },

  // Machine Learning & AI
  { name: "TensorFlow / Keras",      level: 75, category: "ml",        icon: "SiTensorflow"     },
  { name: "Scikit-learn",            level: 80, category: "ml",        icon: "SiScikitlearn"    },
  { name: "Pandas / NumPy",          level: 85, category: "ml",        icon: "SiPandas"         },
  { name: "Data Visualization",      level: 70, category: "ml",        icon: "SiPlotly"         },

  // Tools & Platforms
  { name: "Git & GitHub",            level: 75, category: "tools",     icon: "SiGit"            },
  { name: "Kaggle",                  level: 70, category: "tools",     icon: "SiKaggle"         },
  { name: "VS Code",                 level: 90, category: "tools",     icon: "SiVisualstudiocode"},
  { name: "Linux / Bash",            level: 60, category: "tools",     icon: "SiLinux"          },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const education: EducationItem[] = [
  {
    // ⬇ INFO: Full official school name
    school:      "Sunup International School and College",
    degree:      "Secondary School Certificate (SSC) — Science",
    period:      "2022 – Present",
    description: "Focusing on science subjects with a strong emphasis on mathematics and physics. Actively involved in school research initiatives and technology clubs.",
    logoPath:    "", // ← add logo to /public/images/schools/sunup.png and set path here
    current:     true,
  },
  // ── Add more education entries here if needed ──────────────────────────────
  // {
  //   school:      "PREVIOUS SCHOOL NAME",
  //   degree:      "Junior School Certificate (JSC)",
  //   period:      "2019 – 2022",
  //   description: "Completed junior secondary education.",
  //   logoPath:    "",
  //   current:     false,
  // },
];

// ── Stats ─────────────────────────────────────────────────────────────────────
// ⬇ INFO: Update these numbers to match your real stats
export const stats: StatItem[] = [
  { label: "Research Projects",   value: 0,   suffix: "", icon: "FaFlask"   },
  { label: "Kaggle Competitions", value: 5,   suffix: "+", icon: "SiKaggle"  },
  { label: "GitHub Repos",        value: 10,  suffix: "+", icon: "FaGithub"  },
  { label: "Spotify Listeners",   value: 500, suffix: "+", icon: "FaSpotify" },
];

// ── Media items (kept for type compatibility — not used in new MediaSection) ──
export const mediaItems: { id: string; title: string; description: string; youtubeId: string; category: string; featured: boolean }[] = [];

// ── Channel links (kept for type compatibility) ───────────────────────────────
export const channelLinks: { name: string; description: string; url: string; category: string; icon: string }[] = [];
