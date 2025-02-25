"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradeCard } from "@/components/trade-card"
import { useTrades } from "@/lib/use-trades"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("low")
  const { tradeIdeas } = useTrades()

  const filteredTrades = tradeIdeas.filter((trade) => trade.risk === activeTab)

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Trade Ideas</h1>
        <p className="text-muted-foreground">AI-generated trade ideas based on market analysis and trends.</p>
      </div>

      <Tabs defaultValue="low" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="low">Low Risk</TabsTrigger>
          <TabsTrigger value="medium">Medium Risk</TabsTrigger>
          <TabsTrigger value="high">High Risk</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="space-y-4">
            {filteredTrades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

