"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "📅", title: "Haftalık Yemek Planı",    desc: "7 günlük yemek planınızı dakikalar içinde oluşturun. Öğün bazında özelleştirin.", accent: "#C8530F" },
  { icon: "🛒", title: "Akıllı Alışveriş Listesi", desc: "Tariflere göre otomatik alışveriş listesi. Markete gitmeyi kolaylaştırın.",          accent: "#C8922A" },
  { icon: "🍽️", title: "Binlerce Tarif",           desc: "Türk ve dünya mutfağından yüzlerce tarif. Filtreleyin, keşfedin, pişirin.",          accent: "#C8530F" },
  { icon: "📊", title: "Kalori & Besin Takibi",    desc: "Her öğünün besin değerlerini görün. Sağlıklı beslenmeyi kolaylaştırın.",            accent: "#C8922A" },
  { icon: "👨‍🍳", title: "Şef Tavsiyeleri",          desc: "Uzman şeflerden ipuçları ve püf noktaları. Yemeklerinizi bir üst seviyeye taşıyın.", accent: "#C8530F" },
  { icon: "🔔", title: "Akıllı Hatırlatıcılar",    desc: "Öğün saatlerinizde bildirim alın. Planınıza sadık kalın.",                          accent: "#C8922A" },
];

export default function FeaturesSection() {
  return (
    <section
      className="py-28 relative w-full px-4 sm:px-8 flex flex-col items-center"
      style={{ background: "var(--bg)" }}
    >
      {/* Subtle top border rule */}
      <div className="w-full max-w-[1024px] mx-auto mb-16"
        style={{ borderTop: "1px solid rgba(200,83,15,0.1)" }}
      />

      <div className="max-w-[1024px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="badge">Özellikler</span>
          <h2
            className="mt-5 mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              color: "var(--text-dark)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Neden{" "}
            <span className="shimmer-text">Gurme Planı?</span>
          </h2>
          <div className="section-divider" />
          <p style={{ color: "var(--text-mid)", fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "1.0625rem", maxWidth: 460, margin: "1rem auto 0" }}>
            Mutfak deneyiminizi tamamen değiştirecek özellikler
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover flex flex-col rounded-3xl p-8 cursor-default"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(200,83,15,0.08)",
                boxShadow: "0 2px 12px rgba(200,83,15,0.05)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 flex-shrink-0"
                style={{
                  background: `${f.accent}10`,
                  border: `1px solid ${f.accent}20`,
                }}
              >
                {f.icon}
              </div>
              <h3
                className="mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 600, color: "var(--text-dark)", letterSpacing: "-0.01em" }}
              >
                {f.title}
              </h3>
              <p
                style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "0.9375rem", lineHeight: 1.65, fontWeight: 300 }}
              >
                {f.desc}
              </p>
              <div
                className="mt-auto pt-5"
                style={{ borderTop: `1px solid ${f.accent}12`, marginTop: "auto" }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: f.accent, fontFamily: "var(--font-body)" }}>
                  Keşfet →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
