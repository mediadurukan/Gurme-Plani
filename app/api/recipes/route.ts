import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: 'Env vars eksik', SUPABASE_URL: !!process.env.SUPABASE_URL, SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY }, { status: 500 })
  }
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  )
  const debug      = req.nextUrl.searchParams.get('debug')
  if (debug === 'regions') {
    const { data } = await supabase.from('recipes').select('region_name').limit(500)
    const counts: Record<string, number> = {}
    data?.forEach(r => { counts[r.region_name] = (counts[r.region_name] || 0) + 1 })
    return NextResponse.json({ counts, total: data?.length })
  }
  const region     = req.nextUrl.searchParams.get('region')
  const search     = req.nextUrl.searchParams.get('search')
  const difficulty = req.nextUrl.searchParams.get('difficulty')
  const tag        = req.nextUrl.searchParams.get('tag')

  let query = supabase
    .from('recipes')
    .select('id, name, slug, region_name, description, ingredients, instructions, prep_time, cook_time, servings, difficulty, image_url, tags')

  if (region && region !== 'all')         query = query.eq('region_name', region)
  if (difficulty && difficulty !== 'all') query = query.eq('difficulty', difficulty)
  if (search)                             query = query.ilike('name', `%${search}%`)
  if (tag)                                query = query.contains('tags', [tag])

  const { data, error } = await query.limit(200)

  if (error) return NextResponse.json({ error: error.message, debug: { region, search } }, { status: 500 })
  return NextResponse.json({ recipes: data, debug: { count: data?.length, region } })
}
