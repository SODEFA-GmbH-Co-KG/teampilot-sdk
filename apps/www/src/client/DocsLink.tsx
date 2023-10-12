import Link from "next/link"

export const docPages = [
  {
    name: "Getting started",
    href: "/introduction",
    description: "What is Teampilot and what can you do with it?",
  },
  {
    name: "Into your Product",
    href: "/teampilot-into-your-product",
    description: "How to integrate Teampilot into your product.",
  },
  {
    name: "Launchpads",
    href: "/what-are-launchpads",
    description: "What are Launchpads and how do they work?",
  },
  {
    name: "Fetching Teampilot",
    href: "/fetching-teampilot",
    description: "What happens when you fetch Teampilot.",
  },
  {
    name: "Fetching via API",
    href: "/fetching-via-api",
    description: "How to fetch Teampilot via the API.",
  },
  {
    name: "Fetching via SDK",
    href: "/fetching-via-sdk",
    description: "How to fetch Teampilot via the SDK.",
  },
  {
    name: "SDK Examples",
    href: "/sdk-examples",
    description: "Examples of using the SDK.",
  },
] as const

export const DocsLink = ({
  destination,
}: {
  destination: (typeof docPages)[number]["href"]
}) => {
  const page = docPages.find((page) => page.href === destination)!
  return (
    <Link
      href={page.href}
      className="group block space-y-2 rounded-md border border-neutral-400 p-6 pt-5 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
    >
      <div className="truncate text-lg font-medium leading-snug text-sky-600 group-hover:text-inherit">
        {page.name}
      </div>
      <div className="line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
        {page.description}
      </div>
    </Link>
  )
}

export const DocsLinksGrid = ({
  destinations,
}: {
  destinations: (typeof docPages)[number]["href"][]
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {destinations.map((destination) => (
        <DocsLink key={destination} destination={destination} />
      ))}
    </div>
  )
}
