"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateMealPlan, REGION_SLUG_MAP } from "../lib/mealPlan";
import { MealPlan } from "../lib/types";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanReady: (plan: MealPlan) => void;
}

const planOptions = [
  { id: "daily", emoji: "☀️", title: "Günlük Plan", desc: "Bugün ne yiyeceğini planla", tag: "Hızlı" },
  { id: "weekly", emoji: "📅", title: "Haftalık Plan", desc: "7 günlük yemek planı oluştur", tag: "Popüler" },
];

const cuisineOptions = [
  { id: "turk", emoji: "🍳", title: "Türk Mutfağı", desc: "Geleneksel Türk lezzetleri", tag: "Yöresel" },
  { id: "dunya", emoji: "🌍", title: "Dünya Mutfağı", desc: "Farklı kültürlerden tarifler", tag: "Global" },
];

const regionOptions = ["Marmara", "Ege", "Akdeniz", "İç Anadolu", "Karadeniz", "Doğu Anadolu", "Güneydoğu Anadolu"];
const continentOptions = ["Avrupa", "Asya", "Amerika", "Afrika"];

export default function PlanModal({ isOpen, onClose, onPlanReady }: PlanModalProps) {
  const [step, setStep] = useState(1);
  const [planType, setPlanType] = useState<"daily" | "weekly">("daily");
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => { setStep(1); setCuisine(null); setError(null); }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  async function handleRegionSelect(regionLabel: string) {
    setStep(4);
    setError(null);

    const slug = REGION_SLUG_MAP[regionLabel] ?? "all";
    const regionParam = slug !== "all" ? `?region=${slug}` : "";

    try {
      const res = await fetch(`/api/recipes${regionParam}`);
      if (!res.ok) throw new Error(`API hatası: ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);

      let recipes = json.recipes ?? [];

      // Yeterli tarif yoksa tüm bölgelerden getir
      if (recipes.length < 20) {
        const fallback = await fetch('/api/recipes');
        const fallbackJson = await fallback.json();
        recipes = fallbackJson.recipes ?? [];
      }

      if (!recipes.length) throw new Error("Tarif bulunamadı");

      const plan = generateMealPlan(recipes, planType, regionLabel);
      onPlanReady(plan);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setStep(3);
    }
  }

  async function handleAllRegions() {
    await handleRegionSelect("Tüm Bölgeler");
  }

  const currentHeader =
    step === 1 ? { icon: "🍽️", title: "Plan Türünü Seç", desc: "Ne kadar süreliğine planlamak istersin?" } :
    step === 2 ? { icon: "🥘", title: "Mutfak Seçimi", desc: "Hangi lezzetleri keşfetmek istersin?" } :
    step === 3 && cuisine === "turk" ? { icon: "🇹🇷", title: "Bölge Seçimi", desc: "Hangi yörenin tatlarını istersin?" } :
    step === 3 && cuisine === "dunya" ? { icon: "🌎", title: "Kıta Seçimi", desc: "Hangi kıtanın tatlarını istersin?" } :
    { icon: "⏳", title: "Hazırlanıyor...", desc: "Planın oluşturuluyor" };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={step !== 4 ? onClose : undefined}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={step !== 4 ? onClose : undefined}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-8 w-full max-w-md flex flex-col"
              style={{
                background: "linear-gradient(145deg, #ffffff, #fafafa)",
                border: "1px solid rgba(249,115,22,0.15)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  key={currentHeader.icon}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl mb-3"
                >
                  {currentHeader.icon}
                </motion.div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-1">{currentHeader.title}</h2>
                <p className="text-gray-500 text-[15px] font-light">{currentHeader.desc}</p>
                {error && (
                  <p className="text-red-500 text-sm mt-2 bg-red-50 px-3 py-2 rounded-xl">{error}</p>
                )}
              </div>

              {/* Content */}
              <div className="relative min-h-[220px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-3">
                      {planOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setPlanType(opt.id as "daily" | "weekly"); setStep(2); }}
                          className="w-full text-left rounded-2xl p-4 transition-all hover:scale-[1.02] hover:bg-orange-50 border border-orange-500/10 hover:border-orange-500/30 bg-orange-500/[0.02]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-orange-500/10">{opt.emoji}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-800 font-medium text-base">{opt.title}</span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500">{opt.tag}</span>
                              </div>
                              <div className="text-gray-500 text-sm font-light mt-0.5">{opt.desc}</div>
                            </div>
                            <span className="text-orange-400 font-bold opacity-70">→</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-3">
                      {cuisineOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setCuisine(opt.id); setStep(3); }}
                          className="w-full text-left rounded-2xl p-4 transition-all hover:scale-[1.02] hover:bg-orange-50 border border-orange-500/10 hover:border-orange-500/30 bg-orange-500/[0.02]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-orange-500/10">{opt.emoji}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-800 font-medium text-base">{opt.title}</span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500">{opt.tag}</span>
                              </div>
                              <div className="text-gray-500 text-sm font-light mt-0.5">{opt.desc}</div>
                            </div>
                            <span className="text-orange-400 font-bold opacity-70">→</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-2">
                        {(cuisine === "turk" ? regionOptions : continentOptions).map((item) => (
                          <button
                            key={item}
                            onClick={() => handleRegionSelect(item)}
                            className="bg-orange-500/[0.02] hover:bg-orange-50 border border-orange-500/10 hover:border-orange-500/30 text-gray-700 font-medium p-3 rounded-xl transition-all hover:scale-[1.02] text-[15px]"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={handleAllRegions}
                        className="mt-1 w-full p-3 rounded-xl text-orange-500 font-medium border border-dashed border-orange-500/30 hover:bg-orange-50/50 transition-colors"
                      >
                        Tümü (Fark Etmez)
                      </button>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full pt-6">
                      <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4" />
                      <p className="text-gray-500 font-medium text-center text-sm">
                        Supabase&apos;den tarifler çekiliyor ve planın hazırlanıyor...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {step < 4 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                    className="text-gray-400 hover:text-gray-600 text-[15px] font-medium transition-colors px-4 py-2"
                  >
                    {step > 1 ? "← Geri" : "İptal"}
                  </button>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`h-1.5 rounded-full transition-all duration-300 ${step === dot ? "w-4 bg-orange-500" : step > dot ? "w-2 bg-orange-300" : "w-1.5 bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
