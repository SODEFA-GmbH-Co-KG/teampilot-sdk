import { Collections } from "~/client/examples/Collections"
import { ShowCase } from "~/client/ShowCase"

export const dynamic = "force-dynamic" // TODO:  force dynamic because collections are not in teampilot production and we dont have an error while building

export default function Page() {
  return (
    <>
      <ShowCase
        // layout="side-by-side"
        title="Collections"
        file="/src/client/examples/Collections.tsx"
      >
        <Collections />
      </ShowCase>
    </>
  )
}
