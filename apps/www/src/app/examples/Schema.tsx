import { Persons } from "~/client/examples/Persons"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"

export const Schema = () => {
  return (
    <>
      <IntersectionChecker topic="/examples#schema" />
      <ShowCase
        title="Generating data with a schema"
        description="Teampilot can generate data for you and even format it according to a schema you specify. This is useful when you want to generate data for a specific purpose. For instance, you can generate a list of presidents and some information abut them.
The format ca be specified with a zod schema."
        file="/src/client/examples/Persons.tsx"
      >
        <Persons />
      </ShowCase>
    </>
  )
}