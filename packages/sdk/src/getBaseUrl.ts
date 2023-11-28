export const getBaseUrl = () => {
  return (
    process.env.TEAMPILOT_BASE_URL ||
    process.env.NEXT_PUBLIC_TEAMPILOT_BASE_URL ||
    `https://teampilot.ai`
  )
}
