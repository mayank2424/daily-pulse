"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

// Array of motivational quotes
const QUOTES = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    text: "Habits are first cobwebs, then cables.",
    author: "Spanish Proverb",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Small changes eventually add up to huge results.",
    author: "Unknown",
  },
  {
    text: "A habit cannot be tossed out the window; it must be coaxed down the stairs a step at a time.",
    author: "Mark Twain",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    text: "The chains of habit are too weak to be felt until they are too strong to be broken.",
    author: "Samuel Johnson",
  },
  {
    text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.",
    author: "Benjamin Franklin",
  },
  {
    text: "Habits are the compound interest of self-improvement.",
    author: "James Clear",
  },
  {
    text: "You'll never change your life until you change something you do daily. The secret of your success is found in your daily routine.",
    author: "John C. Maxwell",
  },
]

export function QuoteCard() {
  const [quote, setQuote] = useState(QUOTES[0])

  useEffect(() => {
    // Select a random quote
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
            <Quote className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <p className="italic text-slate-700 dark:text-slate-300">"{quote.text}"</p>
            <p className="mt-1 text-right text-sm font-medium text-slate-500 dark:text-slate-400">— {quote.author}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
