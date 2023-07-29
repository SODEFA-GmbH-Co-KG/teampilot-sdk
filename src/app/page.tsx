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
      <ShowCase title="Setup" file="./src/teampilot.ts" layout="side-by-side">
        <ShowCase file="./src/client/MultipleAssistants.tsx" layout="tabs">
          <MultipleAssistants />
        </ShowCase>
      </ShowCase>
    </>
  )
}
