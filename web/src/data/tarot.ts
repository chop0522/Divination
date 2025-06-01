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
  {
    id: 3,
    name: 'The Empress',
    meaning: 'Abundance, nurturing',
    meaning_ja: '豊かさ、養育',
  },
  {
    id: 4,
    name: 'The Emperor',
    meaning: 'Authority, structure',
    meaning_ja: '安定、権威',
  },
  {
    id: 5,
    name: 'The Hierophant',
    meaning: 'Tradition, faith',
    meaning_ja: '伝統、信仰',
  },
  {
    id: 6,
    name: 'The Lovers',
    meaning: 'Partnerships, choices',
    meaning_ja: '選択、調和',
  },
  {
    id: 7,
    name: 'The Chariot',
    meaning: 'Determination, victory',
    meaning_ja: '勝利、決意',
  },
  {
    id: 8,
    name: 'Strength',
    meaning: 'Courage, patience',
    meaning_ja: '勇気、忍耐',
  },
  {
    id: 9,
    name: 'The Hermit',
    meaning: 'Introspection, solitude',
    meaning_ja: '内省、孤独',
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    meaning: 'Cycles, destiny',
    meaning_ja: '変化、運命',
  },
  {
    id: 11,
    name: 'Justice',
    meaning: 'Fairness, truth',
    meaning_ja: '公正、真実',
  },
  {
    id: 12,
    name: 'The Hanged Man',
    meaning: 'Sacrifice, perspective',
    meaning_ja: '犠牲、視点転換',
  },
  {
    id: 13,
    name: 'Death',
    meaning: 'Endings, transformation',
    meaning_ja: '終わり、変容',
  },
  {
    id: 14,
    name: 'Temperance',
    meaning: 'Balance, moderation',
    meaning_ja: '調和、節度',
  },
  {
    id: 15,
    name: 'The Devil',
    meaning: 'Bondage, temptation',
    meaning_ja: '束縛、誘惑',
  },
  {
    id: 16,
    name: 'The Tower',
    meaning: 'Upheaval, revelation',
    meaning_ja: '崩壊、啓示',
  },
  {
    id: 17,
    name: 'The Star',
    meaning: 'Hope, inspiration',
    meaning_ja: '希望、癒し',
  },
  {
    id: 18,
    name: 'The Moon',
    meaning: 'Uncertainty, illusion',
    meaning_ja: '不安、幻想',
  },
  {
    id: 19,
    name: 'The Sun',
    meaning: 'Joy, success',
    meaning_ja: '喜び、成功',
  },
  {
    id: 20,
    name: 'Judgement',
    meaning: 'Rebirth, evaluation',
    meaning_ja: '復活、審判',
  },
  {
    id: 21,
    name: 'The World',
    meaning: 'Completion, fulfillment',
    meaning_ja: '達成、統合',
  },
];
