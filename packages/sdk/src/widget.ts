import { z } from 'zod'
import { transformZodToJsonSchema } from './transformZodToJsonSchema'

const getWidget = async (): Promise<any> => {
  if (typeof window === 'undefined') return
  const widget = (window as any).teampilot
  if (!widget) {
    await new Promise((res) => setTimeout(res, 0))
    return await getWidget()
  }
  return widget
}

export type CustomWidgetFunction<T extends z.Schema> = {
  nameForAI: string
  descriptionForAI: string
  inputSchema: T
  execute: (options: {
    input: z.infer<T>
  }) => Promise<undefined | { output: any }>
}

export const teampilotWidget = {
  showChat: async () => {
    const widget = await getWidget()
    widget.showChat()
  },
  hideChat: async () => {
    const widget = await getWidget()
    widget.hideChat()
  },
  waitForChatroomLoaded: async () => {
    const widget = await getWidget()
    await widget.waitForChatroomLoaded()
  },
  sendMessage: async (options: { message: string }) => {
    const widget = await getWidget()
    await widget.sendMessage(options)
  },
  registerFunction: <T extends z.Schema>(fn: CustomWidgetFunction<T>) => {
    getWidget().then((widget) => {
      widget.registerFunction({
        ...fn,
        inputSchema: transformZodToJsonSchema(fn.inputSchema),
      })
    })
    return () => {
      teampilotWidget.unregisterFunction(fn.nameForAI)
    }
  },
  unregisterFunction: async (name: string) => {
    const widget = await getWidget()
    await widget.unregisterFunction(name)
  },
}
