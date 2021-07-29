export const leftFillZero = (num: number | undefined, length: number) => {
  if (!num) num = 0
  return num.toString().padStart(length, '0')
}

const numberFormat = new Intl.NumberFormat()

export const format = (amount: number) => `${numberFormat.format(amount)} KILT`

export * from './chain'
