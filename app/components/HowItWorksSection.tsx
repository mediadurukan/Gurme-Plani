"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: "🗺️",
    title: "Bölge Seçin",
    desc: "Türkiye'nin 7 coğrafi bölgesinden birini seçin. Karadeniz'den Güneydoğu'ya, her bölgenin özgün lezzetleri sizi bekliyor.",
  },
  {
    number: "02",
    icon: "📅",
    title: "Plan Oluşturun",
    desc: "Günlük ya da haftalık plan tercih edin. Yapay zeka destekli sistemimiz öğle ve akşam için ana yemek, yan yemek ve tatlıyı otomatik seçer.",
  },
  {
    number: "03",
    icon: "🍽️",
    title: "Tarifleri Keşfedin",
    desc: "Plana eklenen her yemeğin malzeme listesini, adım adım yapılışını ve tahmini besin değerlerini tek tıkla görün.",
  },
  {
    number: "04",
    icon: "🛒",
    title: "Alışverişe Çıkın",
    desc: "Planınızdaki tüm malzemeler otomatik olarak kategorilere ayrılır. Listeyi takip edin, üzeri çizin, eksik bırakmayın.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="nasil-calisir"
      className="py-28 w-full px-4 sm:px-8 flex flex-col items-center"
      style={{ background: "linear-gradient(to bottom, var(--bg), rgba(200,83,15,0.03), var(--bg))" }}
    >
      <div className="max-w-[1024px] mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="badge">Nasıl Çalışır?</span>
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
            4 Adımda{" "}
            <span className="shimmer-text">Gurme Sofrası</span>
          </h2>
          <div className="section-divider" />
          <p
            className="mt-5"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--text-mid)",
              fontWeight: 300,
              fontSize: "1.0625rem",
              maxWidth: 460,
              margin: "1rem auto 0",
            }}
          >
            Dakikalar içinde kişiselleştirilmiş yemek planınız hazır
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-10 left-0 right-0 hidden lg:block pointer-events-none"
            style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(200,83,15,0.15), rgba(200,83,15,0.15), transparent)" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {/* Number bubble */}
                <div className="relative mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid rgba(200,83,15,0.18)",
                      boxShadow: "0 4px 20px rgba(200,83,15,0.1)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #C8530F, #C8922A)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--text-mid)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
