import ReactMarkdown from "~/client/CustomReactMarkdown"
import { generateOgUrl } from "../og/generateOGUrl"

export const metadata = {
  openGraph: {
    title: `Teampilot API | Teampilot Docs`,
    type: "article",
    images: [
      {
        url: generateOgUrl({ title: "Teampilot API" }),
        width: 1200,
        height: 630,
        alt: "Teampilot API",
      },
    ],
    siteName: "docs.teampilot.ai",
  },
}

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
