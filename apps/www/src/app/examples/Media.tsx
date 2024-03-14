import { ImageExample } from "~/client/examples/ImageExample"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"

export const Media = async () => {
  return (
    <>
      <IntersectionChecker topic="/examples#media" />
      <ShowCase
        title="Image"
        code={`
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
`}
        layout="side-by-side"
      >
        <ImageExample />
      </ShowCase>
      {/* <ShowCase
        title="Audio"
        code={`
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
`}
        layout="side-by-side"
      >
        <AudioExample />
      </ShowCase> */}
    </>
  )
}
