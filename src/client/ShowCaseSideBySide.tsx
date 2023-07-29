import { ArrowRight } from "lucide-react"
import { type ReactNode } from "react"
import { Card, CardContent } from "~/shadcn/components/ui/card"
import { cn } from "~/shadcn/utils"
import { CodeBlock } from "./CodeBlock"
import { SuspenseLoader } from "./SuspenseLoader"

export const ShowCaseSideBySide = ({
  code,
  children,
  align = "center",
}: {
  code: string
  children?: ReactNode
  align?: "center" | "start" | "end"
}) => {
  return (
    <>
      <div className="flex flex-row gap-8">
        <div className="flex-1">
          <CodeBlock language="tsx" value={code} lightMode="dark" />
        </div>
        <ArrowRight className="h-8 w-8 self-center" />
        <Card
          className={cn(
            "flex flex-1 flex-col justify-center bg-accent p-4",

            {
              "items-center": align === "center",
              "items-start": align === "start",
              "items-end": align === "end",
            }
          )}
        >
          <CardContent>
            <SuspenseLoader>{children}</SuspenseLoader>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
