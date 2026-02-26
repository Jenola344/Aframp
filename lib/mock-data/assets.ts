import { Asset } from '@/types/balance'

export const MOCK_ASSETS: Record<string, Asset> = {
  'btc-1': {
    id: 'btc-1',
    symbol: 'BTC',
    amount: 0.15,
    price: 45000,
    change: -2.1,
    trend: 'down',
    volume: 32100000000,
    marketCap: 900000000000,
    isInWatchlist: true,
  },
  'eth-1': {
    id: 'eth-1',
    symbol: 'ETH',
    amount: 2.5,
    price: 3200,
    change: 5.2,
    trend: 'up',
    volume: 24500000000,
    marketCap: 385000000000,
    isInWatchlist: true,
  },
  'sol-1': {
    id: 'sol-1',
    symbol: 'SOL',
    amount: 10,
    price: 195,
    change: 8.3,
    trend: 'up',
    volume: 3800000000,
    marketCap: 92000000000,
    isInWatchlist: false,
  },
  'bnb-1': {
    id: 'bnb-1',
    symbol: 'BNB',
    amount: 5.0,
    price: 550,
    change: 12.5,
    trend: 'up',
    volume: 2100000000,
    marketCap: 85000000000,
    isInWatchlist: true,
  },
  'xrp-1': {
    id: 'xrp-1',
    symbol: 'XRP',
    amount: 1000,
    price: 2.45,
    change: 15.8,
    trend: 'up',
    volume: 5200000000,
    marketCap: 135000000000,
    isInWatchlist: false,
  },
  'ada-1': {
    id: 'ada-1',
    symbol: 'ADA',
    amount: 1000,
    price: 0.98,
    change: 3.1,
    trend: 'up',
    volume: 890000000,
    marketCap: 35000000000,
    isInWatchlist: false,
  },
  'doge-1': {
    id: 'doge-1',
    symbol: 'DOGE',
    amount: 5000,
    price: 0.38,
    change: 22.4,
    trend: 'up',
    volume: 1200000000,
    marketCap: 56000000000,
    isInWatchlist: false,
  },
  'usdc-1': {
    id: 'usdc-1',
    symbol: 'USDC',
    amount: 1000,
    price: 1.0,
    change: 0.0,
    trend: 'up',
    volume: 4800000000,
    marketCap: 30000000000,
    isInWatchlist: true,
  },
  'usdt-1': {
    id: 'usdt-1',
    symbol: 'USDT',
    amount: 2000,
    price: 1.0,
    change: 0.1,
    trend: 'up',
    volume: 89000000000,
    marketCap: 118000000000,
    isInWatchlist: false,
  },
}

export function getTrendingAssets(): Asset[] {
  return [
    MOCK_ASSETS['eth-1'],
    MOCK_ASSETS['sol-1'],
    MOCK_ASSETS['bnb-1'],
    MOCK_ASSETS['xrp-1'],
    MOCK_ASSETS['ada-1'],
    MOCK_ASSETS['doge-1'],
  ]
}

export function getWatchlistAssets(): Asset[] {
  return Object.values(MOCK_ASSETS).filter((asset) => asset.isInWatchlist)
}

export function getRecommendedAssets(): Asset[] {
  return Object.values(MOCK_ASSETS)
}
