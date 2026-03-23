"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlanModal from "./PlanModal";

const floatingItems = [
  { emoji: "🥗", delay: 0, x: "8%", y: "20%" },
  { emoji: "🍝", delay: 0.8, x: "85%", y: "15%" },
  { emoji: "🥘", delay: 1.4, x: "15%", y: "70%" },
  { emoji: "🍜", delay: 0.4, x: "78%", y: "65%" },
  { emoji: "🥩", delay: 1.8, x: "50%", y: "10%" },
  { emoji: "🧁", delay: 1.1, x: "90%", y: "40%" },
];

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PlanModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Animated background orbs */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{
              width: 600,
              height: 600,
              left: "50%",
              top: "30%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              left: "20%",
              top: "60%",
              background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Floating food emojis */}
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl select-none pointer-events-none"
            style={{ left: item.x, top: item.y, opacity: 0.2 }}
            animate={{ y: [0, -22, 0], rotate: [0, 8, -8, 0] }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full"
              style={{
                background: "rgba(249,115,22,0.12)",
                border: "1px solid rgba(249,115,22,0.4)",
                color: "#fb923c",
              }}
            >
              ✨ Mutfağınızı Planlayın, Hayatınızı Kolaylaştırın
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-semibold mb-6 leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            <span className="text-gray-800">Gurme </span>
            <span className="shimmer-text">Planı</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ color: "#6b7280" }}
          >
            Haftanızı lezzetli tariflerle planlayın, alışveriş listelerinizi otomatik oluşturun,
            mutfağınızı bir{" "}
            <span className="text-orange-400 font-medium">gurme mutfağına</span> dönüştürün.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setModalOpen(true)}
              className="relative flex items-center justify-center text-white text-[17px] font-medium tracking-wide px-10 py-4 sm:py-5 rounded-full overflow-hidden w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                boxShadow: "0 8px 24px rgba(249,115,22,0.25), 0 0 0 0 rgba(249,115,22,0.1)",
              }}
            >
              <span className="relative z-10">🚀 Planlamaya Başla</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, borderColor: "rgba(249,115,22,0.6)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center text-orange-500 text-[17px] font-medium tracking-wide px-10 py-4 sm:py-5 rounded-full transition-all duration-300 w-full sm:w-auto"
              style={{
                border: "1px solid rgba(249,115,22,0.3)",
                background: "rgba(249,115,22,0.03)",
              }}
            >
              Nasıl Çalışır? →
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto w-full"
          >
            {[
              { value: "500+", label: "Tarif" },
              { value: "50K+", label: "Mutlu Kullanıcı" },
              { value: "7 Gün", label: "Plan Desteği" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-5 md:p-6 rounded-[2rem]"
                style={{
                  background: "rgba(249,115,22,0.03)",
                  border: "1px solid rgba(249,115,22,0.08)",
                }}
              >
                <div className="text-2xl font-semibold text-orange-400">{stat.value}</div>
                <div className="text-gray-500 text-[13px] font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
        />
      </section>
    </>
  );
}
