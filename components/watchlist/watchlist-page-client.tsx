'use client'

import { useState } from 'react'
import { AssetCard } from '@/components/assets/asset-card'
import { Asset } from '@/types/balance'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Mock watchlist data
const MOCK_WATCHLIST: Asset[] = [
  {
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
  {
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
  {
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
  {
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
]

export function WatchlistPageClient() {
  const [watchlist, setWatchlist] = useState<Asset[]>(MOCK_WATCHLIST)

  const handleRemoveFromWatchlist = (assetId: string) => {
    setWatchlist((prev) => prev.filter((asset) => asset.id !== assetId))
  }

  const isEmpty = watchlist.length === 0

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Watchlist</h1>
          <p className="text-muted-foreground">
            {isEmpty
              ? 'You have no assets in your watchlist yet.'
              : `You are watching ${watchlist.length} asset${watchlist.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">No assets yet</h2>
              <p className="text-muted-foreground mb-6">
                Start by adding assets from the Trending section on your dashboard
              </p>
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                variant="watchlist"
                onRemoveClick={() => handleRemoveFromWatchlist(asset.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
