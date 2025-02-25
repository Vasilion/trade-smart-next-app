"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTrades } from "@/lib/use-trades"
import type { Trade } from "@/lib/types"

export function TradeCard({ trade }: { trade: Trade }) {
  const { saveTrade, isTradeSaved } = useTrades()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveTrade = async () => {
    setIsLoading(true)
    await saveTrade(trade)
    setIsLoading(false)
  }

  const riskColors = {
    low: "bg-green-500/10 text-green-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-red-500/10 text-red-500",
  }

  return (
    <Card className="glass-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{trade.symbol}</CardTitle>
            <CardDescription className="text-base">{trade.company}</CardDescription>
          </div>
          <Badge variant="outline" className={riskColors[trade.risk]}>
            {trade.risk.charAt(0).toUpperCase() + trade.risk.slice(1)} Risk
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">${trade.price}</span>
              <span className={`flex items-center ${trade.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {trade.change >= 0 ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
                {Math.abs(trade.change)}%
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Timer className="h-4 w-4" />
              <span className="text-sm">{trade.timeframe}</span>
            </div>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{trade.analysis}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-base py-6"
          onClick={handleSaveTrade}
          disabled={isTradeSaved(trade.id) || isLoading}
        >
          {isTradeSaved(trade.id) ? "Trade Saved" : "Take Trade"}
        </Button>
      </CardFooter>
    </Card>
  )
}

