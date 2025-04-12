"use client"

import { Award, Check, Lock, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface AchievementsProps {
  habits: any[]
  fullView?: boolean
  onOpenAchievements?: () => void
}

export function Achievements({ habits, fullView = false, onOpenAchievements }: AchievementsProps) {
  // Calculate achievement progress
  const totalHabits = habits.length
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.completedDates.length, 0)
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0)
  const habitCategories = new Set(habits.map((h) => h.category).filter(Boolean)).size

  // Define achievements
  const achievements = [
    {
      id: "first-habit",
      name: "Getting Started",
      description: "Create your first habit",
      icon: <Trophy className="h-5 w-5 text-amber-500" />,
      progress: totalHabits > 0 ? 100 : 0,
      completed: totalHabits > 0,
      color: "from-amber-500 to-yellow-500",
    },
    {
      id: "three-habits",
      name: "Habit Collector",
      description: "Track 3 different habits",
      icon: <Trophy className="h-5 w-5 text-emerald-500" />,
      progress: Math.min(100, (totalHabits / 3) * 100),
      completed: totalHabits >= 3,
      color: "from-emerald-500 to-green-500",
    },
    {
      id: "streak-7",
      name: "Consistency Champion",
      description: "Maintain a 7-day streak on any habit",
      icon: <Award className="h-5 w-5 text-blue-500" />,
      progress: Math.min(100, (longestStreak / 7) * 100),
      completed: longestStreak >= 7,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: "streak-30",
      name: "Habit Master",
      description: "Maintain a 30-day streak on any habit",
      icon: <Award className="h-5 w-5 text-violet-500" />,
      progress: Math.min(100, (longestStreak / 30) * 100),
      completed: longestStreak >= 30,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "categories-3",
      name: "Balanced Life",
      description: "Track habits in 3 different categories",
      icon: <Award className="h-5 w-5 text-pink-500" />,
      progress: Math.min(100, (habitCategories / 3) * 100),
      completed: habitCategories >= 3,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "completions-50",
      name: "Dedication",
      description: "Complete habits 50 times in total",
      icon: <Trophy className="h-5 w-5 text-cyan-500" />,
      progress: Math.min(100, (totalCompletions / 50) * 100),
      completed: totalCompletions >= 50,
      color: "from-cyan-500 to-teal-500",
    },
  ]

  // Filter achievements for compact view
  const displayAchievements = fullView ? achievements : achievements.slice(0, 3)

  return (
    <div className="space-y-4">
      {!fullView && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Your Achievements</h2>
          <button
            onClick={onOpenAchievements}
            className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View All
          </button>
        </div>
      )}

      <div className={`grid gap-4 ${fullView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {displayAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={cn(
              "overflow-hidden transition-all duration-300",
              achievement.completed
                ? "border-slate-200 dark:border-slate-700"
                : "border-slate-200 opacity-70 dark:border-slate-800",
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br",
                    achievement.completed
                      ? achievement.color
                      : "from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600",
                  )}
                >
                  {achievement.completed ? (
                    achievement.icon
                  ) : (
                    <Lock className="h-5 w-5 text-slate-100 dark:text-slate-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100">{achievement.name}</h3>
                    {achievement.completed && <Check className="h-4 w-4 text-green-500" />}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{achievement.description}</p>
                  <Progress
                    value={achievement.progress}
                    className="mt-2 h-1.5"
                    indicatorClassName={cn(
                      "bg-gradient-to-r",
                      achievement.completed
                        ? achievement.color
                        : "from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600",
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
