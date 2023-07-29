import { use } from "react"
import { teampilot } from "~/teampilot"

export const AudioExample = () => {
  const media = use(
    teampilot.functions.fetchMedia({
      // message: "Read this Website to me: https://teampilot.ai",
      message: `Read out this document: clkog80n9002mjg08l5idr0cf`,
    })
  )

  return (
    <>
      <audio controls src={media.url} />
    </>
  )
}
