export interface TokenBalance {
  symbol: string
  amount: number
  price?: number | null
  priceLoading?: boolean
  priceError?: string | null
  change?: number
  trend?: 'up' | 'down'
}

export interface Asset extends TokenBalance {
  id: string
  icon?: string
  volume?: number
  marketCap?: number
  isInWatchlist?: boolean
}

export interface BalanceData {
  balances: TokenBalance[]
  totalUsdValue: number
  lastUpdated: Date | null
}
