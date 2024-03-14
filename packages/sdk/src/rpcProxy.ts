import { StyledFunctionRpcSchema, styledFunctionToChatRpc } from './rpcSchema'

export const communication = {
  styledFunction: {
    navigateOnWebsite: ({
      args,
      origin,
      remote,
    }: {
      args: StyledFunctionRpcSchema['messages']['navigateOnWebsite']
      origin: Window
      remote: Window
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
      })
      rpc.send('navigateOnWebsite', args)
    },
    evalJsOnWebsite: ({
      args,
      origin,
      remote,
    }: {
      args: StyledFunctionRpcSchema['messages']['evalJsOnWebsite']
      origin: Window
      remote: Window
    }) => {
      const rpc = styledFunctionToChatRpc({
        localWindow: origin,
        remoteWindow: remote,
      })
      rpc.send('evalJsOnWebsite', args)
    },
  },
}
