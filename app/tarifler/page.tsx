"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Recipe } from "../lib/types";
import RecipeDetailModal from "../components/RecipeDetailModal";

const REGIONS = [
  { label: "Tüm Bölgeler", value: "all" },
  { label: "Marmara",             value: "marmara" },
  { label: "Ege",                 value: "ege" },
  { label: "Akdeniz",             value: "akdeniz" },
  { label: "İç Anadolu",          value: "ic-anadolu" },
  { label: "Karadeniz",           value: "karadeniz" },
  { label: "Doğu Anadolu",        value: "dogu-anadolu" },
  { label: "Güneydoğu Anadolu",   value: "guneydogu-anadolu" },
];

const DIFFICULTIES = [
  { label: "Tüm Zorluklar", value: "all" },
  { label: "Kolay",  value: "kolay" },
  { label: "Orta",   value: "orta" },
  { label: "Zor",    value: "zor" },
];

const DIFF_COLOR: Record<string, string> = {
  kolay: "#22c55e",
  orta:  "#C8922A",
  zor:   "#ef4444",
};

const REGION_LABEL: Record<string, string> = {
  marmara:             "Marmara",
  ege:                 "Ege",
  akdeniz:             "Akdeniz",
  "ic-anadolu":        "İç Anadolu",
  karadeniz:           "Karadeniz",
  "dogu-anadolu":      "Doğu Anadolu",
  "guneydogu-anadolu": "Güneydoğu Anadolu",
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function TariflerPage() {
  const [query,      setQuery]      = useState("");
  const [region,     setRegion]     = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [recipes,    setRecipes]    = useState<Recipe[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [selected,   setSelected]   = useState<Recipe | null>(null);
  const [total,      setTotal]      = useState(0);

  const debouncedQuery = useDebounce(query, 320);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (region     !== "all") params.set("region",     region);
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (debouncedQuery.trim()) params.set("search", debouncedQuery.trim());
    try {
      const res  = await fetch(`/api/recipes?${params}`);
      const data = await res.json();
      setRecipes(data.recipes ?? []);
      setTotal(data.recipes?.length ?? 0);
    } finally {
      setLoading(false);
    }
  }, [region, difficulty, debouncedQuery]);

  useEffect(() => { fetchRecipes(); }, [fetchRecipes]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <RecipeDetailModal recipe={selected} onClose={() => setSelected(null)} />

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 px-6 py-4 flex items-center gap-4"
        style={{
          background: "rgba(253,250,246,0.92)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(200,83,15,0.1)",
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-dark)", textDecoration: "none" }}
        >
          <span>🍊</span>
          <span>Gurme <span className="shimmer-text">Planı</span></span>
        </Link>
        <div className="w-px h-5 flex-shrink-0" style={{ background: "rgba(200,83,15,0.2)" }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-soft)" }}>Tarif Ara</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        {/* Hero search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text-dark)",
              letterSpacing: "-0.03em",
            }}
          >
            Ne pişirmek{" "}
            <span className="shimmer-text">istersiniz?</span>
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontWeight: 300, fontSize: "1.0625rem" }}>
            {total > 0 ? `${total} tarif bulundu` : "Tarif arayın veya filtreleyin"}
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-2xl mx-auto mb-8"
        >
          <div
            className="absolute left-5 top-1/2 -translate-y-1/2 text-xl pointer-events-none"
            style={{ color: "var(--text-soft)" }}
          >
            🔍
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tarif adı yazın… (örn. kebap, mantı, baklava)"
            className="w-full rounded-2xl py-4 pl-14 pr-5 outline-none"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--text-dark)",
              background: "var(--bg-card)",
              border: "1px solid rgba(200,83,15,0.2)",
              boxShadow: "0 4px 20px rgba(200,83,15,0.07)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,83,15,0.5)";
              e.currentTarget.style.boxShadow   = "0 4px 24px rgba(200,83,15,0.14)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(200,83,15,0.2)";
              e.currentTarget.style.boxShadow   = "0 4px 20px rgba(200,83,15,0.07)";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ color: "var(--text-soft)", background: "rgba(200,83,15,0.07)" }}
            >
              ✕
            </button>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {/* Region */}
          <div className="flex gap-1.5 flex-wrap justify-center">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: region === r.value ? "var(--primary)" : "rgba(200,83,15,0.05)",
                  color:      region === r.value ? "#fff"           : "var(--text-mid)",
                  border:     `1px solid ${region === r.value ? "var(--primary)" : "rgba(200,83,15,0.15)"}`,
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="w-px" style={{ background: "rgba(200,83,15,0.15)", alignSelf: "stretch" }} />

          {/* Difficulty */}
          <div className="flex gap-1.5">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: difficulty === d.value ? "var(--primary)" : "rgba(200,83,15,0.05)",
                  color:      difficulty === d.value ? "#fff"           : "var(--text-mid)",
                  border:     `1px solid ${difficulty === d.value ? "var(--primary)" : "rgba(200,83,15,0.15)"}`,
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-9 h-9 rounded-full border-2"
              style={{ borderColor: "rgba(200,83,15,0.15)", borderTopColor: "var(--primary)" }}
            />
          </div>
        )}

        {/* Empty */}
        {!loading && recipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-5xl mb-4">🍽️</div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--text-mid)" }}>
              Tarif bulunamadı
            </p>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--text-soft)", fontSize: "0.9rem", marginTop: 8 }}>
              Farklı bir arama terimi veya filtre deneyin
            </p>
          </motion.div>
        )}

        {/* Grid */}
        {!loading && recipes.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {recipes.map((recipe, i) => (
                <motion.button
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                  whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(200,83,15,0.14)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(recipe)}
                  className="text-left rounded-2xl p-5 flex flex-col transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(200,83,15,0.08)",
                    boxShadow: "0 2px 10px rgba(200,83,15,0.05)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,83,15,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(200,83,15,0.08)")}
                >
                  {/* Emoji placeholder */}
                  <div
                    className="w-full rounded-xl flex items-center justify-center text-4xl mb-4"
                    style={{
                      height: 100,
                      background: "rgba(200,83,15,0.04)",
                      border: "1px solid rgba(200,83,15,0.07)",
                    }}
                  >
                    🍽️
                  </div>

                  {/* Region */}
                  {recipe.region_name && (
                    <span
                      className="mb-2 self-start px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: "var(--primary)",
                        background: "rgba(200,83,15,0.08)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      📍 {REGION_LABEL[recipe.region_name] ?? recipe.region_name}
                    </span>
                  )}

                  {/* Name */}
                  <h3
                    className="mb-2 flex-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--text-dark)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                    }}
                  >
                    {recipe.name}
                  </h3>

                  {/* Description */}
                  {recipe.description && (
                    <p
                      className="mb-3 line-clamp-2"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        color: "var(--text-soft)",
                        lineHeight: 1.55,
                        fontWeight: 300,
                      }}
                    >
                      {recipe.description}
                    </p>
                  )}

                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap mt-auto pt-3" style={{ borderTop: "1px solid rgba(200,83,15,0.07)" }}>
                    {recipe.difficulty && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          fontFamily: "var(--font-body)",
                          background: `${DIFF_COLOR[recipe.difficulty]}12`,
                          color: DIFF_COLOR[recipe.difficulty],
                        }}
                      >
                        {recipe.difficulty}
                      </span>
                    )}
                    {recipe.prep_time > 0 && (
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-soft)" }}>
                        ⏱ {recipe.prep_time + (recipe.cook_time ?? 0)}dk
                      </span>
                    )}
                    {recipe.servings > 0 && (
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-soft)" }}>
                        👥 {recipe.servings} kişi
                      </span>
                    )}
                    <span
                      className="ml-auto"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, color: "var(--primary)" }}
                    >
                      Tarifi Gör →
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
