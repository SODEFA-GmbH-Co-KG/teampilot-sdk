"use client"
import type { FunctionComponent } from "react"
import { createContext, useContext, useState } from "react"

const useNavigationContextState = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>()
  return {
    selectedTopic,
    setSelectedTopic,
  }
}

type INavigationContext = ReturnType<typeof useNavigationContextState>

export const NavigationContext = createContext({} as INavigationContext)

export const NavigationContextProvider: FunctionComponent<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const context = useNavigationContextState()
  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigationContext() {
  return useContext(NavigationContext)
}
