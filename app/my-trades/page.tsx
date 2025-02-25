"use client"

import { useTrades } from "@/lib/use-trades"
import { SavedTradeCard } from "@/components/saved-trade-card"

export default function MyTradesPage() {
  const { savedTrades } = useTrades()

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">My Trades</h1>
        <p className="text-muted-foreground">Track your saved trades and their performance.</p>
      </div>

      {savedTrades.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-lg font-medium">No trades saved yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">Start by saving some trades from the Trade Ideas feed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedTrades.map((trade) => (
            <SavedTradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      )}
    </div>
  )
}

