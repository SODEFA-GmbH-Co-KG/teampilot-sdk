import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Badge } from "~/shadcn/components/ui/badge"
import { getAllSubTopicsForCardsBySlug } from "~/utils/navTopics"

const markdown = `
# Getting Started

Depending on your use case, there are different ways to leverage AI for your product. For some use cases, you can use our no-code solutions, for others you need to use our SDK.
Depending on what you want to achieve, choose your path below. If you are missing a use case, please let us know in our [Discord Channel](https://discord.gg/Zj6atnMEMa).
`

const slug = "/getting-started"
const gettingStartedSubPages = getAllSubTopicsForCardsBySlug(slug)

export default function Page() {
  return (
    <div className="prose dark:prose-invert max-w-[inherit]">
      <ReactMarkdown className="w-full">{markdown}</ReactMarkdown>

      <div className="grid grid-cols-2 gap-4">
        {gettingStartedSubPages.map((subPage) => (
          <Link
            className="group relative min-h-[210px] block rounded-md border border-neutral-400 p-4 pt-3 no-underline shadow-md shadow-black/5 transition-shadow duration-300 hover:shadow-lg dark:border-neutral-700"
            key={subPage.title}
            href={`${slug}/${subPage.slug}`}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex flex-col gap-2">
                <div className="text-2xl">{subPage.icon}</div>
                <div className="">
                  <span className="text-lg font-semibold">{subPage.title}</span>
                  <div className="absolute flex gap-2 top-4 right-4">
                    {subPage.badges.map((badge) => (
                      <Badge key={badge} color="">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-base text-neutral-500 dark:text-neutral-400">
                {subPage.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
