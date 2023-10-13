import { z } from 'zod'

type LocalizedString = string | { en: string; de: string }

export type TeampilotCustomFunction<T extends z.Schema> = {
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

  execute: (options: { input: z.infer<T> }) => Promise<{ output: any }>
}
