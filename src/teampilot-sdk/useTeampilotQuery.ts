import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import { fetchTeampilot } from "./teampilot"

export const useTeampilotQuery = <T extends z.Schema>({
  key,
  query,
  schema,
}: {
  key: string[]
  query: string
  schema: T
}) => {
  return useQuery(
    key,
    async () => {
      const response = await fetchTeampilot({
        message: query,
        schema: z.object({
          response: schema,
        }),
      })
      return response.message?.data?.response
    },
    {
      staleTime: Infinity,
    }
  )
}
