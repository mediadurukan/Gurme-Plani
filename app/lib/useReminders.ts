"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface MealReminder {
  id: string;
  label: string;
  icon: string;
  time: string; // "HH:MM"
  enabled: boolean;
  message: string;
}

const DEFAULT_REMINDERS: MealReminder[] = [
  { id: "sabah", label: "Kahvaltı", icon: "🌅", time: "08:00", enabled: false, message: "Günaydın! Kahvaltı zamanı geldi. Güzel bir güne enerjili başlayın 🍳" },
  { id: "ogle", label: "Öğle Yemeği", icon: "☀️", time: "12:30", enabled: false, message: "Öğle yemeği vakti! Planladığınız lezzetler sizi bekliyor 🍽️" },
  { id: "aksam", label: "Akşam Yemeği", icon: "🌙", time: "19:00", enabled: false, message: "Akşam yemeği zamanı. Bugünkü tarifinizi hazırlamaya başlayın 🍲" },
];

const STORAGE_KEY = "gurme-reminders";

export function useReminders() {
  const [reminders, setReminders] = useState<MealReminder[]>(DEFAULT_REMINDERS);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const lastFiredRef = useRef<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setReminders(JSON.parse(stored)); } catch {}
    }
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const save = useCallback((updated: MealReminder[]) => {
    setReminders(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return "denied" as NotificationPermission;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const updateReminder = useCallback((id: string, patch: Partial<MealReminder>) => {
    setReminders((prev) => {
      const updated = prev.map((r) => r.id === id ? { ...r, ...patch } : r);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const sendTestNotification = useCallback((reminder: MealReminder) => {
    if (permission !== "granted") return;
    new Notification(`Gurme Planı — ${reminder.label}`, {
      body: reminder.message,
      icon: "/favicon.ico",
    });
  }, [permission]);

  // Check every 30 seconds if any reminder should fire
  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      if (Notification.permission !== "granted") return;
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const today = now.toDateString();

      reminders.forEach((r) => {
        if (!r.enabled) return;
        if (r.time !== hhmm) return;
        const key = `${r.id}-${today}-${hhmm}`;
        if (lastFiredRef.current[r.id] === key) return;
        lastFiredRef.current[r.id] = key;
        new Notification(`Gurme Planı — ${r.label}`, {
          body: r.message,
          icon: "/favicon.ico",
        });
      });
    };

    check();
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, [reminders]);

  return { reminders, permission, requestPermission, updateReminder, sendTestNotification, save };
}
