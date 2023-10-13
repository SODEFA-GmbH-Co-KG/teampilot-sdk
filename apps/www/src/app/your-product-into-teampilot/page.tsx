import ReactMarkdown from "react-markdown"
import { DocsLinksGrid } from "~/client/DocsLink"

const markdown = `
# Integrating your product into Teampilot
You can extend the capabilities of Teampilot with functions.
Functions can do many things, they can be separated into 2 main categories.
Fetching data, for example a function that can get user data from your database and returns it so Teampilot can use it.
Mutating data, for example a function that can update user data in your database.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <DocsLinksGrid destinations={["/custom-functions"]} />
    </div>
  )
}
