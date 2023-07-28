import { z } from "zod"
import { Button } from "~/shadcn/components/ui/button"
import { useTeampilotQuery } from "~/teampilot-sdk/useTeampilotQuery"

export const PersonSearch = () => {
  const { data, refetch, isFetching } = useTeampilotQuery({
    key: ["persons"],
    query: "First 3 Presidents of the US",
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

  return (
    <>
      <div>Persons</div>
      <Button onClick={() => refetch()}>Refetch</Button>
      {isFetching && <div>Loading...</div>}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid grid-cols-3 gap-2">
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
