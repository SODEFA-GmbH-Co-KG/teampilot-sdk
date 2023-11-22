import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "~/client/CodeBlock"
import { DocsLinksGrid, getPageByHref } from "~/client/DocsLink"
import { CopyNpmCommandButton } from "~/shadcn/components/copy-button"

const customFunctionType = `
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
}`

const markdown = `
# Custom Functions
Teampilot can call [**functions**](${
  getPageByHref("/functions")?.href
}) to do things it can't do itself. Teampilot already ships with many tight integrated and helpful functions, but you can also create your own functions and connect them to Teampilot.

Custom functions let you run your own code on your own Servers and give Teampilot access to your data and functions.
To help you with that, we provide an Typescript SDK that you can use to create your own functions and connect them to Teampilot.
If you don't use Typescript you can connect them as well, we currently don't have a documentation for that, but you can hop onto our Discord and our engineers will help you out.

## How to create a custom function via the SDK and Next.js


`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <CodeBlock
        language="bash"
        lightMode="dark"
        value={`npm install @teampilot/sdk`}
        copyButton={
          <CopyNpmCommandButton
            commands={{
              __npmCommand__: "npm install @teampilot/sdk",
              __yarnCommand__: "yarn add @teampilot/sdk",
              __pnpmCommand__: "pnpm add @teampilot/sdk",
            }}
          />
        }
      />
      <div className="h-6" />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      <CodeBlock language="ts" value={customFunctionType} lightMode="dark" />

      <DocsLinksGrid destinations={["/sdk-examples", "/functions"]} />
    </div>
  )
}
