"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "~/shadcn/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/shadcn/components/ui/sheet"
import { cn } from "~/shadcn/utils"
import { TOPICS } from "~/utils/navTopics"
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
  const params = useParams()
  const classicPathname = usePathname()

  const [pathname, setPathname] = useState<string>()

  useEffect(() => {
    const href = window.location.href
    const containsHash = href.includes("#")
    const pathnameWithHash = containsHash
      ? `/${window.location.href.split("/").slice(-1)[0]}`
      : classicPathname ?? "/"
    setPathname(pathnameWithHash)
  }, [classicPathname, params])

  return (
    <div>
      {TOPICS.map((topic) => {
        const firstLevelSlug = topic.slug
        const isActive = pathname === firstLevelSlug
        return (
          <div key={topic.title}>
            <Link
              shallow
              className={cn(
                "py-1 text-base font-semibold hover:text-primary",
                isActive && "text-primary"
              )}
              href={topic.slug}
            >
              {topic.title}
            </Link>
            <div className="flex flex-col gap-1">
              {topic.subTopics.map((topic) => {
                const { slug, title } = topic
                const secondLevelSlug = `${firstLevelSlug}${slug}`
                const isActive = pathname === secondLevelSlug
                return (
                  <div key={secondLevelSlug}>
                    <Link
                      shallow
                      href={secondLevelSlug}
                      className={cn(
                        "py-1 pl-2 block text-sm text-muted-foreground transition-colors hover:text-primary",
                        isActive && "text-primary"
                      )}
                    >
                      {title}
                    </Link>
                    <div>
                      {topic.subTopics?.map((topic) => {
                        const { slug, title } = topic
                        const thirdLevelSlug = `${secondLevelSlug}${slug}`
                        const isActive = pathname === thirdLevelSlug
                        return (
                          <div key={thirdLevelSlug}>
                            <Link
                              shallow
                              href={thirdLevelSlug}
                              className={cn(
                                "py-1 pl-4 text-xs block text-muted-foreground transition-colors hover:text-primary",
                                isActive && "text-primary"
                              )}
                            >
                              {title}
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
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
