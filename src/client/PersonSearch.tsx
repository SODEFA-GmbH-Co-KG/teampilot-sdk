import { useQuery } from "@tanstack/react-query"
import { fetchTeampilot } from "~/teampilot-sdk/teampilot"

export const PersonSearch = () => {
  const { data, refetch, isFetching } = useQuery(
    ["persons"],
    async () => {
      const response = await fetchTeampilot({
        message: "First 3 Presidents of the US",
      })
      return response
    },
    {
      enabled: false,
    }
  )

  return (
    <>
      <div>Persons</div>
      <button onClick={() => refetch()}>Refetch</button>
      {isFetching && <div>Loading...</div>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
