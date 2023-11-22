"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "~/shadcn/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/shadcn/components/ui/sheet"
import { cn } from "~/shadcn/utils"
import { docPages } from "./DocsLink"

const docPagesCategorized: {
  categoryName: string
  pages: (typeof docPages)[number]["href"][]
}[] = [
  {
    categoryName: "Teampilot for Developers",
    pages: [
      "/",
      "/your-product-into-teampilot",
      "/teampilot-into-your-product",
      "/what-are-launchpads",
      "/functions",
      "/fetching-teampilot",
      "/caching",
      "/fetching-via-api",
      "/fetching-via-sdk",
      "/custom-functions",
    ],
  },
  {
    categoryName: "SDK Examples",
    pages: [
      "/schema",
      "/interactive",
      "/functions-examples",
      "/media",
      "/seo",
      "/future",
    ],
  },
]

const SideNavCore = ({}) => {
  const pathname = usePathname()

  return (
    <div>
      {docPagesCategorized.map((category) => (
        <div key={category.categoryName}>
          <div className="py-1 text-sm font-medium">
            {category.categoryName}
          </div>
          <div className="flex flex-col gap-1">
            {category.pages.map((page) => {
              const isActive =
                page === "/" ? pathname === page : pathname === page
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
    </div>
  )
}

export function MainSideNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex flex-col gap-3", className)} {...props}>
      <SideNavCore />
    </nav>
  )
}

export const MainSideNavMobile = ({}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    setOpen(false)
  }, [pathname, searchParams])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="md:hidden" variant={"ghost"} size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav className={cn("flex flex-col gap-3")}>
          <SideNavCore />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
