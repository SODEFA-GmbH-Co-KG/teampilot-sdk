import { StyledFunctionRpcSchema, styledFunctionToChatRpc } from './rpcSchema'

export const rpc = {
  fromStyledFunctionToWebsite: {
    navigate: ({
      params,
      origin = window,
      remote = window.parent,
    }: {
      params: StyledFunctionRpcSchema['messages']['navigateOnWebsite']['params']
      origin?: Window
      remote?: Window
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
      })
      rpc.send('navigateOnWebsite', { params })
    },
    evalJs: ({
      params,
      origin = window,
      remote = window.parent,
    }: {
      params: StyledFunctionRpcSchema['messages']['evalJsOnWebsite']['params']
      origin?: Window
      remote?: Window
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
      })
      rpc.send('evalJsOnWebsite', { params })
    },
  },
}
