import { AnchorDiv } from "~/client/AnchorDiv"
import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"
import { Form } from "~/client/examples/Form"
import { Time } from "~/client/examples/Time"
import { Wikipedia } from "~/client/examples/wikipedia/Wikipedia"
import { getIdForTopic } from "~/utils/navTopics"

const markdown = `
# Functions
`

const widgetFunctionsMarkdown = `
## Calling a function from widget
For more information on how to call a function from a widget, see the [custom functions widget functions](/topics#launchpads-widget).`

export const Functions = async () => {
  const functionsId = getIdForTopic({ secondLevelSlug: "#functions" })
  const timeId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-time",
  })
  const formId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-form",
  })
  const passingCustomFuctionsId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-passing-custom-functions",
  })
  const callingAFuctionFromWidgetId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-calling-a-function-from-widget",
  })
  return (
    <>
      <IntersectionChecker topic="/examples#functions" />
      <AnchorDiv id={functionsId} />
      <div className="prose dark:prose-invert max-w-[inherit]">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <IntersectionChecker topic={`/examples#${timeId}`} />
      <AnchorDiv id={timeId} />
      <ShowCase
        title="Time"
        code={`
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
        `}
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
      <IntersectionChecker topic={`/examples#${formId}`} />
      <AnchorDiv id={formId} />
      <ShowCase
        title="Form"
        code={`
import { Send } from "lucide-react"
import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { teampilot } from "~/teampilot"

export const Form = async () => {
  const submit = async (data: FormData) => {
    "use server"
    const email = data.get("email")
    await teampilot.functions.fetch({
      message: \`Notify me via discord that a new user has signed up with email: $\{email\}\`,
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
      <IntersectionChecker topic={`/examples#${passingCustomFuctionsId}`} />
      <AnchorDiv id={passingCustomFuctionsId} />
      <ShowCase
        title="Passing custom functions"
        description="You can pass custom functions to the SDK that the AI can call. In this example we pass it a function that can fetch articles from Wikipedia, but you can pass any function you want. For example you could pass a function that fetches data from your database, or a function that mutates things on your side."
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
      <IntersectionChecker topic={`/examples#${callingAFuctionFromWidgetId}`} />
      <AnchorDiv id={callingAFuctionFromWidgetId} />

      <div className="prose max-w-[inherit] dark:prose-invert">
        <ReactMarkdown>{widgetFunctionsMarkdown}</ReactMarkdown>
      </div>
    </>
  )
}
