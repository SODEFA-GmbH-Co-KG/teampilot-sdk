import { Widget } from "~/client/examples/Widget"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Widget"
        file="/src/client/examples/Widget.tsx"
        layout="side-by-side"
      >
        <Widget />
      </ShowCase>
    </>
  )
}
