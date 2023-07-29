import Image from "next/image"
import { use } from "react"
import { teampilot } from "~/teampilot"

export const ImageExample = () => {
  const media = use(
    teampilot.functions.fetchMedia({
      message: "Generate an iOS Wallpaper",
    })
  )

  return (
    <>
      <Image src={media.url} height={600} width={400} alt="Wallpaper" />
    </>
  )
}
