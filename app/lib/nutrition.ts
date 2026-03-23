import { Recipe } from './types'

export interface Nutrition {
  calories: number
  protein: number  // g
  carbs: number    // g
  fat: number      // g
}

export function estimateNutrition(recipe: Recipe): Nutrition {
  const tags = recipe.tags ?? []

  if (tags.includes('tatlı'))
    return { calories: 420, protein: 5, carbs: 65, fat: 16 }

  if (tags.includes('çorba'))
    return { calories: 185, protein: 10, carbs: 22, fat: 6 }

  if (tags.includes('salata'))
    return { calories: 145, protein: 4, carbs: 14, fat: 8 }

  if (tags.includes('meze'))
    return { calories: 200, protein: 6, carbs: 18, fat: 12 }

  if (tags.some(t => ['et', 'kebap', 'köfte', 'kavurma', 'kuzu', 'kıyma', 'döner', 'şiş kebap', 'büryan', 'tandır'].includes(t)))
    return { calories: 530, protein: 38, carbs: 10, fat: 36 }

  if (tags.some(t => ['tavuk', 'piliç'].includes(t)))
    return { calories: 370, protein: 35, carbs: 16, fat: 18 }

  if (tags.some(t => ['balık', 'hamsi', 'midye', 'karides', 'kalamar', 'alabalık'].includes(t)))
    return { calories: 310, protein: 30, carbs: 14, fat: 14 }

  if (tags.some(t => ['pilav', 'pirinç', 'bulgur', 'iç pilav'].includes(t)))
    return { calories: 390, protein: 8, carbs: 70, fat: 10 }

  if (tags.some(t => ['börek', 'hamur', 'gözleme', 'yufka'].includes(t)))
    return { calories: 450, protein: 14, carbs: 56, fat: 20 }

  if (tags.some(t => ['fasulye', 'nohut', 'mercimek', 'baklagil'].includes(t)))
    return { calories: 320, protein: 18, carbs: 48, fat: 7 }

  if (tags.some(t => ['sebze', 'zeytinyağlı', 'vegan', 'patlıcan', 'kabak', 'dolma', 'sarma'].includes(t)))
    return { calories: 265, protein: 6, carbs: 30, fat: 13 }

  if (tags.some(t => ['güveç', 'tencere', 'yahni'].includes(t)))
    return { calories: 420, protein: 28, carbs: 24, fat: 22 }

  // Default
  return { calories: 385, protein: 18, carbs: 38, fat: 17 }
}

export function sumNutrition(items: (Nutrition | null)[]): Nutrition {
  return items.reduce(
    (acc, n) => n ? {
      calories: acc.calories + n.calories,
      protein: acc.protein + n.protein,
      carbs: acc.carbs + n.carbs,
      fat: acc.fat + n.fat,
    } : acc,
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
}
