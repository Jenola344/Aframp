import type { FiatCurrency } from '@/types/onramp'

export function isValidStellarAddress(address: string) {
  if (!address) return false
  return /^G[A-Z2-7]{55}$/.test(address)
}
