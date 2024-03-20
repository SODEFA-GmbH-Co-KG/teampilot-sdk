import { Persons } from "~/client/examples/Persons"
import { IntersectionChecker } from "~/client/IntersectionChecker"
import { ShowCase } from "~/client/ShowCase"

export const Schema = async () => {
  return (
    <>
      <IntersectionChecker topic="/examples#schema" />
      <ShowCase
        title="Generating data with a schema"
        description="Teampilot can generate data for you and even format it according to a schema you specify. This is useful when you want to generate data for a specific purpose. For instance, you can generate a list of presidents and some information abut them.
The format ca be specified with a zod schema."
        code={`
import { fetchTeampilotData } from "@teampilot/sdk"
import { z } from "zod"
import { env } from "~/env.mjs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"

export const Persons = async () => {
  const data = await fetchTeampilotData({
    launchpadSlugId: env.NEXT_PUBLIC_TEAMPILOT_DEFAULT_LAUNCHPAD_SLUG_ID,
    message: "First 6 Presidents of the US",
    schema: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        dateOfBirth: z.string(),
        shortDescription: z.string(),
        achievements: z.array(z.string()),
      })
    ),
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {data?.map((p, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>
              <span>{p.firstName}</span>{" "}
              <strong className="text-primary">{p.lastName}</strong>
            </CardTitle>
            <div className="font-mono">{p.dateOfBirth}</div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div>{p.shortDescription}</div>
              <ul className="mt-2 list-inside list-disc">
                {p.achievements.map((a, idx) => {
                  return <li key={idx}>{a}</li>
                })}
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
        `}
      >
        <Persons />
      </ShowCase>
    </>
  )
}
