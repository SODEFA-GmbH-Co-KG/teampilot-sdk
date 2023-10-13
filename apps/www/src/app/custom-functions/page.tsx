import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "~/client/CodeBlock"
import { DocsLinksGrid } from "~/client/DocsLink"
import { CopyNpmCommandButton } from "~/shadcn/components/copy-button"

const markdown = `
# Custom Functions
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

      <DocsLinksGrid destinations={["/sdk-examples"]} />
    </div>
  )
}
