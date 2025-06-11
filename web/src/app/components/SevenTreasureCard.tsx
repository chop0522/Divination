'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SevenTreasureCard() {
  const { data } = useSWR('/api/profile', fetcher)

  if (!data) {
    return <div className="w-40 h-24 bg-gray-200 animate-pulse rounded" />
  }

  return (
    <div className="mt-4 p-4 border rounded text-center">
      <p className="font-bold">{data.shichihou_star}</p>
      <p className="text-sm text-gray-500">Year Cycle: {data.year_cycle}</p>
    </div>
  )
}
