import Image from "next/image"
import Link from "next/link"
import { type PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { AnchorDiv } from "~/client/AnchorDiv"
import { CodeBlock } from "~/client/CodeBlock"
import { getPageByHref } from "~/client/DocsLink"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { getIdForTopic } from "~/utils/navTopics"

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

const customFunctionSection1 = `
# Custom Functions: Extending LLM Capabilities
Functions are a fundamental component in Teampilot, designed to enhance the capabilities of Large Language Models (LLMs) like GPT. 

In many ways, functions in Teampilot mirror those found in programming languages such as Python or Javascript. They accept specified inputs, process them through a series of coded instructions, and yield an output.

Consider, for instance, a function designed to perform complex mathematical calculations. Given that current versions of GPT are not particularly adept at math, this function could take a mathematical expression as an input, evaluate it, and return the computed result. In such a scenario, if the LLM needs to execute a complicated calculation, it can simply invoke this function and delegate the mathematical heavy lifting to it.
`

export const CustomFunctions = () => {
  const customFunctionsId = getIdForTopic({
    secondLevelSlug: "#custom-functions",
  })
  const hostedFunctionsId = getIdForTopic({
    secondLevelSlug: "#custom-functions",
    thirdLevelSlug: "-hosted-functions",
  })
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
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

      <AnchorDiv id={customFunctionsId} />
      <IntersectionChecker topic={"/topics#custom-functions"} />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {customFunctionSection1}
      </ReactMarkdown>
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

      <AnchorDiv id={hostedFunctionsId} />
      <IntersectionChecker topic="/topics#custom-functions-hosted-functions" />
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
  nameForAI: 'helloWorld',
  descriptionForAI: 'says hello to the world',
  emoji: '👋',
  releaseStatus: 'alpha',
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
              First we import the{" "}
              <Link href="https://www.npmjs.com/package/@teampilot/sdk">
                Teampilot SDK
              </Link>{" "}
            </li>
            <li>
              <InlineCode>inputSchema</InlineCode>
              <ul>
                <li>
                  The input schema is translated into JSON and will be sent to
                  the AI. So the{" "}
                  <span className="font-bold">
                    AI knows the arguments of your function
                  </span>
                  .
                </li>
                <li>
                  TODO: Explain how the schema behaves, how deep, what zod
                  functions can be used, etc.
                </li>
                <li>
                  The input schema is used to{" "}
                  <span className="font-bold">validate the input</span> that is
                  coming from the AI.
                </li>
                <li>
                  Sometimes the AI makes errors while calling your function. If
                  the input is not valid, <InlineCode>execute</InlineCode> will
                  not be called and the AI will receive an error message.
                </li>
              </ul>
            </li>
            <li>
              <InlineCode>nameForAI</InlineCode>
              <ul>
                <li>
                  Every function needs an{" "}
                  <span className="font-bold">unique name</span> in your team.
                </li>
                <li>
                  We automatically generated a random name for the function.
                </li>
                <li>
                  The AI uses the name to understand the purpose of the
                  function. It is therefore{" "}
                  <span className="font-bold">
                    important to choose a good name.
                  </span>
                </li>
                <li>
                  Feel free to choose a better naming{" "}
                  <span role="img" aria-label="Smile">
                    😁
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <InlineCode>descriptionForAI</InlineCode>
              <ul>
                <li>
                  If the name is not sufficiently self-explanatory, you can tell
                  the AI exactly what the function does here.
                </li>
              </ul>
            </li>
            <li>
              <InlineCode>inputSchema</InlineCode>,{" "}
              <InlineCode>nameForAI</InlineCode> &{" "}
              <InlineCode>descriptionForAI</InlineCode> are all counting towards
              the AIs input context. So they are billed and should be as concise
              as possible.
            </li>
            <li>
              <InlineCode>execute</InlineCode>
              <ul>
                <li>This is where the magic happens ✨</li>
                <li>
                  The function receives the fully typed input from the AI and
                  returns the output as a string.
                </li>
              </ul>
            </li>
            <li>
              We add the function to the{" "}
              <InlineCode>teampilotFunctionHandler</InlineCode>.
              <ul>
                <li>
                  For more advanced use cases: Add more than one function to the
                  handler.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
