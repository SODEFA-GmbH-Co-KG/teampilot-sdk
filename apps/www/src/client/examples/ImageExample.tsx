import { fetchTeampilotMedia } from "@teampilot/sdk/src/fetchTeampilot"
import Image from "next/image"
import { use } from "react"
import { env } from "~/env.mjs"

export const ImageExample = () => {
  const media = use(
    fetchTeampilotMedia({
      launchpadSlugId: env.LAUNCHPAD_SLUG_ID_FUNCTIONS,
      message: "Generate an Image of a flying elephant",
      cacheTtlSeconds: 60 * 60 * 24, // 1 day
    })
  )

  return (
    <>
      <Image src={media.url} height={500} width={500} alt="Flying Elephant" />
    </>
  )
}
