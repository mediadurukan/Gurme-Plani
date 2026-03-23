"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuoteSlider from "./components/QuoteSlider";
import FeaturesSection from "./components/FeaturesSection";
import PlanModal from "./components/PlanModal";
import MealPlanView from "./components/MealPlanView";
import { MealPlan } from "./lib/types";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<MealPlan | null>(null);

  return (
    <main className="min-h-screen w-full" style={{ background: "#ffffff" }}>
      <PlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPlanReady={(p) => { setPlan(p); setModalOpen(false); }}
      />

      <AnimatePresence>
        {plan && (
          <MealPlanView plan={plan} onClose={() => setPlan(null)} />
        )}
      </AnimatePresence>

      <Navbar onStartClick={() => setModalOpen(true)} />
      <HeroSection onStartClick={() => setModalOpen(true)} />

      {/* Quote Slider Section */}
      <section
        className="py-12 relative w-full flex flex-col items-center"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff, rgba(249,115,22,0.05), #ffffff)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-6 mb-6">
          <p className="text-orange-500 text-[14px] font-medium tracking-[0.2em] uppercase">
            Ustalar Ne Diyor?
          </p>
        </div>
        <QuoteSlider />
      </section>

      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden w-full flex flex-col items-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-6 tracking-tight">
            Mutfak Maceranıza{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Başlayın
            </span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl mb-10 font-light">
            Ücretsiz kaydolun, haftanızı planlayın, lezzetin tadını çıkarın.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center mx-auto bg-orange-500 hover:bg-orange-600 text-white text-[17px] font-medium tracking-wide px-10 py-5 rounded-full transition-all duration-300 w-full sm:w-auto gap-2"
            style={{ boxShadow: "0 8px 24px rgba(249,115,22,0.25)" }}
          >
            Hemen Başla — Ücretsiz
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8 text-center text-gray-400 text-sm w-full"
        style={{ borderColor: "rgba(249,115,22,0.15)" }}
      >
        © 2026 Gurme Planı · Tüm hakları saklıdır 🍊
      </footer>
    </main>
  );
}
