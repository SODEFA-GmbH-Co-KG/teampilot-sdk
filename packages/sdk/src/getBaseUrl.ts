import { getEnv } from './denoCompatability/getEnv'

export const getBaseUrl = async () => {
  return (
    (await getEnv('TEAMPILOT_BASE_URL')) ||
    (await getEnv('NEXT_PUBLIC_TEAMPILOT_BASE_URL')) ||
    `https://teampilot.ai`
  )
}
