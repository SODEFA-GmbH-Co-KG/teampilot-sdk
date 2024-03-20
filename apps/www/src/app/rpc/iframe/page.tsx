"use client"
import { chatToStyledFunctionRpc, chatToWebsiteRpc } from "@teampilot/sdk"
import { useLayoutEffect, useRef } from "react"

// This simulates the teampilot chat

export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useLayoutEffect(() => {
    const chatToWidget = chatToWebsiteRpc({
      localWindow: window,
      remoteWindow: window.parent,
    })
    const chatToStyledFunction = chatToStyledFunctionRpc({
      localWindow: window,
      remoteWindow: iframeRef.current?.contentWindow as Window,
    })
    const listener = ({ params: { code } }: { params: { code: string } }) => {
      chatToWidget.send("evalJsOnWebsite", { params: { code } })
    }
    chatToStyledFunction.addMessageListener("evalJsOnWebsite", listener)

    return () => {
      chatToStyledFunction.removeMessageListener("evalJsOnWebsite", listener)
    }
  }, [])

  return (
    <>
      <div>
        <iframe
          ref={iframeRef}
          src="/rpc/iframe/inner-iframe"
          className="h-[1000px] w-[1000px]"
        />
      </div>
    </>
  )
}
