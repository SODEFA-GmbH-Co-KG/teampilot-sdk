import Image from "next/image"
import Link from "next/link"
import { ShowCase } from "~/client/ShowCase"
import sidebar from "../../../public/examples/sidebar.png"

export default function Page() {
  return (
    <>
      <ShowCase
        title="A New way to write APIs"
        file="/src/app/api/seed/route.ts"
        layout="side-by-side"
      >
        <div className="flex flex-col items-center gap-6">
          <iframe
            src="https://teampilot.ai/widget/chat/6c247b7dd69296454dd27e6143c2977d"
            height={620}
            width={400}
            className="max-w-[calc(100vw-4rem)]"
          />
          <Link
            href="https://teampilot.ai/chat/6c247b7dd69296454dd27e6143c2977d"
            target="_blank"
            className="truncate text-blue-500 hover:underline"
          >
            Open Chat
          </Link>
        </div>
      </ShowCase>
      <ShowCase
        title="A New way to write UI"
        file="/src/client/examples/future/Sidebar.tsx"
        layout="side-by-side"
      >
        <Image src={sidebar} alt="Sidebar" />
      </ShowCase>
    </>
  )
}
