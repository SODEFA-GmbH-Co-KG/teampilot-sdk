import { Card, CardContent } from "~/shadcn/components/ui/card"
import { CodeBlock } from "./CodeBlock"
import { Reasons, reasonsCode } from "./Reasons"

export const ReasonsShowCase = () => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <CodeBlock language="tsx" value={reasonsCode} lightMode="dark" />
        </div>
        <Card className="flex-1 bg-accent p-2">
          <CardContent>
            <Reasons />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
