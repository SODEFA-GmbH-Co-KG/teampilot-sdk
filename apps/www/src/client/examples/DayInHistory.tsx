"use client"

import { fetchTeampilotData } from "@teampilot/sdk"
import { format } from "date-fns"
import { use, useState } from "react"
import { z } from "zod"
import { env } from "~/env.mjs"
import { Calendar } from "~/shadcn/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { SuspenseLoader } from "../SuspenseLoader"

export const DayInHistorySelector = () => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="flex flex-col items-start gap-4 lg:flex-row">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date ?? new Date())}
        className="rounded-md border bg-card"
      />
      <div className="w-full max-w-72">
        <SuspenseLoader>
          <DayInHistory date={date} />
        </SuspenseLoader>
      </div>
    </div>
  )
}

const DayInHistory = ({ date }: { date: Date }) => {
  const dateString = format(date, "MMMM d")
  const response = use(
    fetchTeampilotData({
      launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
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
        <CardContent className="flex flex-col gap-4">
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
