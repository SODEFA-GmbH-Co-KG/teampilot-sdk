import { readFile } from "fs/promises"
import { use } from "react"
import { Card, CardContent } from "~/shadcn/components/ui/card"
import { CodeBlock } from "./CodeBlock"
import { Reasons } from "./Reasons"

export const ReasonsShowCase = () => {
  const file = use(readFile("./src/client/Reasons.tsx", { encoding: "utf-8" }))

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <CodeBlock language="tsx" value={file} lightMode="dark" />
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
