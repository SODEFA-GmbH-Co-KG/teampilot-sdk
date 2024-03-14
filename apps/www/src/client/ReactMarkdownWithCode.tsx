import ReactMarkdown from "react-markdown"
import { CodeBlock } from "./CodeBlock"

export const ReactMarkdownWithCode = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      components={{
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
            <code className={className}>{children}</code>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
