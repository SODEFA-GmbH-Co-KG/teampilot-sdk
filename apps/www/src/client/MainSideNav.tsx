"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn/utils"
import { docPages } from "./DocsLink"

export function MainSideNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "sticky top-8 flex min-w-[120px] flex-col gap-4",
        className
      )}
      {...props}
    >
      {docPages.map((entry) => {
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
      })}
    </nav>
  )
}
