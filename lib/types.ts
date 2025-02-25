export interface Trade {
  id: string
  symbol: string
  company: string
  price: number
  change: number
  risk: "low" | "medium" | "high"
  analysis: string
  timeframe: string
  timestamp?: number
  savedPrice?: number
}

