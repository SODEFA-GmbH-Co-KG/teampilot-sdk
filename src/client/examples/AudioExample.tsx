import { use } from "react"
import { teampilot } from "~/teampilot"
import { CodeBlock } from "../CodeBlock"

export const AudioExample = () => {
  const answer = use(
    teampilot.websiteToVoice.fetch({
      message: "Read this Website to me: https://teampilot.ai",
    })
  )

  return (
    <CodeBlock
      lightMode="dark"
      language="json"
      value={JSON.stringify(answer, null, 2)}
    />
  )
}
