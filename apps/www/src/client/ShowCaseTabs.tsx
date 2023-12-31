import { type ReactNode } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/shadcn/components/ui/tabs"
import { cn } from "~/shadcn/utils"
import { CodeBlock } from "./CodeBlock"
import { SuspenseLoader } from "./SuspenseLoader"

export const ShowCaseTabs = ({
  code,
  children,
  align,
}: {
  code: string
  children?: ReactNode
  align?: "center" | "start" | "end"
}) => {
  return (
    <>
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div
            className={cn(
              "preview flex min-h-[350px] w-full justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            <SuspenseLoader>{children}</SuspenseLoader>
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div
              className={cn(
                "w-full rounded-md"
                // "[&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
              )}
            >
              <CodeBlock language="tsx" value={code} lightMode="dark" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
