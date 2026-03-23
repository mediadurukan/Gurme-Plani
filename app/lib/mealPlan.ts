import { Recipe, DayMeal, MealPlan } from './types'

const SIDE_TAGS = ['tatlı', 'salata', 'çorba', 'meze']
const BREAKFAST_TAGS = ['kahvaltı']
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
  const breakfastPool = recipes.filter(r => r.tags?.some(t => BREAKFAST_TAGS.includes(t)))
  const sidePool = recipes.filter(r =>
    r.tags?.some(t => SIDE_TAGS.includes(t)) && !r.tags?.some(t => BREAKFAST_TAGS.includes(t))
  )
  const mainPool = recipes.filter(r =>
    !r.tags?.some(t => [...SIDE_TAGS, ...BREAKFAST_TAGS].includes(t))
  )

  // Fallbacks if categories are too small
  const bfPool = breakfastPool.length >= 1 ? breakfastPool : recipes.slice(0, Math.ceil(recipes.length / 4))
  const sdPool = sidePool.length >= 1 ? sidePool : shuffle(recipes).slice(0, Math.ceil(recipes.length / 3))
  const mnPool = mainPool.length >= 4 ? mainPool : recipes

  const dayCount = type === 'weekly' ? 7 : 1
  const usedIds = new Set<number>()
  const days: DayMeal[] = []

  for (let i = 0; i < dayCount; i++) {
    const breakfast = pickFrom(bfPool, 1, usedIds)
    const lunchMains = pickFrom(mnPool, 2, usedIds)
    const lunchSide = pickFrom(sdPool, 1, usedIds)
    const dinnerMains = pickFrom(mnPool, 2, usedIds)
    const dinnerSide = pickFrom(sdPool, 1, usedIds)

    days.push({
      dayName: type === 'weekly' ? DAY_NAMES[i] : 'Bugün',
      breakfast,
      lunch: { mains: lunchMains, side: lunchSide[0] ?? null },
      dinner: { mains: dinnerMains, side: dinnerSide[0] ?? null },
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
