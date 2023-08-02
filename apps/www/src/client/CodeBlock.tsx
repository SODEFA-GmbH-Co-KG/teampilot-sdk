"use client"

import { type FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism"
import { CopyButton } from "~/shadcn/components/copy-button"

interface Props {
  language: string
  value: string
  lightMode: "light" | "dark"
}

// FROM: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx
export const CodeBlock: FC<Props> = ({ language, value, lightMode }) => {
  return (
    <div className="relative flex min-w-[160px] flex-col gap-2 text-base">
      <CopyButton value={value} className="absolute right-4 top-4" />
      <div className="-mx-2 -mb-1">
        <SyntaxHighlighter
          language={language}
          style={lightMode === "light" ? oneLight : oneDark}
          wrapLongLines
          customStyle={{
            margin: 0,
            // background:
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
