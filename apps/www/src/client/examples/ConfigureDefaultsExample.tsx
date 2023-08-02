import { ArrowDown } from "lucide-react"
import { CodeBlock } from "~/client/CodeBlock"
import { ShowCaseDescription } from "~/client/ShowCaseDescription"
import { Heading } from "../Heading"

const input = `# .env

# Set default launchpad
TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID=my-launchpad-123456
# or
NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID=my-launchpad-123456


# Set default cache (otherwise default is 'forever')
TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS=60
# or
NEXT_PUBLIC_TEAMPILOT_DEFAULT_CACHE_TTL_SECONDS=60`
const output = `import { fetchTeampilot } from "@teampilot/sdk"

await fetchTeampilot({
  message: "Hi mom",
})
`

export const ConfigureDefaultsExample = async () => {
  return (
    <>
      <Heading>Configure Defaults (optional)</Heading>
      <ShowCaseDescription
        title="Configure Defaults (optional)"
        code={[input, output].join("\n\n")}
      />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <CodeBlock language="txt" value={input} lightMode="dark" />
        </div>
        <ArrowDown className="h-8 w-8 self-center lg:-rotate-90" />
        <div className="flex-1">
          <CodeBlock language="ts" value={output} lightMode="dark" />
        </div>
      </div>
    </>
  )
}
