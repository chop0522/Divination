export type Shichihou = {
  star: string
  yearCycle: number
  monthCycle: number
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

export function calcShichihou(birth: string): Shichihou {
  const [yearStr, monthStr, dayStr] = birth.split('-')
  const digits = [...yearStr, ...monthStr, ...dayStr]
    .map((c) => Number(c))
    .filter((n) => !isNaN(n))
  const sum = digits.reduce((a, b) => a + b, 0)

  let gemNum = reduceToSingle(sum)
  if (gemNum > 7) gemNum -= 7
  const star = getGemType(gemNum)

  const now = new Date()
  const birthYear = Number(yearStr)
  const birthMonth = Number(monthStr)
  const yearCycle = ((now.getFullYear() - birthYear) % 7 + 7) % 7 + 1
  const monthCycle = ((now.getMonth() + 1 - birthMonth) % 7 + 7) % 7 + 1

  return { star, yearCycle, monthCycle }
}
