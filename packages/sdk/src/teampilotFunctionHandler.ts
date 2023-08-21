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

      return new Response(
        JSON.stringify({
          functions: descriptions,
        }),
        {
          headers: { 'content-type': 'application/json' },
        }
      )
    },
    // POST: async () => {},
  }
}
