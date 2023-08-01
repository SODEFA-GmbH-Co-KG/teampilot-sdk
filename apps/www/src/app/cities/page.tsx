import Link from "next/link"
import { getAllCities } from "./getAllCities"
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
