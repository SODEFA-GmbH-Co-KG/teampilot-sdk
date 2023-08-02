import { ArrowDown } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "../CodeBlock"
import { ShowCaseDescription } from "../ShowCaseDescription"

const input = `import { transformZodToJsonSchema } from "@teampilot/sdk"

fetch('https://teampilot.ai/api/rest/message', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    launchpadSlugId: 'my-launchpad-12314513123213',
    message: 'Why is Teampilot SDK awesome?',

    // Optional:
    schema: transformZodToJsonSchema(myZodSchema),
    cacheTtlSeconds: 60 * 60 * 24 * 7, // 1 week
    chatroomId: "8ebd214b048d9354eb7afe33314d1d30" // continue chat
    accessLevel: "TEAM" // TEAM or LINK_READ or LINK_WRITE (default TEAM)
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
      <div>
        <div>You can also checkout our OpenAPI Schema at</div>
        <Link
          href="https://teampilot.ai/docs/api"
          className="text-blue-500 hover:underline"
          target="_blank"
        >
          https://teampilot.ai/docs/api
        </Link>
      </div>
    </>
  )
}
