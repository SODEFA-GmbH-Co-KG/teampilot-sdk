import { StyledFunctionRpcSchema, styledFunctionToChatRpc } from './rpcSchema'

export const rpc = {
  fromStyledFunctionToWebsite: {
    navigate: ({
      params,
      origin = window,
      remote = window.parent,
      enableDebugHooks,
      transportId,
    }: {
      params: StyledFunctionRpcSchema['messages']['navigateOnWebsite']['params']
      origin?: Window
      remote?: Window
      enableDebugHooks?: boolean
      transportId?: string
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
        enableDebugHooks,
        transportId,
      })
      rpc.send('navigateOnWebsite', { params })
    },
    evalJs: ({
      params,
      origin = window,
      remote = window.parent,
      enableDebugHooks,
      transportId,
    }: {
      params: StyledFunctionRpcSchema['messages']['evalJsOnWebsite']['params']
      origin?: Window
      remote?: Window
      enableDebugHooks?: boolean
      transportId?: string
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
        enableDebugHooks,
        transportId,
      })
      rpc.send('evalJsOnWebsite', { params })
    },
  },
}
