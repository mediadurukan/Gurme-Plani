export interface Recipe {
  id: number
  name: string
  slug: string
  region_name: string
  description: string
  ingredients: string[]
  instructions: string[]
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  image_url: string | null
  tags: string[]
}

export interface DayMeal {
  dayName: string
  lunch: { mains: Recipe[]; side: Recipe | null; dessert: Recipe | null }
  dinner: { mains: Recipe[]; side: Recipe | null; dessert: Recipe | null }
}

export interface MealPlan {
  type: 'daily' | 'weekly'
  region: string
  days: DayMeal[]
}
