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
