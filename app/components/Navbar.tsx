"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍊</span>
        <span className="text-white font-bold text-xl tracking-wide">
          Gurme <span className="text-orange-500">Planı</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-gray-400 text-sm">
        <a href="#" className="hover:text-orange-400 transition-colors">Ana Sayfa</a>
        <a href="#" className="hover:text-orange-400 transition-colors">Tarifler</a>
        <a href="#" className="hover:text-orange-400 transition-colors">Haftalık Plan</a>
        <a href="#" className="hover:text-orange-400 transition-colors">Hakkımızda</a>
      </div>
      <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30">
        Başla
      </button>
    </motion.nav>
  );
}
