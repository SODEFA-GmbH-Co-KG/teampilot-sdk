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
        <Card className="flex flex-1 items-center bg-accent p-2">
          <CardContent className="">
            <Reasons />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
