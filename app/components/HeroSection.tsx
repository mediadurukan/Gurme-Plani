"use client";

import { motion } from "framer-motion";

const floatingItems = ["🥗", "🍝", "🥘", "🍜", "🥩", "🧁"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(249,115,22,0.15) 0%, rgba(10,10,10,0) 70%)",
        }}
      />

      {/* Floating food emojis */}
      {floatingItems.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4"
        >
          <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
            ✨ Mutfağınızı Planlayın, Hayatınızı Kolaylaştırın
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Gurme</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #f97316, #fb923c, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Planı
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Haftanızı lezzetli tariflerle planlayın, alışveriş listelerinizi otomatik oluşturun,
          mutfağınızı bir gurme mutfağına dönüştürün.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(249,115,22,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-10 py-4 rounded-full transition-colors duration-300"
          >
            Ücretsiz Başla 🚀
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border border-orange-500/40 text-orange-400 hover:bg-orange-500/10 text-lg font-medium px-10 py-4 rounded-full transition-all duration-300"
          >
            Nasıl Çalışır?
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Tarif" },
            { value: "50K+", label: "Mutlu Kullanıcı" },
            { value: "7 Gün", label: "Plan Desteği" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
      />
    </section>
  );
}
