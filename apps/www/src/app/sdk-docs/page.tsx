import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { Divider } from "~/shared/Divider"
import { ApiReference } from "./ApiReference"
import { InstallationAndSetup } from "./InstallationAndSetup"
import { NavigationFooter } from "~/shared/navigation-footer"

const markdown = `
# SDK Docs

The Teampilot SDK is a wrapper around the API and makes working with it in Typescript a bit nicer. You can use the SDK to fetch data from Teampilot, and to create a Teampilot client.
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <IntersectionChecker topic="/sdk-docs" />
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <Divider />
      <InstallationAndSetup />
      <Divider />
      <ApiReference />
      <NavigationFooter 
        prevHref="/examples" 
        prevLabel="Examples"
        nextHref="/api-docs"
        nextLabel="API Docs"
      />
    </div>
  )
}
