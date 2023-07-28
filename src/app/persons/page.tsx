import { use } from "react"
import { z } from "zod"
import { fetchTeampilotData } from "~/teampilot-sdk/teampilot"

export default function Page() {
  const data = use(
    fetchTeampilotData({
      message: "First 6 Presidents of the US",
      schema: z.array(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          dateOfBirth: z.string(),
          shortDescription: z.string(),
          // imageUrl: z.string(),
        })
      ),
    })
  )

  return (
    <>
      <div>Persons</div>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((p, idx) => {
          return (
            <div key={idx}>
              <div className="text-xl">
                <span>{p.firstName}</span> <strong>{p.lastName}</strong>
              </div>
              <div className="font-mono">{p.dateOfBirth}</div>
              <div className="text-sm opacity-80">{p.shortDescription}</div>
              {/* <img src={p.imageUrl} alt="" /> */}
            </div>
          )
        })}
      </div>
    </>
  )
}
