import Link from "next/link"

export const docPages = [
  {
    name: "Getting started",
    href: "/",
    description: "What is Teampilot and what can you do with it?",
  },
  {
    name: "Your Product into Teampilot",
    href: "/your-product-into-teampilot",
    description: "How to integrate your product into Teampilot.",
  },
  {
    name: "Teampilot into your Product",
    href: "/teampilot-into-your-product",
    description: "How to integrate Teampilot into your product.",
  },
  {
    name: "Launchpads",
    href: "/what-are-launchpads",
    description: "What are Launchpads and how do they work?",
  },
  {
    name: "Functions",
    href: "/functions",
    description: "What are Functions and what do they do?",
  },
  {
    name: "Fetching Teampilot",
    href: "/fetching-teampilot",
    description: "What happens when you fetch Teampilot.",
  },
  {
    name: "Caching",
    href: "/caching",
    description:
      "Teampilot has build in caching to speed up your duplicated requests and reduce your costs.",
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
    name: "Custom Functions",
    href: "/custom-functions",
    description: "Give Teampilot access to your data and functions.",
  },
  {
    name: "SDK Examples",
    href: "/sdk-examples",
    description: "Examples of using the SDK.",
  },
  {
    name: "Schema",
    href: "/schema",
    description: "Examples of using Schemas with the SDK.",
  },
  {
    name: "Interactive",
    href: "/interactive",
    description: "Interactive examples with the SDK.",
  },
  {
    name: "Functions",
    href: "/functions-examples",
    description: "Examples of using Functions with the SDK.",
  },
  {
    name: "Media",
    href: "/media",
    description: "Media Examples using the SDK.",
  },
  {
    name: "SEO",
    href: "/seo",
    description: "SEO Examples using the SDK.",
  },
  {
    name: "Future™️",
    href: "/future",
    description: "Examples of what the future could be.",
  },
] as const

export const getPageByHref = (href: (typeof docPages)[number]["href"]) =>
  docPages.find((page) => page.href === href)

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
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
      {destinations.map((destination) => (
        <DocsLink key={destination} destination={destination} />
      ))}
    </div>
  )
}
