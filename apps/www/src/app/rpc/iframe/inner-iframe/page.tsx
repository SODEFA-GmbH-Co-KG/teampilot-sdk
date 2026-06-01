"use client"
import { rpc } from "@teampilot/sdk"
import { Button } from "~/shadcn/components/ui/button"

// This simulates styled functions

export default function Page() {
  return (
    <>
      <div>
        <Button
          onClick={() => {
            rpc.fromStyledFunctionToWebsite.evalJs({
              params: {
                code: 'alert("Hello from the inner most iframe 👋.")',
              },
            })
          }}
        >
          Alert on top level
        </Button>
      </div>
    </>
  )
}
