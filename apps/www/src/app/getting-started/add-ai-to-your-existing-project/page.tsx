import ReactMarkdown from "react-markdown"

const markdown = `
  ## Get Started
  
  The Teampilot Typescript SDK allows you to easily integrate Teampilot in your Typescript Project.

  \`\`\`bash
    npm install @teampilot/sdk
  \`\`\`

  ### Basic Usage
  \`\`\`ts
  import { fetchTeampilot } from '@teampilot/sdk'

  const response = await fetchTeampilot({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: "What is a LLM?",
    cacheTtlSeconds: 'forever',
  })
  \`\`\`

  This will start a new Teampilot chat with the message "What is a LLM?" and cache the response forever.
  It returns not only the message the LLM sent but also lots of operational data like the id and the url of the chat that it created, or how many TeamTokens it used.

  ### Fetch with in a specific format

  \`\`\`ts
  import { fetchTeampilot } from '@teampilot/sdk'
  import { z } from 'zod'

  const response = await fetchTeampilot({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: "Give me a list of the top 5 LLMs",
    cacheTtlSeconds: 'forever',
    schema: z.object({
      llms: z.array(z.object({
        name: z.string(),
        creator: z.string(),
      })),
    })
  })

  const data = response.message.data // { llms: [{ name: 'LLM1', creator: 'Creator1' }, ...] }
  \`\`\`
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
