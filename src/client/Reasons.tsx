import { use } from "react"
import { z } from "zod"
import { fetchTeampilotData } from "~/teampilot-sdk/teampilot"

export const Reasons = () => {
  const reasons = use(
    fetchTeampilotData({
      message: "5 Reasons why NextJS is awesome",
      schema: z.array(z.string()),
    })
  )
  return (
    <>
      <ul className="list-outside list-disc">
        {reasons.map((reason, idx) => {
          return <li key={idx}>{reason}</li>
        })}
      </ul>
    </>
  )
}
