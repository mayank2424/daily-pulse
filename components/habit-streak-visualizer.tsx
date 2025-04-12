"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function HabitStreakVisualizer() {
  const [streaks, setStreaks] = useState([
    { id: 1, name: "Meditation", streak: 12, color: "bg-violet-500" },
    { id: 2, name: "Reading", streak: 8, color: "bg-blue-500" },
    { id: 3, name: "Exercise", streak: 21, color: "bg-emerald-500" },
  ])

  useEffect(() => {
    // Simulate streak growth animation
    const interval = setInterval(() => {
      setStreaks((prev) =>
        prev.map((streak) => ({
          ...streak,
          streak: Math.min(streak.streak + 1, 30),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {streaks.map((streak) => (
        <div key={streak.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{streak.name}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">{streak.streak} days</span>
          </div>
          <div className="h-8 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              className={`h-full ${streak.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${(streak.streak / 30) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex h-full items-center justify-end">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
                  🔥
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}
