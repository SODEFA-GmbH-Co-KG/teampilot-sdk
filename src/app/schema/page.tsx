import { Persons } from "~/client/examples/Persons"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase title="Presidents" file="/src/client/examples/Persons.tsx">
        <Persons />
      </ShowCase>
    </>
  )
}
