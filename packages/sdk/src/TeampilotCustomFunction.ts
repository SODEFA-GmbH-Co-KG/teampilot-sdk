import { RPC } from 'rpc-anywhere'
import { z } from 'zod'
import { ChatRpcSchema, StyledFunctionRpcSchema } from './rpcSchema'

type LocalizedString = string | { en: string; de: string }

export type TeampilotCustomFunction<T extends z.Schema, Output = any> = {
  nameForAI: string
  descriptionForAI: string

  emoji?: string

  releaseStatus?: string

  nameForHuman?: LocalizedString
  descriptionForHuman?: LocalizedString
  textLoading?: LocalizedString
  textSuccess?: LocalizedString
  textError?: LocalizedString

  categories?: string[]

  inputSchema: T

  execute: (options: {
    input: z.infer<T>
    request?: Request
  }) => Promise<{ output: Output }>

  styled?:
    | {
        url?: string
      }
    | ((options: {
        input: z.infer<T>
        output?: Output
        rpc?: RPC<StyledFunctionRpcSchema, ChatRpcSchema>
      }) => any)
}

export const createTeampilotCustomFunction = <Input extends z.Schema, Output>(
  func: TeampilotCustomFunction<Input, Output>
) => {
  return func
}
