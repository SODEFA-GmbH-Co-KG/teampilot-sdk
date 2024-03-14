import ReactMarkdown from "~/client/CustomReactMarkdown"
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
            <div className="nono">
              <code className={className}>{children}</code>
            </div>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
