import { type ReactNode } from "react"
import { ThemeProvider } from "~/shadcn/components/theme-provider"
import "~/styles/globals.css"

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
