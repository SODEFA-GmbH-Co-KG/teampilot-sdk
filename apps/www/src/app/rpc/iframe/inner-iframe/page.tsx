"use client"
import { styledFunctionToChatRpc } from "@teampilot/sdk"
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
            rpc?.send("evalJs", {
              params: { code: 'alert("Hello from the inner most iframe 👋.")' },
            })
          }}
        >
          Alert on top level
        </Button>
      </div>
    </>
  )
}
