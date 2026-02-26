'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Asset } from '@/types/balance'
import { Button } from '@/components/ui/button'

type AssetCardVariant = 'watchlist' | 'trending' | 'add-to-watchlist'

interface AssetCardProps {
  asset: Asset
  variant?: AssetCardVariant
  onAddClick?: () => void
  onRemoveClick?: () => void
  showChart?: boolean
  showVolume?: boolean
}

export function AssetCard({
  asset,
  variant = 'watchlist',
  onAddClick,
  onRemoveClick,
  showChart = true,
  showVolume = false,
}: AssetCardProps) {
  const { symbol, amount, price, change, trend, volume, marketCap, isInWatchlist } = asset

  // Format amount with appropriate decimals
  const formatAmount = (value: number, symbol: string) => {
    if (symbol === 'cNGN') {
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
    }
    return value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 8 })
  }

  // Calculate USD value
  const usdValue = price && amount ? amount * price : null
  const displayUsdValue = usdValue
    ? `$${usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : '—'

  // Format change percentage
  const displayChange = change !== undefined ? `${change > 0 ? '+' : ''}${change.toFixed(2)}%` : null

  // Format volume and market cap
  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`
    return `$${num.toFixed(0)}`
  }

  const displayVolume = volume ? formatLargeNumber(volume) : null
  const displayMarketCap = marketCap ? formatLargeNumber(marketCap) : null

  // Determine card styling based on variant
  const isAddVariant = variant === 'add-to-watchlist'
  const cardClasses = cn(
    'rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-all',
    'flex flex-col',
    isAddVariant ? 'p-4 w-full' : 'p-4 w-full'
  )

  const headerClasses = cn('flex items-center justify-between mb-3', isAddVariant && 'mb-2')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cardClasses}
    >
      {/* Header: Symbol and Action Button */}
      <div className={headerClasses}>
        <div className="flex items-center gap-3 flex-1">
          {/* Icon placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary">{symbol.charAt(0)}</span>
          </div>
          <span className="text-sm font-semibold text-foreground">{symbol}</span>
        </div>

        {/* Action Button: Remove (Watchlist) or Add (Trending/Add-to-Watchlist) */}
        {variant === 'watchlist' && onRemoveClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveClick}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        {variant === 'trending' && onAddClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddClick}
            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
          >
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-2 flex-1">
        {/* Price and Change */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">{displayUsdValue}</h3>
          {displayChange && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend === 'up'
                    ? 'text-green-500'
                    : trend === 'down'
                      ? 'text-red-500'
                      : 'text-muted-foreground'
                )}
              >
                {displayChange}
              </span>
              {trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 text-red-500" />}
            </div>
          )}
        </div>

        {/* Trending Variant: Volume and Market Cap */}
        {variant === 'trending' && (displayVolume || displayMarketCap) && (
          <div className="pt-2 space-y-2 text-xs text-muted-foreground">
            {displayVolume && (
              <div className="flex justify-between items-center">
                <span>24h Volume</span>
                <span className="font-medium text-foreground">{displayVolume}</span>
              </div>
            )}
            {displayMarketCap && (
              <div className="flex justify-between items-center">
                <span>Market Cap</span>
                <span className="font-medium text-foreground">{displayMarketCap}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Button for Add-to-Watchlist Variant */}
      {isAddVariant && onAddClick && (
        <Button
          onClick={onAddClick}
          size="sm"
          className="w-full mt-3 gap-2"
          variant={isInWatchlist ? 'outline' : 'default'}
        >
          <Plus className="w-4 h-4" />
          {isInWatchlist ? 'Added' : 'Add to Watchlist'}
        </Button>
      )}
    </motion.div>
  )
}
