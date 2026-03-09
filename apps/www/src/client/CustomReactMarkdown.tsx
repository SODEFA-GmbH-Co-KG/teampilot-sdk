import RawReactMarkdown from "react-markdown"
import { CodeBlock } from "./CodeBlock"

export default function ReactMarkdown(
  props: Parameters<typeof RawReactMarkdown>[0]
) {
  return (
    <RawReactMarkdown
      {...props}
      components={{
        img: ({ src, alt, title }) => {
          return (
            <img
              alt={alt}
              src={src}
              title={title}
              style={{ maxWidth: "100%" }}
            />
          )
        },
        table: ({ children }) => (
          <table className="table-fixed">{children}</table>
        ),
        td: ({ children }) => (
          <td className="" style={{ wordWrap: "break-word" }}>
            {children}
          </td>
        ),
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")
          return match && match[1] ? (
            <CodeBlock
              // key={Math.random()}
              language={match[1]}
              value={String(children).replace(/\n$/, "")}
              lightMode={"dark"}
              {...props}
            />
          ) : (
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-700 before:content-none after:content-none">{children}</code>
          )
        },
        ...props.components,
      }}
    />
  )
}
