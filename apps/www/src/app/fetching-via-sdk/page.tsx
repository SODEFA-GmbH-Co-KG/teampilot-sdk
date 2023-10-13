import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "~/client/CodeBlock"
import { DocsLinksGrid } from "~/client/DocsLink"
import { CopyNpmCommandButton } from "~/shadcn/components/copy-button"

const markdown = `
# Fetching Teampilot via SDK
The Teampilot SDK is a wrapper around the API and makes working with it in Typescript a bit nicer.

The core of the SDK is the **fetchTeampilot** function. This is the primary gateway to Teampilot, it handles every request.
Then there are 3 sub functions that provide a nicer output depending on your needs.
There is **fetchTeampilotData** which just returns the data you requested in the specified format (specified by the schema you passed in).
Then we have **fetchTeampilotText** which only returns the text Teampilot has generated.
And then there is **fetchTeampilotMedia** which returns the first media attachment.

So if you really only care about the generated result such as the text or the data, you can use one of the sub functions.
If you care about any additional information such as the generated chatroomId or the usage, you can use the main function.

The input parameters are all the same for the main function and the sub functions.

## Paramters
| Name | Default | Description | Required |
| --- | --- | --- | --- |
| launchpadSlugId | Specified in the env vars by setting TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID | The ID of the launchpad you want to use | Yes (unless default is set) |
| message | | The message that gets sent to the AI | Yes |
| schema | | The Zod schema which defines in which format you want the response | No |
| cacheTtlSeconds | Specified in the env vars by setting TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS or forever | The time in seconds results should be cached. The results are cached by your request parameters, so if you send the same request twice, the cache is triggered. Setting to 0 disables caching. Can also be set to 'forever' | No |
| chatroomId | | If not set, a new chat is created. If you specify an existing chat, the message will be sent in that chat | No |
| accessLevel | TEAM | If a new chat is generated, this sets the access level. Options are 'TEAM' (only team members can view the chat), 'LINK_READ' (anyone with the link can read the chat), and 'LINK_WRITE' (anyone with the link can read and write in the chat) | No |
| customFunctions | | You can pass custom functions the AI should have access to | No |
| customFunctionsMaxExecutions | 10 | Sets the max of how often custom functions can be called by the AI | No |
| functionExecution | | | No |
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

      <DocsLinksGrid destinations={["/custom-functions", "/sdk-examples"]} />
    </div>
  )
}
