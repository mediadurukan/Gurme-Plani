"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "📅", title: "Haftalık Yemek Planı", desc: "7 günlük yemek planınızı dakikalar içinde oluşturun. Öğün bazında özelleştirin.", color: "#f97316" },
  { icon: "🛒", title: "Akıllı Alışveriş Listesi", desc: "Tariflere göre otomatik alışveriş listesi. Markete gitmeyi kolaylaştırın.", color: "#fb923c" },
  { icon: "🍽️", title: "Binlerce Tarif", desc: "Türk ve dünya mutfağından yüzlerce tarif. Filtreleyin, keşfedin, pişirin.", color: "#fbbf24" },
  { icon: "📊", title: "Kalori & Besin Takibi", desc: "Her öğünün besin değerlerini görün. Sağlıklı beslenmeyi kolaylaştırın.", color: "#f97316" },
  { icon: "👨‍🍳", title: "Şef Tavsiyeleri", desc: "Uzman şeflerden ipuçları ve püf noktaları. Yemeklerinizi bir üst seviyeye taşıyın.", color: "#fb923c" },
  { icon: "🔔", title: "Akıllı Hatırlatıcılar", desc: "Öğün saatlerinizde bildirim alın. Planınıza sadık kalın.", color: "#fbbf24" },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative w-full">
      <div className="flex flex-col items-center px-6">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase"
            style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "#fb923c" }}
          >
            Özellikler
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Neden{" "}
            <span className="shimmer-text">Gurme Planı?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
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
              className="card-hover rounded-2xl p-6 cursor-default"
              style={{
                background: "rgba(249,115,22,0.04)",
                border: "1px solid rgba(249,115,22,0.12)",
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5"
                style={{ background: `rgba(249,115,22,0.1)`, border: `1px solid rgba(249,115,22,0.2)` }}
              >
                {f.icon}
              </div>
              <h3 className="text-gray-800 font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
