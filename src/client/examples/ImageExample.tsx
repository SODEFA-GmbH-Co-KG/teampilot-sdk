import Image from "next/image"
import { use } from "react"
import { teampilot } from "~/teampilot"

export const ImageExample = () => {
  const media = use(
    teampilot.functions.fetchMedia({
      message: "Generate an Image of a flying elephant",
    })
  )

  return (
    <>
      <Image src={media.url} height={500} width={500} alt="Flying Elephant" />
    </>
  )
}
