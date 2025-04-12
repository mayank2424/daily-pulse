"use client"

import type React from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const ICONS = ["🧘", "📚", "💪", "💧", "🏃", "🥗", "💤", "🧠", "🎯", "🎨", "🎸", "✍️"]
const COLORS = [
  { name: "violet", class: "bg-violet-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "cyan", class: "bg-cyan-500" },
  { name: "green", class: "bg-green-500" },
  { name: "yellow", class: "bg-yellow-500" },
  { name: "orange", class: "bg-orange-500" },
  { name: "red", class: "bg-red-500" },
  { name: "pink", class: "bg-pink-500" },
]

interface NewHabitFormProps {
  onSubmit: (habit: any) => void
  onCancel: () => void
}

export function NewHabitForm({ onSubmit, onCancel }: NewHabitFormProps) {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("Daily")
  const [icon, setIcon] = useState("🧘")
  const [color, setColor] = useState("bg-violet-500")
  const [reminderTime, setReminderTime] = useState("08:00")
  const [reminderDays, setReminderDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      goal,
      icon,
      color,
      reminderTime,
      reminderDays,
    })
  }

  const toggleDay = (day: string) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter((d) => d !== day))
    } else {
      setReminderDays([...reminderDays, day])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Habit Name</Label>
        <Input
          id="name"
          placeholder="e.g., Morning Meditation"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Goal Frequency</Label>
        <RadioGroup defaultValue="Daily" value={goal} onValueChange={setGoal}>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3 times a week" id="three-times" />
              <Label htmlFor="three-times">3 times a week</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Icon</Label>
          <div className="grid grid-cols-6 gap-2">
            {ICONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setIcon(emoji)}
                className={`flex h-10 items-center justify-center rounded-md text-lg ${
                  icon === emoji ? "ring-2 ring-violet-500 ring-offset-2" : "border"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {COLORS.map((colorOption) => (
              <button
                key={colorOption.name}
                type="button"
                onClick={() => setColor(colorOption.class)}
                className={`h-10 rounded-md ${colorOption.class} ${
                  color === colorOption.class ? "ring-2 ring-slate-950 ring-offset-2 dark:ring-slate-50" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reminderTime">Reminder Time</Label>
        <Input id="reminderTime" type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Reminder Days</Label>
        <div className="flex flex-wrap gap-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                reminderDays.includes(day)
                  ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={!name}>
          Create Habit
        </Button>
      </div>
    </form>
  )
}
