import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "~/client/CodeBlock"
import { DocsLinksGrid, getPageByHref } from "~/client/DocsLink"

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

# Hosted Functions
- Currently in beta (apply here // TODO: Add link)
- You write the code, we deploy it
- How to
  - Goto [Integrations](https://teampilot.ai/start/settings/integrations) and add a new integration
    ![Add Integration](docs/add-integration.jpg)
  - Select "Hosted Functions"
    ![Select Hosted Functions](docs/select-hosted-functions.jpg)
    // TODO: Redo screenshot with beta tag
  - Enter Code
    - We are using Deno to run your code
      - Benefit: You can deploy Typescript or Javascript code
      - Benefit: You can use any npm package or Deno Package
      - Benefit: No need for a package.json
      - This is why the imports that are coming from npm are prefixed with \`npm:\`
    - The Code Editor tries to load types from unpkg.com. In sometimes and for Deno packages this currently doesn't work. You can still use the packages, but you won't get any types. Please let us know if this happens in our discord. // TODO: Link
`

const rest = `
  - Env Vars
    - Add env vars
    - Deno.env.get("API_KEY")
  - Creating takes a while
  - Error messages

# Custom Functions
Teampilot can call [**functions**](${
  getPageByHref("/functions")?.href
}) to do things it can't do itself. Teampilot already ships with many tight integrated and helpful functions, but you can also create your own functions and connect them to Teampilot.

Custom functions let you run your own code on your own Servers and give Teampilot access to your data and functions.
To help you with that, we provide an Typescript SDK that you can use to create your own functions and connect them to Teampilot.
If you don't use Typescript you can connect them as well, we currently don't have a documentation for that, but you can hop onto our Discord and our engineers will help you out.

## How to create a custom function via the SDK and Next.js`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      {/* <CodeBlock
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
      <div className="h-6" /> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{`
# What are functions?
- Functions can be called by our AI
- AI provides inputs
- Functions return output to AI
- Example: Calculator
  ![Calculator Example](docs/calculator.jpg)
    - AI provides the input \`sqrt(345)\`
    - The Calculator function calculates the result and returns \`18.57417562100671\`
    - The AI uses the result to continue the conversation with \`The square root of 345 is approximately 18.57.\`
- Many built-in functions but extendable --> Custom Functions: Use your own code to enhance AI
      `}</ReactMarkdown>

      <h1>Custom Functions Overview</h1>
      <p>We have multiple ways to create custom function:</p>
      <div className="flex flex-col md:flex-row gap-8  my-6">
        <Link
          href="//TODO: Link"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-sky-600 group-hover:text-inherit">
            Hosted Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            Hosted on Teampilot
          </div>
        </Link>
        <Link
          href="//TODO: Link"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-sky-600 group-hover:text-inherit">
            HTTP Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            Hosted on your own servers
          </div>
        </Link>
        <Link
          href="//TODO: Link"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-sky-600 group-hover:text-inherit">
            Widget Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            As part of the widget
          </div>
        </Link>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>

      <h2>Let's walk through the code</h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <CodeBlock
          language="ts"
          value={`
import { teampilotFunctionHandler, type TeampilotCustomFunction } from 'npm:@teampilot/sdk'
import { z } from 'npm:zod'

const inputSchema = z.object({
  name: z.string(),
})

const func: TeampilotCustomFunction<typeof inputSchema> = {
  nameForAI: 'lavender-voluminous-pigeon',
  descriptionForAI: '',
  inputSchema,
  execute: async ({ input }) => {
    return {
      output: \`Hello \${input.name}! This is random: \${Math.random()}\`,
    }
  },
}

export default teampilotFunctionHandler({
  functions: [
    func,
  ],
})`}
          lightMode="dark"
        />
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {`
- First we import the Teampilot SDK (// TODO: Link)
- \`inputSchema\`
  - The input schema is used to validate the input that is coming from the AI.
  -  If the input is not valid, \`execute\` will not be called and the AI will receive an error message.
- \`name\`
  - Every function needs an unique name in your team.
  - We automatically generated a random name for the function.
  - Feel free to choose a better naming 😁
- \`descriptionForAI\`
  - Sometimes its helpful to tell the AI what the function does in detail.
  - Example: The name is not self-explanatory.
- \`execute\`
  - This is where the magic happens ✨
  - The function receives the input from the AI and returns the output.
- See the Typescript Types or our API documentation (//TODO: Add API docs somewhere and link to it) for more information on the \`TeampilotCustomFunction\`.
- We add the function to the \`teampilotFunctionHandler\`.
  - For more advanced use cases: Add more than one function to the handler.
`}
          </ReactMarkdown>
        </div>
      </div>

      <CodeBlock language="ts" value={customFunctionType} lightMode="dark" />

      <DocsLinksGrid destinations={["/sdk-examples", "/functions"]} />
    </div>
  )
}
