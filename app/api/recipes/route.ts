import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function GET(req: NextRequest) {
  const region = req.nextUrl.searchParams.get('region')

  let query = supabase
    .from('recipes')
    .select('id, name, slug, region_name, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, image_url, tags')

  if (region && region !== 'all') {
    query = query.eq('region_name', region)
  }

  const { data, error } = await query.limit(120)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ recipes: data })
}
