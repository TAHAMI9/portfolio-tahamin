"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaGithub, FaLinkedin, FaInstagram, FaFacebook,
  FaSpotify, FaEnvelope, FaDiscord
} from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";

// ⬇ INFO: Update every href below with your real profile links
const socials = [
  { icon: FaGithub,    label: "GitHub",    href: "https://github.com/TAHAMI9" },
  { icon: FaLinkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/md-tahamin-islam-mahin/" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/tahami9n" },
  { icon: FaFacebook,  label: "Facebook",  href: "https://www.facebook.com/tahami9n" },
  { icon: FaDiscord,   label: "Discord",   href: "https://discord.com/users/1371156037809209557" },
  { icon: FaSpotify,   label: "Spotify",   href: "https://open.spotify.com/playlist/0j3zJ4JfKqg40P91rK40IR?si=qp_BBfdOT2qIUFlydM4rmw" },
  { icon: FaEnvelope,  label: "Email",     href: "mailto:thahaminislam@gmail.com" },
];

const quickLinks = [
  { label: "About",        href: "#about",       type: "anchor" },
  { label: "Skills",       href: "/skills",      type: "page"   },
  { label: "Projects",     href: "#projects",    type: "anchor" },
  { label: "Publications", href: "#publications",type: "anchor" },
  { label: "Media",        href: "#media",       type: "anchor" },
  { label: "Contact",      href: "#contact",     type: "anchor" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-deep border-t border-border pt-16 pb-8" role="contentinfo">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-md opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                <Image src="/images/profile.jpg" alt="Tahamin Islam" fill className="object-cover" />
              </div>
              <span className="font-heading font-bold text-text-bright text-lg">
                Tahamin<span className="text-accent-cyan">.</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Passionate learner, aspiring machine learning engineer,
              and tech enthusiast from Bangladesh.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-1" role="list" aria-label="Social links">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-bg-surface border border-border flex items-center justify-center
                             text-text-muted hover:text-accent-cyan hover:border-accent-cyan/40
                             transition-all duration-200 hover:scale-110"
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-text-secondary text-xs font-mono font-medium uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  {l.type === "page" ? (
                    <Link href={l.href}
                      className="text-text-muted text-sm hover:text-accent-cyan transition-colors">
                      {l.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(l.href.replace("#", ""))}
                      className="text-text-muted text-sm hover:text-accent-cyan transition-colors">
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-text-secondary text-xs font-mono font-medium uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <a href="mailto:thahaminislam@gmail.com"
                 className="hover:text-accent-cyan transition-colors flex items-center gap-2">
                <FaEnvelope className="text-accent-cyan text-xs" />
                {/* ⬇ INFO: Change to your real email */}
                thahaminislam@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <span className="text-accent-cyan text-xs">📍</span>
                Bangladesh 🇧🇩
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright only */}
        <div className="border-t border-border pt-6 text-center text-text-muted text-xs font-mono">
          © {year} MD TAHAMIN ISLAM. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
