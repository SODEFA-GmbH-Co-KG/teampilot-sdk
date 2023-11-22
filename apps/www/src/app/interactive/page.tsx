import { DocsLinksGrid } from "~/client/DocsLink"
import { ShowCase } from "~/client/ShowCase"
import { ChatExample } from "~/client/examples/ChatExample"
import { DayInHistorySelector } from "~/client/examples/DayInHistory"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Next.js Interactive Example"
        description="You can use the SDK in a Next.js app and generate data on the fly. This is useful when you want to generate data based on user input."
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

      <DocsLinksGrid destinations={["/functions-examples", "/media"]} />
    </>
  )
}
