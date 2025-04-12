"use client"

import { BarChart, LineChart } from "recharts"
import { BarChart3, Calendar, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line, ResponsiveContainer } from "recharts"

interface InsightsPanelProps {
  habits: any[]
  fullView?: boolean
  onOpenInsights?: () => void
}

export function InsightsPanel({ habits, fullView = false, onOpenInsights }: InsightsPanelProps) {
  // Generate data for charts
  const today = new Date()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  // Daily completion data
  const dailyCompletionData = last7Days.map((date) => {
    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "short" })
    const totalForDay = habits.length
    const completedForDay = habits.filter((habit) => habit.completedDates.includes(date)).length
    const completionRate = totalForDay > 0 ? Math.round((completedForDay / totalForDay) * 100) : 0

    return {
      day: dayName,
      completed: completedForDay,
      total: totalForDay,
      rate: completionRate,
    }
  })

  // Category distribution
  const categoryData = habits.reduce((acc, habit) => {
    const category = habit.category || "Uncategorized"
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  const categoryChartData = Object.entries(categoryData).map(([name, count]) => ({
    name,
    count,
  }))

  // Time of day data (based on reminder times)
  const timeData = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  }

  habits.forEach((habit) => {
    if (!habit.reminderTime) return

    const hour = Number.parseInt(habit.reminderTime.split(":")[0], 10)

    if (hour >= 5 && hour < 12) timeData.morning++
    else if (hour >= 12 && hour < 17) timeData.afternoon++
    else if (hour >= 17 && hour < 21) timeData.evening++
    else timeData.night++
  })

  const timeChartData = [
    { name: "Morning", count: timeData.morning },
    { name: "Afternoon", count: timeData.afternoon },
    { name: "Evening", count: timeData.evening },
    { name: "Night", count: timeData.night },
  ]

  return (
    <div className="space-y-6">
      {!fullView && (
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Habit Insights</h2>
          <Button variant="outline" size="sm" onClick={onOpenInsights}>
            <BarChart3 className="mr-1 h-4 w-4" /> View Detailed Insights
          </Button>
        </div>
      )}

      <div className={`grid gap-6 ${fullView ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {/* Daily Completion Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-violet-500" />
              <CardTitle className="text-base">Daily Completion Rate</CardTitle>
            </div>
            <CardDescription>Your habit completion over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyCompletionData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Completion Rate"]} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        {fullView && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">Habit Categories</CardTitle>
              </div>
              <CardDescription>Distribution of your habits by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(value) => [`${value}`, "Habits"]} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Time of Day Distribution */}
        {fullView && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-base">Habit Timing</CardTitle>
              </div>
              <CardDescription>When you've scheduled your habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip formatter={(value) => [`${value}`, "Habits"]} />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Streak Analysis */}
        {fullView && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-base">Streak Analysis</CardTitle>
              </div>
              <CardDescription>Your current streaks by habit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={habits
                      .sort((a, b) => b.streak - a.streak)
                      .slice(0, 5)
                      .map((habit) => ({
                        name: habit.name.length > 15 ? habit.name.substring(0, 15) + "..." : habit.name,
                        streak: habit.streak,
                      }))}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value} days`, "Current Streak"]} />
                    <Bar dataKey="streak" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {!fullView && habits.length > 0 && (
        <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-100">Habit Insights Available</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  View detailed analytics about your habits and progress
                </p>
              </div>
              <Button size="sm" onClick={onOpenInsights}>
                View Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
