"use client"

import { useState } from "react"
import { Calendar, Flame, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { StreakCalendar } from "./streak-calendar"

interface HabitDetailProps {
  habit: {
    id: string
    name: string
    streak: number
    goal: string
    completedDates: string[]
    reminderTime: string
    reminderDays: string[]
    color: string
    icon: string
  }
  onDelete: () => void
  onClose: () => void
}

export function HabitDetail({ habit, onDelete, onClose }: HabitDetailProps) {
  const [activeTab, setActiveTab] = useState("stats")

  return (
    <>
      <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${habit.color} text-white`}>
            <span className="text-lg">{habit.icon}</span>
          </div>
          <DialogTitle className="text-xl">{habit.name}</DialogTitle>
        </div>
      </DialogHeader>

      <div className="mt-4">
        <Tabs defaultValue="stats" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="space-y-4 pt-4">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/30">
                  <Flame className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Current Streak</p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{habit.streak} days</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Goal</p>
                <p className="text-right font-medium text-slate-800 dark:text-slate-100">{habit.goal}</p>
              </div>
            </div>
{/* 
            <div className="rounded-lg border p-4">
              <div className="mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-500" />
                <h3 className="font-medium text-slate-800 dark:text-slate-100">Activity Calendar</h3>
              </div>
              <StreakCalendar completedDates={habit.completedDates} />
            </div> */}

            <Button variant="destructive" className="w-full" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Habit
            </Button>
          </TabsContent>
          <TabsContent value="reminders" className="space-y-4 pt-4">
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Reminders</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Receive notifications for this habit</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminderTime">Reminder Time</Label>
                <div className="rounded-md border px-3 py-2">
                  <p className="text-sm font-medium">{habit.reminderTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reminder Days</Label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div
                      key={day}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        habit.reminderDays.includes(day)
                          ? "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
