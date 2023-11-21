import Image from "next/image"
import Link from "next/link"
import { DocsLinksGrid } from "~/client/DocsLink"
import { ShowCase } from "~/client/ShowCase"
import details from "../../../public/examples/seo-details.png"
import overview from "../../../public/examples/seo-overview.png"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Overview Page"
        file="/src/app/cities/page.tsx"
        layout="side-by-side"
      >
        <Link href="/cities">
          <Image src={overview} alt="Sidebar" />
        </Link>
      </ShowCase>
      <ShowCase
        title="Details Page"
        file="/src/app/cities/[slug]/page.tsx"
        layout="side-by-side"
      >
        <Link href="/cities/berlin">
          <Image src={details} alt="Sidebar" />
        </Link>
      </ShowCase>

      <DocsLinksGrid destinations={["/future", "/"]} />
    </>
  )
}
