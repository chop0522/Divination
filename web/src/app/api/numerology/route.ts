import { NextResponse } from 'next/server'
import { getLifePathNumber } from '@divination/astro-data'

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 })
  }
  const path = getLifePathNumber(date)
  return NextResponse.json({ path })
}
