import { use } from "react"
import { z } from "zod"
import { CodeBlock } from "~/client/CodeBlock"
import { fetchTeampilotData } from "~/teampilot-sdk"

export default function Page() {
  const answer = use(
    fetchTeampilotData({
      url: `http://localhost:3000/api/rest/message`,
      launchpadSlugId: process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL,
      message: "What time is it?",
      schema: z.object({
        hours: z.string(),
        minutes: z.string(),
      }),
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
