import { teampilot } from "~/teampilot"

export const AudioExample = async () => {
  // const media = await teampilot.websiteToVoice.fetchMedia({
  //   message: "Read this Website to me: https://teampilot.ai",
  // })
  const media = await teampilot.functions.fetchMedia({
    message: `Read out this document: clkog80n9002mjg08l5idr0cf`,
  })

  return (
    <>
      <audio controls src={media.url} />
    </>
  )
}
