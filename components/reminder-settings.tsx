"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ReminderSettings() {
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [enableSounds, setEnableSounds] = useState(true)
  const [defaultTime, setDefaultTime] = useState("08:00")

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-violet-100 p-2 dark:bg-violet-900/30">
          <Bell className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Notification Settings</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure how and when you receive reminders</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Enable Notifications</Label>
            <p className="text-sm text-slate-500 dark:text-slate-400">Receive reminders for your habits</p>
          </div>
          <Switch checked={enableNotifications} onCheckedChange={setEnableNotifications} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Notification Sounds</Label>
            <p className="text-sm text-slate-500 dark:text-slate-400">Play a sound when a reminder is sent</p>
          </div>
          <Switch checked={enableSounds} onCheckedChange={setEnableSounds} />
        </div>

        <div className="space-y-2">
          <Label className="text-base">Default Reminder Time</Label>
          <p className="text-sm text-slate-500 dark:text-slate-400">Set the default time for new habit reminders</p>
          <div className="mt-2">
            <input
              type="time"
              value={defaultTime}
              onChange={(e) => setDefaultTime(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2 dark:border-slate-800"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
        <p className="text-sm text-amber-800 dark:text-amber-300">
          Notifications require permission from your browser. Make sure to allow notifications when prompted.
        </p>
      </div>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}
