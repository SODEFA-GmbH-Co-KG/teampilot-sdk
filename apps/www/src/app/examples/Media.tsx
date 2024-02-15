import { ImageExample } from "~/client/examples/ImageExample"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"

export const Media = async () => {
  return (
    <>
      <IntersectionChecker topic="/examples#media" />
      <ShowCase
        title="Image"
        file="/src/client/examples/ImageExample.tsx"
        layout="side-by-side"
      >
        <ImageExample />
      </ShowCase>
      {/* <ShowCase
        title="Audio"
        file="/src/client/examples/AudioExample.tsx"
        layout="side-by-side"
      >
        <AudioExample />
      </ShowCase> */}
    </>
  )
}
