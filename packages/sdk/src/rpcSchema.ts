import {
  createRPC,
  createTransportFromMessagePort,
  EmptyRPCSchema,
  type RPC,
  type RPCSchema,
} from 'rpc-anywhere'

export type StyledFunctionRpcSchema = RPCSchema<{
  messages: {
    evalJs: {
      params: {
        code: string
      }
    }
    navigateInParent: {
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
    evalJs: {
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

export type WidgetRpcSchema = EmptyRPCSchema

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
        transportId: 'styledFunctionToChatRpc',
      }),
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
        transportId: 'chatToStyledFunctionRpc',
      }),
    })
    return rpc
  }
)

export const chatToWidgetRpc = createSingletonRPC<
  ChatRpcSchema,
  WidgetRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<ChatRpcSchema, WidgetRpcSchema> => {
    const rpc = createRPC<ChatRpcSchema, WidgetRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'chatToWidgetRpc',
      }),
    })
    return rpc
  }
)

export const widgetToChatRpc = createSingletonRPC<
  WidgetRpcSchema,
  ChatRpcSchema
>(
  ({
    localWindow,
    remoteWindow,
  }: Windows): RPC<WidgetRpcSchema, ChatRpcSchema> => {
    const rpc = createRPC<WidgetRpcSchema, ChatRpcSchema>({
      transport: createTransportFromMessagePort(localWindow, {
        remotePort: remoteWindow,
        transportId: 'widgetToChatRpc',
      }),
    })
    return rpc
  }
)
