import Link from "next/link"
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

export default async function OverviewPage() {
  const cities = await getAllCities()
  return (
    <div className="grid grid-cols-3 gap-2 underline">
      {cities.map((city) => (
        <Link key={city.slug} href={`/cities/${city.slug}`}>
          {city.name}
        </Link>
      ))}
    </div>
  )
}
