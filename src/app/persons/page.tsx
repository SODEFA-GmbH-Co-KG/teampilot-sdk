import { Persons } from "~/client/Persons"
import { ShowCaseSideBySide } from "~/client/ShowCaseSideBySide"

export default function Page() {
  return (
    <>
      <ShowCaseSideBySide file="./src/client/Persons.tsx">
        <Persons />
      </ShowCaseSideBySide>
    </>
  )
}
