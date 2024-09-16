import ReactMarkdown from "~/client/CustomReactMarkdown"
import { DocsLinksGrid } from "~/client/DocsLink"
import { generateOgUrl } from "../og/generateOGUrl"

export const metadata = {
  openGraph: {
    title: `Fetching Teampilot | Teampilot Docs`,
    type: "article",
    images: [
      {
        url: generateOgUrl({ title: "Fetching Teampilot" }),
        width: 1200,
        height: 630,
        alt: "Fetching Teampilot",
      },
    ],
    siteName: "docs.teampilot.ai",
  },
}

const markdown = `
# Fetching Teampilot
When you send a request to Teampilot with an example message like "Hello World", Teampilot will spin up a new Chat with the settings of the Launchpad you specified.
Then it will send your message in the chat and wait for the AI to respond.
The AI will call functions until it thinks it is done, then it will send the result back to you.
So it is totally possible that the AI does multiple things before it sends you the result.

If you want to continue a chat, you can send the chatroomId in your request and Teampilot will continue the chat you specified and not spin up a new one.

You can either send a request to Teampilot via the SDK or via the API.
The SDK (written in Typescript) is just a nice wrapper around the API, so both have the exact same functionality.
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <DocsLinksGrid
        destinations={["/caching", "/fetching-via-sdk", "/fetching-via-api"]}
      />
    </div>
  )
}
