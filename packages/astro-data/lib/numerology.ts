export function getLifePathNumber(dateString: string): number {
  const digits = dateString.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((acc, n) => acc + n, 0)
  const master = [11, 22, 33]
  while (sum > 9 && !master.includes(sum)) {
    sum = sum.toString().split('').reduce((acc, n) => acc + Number(n), 0)
  }
  return sum
}
