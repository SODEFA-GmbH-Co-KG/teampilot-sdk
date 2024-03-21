import { streamTeampilotData } from "@teampilot/sdk/src/fetchTeampilot"
import { createStreamableUI } from "ai/rsc"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"

export default async function Page() {
  const uiStream = createStreamableUI(<div>Loading...</div>)

  ;(async () => {
    await streamTeampilotData({
      launchpadSlugId: process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL,
      message: "Give me 5 cool animals",
      schema: z.object({
        animals: z.array(
          z
            .object({
              emoji: z.string(),
              name: z.string(),
              mainCharacteristic: z.string(),
              longDescription: z.string(),
            })
            .partial()
        ),
      }),
      onPartialData: ({ animals }) => {
        uiStream.update(
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {animals?.map((p, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="text-9xl text-center">{p?.emoji}</div>
                  <CardTitle>
                    <strong className="text-primary">{p?.name}</strong>
                  </CardTitle>
                  <div className="font-mono">{p?.mainCharacteristic}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <div>{p?.longDescription}</div>
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      },
    })

    uiStream.done()
  })()

  return <>{uiStream.value}</>
}
