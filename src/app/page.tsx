import { MultipleAssistants } from "~/client/MultipleAssistants"
import { Reasons } from "~/client/Reasons"
import { ShowCase } from "~/client/ShowCase"

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
        title="Setup Multiple Assistants"
        file="./src/client/MultipleAssistants.tsx"
        layout="side-by-side"
      >
        <MultipleAssistants />
      </ShowCase>
    </>
  )
}
