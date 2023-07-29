import { z } from "zod"
import { env } from "~/env.mjs"
import { transformZodSchemaToOpenAi } from "./transformFunctionToOpenAi"

type RequestOptions = Omit<RequestInit, "body" | "method">

export const fetchTeampilot = async <T extends z.Schema = z.ZodUndefined>({
  message,
  schema,
  ...requestOptions
}: {
  message: string
  schema?: T
} & RequestOptions) => {
  // const url = `http://localhost:3000/api/rest/message`
  const url = `https://teampilot.ai/api/rest/message`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...requestOptions.headers,
    },
    body: JSON.stringify({
      launchpadSlugId: env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID,
      message,
      schema: schema ? transformZodSchemaToOpenAi(schema) : null,
    }),
    ...requestOptions,
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

export const fetchTeampilotData = async <T extends z.Schema>({
  message,
  schema,

  ...requestOptions
}: {
  message: string
  schema: T
} & RequestOptions) => {
  const response = await fetchTeampilot({
    message,
    schema: z.object({
      response: schema,
    }),
    ...requestOptions,
  })

  const data = response.message?.data?.response

  if (!data) {
    throw new Error("No data")
  }
  return data
}
