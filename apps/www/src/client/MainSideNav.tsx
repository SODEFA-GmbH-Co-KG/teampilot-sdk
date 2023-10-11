"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/shadcn/utils"

const entries = [
  {
    name: "Getting started",
    href: "/introduction",
  },
  {
    name: "Into your Product",
    href: "/teampilot-into-your-product",
  },
  {
    name: "Launchpads",
    href: "/what-are-launchpads",
  },
  {
    name: "Fetching Teampilot",
    href: "/fetching-teampilot",
  },
  {
    name: "Fetching via API",
    href: "/fetching-via-api",
  },
  {
    name: "Fetching via SDK",
    href: "/fetching-via-sdk",
  },
  {
    name: "SDK Examples",
    href: "/sdk-examples",
  },
]

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
