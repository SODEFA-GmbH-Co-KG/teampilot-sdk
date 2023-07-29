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
    name: "Persons",
    href: "/persons",
  },
  {
    name: "Interactive",
    href: "/interactive",
  },
]

export function MainTopNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
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
