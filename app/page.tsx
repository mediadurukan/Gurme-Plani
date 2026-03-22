import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuoteSlider from "./components/QuoteSlider";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0a0a" }}>
      <Navbar />
      <HeroSection />

      {/* Quote Slider Section */}
      <section
        className="py-8 relative"
        style={{
          background:
            "linear-gradient(to bottom, #0a0a0a, rgba(249,115,22,0.05), #0a0a0a)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center px-6 mb-4">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Ustalar Ne Diyor?
          </p>
        </div>
        <QuoteSlider />
      </section>

      <FeaturesSection />

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249,115,22,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
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
          <p className="text-gray-400 text-xl mb-10">
            Ücretsiz kaydolun, haftanızı planlayın, lezzetin tadını çıkarın.
          </p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold px-14 py-5 rounded-full transition-all duration-300"
            style={{ boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}
          >
            Hemen Başla — Ücretsiz
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-8 text-center text-gray-600 text-sm"
        style={{ borderColor: "rgba(249,115,22,0.1)" }}
      >
        © 2026 Gurme Planı · Tüm hakları saklıdır 🍊
      </footer>
    </main>
  );
}
