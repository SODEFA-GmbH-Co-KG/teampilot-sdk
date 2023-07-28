import { readFile } from "fs/promises"
import { use, type ReactNode } from "react"
import { Card, CardContent } from "~/shadcn/components/ui/card"
import { CodeBlock } from "./CodeBlock"

export const ShowCaseSideBySide = ({
  file,
  children,
}: {
  file: string
  children?: ReactNode
}) => {
  const fileContent = use(readFile(file, { encoding: "utf-8" }))

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <CodeBlock language="tsx" value={fileContent} lightMode="dark" />
        </div>
        <Card className="flex flex-1 items-center bg-accent p-2">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  )
}
