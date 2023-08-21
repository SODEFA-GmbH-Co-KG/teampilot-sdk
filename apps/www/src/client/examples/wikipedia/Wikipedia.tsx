import { fetchTeampilotText } from "@teampilot/sdk"
import { z } from "zod"
import { fetchWikipediaArticle } from "./fetchWikipedia"

export const Wikipedia = async () => {
  const answer = await fetchTeampilotText({
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