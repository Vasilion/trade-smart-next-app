"use client"

import { ArrowDown, ArrowUp, Timer, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTrades } from "@/lib/use-trades"
import type { Trade } from "@/lib/types"

export function SavedTradeCard({ trade }: { trade: Trade }) {
  const { removeTrade } = useTrades()
  const savedPrice = trade.savedPrice || trade.price
  const currentPrice = trade.price
  const profitLoss = ((currentPrice - savedPrice) / savedPrice) * 100
  const timeSaved = new Date(trade.timestamp || Date.now()).toLocaleDateString()

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{trade.symbol}</CardTitle>
          <Badge
            variant="outline"
            className={profitLoss >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}
          >
            {profitLoss >= 0 ? "+" : ""}
            {profitLoss.toFixed(2)}%
          </Badge>
        </div>
        <CardDescription>{trade.company}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">${currentPrice}</span>
              <span className={`flex items-center ${trade.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {trade.change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {Math.abs(trade.change)}%
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span className="text-sm">Saved on {timeSaved}</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Entry Price</span>
              <span>${savedPrice}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Current Price</span>
              <span>${currentPrice}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full" onClick={() => removeTrade(trade.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Remove Trade
        </Button>
      </CardFooter>
    </Card>
  )
}

