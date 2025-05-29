'use client'
import { motion } from 'framer-motion'

type Props = {
  image: string
  nameEn: string
  nameJa: string
  meaningEn: string
  meaningJa: string
  reversed: boolean
}

export default function TarotCard({
  image,
  nameEn,
  nameJa,
  meaningEn,
  meaningJa,
  reversed,
}: Props) {
  return (
    <motion.div
      className="w-40 md:w-48 lg:w-56 flex flex-col items-center gap-1"
      initial={{ rotateX: reversed ? 180 : 0 }}
      animate={{ rotateX: reversed ? 180 : 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.img
        src={image}
        alt={nameEn}
        className="rounded-lg shadow-lg select-none"
        draggable={false}
      />
      <p className="text-sm font-bold">{nameJa}</p>
      <p className="text-xs opacity-70">{meaningJa}</p>
    </motion.div>
  )
}
