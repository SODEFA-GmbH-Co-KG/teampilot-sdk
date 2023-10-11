import ReactMarkdown from "react-markdown"
import { ShowCase } from "~/client/ShowCase"
import { Reasons } from "~/client/examples/Reasons"

const markdown = 
`
# **Integrating Teampilot into Your Product**

Integrating Teampilot into your product implies the extraction of data from Teampilot and leveraging it within your own product.

For better understanding, let's consider an example. We will prompt Teampilot to share a list showcasing the unique features and benefits of the Teampilot SDK. Along with this, we also provide a Zod schema to guide the structure and format in which the data should be returned.
`

export default function Page() {
  return (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>

        <ShowCase
          file="/src/client/examples/Reasons.tsx"
          layout="side-by-side"
        >
          <Reasons />
        </ShowCase>
      </div>
  )
}
