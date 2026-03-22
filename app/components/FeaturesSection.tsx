"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📅",
    title: "Haftalık Yemek Planı",
    desc: "7 günlük yemek planınızı dakikalar içinde oluşturun. Öğün bazında özelleştirin.",
  },
  {
    icon: "🛒",
    title: "Akıllı Alışveriş Listesi",
    desc: "Tariflere göre otomatik alışveriş listesi. Markete gitmeyi kolaylaştırın.",
  },
  {
    icon: "🍽️",
    title: "Binlerce Tarif",
    desc: "Türk ve dünya mutfağından yüzlerce tarif. Filtreleyin, keşfedin, pişirin.",
  },
  {
    icon: "📊",
    title: "Kalori & Besin Takibi",
    desc: "Her öğünün besin değerlerini görün. Sağlıklı beslenmeyi kolaylaştırın.",
  },
  {
    icon: "👨‍🍳",
    title: "Şef Tavsiyeleri",
    desc: "Uzman şeflerden ipuçları ve püf noktaları. Yemeklerinizi bir üst seviyeye taşıyın.",
  },
  {
    icon: "🔔",
    title: "Akıllı Hatırlatıcılar",
    desc: "Öğün saatlerinizde bildirim alın. Planınıza sadık kalın.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Neden{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gurme Planı?
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
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
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(249,115,22,0.15)" }}
              className="rounded-2xl p-6 border transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(249,115,22,0.15)",
              }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
