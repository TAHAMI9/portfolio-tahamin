// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely (resolves conflicts)
 * Usage: cn("px-4 py-2", isActive && "bg-cyan-500", "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Smooth scroll to a section by its ID
 * Usage: scrollToSection("about")  →  scrolls to <section id="about">
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Format a year range for display
 * Examples:
 *   formatYearRange(2022, null)    → "2022 – Present"
 *   formatYearRange(2019, 2022)    → "2019 – 2022"
 */
export function formatYearRange(
  start: number,
  end: number | null,
  presentLabel = "Present"
): string {
  return `${start} – ${end ?? presentLabel}`;
}

/**
 * Build a YouTube thumbnail URL from a video ID
 * Quality options: "default", "hqdefault", "mqdefault", "maxresdefault"
 */
export function getYoutubeThumbnail(
  videoId: string,
  quality: "default" | "hqdefault" | "mqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Build the YouTube embed URL from a video ID
 * Adds privacy-enhanced mode and no related videos
 */
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}

/**
 * Truncate a string to a max length, appending "..."
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max).trimEnd() + "…";
}

/**
 * Simple email validation
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Animate a number counter from 0 to target
 * (Used in the stats section)
 */
export function animateCounter(
  element: HTMLElement,
  target: number,
  duration = 1500
) {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target).toString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
