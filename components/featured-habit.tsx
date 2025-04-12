"use client"

import { Award, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface FeaturedHabitProps {
  habit: {
    id: string
    name: string
    streak: number
    goal: string
    color: string
    icon: string
    completedDates: string[]
  }
  onComplete: (id: string) => void
}

export function FeaturedHabit({ habit, onComplete }: FeaturedHabitProps) {
  const today = new Date().toISOString().split("T")[0]
  const isCompleted = habit.completedDates.includes(today)

  // Calculate streak percentage for visual
  const streakPercentage = Math.min(100, (habit.streak / 30) * 100)

  return (
    <Card className="overflow-hidden border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 dark:border-amber-900/50 dark:from-amber-950/30 dark:to-yellow-950/30">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className={cn("flex items-center justify-center p-6 text-white", habit.color)}>
            <span className="text-4xl">{habit.icon}</span>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-800 dark:text-amber-300">Featured Streak</h3>
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{habit.name}</h2>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {habit.streak} day streak
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Goal: 30 days</span>
                  </div>
                  <Progress
                    value={streakPercentage}
                    className="h-2"
                    indicatorClassName="bg-gradient-to-r from-amber-500 to-yellow-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                variant={isCompleted ? "outline" : "default"}
                className={
                  isCompleted
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400"
                    : ""
                }
                onClick={() => onComplete(habit.id)}
              >
                {isCompleted ? (
                  <>
                    <Check className="mr-1 h-4 w-4" /> Completed Today
                  </>
                ) : (
                  "Mark Complete"
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
