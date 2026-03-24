"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Ana Sayfa",     href: "/" },
  { label: "Tarifler",      href: "/tarifler" },
  { label: "Haftalık Plan", href: "#nasil-calisir" },
  { label: "Hakkımızda",   href: "/hakkimizda" },
];

export default function Navbar({ onStartClick }: { onStartClick?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      setTimeout(() => {
        const el = document.getElementById(href.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4"
        style={{
          background: "rgba(253,250,246,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(200,83,15,0.1)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 12, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 6 }}
          >
            🍊
          </motion.span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-dark)", letterSpacing: "-0.02em" }}>
            Gurme <span className="shimmer-text">Planı</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isHash = item.href.startsWith("#");
            const baseStyle: React.CSSProperties = {
              fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500,
              color: "var(--text-soft)", textDecoration: "none",
            };
            const inner = (
              <>
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ background: "var(--primary)" }} />
              </>
            );
            return isHash ? (
              <button key={item.label} onClick={() => handleNavClick(item.href)}
                className="relative group transition-colors duration-200" style={baseStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-soft)")}
              >{inner}</button>
            ) : (
              <Link key={item.label} href={item.href}
                className="relative group transition-colors duration-200" style={baseStyle}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-soft)")}
              >{inner}</Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA — masaüstünde göster */}
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={onStartClick}
            className="btn-primary hidden sm:flex items-center justify-center text-white rounded-full px-5 py-2.5"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600 }}
          >
            Planlamaya Başla
          </motion.button>

          {/* Hamburger — mobilde göster */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-xl"
            style={{ background: "rgba(200,83,15,0.08)" }}
            aria-label="Menü"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block w-5 h-0.5 rounded-full" style={{ background: "var(--primary)" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-5 h-0.5 rounded-full" style={{ background: "var(--primary)" }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block w-5 h-0.5 rounded-full" style={{ background: "var(--primary)" }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.3)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[65px] left-4 right-4 z-50 rounded-2xl overflow-hidden"
              style={{ background: "#fff", border: "1px solid rgba(200,83,15,0.12)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
            >
              {NAV_LINKS.map((item, i) => {
                const isHash = item.href.startsWith("#");
                const cls = "flex items-center px-5 py-4 text-base font-medium transition-colors";
                const style = { color: "var(--text-dark)", borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(200,83,15,0.08)" : "none" };
                return isHash ? (
                  <button key={item.label} onClick={() => handleNavClick(item.href)}
                    className={cls + " w-full text-left"} style={style}
                  >{item.label}</button>
                ) : (
                  <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
                    className={cls} style={style}
                  >{item.label}</Link>
                );
              })}
              <div className="px-5 py-4">
                <button
                  onClick={() => { setMenuOpen(false); onStartClick?.(); }}
                  className="btn-primary w-full text-white rounded-xl py-3 font-semibold text-base"
                >
                  Planlamaya Başla
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
