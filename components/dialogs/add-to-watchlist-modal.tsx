'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { AssetCard } from '@/components/assets/asset-card'
import { Asset } from '@/types/balance'
import { Search } from 'lucide-react'

// Mock recommended assets
const MOCK_RECOMMENDED_ASSETS: Asset[] = [
  {
    id: 'btc-rec-1',
    symbol: 'BTC',
    amount: 0,
    price: 45000,
    change: -2.1,
    trend: 'down',
    volume: 32100000000,
    marketCap: 900000000000,
    isInWatchlist: false,
  },
  {
    id: 'eth-rec-1',
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
    id: 'sol-rec-1',
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
    id: 'bnb-rec-1',
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
    id: 'xrp-rec-1',
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
    id: 'ada-rec-1',
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
    id: 'doge-rec-1',
    symbol: 'DOGE',
    amount: 0,
    price: 0.38,
    change: 22.4,
    trend: 'up',
    volume: 1200000000,
    marketCap: 56000000000,
    isInWatchlist: false,
  },
  {
    id: 'usdt-rec-1',
    symbol: 'USDT',
    amount: 0,
    price: 1.0,
    change: 0.1,
    trend: 'up',
    volume: 89000000000,
    marketCap: 118000000000,
    isInWatchlist: false,
  },
]

interface AddToWatchlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssetAdded?: (asset: Asset) => void
}

export function AddToWatchlistModal({
  open,
  onOpenChange,
  onAssetAdded,
}: AddToWatchlistModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [addedAssets, setAddedAssets] = useState<Set<string>>(new Set())

  const filteredAssets = MOCK_RECOMMENDED_ASSETS.filter((asset) =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddAsset = (asset: Asset) => {
    const newAdded = new Set(addedAssets)
    newAdded.add(asset.id)
    setAddedAssets(newAdded)

    // Call parent callback
    onAssetAdded?.(asset)

    // Show feedback by resetting after a delay
    setTimeout(() => {
      newAdded.delete(asset.id)
      setAddedAssets(new Set(newAdded))
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add to Watchlist</DialogTitle>
          <DialogDescription>
            Explore and add crypto assets to your watchlist to monitor their performance
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assets by symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={{
                  ...asset,
                  isInWatchlist: addedAssets.has(asset.id),
                }}
                variant="add-to-watchlist"
                onAddClick={() => handleAddAsset(asset)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No assets found matching your search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
