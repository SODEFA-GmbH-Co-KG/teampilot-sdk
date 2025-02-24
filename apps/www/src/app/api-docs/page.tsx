import ReactMarkdown from "~/client/CustomReactMarkdown"
import { NavigationFooter } from "~/shared/navigation-footer"

const markdown = `
# Teampilot API
In addition to the AI generation API that produces AI outputs, Teampilot offers a variety of other endpoints capable of performing tasks such as document upload. These endpoints are currently not documented, but can be found in the OpenAPI specification available at [this link](https://teampilot.ai/docs/api).
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <NavigationFooter 
        prevHref="/sdk-docs" 
        prevLabel="SDK Docs"
      />
    </div>
  )
}
