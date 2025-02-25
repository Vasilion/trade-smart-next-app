"use client"

import { useState, useEffect } from "react"
import type { Trade } from "./types"

const MOCK_TRADES: Trade[] = [
  {
    id: "1",
    symbol: "AAPL",
    company: "Apple Inc.",
    price: 175.43,
    change: 2.3,
    risk: "low",
    analysis:
      "Strong technical support at $170, potential breakout above $180. Recent iPhone sales data suggests strong consumer demand continuing into Q2. Multiple analysts have raised price targets.",
    timeframe: "2-4 weeks",
  },
  {
    id: "2",
    symbol: "MSFT",
    company: "Microsoft Corporation",
    price: 328.79,
    change: 1.2,
    risk: "low",
    analysis:
      "Cloud revenue growth remains strong, AI integration driving new opportunities. Technical indicators suggest accumulation phase with decreasing volatility.",
    timeframe: "3-4 weeks",
  },
  {
    id: "3",
    symbol: "JNJ",
    company: "Johnson & Johnson",
    price: 156.32,
    change: 0.8,
    risk: "low",
    analysis:
      "Defensive play with strong dividend history. Healthcare sector showing resilience in current market conditions. Support level established at $154.",
    timeframe: "1-2 months",
  },
  {
    id: "4",
    symbol: "TSLA",
    company: "Tesla, Inc.",
    price: 245.67,
    change: -1.5,
    risk: "medium",
    analysis:
      "Consolidating near support, watch for reversal patterns. New factory announcements could provide catalyst. High volatility expected around upcoming earnings.",
    timeframe: "1-2 weeks",
  },
  {
    id: "5",
    symbol: "AMD",
    company: "Advanced Micro Devices, Inc.",
    price: 142.89,
    change: 2.1,
    risk: "medium",
    analysis:
      "AI chip demand driving growth. Potential short-term pullback presents buying opportunity. Watch $140 support level.",
    timeframe: "2-3 weeks",
  },
  {
    id: "6",
    symbol: "PYPL",
    company: "PayPal Holdings, Inc.",
    price: 62.45,
    change: -0.9,
    risk: "medium",
    analysis:
      "Oversold conditions on daily RSI. Fintech sector showing signs of recovery. Key resistance at $65 could trigger momentum shift.",
    timeframe: "2-4 weeks",
  },
  {
    id: "7",
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    price: 432.89,
    change: 3.7,
    risk: "high",
    analysis:
      "AI momentum continues, potential pullback to $400 support. High volatility expected. Strong momentum but extended from moving averages.",
    timeframe: "1-3 days",
  },
  {
    id: "8",
    symbol: "COIN",
    company: "Coinbase Global, Inc.",
    price: 84.56,
    change: -2.8,
    risk: "high",
    analysis:
      "Crypto market volatility creating swing opportunities. Bitcoin ETF approval could be major catalyst. Technical setup suggests potential breakout.",
    timeframe: "1-2 weeks",
  },
  {
    id: "9",
    symbol: "MSTR",
    company: "MicroStrategy Incorporated",
    price: 478.23,
    change: 4.2,
    risk: "high",
    analysis:
      "Bitcoin proxy play showing strong momentum. High beta to crypto markets. Volatile moves expected with upcoming Bitcoin halving.",
    timeframe: "1 week",
  },
]

export function useTrades() {
  const [tradeIdeas] = useState<Trade[]>(MOCK_TRADES)
  const [savedTrades, setSavedTrades] = useState<Trade[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("savedTrades")
    if (saved) {
      setSavedTrades(JSON.parse(saved))
    }
  }, [])

  const saveTrade = async (trade: Trade) => {
    const savedTrade = {
      ...trade,
      timestamp: Date.now(),
      savedPrice: trade.price,
    }
    const updatedTrades = [...savedTrades, savedTrade]
    setSavedTrades(updatedTrades)
    localStorage.setItem("savedTrades", JSON.stringify(updatedTrades))
  }

  const isTradeSaved = (id: string) => {
    return savedTrades.some((trade) => trade.id === id)
  }

  const removeTrade = (id: string) => {
    const updatedTrades = savedTrades.filter((trade) => trade.id !== id)
    setSavedTrades(updatedTrades)
    localStorage.setItem("savedTrades", JSON.stringify(updatedTrades))
  }

  return {
    tradeIdeas,
    savedTrades,
    saveTrade,
    isTradeSaved,
    removeTrade,
  }
}

