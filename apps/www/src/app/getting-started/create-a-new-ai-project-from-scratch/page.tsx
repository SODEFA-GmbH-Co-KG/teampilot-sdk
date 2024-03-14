import ReactMarkdown from "react-markdown"

const markdown = ``

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
