import { Card, CardContent } from "~/shadcn/components/ui/card"
import { Reasons } from "./Reasons"

export const ReasonsShowCase = () => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <Card className="bg-accent p-2">
          <CardContent>
            <Reasons />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
