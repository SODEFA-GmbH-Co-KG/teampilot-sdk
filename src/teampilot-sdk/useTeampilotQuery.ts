import { useQuery } from "@tanstack/react-query"
import { type z } from "zod"
import { env } from "~/env.mjs"
import { fetchTeampilotData } from "."

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
        launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
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
