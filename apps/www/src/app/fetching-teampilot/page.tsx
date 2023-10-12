import ReactMarkdown from "react-markdown"
import { DocsLinksGrid } from "~/client/DocsLink"

const markdown = `
# Fetching Teampilot
When you send a request to Teampilot with an example message like "Hello World", Teampilot will spin up a new Chat with the settings of the Launchpad you specified.
Then it will send your message in the chat and wait for the AI to respond.
The AI will call functions until it thinks it is done, then it will send the result back to you.
So it is totally possible that the AI does multiple things before it sends you the result.

If you want to continue a chat, you can send the chatroomId in your request and Teampilot will continue the chat you specified and not spin up a new one.

You can either send a request to Teampilot via the SDK or via the API.
The SDK (written in Typescript) is just a nice wrapper around the API, so both have the exact same functionality.

## Caching
As a little bonus, Teampilot will cache the result of your request for a certain amount of time, which you can specify in your requests as "cacheTtlSeconds".
So if you make the exact same request multiple times, in the time frame of the cache, Teampilot will just send you the cached result instead of generating a new result.
If you don't specify a cacheTtlSeconds, the SDK will default to caching forever.
If you don't specify a cacheTtlSeconds and use the API, the API wont cache at all.
If you don't want any caching, you can always set cacheTtlSeconds to 0.

### Why have caching at all? And why is it enabled by default?
If your sending exactly the same request multiple times, the results will most probably be very similar, so why don't just cache it and safe some money.
The AI is quite cost intensive so it's helpful having caching implemented right away, no infrastructure needed on your side.

If you use the SDK and really don't want caching, you can either set cacheTtlSeconds on every request to 0 or set the default value in your environment variable TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS or NEXT_PUBLIC_TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS to 0.
If both are set, TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS will be used.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <DocsLinksGrid
        destinations={["/fetching-via-sdk", "/fetching-via-api"]}
      />
    </div>
  )
}
