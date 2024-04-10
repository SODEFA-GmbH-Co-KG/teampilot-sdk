import {
  RPCMessagePortTransportOptions,
  RPCTransport,
  rpcTransportMessageIn,
  rpcTransportMessageOut,
} from 'rpc-anywhere'

export function createTransportForWindow(
  window: Window,
  options: RPCMessagePortTransportOptions & { remotePort?: Window } = {}
): RPCTransport {
  const { transportId, filter, remotePort } = options

  const local = window
  const remote = remotePort ?? window

  let transportHandler: ((event: MessageEvent) => any) | undefined
  return {
    send(data) {
      remote.postMessage(rpcTransportMessageOut(data, { transportId }), '*')
    },
    registerHandler(handler) {
      transportHandler = (event: MessageEvent) => {
        const message = event.data
        const [ignore, data] = rpcTransportMessageIn(message, {
          transportId,
          filter: () => filter?.(event),
        })
        if (ignore) return
        handler(data)
      }
      local.addEventListener('message', transportHandler)
    },
    unregisterHandler() {
      if (transportHandler)
        local.removeEventListener('message', transportHandler)
    },
  }
}
