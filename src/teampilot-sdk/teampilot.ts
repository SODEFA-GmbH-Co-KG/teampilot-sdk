import { z } from "zod"
import { env } from "~/env.mjs"

export const fetchTeampilot = async ({ message }: { message: string }) => {
  const url = `http://localhost:3000/api/rest/message`

  const inputSchema = null

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
      message,
    }),
  })

  const responseSchema = z.object({
    message: z.object({
      content: z.string().optional(),
      data: inputSchema ?? z.undefined(),
    }),
    usage: z.object({
      teamTokens: z.number(),
    }),
  })

  const data = await response.json()
  const parsed = responseSchema.parse(data)

  return parsed
}
