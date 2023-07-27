import { z } from "zod"
import { env } from "~/env.mjs"
import { transformZodSchemaToOpenAi } from "./transformFunctionToOpenAi"

export const fetchTeampilot = async <T extends z.Schema = z.ZodUndefined>({
  message,
  schema,
}: {
  message: string
  schema?: T
}) => {
  // const url = `http://localhost:3000/api/rest/message`
  const url = `https://teampilot.ai/api/rest/message`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
      message,
      schema: schema ? transformZodSchemaToOpenAi(schema) : null,
    }),
  })

  const responseSchema = z.object({
    message: z.object({
      content: z.string().optional(),
      data: schema ?? z.undefined(),
    }),
    usage: z.object({
      teamTokens: z.number(),
    }),
  })

  const data = await response.json()
  const parsed = responseSchema.parse(data)

  return parsed
}
