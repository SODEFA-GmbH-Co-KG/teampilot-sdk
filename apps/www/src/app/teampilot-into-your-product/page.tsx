import ReactMarkdown from "react-markdown"
import { DocsLinksGrid } from "~/client/DocsLink"
import { ShowCase } from "~/client/ShowCase"
import { Reasons } from "~/client/examples/Reasons"

const markdown = `
# Integrating Teampilot into Your Product

Integrating Teampilot into your product implies the extraction of data from Teampilot and leveraging it within your own product.

For better understanding, let's consider an example. We will prompt Teampilot to share a list showcasing the unique features and benefits of the Teampilot SDK. Along with this, we also provide a Zod schema to guide the structure and format in which the data should be returned.
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <ShowCase
        layout="side-by-side"
        code={`
import { fetchTeampilotData } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"

export const Reasons = async () => {
  const reasons = await fetchTeampilotData({
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
    message: "5 Reasons why Teampilot SDK is awesome",
    schema: z.array(
      z.object({
        no: z.number(),
        reason: z.string(),
      })
    ),
  })

  return (
    <ul className="space-y-4">
      {reasons.map((reason, idx) => (
        <li key={idx} className="flex flex-row gap-4">
          <strong className="text-2xl text-primary">#{reason.no}</strong>
          <div>{reason.reason}</div>
        </li>
      ))}
    </ul>
  )
}
      `}
      >
        <Reasons />
      </ShowCase>

      <DocsLinksGrid destinations={["/what-are-launchpads"]} />
    </div>
  )
}
