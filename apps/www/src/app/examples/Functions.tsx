import ReactMarkdown from "react-markdown"
import { AnchorDiv } from "~/client/AnchorDiv"
import { Time } from "~/client/examples/Time"
import { Wikipedia } from "~/client/examples/wikipedia/Wikipedia"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"
import { getIdForTopic } from "~/utils/navTopics"

const markdown = `
# Functions
`

export const Functions = async () => {
  const functionsId = getIdForTopic({ secondLevelSlug: "#functions" })
  const timeId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-time",
  })
  const formId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-form",
  })
  const passingCustomFuctionsId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-passing-custom-functions",
  })
  const callingAFuctionFromWidgetId = getIdForTopic({
    secondLevelSlug: "#functions",
    thirdLevelSlug: "-calling-a-function-from-widget",
  })
  return (
    <>
      <IntersectionChecker topic="/examples#functions" />
      <AnchorDiv id={functionsId} />
      <div className="prose dark:prose-invert max-w-[inherit]">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <IntersectionChecker topic={`/examples#${timeId}`} />
      <AnchorDiv id={timeId} />
      <ShowCase
        title="Time"
        file="/src/client/examples/Time.tsx"
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
      <IntersectionChecker topic={`/examples#${formId}`} />
      <AnchorDiv id={formId} />
      {/* FIXME: The server action seems to break the other components. */}
      {/* <ShowCase
        title="Form"
        file="/src/client/examples/Form.tsx"
        layout="side-by-side"
      >
        <Form />
      </ShowCase> */}
      <IntersectionChecker topic={`/examples#${passingCustomFuctionsId}`} />
      <AnchorDiv id={passingCustomFuctionsId} />
      <ShowCase
        title="Passing custom functions"
        description="You can pass custom functions to the SDK that the AI can call. In this example we pass it a function that can fetch articles from Wikipedia, but you can pass any function you want. For example you could pass a function that fetches data from your database, or a function that mutates things on your side."
        file="/src/client/examples/wikipedia/Wikipedia.tsx"
        layout="side-by-side"
      >
        <Wikipedia />
      </ShowCase>
    </>
  )
}
