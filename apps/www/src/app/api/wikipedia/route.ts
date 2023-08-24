import { teampilotFunctionHandler } from "@teampilot/sdk"
import { z } from "zod"
import { fetchWikipediaArticle } from "~/client/examples/wikipedia/fetchWikipedia"

export const { GET, POST } = teampilotFunctionHandler({
  functions: [
    {
      nameForAI: "fetchWikipediaArticle",
      descriptionForAI: "Fetches a Wikipedia article",
      inputSchema: z.object({
        articleName: z.string(),
      }),
      execute: async ({ input }) => {
        return await fetchWikipediaArticle(input.articleName)
      },
    },
  ],
})
