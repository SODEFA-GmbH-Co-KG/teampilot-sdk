"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
import { Button } from "~/shadcn/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/shadcn/components/ui/sheet"
import { cn } from "~/shadcn/utils"
import { TOPICS, type TopicsArray } from "~/utils/navTopics"
import useHash from "~/utils/useHash"
import { useNavigationContext } from "./NavigationContext"

const SideNavCore = ({}) => {
  const classicPathname = usePathname()
  const params = useSearchParams()

  const { selectedTopic, setSelectedTopic } = useNavigationContext()
  const hash = useHash()

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (hash) {
        const targetElement = document.getElementById(hash)

        if (targetElement) {
          const targetOffsetTop = targetElement.offsetTop
          window.scrollTo({ top: targetOffsetTop - 89, behavior: "smooth" })
        }
      }
    }

    handleScroll()
  }, [hash])

  useEffect(() => {
    const href = window.location.href
    const containsHash = href.includes("#")
    const pathnameWithHash = containsHash
      ? `/${window.location.href.split("/").slice(-1)[0]}`
      : classicPathname ?? "/"
    setSelectedTopic(pathnameWithHash)
  }, [classicPathname, params, setSelectedTopic])

  return (
    <div>
      {/* TODO: Fix typing */}
      {(TOPICS as unknown as TopicsArray).map((topic) => {
        const firstLevelSlug = topic.slug
        const isActive = selectedTopic === firstLevelSlug
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
                const isActive = selectedTopic === secondLevelSlug
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
                        const isActive = selectedTopic === thirdLevelSlug
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
