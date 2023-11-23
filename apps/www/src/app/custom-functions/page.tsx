import Image from "next/image"
import { type PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "~/client/CodeBlock"
import { DocsLinksGrid, getPageByHref } from "~/client/DocsLink"

const DocImage = (props: Parameters<typeof Image>[0]) => {
  return <Image {...props} className="rounded shadow-md shadow-black/5" />
}

const InlineCode = ({ children }: PropsWithChildren) => {
  return (
    <span className="rounded bg-gray-200 dark:bg-gray-600 p-1 font-mono text-sm">
      {children}
    </span>
  )
}

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
      <p>
        Custom Functions are a developer-oriented feature that enables you to
        expand the capabilities of the AI by{" "}
        <span className="font-bold">writing your own functions</span>. It
        empowers you to personalize and fine-tune the AI functionalities
        according to your needs. This feature allows the AI to perform tasks
        that go beyond its inherent capabilities, making it a more flexible and
        adaptable tool.
      </p>
      <p>We have multiple ways to create custom function:</p>
      <div className="flex flex-col md:flex-row gap-8  my-6">
        <a
          href="#hosted-functions"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-primary group-hover:text-inherit">
            Hosted Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            Hosted on Teampilot
          </div>
        </a>
        <a
          href="//TODO: Link"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-primary group-hover:text-inherit">
            HTTP Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            Hosted on your own servers
          </div>
        </a>
        <a
          href="//TODO: Link"
          className="group block space-y-2 rounded-md border border-neutral-400 p-6 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
        >
          <div className="text-lg w-[200px] font-medium leading-snug text-primary group-hover:text-inherit">
            Widget Functions
          </div>
          <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
            As part of the widget
          </div>
        </a>
      </div>

      <h1 id="hosted-functions">Hosted Functions</h1>

      <div className="rounded border-primary border py-1 px-2">
        This feature is currently in alpha (apply here // TODO: Add link)
      </div>

      <p>
        As a TypeScript / JavaScript developer, you can leverage our Hosted
        Functions feature.{" "}
        <span className="font-bold">We host your functions</span>, allowing you
        to concentrate on the business logic. You have nothing todo with
        servers, scaling, or security. Just provide the code and we take care of
        the rest.
      </p>

      <h2>How to setup?</h2>

      <ol>
        <li>
          Goto{" "}
          <a href="https://teampilot.ai/start/settings/integrations">
            Integrations
          </a>{" "}
          and add a new integration
          <DocImage
            src="/docs/add-integration.jpg"
            width={257}
            height={174}
            alt="Add Integration"
          />
        </li>
        <li>
          Select &quot;Hosted Functions&quot;
          {/* TODO: Redo screenshot with beta */}
          tag
          <DocImage
            src="/docs/select-hosted-functions.jpg"
            width={540}
            height={447}
            alt="Select Hosted Functions"
          />
        </li>
        <li>
          Enter your code (checkout the detailed walkthrough of the example code{" "}
          <a href="#walkthrough">below</a>)
        </li>
        <li>Click &quot;Create&quot;</li>
        <li>
          Start a new chat
          <DocImage
            src="/docs/start-new-chat.jpg"
            width={420}
            height={225}
            alt="Start a new chat"
          />
        </li>
        <li>
          Select your function under &quot;Expert Functions&quot;
          <DocImage
            src="/docs/select-expert-functions.jpg"
            width={465}
            height={412}
            alt="Select your function"
          />
        </li>
        <li>Tell the AI to use the function</li>
      </ol>

      <h2 id="walkthrough">Let&apos;s walk through an example code</h2>
      <p>
        We are using <span className="font-bold">Deno</span> to run your code.
        You can deploy either{" "}
        <span className="font-bold">TypeScript or JavaScript</span> code and use
        any package from <span className="font-bold">npm or Deno</span>.
        There&apos;s no need for a package.json, thanks to npm imports being
        prefixed with <InlineCode>npm:</InlineCode>, simplifying your code
        management process.
      </p>

      <p>
        The code editor{" "}
        <span className="font-bold">automatically loads TypeScript types</span>{" "}
        from unpkg.com. So you can use{" "}
        <span className="font-bold">autocomplete & type checking.</span>
      </p>

      <p className="rounded border-primary border py-1 px-2">
        Sometimes and for Deno packages this currently doesn&apos;t work. You
        can still use the packages & deploy your code, but you won&apos;t get
        any type hints in the editor. Please let us know if this happens in our
        Discord.
        {/* // TODO: Link */}
      </p>

      <p>Let&apos;s jump into the code:</p>

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
          <ul>
            <li>
              <InlineCode>inputSchema</InlineCode>
              <ul>
                <li>
                  The input schema is used to validate the input that is coming
                  from the AI.
                </li>
                <li>
                  If the input is not valid, <InlineCode>execute</InlineCode>{" "}
                  will not be called and the AI will receive an error message.
                </li>
              </ul>
            </li>
          </ul>
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
