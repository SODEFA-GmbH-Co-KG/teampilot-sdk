import ReactMarkdown from "react-markdown"
import { DocsLinksGrid } from "~/client/DocsLink"
const markdown = `
# Teampilot Functions: Extending LLM Capabilities
Functions are a fundamental component in Teampilot, designed to enhance the capabilities of Large Language Models (LLMs) like GPT. 

In many ways, functions in Teampilot mirror those found in programming languages such as Python or Javascript. They accept specified inputs, process them through a series of coded instructions, and yield an output.

Consider, for instance, a function designed to perform complex mathematical calculations. Given that current versions of GPT are not particularly adept at math, this function could take a mathematical expression as an input, evaluate it, and return the computed result. In such a scenario, if the LLM needs to execute a complicated calculation, it can simply invoke this function and delegate the mathematical heavy lifting to it.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown className="w-full">{markdown}</ReactMarkdown>

      <DocsLinksGrid
        destinations={[
          "/teampilot-into-your-product",
          "/your-product-into-teampilot",
        ]}
      />
    </div>
  )
}
