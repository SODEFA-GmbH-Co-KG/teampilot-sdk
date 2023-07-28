import { use } from "react"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card"
import { fetchTeampilotData } from "~/teampilot-sdk/teampilot"

export default function Page() {
  const data = use(
    fetchTeampilotData({
      message: "First 6 Presidents of the US",
      schema: z.array(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
          dateOfBirth: z.string(),
          shortDescription: z.string(),
          // noOfPresident: z.number(),
        })
      ),
    })
  )

  return (
    <>
      <div>Persons</div>
      <div className="grid grid-cols-3 gap-4">
        {data?.map((p, idx) => {
          return (
            <Card key={idx}>
              <CardHeader>
                <CardTitle>
                  {/* <span className="text-muted-foreground">
                    #{p.noOfPresident}
                  </span>{" "} */}
                  <span>{p.firstName}</span> <strong>{p.lastName}</strong>
                </CardTitle>
                <div className="font-mono">{p.dateOfBirth}</div>
              </CardHeader>
              <CardContent>
                <CardDescription>{p.shortDescription}</CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
