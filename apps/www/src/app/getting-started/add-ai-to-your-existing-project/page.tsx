import ReactMarkdown from "react-markdown"

const markdown = `
  # Get Started
  
  The Teampilot Typescript SDK allows you to easily integrate Teampilot in your Typescript based project.

  \`\`\`bash
    npm install @teampilot/sdk
  \`\`\`

  In order to use the Teampilot SDK, you need to have a launchpad. If you haven't created a launchpad yet, you can read how to create one [here](/getting-started/provide-a-public-launchpad).

  ## Basic Usage
  \`\`\`ts
  import { fetchTeampilot } from '@teampilot/sdk'

  const response = await fetchTeampilot({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: "What is a LLM?",
    cacheTtlSeconds: 'forever',
  })

  const message = data.message.content // "A LLM is a ..."
  \`\`\`

  This will start a new Teampilot chat with the message "What is a LLM?" and cache the response forever.
  It returns not only the message the LLM sent but also lots of operational data like the id and the url of the chat that it created, or how many TeamTokens it used.

  ## Fetch with in a specific format

  If you want to enforce the LLM to respond in a specific format, you can use the schema option.

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

  This will do the same as the previous example but enforce the LLM to respond in your specified format.
  Note that we parse the response with zod and if the response does not match the schema, it will throw an error.

  ## Convenience Functions

  With the Teampilot SDK, you can fetch text or data from the LLMs. The SDK provides convenience functions for each of these, which are just a wrapper around the base fetchTeampilot function that just return the message or data from the response.

  \`\`\`ts
  import { fetchTeampilotText, fetchTeampilotData } from '@teampilot/sdk'

  const message = await fetchTeampilotText({
    launchpadSlugId: process.env.LAUNCHPAD_ID,
    message: "What is a LLM?",
    cacheTtlSeconds: 'forever',
  })

  console.log(message) // "A LLM is a ..."

  const data = await fetchTeampilotData({
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

  console.log(data) // { llms: [{ name: 'LLM1', creator: 'Creator1' }, ...] }
  \`\`\`

  ## Generating media

  Teampilot can not only generate text or data but also generate, manipulate or download media. If you instruct the LLM to generate media and it generates it successfully, your response will have mediaAttachments which will contain a url to the media.
  **Note that the launchpad needs to have media generation functions activated in order to be able to generate or manipulate media for you.**

  \`\`\`ts
  import { fetchTeampilot } from '@teampilot/sdk'

  const response = await fetchTeampilot({
    launchpadSlugId: process.env.IMAGE_GENERATOR_LAUNCHPAD_ID,
    message: "Generate an Image of a cat flying on a donut in space",
    cacheTtlSeconds: 'forever',
  })

  const imageUrl = data.mediaAttachments?.[0]?.url // "https://d39ob9hwkmfin1.cloudfront.net/af037574-207c-41df-b1a4-f9a82cfae70a.png?Expires=4070908800&Key-Pair-Id=K1J9Z1M14GSH74&Signature=lsHZkE2GvAnxLYKh-gXjqOFEd--HG~dGvSDkWAcG503RLCt4WonPBeMbX0K21kJYVtSu5n0xtY~KJWzuOuhTksNQ0-T7rpZY7hkzq6tkA3sYB5A5XUyRt-7EbLJCWkiBRYSfxr44Rvdp3kEkOtItNLnFlhDKi8Mp4iihF85Bko8fUHJYEatpB~3hGANLQuvHpKXgo88WkRMHVJLTOnly-CGNjkmd3QcXEQUMeCuMljQh4wLNKKLZ5Jz3YnV2YILtAeIia6-K2Rd89uHkNCwQOsS7oJFgB6eyYAaQqCm1hq1wXtnazjL9lFZuTn3YLCeEhl6gTuVSSOz8bVQTbd6zYQ__"

  const audioResponse = await fetchTeampilot({
    launchpadSlugId: process.env.AUDIO_GENERATOR_LAUNCHPAD_ID,
    message: "Generate a short poem about a cat flying on a donut in space and read it out loud",
    cacheTtlSeconds: 'forever',
  })

  const audioUrl = data.mediaAttachments?.[0]?.url // "https://d39ob9hwkmfin1.cloudfront.net/c1005d12-7027-4d4a-8075-43cb3f07ded0.mpeg?Expires=4070908800&Key-Pair-Id=K1J9Z1M14GSH74&Signature=e9-HUUMLxzo7rKRs71UBzamjmuhvdEuSk-Z8TU4gBmn9FH50PQsee9oTelYluBo6JodFMm07XpLeyOZGPDp2Siu5ykxiPuAJiGxv3uk7flrETlq1B~A92qytgF-UsOAKOB-mPqD6yi-eiBHiMWprFliUhZJQyBvQ6feNp6AqysD0FWFqkT3qTgl765M3pfoqBEPr~Kf9ZWjf4J1SlOquWQCz7~ihWN8nJ2GYzTxtsrHesfU8P001128KDEyZLU94ZHAeqeaFQqblvxmIcFrpnY78NrbgI7IFqE9wZd6R0DG~NWnn6Y3MwYVbdCM3YOLrpmYqZODd0~HTyIXah7kObw__"
  \`\`\`
`

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
