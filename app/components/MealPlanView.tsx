"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealPlan, Recipe, DayMeal } from "../lib/types";
import RecipeDetailModal from "./RecipeDetailModal";
import ShoppingListPanel from "./ShoppingListPanel";
import { estimateNutrition, sumNutrition } from "../lib/nutrition";

interface Props {
  plan: MealPlan;
  onClose: () => void;
}

const MEAL_ICONS = { lunch: "☀️", dinner: "🌙" }
const MEAL_LABELS = { lunch: "Öğle Yemeği", dinner: "Akşam Yemeği" }

const DIFFICULTY_COLOR: Record<string, string> = {
  kolay: "#22c55e",
  orta: "#f97316",
  zor: "#ef4444",
}

function RecipeCard({ recipe, onClick, index }: { recipe: Recipe; onClick: () => void; index: number }) {
  const n = estimateNutrition(recipe);
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ scale: 1.03, y: -4, boxShadow: "0 16px 40px rgba(249,115,22,0.18)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="text-left rounded-2xl p-4 w-full flex flex-col"
      style={{
        background: "rgba(249,115,22,0.03)",
        border: "1px solid rgba(249,115,22,0.12)",
        transition: "border-color 0.2s, background 0.2s",
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
      <motion.div
        className="text-2xl mb-2"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
      >
        🍽️
      </motion.div>
      <h4 className="text-gray-800 font-medium text-sm leading-snug mb-2">{recipe.name}</h4>
      <div className="flex items-center gap-2 flex-wrap mb-2">
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
      <div className="flex items-center gap-1.5 flex-wrap mt-auto pt-2" style={{ borderTop: "1px solid rgba(249,115,22,0.08)" }}>
        <span className="text-xs font-semibold text-orange-500">{n.calories} kcal</span>
        <span className="text-[10px] text-gray-300">·</span>
        <span className="text-[10px] text-gray-400">P {n.protein}g</span>
        <span className="text-[10px] text-gray-300">·</span>
        <span className="text-[10px] text-gray-400">K {n.carbs}g</span>
        <span className="text-[10px] text-gray-300">·</span>
        <span className="text-[10px] text-gray-400">Y {n.fat}g</span>
      </div>
      <p className="text-orange-500 text-xs font-medium mt-2">Tarifi Gör →</p>
    </motion.button>
  );
}

function TaggedCard({ recipe, label, color, onClick, index }: { recipe: Recipe; label: string; color: string; onClick: () => void; index: number }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.07 + 0.15, duration: 0.3, type: "spring", stiffness: 260 }}
        className="absolute -top-2 left-3 text-xs font-semibold px-2 py-0.5 rounded-full z-10"
        style={{ background: color, color: "#fff" }}
      >
        {label}
      </motion.div>
      <RecipeCard recipe={recipe} onClick={onClick} index={index} />
    </div>
  );
}

function MealSection({
  icon, label, mains, side, dessert, onRecipeClick, sectionIndex,
}: {
  icon: string;
  label: string;
  mains: Recipe[];
  side: Recipe | null;
  dessert: Recipe | null;
  onRecipeClick: (r: Recipe) => void;
  sectionIndex: number;
}) {
  const totalNutrition = sumNutrition([
    ...mains.map(estimateNutrition),
    side ? estimateNutrition(side) : null,
    dessert ? estimateNutrition(dessert) : null,
  ])

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: sectionIndex * 0.15, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: sectionIndex * 0.15 }}
      >
        <motion.span
          className="text-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        >
          {icon}
        </motion.span>
        <h3 className="text-gray-700 font-semibold text-base">{label}</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {mains.map((r, i) => (
          <RecipeCard key={r.id} recipe={r} onClick={() => onRecipeClick(r)} index={i} />
        ))}
        {side && (
          <TaggedCard recipe={side} label="Yan Yemek" color="#fb923c" onClick={() => onRecipeClick(side)} index={mains.length} />
        )}
        {dessert && (
          <TaggedCard recipe={dessert} label="Tatlı" color="#a855f7" onClick={() => onRecipeClick(dessert)} index={mains.length + (side ? 1 : 0)} />
        )}
      </div>

      <motion.div
        className="mt-3 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm"
        style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: sectionIndex * 0.15 + 0.3 }}
      >
        <span className="text-xs text-gray-500 font-medium">Toplam</span>
        <span className="font-bold text-orange-500">{totalNutrition.calories} kcal</span>
        <span className="text-gray-300 text-xs">·</span>
        <span className="text-xs text-gray-500">Protein <span className="font-semibold text-gray-700">{totalNutrition.protein}g</span></span>
        <span className="text-gray-300 text-xs">·</span>
        <span className="text-xs text-gray-500">Karbonhidrat <span className="font-semibold text-gray-700">{totalNutrition.carbs}g</span></span>
        <span className="text-gray-300 text-xs">·</span>
        <span className="text-xs text-gray-500">Yağ <span className="font-semibold text-gray-700">{totalNutrition.fat}g</span></span>
      </motion.div>
    </motion.div>
  );
}

function DayView({ day, onRecipeClick }: { day: DayMeal; onRecipeClick: (r: Recipe) => void }) {
  return (
    <div>
      <MealSection
        icon={MEAL_ICONS.lunch}
        label={MEAL_LABELS.lunch}
        mains={day.lunch.mains}
        side={day.lunch.side}
        dessert={day.lunch.dessert}
        onRecipeClick={onRecipeClick}
        sectionIndex={0}
      />
      <MealSection
        icon={MEAL_ICONS.dinner}
        label={MEAL_LABELS.dinner}
        mains={day.dinner.mains}
        side={day.dinner.side}
        dessert={day.dinner.dessert}
        onRecipeClick={onRecipeClick}
        sectionIndex={1}
      />
    </div>
  );
}

// Floating background emojis like HeroSection
const FLOATERS = [
  { emoji: "🍽️", style: { top: "12%", left: "4%", fontSize: 28, animationDelay: "0s", animationDuration: "6s" } },
  { emoji: "🥗", style: { top: "25%", right: "5%", fontSize: 22, animationDelay: "1.5s", animationDuration: "7s" } },
  { emoji: "🍲", style: { top: "55%", left: "2%", fontSize: 20, animationDelay: "0.8s", animationDuration: "8s" } },
  { emoji: "✨", style: { top: "70%", right: "3%", fontSize: 18, animationDelay: "2s", animationDuration: "5.5s" } },
  { emoji: "🧄", style: { top: "85%", left: "6%", fontSize: 16, animationDelay: "1s", animationDuration: "9s" } },
]

export default function MealPlanView({ plan, onClose }: Props) {
  const [activeDay, setActiveDay] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingOpen, setShoppingOpen] = useState(false);

  return (
    <>
      <RecipeDetailModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      <AnimatePresence>
        {shoppingOpen && <ShoppingListPanel plan={plan} onClose={() => setShoppingOpen(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-0 z-[60] overflow-y-auto"
        style={{ background: "#fff" }}
      >
        {/* Subtle radial glow background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 20% 30%, rgba(249,115,22,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(251,191,36,0.04) 0%, transparent 50%)",
            zIndex: 0,
          }}
        />

        {/* Floating emojis */}
        {FLOATERS.map((f, i) => (
          <div
            key={i}
            className="fixed pointer-events-none select-none opacity-20"
            style={{ ...f.style, animation: `float ${f.style.animationDuration} ease-in-out infinite`, animationDelay: f.style.animationDelay, zIndex: 1 }}
          >
            {f.emoji}
          </div>
        ))}

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(14px)",
            borderBottom: "1px solid rgba(249,115,22,0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="text-xl"
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
            >
              🍊
            </motion.span>
            <div>
              <span className="text-gray-800 font-semibold text-base">
                {plan.type === "weekly" ? "Haftalık" : "Günlük"} Yemek Planı
              </span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
              >
                📍 {plan.region}
              </motion.span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShoppingOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.2)",
                color: "#ea580c",
              }}
            >
              <span>🛒</span>
              <span className="hidden sm:inline">Alışveriş Listesi</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg"
            >
              ✕
            </motion.button>
          </div>
        </motion.div>

        {/* Day tabs (weekly only) */}
        {plan.type === "weekly" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-2 px-6 py-4 overflow-x-auto border-b border-gray-100"
          >
            {plan.days.map((day, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveDay(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeDay === i ? "#f97316" : "rgba(249,115,22,0.06)",
                  color: activeDay === i ? "#fff" : "#9a3412",
                  border: `1px solid ${activeDay === i ? "#f97316" : "rgba(249,115,22,0.15)"}`,
                }}
              >
                {day.dayName}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Meals */}
        <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
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
