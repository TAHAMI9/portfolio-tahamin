// ─────────────────────────────────────────────────────────────────────────────
// SHARED TYPESCRIPT TYPES
// ─────────────────────────────────────────────────────────────────────────────

// Language codes supported by the site
export type Locale = "en" | "bn";

// Navigation item
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

// ─── PROJECT ─────────────────────────────────────────────────────────────────
export type ProjectCategory =
  | "machine-learning"
  | "web-development"
  | "python"
  | "other";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  // Path to screenshot — place images in /public/images/projects/
  // Leave as "" if no image yet; a placeholder will be shown
  imagePath: string;
  tags: string[];
  category: ProjectCategory;
  githubUrl?: string; // Link to GitHub repo
  liveUrl?: string; // Link to live demo or Kaggle notebook
  status: "completed" | "in-progress" | "planned";
  featured: boolean; // Whether to show in the featured/highlight section
  year: number;
}

// ─── PUBLICATION ─────────────────────────────────────────────────────────────
export interface Publication {
  id: string;
  title: string;
  abstract: string;
  venue?: string; // Journal, conference, or "self-published"
  pdfUrl?: string; // Link to PDF (Dropbox, Google Drive, academia.edu, etc.)
  doi?: string; // DOI if published in a journal
  tags: string[];
  year: number;
  coverImage?: string; // Optional cover image path
}

// ─── MEDIA ───────────────────────────────────────────────────────────────────
export type MediaCategory = "music" | "motivational" | "tech";

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  // YouTube video ID (the part after ?v= in the YouTube URL)
  // Example: for https://youtube.com/watch?v=dQw4w9WgXcQ, the ID is dQw4w9WgXcQ
  youtubeId: string;
  category: MediaCategory;
  featured: boolean;
}

export interface ChannelLink {
  name: string;
  description: string;
  url: string;
  category: MediaCategory;
  icon: string; // react-icons icon name
}

// ─── SKILL ───────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0–100 proficiency percentage
  category: "languages" | "ml" | "tools" | "other";
  icon?: string; // react-icons icon name, e.g. "SiPython"
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────
export interface EducationItem {
  school: string;
  degree: string;
  period: string; // e.g. "2022 – present"
  description?: string;
  logoPath?: string; // Path to school logo in /public/images/schools/
  current: boolean;
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API response shape from the backend /api/contact
export interface ContactApiResponse {
  success: boolean;
  message: string;
}

// ─── STATS ───────────────────────────────────────────────────────────────────
export interface StatItem {
  label: string;
  value: number;
  suffix?: string; // e.g. "+" or "%"
  icon: string;
}
