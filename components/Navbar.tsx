"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "À propos", href: "#niveaux" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-[#090909]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight truncate">EPS OP2009</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/chat"
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap"
            >
              Ouvrir le chat →
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden flex-shrink-0 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white -mr-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#090909] md:hidden flex flex-col">
          <div className="flex items-center justify-between px-4 h-14 border-b border-white/[0.06]">
            <span className="text-white font-semibold text-sm">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-2xl text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-base bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-medium transition-all w-full max-w-xs text-center"
            >
              Ouvrir le chat →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
