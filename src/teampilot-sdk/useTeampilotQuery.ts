import { useQuery } from "@tanstack/react-query"
import { type z } from "zod"
import { fetchTeampilot } from "./teampilot"

export const useTeampilotQuery = <T extends z.Schema = z.ZodUndefined>({
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
      const response = await fetchTeampilot<T>({
        message: query,
        schema,
      })
      return response.message?.data
    },
    {
      staleTime: Infinity,
    }
  )
}
