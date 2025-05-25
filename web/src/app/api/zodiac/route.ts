export const runtime = 'edge';          

import { NextResponse } from 'next/server';
import { getZodiacSign } from '@divination/astro-data';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  const sign = getZodiacSign(date);
  return NextResponse.json({ sign });
}
