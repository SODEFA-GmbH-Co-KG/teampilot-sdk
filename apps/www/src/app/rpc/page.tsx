"use client"
import { widgetToChatRpc } from "@teampilot/sdk"
import { useLayoutEffect, useRef } from "react"

// This is simulates the site that embeds the widget

export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useLayoutEffect(() => {
    const widgetToChat = widgetToChatRpc({
      localWindow: window,
      remoteWindow: iframeRef.current?.contentWindow as Window,
    })
    const listener = ({ params: { code } }: { params: { code: string } }) => {
      eval(code)
    }
    widgetToChat.addMessageListener("evalJs", listener)

    return () => {
      widgetToChat.removeMessageListener("evalJs", listener)
    }
  }, [])

  return (
    <>
      <iframe
        ref={iframeRef}
        src="/rpc/iframe"
        className="h-[1000px] w-[1000px]"
      />
    </>
  )
}
