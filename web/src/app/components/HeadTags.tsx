import Head from 'next/head'

interface Props {
  ids?: number[]
}

export default function HeadTags({ ids }: Props) {
  const query = ids && ids.length ? `?ids=${ids.join(',')}` : ''
  const ogUrl = `/api/og${query}`

  return (
    <Head>
      <meta property="og:image" content={ogUrl} />
    </Head>
  )
}
