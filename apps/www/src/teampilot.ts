import { env } from "./env.mjs"
import { createTeampilotClient } from "./teampilot-sdk"

export const teampilot = createTeampilotClient({
  default: {
    launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
  },
  sdkExpert: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
  },
  functions: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_FUNCTIONS,
  },
  websiteToVoice: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE,
  },
  textToSpeech: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_TEXT_TO_SPEECH,
  },
  todoApp: {
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_TODO_APP,
  },
})
