"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn/utils"

const entries = [
  {
    name: "Overview",
    href: "/",
  },
  {
    name: "Schema",
    href: "/schema",
  },
  {
    name: "Interactive",
    href: "/interactive",
  },
  {
    name: "Functions",
    href: "/functions",
  },
  {
    name: "Media",
    href: "/media",
  },
  // {
  //   name: "Todo",
  //   href: "/todo-app",
  // },
  {
    name: "SEO",
    href: "/seo",
  },
  {
    name: "Future™️",
    href: "/future",
  },
]

export function MainTopNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "flex flex-1 flex-wrap items-center gap-4 lg:gap-6",
        className
      )}
      {...props}
    >
      {entries.map((entry) => {
        const isActive =
          entry.href === "/"
            ? pathname === entry.href
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