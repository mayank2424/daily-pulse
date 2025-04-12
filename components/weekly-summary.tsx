"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WeeklySummaryProps {
  habits: any[]
}

export function WeeklySummary({ habits }: WeeklySummaryProps) {
  // Generate data for the last 7 days
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    return {
      date: date.toISOString().split("T")[0],
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNum: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
    }
  })

  // Calculate completion for each day
  const weekData = last7Days.map((day) => {
    const totalForDay = habits.length
    const completedForDay = habits.filter((habit) => habit.completedDates.includes(day.date)).length
    const completionRate = totalForDay > 0 ? (completedForDay / totalForDay) * 100 : 0

    return {
      ...day,
      completed: completedForDay,
      total: totalForDay,
      rate: completionRate,
    }
  })

  return (
    <div className="flex flex-col w-full items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex-self-start">Overview</h2>
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between w-full">
            {weekData.map((day) => (
              <div key={day.date} className="flex flex-col items-center">
                <span
                  className={cn(
                    "text-xs font-medium",
                    day.isToday ? "text-violet-600 dark:text-violet-400" : "text-slate-500 dark:text-slate-400",
                  )}
                >
                  {day.dayName}
                </span>
                <div
                  className={cn(
                    "mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium",
                    day.isToday
                      ? "bg-violet-100 text-violet-700 ring-2 ring-violet-500 dark:bg-violet-900/30 dark:text-violet-300"
                      : "text-slate-700 dark:text-slate-300",
                  )}
                >
                  {day.dayNum}
                </div>
                <div className="mt-2 h-20 w-3 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={cn(
                      "rounded-full",
                      day.rate > 0
                        ? day.rate >= 100
                          ? "bg-green-500"
                          : day.rate >= 50
                            ? "bg-amber-500"
                            : "bg-blue-500"
                        : "",
                    )}
                    style={{
                      height: `${day.rate}%`,
                      width: "100%",
                      transition: "height 0.5s ease",
                    }}
                  />
                </div>
                <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  {day.completed}/{day.total}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
