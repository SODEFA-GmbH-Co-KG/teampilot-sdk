import { readFile } from "fs/promises"
import { use, type ReactNode } from "react"
import { fetchTeampilot } from "~/teampilot-sdk/teampilot"
import { ShowCaseSideBySide } from "./ShowCaseSideBySide"
import { ShowCaseTabs } from "./ShowCaseTabs"

export const ShowCase = ({
  file,
  children,
  align = "center",
  title,
  layout = "tabs",
}: // description,
{
  file: string
  children?: ReactNode
  align?: "center" | "start" | "end"
  title?: string
  layout?: "tabs" | "side-by-side"
  // description?: string
}) => {
  const code = use(readFile(file, { encoding: "utf-8" }))

  const {
    message: { content: description },
  } = use(
    fetchTeampilot({
      message: `Explain this code very briefly: ${code}`,
    })
  )

  return (
    <>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-muted-foreground">
              <span data-br=":r14d:" data-brr="1">
                {description}
              </span>
            </p>
          )}
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
