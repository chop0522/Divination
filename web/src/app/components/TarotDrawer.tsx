'use client'

import { motion } from 'framer-motion'
import useSWR from 'swr'
import { z } from 'zod'

const TarotSchema = z.object({
  id: z.number(),
  name: z.string(),
  meaning: z.string(),
})

export type Tarot = z.infer<typeof TarotSchema>

const fetcher = async (url: string): Promise<Tarot> => {
  const res = await fetch(url)
  const data = await res.json()
  return TarotSchema.parse(data)
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function TarotDrawer({ open, onClose }: Props) {
  const { data } = useSWR(open ? '/api/tarot' : null, fetcher)

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
      <div className="mt-8 p-4 text-center space-y-4">
        {data ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <img
              src={`/tarot/${data.id}.svg`}
              alt={data.name}
              className="mx-auto w-48 h-auto"
            />
            <h2 className="mt-4 text-xl font-bold">{data.name}</h2>
            <p className="mt-2 text-sm text-gray-700">{data.meaning}</p>
          </motion.div>
        ) : (
          <img
            src="/tarot/back.svg"
            alt="back"
            className="mx-auto w-48 h-auto"
          />
        )}
      </div>
    </div>
  )
}
