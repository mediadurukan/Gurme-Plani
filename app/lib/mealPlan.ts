import { Recipe, DayMeal, MealPlan } from './types'

const BREAKFAST_TAGS = ['kahvaltı', 'peynir', 'yumurta', 'menemen', 'kaygana', 'pişi', 'gözleme', 'poğaça', 'açma', 'simit', 'reçel', 'bal', 'tereyağı', 'zeytin']
const BREAD_TAGS    = ['ekmek', 'lavaş', 'bazlama', 'yufka', 'dürüm', 'sandviç', 'tost', 'peksimet']
const DESSERT_TAGS  = ['tatlı', 'kurabiye', 'pasta', 'baklava', 'kadayıf', 'sütlaç', 'helva']
const GARNISH_TAGS  = ['pilav', 'bulgur', 'makarna', 'erişte', 'pirinç']
const SALAD_TAGS    = ['salata', 'yoğurt', 'cacık', 'ayran', 'meze', 'turşu']
const PROTEIN_TAGS  = ['et', 'tavuk', 'balık', 'hamsi', 'kebap', 'köfte', 'sucuk', 'kıyma', 'kuzu', 'dana', 'levrek', 'sardalya']

const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickOne(pool: Recipe[], usedIds: Set<number>): Recipe | null {
  const available = shuffle(pool.filter(r => !usedIds.has(r.id)))
  const picked = available[0] ?? (pool.length ? shuffle(pool)[0] : null)
  if (picked) usedIds.add(picked.id)
  return picked
}

export function generateMealPlan(recipes: Recipe[], type: 'daily' | 'weekly', regionLabel: string): MealPlan {
  const tags = (r: Recipe) => r.tags ?? []

  // Garnitür: pilav/bulgur/makarna AMA protein içermeyen (hamsili pilav = main, sade pilav = garnish)
  const garnishPool = recipes.filter(r => {
    const t = tags(r)
    return t.some(x => GARNISH_TAGS.includes(x)) && !t.some(x => PROTEIN_TAGS.includes(x)) && !t.includes('tatlı')
  })

  // Salata / yoğurt / cacık
  const saladPool = recipes.filter(r => {
    const t = tags(r)
    return t.some(x => SALAD_TAGS.includes(x)) && !t.some(x => DESSERT_TAGS.includes(x))
  })

  // Tatlı
  const dessertPool = recipes.filter(r => tags(r).some(x => DESSERT_TAGS.includes(x)))

  // Ana yemek: et veya sebze yemeği
  const NON_MAIN = [...BREAKFAST_TAGS, ...BREAD_TAGS, ...DESSERT_TAGS, ...GARNISH_TAGS, ...SALAD_TAGS]
  const mainPool = recipes.filter(r => {
    const t = tags(r)
    const isBread = t.some(x => BREAD_TAGS.includes(x)) && !t.some(x => PROTEIN_TAGS.includes(x))
    const isGarnishOnly = t.some(x => GARNISH_TAGS.includes(x)) && !t.some(x => PROTEIN_TAGS.includes(x))
    return !t.some(x => NON_MAIN.includes(x)) && !isBread && !isGarnishOnly &&
      !r.name.toLowerCase().match(/peynir|yumurta|menemen|gözleme|poğaça|simit|lavaş|bazlama/)
  })

  // Fallback'ler
  const mnPool  = mainPool.length   >= 4 ? mainPool   : recipes.filter(r => !tags(r).some(x => [...BREAKFAST_TAGS, ...DESSERT_TAGS].includes(x)))
  const gnPool  = garnishPool.length >= 2 ? garnishPool : recipes.filter(r => tags(r).some(x => GARNISH_TAGS.includes(x)))
  const slPool  = saladPool.length  >= 2 ? saladPool  : recipes.filter(r => tags(r).some(x => SALAD_TAGS.includes(x)))
  const dsPool  = dessertPool.length >= 2 ? dessertPool : shuffle(recipes).slice(0, 10)

  const dayCount = type === 'weekly' ? 7 : 1
  const usedIds  = new Set<number>()
  const days: DayMeal[] = []

  for (let i = 0; i < dayCount; i++) {
    days.push({
      dayName: type === 'weekly' ? DAY_NAMES[i] : 'Bugün',
      lunch: {
        main:    pickOne(mnPool,  usedIds),
        garnish: pickOne(gnPool,  usedIds),
        salad:   pickOne(slPool,  usedIds),
        dessert: pickOne(dsPool,  usedIds),
      },
      dinner: {
        main:    pickOne(mnPool,  usedIds),
        garnish: pickOne(gnPool,  usedIds),
        salad:   pickOne(slPool,  usedIds),
        dessert: pickOne(dsPool,  usedIds),
      },
    })
  }

  return { type, region: regionLabel, days }
}

export const REGION_SLUG_MAP: Record<string, string> = {
  'Marmara':             'marmara',
  'Ege':                 'ege',
  'Akdeniz':             'akdeniz',
  'İç Anadolu':          'ic-anadolu',
  'Karadeniz':           'karadeniz',
  'Doğu Anadolu':        'dogu-anadolu',
  'Güneydoğu Anadolu':   'guneydogu-anadolu',
}
