import { readFile } from "fs/promises"
import { use, type ReactNode } from "react"
import { ShowCaseDescription } from "./ShowCaseDescription"
import { ShowCaseSideBySide } from "./ShowCaseSideBySide"
import { ShowCaseTabs } from "./ShowCaseTabs"
import { SuspenseLoader } from "./SuspenseLoader"

export const ShowCase = ({
  file,
  children,
  align = "center",
  title,
  layout = "tabs",
}: {
  file: string
  children?: ReactNode
  align?: "center" | "start" | "end"
  title?: string
  layout?: "tabs" | "side-by-side"
}) => {
  const code = use(readFile(file, { encoding: "utf-8" }))

  return (
    <>
      {!!title && (
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            {title}
          </h1>
          <SuspenseLoader>
            <ShowCaseDescription title={title} code={code} />
          </SuspenseLoader>
        </div>
      )}
      {layout === "tabs" && (
        <>
          <ShowCaseTabs code={code} align={align}>
            {children}
          </ShowCaseTabs>
        </>
      )}
      {layout === "side-by-side" && (
        <>
          <ShowCaseSideBySide code={code}>{children}</ShowCaseSideBySide>
        </>
      )}
    </>
  )
}
