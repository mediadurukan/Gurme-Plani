"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "../lib/types";
import { estimateNutrition } from "../lib/nutrition";

interface Props {
  recipe: Recipe | null;
  onClose: () => void;
  onPhotoUploaded?: (recipeId: number, url: string) => void;
}

const DIFFICULTY_LABEL: Record<string, string> = { kolay: "Kolay", orta: "Orta", zor: "Zor" }
const DIFFICULTY_COLOR: Record<string, string> = { kolay: "#22c55e", orta: "#f97316", zor: "#ef4444" }
const REGION_LABEL: Record<string, string> = {
  karadeniz: "Karadeniz", ege: "Ege", marmara: "Marmara",
  "ic-anadolu": "İç Anadolu", akdeniz: "Akdeniz",
  "dogu-anadolu": "Doğu Anadolu", "guneydogu-anadolu": "Güneydoğu Anadolu",
}

export default function RecipeDetailModal({ recipe, onClose, onPhotoUploaded }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const currentImage = imageUrl ?? recipe?.image_url ?? null;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !recipe) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Sadece resim dosyası yükleyebilirsiniz");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Dosya 5MB'dan büyük olamaz");
      return;
    }

    setUploading(true);
    setUploadError(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("recipeId", String(recipe.id));

    try {
      const res = await fetch("/api/upload-photo", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Yükleme başarısız");
      setImageUrl(json.url);
      onPhotoUploaded?.(recipe.id, json.url);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Hata oluştu");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AnimatePresence>
      {recipe && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
              style={{ maxHeight: "90vh", border: "1px solid rgba(249,115,22,0.15)", boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
            >
              {/* Fotoğraf alanı */}
              <div className="relative w-full h-48 bg-orange-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                {currentImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={currentImage} alt={recipe.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl opacity-30">🍽️</span>
                    {!uploading && (
                      <>
                        <button
                          onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all"
                          style={{ background: "rgba(249,115,22,0.1)", color: "#ea580c", border: "1px dashed rgba(249,115,22,0.4)" }}
                        >
                          📷 Fotoğraf Ekle
                        </button>
                        <p className="text-xs text-gray-400">İlk fotoğrafı siz ekleyin!</p>
                      </>
                    )}
                    {uploading && (
                      <div className="flex items-center gap-2 text-sm text-orange-500">
                        <div className="w-4 h-4 border-2 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
                        Yükleniyor...
                      </div>
                    )}
                    {uploadError && <p className="text-xs text-red-500 px-4 text-center">{uploadError}</p>}
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                {/* Kapat butonu */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  style={{ background: "rgba(0,0,0,0.35)", color: "#fff" }}
                >
                  ✕
                </button>
              </div>

              {/* Header */}
              <div className="px-6 pt-4 pb-3 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{recipe.name}</h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{recipe.description}</p>
              </div>

              {/* Nutrition */}
              {(() => {
                const n = estimateNutrition(recipe)
                return (
                  <div className="px-6 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">Tahmini Besin Değerleri (1 porsiyon)</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { label: "Kalori", value: n.calories, unit: "kcal", color: "#f97316" },
                        { label: "Protein", value: n.protein, unit: "g", color: "#3b82f6" },
                        { label: "Karbonhidrat", value: n.carbs, unit: "g", color: "#f59e0b" },
                        { label: "Yağ", value: n.fat, unit: "g", color: "#10b981" },
                      ].map((item) => (
                        <div key={item.label} className="text-center p-2 rounded-xl" style={{ background: `${item.color}08` }}>
                          <div className="font-bold text-base" style={{ color: item.color }}>{item.value}</div>
                          <div className="text-[10px] text-gray-400 font-medium">{item.unit}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Meta */}
              <div className="px-6 py-3 flex gap-3 flex-wrap border-b border-gray-100">
                {recipe.prep_time > 0 && <span className="flex items-center gap-1 text-sm text-gray-500">⏱ {recipe.prep_time + (recipe.cook_time ?? 0)} dk</span>}
                {recipe.servings > 0 && <span className="flex items-center gap-1 text-sm text-gray-500">👥 {recipe.servings} kişilik</span>}
                {recipe.difficulty && (
                  <span className="text-sm font-medium px-2 py-0.5 rounded-full" style={{ background: `${DIFFICULTY_COLOR[recipe.difficulty]}18`, color: DIFFICULTY_COLOR[recipe.difficulty] }}>
                    {DIFFICULTY_LABEL[recipe.difficulty] ?? recipe.difficulty}
                  </span>
                )}
                {recipe.region_name && <span className="text-sm text-orange-500 font-medium">📍 {REGION_LABEL[recipe.region_name] ?? recipe.region_name}</span>}
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                {recipe.ingredients?.length > 0 && (
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2"><span>📋</span> Malzemeler</h3>
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
                {recipe.instructions?.length > 0 && (
                  <div>
                    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2"><span>👨‍🍳</span> Yapılışı</h3>
                    <ol className="space-y-3">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-600">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#f97316" }}>{i + 1}</span>
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
