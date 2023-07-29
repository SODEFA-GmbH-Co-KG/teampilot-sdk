import { CodeBlock } from "~/client/CodeBlock"
import { fetchTeampilot } from "~/teampilot-sdk"

export default async function Page() {
  const launchpadSlugId = process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL
  if (!launchpadSlugId) return null
  const answer = await fetchTeampilot({
    url: `http://localhost:3000/api/rest/message`,
    launchpadSlugId,
    message: "Draw an image of a sunset",
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
