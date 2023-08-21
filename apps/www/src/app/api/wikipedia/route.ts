import { teampilotFunctionHandler } from "@teampilot/sdk"
import { z } from "zod"
import { fetchWikipediaArticle } from "~/client/examples/wikipedia/fetchWikipedia"

const handler = teampilotFunctionHandler({
  functions: [
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

export const GET = handler
export const POST = handler
