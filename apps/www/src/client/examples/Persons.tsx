import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { teampilot } from "~/teampilot"

export const Persons = async () => {
  const data = await teampilot.default.fetchData({
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
