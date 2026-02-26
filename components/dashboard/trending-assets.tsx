'use client'

import { useState } from 'react'
import { AssetCard } from '@/components/assets/asset-card'
import { Asset } from '@/types/balance'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Mock trending data
const MOCK_TRENDING_ASSETS: Asset[] = [
  {
    id: 'eth-trending-1',
    symbol: 'ETH',
    amount: 0,
    price: 3200,
    change: 5.2,
    trend: 'up',
    volume: 24500000000,
    marketCap: 385000000000,
    isInWatchlist: false,
  },
  {
    id: 'sol-trending-1',
    symbol: 'SOL',
    amount: 0,
    price: 195,
    change: 8.3,
    trend: 'up',
    volume: 3800000000,
    marketCap: 92000000000,
    isInWatchlist: false,
  },
  {
    id: 'bnb-trending-1',
    symbol: 'BNB',
    amount: 0,
    price: 550,
    change: 12.5,
    trend: 'up',
    volume: 2100000000,
    marketCap: 85000000000,
    isInWatchlist: false,
  },
  {
    id: 'xrp-trending-1',
    symbol: 'XRP',
    amount: 0,
    price: 2.45,
    change: 15.8,
    trend: 'up',
    volume: 5200000000,
    marketCap: 135000000000,
    isInWatchlist: false,
  },
  {
    id: 'ada-trending-1',
    symbol: 'ADA',
    amount: 0,
    price: 0.98,
    change: 3.1,
    trend: 'up',
    volume: 890000000,
    marketCap: 35000000000,
    isInWatchlist: false,
  },
  {
    id: 'doge-trending-1',
    symbol: 'DOGE',
    amount: 0,
    price: 0.38,
    change: 22.4,
    trend: 'up',
    volume: 1200000000,
    marketCap: 56000000000,
    isInWatchlist: false,
  },
]

interface TrendingAssetsProps {
  onAddToWatchlist?: (asset: Asset) => void
}

export function TrendingAssets({ onAddToWatchlist }: TrendingAssetsProps) {
  const [trendingAssets, setTrendingAssets] = useState<Asset[]>(MOCK_TRENDING_ASSETS)

  const handleAddToWatchlist = (asset: Asset) => {
    // Update local state
    setTrendingAssets((prev) =>
      prev.map((a) => (a.id === asset.id ? { ...a, isInWatchlist: true } : a))
    )

    // Call parent callback if provided
    onAddToWatchlist?.(asset)
  }

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trending Assets</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Top performing assets in the market today
          </p>
        </div>
        <Link href="/watchlist">
          <Button variant="outline" size="sm" className="gap-2">
            View Watchlist
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendingAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            variant="trending"
            onAddClick={() => handleAddToWatchlist(asset)}
            showVolume={true}
          />
        ))}
      </div>
    </section>
  )
}
