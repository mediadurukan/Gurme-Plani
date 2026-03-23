"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuoteSlider from "./components/QuoteSlider";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import ChefTipsSection from "./components/ChefTipsSection";
import RemindersSection from "./components/RemindersSection";
import PlanModal from "./components/PlanModal";
import MealPlanView from "./components/MealPlanView";
import { MealPlan } from "./lib/types";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<MealPlan | null>(null);

  return (
    <main className="min-h-screen w-full" style={{ background: "var(--bg)" }}>
      <PlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPlanReady={(p) => { setPlan(p); setModalOpen(false); }}
      />
      <AnimatePresence>
        {plan && <MealPlanView plan={plan} onClose={() => setPlan(null)} />}
      </AnimatePresence>

      <Navbar onStartClick={() => setModalOpen(true)} />
      <HeroSection onStartClick={() => setModalOpen(true)} />
      <QuoteSlider />
      <HowItWorksSection />
      <FeaturesSection />
      <ChefTipsSection />
      <RemindersSection />

      {/* CTA */}
      <section className="py-28 px-6 text-center relative overflow-hidden w-full flex flex-col items-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(200,83,15,0.07) 0%, transparent 65%)" }}
        />
        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 w-1/3 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(200,83,15,0.15))" }} />
          <div className="absolute top-1/2 right-0 w-1/3 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(200,83,15,0.15))" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="badge mb-6 inline-block">Hemen Başlayın</span>
          <h2
            className="mb-5"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--text-dark)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Mutfak Maceranıza{" "}
            <span className="shimmer-text">Başlayın</span>
          </h2>
          <div className="section-divider" />
          <p
            className="mb-10 mt-5"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-mid)",
              fontSize: "1.0625rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Ücretsiz kaydolun, haftanızı planlayın, lezzetin tadını çıkarın.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
            className="btn-primary inline-flex items-center justify-center text-white rounded-full mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 600,
              padding: "18px 52px",
              letterSpacing: "0.01em",
            }}
          >
            Planlamaya Başla — Ücretsiz
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 text-center w-full"
        style={{
          borderTop: "1px solid rgba(200,83,15,0.1)",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--text-soft)",
        }}
      >
        <span>© 2026 Gurme Planı</span>
        <span className="mx-3" style={{ opacity: 0.3 }}>·</span>
        <span>Tüm hakları saklıdır</span>
        <span className="ml-2">🍊</span>
      </footer>
    </main>
  );
}
