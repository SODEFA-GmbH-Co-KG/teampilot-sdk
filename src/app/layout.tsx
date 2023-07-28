import { type ReactNode } from "react"
import { TeampilotLogo } from "~/client/TeampilotLogo"
import { ThemeProvider } from "~/shadcn/components/theme-provider"
import "~/styles/globals.css"

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" />
        </head>
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <>
              <div className="container flex flex-col gap-8 py-8">
                <div className="flex flex-row gap-2">
                  <TeampilotLogo className="h-8 w-8" />
                  <div className="text-xl">
                    <strong>Teampilot SDK</strong>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container flex flex-col gap-8 py-8">
                {children}
              </div>
            </>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
