import { type ReactNode } from "react"
import { Card, CardContent } from "~/shadcn/components/ui/card"
import { CodeBlock } from "./CodeBlock"

export const ShowCaseSideBySide = ({
  code,
  children,
}: {
  code: string
  children?: ReactNode
}) => {
  return (
    <>
      <div className="flex flex-row gap-8">
        <div className="flex-1">
          <CodeBlock language="tsx" value={code} lightMode="dark" />
        </div>
        <Card className="flex flex-1 items-center bg-accent p-2">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  )
}
