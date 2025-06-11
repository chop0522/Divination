export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const { birth } = await req.json().catch(() => ({}))
  if (!birth) {
    return NextResponse.json({ error: 'Missing birth' }, { status: 400 })
  }

  const { origin } = new URL(req.url)
  const calc = await fetch(`${origin}/api/shichihou?birth=${birth}`).then(res => res.json())

  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    birth,
    shichihou_star: calc.star,
    year_cycle: calc.yearCycle,
  })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const uid = url.searchParams.get('uid')
  if (!uid) {
    return NextResponse.json({ error: 'Missing uid' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('birth, shichihou_star, year_cycle')
    .eq('id', uid)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600' },
  })
}
