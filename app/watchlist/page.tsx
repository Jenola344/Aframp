import { Suspense } from 'react'
import { WatchlistPageClient } from '@/components/watchlist/watchlist-page-client'

export const metadata = {
  title: 'Watchlist | Aframp',
  description: 'Manage your watchlist of crypto assets',
}

export default function WatchlistPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading watchlist...</p>
          </div>
        </div>
      }
    >
      <WatchlistPageClient />
    </Suspense>
  )
}
