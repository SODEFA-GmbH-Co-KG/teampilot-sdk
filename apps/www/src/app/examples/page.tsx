import ReactMarkdown from "react-markdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { Schema } from "./Schema"

const markdown = `
# Examples

Following you will find a collection of examples that demonstrate how to use the Teampilot SDK in your app. You will learn how to generate data, interact with the AI, and use the generated data in your app.
`

export default function Page() {
  return (
    <div className="flex flex-col gap-8 py-8 md:pl-6">
      <div className="prose max-w-[inherit] dark:prose-invert">
        <IntersectionChecker topic="/examples" />
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <Schema />
      {/* <Divider />
      <Interaction />
      <Divider />
      <Functions />
      <Divider />
      <Media />
      <Divider />
      <Seo /> */}
      {/* <Divider />
      <Future /> */}
    </div>
  )
}
