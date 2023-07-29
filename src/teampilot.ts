import { env } from "./env.mjs"
import { createTeampilotClient } from "./teampilot-sdk"

export const teampilot = createTeampilotClient({
  default: {
    launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
  },
  sdkExpert: {
    launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
  },
})
