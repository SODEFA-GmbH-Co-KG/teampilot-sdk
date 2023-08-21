import { z } from 'zod'
import { TeampilotCustomFunction } from './fetchTeampilot'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

export const teampilotFunctionHandler = ({
  functions,
}: {
  functions: TeampilotCustomFunction<any>[]
}) => {
  return {
    GET: async () => {
      const descriptions = functions.map((fn) => {
        return {
          ...fn,
          inputSchema: transformZodToJsonSchema(fn.inputSchema),
          execute: undefined,
        }
      })

      const response = {
        functions: descriptions,
      }

      return new Response(JSON.stringify(response), {
        headers: { 'content-type': 'application/json' },
      })
    },
    POST: async (request: Request) => {
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

      const response = {
        ...functionResult,
      }

      return new Response(JSON.stringify(response), {
        headers: { 'content-type': 'application/json' },
      })
    },
  }
}
