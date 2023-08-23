import { use } from "react"
import { z } from "zod"
import { teampilot } from "~/teampilot"

export const Time = () => {
  const answer = use(
    teampilot.functions.fetchData({
      message: "What time is it in Berlin?",
      schema: z.object({
        hours: z.string(),
        minutes: z.string(),
        dayOfWeek: z.string(),
        dateWithoutYear: z.string(),
        timezone: z.string(),
      }),
      cacheTtlSeconds: 60,
      next: {
        revalidate: 60,
      },
    })
  )

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div>
          {answer.dayOfWeek}, {answer.dateWithoutYear}
        </div>
        <div className="text-6xl font-bold">
          <span>{answer.hours}</span>
          <span className="text-primary">:</span>
          <span>{answer.minutes}</span>
        </div>
        <div>{answer.timezone}</div>
      </div>
    </>
  )
}
