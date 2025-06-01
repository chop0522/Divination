'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { z } from 'zod'
import TarotCard from './TarotCard'
import { useLangStore } from '@/store/useLangStore'

const TarotSchema = z.object({
  id: z.number(),
  name: z.string(),
  meaning: z.string(),
  meaning_ja: z.string(),
})

export type Tarot = z.infer<typeof TarotSchema>

type Drawn = Tarot & { reversed: boolean }

const fetcher = async (url: string): Promise<Tarot | Tarot[]> => {
  const res = await fetch(url)
  const data = await res.json()
  if (Array.isArray(data)) return z.array(TarotSchema).parse(data)
  return TarotSchema.parse(data)
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function TarotDrawer({ open, onClose }: Props) {
  const { lang, toggle } = useLangStore()
  const [count, setCount] = useState(1)
  const { data } = useSWR(open ? `/api/tarot?cards=${count}` : null, fetcher)
  const [cards, setCards] = useState<Drawn[]>([])

  useEffect(() => {
    if (!data) {
      setCards([])
      return
    }
    const arr = (Array.isArray(data) ? data : [data]).map(c => ({
      ...c,
      reversed: Math.random() < 0.5,
    }))
    setCards(arr)
  }, [data])

  const toggleReversed = (i: number) => {
    setCards(cs => {
      const next = [...cs]
      next[i] = { ...next[i], reversed: !next[i].reversed }
      return next
    })
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500"
      >
        ×
      </button>
      <button
        onClick={toggle}
        className="absolute top-2 left-2 text-gray-500"
      >
        {lang === 'en' ? 'JA' : 'EN'}
      </button>
      <div className="mt-8 p-4 space-y-4">
        <div className="flex justify-center gap-4">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="draw-count"
              checked={count === 1}
              onChange={() => setCount(1)}
            />
            1枚
          </label>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="draw-count"
              checked={count === 3}
              onChange={() => setCount(3)}
            />
            3枚
          </label>
        </div>
        {cards.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            {cards.map((card, i) => (
              <div
                key={`${card.id}-${i}`}
                onClick={() => toggleReversed(i)}
                className="cursor-pointer"
              >
                <TarotCard
                  image={`/tarot/${card.id}.png`}
                  nameEn={card.name}
                  nameJa={card.name}
                  meaningEn={card.meaning}
                  meaningJa={card.meaning_ja}
                  reversed={card.reversed}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {Array.from({ length: count }).map((_, i) => (
              <img
                key={i}
                src="/tarot/back.png"
                alt="back"
                className="w-24 h-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
