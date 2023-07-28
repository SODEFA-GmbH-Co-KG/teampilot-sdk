import { useQuery } from "@tanstack/react-query"
import { type z } from "zod"
import { fetchTeampilotData } from "./teampilot"

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
      const response = await fetchTeampilotData({
        message: query,
        schema,
      })
      return response
    },
    {
      staleTime: Infinity,
    }
  )
}
