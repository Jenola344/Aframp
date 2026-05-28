'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FiatCurrency } from '@/types/onramp'
import type { OfframpAsset, OfframpChain } from '@/types/offramp'

const RATE_REFRESH_SECONDS = 30
const API_URL = '/api/exchange-rate'

export function useOfframpRate(asset: OfframpAsset, chain: OfframpChain, fiat: string = 'NGN') {
const coinGeckoIds: Record<OfframpAsset, string> = {
  cNGN: 'usd-coin',
  USDC: 'usd-coin',
  USDT: 'tether',
  XLM: 'stellar',
}

const fiatCurrencyKeys: Record<FiatCurrency, string> = {
  NGN: 'ngn',
  KES: 'kes',
  GHS: 'ghs',
  ZAR: 'zar',
  UGX: 'ugx',
}

export function useOfframpRate(
  asset: OfframpAsset,
  chain: OfframpChain,
  fiatCurrency: FiatCurrency
) {
  const [countdown, setCountdown] = useState(RATE_REFRESH_SECONDS)
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rate, setRate] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch rates')
      const data = await response.json()
      
      const lowerFiat = fiat.toLowerCase()
      const usdcPrice = data['usd-coin']?.[lowerFiat] || 1600
      const xlmPrice = data.stellar?.[lowerFiat] || 180

      let baseRate = usdcPrice
      if (asset === 'XLM') {
        baseRate = xlmPrice
      } else if (asset === 'cNGN') {
        baseRate = usdcPrice * 0.99 // Slight discount for local stablecoin
      }

      const chainMultiplier =
        chain === 'Ethereum' ? 1.01 : chain === 'Polygon' ? 0.995 : chain === 'Base' ? 1.002 : 1
      
      setRate(baseRate * chainMultiplier)
  const fetchRate = useCallback(async () => {
    const coinId = coinGeckoIds[asset]
    const fiatKey = fiatCurrencyKeys[fiatCurrency]

    try {
      const res = await fetch('/api/exchange-rate')
      if (!res.ok) throw new Error('Rate fetch failed')
      const data = await res.json()
      const baseRate = data[coinId]?.[fiatKey] ?? 0

      const chainMultiplier =
        chain === 'Ethereum' ? 1.01 : chain === 'Polygon' ? 0.995 : chain === 'Base' ? 1.002 : 1

      setRate(baseRate * chainMultiplier)
    } catch {
      setRate(0)
    }
  }, [asset, chain, fiatCurrency])

  const refresh = useCallback(() => {
    setIsLoading(true)
    fetchRate().then(() => {
      setLastUpdated(Date.now())
      setCountdown(RATE_REFRESH_SECONDS)
    } catch (error) {
      console.error('Offramp rate error:', error)
      // Fallback to mock rate if API fails
      const mockRate = asset === 'XLM' ? 180 : 1600
      setRate(mockRate)
    } finally {
      setIsLoading(false)
    }
  }, [asset, chain, fiat])

  useEffect(() => {
    refresh()
  }, [asset, chain, refresh])
    })
  }, [fetchRate])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          refresh()
          return RATE_REFRESH_SECONDS
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [refresh])

  return {
    rate,
    countdown,
    lastUpdated,
    isLoading,
    refresh,
  }
}
