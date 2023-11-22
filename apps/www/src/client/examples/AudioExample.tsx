import { fetchTeampilotMedia } from "@teampilot/sdk/src/fetchTeampilot"
import { env } from "~/env.mjs"

export const AudioExample = async () => {
  const media = await fetchTeampilotMedia({
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE,
    message: "Read this Website to me: https://teampilot.ai",
    cacheTtlSeconds: "forever",
  })

  return (
    <>
      <audio controls src={media.url} />
    </>
  )
}
