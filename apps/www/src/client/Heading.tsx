import { Link2 } from "lucide-react"
import Link from "next/link"
import slugify from "slugify"

export const Heading = ({ children }: { children: string }) => {
  const slug = slugify(children, { lower: true, strict: true })
  return (
    <>
      <Link href={`#${slug}`}>
        <h1
          id={slug}
          className="group scroll-m-20 text-4xl font-bold tracking-tight hover:underline"
        >
          {children}
          <Link2 className="ml-2 hidden group-hover:inline-block" />
        </h1>
      </Link>
    </>
  )
}
