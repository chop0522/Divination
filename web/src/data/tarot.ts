export interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  meaning_ja: string;
}

export const tarotCards: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool',
    meaning: 'Beginnings, innocence',
    meaning_ja: '始まり、無邪気',
  },
  {
    id: 1,
    name: 'The Magician',
    meaning: 'Willpower, creation',
    meaning_ja: '意志、創造',
  },
  {
    id: 2,
    name: 'The High Priestess',
    meaning: 'Intuition, secrets',
    meaning_ja: '直感、秘密',
  },
];
