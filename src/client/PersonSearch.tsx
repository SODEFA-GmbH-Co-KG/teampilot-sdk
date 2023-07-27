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
      {persons?.map((p, idx) => {
        return (
          <div key={idx}>
            <div>{p.firstName}</div>
            <div>{p.lastName}</div>
            <div>{p.dateOfBirth}</div>
            <div>{p.shortDescription}</div>
            {/* <img src={p.imageUrl} alt="" /> */}
          </div>
        )
      })}
    </>
  )
}
