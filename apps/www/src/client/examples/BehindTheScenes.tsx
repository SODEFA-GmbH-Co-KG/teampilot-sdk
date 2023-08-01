import { ArrowDown } from "lucide-react"
import { CodeBlock } from "../CodeBlock"
import { ShowCaseDescription } from "../ShowCaseDescription"

const input = `fetch('https://teampilot.ai/api/rest/message', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    launchpadSlugId: 'my-launchpad-12314513123213',
    message: 'Why is Teampilot SDK awesome?',

    // Optional:
    schema: transformZodSchemaToOpenAi(myZodSchema),
    cacheTtlSeconds: 60 * 60 * 24 * 7, // 1 week
  }),
})
`
const output = `type Output = {
  message: {
    content: string
    data?: any // myZodSchema
  }
  mediaAttachments?: {
    id: string
    type: 'IMAGE' | 'AUDIO' | 'FILE
    url: string
  }[]
  usage: {
    teamTokens: number
  }
  chatroom: {
    id: string
    url: string
  }
}
`

export const BehindTheScenes = async () => {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Behind the scenes
      </h1>
      <ShowCaseDescription
        title="Behind the scenes"
        code={[input, output].join("\n\n")}
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <CodeBlock language="tsx" value={input} lightMode="dark" />
        </div>
        <ArrowDown className="h-8 w-8 self-center lg:-rotate-90" />
        <div className="flex-1">
          <CodeBlock language="tsx" value={output} lightMode="dark" />
        </div>
      </div>
    </>
  )
}
