import { teampilotFunctionHandler } from "@teampilot/sdk"
import { z } from "zod"
import { fetchWikipediaArticle } from "~/client/examples/wikipedia/fetchWikipedia"

export const { GET, POST } = teampilotFunctionHandler({
  functionSecret: "fs_b7ce43261f54415c96e6aeedc6f8dcb1",
  functions: [
    {
      nameForAI: "fetchWikipediaArticle",
      descriptionForAI: "Fetches a Wikipedia article",
      inputSchema: z.object({
        articleName: z.string(),
      }),
      execute: async ({ input }) => {
        const output = await fetchWikipediaArticle(input.articleName)

        return {
          output,
        }
      },
    },
  ],
})
