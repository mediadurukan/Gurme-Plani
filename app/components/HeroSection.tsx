"use client";

import { motion } from "framer-motion";

const floatingItems = [
  { emoji: "🥗", delay: 0,   x: "7%",  y: "22%" },
  { emoji: "🍝", delay: 0.8, x: "84%", y: "16%" },
  { emoji: "🥘", delay: 1.4, x: "14%", y: "68%" },
  { emoji: "🍜", delay: 0.4, x: "77%", y: "64%" },
  { emoji: "🥩", delay: 1.8, x: "50%", y: "9%"  },
  { emoji: "🧁", delay: 1.1, x: "90%", y: "42%" },
];

export default function HeroSection({ onStartClick }: { onStartClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{ background: "var(--bg)" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: 700, height: 700,
            left: "50%", top: "35%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(200,83,15,0.28) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            left: "15%", top: "55%",
            background: "radial-gradient(circle, rgba(200,146,42,0.22) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Subtle diagonal rule */}
        <div
          className="absolute"
          style={{
            top: "8%", right: "-5%",
            width: 2, height: "40%",
            background: "linear-gradient(to bottom, transparent, rgba(200,83,15,0.15), transparent)",
            transform: "rotate(15deg)",
          }}
        />
      </div>

      {/* Floating emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl select-none pointer-events-none"
          style={{ left: item.x, top: item.y, opacity: 0.18 }}
          animate={{ y: [0, -20, 0], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="badge">✦ Mutfağınızı Planlayın, Hayatınızı Kolaylaştırın</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--text-dark)",
          }}
          className="mb-6"
        >
          Gurme{" "}
          <span className="shimmer-text">Planı</span>
        </motion.h1>

        {/* Decorative rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="section-divider"
        />

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed mt-6"
          style={{ color: "var(--text-mid)", fontFamily: "var(--font-body)", fontWeight: 300 }}
        >
          Haftanızı lezzetli tariflerle planlayın, alışveriş listelerinizi otomatik oluşturun,
          mutfağınızı bir{" "}
          <span style={{ color: "var(--primary)", fontWeight: 500 }}>gurme mutfağına</span> dönüştürün.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStartClick}
            className="btn-primary flex items-center justify-center text-white rounded-full overflow-hidden w-full sm:w-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              padding: "16px 40px",
            }}
          >
            Planlamaya Başla →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("nasil-calisir")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center rounded-full transition-all duration-300 w-full sm:w-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 500,
              color: "var(--primary)",
              border: "1px solid var(--border-h)",
              background: "rgba(200,83,15,0.03)",
              padding: "16px 40px",
            }}
          >
            Nasıl Çalışır?
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-20 grid grid-cols-3 gap-5 max-w-2xl mx-auto w-full"
        >
          {[
            { value: "500+",  label: "Tarif" },
            { value: "50K+", label: "Mutlu Kullanıcı" },
            { value: "7 Gün", label: "Plan Desteği" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="text-center p-5 md:p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(200,83,15,0.1)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 2px 12px rgba(200,83,15,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--text-soft)",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fade bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
