"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MealPlan } from "../lib/types";
import { buildShoppingList, ShoppingItem } from "../lib/shoppingList";

interface Props {
  plan: MealPlan;
  onClose: () => void;
}

export default function ShoppingListPanel({ plan, onClose }: Props) {
  const initial = useMemo(() => buildShoppingList(plan), [plan]);
  const [items, setItems] = useState<ShoppingItem[]>(initial);

  const toggle = (id: string) =>
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, checked: !it.checked } : it));

  const uncheckAll = () => setItems((prev) => prev.map((it) => ({ ...it, checked: false })));

  // Group by category
  const groups = useMemo(() => {
    const map = new Map<string, ShoppingItem[]>();
    for (const item of items) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    }
    return Array.from(map.entries());
  }, [items]);

  const checkedCount = items.filter((i) => i.checked).length;
  const total = items.length;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[75]"
        style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed top-0 right-0 h-full z-[76] flex flex-col"
        style={{
          width: "min(420px, 100vw)",
          background: "#fff",
          borderLeft: "1px solid rgba(249,115,22,0.12)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(249,115,22,0.1)" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-gray-800 font-semibold text-lg">Alışveriş Listesi</h2>
            </div>
            <p className="text-gray-400 text-xs mt-0.5 ml-7">
              {total} malzeme · {checkedCount} sepette
            </p>
          </div>
          <div className="flex items-center gap-2">
            {checkedCount > 0 && (
              <button
                onClick={uncheckAll}
                className="text-xs text-orange-400 hover:text-orange-600 transition-colors font-medium"
              >
                Sıfırla
              </button>
            )}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3" style={{ borderBottom: "1px solid rgba(249,115,22,0.07)" }}>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>İlerleme</span>
            <span className="font-medium text-orange-500">{total > 0 ? Math.round((checkedCount / total) * 100) : 0}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(249,115,22,0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #f97316, #fbbf24)" }}
              animate={{ width: `${total > 0 ? (checkedCount / total) * 100 : 0}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {groups.map(([category, catItems], gi) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.05, duration: 0.3 }}
            >
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{category}</p>
              <div className="space-y-1">
                {catItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{
                      background: item.checked ? "rgba(249,115,22,0.04)" : "transparent",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: item.checked ? "#f97316" : "rgba(0,0,0,0.15)",
                        background: item.checked ? "#f97316" : "transparent",
                      }}
                    >
                      <AnimatePresence>
                        {item.checked && (
                          <motion.svg
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            width="10" height="10" viewBox="0 0 10 10" fill="none"
                          >
                            <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </div>
                    <span
                      className="text-sm transition-all duration-200"
                      style={{
                        color: item.checked ? "#d1d5db" : "#374151",
                        textDecoration: item.checked ? "line-through" : "none",
                      }}
                    >
                      {item.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-sm">Malzeme bulunamadı</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {checkedCount === total && total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-4 text-center"
            style={{ borderTop: "1px solid rgba(249,115,22,0.1)" }}
          >
            <p className="text-orange-500 font-medium text-sm">🎉 Tüm malzemeleri aldınız!</p>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
