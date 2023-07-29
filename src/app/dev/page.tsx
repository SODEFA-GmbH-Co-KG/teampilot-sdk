import { use } from "react"
import { CodeBlock } from "~/client/CodeBlock"
import { fetchTeampilot } from "~/teampilot-sdk"

export default function Page() {
  const answer = use(
    fetchTeampilot({
      url: `http://localhost:3000/api/rest/message`,
      launchpadSlugId: process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL,
      message: "Draw an image of a sunset",
      // schema: z.object({
      //   hours: z.string(),
      //   minutes: z.string(),
      // }),
    })
  )
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
