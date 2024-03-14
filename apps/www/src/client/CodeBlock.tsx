"use client"

import { Slot } from "@radix-ui/react-slot"
import { type FC, type ReactNode } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism"
import { CopyButton } from "~/shadcn/components/copy-button"
import { cn } from "~/shadcn/utils"

interface Props {
  language: string
  value: string
  lightMode: "light" | "dark"
  copyButton?: ReactNode
  className?: string
}

// FROM: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Markdown/CodeBlock.tsx
export const CodeBlock: FC<Props> = ({
  language,
  value,
  lightMode,
  copyButton,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex min-w-[160px] max-w-[90vw] flex-col gap-2 text-base",
        className
      )}
    >
      <Slot className="absolute right-4 top-4">
        {copyButton ?? <CopyButton value={value} />}
      </Slot>
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
