import { ShowCase } from "~/client/ShowCase"
import { DayInHistorySelector } from "~/client/examples/DayInHistory"

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
