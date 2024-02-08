import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { AnchorDiv } from "~/client/AnchorDiv"
import { CodeBlock } from "~/client/CodeBlock"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { getIdForTopic } from "~/utils/navTopics"

const markdown = `
# Api Reference
`
export const ApiReference = () => {
  const apiReferenceId = getIdForTopic({
    secondLevelSlug: "#api-reference",
  })
  const createTeampilotClientId = getIdForTopic({
    secondLevelSlug: "#api-reference",
    thirdLevelSlug: "-create-teampilot-client",
  })
  const fetchTeampilotId = getIdForTopic({
    secondLevelSlug: "#api-reference",
    thirdLevelSlug: "-fetch-teampilot",
  })
  return (
    <div>
      <AnchorDiv id={apiReferenceId} />
      <IntersectionChecker topic="/sdk-docs#api-reference" />
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <AnchorDiv id={createTeampilotClientId} />
      <IntersectionChecker topic="/sdk-docs#api-reference-create-teampilot-client" />
      <ReactMarkdown>{`
## createTeampilotClient()
Create a Teampilot Client with the following code:
      `}</ReactMarkdown>
      <CodeBlock
        language="typescript"
        lightMode="dark"
        value={`
import { createTeampilotClient } from "@teampilot/sdk"
import { env } from "./env.mjs"

export const teampilot = createTeampilotClient({
    default: {
      launchpadSlugId: env.TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    },
})`}
      />
      <ReactMarkdown>{`
The createTeampilotClient function takes an object with the launchpads' names you want to configure as keys. The respective value is an object with the launchpadSlugId as a string.
You can specify as many launchpads as you want. 

The teampilot client object functions as a proxy for some of the other exported functions from the SDK, so you don't have to configure the respective \`launchpadSlugId\` for every request. There are four ways to retrieve data via the client object, \`fetch\`, \`fetchData\`, \`fetchMedia\`, and \`fetchText\`.
Each of these proxy functions are explained more detailed in the following sections. You can get an idea of how to use the client object with the following code example. The commented out code shows the return type of the respective function:
`}</ReactMarkdown>

      <CodeBlock
        language="typescript"
        lightMode="dark"
        value={`
  const completeResponse = await teampilot.default.fetch({ message: "Hi" })
  // completeResponse is of type
  // {
  //   message: {
  //       id: string;
  //       functionName?: string | undefined;
  //       content?: string | undefined;
  //       data?: undefined;
  //   };
  //   usage: {
  //       teamTokens: number;
  //   };
  //   chatroom: {
  //       id: string;
  //       url: string;
  //   };
  //   mediaAttachments?: {
  //       ...;
  //   }[] | undefined;
  //   cachedAt?: string | undefined;
  // }
  const formattedDataResponse = await teampilot.default.fetchData({
    message: "Hi",
    schema: z.object({
      greeting: z.string(),
      introduction: z.string(),
      question: z.string(),
      // ...
    }),
  })
  // Response is of type
  // {
  //   greeting: string;
  //   introduction: string;
  //   question: string;
  // }
  const mediaResponse = await teampilot.default.fetchMedia({ message: "Hi" })
  // Response is of type
  // {
  //   type: "AUDIO" | "IMAGE" | "DOCUMENT";
  //   id: string;
  //   url: string;
  // }
  const textResponse = await teampilot.default.fetchText({ message: "Hi" })
  // Response is of type string`}
      />
      <AnchorDiv id={fetchTeampilotId} />
      <IntersectionChecker topic="/sdk-docs#api-reference-fetch-teampilot" />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {`
## fetchTeampilot()


The fetchTeampilot function resembles the proxy function \`.fetch()\` from the teampilot client object above. This is the default way to fetch data from Teampilot. The function takes an object with the following parameters:

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
`}
      </ReactMarkdown>
    </div>
  )
}
