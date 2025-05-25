export function getZodiacSign(month: number, day: number): string {
  const value = month * 100 + day
  if (value >= 321 && value <= 419) return 'Aries'
  if (value >= 420 && value <= 520) return 'Taurus'
  if (value >= 521 && value <= 621) return 'Gemini'
  if (value >= 622 && value <= 722) return 'Cancer'
  if (value >= 723 && value <= 822) return 'Leo'
  if (value >= 823 && value <= 922) return 'Virgo'
  if (value >= 923 && value <= 1023) return 'Libra'
  if (value >= 1024 && value <= 1121) return 'Scorpio'
  if (value >= 1122 && value <= 1221) return 'Sagittarius'
  if (value >= 1222 || value <= 119) return 'Capricorn'
  if (value >= 120 && value <= 218) return 'Aquarius'
  return 'Pisces'
}
