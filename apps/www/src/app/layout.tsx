import { Github } from "lucide-react"
import Link from "next/link"
import { type ReactNode } from "react"
import { DarkModeToggle } from "~/client/DarkModeToggle"
import { MainTopNav } from "~/client/MainTopNav"
import { SuspenseLoader } from "~/client/SuspenseLoader"
import { TeampilotLogo } from "~/client/TeampilotLogo"
import { ThemeProvider } from "~/shadcn/components/theme-provider"
import { Button } from "~/shadcn/components/ui/button"
import { cn } from "~/shadcn/utils"
import "~/styles/globals.css"

// const font = Space_Grotesk({
//   subsets: ["latin"],
// })

export const metadata = {
  title: "Teampilot SDK",
}

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased"
            // font.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <>
              <div className="container flex flex-row items-center justify-between gap-6 py-6 2xl:max-w-[2000px]">
                <Link href="/" className="flex flex-row items-center gap-3">
                  <TeampilotLogo className="h-8 w-8" />
                  <div className="text-xl">
                    <strong>Teampilot SDK</strong>
                  </div>
                </Link>
                <div className="hidden flex-1 lg:flex">
                  <MainTopNav />
                </div>
                <div className="flex flex-row">
                  <Link
                    href="https://github.com/sodefa-gmbh-co-kg/teampilot-sdk"
                    target="_blank"
                  >
                    <Button variant={"ghost"} size="icon">
                      <Github />
                    </Button>
                  </Link>
                  <DarkModeToggle />
                </div>
              </div>
              <div className="container flex pb-6 lg:hidden 2xl:max-w-[2000px]">
                <MainTopNav />
              </div>
              <hr />
              <div className="container flex flex-col gap-8 py-8 2xl:max-w-[2000px]">
                <SuspenseLoader>{children}</SuspenseLoader>
              </div>
            </>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
