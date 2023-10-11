import { fetchTeampilotMedia } from "@teampilot/sdk/src/fetchTeampilot"
import { env } from "~/env.mjs"

export const AudioExample = async () => {
  const media = await fetchTeampilotMedia({
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_WEBSITE_TO_VOICE,
    message:
      "Read this Website to me: https://teampilot.ai use the functions please",
    // cacheTtlSeconds: 60 * 60 * 24, // 1 day
    cacheTtlSeconds: 0,
  })

  return (
    <>
      <audio controls src={media.url} />
    </>
  )
}
