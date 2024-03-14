import Image from "next/image"
import Link from "next/link"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"
import details from "../../../public/examples/seo-details.png"
import overview from "../../../public/examples/seo-overview.png"

export const Seo = async () => {
  return (
    <>
      <IntersectionChecker topic="/examples#seo" />
      <ShowCase
        title="Overview Page"
        code={`
import Link from "next/link"
import { getAllCities } from "./getAllCities"
export default async function OverviewPage() {
  const cities = await getAllCities()
  return (
    <div className="grid grid-cols-3 gap-2 underline">
      {cities.map((city) => (
        <Link key={city.slug} href={\`/cities/$\{city.slug\}\`}>
          {city.name}
        </Link>
      ))}
    </div>
  )
}
`}
        layout="side-by-side"
      >
        <Link href="/cities">
          <Image src={overview} alt="Sidebar" />
        </Link>
      </ShowCase>
      <ShowCase
        title="Details Page"
        code={`
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
    message: \`Generate the City Analysis for: $\{params.slug\}\`,
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
`}
        layout="side-by-side"
      >
        <Link href="/cities/berlin">
          <Image src={details} alt="Sidebar" />
        </Link>
      </ShowCase>
    </>
  )
}
