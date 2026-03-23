"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tip {
  id: number;
  category: string;
  categoryIcon: string;
  tip: string;
  detail: string;
  chef: string;
  chefRole: string;
}

const tips: Tip[] = [
  {
    id: 1,
    category: "Et",
    categoryIcon: "🥩",
    tip: "Eti pişirmeden önce oda sıcaklığına getirin",
    detail: "Buzdolabından çıkardığınız eti en az 30 dakika oda sıcaklığında bekletin. Soğuk et tavaya temas ettiğinde ısı düşer, eşit pişmez ve dış kısmı solar iç kısmı çiğ kalır.",
    chef: "Mehmet Yalçınkaya",
    chefRole: "Türk Mutfağı Ustası",
  },
  {
    id: 2,
    category: "Et",
    categoryIcon: "🥩",
    tip: "Tuz zamanlaması lezzeti belirler",
    detail: "Kırmızı eti pişirmeden hemen önce ya da pişirdikten sonra tuzlayın. Erkenden tuzlarsanız et suyunu bırakır, kurulaşır. İstisna: köfte — önceden yoğrulup dinlendirilmelidir.",
    chef: "Danilo Zanna",
    chefRole: "İtalyan & Türk Füzyon Şefi",
  },
  {
    id: 3,
    category: "Hamur",
    categoryIcon: "🫓",
    tip: "Soğuk tereyağı çıtır börek sırrıdır",
    detail: "Börek ve milföy hamurunda tereyağının soğuk kalması kritiktir. Isınan yağ hamura işler, katmanlar birleşir, çıtırlık kaybolur. Çalışırken hamuru arada buzdolabına koyun.",
    chef: "Ömür Akkor",
    chefRole: "Osmanlı Mutfağı Araştırmacısı",
  },
  {
    id: 4,
    category: "Hamur",
    categoryIcon: "🫓",
    tip: "Mayalı hamuru acele ettirmeyin",
    detail: "Hızlandırmak için fazla maya koymak hamurun dokusunu bozar, ekşi tat bırakır. Az maya + uzun fermantasyon (8-12 saat buzdolabında) çok daha lezzetli sonuç verir.",
    chef: "Aydın Demir",
    chefRole: "Ekmek & Pastacılık Uzmanı",
  },
  {
    id: 5,
    category: "Sebze",
    categoryIcon: "🥦",
    tip: "Sebzeyi az yağda yüksek ısıda kavurun",
    detail: "Sebzeler düşük ateşte pişince buharlaşır ve yumuşar, lezzetini kaybeder. Tavayı iyice kızdırın, az yağ ekleyin, sebzeyi tek seferde döküp karıştırmadan 1-2 dakika tutun. Maillard reaksiyonu lezzet oluşturur.",
    chef: "Somer Sivrioğlu",
    chefRole: "Türk Mutfağı Elçisi",
  },
  {
    id: 6,
    category: "Sebze",
    categoryIcon: "🥦",
    tip: "Zeytinyağlılar soğuk servis edilmeli",
    detail: "Zeytinyağının aroması sıcakta hissedilmez. Zeytinyağlı sebze yemeklerini pişirdikten sonra en az 1 saat bekletip oda sıcaklığında ya da soğuk servis edin. Lezzet katlanır.",
    chef: "Güngör Bocuoğlu",
    chefRole: "Ege Mutfağı Uzmanı",
  },
  {
    id: 7,
    category: "Tatlı",
    categoryIcon: "🍮",
    tip: "Şerbeti soğuk, tatlıyı sıcak dökün",
    detail: "Baklava ve kadayıf gibi şerbetli tatlılarda altın kural: şerbet soğuk, tatlı sıcaksa ya da tam tersi olmalıdır. İkisi de aynı sıcaklıkta olursa şerbet emmez, tatlı yapış yapış olur.",
    chef: "Kadir Gürs",
    chefRole: "Türk Tatlıları Ustası",
  },
  {
    id: 8,
    category: "Tatlı",
    categoryIcon: "🍮",
    tip: "Sütlü tatlılarda nişastayı soğuk sütle açın",
    detail: "Muhallebi, sütlaç gibi tatlılarda nişasta veya unu mutlaka soğuk sütle açın, sonra ateşe koyun. Sıcak sıvıya doğrudan atarsanız topaklanır ve düzeltmek imkansızlaşır.",
    chef: "Refika Birgül",
    chefRole: "Yemek Yazarı & Şef",
  },
  {
    id: 9,
    category: "Çorba",
    categoryIcon: "🍲",
    tip: "Kemik suyu çorbayı uçurur",
    detail: "Çorbalarda hazır su yerine önceden hazırlanmış kemik ya da tavuk suyu kullanın. Kemik suyunun içindeki jelatin ve mineral, çorbaya dolgunluk, derinlik ve doğal koyuluk katar.",
    chef: "Ali Ronay",
    chefRole: "Fine Dining Şefi",
  },
  {
    id: 10,
    category: "Çorba",
    categoryIcon: "🍲",
    tip: "Çorbayı son anda tuzlayın",
    detail: "Pişirme sırasında su buharlaşır ve çorba koyulaşır, tuzluluk artar. Servis etmeden 2 dakika önce tadına bakıp tuzlayın. Bu sayede fazla tuzlu çorba dramalarına son.",
    chef: "Musa Dağdeviren",
    chefRole: "Anadolu Mutfağı Araştırmacısı",
  },
];

const categories = ["Tümü", "Et", "Hamur", "Sebze", "Tatlı", "Çorba"];

export default function ChefTipsSection() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = activeCategory === "Tümü" ? tips : tips.filter((t) => t.category === activeCategory);

  return (
    <section className="py-24 relative w-full px-4 sm:px-8 flex flex-col items-center" style={{ background: "linear-gradient(to bottom, #ffffff, rgba(249,115,22,0.03), #ffffff)" }}>
      <div className="max-w-[1024px] mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase"
            style={{ background: "rgba(200,83,15,0.08)", border: "1px solid rgba(200,83,15,0.25)", color: "var(--primary)" }}
          >
            Uzman İpuçları
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4 tracking-tight">
            Şef{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tavsiyeleri
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Uzman şeflerden püf noktaları — yemeklerinizi bir üst seviyeye taşıyın
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-2 flex-wrap justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setExpandedId(null); }}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: activeCategory === cat ? "#f97316" : "rgba(249,115,22,0.06)",
                color: activeCategory === cat ? "#fff" : "#9a3412",
                border: `1px solid ${activeCategory === cat ? "#f97316" : "rgba(249,115,22,0.15)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Tips Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filtered.map((tip, i) => {
              const isOpen = expandedId === tip.id;
              return (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="rounded-2xl overflow-hidden cursor-pointer select-none"
                  style={{
                    border: `1px solid ${isOpen ? "rgba(249,115,22,0.35)" : "rgba(249,115,22,0.1)"}`,
                    background: isOpen ? "rgba(249,115,22,0.04)" : "#fff",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onClick={() => setExpandedId(isOpen ? null : tip.id)}
                >
                  {/* Card Header */}
                  <div className="flex items-start gap-4 p-5">
                    <div
                      className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: "rgba(249,115,22,0.07)" }}
                    >
                      {tip.categoryIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(249,115,22,0.1)", color: "#ea580c" }}
                        >
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium text-sm leading-snug">{tip.tip}</p>
                    </div>
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-gray-400 transition-transform duration-200"
                      style={{
                        background: "rgba(249,115,22,0.05)",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-5 pb-5"
                          style={{ borderTop: "1px solid rgba(249,115,22,0.1)" }}
                        >
                          <p className="text-gray-600 text-sm leading-relaxed pt-4 mb-4">
                            {tip.detail}
                          </p>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                              style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)" }}
                            >
                              {tip.chef[0]}
                            </div>
                            <div>
                              <p className="text-gray-800 text-xs font-semibold leading-none">{tip.chef}</p>
                              <p className="text-gray-400 text-[11px] mt-0.5">{tip.chefRole}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
