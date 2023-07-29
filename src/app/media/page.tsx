import { ImageExample } from "~/client/examples/ImageExample"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Image"
        file="./src/client/examples/ImageExample.tsx"
        layout="side-by-side"
      >
        <ImageExample />
      </ShowCase>
    </>
  )
}
