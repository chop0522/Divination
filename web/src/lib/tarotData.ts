export interface TarotInfo {
  id: number
  image: string
  nameJa: string
  meaningJa: string
}

export const tarot: TarotInfo[] = [
  {
    id: 0,
    image: '/tarot/0.png',
    nameJa: '愚者',
    meaningJa: '始まり、無邪気',
  },
  {
    id: 1,
    image: '/tarot/1.png',
    nameJa: '魔術師',
    meaningJa: '意志、創造',
  },
  {
    id: 2,
    image: '/tarot/2.png',
    nameJa: '女教皇',
    meaningJa: '直感、秘密',
  },
]

export default tarot
