import { z } from 'zod'
import { TeampilotCustomFunction } from './TeampilotCustomFunction'
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
  apiKey,
  checkAuthorization,
}: {
  functions: TeampilotCustomFunction<any>[]
  apiKey?: string
  checkAuthorization?: (request: Request) => Promise<boolean>
}) => {
  const handler = jsonHandler(async (request: Request) => {
    const authorizationChecker = async () => {
      if (apiKey && request.headers.get('x-api-key') !== apiKey) {
        return false
      }

      if (checkAuthorization) {
        const allowed = await checkAuthorization(request)
        if (!allowed) {
          return false
        }
      }

      return true
    }

    const forbiddenResponse = () =>
      new Response('Forbidden', {
        status: 403,
      })

    try {
      const allowed = await authorizationChecker()
      if (!allowed) {
        return forbiddenResponse()
      }
    } catch (error) {
      console.log('Error while checking the authorization', error)
      return forbiddenResponse()
    }

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
    }

    if (request.method === 'POST') {
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

      const functionResult = await fn.execute({ input }).catch((error) => ({
        error: error?.message ?? error?.toString() ?? 'Unknown Error',
      }))

      return {
        ...functionResult,
      }
    }

    return new Response('Method not allowed', {
      status: 405,
    })
  })

  const overload: typeof handler & {
    GET: typeof handler
    POST: typeof handler
  } = handler as any
  overload.GET = handler
  overload.POST = handler

  return overload
}
