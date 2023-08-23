import { z } from 'zod'

// type LocalizedString = string | { en: string; de: string }
export type TeampilotCustomFunction<T extends z.Schema> = {
  nameForAI: string
  descriptionForAI: string
  inputSchema: T
  // emoji?: string
  // nameForHuman?: LocalizedString
  // descriptionForHuman?: LocalizedString
  // releaseStatus?: string
  // categories?: string[]

  execute: (input: z.infer<T>) => Promise<{ output: any }>
}
