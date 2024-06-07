import { fetchTeampilotText } from "@teampilot/sdk"
import { env } from "~/env.mjs"

export default async function Page() {
  if (env.NODE_ENV !== "development") return null
  const launchpadSlugId = process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL
  if (!launchpadSlugId) return null
  const url = `http://localhost:3000/api/rest/message`

  const answerPublic = await fetchTeampilotText({
    url,
    launchpadSlugId,
    message: "Say 'Hi from public launchpad'",
  })

  const answerApiKey = await fetchTeampilotText({
    url,
    launchpadSlugId: process.env.LAUNCHPAD_SLUG_ID_NOT_PUBLIC,
    apiKey: process.env.TEAMPILOT_API_KEY,
    message: "Say 'Hi from private launchpad'",
  })

  return (
    <>
      <div>{answerPublic}</div>
      <hr />
      <div>{answerApiKey}</div>
    </>
  )

  // const answer = await fetchTeampilot({
  //   url,
  //   launchpadSlugId,
  //   message: "What time is it and whats the weather in New York???",
  //   cacheTtlSeconds: 60,
  //   schema: z.object({
  //     hours: z.string(),
  //     minutes: z.string(),
  //     weather: z.object({
  //       temperature: z.number(),
  //       description: z.string(),
  //     }),
  //   }),
  //   accessLevel: "LINK_WRITE",
  //   customFunctions: [
  //     {
  //       nameForAI: "getWeather",
  //       descriptionForAI: "Get the current weather",
  //       inputSchema: z.object({
  //         city: z.string(),
  //       }),
  //       execute: async () => {
  //         // throw new Error("Not so sunny")
  //         return {
  //           output: {
  //             temperature: "20",
  //             description: "Sunny",
  //           },
  //         }
  //       },
  //     },
  //   ],
  // })

  // return (
  //   <>
  //     <CodeBlock
  //       lightMode="dark"
  //       language="json"
  //       value={JSON.stringify(answer, null, 2)}
  //     />
  //   </>
  // )

  // const firstAnswer = await fetchTeampilot({
  //   message: "Who landed on the moon first?",
  //   url,
  //   launchpadSlugId,
  //   accessLevel: "LINK_WRITE",
  // })
  // const secondAnswer = await fetchTeampilot({
  //   message: "How old was the person when he did?",
  //   chatroomId: firstAnswer.chatroom.id,
  //   url,
  //   launchpadSlugId,
  // })
  // return (
  //   <>
  //     <div>{firstAnswer.message.content}</div>
  //     <hr />
  //     <div>{secondAnswer.message.content}</div>
  //   </>
  // )
}
