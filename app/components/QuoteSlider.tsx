"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    text: "Yemek pişirmek bir sanat, yemek yemek bir zevktir.",
    author: "Julia Child",
    role: "Ünlü Şef & Yazar",
  },
  {
    text: "İyi yemek, iyi yaşamın temelidir.",
    author: "Auguste Escoffier",
    role: "Modern Mutfağın Babası",
  },
  {
    text: "Bir tarif yoktur, sadece malzemeler vardır; sihir ise aşçının elindedir.",
    author: "Ferran Adrià",
    role: "El Bulli, İspanya",
  },
  {
    text: "Mutfak, sevginin dile geldiği yerdir.",
    author: "Paul Bocuse",
    role: "Fransız Mutfağının Ustası",
  },
  {
    text: "Yemek sadece karını doyurmaz; ruhunu da besler.",
    author: "Massimo Bottura",
    role: "Osteria Francescana",
  },
  {
    text: "En iyi malzeme, en iyi tarif değildir; en iyi his, en iyi yemektir.",
    author: "Gordon Ramsay",
    role: "Michelin Yıldızlı Şef",
  },
];

export default function QuoteSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto py-16 px-6">
      <div className="relative min-h-56 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute text-center"
          >
            <div className="text-4xl text-orange-500 mb-4">&ldquo;</div>
            <p className="text-xl md:text-2xl text-gray-200 italic leading-relaxed mb-6">
              {quotes[current].text}
            </p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-orange-400 font-semibold text-lg">
                — {quotes[current].author}
              </span>
              <span className="text-gray-500 text-sm">{quotes[current].role}</span>
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
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-orange-500 w-6" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
