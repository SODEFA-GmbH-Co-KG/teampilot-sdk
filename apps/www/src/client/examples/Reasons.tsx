import { z } from "zod"
import { teampilot } from "~/teampilot"

export const Reasons = async () => {
  const reasons = await teampilot.sdkExpert.fetchData({
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
