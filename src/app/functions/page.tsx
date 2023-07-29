import { Time } from "~/client/examples/Time"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Time Function"
        file="./src/client/examples/Time.tsx"
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
    </>
  )
}
