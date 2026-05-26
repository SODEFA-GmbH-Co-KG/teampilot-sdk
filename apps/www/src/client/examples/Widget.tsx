"use client"

import { teampilotWidget } from "@teampilot/sdk"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Button } from "~/shadcn/components/ui/button"

const WIDGET_SCRIPT_ID = "teampilot-widget-local-test"
const WIDGET_SCRIPT_SRC = "https://teampilot.localhost/widget.js"

const waitForWidgetGlobal = async (): Promise<void> => {
  for (let i = 0; i < 100; i++) {
    if ((window as any).teampilot) return
    await new Promise((resolve) => setTimeout(resolve, 50))
  }
  throw new Error("Teampilot widget did not initialize")
}

const waitForWidget = async (): Promise<void> => {
  if (typeof window === "undefined") return
  if ((window as any).teampilot) return

  await new Promise((resolve, reject) => {
    const existingScript = document.getElementById(WIDGET_SCRIPT_ID)
    if (existingScript) {
      resolve(undefined)
      return
    }

    const script = document.createElement("script")
    script.id = WIDGET_SCRIPT_ID
    script.defer = true
    script.src = WIDGET_SCRIPT_SRC
    script.dataset.rememberChatroom = "false"
    script.dataset.launchpadSlugId =
      process.env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID!
    script.addEventListener("load", resolve, { once: true })
    script.addEventListener("error", reject, { once: true })
    document.body.appendChild(script)
  })

  await waitForWidgetGlobal()
}

export const Widget = () => {
  const [color, setColor] = useState("#888888")

  useEffect(() => {
    let unregister: (() => void) | undefined
    let didCancel = false

    void waitForWidget()
      .then(() => {
        if (didCancel) return
        unregister = teampilotWidget.registerFunction({
          nameForAI: "changeColor",
          descriptionForAI: "Change the color of the square using hex codes",
          inputSchema: z.object({
            color: z.string(),
          }),
          execute: async ({ input }) => {
            setColor(input.color)
            return {
              output: `Changed color to ${input.color}`,
            }
          },
        })
      })
      .catch(console.error)

    return () => {
      didCancel = true
      unregister?.()
    }
  }, [])

  const sendWidgetMessage = (message: string) => {
    void waitForWidget()
      .then(() => teampilotWidget.sendMessage({ message }))
      .catch(console.error)
  }

  return (
    <>
      <div
        className="flex w-full aspect-square items-center justify-center rounded-md border text-3xl"
        style={{
          backgroundColor: color,
        }}
      >
        {color}
      </div>

      <div className="mt-2 flex flex-row gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            sendWidgetMessage("Make the square blue as the sky")
          }}
        >
          Blue as the sky
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            sendWidgetMessage("Make the square red like a flower")
          }}
        >
          Red like a flower
        </Button>
      </div>
    </>
  )
}
