export interface Shichihou {
  star: string          // 例: "ダイヤモンド（火）"
  yearCycle: number     // 1-7, based on birthday-anchored 7-year cycle
  monthCycle: number    // 1-12, within the current yearCycle
  description: string   // star × yearCycle の解説文
}

// 各宝石タイプ×7年周期の解説文
// 後で正式な文章に置き換えるため、すべて "TODO: " を接頭辞にしてある
export const STAR_DESCRIPTIONS: Record<string, string[]> = {
  'ダイヤモンド（火）': [
    'TODO: ダイヤモンド 年1',
    'TODO: ダイヤモンド 年2',
    'TODO: ダイヤモンド 年3',
    'TODO: ダイヤモンド 年4',
    'TODO: ダイヤモンド 年5',
    'TODO: ダイヤモンド 年6',
    'TODO: ダイヤモンド 年7',
  ],
  'ルビー（火）': [
    'TODO: ルビー 年1',
    'TODO: ルビー 年2',
    'TODO: ルビー 年3',
    'TODO: ルビー 年4',
    'TODO: ルビー 年5',
    'TODO: ルビー 年6',
    'TODO: ルビー 年7',
  ],
  'サファイア（水）': Array(7).fill('TODO: サファイア'),
  'エメラルド（風）': Array(7).fill('TODO: エメラルド'),
  'アメジスト（土）': Array(7).fill('TODO: アメジスト'),
  'トパーズ（風）': Array(7).fill('TODO: トパーズ'),
  'オパール（土）': Array(7).fill('TODO: オパール'),
}

function reduceToSingle(num: number): number {
  let result = num
  while (result > 9) {
    result = result
      .toString()
      .split('')
      .reduce((a, b) => a + Number(b), 0)
  }
  return result
}

function getGemType(num: number): string {
  switch (num) {
    case 1:
      return 'ダイヤモンド（火）'
    case 2:
      return 'ルビー（火）'
    case 3:
      return 'サファイア（水）'
    case 4:
      return 'エメラルド（風）'
    case 5:
      return 'アメジスト（土）'
    case 6:
      return 'トパーズ（風）'
    case 7:
      return 'オパール（土）'
    default:
      return '不明'
  }
}

export function calcShichihou(birth: string, date: Date = new Date()): Shichihou {
  const [yearStr, monthStr, dayStr] = birth.split('-')
  const digits = (yearStr + monthStr + dayStr)
    .split('')
    .map((c) => Number(c))
    .filter((n) => !isNaN(n))
  const sum = digits.reduce((a, b) => a + b, 0)

  let gemNum = reduceToSingle(sum)
  if (gemNum > 7) gemNum = ((gemNum - 1) % 7) + 1
  const star = getGemType(gemNum)

  const birthDate = new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr))

  const adjustForRisshun = (d: Date): Date => {
    const risshunDay = getRisshunDay(d.getFullYear())
    const risshun = new Date(d.getFullYear(), 1, risshunDay)
    if (d < risshun) {
      return new Date(d.getFullYear() - 1, d.getMonth(), d.getDate())
    }
    return d
  }

  const adjBirth = adjustForRisshun(birthDate)
  const adjDate = adjustForRisshun(new Date(date))

  let age = adjDate.getFullYear() - adjBirth.getFullYear()
  if (
    adjDate.getMonth() < adjBirth.getMonth() ||
    (adjDate.getMonth() === adjBirth.getMonth() && adjDate.getDate() < adjBirth.getDate())
  ) {
    age -= 1
  }
  const yearCycle = ((age % 7) + 7) % 7 + 1

  let months = age * 12 + (adjDate.getMonth() - adjBirth.getMonth())
  if (adjDate.getDate() < adjBirth.getDate()) months -= 1
  const monthCycle = ((months % 12) + 12) % 12 + 1

  const description = STAR_DESCRIPTIONS[star]?.[yearCycle - 1] ?? ''

  return { star, yearCycle, monthCycle, description }
}

function getRisshunDay(year: number): number {
  // 立春が2月3日になる年はごく一部のみ
  const feb3 = new Set([2021, 2025])
  return feb3.has(year) ? 3 : 4
}
