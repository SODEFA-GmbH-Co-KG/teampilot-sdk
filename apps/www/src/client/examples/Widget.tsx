"use client"

import { teampilotWidget } from "@teampilot/sdk"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Button } from "~/shadcn/components/ui/button"

export const Widget = () => {
  const [color, setColor] = useState("#888888")

  useEffect(() => {
    return teampilotWidget.registerFunction({
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
  }, [])

  return (
    <>
      <div
        className="flex h-72 w-72 items-center justify-center rounded-md border text-3xl"
        style={{
          backgroundColor: color,
        }}
      >
        {color}
      </div>

      <div className="mt-2 flex flex-row gap-2">
        <Button
          className="flex-1"
          onClick={() => {
            teampilotWidget.sendMessage({
              message: "Make the square blue as the sky",
            })
          }}
        >
          Blue as the sky
        </Button>
        <Button
          className="flex-1"
          onClick={() => {
            teampilotWidget.sendMessage({
              message: "Make the square red like a flower",
            })
          }}
        >
          Red like a flower
        </Button>
      </div>

      <script
        defer
        src="http://localhost:3000/widget.js"
        data-launchpad-slug-id={
          process.env.NEXT_PUBLIC_LAUNCHPAD_SLUG_ID_LOCAL!
        }
      />
    </>
  )
}
