import { Recipe, DayMeal, MealPlan } from './types'

const SIDE_TAGS = ['tatlı', 'salata', 'çorba', 'meze']
const BREAKFAST_TAGS = ['kahvaltı', 'peynir', 'yumurta', 'menemen', 'kaygana', 'pişi', 'gözleme', 'börek', 'poğaça', 'açma', 'simit', 'reçel', 'bal', 'tereyağı', 'zeytin']
const BREAD_TAGS = ['ekmek', 'lavaş', 'pide', 'bazlama', 'yufka', 'dürüm', 'sandviç', 'tost']
const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickFrom(pool: Recipe[], n: number, usedIds: Set<number>): Recipe[] {
  const available = shuffle(pool.filter(r => !usedIds.has(r.id)))
  const picked = available.slice(0, n)
  // If not enough unique, allow reuse
  if (picked.length < n) {
    const extra = shuffle(pool).slice(0, n - picked.length)
    picked.push(...extra)
  }
  picked.forEach(r => usedIds.add(r.id))
  return picked.slice(0, n)
}

export function generateMealPlan(recipes: Recipe[], type: 'daily' | 'weekly', regionLabel: string): MealPlan {
  const NON_MAIN = [...SIDE_TAGS, ...BREAKFAST_TAGS, ...BREAD_TAGS]

  const breakfastPool = recipes.filter(r =>
    r.tags?.some(t => BREAKFAST_TAGS.includes(t)) ||
    r.name.toLowerCase().match(/peynir|yumurta|menemen|gözleme|börek|poğaça|simit|kahvaltı/)
  )
  const dessertPool = recipes.filter(r => r.tags?.includes('tatlı'))
  const sidePool = recipes.filter(r =>
    r.tags?.some(t => ['salata', 'çorba', 'meze'].includes(t)) &&
    !r.tags?.includes('tatlı') &&
    !r.tags?.some(t => BREAKFAST_TAGS.includes(t))
  )
  // Main dishes: exclude breakfast, sides, and bread-only items
  const mainPool = recipes.filter(r => {
    const tags = r.tags ?? []
    const isBread = tags.some(t => BREAD_TAGS.includes(t)) && !tags.some(t => ['et', 'tavuk', 'balık', 'kebap', 'köfte', 'pilav', 'sebze', 'güveç', 'tencere'].includes(t))
    return !tags.some(t => NON_MAIN.includes(t)) && !isBread &&
      !r.name.toLowerCase().match(/peynir|yumurta|menemen|gözleme|poğaça|simit|lavaş|bazlama/)
  })

  // Fallbacks if categories are too small
  const bfPool = breakfastPool.length >= 1 ? breakfastPool : recipes.filter(r => r.difficulty === 'kolay').slice(0, 10)
  const dsPool = dessertPool.length >= 1 ? dessertPool : shuffle(recipes).slice(0, 10)
  const sdPool = sidePool.length >= 1 ? sidePool : shuffle(recipes.filter(r => !r.tags?.includes('tatlı'))).slice(0, Math.ceil(recipes.length / 3))
  const mnPool = mainPool.length >= 4 ? mainPool : recipes.filter(r => !r.tags?.some(t => BREAKFAST_TAGS.includes(t)) && !r.tags?.includes('tatlı'))

  const dayCount = type === 'weekly' ? 7 : 1
  const usedIds = new Set<number>()
  const days: DayMeal[] = []

  for (let i = 0; i < dayCount; i++) {
    const lunchMains = pickFrom(mnPool, 2, usedIds)
    const lunchSide = pickFrom(sdPool, 1, usedIds)
    const lunchDessert = pickFrom(dsPool, 1, usedIds)
    const dinnerMains = pickFrom(mnPool, 2, usedIds)
    const dinnerSide = pickFrom(sdPool, 1, usedIds)
    const dinnerDessert = pickFrom(dsPool, 1, usedIds)

    days.push({
      dayName: type === 'weekly' ? DAY_NAMES[i] : 'Bugün',
      lunch: { mains: lunchMains, side: lunchSide[0] ?? null, dessert: lunchDessert[0] ?? null },
      dinner: { mains: dinnerMains, side: dinnerSide[0] ?? null, dessert: dinnerDessert[0] ?? null },
    })
  }

  return { type, region: regionLabel, days }
}

export const REGION_SLUG_MAP: Record<string, string> = {
  'Marmara': 'marmara',
  'Ege': 'ege',
  'Akdeniz': 'akdeniz',
  'İç Anadolu': 'ic-anadolu',
  'Karadeniz': 'karadeniz',
  'Doğu Anadolu': 'dogu-anadolu',
  'Güneydoğu Anadolu': 'guneydogu-anadolu',
}
