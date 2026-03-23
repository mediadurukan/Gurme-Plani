"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  { text: "Yemek pişirmek bir sanat, yemek yemek bir zevktir.", author: "Julia Child",       role: "Ünlü Şef & Yazar",              emoji: "👩‍🍳" },
  { text: "İyi yemek, iyi yaşamın temelidir.",                  author: "Auguste Escoffier", role: "Modern Mutfağın Babası",         emoji: "🎩" },
  { text: "Bir tarif yoktur, sadece malzemeler vardır; sihir ise aşçının elindedir.", author: "Ferran Adrià",   role: "El Bulli, İspanya",   emoji: "🧪" },
  { text: "Mutfak, sevginin dile geldiği yerdir.",              author: "Paul Bocuse",       role: "Fransız Mutfağının Ustası",      emoji: "❤️" },
  { text: "Yemek sadece karını doyurmaz; ruhunu da besler.",   author: "Massimo Bottura",   role: "Osteria Francescana",            emoji: "✨" },
  { text: "En iyi malzeme değil, en iyi his en iyi yemeği yaratır.", author: "Gordon Ramsay", role: "Michelin Yıldızlı Şef",       emoji: "⭐" },
];

export default function QuoteSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % quotes.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-24 w-full flex flex-col items-center"
      style={{
        background: "linear-gradient(to bottom, var(--bg), rgba(200,83,15,0.04), var(--bg))",
        borderTop: "1px solid rgba(200,83,15,0.08)",
        borderBottom: "1px solid rgba(200,83,15,0.08)",
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge">Ustalar Ne Diyor?</span>
        </motion.div>

        {/* Quote */}
        <div className="relative min-h-52 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute text-center w-full"
            >
              {/* Opening mark */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "5rem",
                  lineHeight: 0.7,
                  color: "rgba(200,83,15,0.15)",
                  marginBottom: 12,
                }}
              >
                "
              </div>
              <p
                className="mb-7 mx-auto"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontStyle: "italic",
                  fontWeight: 500,
                  lineHeight: 1.7,
                  color: "var(--text-dark)",
                  maxWidth: "82%",
                }}
              >
                {quotes[current].text}
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-8 h-px"
                  style={{ background: "var(--primary)", opacity: 0.4 }}
                />
                <span
                  className="px-4 py-1.5 rounded-full"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "var(--primary)",
                    background: "rgba(200,83,15,0.07)",
                    border: "1px solid rgba(200,83,15,0.15)",
                  }}
                >
                  {quotes[current].author}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.8125rem",
                    color: "var(--text-soft)",
                  }}
                >
                  {quotes[current].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-400"
              style={{
                width: i === current ? 28 : 8,
                background: i === current ? "var(--primary)" : "rgba(200,83,15,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
