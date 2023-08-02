import { ShowCase } from "~/client/ShowCase"
import { ChatExample } from "~/client/examples/ChatExample"
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
      <ShowCase
        title="Multiple Messages in Chat"
        file="/src/client/examples/ChatExample.tsx"
        layout="side-by-side"
      >
        <ChatExample />
      </ShowCase>
    </>
  )
}
