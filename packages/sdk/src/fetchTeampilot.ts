import { z } from 'zod'
import { TeampilotCustomFunction } from './TeampilotCustomFunction'
import { getEnv } from './denoCompatibility/getEnv'
import { getBaseUrl } from './getBaseUrl'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

const DEFAULT_MAX_CUSTOM_FUNCTION_EXECUTIONS = 10

export type FetchTeampilotOptions<T extends z.Schema = z.ZodUndefined> = {
  launchpadSlugId?: string
  message: string
  schema?: T
  url?: string
  cacheTtlSeconds?: number | 'forever'
  chatroomId?: string
  previousMessageId?: string
  accessLevel?: 'TEAM' | 'LINK_READ' | 'LINK_WRITE'
  customFunctions?: TeampilotCustomFunction<any>[]
  customFunctionsMaxExecutions?: number
  functionExecution?: {
    name: string
    error?: string
  }
} & Omit<RequestInit, 'body' | 'method'> & {
    // TODO: NextJS 13 overrides the global RequestInit type. But when this SDK is packaged it inlines the RequestInit type from the global scope. This is a workaround to enable usage with NextJS 13.
    next?: {
      revalidate?: number | false
      tags?: string[]
    }
  }

const createResponseSchema = <T extends z.Schema = z.ZodUndefined>(
  schema: T
) => {
  return z.object({
    message: z.object({
      id: z.string(),
      functionName: z.string().optional(),
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
    cachedAt: z.string().optional(),
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

export const fetchTeampilot = async <T extends z.Schema = z.ZodUndefined>(
  options: FetchTeampilotOptions<T>
): Promise<FetchTeampilotResponse<T>> => {
  let {
    launchpadSlugId,
    message,
    schema,
    url: overrideUrl,
    cacheTtlSeconds,
    chatroomId,
    previousMessageId,
    accessLevel,
    customFunctions,
    customFunctionsMaxExecutions = DEFAULT_MAX_CUSTOM_FUNCTION_EXECUTIONS,
    functionExecution,
    ...requestOptions
  } = options

  if (!launchpadSlugId) {
    launchpadSlugId =
      (await getEnv('TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID')) ||
      (await getEnv('NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID'))
  }
  if (!launchpadSlugId) {
    throw new Error(
      'Provide a launchpadSlugId in the function call or in the environment variables via TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID or NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID'
    )
  }

  if (customFunctions?.length && accessLevel !== 'LINK_WRITE') {
    throw new Error(
      `You need to set accessLevel to 'LINK_WRITE' when providing custom functions`
    )
  }

  const defaultCacheTtlSecondsEnv =
    (await getEnv('TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS')) ||
    (await getEnv('NEXT_PUBLIC_TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS'))
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

  const url = overrideUrl || `${await getBaseUrl()}/api/rest/message`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-sdk-version': '0.0.20', // used to break next.js cache when the zod schema changes
      ...requestOptions.headers,
    },
    body: JSON.stringify({
      launchpadSlugId,
      message,
      schema: schema ? transformZodToJsonSchema(schema) : null,
      cacheTtlSeconds,
      chatroomId,
      previousMessageId,
      accessLevel: chatroomId ? undefined : accessLevel,
      customFunctions: customFunctions?.map((customFunction) => ({
        ...customFunction,
        inputSchema: transformZodToJsonSchema(customFunction.inputSchema),
      })),
      functionExecution,
    }),
    ...requestOptions,
  })

  const responseSchema = createResponseSchema(z.any())

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

  if (parsed.data.message.functionName) {
    const customFunction = customFunctions?.find(
      (f) => f.nameForAI === parsed.data.message.functionName
    )
    if (!customFunction) {
      throw new Error(
        `Custom function ${parsed.data.message.functionName} not found`
      )
    }
    if (customFunctionsMaxExecutions <= 0) {
      throw new Error(
        `Custom function ${parsed.data.message.functionName} exceeded maximum number of executions`
      )
    }
    const functionInput = parsed.data.message.data
    const inputParsed = customFunction?.inputSchema?.safeParse(functionInput)
    if (!inputParsed.success) {
      throw new Error(`Function Input Schema Error: ${inputParsed.error}`)
    }
    const functionResult = await customFunction
      .execute({ input: inputParsed.data })
      .catch((error) => ({
        error: error?.message ?? error?.toString() ?? 'Unknown Error',
      }))

    // Recursion:
    const result = await fetchTeampilot({
      ...options,
      customFunctionsMaxExecutions: customFunctionsMaxExecutions - 1,
      chatroomId: parsed.data.chatroom.id,
      previousMessageId: parsed.data.message.id,
      message:
        'error' in functionResult
          ? JSON.stringify(functionResult.error, null, 2)
          : JSON.stringify(functionResult.output, null, 2),
      functionExecution: {
        name: customFunction.nameForAI,
        error:
          'error' in functionResult
            ? JSON.stringify(functionResult.error, null, 2)
            : undefined,
      },
    })
    return {
      ...result,
      usage: {
        teamTokens: result.usage.teamTokens + parsed.data.usage.teamTokens,
      },
    }
  }

  const parsedWithSchema = createResponseSchema(
    schema ?? z.undefined()
  ).safeParse(data)
  if (!parsedWithSchema.success) {
    console.error('Response:', data)
    console.error(parsedWithSchema.error)
    throw new Error(parsedWithSchema.error.message)
  }

  return parsedWithSchema.data as FetchTeampilotResponse<T>
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
