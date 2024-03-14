import { fetchTeampilotText } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"
import { fetchWikipediaArticle } from "./fetchWikipedia"

export const Wikipedia = async () => {
  const answer = await fetchTeampilotText({
    launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    accessLevel: "LINK_WRITE",
    message:
      "How did Luna 25 land on the moon? Please use Wikipedia as a source.",
    customFunctions: [
      {
        nameForAI: "fetchWikipediaArticle",
        descriptionForAI: "Fetch a Wikipedia article",
        inputSchema: z.object({
          articleName: z.string(),
        }),
        execute: async ({ input }) => {
          const output = await fetchWikipediaArticle(input.articleName)
          return { output }
        },
      },
    ],
  })
  return answer
}
