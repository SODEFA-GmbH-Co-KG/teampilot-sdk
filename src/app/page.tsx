import { Reasons } from "~/client/Reasons"
import { ShowCaseSideBySide } from "~/client/ShowCaseSideBySide"

export default function Page() {
  return (
    <>
      <ShowCaseSideBySide file="./src/client/Reasons.tsx">
        <Reasons />
      </ShowCaseSideBySide>
    </>
  )
}
