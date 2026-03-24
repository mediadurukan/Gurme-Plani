import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: 'Env vars eksik' }, { status: 500 })
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const recipeId = formData.get('recipeId') as string | null

  if (!file || !recipeId) {
    return NextResponse.json({ error: 'Dosya veya tarif ID eksik' }, { status: 400 })
  }

  // Resim zaten varsa yüklemeyi reddet
  const { data: existing } = await supabase
    .from('recipes')
    .select('image_url')
    .eq('id', recipeId)
    .single()

  if (existing?.image_url) {
    return NextResponse.json({ error: 'Bu tarife zaten fotoğraf eklenmiş' }, { status: 409 })
  }

  // Dosyayı Supabase Storage'a yükle
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `recipes/user-${recipeId}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from('recipe-images')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Public URL al
  const { data: urlData } = supabase.storage.from('recipe-images').getPublicUrl(path)

  // recipes tablosunu güncelle
  const { error: updateError } = await supabase
    .from('recipes')
    .update({ image_url: urlData.publicUrl })
    .eq('id', recipeId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ url: urlData.publicUrl })
}
