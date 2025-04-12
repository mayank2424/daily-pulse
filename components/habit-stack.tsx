"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HabitStack() {
  const [stacks] = useState([
    {
      id: 1,
      name: "Morning Routine",
      habits: [
        { name: "Drink Water", icon: "💧", color: "bg-blue-500" },
        { name: "Meditation", icon: "🧘", color: "bg-violet-500" },
        { name: "Exercise", icon: "💪", color: "bg-red-500" },
      ],
    },
    {
      id: 2,
      name: "Evening Routine",
      habits: [
        { name: "Reading", icon: "📚", color: "bg-amber-500" },
        { name: "Journaling", icon: "✍️", color: "bg-green-500" },
      ],
    },
  ])

  return (
    <div className="space-y-4">
      {stacks.map((stack) => (
        <div key={stack.id} className="rounded-lg border p-3 dark:border-slate-700">
          <h3 className="mb-2 font-medium text-slate-900 dark:text-white">{stack.name}</h3>
          <div className="flex items-center">
            {stack.habits.map((habit, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${habit.color} text-white`}
                >
                  <span>{habit.icon}</span>
                </div>
                {index < stack.habits.length - 1 && <ArrowRight className="mx-2 h-4 w-4 text-slate-400" />}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-700">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Stack your habits to build powerful routines
        </div>
      </div>
    </div>
  )
}
