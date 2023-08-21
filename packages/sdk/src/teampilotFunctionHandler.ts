import { z } from 'zod'
import { TeampilotCustomFunction } from './fetchTeampilot'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

const jsonHandler = (handler: (request: Request) => Promise<object>) => {
  return async (request: Request) => {
    try {
      const response = await handler(request).catch((error) => {
        return {
          error: error?.message ?? error?.toString() ?? 'Unknown Error',
        }
      })
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
  return {
    GET: jsonHandler(async () => {
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
    }),
    POST: jsonHandler(async (request: Request) => {
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
        .then((data) => ({ data: JSON.stringify(data, null, 2) }))
        .catch((error) => ({
          error: error?.message ?? error?.toString() ?? 'Unknown Error',
        }))

      return {
        ...functionResult,
      }
    }),
  }
}
