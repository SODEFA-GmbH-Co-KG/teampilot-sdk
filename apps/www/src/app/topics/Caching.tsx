import { AnchorDiv } from "~/client/AnchorDiv"
import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { getIdForTopic } from "~/utils/navTopics"

const markdown = `
# Caching
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

export const Caching = () => {
  const cachingId = getIdForTopic({
    secondLevelSlug: "#caching",
  })
  return (
    <div className="prose max-w-none dark:prose-invert">
      <IntersectionChecker topic={"/topics#caching"} />
      <AnchorDiv id={cachingId} />
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
