"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn/utils"
import { docPages } from "./DocsLink"

const docPagesCategorized: {
  categoryName: string
  pages: (typeof docPages)[number]["href"][]
}[] = [
  {
    categoryName: "Teampilot for Developers",
    pages: [
      "/introduction",
      "/teampilot-into-your-product",
      "/what-are-launchpads",
      "/fetching-teampilot",
      "/caching",
      "/fetching-via-api",
      "/fetching-via-sdk",
    ],
  },
  {
    categoryName: "SDK Examples",
    pages: ["/sdk-examples"],
  },
]

export function MainSideNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("sticky top-8 flex flex-col gap-3", className)}
      {...props}
    >
      {docPagesCategorized.map((category) => (
        <div key={category.categoryName}>
          <div className="py-1 text-sm font-medium">
            {category.categoryName}
          </div>
          <div className="flex flex-col gap-1">
            {category.pages.map((page) => {
              const isActive =
                // @ts-expect-error href can be "/" in the future
                page === "/" ? pathname === page : pathname?.startsWith(page)
              return (
                <Link
                  key={page}
                  href={page}
                  className={cn(
                    "py-1 pl-2 text-sm text-muted-foreground transition-colors hover:text-primary",
                    isActive && "text-primary"
                  )}
                >
                  {docPages.find((docPage) => docPage.href === page)!.name}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
      {/* {docPages.map((entry) => {
        const isActive =
          // @ts-expect-error href can be "/" in the future
          entry.href === "/"
            ? // @ts-expect-error href can be "/" in the future
              pathname === entry.href
            : pathname?.startsWith(entry.href)
        return (
          <Link
            key={entry.href}
            href={entry.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              !isActive && "text-muted-foreground"
            )}
          >
            {entry.name}
          </Link>
        )
      })} */}
    </nav>
  )
}
