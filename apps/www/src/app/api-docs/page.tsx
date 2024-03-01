import ReactMarkdown from "react-markdown"

const markdown = `
# Teampilot API
In addition to the AI generation API that produces AI outputs, Teampilot offers a variety of other endpoints capable of performing tasks such as document upload. These endpoints are currently not documented, but can be found in the OpenAPI specification available at [this link](https://teampilot.ai/docs/api).
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
