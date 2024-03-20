import {
  _RPCPacket,
  createRPC,
  createTransportFromMessagePort,
  EmptyRPCSchema,
  type RPC,
  type RPCSchema,
} from 'rpc-anywhere'

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

type Windows = {
  localWindow: Window
  remoteWindow: Window
}

export type WebsiteRpcSchema = EmptyRPCSchema

function createSingletonRPC<T extends RPCSchema, U extends RPCSchema>(
  createRpcFn: ({ localWindow, remoteWindow }: Windows) => RPC<T, U>
) {
  let instance: RPC<T, U> | null = null
  return ({ localWindow, remoteWindow }: Windows): RPC<T, U> => {
    if (!instance) {
      if (!localWindow) throw new Error('localWindow is not defined')
      instance = createRpcFn({ localWindow, remoteWindow })
    }
    return instance
  }
}

export const styledFunctionToChatRpc = createSingletonRPC<
  StyledFunctionRpcSchema,
  ChatRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<StyledFunctionRpcSchema, ChatRpcSchema> => {
    const rpc = createRPC<StyledFunctionRpcSchema, ChatRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'teampilot-rpc',
      }),
      _debugHooks,
    })
    return rpc
  }
)

export const chatToStyledFunctionRpc = createSingletonRPC<
  ChatRpcSchema,
  StyledFunctionRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<ChatRpcSchema, StyledFunctionRpcSchema> => {
    const rpc = createRPC<ChatRpcSchema, StyledFunctionRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'teampilot-rpc',
      }),
      _debugHooks,
    })
    return rpc
  }
)

export const chatToWebsiteRpc = createSingletonRPC<
  ChatRpcSchema,
  WebsiteRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<ChatRpcSchema, WebsiteRpcSchema> => {
    const rpc = createRPC<ChatRpcSchema, WebsiteRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'teampilot-rpc',
      }),
      _debugHooks,
    })
    return rpc
  }
)

export const websiteToChatRpc = createSingletonRPC<
  WebsiteRpcSchema,
  ChatRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<WebsiteRpcSchema, ChatRpcSchema> => {
    const rpc = createRPC<WebsiteRpcSchema, ChatRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'teampilot-rpc',
      }),
      _debugHooks,
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

const _debugHooks = DEBUDG_MODE
  ? { onSend: _debugOnSend, onReceive: _debugOnReceive }
  : {}
