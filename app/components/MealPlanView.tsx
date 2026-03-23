"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealPlan, Recipe, DayMeal } from "../lib/types";
import RecipeDetailModal from "./RecipeDetailModal";

interface Props {
  plan: MealPlan;
  onClose: () => void;
}

const MEAL_ICONS = { breakfast: "🌅", lunch: "☀️", dinner: "🌙" }
const MEAL_LABELS = { breakfast: "Kahvaltı", lunch: "Öğle Yemeği", dinner: "Akşam Yemeği" }

const DIFFICULTY_COLOR: Record<string, string> = {
  kolay: "#22c55e",
  orta: "#f97316",
  zor: "#ef4444",
}

function RecipeCard({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left rounded-2xl p-4 w-full transition-all"
      style={{
        background: "rgba(249,115,22,0.03)",
        border: "1px solid rgba(249,115,22,0.12)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(249,115,22,0.4)";
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(249,115,22,0.12)";
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.03)";
      }}
    >
      <div className="text-2xl mb-2">🍽️</div>
      <h4 className="text-gray-800 font-medium text-sm leading-snug mb-2">{recipe.name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {recipe.difficulty && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: `${DIFFICULTY_COLOR[recipe.difficulty]}15`,
              color: DIFFICULTY_COLOR[recipe.difficulty],
            }}
          >
            {recipe.difficulty}
          </span>
        )}
        {recipe.prep_time > 0 && (
          <span className="text-xs text-gray-400">⏱ {recipe.prep_time + (recipe.cook_time ?? 0)}dk</span>
        )}
      </div>
      <p className="text-orange-500 text-xs font-medium mt-2">Tarifi Gör →</p>
    </motion.button>
  );
}

function MealSection({
  icon,
  label,
  mains,
  side,
  onRecipeClick,
}: {
  icon: string;
  label: string;
  mains: Recipe[];
  side: Recipe | null;
  onRecipeClick: (r: Recipe) => void;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="text-gray-700 font-semibold text-base">{label}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mains.map((r) => (
          <RecipeCard key={r.id} recipe={r} onClick={() => onRecipeClick(r)} />
        ))}
        {side && (
          <div className="relative">
            <div
              className="absolute -top-2 left-3 text-xs font-semibold px-2 py-0.5 rounded-full z-10"
              style={{ background: "#fbbf24", color: "#fff" }}
            >
              Yan Yemek
            </div>
            <RecipeCard recipe={side} onClick={() => onRecipeClick(side)} />
          </div>
        )}
      </div>
    </div>
  );
}

function DayView({ day, onRecipeClick }: { day: DayMeal; onRecipeClick: (r: Recipe) => void }) {
  return (
    <div>
      <MealSection
        icon={MEAL_ICONS.breakfast}
        label={MEAL_LABELS.breakfast}
        mains={day.breakfast}
        side={null}
        onRecipeClick={onRecipeClick}
      />
      <MealSection
        icon={MEAL_ICONS.lunch}
        label={MEAL_LABELS.lunch}
        mains={day.lunch.mains}
        side={day.lunch.side}
        onRecipeClick={onRecipeClick}
      />
      <MealSection
        icon={MEAL_ICONS.dinner}
        label={MEAL_LABELS.dinner}
        mains={day.dinner.mains}
        side={day.dinner.side}
        onRecipeClick={onRecipeClick}
      />
    </div>
  );
}

export default function MealPlanView({ plan, onClose }: Props) {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  return (
    <>
      <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] overflow-y-auto"
        style={{ background: "#fff" }}
      >
        {/* Top bar */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(249,115,22,0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🍊</span>
            <div>
              <span className="text-gray-800 font-semibold text-base">
                {plan.type === "weekly" ? "Haftalık" : "Günlük"} Yemek Planı
              </span>
              <span
                className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
              >
                📍 {plan.region}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Day tabs (weekly only) */}
        {plan.type === "weekly" && (
          <div className="flex gap-2 px-6 py-4 overflow-x-auto border-b border-gray-100">
            {plan.days.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeDay === i ? "#f97316" : "rgba(249,115,22,0.06)",
                  color: activeDay === i ? "#fff" : "#9a3412",
                  border: `1px solid ${activeDay === i ? "#f97316" : "rgba(249,115,22,0.15)"}`,
                }}
              >
                {day.dayName}
              </button>
            ))}
          </div>
        )}

        {/* Meals */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <DayView
                day={plan.days[activeDay]}
                onRecipeClick={(r) => setSelectedRecipe(r)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
