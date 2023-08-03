import { readFile } from "fs/promises"
import { unstable_cache } from "next/cache"
import path from "path"
import { type ReactNode } from "react"
import { Heading } from "./Heading"
import { ShowCaseDescription } from "./ShowCaseDescription"
import { ShowCaseSideBySide } from "./ShowCaseSideBySide"
import { ShowCaseTabs } from "./ShowCaseTabs"
import { SuspenseLoader } from "./SuspenseLoader"

const getFile = unstable_cache(
  async (file: string) => {
    return await readFile(path.join(process.cwd(), file), { encoding: "utf-8" })
  },
  undefined,
  {
    revalidate: false,
  }
)

export const ShowCase = async ({
  code = "",
  file,
  children,
  align = "center",
  title,
  layout = "tabs",
}: {
  code?: string
  file?: string
  children?: ReactNode
  align?: "center" | "start" | "end"
  title?: string
  layout?: "tabs" | "side-by-side"
}) => {
  if (!code && file) {
    code = await getFile(file)
  }

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
