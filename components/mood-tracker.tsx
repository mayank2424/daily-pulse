"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const MOODS = [
  { emoji: "😔", label: "Sad", color: "bg-blue-100 dark:bg-blue-900/30" },
  { emoji: "😐", label: "Neutral", color: "bg-slate-100 dark:bg-slate-800" },
  { emoji: "🙂", label: "Good", color: "bg-green-100 dark:bg-green-900/30" },
  { emoji: "😄", label: "Great", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { emoji: "🤩", label: "Amazing", color: "bg-orange-100 dark:bg-orange-900/30" },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [habitImpact, setHabitImpact] = useState([
    { name: "Morning Meditation", impact: 4 },
    { name: "Exercise", impact: 5 },
    { name: "Reading", impact: 3 },
    { name: "Drinking Water", impact: 2 },
  ])

  return (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">How are you feeling today?</h4>
        <div className="flex justify-between">
          {MOODS.map((mood, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(index)}
              className={`flex h-12 w-12 flex-col items-center justify-center rounded-full ${
                selectedMood === index ? "ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-900" : mood.color
              }`}
            >
              <span className="text-xl">{mood.emoji}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Habits impact on mood</h4>
        <div className="space-y-2">
          {habitImpact.map((habit, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-32 truncate text-sm text-slate-700 dark:text-slate-300">{habit.name}</div>
              <div className="flex flex-1 gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + star * 0.05 }}
                    className={`h-4 w-4 rounded-full ${
                      star <= habit.impact
                        ? "bg-gradient-to-r from-amber-400 to-orange-500"
                        : "bg-slate-200 dark:bg-slate-700"
                    }`}
                  ></motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
