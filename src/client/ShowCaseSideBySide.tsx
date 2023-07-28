import { ArrowRight } from "lucide-react"
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
      <div className="flex flex-row items-center gap-8">
        <div className="flex-1">
          <CodeBlock language="tsx" value={code} lightMode="dark" />
        </div>
        <ArrowRight className="h-4 w-4" />
        <Card className="flex flex-1 items-center bg-accent p-2">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </>
  )
}
