import { CodeBlock } from "~/client/CodeBlock"
import { env } from "~/env.mjs"
import { fetchTeampilot } from "~/teampilot-sdk"

export default async function Page() {
  if (env.NODE_ENV !== "development") return null
  const launchpadSlugId = process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL
  if (!launchpadSlugId) return null
  const answer = await fetchTeampilot({
    url: `http://localhost:3000/api/rest/message`,
    launchpadSlugId,
    message: "What time is it?",
    cacheTtlSeconds: 60,
    // schema: z.object({
    //   hours: z.string(),
    //   minutes: z.string(),
    // }),
  })

  return (
    <>
      <CodeBlock
        lightMode="dark"
        language="json"
        value={JSON.stringify(answer, null, 2)}
      />
    </>
  )
}
