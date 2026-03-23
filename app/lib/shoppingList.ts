import { MealPlan, Recipe } from "./types"

export interface ShoppingItem {
  id: string
  text: string
  category: string
  checked: boolean
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "🥩 Et & Tavuk": ["et", "tavuk", "kıyma", "kuzu", "dana", "piliç", "ciğer", "sucuk", "salam", "pastırma", "kebap", "köfte"],
  "🐟 Balık & Deniz": ["balık", "hamsi", "levrek", "çipura", "midye", "karides", "kalamar", "ahtapot", "alabalık", "palamut"],
  "🥛 Süt & Yumurta": ["süt", "yoğurt", "peynir", "beyaz peynir", "kaşar", "lor", "krem peynir", "tereyağı", "yumurta", "krema", "ayran"],
  "🌾 Tahıl & Baklagil": ["un", "pirinç", "bulgur", "makarna", "ekmek", "yufka", "nohut", "fasulye", "mercimek", "bezelye", "bakla", "irmik", "nişasta"],
  "🥦 Sebze": ["soğan", "sarımsak", "domates", "biber", "patlıcan", "kabak", "patates", "havuç", "kereviz", "ıspanak", "marul", "salatalık", "pırasa", "turp", "lahana", "karnabahar", "brokoli", "enginar", "taze fasulye", "bamya", "kırmızı biber", "yeşil biber", "kapya", "roka", "maydanoz", "dereotu", "nane", "fesleğen"],
  "🍋 Meyve": ["limon", "portakal", "elma", "armut", "üzüm", "çilek", "kayısı", "şeftali", "erik", "incir", "nar", "muz", "kiraz", "vişne", "kuru üzüm", "kuru kayısı", "kuru incir"],
  "🫙 Yağ & Sos": ["zeytinyağı", "ayçiçek yağı", "sıvı yağ", "salça", "domates salçası", "biber salçası", "sirke", "nar ekşisi", "tahin", "pekmez", "bal"],
  "🧂 Baharat & Diğer": ["tuz", "karabiber", "kırmızı biber", "kimyon", "pul biber", "kekik", "nane", "tarçın", "karanfil", "zencefil", "zerdeçal", "köri", "sumak", "mahlep", "şeker", "toz şeker"],
}

function categorize(ingredient: string): string {
  const lower = ingredient.toLowerCase()
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) return category
  }
  return "🛒 Diğer"
}

function normalizeIngredient(raw: string): string {
  // Remove leading quantities like "2 adet", "1 kg", "3 yemek kaşığı" etc.
  return raw
    .replace(/^\d+[\d/,.]*([-–]\d+[\d/,.]*)?(\s*(adet|kg|gr|g|ml|lt|litre|paket|demet|diş|yemek kaşığı|tatlı kaşığı|çay kaşığı|su bardağı|çay bardağı|dal|tutam|dilim|avuç|porsiyon))?\s*/i, "")
    .trim()
}

export function buildShoppingList(plan: MealPlan): ShoppingItem[] {
  const allRecipes: Recipe[] = []
  for (const day of plan.days) {
    allRecipes.push(...day.lunch.mains)
    if (day.lunch.side) allRecipes.push(day.lunch.side)
    if (day.lunch.dessert) allRecipes.push(day.lunch.dessert)
    allRecipes.push(...day.dinner.mains)
    if (day.dinner.side) allRecipes.push(day.dinner.side)
    if (day.dinner.dessert) allRecipes.push(day.dinner.dessert)
  }

  const seen = new Set<string>()
  const items: ShoppingItem[] = []

  for (const recipe of allRecipes) {
    for (const raw of recipe.ingredients ?? []) {
      const text = normalizeIngredient(raw)
      if (!text || seen.has(text.toLowerCase())) continue
      seen.add(text.toLowerCase())
      items.push({
        id: `${recipe.id}-${text}`,
        text,
        category: categorize(text),
        checked: false,
      })
    }
  }

  // Sort by category
  const ORDER = Object.keys(CATEGORY_KEYWORDS).concat(["🛒 Diğer"])
  items.sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category))

  return items
}
