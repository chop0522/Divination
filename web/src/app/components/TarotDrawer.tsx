'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { z } from 'zod'
import { useLangStore } from '@/store/useLangStore'

const TarotSchema = z.object({
  id: z.number(),
  name: z.string(),
  meaning: z.string(),
  meaning_ja: z.string(),
})

export type Tarot = z.infer<typeof TarotSchema>

const fetcher = async (url: string): Promise<Tarot[]> => {
  const res = await fetch(url)
  const data = await res.json()
  return z.array(TarotSchema).parse(data)
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function TarotDrawer({ open, onClose }: Props) {
  const { lang, toggle } = useLangStore()
  const { data } = useSWR(open ? '/api/tarot?cards=3' : null, fetcher)

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
        {data ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center space-x-4">
            {data.map(card => (
              <div key={card.id} className="text-center">
                <img
                  src={`/tarot/${card.id}.svg`}
                  alt={card.name}
                  className="w-24 h-auto mx-auto"
                />
                <h2 className="mt-2 text-sm font-bold">{card.name}</h2>
                <p className="mt-1 text-xs text-gray-700">
                  {lang === 'en' ? card.meaning : card.meaning_ja}
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="flex justify-center space-x-4">
            {[0, 1, 2].map(i => (
              <img
                key={i}
                src="/tarot/back.svg"
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
