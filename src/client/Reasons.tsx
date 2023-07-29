import { z } from "zod"
import { fetchTeampilotData } from "~/teampilot-sdk"

export const Reasons = async () => {
  const reasons = await fetchTeampilotData({
    message: "5 Reasons why NextJS is awesome",
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
