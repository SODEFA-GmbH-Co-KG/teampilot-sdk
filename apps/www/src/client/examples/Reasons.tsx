import { fetchTeampilotData } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"

export const Reasons = async () => {
  const reasons = await fetchTeampilotData({
    launchpadSlugId: env.LAUNCHPAD_SLUG_ID_SDK_EXPERT,
    message: "5 Reasons why Teampilot SDK is awesome",
    schema: z.array(z.string()),
  })
  return (
    <ul className="list-disc space-y-2">
      {reasons.map((reason, idx) => (
        <li key={idx}>{reason}</li>
      ))}
    </ul>
  )
}
