import ReactMarkdown from "~/client/CustomReactMarkdown"

const markdown = ``

export default function Page() {
  return (
    <div className="prose max-w-[inherit] dark:prose-invert">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
