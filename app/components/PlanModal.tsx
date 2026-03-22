"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanModal({ isOpen, onClose }: PlanModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-8 max-w-md w-full"
              style={{
                background: "rgba(18,18,18,0.95)",
                border: "1px solid rgba(249,115,22,0.25)",
                boxShadow: "0 0 80px rgba(249,115,22,0.15)",
              }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">🍽️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Plan Türü Seç</h2>
                <p className="text-gray-500 text-sm">Nasıl planlamak istersin?</p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-2xl p-5 text-left transition-all duration-200"
                  style={{
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.3)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: "rgba(249,115,22,0.15)" }}
                    >
                      ☀️
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">Günlük Plan</div>
                      <div className="text-gray-500 text-sm mt-0.5">
                        Bugün ne yiyeceğini planla
                      </div>
                    </div>
                    <div className="ml-auto text-orange-500 text-xl">→</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full rounded-2xl p-5 text-left transition-all duration-200"
                  style={{
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.3)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: "rgba(249,115,22,0.15)" }}
                    >
                      📅
                    </div>
                    <div>
                      <div className="text-white font-semibold text-lg">Haftalık Plan</div>
                      <div className="text-gray-500 text-sm mt-0.5">
                        7 günlük yemek planı oluştur
                      </div>
                    </div>
                    <div className="ml-auto text-orange-500 text-xl">→</div>
                  </div>
                </motion.button>
              </div>

              {/* Cancel */}
              <button
                onClick={onClose}
                className="w-full mt-5 text-gray-600 hover:text-gray-400 text-sm transition-colors py-2"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
