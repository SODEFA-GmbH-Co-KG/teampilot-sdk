import {
  fetchTeampilot,
  fetchTeampilotData,
  fetchTeampilotMedia,
  fetchTeampilotText,
} from "./fetchTeampilot"

type LaunchpadConfig = {
  launchpadSlugId: string
}

type LaunchpadOptions<T extends string> = {
  [K in T]: LaunchpadConfig
}

function setDefaults<Args, ResponseType>(
  func: (args: Args) => ResponseType,
  defaults: LaunchpadConfig
) {
  return (args: Args) => {
    const fullArgs = {
      ...args,
      ...defaults,
    }
    return func(fullArgs as Args)
  }
}

const createLaunchpadProxy = (config: LaunchpadConfig) => {
  return {
    fetch: setDefaults(fetchTeampilot, config),
    fetchData: setDefaults(fetchTeampilotData, config),
    fetchText: setDefaults(fetchTeampilotText, config),
    fetchMedia: setDefaults(fetchTeampilotMedia, config),
    mutate: (message: string) =>
      setDefaults(
        fetchTeampilot,
        config
      )({
        message,
        cacheTtlSeconds: 0,
      }),
  }
}

type LaunchpadProxy = ReturnType<typeof createLaunchpadProxy>

export const createTeampilotClient = <T extends string>(
  options: LaunchpadOptions<T>
) => {
  const handler = {
    get(target: LaunchpadOptions<T>, property: string & T) {
      const config = target[property]
      return createLaunchpadProxy(config)
    },
  }

  return new Proxy(options, handler) as any as {
    [K in T]: LaunchpadProxy
  }
}

// const example = createProxy({
//   sdkExpert: {
//     launchpadSlugId: "sdk-expert-123",
//   },
//   another: {
//     launchpadSlugId: "another-assistant-456",
//   },
// })
