"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuoteSlider from "./components/QuoteSlider";
import FeaturesSection from "./components/FeaturesSection";
import PlanModal from "./components/PlanModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen w-full" style={{ background: "#ffffff" }}>
      <PlanModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <HeroSection />

      {/* Quote Slider Section */}
      <section
        className="py-20 relative w-full flex flex-col items-center"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff, rgba(249,115,22,0.05), #ffffff)",
        }}
      >
        <div className="max-w-5xl mx-auto text-center px-6 mb-8">
          <p className="text-orange-500 text-base font-semibold tracking-widest uppercase">
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
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
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
          <p className="text-gray-500 text-xl md:text-2xl mb-12">
            Ücretsiz kaydolun, haftanızı planlayın, lezzetin tadını çıkarın.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center mx-auto bg-orange-500 hover:bg-orange-600 text-white text-2xl font-semibold px-16 py-10 md:px-24 md:py-12 rounded-full transition-all duration-300 w-full sm:w-auto gap-3"
            style={{ boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}
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
