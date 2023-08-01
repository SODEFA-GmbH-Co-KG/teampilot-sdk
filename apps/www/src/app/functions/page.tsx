import { Form } from "~/client/examples/Form"
import { Time } from "~/client/examples/Time"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Time"
        file="/src/client/examples/Time.tsx"
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
      <ShowCase
        title="Form"
        file="/src/client/examples/Form.tsx"
        layout="side-by-side"
      >
        <Form />
      </ShowCase>
    </>
  )
}
