import { z } from "zod"
import { teampilot } from "~/teampilot"

export const getAllCities = async () => {
  return teampilot.default.fetchData({
    message: "List of 12 biggest cities in Germany",
    schema: z.array(
      z.object({
        slug: z.string(),
        name: z.string(),
      })
    ),
  })
}
