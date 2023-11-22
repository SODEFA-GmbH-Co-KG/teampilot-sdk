import { ArrowDown } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { CodeBlock } from "~/client/CodeBlock"

const input = `fetch('https://teampilot.ai/api/rest/message', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    launchpadSlugId: 'my-launchpad-12314513123213',
    message: 'Why is Teampilot SDK awesome?',

    // Optional:
    schema: {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "no": {
            "type": "number"
          },
          "reason": {
            "type": "string"
          }
        },
        "required": [ "no", "reason" ]
      }
    }
    cacheTtlSeconds: 60 * 60 * 24 * 7, // 1 week
    chatroomId: "8ebd214b048d9354eb7afe33314d1d30" // continue chat
    accessLevel: "TEAM" // TEAM or LINK_READ or LINK_WRITE (default TEAM)
  }),
})
`
const output = `type Output = {
  message: {
    content: string
    data?: any // if you provided a schema, this will be the parsed data
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

const markdown = `
# Fetching Teampilot via API
The Teampilot API currently offers one endpoint. You can find the OpenAPI specification [here](https://teampilot.ai/docs/api).

Here is an example on how to use the API to fetch data from Teampilot.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <CodeBlock language="tsx" value={input} lightMode="dark" />
        </div>
        <ArrowDown className="h-8 w-8 self-center lg:-rotate-90" />
        <div className="flex-1">
          <CodeBlock language="tsx" value={output} lightMode="dark" />
        </div>
      </div>
    </div>
  )
}
