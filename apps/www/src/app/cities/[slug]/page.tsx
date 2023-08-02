import { z } from "zod"
import { teampilot } from "~/teampilot"
import { getAllCities } from "../getAllCities"

export async function generateStaticParams() {
  const cities = await getAllCities()
  return cities.map((city) => ({
    slug: city.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const city = await teampilot.default.fetchData({
    message: `Generate the City Analysis for: ${params.slug}`,
    schema: z.object({
      name: z.string(),
      population: z.number(),
      whyThisCityIsAwesome: z.string(),
      // ...
    }),
  })
  return (
    <>
      <h1 className="text-3xl">{city.name}</h1>
      <div className="text-mono">
        Population: {city.population.toLocaleString()}
      </div>
      <div>{city.whyThisCityIsAwesome}</div>
    </>
  )
}
