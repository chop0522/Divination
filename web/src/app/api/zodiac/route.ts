import { NextResponse } from 'next/server'
import { getZodiacSign } from '@divination/astro-data/lib'

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 })
  }
  const [, month, day] = date.split('-').map(Number)
  const sign = getZodiacSign(month, day)
  return NextResponse.json({ sign })
}
