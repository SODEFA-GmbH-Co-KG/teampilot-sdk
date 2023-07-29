import { ShowCase } from "~/client/ShowCase"
import { Today } from "~/client/Today"

export default function Page() {
  return (
    <>
      <ShowCase title="Interactive Example" file="./src/client/Today.tsx">
        <Today />
      </ShowCase>
    </>
  )
}
