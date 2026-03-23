"use client";

import { motion } from "framer-motion";

export default function Navbar({ onStartClick }: { onStartClick?: () => void }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(249,115,22,0.1)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍊</span>
        <span className="text-gray-800 font-bold text-xl tracking-wide">
          Gurme <span className="shimmer-text">Planı</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {["Ana Sayfa", "Tarifler", "Haftalık Plan", "Hakkımızda"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-gray-400 hover:text-orange-400 transition-colors duration-200 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStartClick}
        className="flex items-center justify-center text-white text-[15px] font-bold px-6 py-2.5 rounded-full relative overflow-hidden flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #f97316, #ea580c)",
          boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
        }}
      >
        Başla
      </motion.button>
    </motion.nav>
  );
}
