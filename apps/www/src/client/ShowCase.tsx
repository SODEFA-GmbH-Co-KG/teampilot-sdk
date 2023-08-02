import { readFile } from "fs/promises"
import path from "path"
import { use, type ReactNode } from "react"
import { Heading } from "./Heading"
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
  const code = use(
    readFile(path.join(process.cwd(), file), { encoding: "utf-8" })
  )

  return (
    <>
      {!!title && (
        <div className="space-y-2">
          <Heading>{title}</Heading>
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
