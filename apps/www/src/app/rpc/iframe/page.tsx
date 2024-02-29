"use client"
import { chatToStyledFunctionRpc, chatToWidgetRpc } from "@teampilot/sdk"
import { useLayoutEffect, useRef } from "react"
export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useLayoutEffect(() => {
    const chatToWidget = chatToWidgetRpc({
      localWindow: window,
      remoteWindow: window.parent,
    })
    const chatToStyledFunction = chatToStyledFunctionRpc({
      localWindow: window,
      remoteWindow: iframeRef.current?.contentWindow as Window,
    })
    const listener = ({ params: { code } }: { params: { code: string } }) => {
      chatToWidget.send("evalJs", { params: { code } })
    }
    chatToStyledFunction.addMessageListener("evalJs", listener)

    return () => {
      chatToStyledFunction.removeMessageListener("evalJs", listener)
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
