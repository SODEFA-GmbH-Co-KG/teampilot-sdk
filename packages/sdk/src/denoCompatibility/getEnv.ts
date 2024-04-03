export const getEnv = async (key: string) => {
  if (typeof Deno !== 'undefined') {
    return Deno.env.get(key)
  } else {
    const nodeEnv = await import('./nodeEnv.js')
    return nodeEnv.get(key)
  }
}
