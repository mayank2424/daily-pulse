"use client"

import { useMemo } from "react"

interface StreakCalendarProps {
  completedDates: string[]
}

export function StreakCalendar({ completedDates }: StreakCalendarProps) {
  const today = new Date()

  const calendarData = useMemo(() => {
    const data = []
    const completedDatesSet = new Set(completedDates)

    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateString = date.toISOString().split("T")[0]

      data.push({
        date: dateString,
        day: date.getDate(),
        month: date.toLocaleString("default", { month: "short" }),
        isCompleted: completedDatesSet.has(dateString),
      })
    }

    return data
  }, [completedDates, today])

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max gap-1">
        {calendarData.map((day, index) => (
          <div key={day.date} className="flex flex-col items-center">
            {index % 5 === 0 && <div className="mb-1 text-xs text-slate-500">{day.month}</div>}
            <div
              className={`
                flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium
                ${
                  day.isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }
              `}
            >
              {day.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
