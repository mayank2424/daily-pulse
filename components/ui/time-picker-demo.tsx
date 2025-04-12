"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function TimePickerDemo() {
  const [time, setTime] = React.useState("10:00")

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1.5">
        <Label htmlFor="time">Time</Label>
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Clock className="h-4 w-4" />
                <span className="sr-only">Open time picker</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="p-4">
                <TimePicker setTime={setTime} time={time} />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

function TimePicker({ setTime, time }: { setTime: (time: string) => void; time: string }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const minutes = [0, 15, 30, 45]

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 gap-2">
        {hours.slice(0, 12).map((hour) => (
          <Button
            key={hour}
            variant="outline"
            size="sm"
            onClick={() => setTime(`${hour.toString().padStart(2, "0")}:00`)}
          >
            {hour === 0 ? "12" : hour}am
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {hours.slice(12, 24).map((hour) => (
          <Button
            key={hour}
            variant="outline"
            size="sm"
            onClick={() => setTime(`${hour.toString().padStart(2, "0")}:00`)}
          >
            {hour === 12 ? "12" : hour - 12}pm
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {minutes.map((minute) => (
          <Button
            key={minute}
            variant="outline"
            size="sm"
            onClick={() => {
              const currentHour = Number.parseInt(time.split(":")[0])
              setTime(`${currentHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`)
            }}
          >
            :{minute.toString().padStart(2, "0")}
          </Button>
        ))}
      </div>
    </div>
  )
}
