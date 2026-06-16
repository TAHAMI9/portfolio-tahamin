"use client";

import { motion } from "framer-motion";
import {
  FaInstagram, FaFacebook, FaGithub,
  FaLinkedin, FaSpotify, FaExternalLinkAlt, FaDiscord,
} from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";

/* ── Social platform cards ────────────────────────────────────────────────── */
// ⬇ INFO: Replace every href with your real profile URL
const platforms = [
  {
    name:  "Instagram",
    icon:  FaInstagram,
    color: "from-pink-500 via-red-500 to-yellow-500",
    bg:    "bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40",
    text:  "text-pink-400",
    href:  "https://www.instagram.com/tahami9n",          // ← your Instagram
    handle:"@tahami9n",
    desc:  "Follow my day-to-day life, projects, and behind-the-scenes.",
  },
  {
    name:  "Facebook",
    icon:  FaFacebook,
    color: "from-blue-600 to-blue-400",
    bg:    "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
    text:  "text-blue-400",
    href:  "https://www.facebook.com/tahami9n",           // ← your Facebook
    handle:"@tahami9n",
    desc:  "Connect on Facebook for updates, articles, and community posts.",
  },
  {
    name:  "Discord",
    icon:  FaDiscord,
    color: "from-[#5865F2] to-[#7289DA]",
    bg:    "bg-[#5865F2]/10 border-[#5865F2]/20 hover:border-[#5865F2]/40",
    text:  "text-[#5865F2]",
    href:  "https://discord.com/users/1371156037809209557",
    handle:"Md Tahamin Islam",
    desc:  "Chat with me directly, ask questions, or join my community.",
  },
  {
    name:  "LinkedIn",
    icon:  FaLinkedin,
    color: "from-blue-500 to-cyan-400",
    bg:    "bg-blue-500/10 border-blue-500/20 hover:border-blue-600/40",
    text:  "text-blue-400",
    href:  "https://www.linkedin.com/in/md-tahamin-islam-mahin/",         // ← your LinkedIn
    handle:"Md Tahamin Islam",
    desc:  "Professional network — reach out for collaborations and opportunities.",
  },
  {
    name:  "GitHub",
    icon:  FaGithub,
    color: "from-gray-400 to-white",
    bg:    "bg-white/5 border-white/10 hover:border-white/25",
    text:  "text-gray-300",
    href:  "https://github.com/TAHAMI9",             // ← your GitHub
    handle:"@TAHAMI9",
    desc:  "Browse open-source projects, ML experiments, and web apps.",
  },
];

function PlatformCard({
  platform, index,
}: {
  platform: typeof platforms[0]; index: number;
}) {
  const { icon: Icon, name, bg, text, href, handle, desc, color } = platform;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className={`flex flex-col gap-4 p-6 rounded-2xl border ${bg} transition-all duration-300 group`}
      aria-label={`Visit ${name} profile`}
    >
      {/* Icon + name */}
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} p-0.5`}>
          <div className="w-full h-full rounded-xl bg-bg-surface flex items-center justify-center">
            <Icon className={`text-xl ${text}`} />
          </div>
        </div>
        <FaExternalLinkAlt className="text-text-muted text-xs group-hover:text-text-secondary transition-colors" />
      </div>

      {/* Info */}
      <div>
        <h3 className={`font-heading font-bold text-lg ${text} mb-0.5`}>{name}</h3>
        <p className="text-xs font-mono text-text-muted mb-2">{handle}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
      </div>

      {/* CTA */}
      <span className={`text-xs font-mono ${text} group-hover:underline mt-auto`}>
        Follow on {name} →
      </span>
    </motion.a>
  );
}

/* ── Spotify Section ──────────────────────────────────────────────────────── */
function SpotifyAlbum() {
  /*
   * ─────────────────────────────────────────────────────────────────────────
   * HOW TO ADD YOUR SPOTIFY ALBUM:
   *
   * 1. Go to your Spotify album "Xcape,By Mahin"
   * 2. Click the three dots (…) → Share → Copy link to album
   *    It will look like: https://open.spotify.com/album/XXXXXXXXXXXXXXXX
   * 3. Copy only the ID part (after /album/)
   * 4. Replace the SPOTIFY_ALBUM_ID below with your real ID
   * ─────────────────────────────────────────────────────────────────────────
   */
  const SPOTIFY_ALBUM_ID = "0j3zJ4JfKqg40P91rK40IR" as string;  // ← PASTE YOUR ID HERE

  const isPlaceholder = SPOTIFY_ALBUM_ID === "SPOTIFY_ALBUM_ID_HERE";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-accent-green/20 bg-bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-border">
        <div className="w-12 h-12 rounded-xl bg-accent-green/10 border border-accent-green/20
                        flex items-center justify-center">
          <FaSpotify className="text-2xl text-accent-green" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-text-bright text-lg">Xcape,By Mahin</h3>
          <p className="text-sm text-accent-green font-mono">Album on Spotify</p>
        </div>
        <a
          href={`https://open.spotify.com/playlist/${SPOTIFY_ALBUM_ID}?si=qp_BBfdOT2qIUFlydM4rmw`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-green text-bg-deep
                     font-mono font-bold text-xs hover:bg-accent-green/90 transition-colors"
          aria-label="Open album on Spotify"
        >
          <FaSpotify />
          Open on Spotify
        </a>
      </div>

      {/* Embed */}
      <div className="p-4">
        {isPlaceholder ? (
          /* Placeholder shown until real album ID is added */
          <div className="flex flex-col items-center justify-center gap-4 py-12
                          border-2 border-dashed border-accent-green/20 rounded-xl bg-accent-green/5">
            <FaSpotify className="text-5xl text-accent-green/40" />
            <div className="text-center">
              <p className="font-heading font-bold text-text-bright mb-1">Xcape,By Mahin</p>
              <p className="text-sm text-text-muted max-w-sm leading-relaxed">
                To embed your album, get your Spotify album ID from the share link
                and paste it in <span className="text-accent-green font-mono">MediaSection.tsx</span>
                {" → "}
                <span className="text-accent-gold font-mono">SPOTIFY_ALBUM_ID</span>
              </p>
            </div>
          </div>
        ) : (
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_ALBUM_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Xcape,By Mahin on Spotify"
          />
        )}
      </div>
    </motion.div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function MediaSection() {
  return (
    <section id="media" className="relative py-24 bg-bg-deep" aria-labelledby="media-heading">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="My Channels"
          title="Media & Content"
          subtitle="Follow me on social platforms, explore my code, or listen to my music."
        />

        {/* Social platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-14">
          {platforms.map((p, i) => (
            <PlatformCard key={p.name} platform={p} index={i} />
          ))}
        </div>

        {/* Spotify album section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="font-heading font-bold text-text-bright text-xl">🎵 My Music</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-accent-green/40 to-transparent" />
          </div>
          <SpotifyAlbum />
        </div>

      </div>
    </section>
  );
}
