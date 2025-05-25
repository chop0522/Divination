export function getLifePathNumber(birth: string) {
  // birth = "YYYY-MM-DD"
  const digits = birth.replaceAll('-', '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = String(sum).split('').reduce((a, b) => a + +b, 0);
  }
  return sum;
}

export function getZodiacSign(birth: string): string {
  const [, monthStr, dayStr] = birth.split('-');
  const month = Number(monthStr);
  const day = Number(dayStr);
  const value = month * 100 + day;

  if (value >= 120 && value <= 218) return 'Aquarius';
  if (value >= 219 && value <= 320) return 'Pisces';
  if (value >= 321 && value <= 419) return 'Aries';
  if (value >= 420 && value <= 520) return 'Taurus';
  if (value >= 521 && value <= 621) return 'Gemini';
  if (value >= 622 && value <= 722) return 'Cancer';
  if (value >= 723 && value <= 822) return 'Leo';
  if (value >= 823 && value <= 922) return 'Virgo';
  if (value >= 923 && value <= 1022) return 'Libra';
  if (value >= 1023 && value <= 1121) return 'Scorpio';
  if (value >= 1122 && value <= 1221) return 'Sagittarius';
  return 'Capricorn';
}
