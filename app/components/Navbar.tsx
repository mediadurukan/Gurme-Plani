"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Ana Sayfa",    href: "/" },
  { label: "Tarifler",     href: "/tarifler" },
  { label: "Haftalık Plan", href: "#nasil-calisir" },
  { label: "Hakkımızda",   href: "/hakkimizda" },
];

export default function Navbar({ onStartClick }: { onStartClick?: () => void }) {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(253,250,246,0.88)",
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

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((item) => {
          const isExternal = !item.href.startsWith("#");
          const baseStyle: React.CSSProperties = {
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--text-soft)",
            textDecoration: "none",
          };
          const inner = (
            <>
              {item.label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--primary)" }}
              />
            </>
          );
          return isExternal ? (
            <Link
              key={item.label}
              href={item.href}
              className="relative group transition-colors duration-200"
              style={baseStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-soft)")}
            >
              {inner}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="relative group transition-colors duration-200"
              style={baseStyle}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-soft)")}
            >
              {inner}
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onStartClick}
        className="btn-primary flex items-center justify-center text-white rounded-full px-6 py-2.5 flex-shrink-0"
        style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.01em" }}
      >
        Planlamaya Başla
      </motion.button>
    </motion.nav>
  );
}
