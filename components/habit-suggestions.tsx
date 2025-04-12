"use client"

import { useState } from "react"
import { Check, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Suggested habits by category
const SUGGESTED_HABITS = {
  health: [
    { name: "Drink 8 glasses of water", icon: "💧", color: "bg-cyan-500", category: "Health" },
    { name: "Take vitamins", icon: "💊", color: "bg-green-500", category: "Health" },
    { name: "Get 8 hours of sleep", icon: "😴", color: "bg-indigo-500", category: "Health" },
    { name: "Eat a healthy breakfast", icon: "🥗", color: "bg-emerald-500", category: "Health" },
  ],
  fitness: [
    { name: "10,000 steps", icon: "🚶", color: "bg-red-500", category: "Fitness" },
    { name: "Stretch for 10 minutes", icon: "🧘", color: "bg-orange-500", category: "Fitness" },
    { name: "Workout", icon: "💪", color: "bg-red-500", category: "Fitness" },
    { name: "Go for a run", icon: "🏃", color: "bg-pink-500", category: "Fitness" },
  ],
  mindfulness: [
    { name: "Morning meditation", icon: "🧘", color: "bg-violet-500", category: "Mindfulness" },
    { name: "Gratitude journal", icon: "📓", color: "bg-blue-500", category: "Mindfulness" },
    { name: "Digital detox hour", icon: "📵", color: "bg-slate-500", category: "Mindfulness" },
    { name: "Deep breathing", icon: "🌬️", color: "bg-teal-500", category: "Mindfulness" },
  ],
  productivity: [
    { name: "Read for 30 minutes", icon: "📚", color: "bg-blue-500", category: "Productivity" },
    { name: "Learn something new", icon: "🧠", color: "bg-amber-500", category: "Productivity" },
    { name: "No social media", icon: "📱", color: "bg-rose-500", category: "Productivity" },
    { name: "Plan tomorrow", icon: "📝", color: "bg-emerald-500", category: "Productivity" },
  ],
  creativity: [
    { name: "Practice an instrument", icon: "🎸", color: "bg-amber-500", category: "Creativity" },
    { name: "Draw or sketch", icon: "🎨", color: "bg-pink-500", category: "Creativity" },
    { name: "Write creatively", icon: "✍️", color: "bg-purple-500", category: "Creativity" },
    { name: "Try a new recipe", icon: "🍳", color: "bg-yellow-500", category: "Creativity" },
  ],
}

interface HabitSuggestionsProps {
  onAddHabit: (habit: any) => void
}

export function HabitSuggestions({ onAddHabit }: HabitSuggestionsProps) {
  const [activeCategory, setActiveCategory] = useState("health")
  const [selectedHabits, setSelectedHabits] = useState<Record<string, boolean>>({})

  const toggleHabitSelection = (habitName: string) => {
    setSelectedHabits((prev) => ({
      ...prev,
      [habitName]: !prev[habitName],
    }))
  }

  const handleAddHabit = (habit: any) => {
    onAddHabit({
      name: habit.name,
      goal: "Daily",
      icon: habit.icon,
      color: habit.color,
      category: habit.category,
      reminderTime: "09:00",
      reminderDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    })
    toggleHabitSelection(habit.name)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Choose from these popular habits to add to your tracker:
      </p>

      <Tabs defaultValue="health" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="mindfulness">Mind</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="creativity">Creativity</TabsTrigger>
        </TabsList>

        {Object.entries(SUGGESTED_HABITS).map(([category, habits]) => (
          <TabsContent key={category} value={category} className="space-y-3 pt-3">
            {habits.map((habit) => (
              <Card key={habit.name} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center pl-2">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${habit.color} text-white`}
                    >
                      <span className="text-xl">{habit.icon}</span>
                    </div>
                    <div className="flex flex-1 items-center justify-between p-3">
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-100">{habit.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{habit.category}</p>
                      </div>
                      <Button
                        variant={selectedHabits[habit.name] ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleAddHabit(habit)}
                        disabled={selectedHabits[habit.name]}
                      >
                        {selectedHabits[habit.name] ? (
                          <>
                            <Check className="mr-1 h-3 w-3" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="mr-1 h-3 w-3" /> Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Pro tip: Start with just 1-3 habits to build consistency before adding more!
        </p>
      </div>
    </div>
  )
}
