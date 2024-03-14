import { ReactMarkdownWithCode } from "~/client/ReactMarkdownWithCode"

const markdown = ``

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdownWithCode>{markdown}</ReactMarkdownWithCode>
    </div>
  )
}
