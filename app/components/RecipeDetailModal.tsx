"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "../lib/types";

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
}

const DIFFICULTY_LABEL: Record<string, string> = {
  kolay: "Kolay",
  orta: "Orta",
  zor: "Zor",
}

const DIFFICULTY_COLOR: Record<string, string> = {
  kolay: "#22c55e",
  orta: "#f97316",
  zor: "#ef4444",
}

const REGION_LABEL: Record<string, string> = {
  karadeniz: "Karadeniz",
  ege: "Ege",
  marmara: "Marmara",
  "ic-anadolu": "İç Anadolu",
  akdeniz: "Akdeniz",
  "dogu-anadolu": "Doğu Anadolu",
  "guneydogu-anadolu": "Güneydoğu Anadolu",
}

export default function RecipeDetailModal({ recipe, onClose }: Props) {
  return (
    <AnimatePresence>
      {recipe && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70]"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
          />
          <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
              style={{
                maxHeight: "90vh",
                border: "1px solid rgba(249,115,22,0.15)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{recipe.name}</h2>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{recipe.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Meta info */}
              <div className="px-6 py-3 flex gap-3 flex-wrap border-b border-gray-100">
                {recipe.prep_time > 0 && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <span>⏱</span> {recipe.prep_time + (recipe.cook_time ?? 0)} dk
                  </span>
                )}
                {recipe.servings > 0 && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <span>👥</span> {recipe.servings} kişilik
                  </span>
                )}
                {recipe.difficulty && (
                  <span
                    className="text-sm font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: `${DIFFICULTY_COLOR[recipe.difficulty]}18`,
                      color: DIFFICULTY_COLOR[recipe.difficulty],
                    }}
                  >
                    {DIFFICULTY_LABEL[recipe.difficulty] ?? recipe.difficulty}
                  </span>
                )}
                {recipe.region_name && (
                  <span className="text-sm text-orange-500 font-medium">
                    📍 {REGION_LABEL[recipe.region_name] ?? recipe.region_name}
                  </span>
                )}
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                {/* Ingredients */}
                {recipe.ingredients?.length > 0 && (
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                      <span>📋</span> Malzemeler
                    </h3>
                    <ul className="space-y-1.5">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions */}
                {recipe.instructions?.length > 0 && (
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                      <span>👨‍🍳</span> Yapılışı
                    </h3>
                    <ol className="space-y-3">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: "#f97316" }}
                          >
                            {i + 1}
                          </span>
                          <span className="leading-relaxed pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
