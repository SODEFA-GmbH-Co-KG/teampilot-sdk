import { Persons } from "~/client/Persons"
import { ShowCaseTabs } from "~/client/ShowCaseTabs"

export default function Page() {
  return (
    <>
      <ShowCaseTabs file="./src/client/Persons.tsx">
        <Persons />
      </ShowCaseTabs>
    </>
  )
}
