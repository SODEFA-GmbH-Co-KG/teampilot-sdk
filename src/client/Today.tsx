"use client"

import { format } from "date-fns"
import { use, useState } from "react"
import { z } from "zod"
import { Calendar } from "~/shadcn/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { teampilot } from "~/teampilot"
import { SuspenseLoader } from "./SuspenseLoader"

export const Today = () => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="flex flex-row items-start gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date ?? new Date())}
        className="rounded-md border bg-card"
      />
      <div className="w-72">
        <SuspenseLoader>
          <TodayText date={date} />
        </SuspenseLoader>
      </div>
    </div>
  )
}

const TodayText = ({ date }: { date: Date }) => {
  const dateString = format(date, "MMMM d")
  const response = use(
    teampilot.default.fetchData({
      message: `Tell what happened on this day in history: ${dateString}`,
      schema: z.array(
        z.object({
          year: z.string(),
          event: z.string(),
        })
      ),
    })
  )
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>This day in History</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {response.map((data, idx) => (
            <div key={idx}>
              <div>
                <span className="text-muted-foreground">{dateString}</span>{" "}
                <strong>{data.year}</strong>
              </div>
              <div className="text-sm">{data.event}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
