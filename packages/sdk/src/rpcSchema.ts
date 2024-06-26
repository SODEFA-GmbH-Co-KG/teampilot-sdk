import {
  _RPCPacket,
  createRPC,
  EmptyRPCSchema,
  type RPC,
  type RPCSchema,
} from 'rpc-anywhere'
import { createTransportForWindow } from './rpcCustomTransport'

export type StyledFunctionRpcSchema = RPCSchema<{
  messages: {
    evalJsOnWebsite: {
      params: {
        code: string
      }
    }
    navigateOnWebsite: {
      params: {
        url: string
        target: '_blank' | '_self'
      }
    }
    setHeight: {
      params: {
        height: number
      }
    }
  }
}>

export type ChatRpcSchema = RPCSchema<{
  messages: {
    evalJsOnWebsite: {
      params: {
        code: string
      }
    }
  }
}>

type RpcOptions = {
  localWindow: Window
  remoteWindow: Window
  transportId?: string
  enableDebugHooks?: boolean
}

function createRpcInstance<T extends RPCSchema, U extends RPCSchema>(
  createRpcFn: ({
    localWindow,
    remoteWindow,
    enableDebugHooks,
    transportId,
  }: RpcOptions) => RPC<T, U>
) {
  return ({
    localWindow,
    remoteWindow,
    enableDebugHooks,
    transportId,
  }: RpcOptions): RPC<T, U> => {
    if (!localWindow) throw new Error('localWindow is not defined')
    if (!remoteWindow) throw new Error('remoteWindow is not defined')
    return createRpcFn({
      localWindow,
      remoteWindow,
      enableDebugHooks,
      transportId: transportId ?? 'teampilot-rpc',
    })
  }
}

export const styledFunctionToChatRpc = createRpcInstance<
  StyledFunctionRpcSchema,
  ChatRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
    transportId,
    enableDebugHooks,
  }: RpcOptions): RPC<StyledFunctionRpcSchema, ChatRpcSchema> => {
    const rpc = createRPC<StyledFunctionRpcSchema, ChatRpcSchema>({
      transport: createTransportForWindow(localWindow, {
        remotePort: remoteWindow,
        transportId: transportId,
      }),
      _debugHooks: getDebugHooks({ enableDebugHooks }),
    })
    return rpc
  }
)

export const chatToStyledFunctionRpc = createRpcInstance<
  ChatRpcSchema,
  StyledFunctionRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
    transportId,
    enableDebugHooks,
  }: RpcOptions): RPC<ChatRpcSchema, StyledFunctionRpcSchema> => {
    const rpc = createRPC<ChatRpcSchema, StyledFunctionRpcSchema>({
      transport: createTransportForWindow(localWindow, {
        remotePort: remoteWindow,
        transportId: transportId,
      }),
      _debugHooks: getDebugHooks({ enableDebugHooks }),
    })
    return rpc
  }
)

export const chatToWebsiteRpc = createRpcInstance<
  ChatRpcSchema,
  EmptyRPCSchema
>(
  ({
    localWindow,
    remoteWindow,
    transportId,
    enableDebugHooks,
  }: RpcOptions): RPC<ChatRpcSchema, EmptyRPCSchema> => {
    const rpc = createRPC<ChatRpcSchema, EmptyRPCSchema>({
      transport: createTransportForWindow(localWindow, {
        remotePort: remoteWindow,
        transportId: transportId,
      }),
      _debugHooks: getDebugHooks({ enableDebugHooks }),
    })
    return rpc
  }
)

export const websiteToChatRpc = createRpcInstance<
  EmptyRPCSchema,
  ChatRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
    transportId,
    enableDebugHooks,
  }: RpcOptions): RPC<EmptyRPCSchema, ChatRpcSchema> => {
    const rpc = createRPC<EmptyRPCSchema, ChatRpcSchema>({
      transport: createTransportForWindow(localWindow, {
        remotePort: remoteWindow,
        transportId: transportId,
      }),
      _debugHooks: getDebugHooks({ enableDebugHooks }),
    })
    return rpc
  }
)

// Set this to true to enable debug logging
const DEBUDG_MODE = false

function _debugOnSend(packet: _RPCPacket) {
  console.log('[iframe] sent', packet)
}
function _debugOnReceive(packet: _RPCPacket) {
  console.log('[iframe] received', packet)
}

export const getDebugHooks = ({
  enableDebugHooks,
}: {
  enableDebugHooks?: boolean
}) =>
  DEBUDG_MODE || enableDebugHooks
    ? { onSend: _debugOnSend, onReceive: _debugOnReceive }
    : {}
