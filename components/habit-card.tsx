"use client"

import { Check, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HabitCardProps {
  habit: {
    id: string
    name: string
    streak: number
    goal: string
    color: string
    icon: string
    category?: string
  }
  onComplete: () => void
  onSelect: () => void
  isCompleted: boolean
}

export function HabitCard({ habit, onComplete, onSelect, isCompleted }: HabitCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        isCompleted ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20" : "",
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-center pl-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onComplete()
            }}
            className={cn(
              "flex h-10 w-10 flex-shrink-0 items-center justify-center transition-colors rounded-xl",
              isCompleted ? "bg-green-500 text-white" : habit.color + " text-white",
            )}
          >
            {isCompleted ? <Check className="h-8 w-8 rounded-xl" /> : <span className="text-lg">{habit.icon}</span>}
          </button>
          <div className="flex flex-1 items-center justify-between p-4" onClick={onSelect}>
            <div>
              <h3 className="font-medium text-slate-800 dark:text-slate-100">{habit.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">{habit.goal}</span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex h-5 items-center rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                    {habit.streak} day streak
                  </span>
                  {habit.category && (
                    <Badge variant="outline" className="h-5 px-2 text-xs">
                      {habit.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
