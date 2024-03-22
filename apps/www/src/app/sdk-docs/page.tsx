import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { Divider } from "~/shared/Divider"
import { generateOgUrl } from "../og/generateOGUrl"
import { ApiReference } from "./ApiReference"
import { InstallationAndSetup } from "./InstallationAndSetup"

export const metadata = {
  openGraph: {
    title: `SDK Docs | Teampilot Docs`,
    type: "article",
    images: [
      {
        url: generateOgUrl({ title: "SDK Docs" }),
        width: 1200,
        height: 630,
        alt: "SDK Docs",
      },
    ],
    siteName: "docs.teampilot.ai",
  },
}

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
    </div>
  )
}
