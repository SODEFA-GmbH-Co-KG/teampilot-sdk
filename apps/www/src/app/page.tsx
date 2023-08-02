import { CodeBlock } from "~/client/CodeBlock"
import { ShowCase } from "~/client/ShowCase"
import { BehindTheScenes } from "~/client/examples/BehindTheScenes"
import { ConfigureDefaultsExample } from "~/client/examples/ConfigureDefaultsExample"
import { MultipleAssistants } from "~/client/examples/MultipleAssistants"
import { Reasons } from "~/client/examples/Reasons"
import { CopyNpmCommandButton } from "~/shadcn/components/copy-button"

export default function Page() {
  return (
    <>
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
      <ShowCase
        title="Simple Example"
        file="/src/client/examples/Reasons.tsx"
        layout="side-by-side"
      >
        <Reasons />
      </ShowCase>
      <ShowCase
        title="Setup Multiple Assistants"
        file="/src/client/examples/MultipleAssistants.tsx"
        layout="side-by-side"
      >
        <MultipleAssistants />
      </ShowCase>
      <BehindTheScenes />
      <ConfigureDefaultsExample />
    </>
  )
}
