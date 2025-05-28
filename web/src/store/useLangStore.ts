import { create } from 'zustand'

type Lang = 'en' | 'ja'

interface LangState {
  lang: Lang
  toggle: () => void
}

export const useLangStore = create<LangState>(set => ({
  lang: 'en',
  toggle: () => set(state => ({ lang: state.lang === 'en' ? 'ja' : 'en' })),
}))
