import { DocsLinksGrid } from "~/client/DocsLink"
import { Form } from "~/client/examples/Form"
import { Time } from "~/client/examples/Time"
import { Wikipedia } from "~/client/examples/wikipedia/Wikipedia"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Time"
        // file="/src/client/examples/Time.tsx"
        code={`import { use } from "react"
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
          <span className="opacity-40">:</span>
          <span>{answer.minutes}</span>
        </div>
        <div>{answer.timezone}</div>
      </div>
    </>
  )
}
`}
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
      <ShowCase
        title="Form"
        code={`import { Send } from "lucide-react"
import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { teampilot } from "~/teampilot"

export const Form = () => {
  const submit = async (data: FormData) => {
    "use server"
    const email = data.get("email")
    await teampilot.functions.fetch({
      message: \`Notify me via discord that a new user has signed up with email: \${email}\`,
      cacheTtlSeconds: 0,
    })
  }
  return (
    <>
      <div className="mb-2 text-center font-bold">Register</div>
      <form className="flex flex-row items-center gap-1" action={submit}>
        <Input type="email" placeholder="Your Email" name="email" />
        <Button type="submit" size="sm">
          <Send />
        </Button>
      </form>
    </>
  )
}
`}
        layout="side-by-side"
      >
        <Form />
      </ShowCase>
      <ShowCase
        title="Passing custom functions"
        description="You can pass custom functions to the SDK that the AI can call. In this example we pass it a function that can fetch articles from Wikipedia, but you can pass any function you want. For example you could pass a function that fetches data from your database, or a function that mutates things on your side."
        code={`import { fetchTeampilotText } from "@teampilot/sdk"
import { z } from "zod"
import { fetchWikipediaArticle } from "./fetchWikipedia"

export const Wikipedia = async () => {
  const answer = await fetchTeampilotText({
    message: "How did Luna 25 land on the moon?",
    accessLevel: "LINK_WRITE",
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
}`}
        layout="side-by-side"
      >
        <Wikipedia />
      </ShowCase>

      <DocsLinksGrid destinations={["/functions", "/media"]} />
    </>
  )
}
