export function getLifePathNumber(birth: string) {
  // birth = "YYYY-MM-DD"
  const digits = birth.replaceAll('-', '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = String(sum).split('').reduce((a, b) => a + +b, 0);
  }
  return sum;
}
