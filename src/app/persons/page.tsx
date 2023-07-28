import { Persons } from "~/client/Persons"
import { ShowCaseTabs } from "~/client/ShowCaseTabs"

export default function Page() {
  return (
    <>
      <ShowCaseTabs
        title="Presidents"
        // description="so presidential"
        file="./src/client/Persons.tsx"
      >
        <Persons />
      </ShowCaseTabs>
    </>
  )
}
