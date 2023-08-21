import { z } from 'zod'
import { TeampilotCustomFunction } from './fetchTeampilot'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

const jsonHandler = (
  handler: (request: Request) => Promise<object | Response>
) => {
  return async (request: Request) => {
    try {
      const response = await handler(request).catch((error) => {
        return {
          error: error?.message ?? error?.toString() ?? 'Unknown Error',
        }
      })
      if (response instanceof Response) return response
      return new Response(JSON.stringify(response), {
        headers: { 'content-type': 'application/json' },
      })
    } catch (error: any) {
      const response = {
        error: error?.message ?? error?.toString() ?? 'Unknown Error',
      }
      return new Response(JSON.stringify(response), {
        headers: { 'content-type': 'application/json' },
        status: 400,
      })
    }
  }
}

export const teampilotFunctionHandler = ({
  functions,
}: {
  functions: TeampilotCustomFunction<any>[]
}) => {
  const handler = jsonHandler(async (request: Request) => {
    if (request.method === 'GET') {
      const descriptions = functions.map((fn) => {
        return {
          ...fn,
          inputSchema: transformZodToJsonSchema(fn.inputSchema),
          execute: undefined,
        }
      })

      return {
        functions: descriptions,
      }
    } else if (request.method === 'POST') {
      const body = await request.json()

      const { functionName } = z
        .object({
          functionName: z.string(),
        })
        .parse(body)

      const fn = functions.find((fn) => fn.nameForAI === functionName)
      if (!fn) {
        throw new Error(`Function ${functionName} not found`)
      }

      const { input } = z
        .object({
          input: fn.inputSchema,
        })
        .parse(body)

      const functionResult = await fn
        .execute(input)
        .then((data) => ({ output: JSON.stringify(data, null, 2) }))
        .catch((error) => ({
          error: error?.message ?? error?.toString() ?? 'Unknown Error',
        }))

      return {
        ...functionResult,
      }
    } else {
      return new Response('Method not allowed', {
        status: 405,
      })
    }
  })

  return handler
}
