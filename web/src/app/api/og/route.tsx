/** @jsxRuntime automatic */
import { ImageResponse } from '@vercel/og'
import tarot from '@/lib/tarotData'

export const runtime = 'edge'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ids = (searchParams.get('ids') ?? '')
    .split(',')
    .map(s => parseInt(s))
    .filter(n => !Number.isNaN(n))
    .slice(0, 3)

  const cards = ids.length
    ? ids.map(id => tarot[id])
    : [tarot[Math.floor(Math.random() * tarot.length)]]

  return new ImageResponse(
    (
      <div
        style={{
          width: '1080px',
          height: '560px',
          display: 'flex',
          background: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          fontFamily: 'Noto Sans JP',
        }}
      >
        {cards.map(c => (
          <div
            key={c.id}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img
              src={c.image}
              width={cards.length === 1 ? 360 : 250}
              height={cards.length === 1 ? 600 : 400}
              style={{ objectFit: 'cover', borderRadius: '12px' }}
            />
            <div style={{ marginTop: '16px', fontSize: '32px', fontWeight: 700 }}>
              {c.nameJa}
            </div>
            <div style={{ fontSize: '24px', color: '#666' }}>{c.meaningJa}</div>
          </div>
        ))}
      </div>
    ),
    { width: 1080, height: 560 }
  )
}
