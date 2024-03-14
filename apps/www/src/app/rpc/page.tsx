"use client"
import { websiteToChatRpc } from "@teampilot/sdk"
import { useLayoutEffect, useRef } from "react"

// This is simulates the site that embeds the widget

export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useLayoutEffect(() => {
    const widgetToChat = websiteToChatRpc({
      localWindow: window,
      remoteWindow: iframeRef.current?.contentWindow as Window,
    })
    const listener = ({ params: { code } }: { params: { code: string } }) => {
      eval(code)
    }
    widgetToChat.addMessageListener("evalJsOnWebsite", listener)

    return () => {
      widgetToChat.removeMessageListener("evalJsOnWebsite", listener)
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
