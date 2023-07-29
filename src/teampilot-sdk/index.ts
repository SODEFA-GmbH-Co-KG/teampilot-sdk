import { z } from "zod"
import { transformZodSchemaToOpenAi } from "./transformFunctionToOpenAi"

type RequestOptions = Omit<RequestInit, "body" | "method">

export const fetchTeampilot = async <T extends z.Schema = z.ZodUndefined>({
  launchpadSlugId,
  message,
  schema,
  ...requestOptions
}: {
  launchpadSlugId: string
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
      launchpadSlugId,
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
  launchpadSlugId,
  message,
  schema,
  ...requestOptions
}: {
  launchpadSlugId: string
  message: string
  schema: T
} & RequestOptions) => {
  const response = await fetchTeampilot({
    launchpadSlugId,
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

export const fetchTeampilotText = async ({
  launchpadSlugId,
  message,
  ...requestOptions
}: {
  launchpadSlugId: string
  message: string
} & RequestOptions) => {
  const response = await fetchTeampilot({
    launchpadSlugId,
    message,
    ...requestOptions,
  })

  const text = response.message?.content

  if (!text) {
    throw new Error("No text")
  }
  return text
}
