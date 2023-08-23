import { createTeampilotClient } from "@teampilot/sdk"
import { use } from "react"
import { env } from "~/env.mjs"

export const teampilot = createTeampilotClient({
  default: {
    launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
  },
  sdkExpert: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
  },
})

export const MultipleAssistants = () => {
  const message = "Describe Teampilot in one sentence"
  const defaultAnswer = use(teampilot.default.fetchText({ message }))
  const expertAnswer = use(teampilot.sdkExpert.fetchText({ message }))

  return (
    <>
      <div>
        <strong className="text-primary">Default</strong>
        <div>{defaultAnswer}</div>
        <br />
        <strong className="text-primary">Expert</strong>
        <div>{expertAnswer}</div>
      </div>
    </>
  )
}
