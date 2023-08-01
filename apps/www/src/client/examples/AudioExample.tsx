import { teampilot } from "~/teampilot"

export const AudioExample = async () => {
  const media = await teampilot.websiteToVoice.fetchMedia({
    message: "Read this Website to me: https://teampilot.ai",
    cacheTtlSeconds: "forever",
  })

  return (
    <>
      <audio controls src={media.url} />
    </>
  )
}
