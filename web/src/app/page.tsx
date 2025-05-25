'use client'

import { useState } from 'react'

export default function Home() {
  const [date, setDate] = useState('')
  const [sign, setSign] = useState('')
  const [path, setPath] = useState<number>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return
    const zodiac = await fetch(`/api/zodiac?date=${date}`).then(r => r.json())
    setSign(zodiac.sign)
    const numerology = await fetch(`/api/numerology?date=${date}`).then(r => r.json())
    setPath(numerology.path)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          占う
        </button>
      </form>
      {sign && <p className="mt-4">星座: {sign}</p>}
      {path !== undefined && <p>ライフパス: {path}</p>}
    </main>
  )
}
