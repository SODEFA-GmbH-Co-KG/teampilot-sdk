import { DayInHistorySelector } from "~/client/DayInHistory"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Interactive Example"
        file="./src/client/DayInHistory.tsx"
      >
        <DayInHistorySelector />
      </ShowCase>
    </>
  )
}
