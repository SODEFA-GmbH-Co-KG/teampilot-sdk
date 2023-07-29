import { env } from "~/env.mjs"
import { createTeampilotClient } from "~/teampilot-sdk"

export const teampilot = createTeampilotClient({
  default: {
    launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
  },
  sdkExpert: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
  },
})

export const MultipleAssistants = async () => {
  const message = "Describe Teampilot in one sentence"
  const defaultAnswer = await teampilot.default.fetchText({ message })
  const expertAnswer = await teampilot.sdkExpert.fetchText({ message })

  return (
    <>
      <div>
        <strong>Default:</strong>
        <div>{defaultAnswer}</div>
        <br />
        <strong>Expert:</strong>
        <div>{expertAnswer}</div>
      </div>
    </>
  )
}
