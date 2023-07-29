import { use } from "react"
import { CodeBlock } from "~/client/CodeBlock"
import { fetchTeampilotText } from "~/teampilot-sdk"

export default function Page() {
  const answer = use(
    fetchTeampilotText({
      url: `http://localhost:3000/api/rest/message`,
      launchpadSlugId: process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL,
      message: "What time is it?",
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
