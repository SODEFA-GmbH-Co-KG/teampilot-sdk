import { ShowCase } from "~/client/ShowCase"
import { MultipleAssistants } from "~/client/examples/MultipleAssistants"
import { Reasons } from "~/client/examples/Reasons"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Simple Example"
        file="./src/client/examples/Reasons.tsx"
        layout="side-by-side"
      >
        <Reasons />
      </ShowCase>
      <ShowCase
        title="Setup Multiple Assistants"
        file="./src/client/examples/MultipleAssistants.tsx"
        layout="side-by-side"
      >
        <MultipleAssistants />
      </ShowCase>
    </>
  )
}
