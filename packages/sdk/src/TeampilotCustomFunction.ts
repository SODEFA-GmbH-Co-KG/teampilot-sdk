import { z } from 'zod'

export const CustomFunctionBillableSchema = z.object({
  upstreamCostsInCents: z.number().finite().nonnegative(),
  apiData: z.record(z.any()).optional(),
})

export type CustomFunctionBillable = z.infer<typeof CustomFunctionBillableSchema>

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
  }) => Promise<{ output: Output; billables?: CustomFunctionBillable[] }>

  styled?:
    | {
        url?: string
      }
    | ((options: { input: z.infer<T>; output?: Output }) => any)
}

export const createTeampilotCustomFunction = <Input extends z.Schema, Output>(
  func: TeampilotCustomFunction<Input, Output>
) => {
  return func
}
