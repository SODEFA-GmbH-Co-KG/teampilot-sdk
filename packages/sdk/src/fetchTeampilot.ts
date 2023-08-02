import { z } from 'zod'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

type RequestOptions = Omit<RequestInit, 'body' | 'method'>

export type FetchTeampilotOptions<T extends z.Schema = z.ZodUndefined> = {
  launchpadSlugId?: string
  message: string
  schema?: T
  url?: string
  cacheTtlSeconds?: number | 'forever'
  chatroomId?: string
  accessLevel?: 'TEAM' | 'LINK_READ' | 'LINK_WRITE'
} & RequestOptions

const createResponseSchema = <T extends z.Schema = z.ZodUndefined>(
  schema: T
) => {
  return z.object({
    message: z.object({
      content: z.string().optional(),
      data: schema ?? z.undefined(),
    }),
    mediaAttachments: z
      .array(
        z.object({
          id: z.string(),
          type: z.enum(['AUDIO', 'IMAGE', 'DOCUMENT']),
          url: z.string(),
        })
      )
      .optional(),
    usage: z.object({
      teamTokens: z.number(),
    }),
    chatroom: z.object({
      id: z.string(),
      url: z.string(),
    }),
  })
}

type FetchTeampilotResponse<T extends z.Schema = z.ZodUndefined> = z.infer<
  ReturnType<typeof createResponseSchema<T>>
>

class TeampilotError<T extends z.Schema = z.ZodUndefined> extends Error {
  constructor(message: string, public response: FetchTeampilotResponse<T>) {
    console.error(`${message}: ${response.chatroom.url}`)
    super(message)
  }
}

// export const isTeampilotError = (error: unknown): error is TeampilotError => {
//   return error instanceof TeampilotError
// }

export const fetchTeampilot = async <T extends z.Schema = z.ZodUndefined>({
  launchpadSlugId,
  message,
  schema,
  url: overrideUrl,
  cacheTtlSeconds,
  chatroomId,
  accessLevel,
  ...requestOptions
}: FetchTeampilotOptions<T>) => {
  if (!launchpadSlugId) {
    launchpadSlugId =
      process.env.TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID ||
      process.env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID
  }
  if (!launchpadSlugId) {
    throw new Error(
      'Provide a launchpadSlugId in the function call or in the environment variables via TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID or NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID'
    )
  }

  const defaultCacheTtlSecondsEnv =
    process.env.TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS ||
    process.env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS
  const defaultCacheTtlSeconds = defaultCacheTtlSecondsEnv
    ? defaultCacheTtlSecondsEnv === 'forever'
      ? 'forever'
      : parseInt(defaultCacheTtlSecondsEnv)
    : undefined
  if (cacheTtlSeconds === undefined && defaultCacheTtlSeconds) {
    cacheTtlSeconds = defaultCacheTtlSeconds
  }
  if (cacheTtlSeconds === undefined) {
    cacheTtlSeconds = 'forever'
  }

  // const url = `http://localhost:3000/api/rest/message`
  const url = overrideUrl || `https://teampilot.ai/api/rest/message`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...requestOptions.headers,
    },
    body: JSON.stringify({
      launchpadSlugId,
      message,
      schema: schema ? transformZodToJsonSchema(schema) : null,
      cacheTtlSeconds,
      chatroomId,
      accessLevel,
    }),
    ...requestOptions,
  })

  const responseSchema = createResponseSchema(schema ?? z.undefined())

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  const data = await response.json()
  const parsed = responseSchema.safeParse(data)

  if (!parsed.success) {
    console.error('Response:', data)
    console.error(parsed.error)
    throw new Error(parsed.error.message)
  }

  return parsed.data
}

export const fetchTeampilotData = async <T extends z.Schema>({
  schema,
  ...options
}: FetchTeampilotOptions<T> & {
  schema: T
}) => {
  const response = await fetchTeampilot({
    ...options,
    schema: z.object({
      response: schema,
    }),
  })

  const data = response.message?.data?.response

  if (!data) {
    throw new TeampilotError('API did not return any data', response)
  }
  return data
}

export const fetchTeampilotText = async (
  options: Omit<FetchTeampilotOptions, 'schema'>
) => {
  const response = await fetchTeampilot(options)

  const text = response.message?.content

  if (!text) {
    throw new TeampilotError('API did not return any text', response)
  }
  return text
}

export const fetchTeampilotMedia = async (
  options: Omit<FetchTeampilotOptions, 'schema'>
) => {
  const response = await fetchTeampilot(options)

  const media = response.mediaAttachments?.[0]
  if (!media) {
    throw new TeampilotError('API did not return any media', response)
  }
  return media
}
