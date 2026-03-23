"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "500+",  label: "Tarif" },
  { value: "7",     label: "Bölge" },
  { value: "50K+",  label: "Mutlu Kullanıcı" },
  { value: "∞",     label: "İlham" },
];

const team = [
  { emoji: "👩‍🍳", name: "Elif Hanım",   role: "Her gün ne pişirsem dedikten sonra gurme oldu" },
  { emoji: "🧑‍💻", name: "Mehmet Bey",   role: "Yazılımı yazdı, tarifi karısından öğrendi" },
  { emoji: "👴",   name: "Nuri Dede",    role: "Anadolu tariflerini hafızasından döktü" },
  { emoji: "👩",   name: "Zeynep",       role: "\"Misafirim var\" paniğini bitiren tasarımcı" },
];

const funFacts = [
  { icon: "🕐", text: "Her gün Türk kadınları ortalama 2.3 kez 'ne pişirsem' diye düşünüyor. Biz o rakamı 0'a indiriyoruz." },
  { icon: "😤", text: "\"Akşama ne yemek yapalım?\" sorusu, evliliklerde en çok tartışma yaratan konular arasında 3. sırada. Artık değil." },
  { icon: "😱", text: "Misafir gelmeden önceki gece uykusuzluğu — menü panikle doğrudan ilişkili. Biz o geceyi rahat bir uyku gecesine çeviriyoruz." },
  { icon: "📱", text: "500'den fazla özgün Türk tarifi, 7 bölgenin lezzetleri — hepsi parmağınızın ucunda." },
];

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

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
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-soft)" }}>Hakkımızda</span>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden py-28 px-6 flex flex-col items-center text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(200,83,15,0.07) 0%, transparent 65%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="badge mb-6 inline-block">Hikayemiz</span>
          <h1
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "var(--text-dark)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            "Ne pişirsem?" diye{" "}
            <span className="shimmer-text">sormayı bırakın.</span>
          </h1>
          <div className="section-divider" />
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontWeight: 300, maxWidth: 580, margin: "1.5rem auto 0" }}
          >
            Gurme Planı, Türkiye'nin dört bir yanındaki mutfaklardan ilham alarak doğdu.
            Amacımız basit: sabah uyandığınızda ne pişireceğinizi düşünmek zorunda kalmamanız.
          </p>
        </motion.div>
      </section>

      {/* The Big Pains — esprili kısım */}
      <section
        className="py-24 px-6"
        style={{ background: "linear-gradient(to bottom, var(--bg), rgba(200,83,15,0.04), var(--bg))", borderTop: "1px solid rgba(200,83,15,0.08)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="badge">Neden Var Olduk?</span>
            <h2
              className="mt-5 mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                fontWeight: 700,
                color: "var(--text-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Türk mutfağının en büyük{" "}
              <span className="shimmer-text">üç sorusu</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "😩",
                question: "\"Hergün ne pişirsem?\"",
                story: "Sabah 9'da buzdolabının önünde elleri belinde durup, aynı 5 yemeği düşünmek... Haftalarca aynı menü, aynı şikayet, aynı ah çekme.",
                solution: "Artık tek tıkla haftanın tüm menüsü hazır. 500'den fazla tarif arasından bölgene özel seçimler yapılıyor.",
              },
              {
                emoji: "🤔",
                question: "\"Akşama ne yemek yapalım?\"",
                story: "Öğleden sonra 3'te başlayan meşhur soru. Herkes \"ne olursa\" diyor ama hiçbir şey olmak istemiyor. Gerilim tırmanıyor.",
                solution: "Sabahtan planlı, akşam mutlu. Öğünleriniz hazır olduğunda sofra kavgaları da tarihe karışıyor.",
              },
              {
                emoji: "😰",
                question: "\"Yarın misafirim var, ne yapacağım?\"",
                story: "Cumartesi akşamı gelen o mesaj: \"Yarın geliyoruz.\" Ve başlayan panik. Google, WhatsApp grupları, anneye telefon...",
                solution: "Bölgeye göre gösteriş yapacak tarifler, malzeme listesi ve hep adım adım yapılış. Misafir mi? Olsun.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl p-7 flex flex-col gap-4"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(200,83,15,0.1)",
                  boxShadow: "0 4px 20px rgba(200,83,15,0.06)",
                }}
              >
                <div className="text-4xl">{item.emoji}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.question}
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
                  {item.story}
                </p>
                <div
                  className="pt-4 mt-auto"
                  style={{ borderTop: "1px solid rgba(200,83,15,0.1)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-dark)",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                      fontWeight: 400,
                    }}
                  >
                    ✦ {item.solution}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge mb-5 inline-block">Misyonumuz</span>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                Anadolu'nun lezzetlerini <span className="shimmer-text">dijital çağa</span> taşımak
              </h2>
              <p
                className="mb-4"
                style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.75, fontWeight: 300 }}
              >
                Türkiye'nin yedi bölgesi, yedi farklı iklim, yedi farklı mutfak kültürü. Karadeniz'in mısır ekmeğinden Güneydoğu'nun kebabına, Ege'nin zeytinyağlılarından İç Anadolu'nun tarhananasına kadar her lezzetin bir hikayesi var.
              </p>
              <p
                style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.75, fontWeight: 300 }}
              >
                Biz o hikayeleri sadece muhafaza etmiyoruz; günlük hayatın tam ortasına taşıyoruz. Çünkü en güzel yemek, tarifi bilinen ve sevilenerek pişirilenidir.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(200,83,15,0.1)",
                    boxShadow: "0 2px 12px rgba(200,83,15,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--primary)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      color: "var(--text-soft)",
                      fontWeight: 500,
                      marginTop: 4,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section
        className="py-20 px-6"
        style={{ background: "rgba(200,83,15,0.03)", borderTop: "1px solid rgba(200,83,15,0.08)", borderBottom: "1px solid rgba(200,83,15,0.08)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge">Biliyor muydunuz?</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {funFacts.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 rounded-2xl p-5"
                style={{ background: "var(--bg-card)", border: "1px solid rgba(200,83,15,0.1)" }}
              >
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge mb-5 inline-block">Ekibimiz</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-dark)",
                letterSpacing: "-0.03em",
                marginTop: "1.25rem",
              }}
            >
              Mutfağı seven{" "}
              <span className="shimmer-text">insanlar</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center rounded-3xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(200,83,15,0.08)",
                  boxShadow: "0 2px 10px rgba(200,83,15,0.04)",
                }}
              >
                <div className="text-4xl mb-3">{member.emoji}</div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--text-dark)",
                    marginBottom: 6,
                  }}
                >
                  {member.name}
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    color: "var(--text-soft)",
                    lineHeight: 1.55,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, var(--bg), rgba(200,83,15,0.05))" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(200,83,15,0.08) 0%, transparent 65%)" }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <div className="text-5xl mb-6">🍊</div>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--text-dark)",
              letterSpacing: "-0.03em",
            }}
          >
            Siz de bu ailenin bir parçası olun
          </h2>
          <p
            className="mb-10"
            style={{ fontFamily: "var(--font-body)", color: "var(--text-mid)", fontSize: "1.0625rem", fontWeight: 300, lineHeight: 1.7 }}
          >
            Artık "ne pişirsem" derdiniz yok. Gurme Planı ile her gün lezzetli, her sofra güzel.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center text-white rounded-full"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 600,
              padding: "16px 44px",
              textDecoration: "none",
            }}
          >
            Planlamaya Başla →
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center"
        style={{ borderTop: "1px solid rgba(200,83,15,0.1)", fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-soft)" }}
      >
        © 2026 Gurme Planı · Tüm hakları saklıdır 🍊
      </footer>
    </div>
  );
}
