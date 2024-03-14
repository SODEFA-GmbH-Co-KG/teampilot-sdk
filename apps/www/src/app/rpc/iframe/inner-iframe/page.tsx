"use client"
import { communication, styledFunctionToChatRpc } from "@teampilot/sdk"
import { useLayoutEffect, useState } from "react"
import { Button } from "~/shadcn/components/ui/button"

type styledFunctionToChatRpcReturnType = ReturnType<
  typeof styledFunctionToChatRpc
>

// This simulates the (hosted) styled functions

export default function Page() {
  const [rpc, setRpc] = useState<styledFunctionToChatRpcReturnType | null>(null)

  useLayoutEffect(() => {
    const rpc = styledFunctionToChatRpc({
      localWindow: window,
      remoteWindow: window.parent,
    })
    setRpc(rpc)
  }, [])

  return (
    <>
      <div>
        <Button
          onClick={() => {
            rpc?.send("evalJsOnWebsite", {
              params: { code: 'alert("Hello from the inner most iframe 👋.")' },
            })
            // alternatively, you can use the following code to send the message
            communication.styledFunction.evalJsOnWebsite({
              args: {
                params: {
                  code: 'alert("Hello again from the inner most iframe 👋.")',
                },
              },
              origin: window,
              remote: window.parent,
            })
          }}
        >
          Alert on top level
        </Button>
      </div>
    </>
  )
}
