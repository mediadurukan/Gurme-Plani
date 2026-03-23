"use client";

import { motion } from "framer-motion";
import { useReminders } from "../lib/useReminders";

export default function RemindersSection() {
  const { reminders, permission, requestPermission, updateReminder, sendTestNotification } = useReminders();

  const anyEnabled = reminders.some((r) => r.enabled);
  const notSupported = typeof window !== "undefined" && !("Notification" in window);

  const handleToggle = async (id: string, currentEnabled: boolean) => {
    if (!currentEnabled && permission !== "granted") {
      const result = await requestPermission();
      if (result !== "granted") return;
    }
    updateReminder(id, { enabled: !currentEnabled });
  };

  return (
    <section className="py-24 relative w-full px-4 sm:px-8 flex flex-col items-center">
      <div className="max-w-[1024px] mx-auto w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-sm font-bold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase"
            style={{ background: "rgba(200,83,15,0.08)", border: "1px solid rgba(200,83,15,0.25)", color: "var(--primary)" }}
          >
            Hatırlatıcılar
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4 tracking-tight">
            Akıllı{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f97316, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bildirimler
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Öğün saatlerinizde hatırlatma alın, planınıza sadık kalın
          </p>
        </motion.div>

        {/* Notification permission banner */}
        {notSupported ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}
          >
            <span className="text-lg">⚠️</span>
            <span>Tarayıcınız bildirim özelliğini desteklemiyor.</span>
          </motion.div>
        ) : permission === "denied" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm"
            style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)", color: "#dc2626" }}
          >
            <span className="text-lg">🔕</span>
            <span>Bildirim izni reddedildi. Tarayıcı ayarlarından <strong>gurme-plani</strong> için bildirimlere izin verin.</span>
          </motion.div>
        ) : permission === "granted" && anyEnabled ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 rounded-2xl px-6 py-4 flex items-center gap-3 text-sm"
            style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", color: "#16a34a" }}
          >
            <span className="text-lg">✅</span>
            <span>Bildirimler aktif. Sayfa açık olduğu sürece öğün saatlerinizde hatırlatma alacaksınız.</span>
          </motion.div>
        ) : null}

        {/* Reminder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reminders.map((reminder, i) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl p-6 flex flex-col gap-5"
              style={{
                border: `1px solid ${reminder.enabled ? "rgba(249,115,22,0.3)" : "rgba(249,115,22,0.1)"}`,
                background: reminder.enabled ? "rgba(249,115,22,0.03)" : "#fff",
                transition: "border-color 0.3s, background 0.3s",
              }}
            >
              {/* Icon + Label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{
                      background: reminder.enabled ? "rgba(249,115,22,0.1)" : "rgba(249,115,22,0.05)",
                    }}
                  >
                    {reminder.icon}
                  </div>
                  <div>
                    <p className="text-gray-800 font-semibold text-base">{reminder.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Günlük hatırlatma</p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() => handleToggle(reminder.id, reminder.enabled)}
                  disabled={notSupported || permission === "denied"}
                  className="relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300 disabled:opacity-40"
                  style={{ background: reminder.enabled ? "#f97316" : "rgba(0,0,0,0.1)" }}
                  aria-label={reminder.enabled ? "Kapat" : "Aç"}
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
                    style={{ transform: reminder.enabled ? "translateX(20px)" : "translateX(0)" }}
                  />
                </button>
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Hatırlatma saati</label>
                <input
                  type="time"
                  value={reminder.time}
                  onChange={(e) => updateReminder(reminder.id, { time: e.target.value })}
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 outline-none transition-all"
                  style={{
                    border: "1px solid rgba(249,115,22,0.2)",
                    background: "rgba(249,115,22,0.02)",
                    colorScheme: "light",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)")}
                />
              </div>

              {/* Message preview */}
              <p className="text-gray-400 text-xs leading-relaxed italic">
                &ldquo;{reminder.message}&rdquo;
              </p>

              {/* Test button */}
              {reminder.enabled && permission === "granted" && (
                <button
                  onClick={() => sendTestNotification(reminder)}
                  className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors text-left"
                >
                  Bildirim önizlemesi gönder →
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* How it works note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-400 text-xs mt-10"
        >
          💡 Bildirimler sayfa açık olduğu sürece çalışır. Tüm ayarlar tarayıcınıza kaydedilir.
        </motion.p>
      </div>
    </section>
  );
}
