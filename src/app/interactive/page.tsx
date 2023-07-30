import { DayInHistorySelector } from "~/client/examples/DayInHistory"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Interactive Example"
        file="/src/client/examples/DayInHistory.tsx"
      >
        <DayInHistorySelector />
      </ShowCase>
    </>
  )
}
