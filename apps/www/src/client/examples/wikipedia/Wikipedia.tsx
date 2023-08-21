import { z } from "zod"
import { teampilot } from "~/teampilot"
import { fetchWikipediaArticle } from "./fetchWikipedia"

export const Wikipedia = async () => {
  const answer = await teampilot.default.fetchText({
    message: "How did Luna 25 land on the moon?",
    accessLevel: "LINK_WRITE",
    customFunctions: [
      {
        nameForAI: "fetchWikipediaArticle",
        descriptionForAI: "Fetches a Wikipedia article",
        inputSchema: z.object({
          articleName: z.string(),
        }),
        execute: async (input) => {
          return await fetchWikipediaArticle(input.articleName)
        },
      },
    ],
  })
  return answer
}
