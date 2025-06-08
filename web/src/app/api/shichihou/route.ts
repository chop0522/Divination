/** @jsxRuntime automatic */
import { NextResponse } from 'next/server'
import { calcShichihou } from '@/lib/shichihou'

export const runtime = 'edge'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const birth = url.searchParams.get('birth') ?? ''
  const dateStr = url.searchParams.get('date') ?? undefined
  const base = dateStr ? new Date(dateStr) : new Date()
  const result = calcShichihou(birth, base)
  return NextResponse.json(result)
}
