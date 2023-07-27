import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { fetchTeampilot } from "~/teampilot-sdk/teampilot"

export const PersonSearch = () => {
  const { data, refetch, isFetching } = useQuery(
    ["persons"],
    async () => {
      const response = await fetchTeampilot({
        message: "First 3 Presidents of the US",
        schema: z.object({
          persons: z.array(
            z.object({
              firstName: z.string(),
              lastName: z.string(),
              dateOfBirth: z.string(),
              shortDescription: z.string(),
              // imageUrl: z.string(),
            })
          ),
        }),
      })
      return response
    },
    {
      enabled: false,
    }
  )

  const persons = data?.message.data?.persons

  return (
    <>
      <div>Persons</div>
      <button onClick={() => refetch()}>Refetch</button>
      {isFetching && <div>Loading...</div>}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid grid-cols-3 gap-2">
        {persons?.map((p, idx) => {
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
