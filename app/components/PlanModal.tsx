"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const options = [
  {
    emoji: "☀️",
    title: "Günlük Plan",
    desc: "Bugün ne yiyeceğini planla",
    tag: "Hızlı & Kolay",
  },
  {
    emoji: "📅",
    title: "Haftalık Plan",
    desc: "7 günlük yemek planı oluştur",
    tag: "Popüler",
  },
];

export default function PlanModal({ isOpen, onClose }: PlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 24 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-8 w-full max-w-sm"
              style={{
                background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
                border: "1px solid rgba(249,115,22,0.3)",
                boxShadow: "0 0 80px rgba(249,115,22,0.15), 0 40px 80px rgba(0,0,0,0.1)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  className="text-5xl mb-3"
                >
                  🍽️
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Plan Türünü Seç</h2>
                <p className="text-gray-500 text-sm">Ne kadar süreliğine planlamak istersin?</p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-2xl p-4 text-left relative overflow-hidden group"
                    style={{
                      background: "rgba(249,115,22,0.06)",
                      border: "1px solid rgba(249,115,22,0.2)",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.12)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(249,115,22,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.06)";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(249,115,22,0.2)";
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ background: "rgba(249,115,22,0.15)" }}
                      >
                        {opt.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 font-bold text-base">{opt.title}</span>
                          <span
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(249,115,22,0.2)", color: "#fb923c" }}
                          >
                            {opt.tag}
                          </span>
                        </div>
                        <div className="text-gray-500 text-sm mt-0.5">{opt.desc}</div>
                      </div>
                      <span className="text-orange-500 text-xl font-bold">→</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={onClose}
                className="w-full mt-5 text-gray-600 hover:text-gray-400 text-sm transition-colors py-2"
              >
                İptal
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
