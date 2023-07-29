import { Reasons } from "~/client/Reasons"
import { ShowCase } from "~/client/ShowCase"
import { Today } from "~/client/Today"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Simple Example"
        file="./src/client/Reasons.tsx"
        layout="side-by-side"
      >
        <Reasons />
      </ShowCase>
      <ShowCase
        title="Interactive Example"
        file="./src/client/Today.tsx"
        layout="side-by-side"
      >
        <Today />
      </ShowCase>
    </>
  )
}
