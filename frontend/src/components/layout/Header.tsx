"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about", type: "anchor" },
  { label: "Skills", href: "/skills", type: "page" },
  { label: "Projects", href: "#projects", type: "anchor" },
  { label: "Publications", href: "#publications", type: "anchor" },
  { label: "Media", href: "#media", type: "anchor" },
  { label: "Contact", href: "#contact", type: "anchor" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection (only on home page)
  useEffect(() => {
    if (!isHome) return;
    const ids = ["home", "about", "projects", "publications", "media", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  useEffect(() => {
    if (window.innerWidth >= 768) setMobileOpen(false);
  }, []);

  const handleClick = (link: (typeof navLinks)[0]) => {
    setMobileOpen(false);
    if (link.type === "anchor") {
      if (isHome) {
        scrollToSection(link.href.replace("#", ""));
      } else {
        window.location.href = `/${link.href}`;
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-bg-deep/95 backdrop-blur-md border-b border-border shadow-card"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <Image src="/images/profile.jpg" alt="Tahamin Islam" fill className="object-cover" />
              </div>
              <span className="font-heading font-bold text-text-bright text-lg group-hover:text-accent-cyan transition-colors">
                Tahamin
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = link.type === "anchor"
                  ? activeSection === link.href.replace("#", "")
                  : pathname === link.href;

                return link.type === "page" ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary"
                      }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan" />
                    )}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleClick(link)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive ? "text-accent-cyan" : "text-text-secondary hover:text-text-primary"
                      }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span layoutId="nav-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-bg-surface/95 backdrop-blur-md border-b border-border"
          >
            <nav className="px-4 py-5 flex flex-col gap-2">
              {navLinks.map((link, i) =>
                link.type === "page" ? (
                  <motion.div key={link.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleClick(link)}
                    className="flex items-center px-4 py-3 rounded-xl text-left text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors font-medium"
                  >
                    {link.label}
                  </motion.button>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
