"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Award, BarChart3, Calendar, ChevronLeft, Icon, Moon, Plus, Settings, Sparkles, Sun, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { HabitCard } from "./habit-card"
import { HabitDetail } from "./habit-detail"
import { NewHabitForm } from "./new-habit-form"
import { ReminderSettings } from "./reminder-settings"
import { HabitSuggestions } from "./habit-suggestions"
import { Achievements } from "./achievements"
import { InsightsPanel } from "./insights-panel"
import { QuoteCard } from "./quote-card"
import { FeaturedHabit } from "./featured-habit"
import { WeeklySummary } from "./weekly-summary"
import Link from "next/link"
import ThemeSwitch from "./theme-switch"
import toast from "react-hot-toast"
// Sample data
const initialHabits = [
  {
    id: "1",
    name: "Morning Meditation",
    streak: 12,
    goal: "Daily",
    completedDates: [
      "2025-04-01",
      "2025-04-02",
      "2025-04-03",
      "2025-04-04",
      "2025-04-05",
      "2025-04-06",
      "2025-04-07",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
      "2025-04-12",
    ],
    reminderTime: "07:00",
    reminderDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    color: "bg-violet-500",
    icon: "🧘",
    category: "Mindfulness",
  },
  {
    id: "2",
    name: "Read 30 Minutes",
    streak: 8,
    goal: "Daily",
    completedDates: [
      "2025-04-05",
      "2025-04-06",
      "2025-04-07",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
      "2025-04-12",
    ],
    reminderTime: "21:00",
    reminderDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    color: "bg-blue-500",
    icon: "📚",
    category: "Learning",
  },
  {
    id: "3",
    name: "Workout",
    streak: 5,
    goal: "3 times a week",
    completedDates: ["2025-04-08", "2025-04-09", "2025-04-10", "2025-04-11", "2025-04-12"],
    reminderTime: "18:00",
    reminderDays: ["Mon", "Wed", "Fri"],
    color: "bg-red-500",
    icon: "💪",
    category: "Fitness",
  },
  {
    id: "4",
    name: "Drink 8 Glasses of Water",
    streak: 15,
    goal: "Daily",
    completedDates: [
      "2025-03-29",
      "2025-03-30",
      "2025-03-31",
      "2025-04-01",
      "2025-04-02",
      "2025-04-03",
      "2025-04-04",
      "2025-04-05",
      "2025-04-06",
      "2025-04-07",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
      "2025-04-12",
    ],
    reminderTime: "10:00",
    reminderDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    color: "bg-cyan-500",
    icon: "💧",
    category: "Health",
  },
]

export default function HabitTracker() {
  const [habits, setHabits] = useState(initialHabits)
  const [newHabitOpen, setNewHabitOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [dashboardTab, setDashboardTab] = useState("habits")
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [achievementsOpen, setAchievementsOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)
  const today = new Date().toISOString().split("T")[0]

  const completeHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const alreadyCompletedToday = habit.completedDates.includes(today)
          if (alreadyCompletedToday) {
            return {
              ...habit,
              completedDates: habit.completedDates.filter((date) => date !== today),
              streak: habit.streak - 1,
            }
          } else {
            return {
              ...habit,
              completedDates: [...habit.completedDates, today],
              streak: habit.streak + 1,
            }
          }
        }
        return habit
      }),
    )
  }

  const addHabit = (habit: any) => {
    setHabits((prev) => [
      ...prev,
      {
        ...habit,
        id: Math.random().toString(36).substring(7),
        streak: 0,
        completedDates: [],
      },
    ])
    setNewHabitOpen(false)
  }

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
    setSelectedHabit(null)
  }

  const filteredHabits = habits.filter((habit) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return habit.completedDates.includes(today)
    if (activeTab === "pending") return !habit.completedDates.includes(today)
    return true
  })

  const selectedHabitData = habits.find((h) => h.id === selectedHabit)

  // Calculate stats
  const totalHabits = habits.length
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
  const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0)

  useEffect(() => {
    // show toast every 10 seconds for reminder
    const interval = setInterval(() => {
      if (habits.some(habit => habit.reminderDays.includes(new Date().toLocaleString('en-US', { weekday: 'short' })))) {
        toast.success('[Sample Reminder]: Don\'t forget to complete your habits today!', {
          position: 'bottom-right',
          duration: 2000,
          style: {
            background: '#fff8f0',
            color: '#c2410c',
            border: '1px solid #fed7aa',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.1)',
          },
          icon: '📣',
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex flex-row items-center justify-between">
        <Link href="/" className="mb-1 inline-block">
          <Button variant="link" className="pl-0">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      
       <ThemeSwitch hideLabel={false}/>
      </div>

      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Habit Tracker</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Track your daily habits and build streaks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => setNewHabitOpen(true)}
            className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
          >
            <Plus className="mr-1 h-4 w-4" /> New Habit
          </Button>
        </div>
      </header>

      <Tabs defaultValue="habits" value={dashboardTab} onValueChange={setDashboardTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="habits">My Habits</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="habits" className="space-y-6">
          {/* Featured Habit */}
          {habits.length > 0 && (
            <FeaturedHabit habit={habits.sort((a, b) => b.streak - a.streak)[0]} onComplete={completeHabit} />
          )}

          {/* Habit List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Your Habits</h2>
              <Button variant="outline" size="sm" onClick={() => setSuggestionsOpen(true)}>
                <Sparkles className="mr-1 h-4 w-4 text-amber-500" /> Suggestions
              </Button>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-4"
              >
                {filteredHabits.length > 0 ? (
                  filteredHabits.map((habit) => (
                    <motion.div
                      key={habit.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HabitCard
                        habit={habit}
                        onComplete={() => completeHabit(habit.id)}
                        onSelect={() => setSelectedHabit(habit.id)}
                        isCompleted={habit.completedDates.includes(today)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="mb-4 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                        <Plus className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-center text-slate-500 dark:text-slate-400">
                        No habits found. Add a new habit to get started!
                      </p>
                      <Button
                        variant="link"
                        onClick={() => setNewHabitOpen(true)}
                        className="mt-2 text-violet-500 dark:text-violet-400"
                      >
                        Add your first habit
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Stats</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/50 dark:to-indigo-950/50">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="mb-2 rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
                  <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-2xl font-bold">{totalHabits}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Habits</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="mb-2 rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold">{completedToday}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Completed Today</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="mb-2 rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold">{completionRate}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Completion Rate</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="mb-2 rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-2xl font-bold">{longestStreak}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Longest Streak</p>
              </CardContent>
            </Card>
          </div>

          {/* Motivational Quote */}
          <QuoteCard />

          {/* Weekly Summary */}
          <WeeklySummary habits={habits} />

        </TabsContent>

        <TabsContent value="insights">
          <InsightsPanel habits={habits} onOpenInsights={() => setInsightsOpen(true)} />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievements habits={habits} onOpenAchievements={() => setAchievementsOpen(true)} />
        </TabsContent>
      </Tabs>

      {/* New Habit Dialog */}
      <Dialog open={newHabitOpen} onOpenChange={setNewHabitOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create a new habit</DialogTitle>
          </DialogHeader>
          <NewHabitForm onSubmit={addHabit} onCancel={() => setNewHabitOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
          </DialogHeader>
          <ReminderSettings />
        </DialogContent>
      </Dialog>

      {/* Habit Detail Dialog */}
      <Dialog open={!!selectedHabit} onOpenChange={(open) => !open && setSelectedHabit(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedHabitData && (
            <HabitDetail
              habit={selectedHabitData}
              onDelete={() => deleteHabit(selectedHabitData.id)}
              onClose={() => setSelectedHabit(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Habit Suggestions Dialog */}
      <Dialog open={suggestionsOpen} onOpenChange={setSuggestionsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Habit Suggestions</DialogTitle>
          </DialogHeader>
          <HabitSuggestions
            onAddHabit={(habit) => {
              addHabit(habit)
              setSuggestionsOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Full Insights Dialog */}
      <Dialog open={insightsOpen} onOpenChange={setInsightsOpen}>
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Detailed Insights</DialogTitle>
          </DialogHeader>
            <InsightsPanel habits={habits} fullView />
        </DialogContent>
      </Dialog>

      {/* Full Achievements Dialog */}
      <Dialog open={achievementsOpen} onOpenChange={setAchievementsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Your Achievements</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            <Achievements habits={habits} fullView />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
