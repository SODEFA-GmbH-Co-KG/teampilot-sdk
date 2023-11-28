import { Collections } from "~/client/examples/Collections"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        layout="side-by-side"
        title="Collections"
        file="/src/client/examples/Collections.tsx"
      >
        <Collections />
      </ShowCase>
    </>
  )
}
