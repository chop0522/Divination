export interface Shichihou {
  star: string
  yearCycle: number
  monthCycle: number
  description: string
}

const STAR_TEXT: Record<string, string[]> = {
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

  const birthYear = Number(yearStr)
  const birthMonth = Number(monthStr)
  const birthDay = Number(dayStr)

  let age = date.getFullYear() - birthYear
  if (
    date.getMonth() + 1 < birthMonth ||
    (date.getMonth() + 1 === birthMonth && date.getDate() < birthDay)
  ) {
    age -= 1
  }
  const yearCycle = ((age % 7) + 7) % 7 + 1

  let months = age * 12 + (date.getMonth() + 1 - birthMonth)
  if (date.getDate() < birthDay) months -= 1
  const monthCycle = ((months % 7) + 7) % 7 + 1

  const description = STAR_TEXT[star]?.[yearCycle - 1] ?? ''

  return { star, yearCycle, monthCycle, description }
}
