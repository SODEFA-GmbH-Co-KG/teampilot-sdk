import ReactMarkdown from "react-markdown"
import { ShowCase } from "~/client/ShowCase"
import { DayInHistorySelector } from "~/client/examples/DayInHistory"
import { Persons } from "~/client/examples/Persons"
import { Wikipedia } from "~/client/examples/wikipedia/Wikipedia"

const personsMarkdown = `
# SDK Examples

## Generating data with a schema
Teampilot can generate data for you and even format it according to a schema you specify. This is useful when you want to generate data for a specific purpose. For instance, you can generate a list of presidents and some information abut them.
The format ca be specified with a [zod](https://zod.dev/) schema.
`

const interactivemarkdown = `
## Next.js Interactive Example
You can use the SDK in a Next.js app and generate data on the fly. This is useful when you want to generate data based on user input.
`

const customfunctionsMarkdown = `
## Passing custom functions
You can pass custom functions to the SDK that the AI can call.
In this example we pass it a function that can fetch articles from Wikipedia, but you can pass any function you want.
For example you could pass a function that fetches data from your database, or a function that mutates things on your side.
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{personsMarkdown}</ReactMarkdown>

      <ShowCase
        code={`
import { fetchTeampilotData } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"

export const Persons = async () => {
  const data = await fetchTeampilotData({
    launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    message: "First 6 Presidents of the US",
    schema: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        dateOfBirth: z.string(),
        shortDescription: z.string(),
        achievements: z.array(z.string()),
      })
    ),
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {data?.map((p, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>
              <span>{p.firstName}</span>{" "}
              <strong className="text-primary">{p.lastName}</strong>
            </CardTitle>
            <div className="font-mono">{p.dateOfBirth}</div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div>{p.shortDescription}</div>
              <ul className="mt-2 list-inside list-disc">
                {p.achievements.map((a, idx) => {
                  return <li key={idx}>{a}</li>
                })}
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
      `}
      >
        <Persons />
      </ShowCase>

      <ReactMarkdown>{interactivemarkdown}</ReactMarkdown>

      <ShowCase
        code={`
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
      <div className="w-72">
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
      message: \`Tell what happened on this day in history: $\{dateString\}\`,
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
      `}
      >
        <DayInHistorySelector />
      </ShowCase>

      <ReactMarkdown>{customfunctionsMarkdown}</ReactMarkdown>

      <ShowCase
        code={`
import { fetchTeampilotText } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"
import { fetchWikipediaArticle } from "./fetchWikipedia"

export const Wikipedia = async () => {
  const answer = await fetchTeampilotText({
    launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    accessLevel: "LINK_WRITE",
    message:
      "How did Luna 25 land on the moon? Please use Wikipedia as a source.",
    customFunctions: [
      {
        nameForAI: "fetchWikipediaArticle",
        descriptionForAI: "Fetch a Wikipedia article",
        inputSchema: z.object({
          articleName: z.string(),
        }),
        execute: async ({ input }) => {
          const output = await fetchWikipediaArticle(input.articleName)
          return { output }
        },
      },
    ],
  })
  return answer
}
`}
        layout="side-by-side"
      >
        <Wikipedia />
      </ShowCase>
    </div>
  )
}
