import ReactMarkdown from "react-markdown"
import { ShowCase } from "~/client/ShowCase"
import { DayInHistorySelector } from "~/client/examples/DayInHistory"
import { Persons } from "~/client/examples/Persons"
import { Wikipedia } from "~/client/examples/wikipedia/Wikipedia"

const personsMarkdown = `
# SDK Examples

## Generating data with a schema
Teampilot can generate data for you and even format it according to a schema you specify. This is useful when you want to generate data for a specific purpose. For instance, you can generate a list of presidents and some information abut them.
The format ca be specified with a [zod](https://zod.dev/) schema.
`

const interactivemarkdown = `
## Next.js Interactive Example
You can use the SDK in a Next.js app and generate data on the fly. This is useful when you want to generate data based on user input.
`

const customfunctionsMarkdown = `
## Passing custom functions
You can pass custom functions to the SDK that the AI can call.
In this example we pass it a function that can fetch articles from Wikipedia, but you can pass any function you want.
For example you could pass a function that fetches data from your database, or a function that mutates things on your side.
`

export default function Page() {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{personsMarkdown}</ReactMarkdown>

      <ShowCase file="/src/client/examples/Persons.tsx">
        <Persons />
      </ShowCase>

      <ReactMarkdown>{interactivemarkdown}</ReactMarkdown>

      <ShowCase file="/src/client/examples/DayInHistory.tsx">
        <DayInHistorySelector />
      </ShowCase>

      <ReactMarkdown>{customfunctionsMarkdown}</ReactMarkdown>

      <ShowCase
        file="/src/client/examples/wikipedia/Wikipedia.tsx"
        layout="side-by-side"
      >
        <Wikipedia />
      </ShowCase>
    </div>
  )
}
