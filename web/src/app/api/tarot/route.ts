export const runtime = 'edge'

import { NextResponse } from 'next/server'
import { tarotCards } from '@/data/tarot'

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cardsParam = searchParams.get('cards')
  const count = cardsParam ? Number(cardsParam) : 1

  const deck = [...tarotCards]
  const results = []
  for (let i = 0; i < Math.min(count, deck.length); i++) {
    const idx = Math.floor(Math.random() * deck.length)
    results.push(deck[idx])
    deck.splice(idx, 1)
  }

  return NextResponse.json(count === 1 ? results[0] : results)
}
