import { teampilotFunctionHandler } from '@teampilot/sdk'
import { z } from 'zod'
import { fetchWikipediaArticle } from '~/client/examples/wikipedia/fetchWikipedia'

export const { GET, POST } = teampilotFunctionHandler({
  apiKey: '0f5bac52-5243-4fad-9162-33d4f5af22b1',
  checkAuthorization: async (request) => {
    const hello = request.headers.get('hello')
    return hello === 'superduper'
  },
  functions: [
    {
      nameForAI: 'fetchWikipediaArticle',
      descriptionForAI: 'Fetches a Wikipedia article',
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
