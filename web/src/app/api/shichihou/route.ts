/** @jsxRuntime automatic */
import { calcShichihou } from '@/lib/shichihou'
export const runtime = 'edge'
export async function GET(req: Request) {
  const birth = new URL(req.url).searchParams.get('birth') ?? ''
  return Response.json(calcShichihou(birth))
}
