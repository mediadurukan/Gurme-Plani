"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { text: "Yemek pişirmek bir sanat, yemek yemek bir zevktir.", author: "Julia Child", role: "Ünlü Şef & Yazar", emoji: "👩‍🍳" },
  { text: "İyi yemek, iyi yaşamın temelidir.", author: "Auguste Escoffier", role: "Modern Mutfağın Babası", emoji: "🎩" },
  { text: "Bir tarif yoktur, sadece malzemeler vardır; sihir ise aşçının elindedir.", author: "Ferran Adrià", role: "El Bulli, İspanya", emoji: "🧪" },
  { text: "Mutfak, sevginin dile geldiği yerdir.", author: "Paul Bocuse", role: "Fransız Mutfağının Ustası", emoji: "❤️" },
  { text: "Yemek sadece karını doyurmaz; ruhunu da besler.", author: "Massimo Bottura", role: "Osteria Francescana", emoji: "✨" },
  { text: "En iyi malzeme değil, en iyi his en iyi yemeği yaratır.", author: "Gordon Ramsay", role: "Michelin Yıldızlı Şef", emoji: "⭐" },
];

export default function QuoteSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % quotes.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-6">
      <div className="relative min-h-56 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.97 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute text-center w-full"
          >
            <div className="text-5xl mb-5">{quotes[current].emoji}</div>
            <p
              className="text-xl md:text-2xl italic leading-relaxed mb-6 font-medium"
              style={{ color: "#374151" }}
            >
              &ldquo;{quotes[current].text}&rdquo;
            </p>
            <div className="flex flex-col items-center gap-1">
              <span
                className="font-bold text-lg px-4 py-1 rounded-full"
                style={{
                  background: "rgba(249,115,22,0.12)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  color: "#fb923c",
                }}
              >
                — {quotes[current].author}
              </span>
              <span className="text-gray-600 text-sm mt-1">{quotes[current].role}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-2 rounded-full transition-all duration-400"
            style={{
              width: i === current ? 28 : 8,
              background: i === current ? "#f97316" : "rgba(249,115,22,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
