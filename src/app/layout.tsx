import { type ReactNode } from "react"
import { ThemeProvider } from "~/shadcn/components/theme-provider"

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
