type LaunchpadConfig = {
  launchpadSlugId: string
}

type LaunchpadOptions<T extends string> = {
  [K in T]: LaunchpadConfig
}

const createLaunchpadProxy = (config: LaunchpadConfig) => {
  return {
    fetchText: async () => "ok",
  }
}

type LaunchpadProxy = ReturnType<typeof createLaunchpadProxy>

export const createProxy = <T extends string>(options: LaunchpadOptions<T>) => {
  const handler = {
    get(target: LaunchpadOptions<T>, property: string & T) {
      return {
        ...target[property],
        fetchData: (args: any) => {
          console.log("fetchData called with", args)
        },
      }
    },
  }

  return new Proxy(options, handler) as any as {
    [K in T]: LaunchpadProxy
  }
}

const example = createProxy({
  sdkExpert: {
    launchpadSlugId: "sdk-expert-123",
  },
  another: {
    launchpadSlugId: "another-assistant-456",
  },
})

example.sdkExpert.fetchText()
