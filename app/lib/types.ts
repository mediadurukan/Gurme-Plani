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

export interface MealSection {
  main: Recipe | null
  garnish: Recipe | null   // pilav / bulgur / makarna
  salad: Recipe | null     // salata / yoğurt / cacık
  dessert: Recipe | null
}

export interface DayMeal {
  dayName: string
  lunch: MealSection
  dinner: MealSection
}

export interface MealPlan {
  type: 'daily' | 'weekly'
  region: string
  days: DayMeal[]
}
