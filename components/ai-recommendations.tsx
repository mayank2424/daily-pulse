"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const RECOMMENDATIONS = [
  {
    id: 1,
    name: "Evening Journaling",
    description: "Write down your thoughts before bed to clear your mind",
    icon: "✍️",
    color: "bg-violet-500",
  },
  {
    id: 2,
    name: "Mindful Breathing",
    description: "Take 5 minutes to focus on your breath and reduce stress",
    icon: "🧘",
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Daily Walk",
    description: "A 15-minute walk to boost your mood and energy",
    icon: "🚶",
    color: "bg-green-500",
  },
]

export function AIRecommendations() {
  const [currentRec, setCurrentRec] = useState(0)
  const [accepted, setAccepted] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRec((prev) => (prev + 1) % RECOMMENDATIONS.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleAccept = (id: number) => {
    if (!accepted.includes(id)) {
      setAccepted([...accepted, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-violet-500" />
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Personalized recommendations for you</h4>
      </div>

      <div className="relative h-[180px] overflow-hidden rounded-lg border bg-white dark:border-slate-700 dark:bg-slate-800">
        {RECOMMENDATIONS.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: currentRec === index ? 1 : 0,
              x: currentRec === index ? 0 : 100,
              zIndex: currentRec === index ? 10 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-4"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${rec.color} text-white`}>
                    <span className="text-lg">{rec.icon}</span>
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white">{rec.name}</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{rec.description}</p>
              </div>

              <div className="flex justify-end">
                {accepted.includes(rec.id) ? (
                  <Button variant="outline" disabled className="pointer-events-none">
                    <Check className="mr-1 h-4 w-4" /> Added to Habits
                  </Button>
                ) : (
                  <Button onClick={() => handleAccept(rec.id)}>Add to My Habits</Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute bottom-2 left-0 flex w-full justify-center gap-1">
          {RECOMMENDATIONS.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${
                currentRec === index ? "bg-violet-500" : "bg-slate-200 dark:bg-slate-700"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
