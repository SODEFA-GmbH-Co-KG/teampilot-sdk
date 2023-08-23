"use client"

import { teampilotWidget } from "@teampilot/sdk"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Heading } from "~/client/Heading"

export default async function Page() {
  const [color, setColor] = useState("#888888")

  useEffect(() => {
    return teampilotWidget.registerFunction({
      nameForAI: "changeColor",
      descriptionForAI: "Change the color of the square using hex codes",
      inputSchema: z.object({
        color: z.string(),
      }),
      execute: async ({ input }: any) => {
        setColor(input.color)
        return {
          output: `Changed color to ${input.color}`,
        }
      },
    })
  }, [])

  return (
    <>
      <Heading>Widget</Heading>
      <div
        className="flex h-96 w-96 items-center justify-center rounded border text-3xl"
        style={{
          backgroundColor: color,
        }}
      >
        {color}
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
