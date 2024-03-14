import { AnchorDiv } from "~/client/AnchorDiv"
import { CodeBlock } from "~/client/CodeBlock"
import ReactMarkdown from "~/client/CustomReactMarkdown"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { CopyNpmCommandButton } from "~/shadcn/components/copy-button"
import { getIdForTopic } from "~/utils/navTopics"

const markdown = `
# Installation and Setup

To install the Teampilot SDK, run the following command in your terminal:
`
export const InstallationAndSetup = () => {
  const installationId = getIdForTopic({
    secondLevelSlug: "#installation",
  })
  return (
    <div>
      <AnchorDiv id={installationId} />
      <IntersectionChecker topic="/sdk-docs#installation" />
      <ReactMarkdown>{markdown}</ReactMarkdown>
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
      <ReactMarkdown>{`
There are a few steps necessary to use the SDK in your app.

1. Create an account on [Teampilot](https://teampilot.ai) if not already done.
2. Create a team if not already done.
3. Navigate to the Launchpads section and click the \`+\` button. ![Add a Launchpad](/docs/add-launchpad.png) For more information on how to create a launchpad, see [Provide a public Launchpad](/getting-started/provide-a-public-launchpad).
4. Copy the Launchpad Id from the launchpad form and set it as an environment variable in your app. This is the default launchpad that will be used if no launchpad is specified in the request.
      `}</ReactMarkdown>
      <CodeBlock
        language="bash"
        lightMode="dark"
        value={`TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID="*your-launchpad-slug-id-here*"`}
      />
      <ReactMarkdown>{`
Be aware, that if you want to use the SDK from the client side, the launchpad id will be leaked to the client and can potentially be abused. This can be circumvented by only using the sdk on your server side, like we are doing in this documentation via server actions.
You then should make sure to not name the environment variable NEXT&shy;_PUBLIC&shy;_TEAMPILOT&shy;_DEFAULT&shy;_LAUNCHPAD&shy;_SLUG&shy;_ID but instead just TEAMPILOT&shy;_DEFAULT&shy;_LAUNCHPAD&shy;_SLUG&shy;_ID if you are using Nextjs.
      `}</ReactMarkdown>
    </div>
  )
}
