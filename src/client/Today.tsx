"use client"

import { use, useState } from "react"
import { z } from "zod"
import { Calendar } from "~/shadcn/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { fetchTeampilotData } from "~/teampilot-sdk"
import { SuspenseLoader } from "./SuspenseLoader"

export const Today = () => {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <div className="flex flex-row gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={(date) => setDate(date ?? new Date())}
        className="rounded-md border bg-card"
      />
      <Card className="w-72 flex-1">
        <SuspenseLoader>
          <TodayText date={date} />
        </SuspenseLoader>
      </Card>
    </div>
  )
}

const TodayText = ({ date }: { date: Date }) => {
  const { dateString, content } = use(
    fetchTeampilotData({
      message: `Tell what happened on this day in history: ${date.toLocaleDateString()} Ignore the Year!`,
      schema: z.object({
        // title: z.string(),
        dateString: z.string(),
        content: z.string(),
      }),
    })
  )
  return (
    <>
      <CardHeader>
        <CardTitle>This day in History</CardTitle>
        <CardDescription>{dateString}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </>
  )
}
