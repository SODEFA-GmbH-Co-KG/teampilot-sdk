import { Analytics } from "@vercel/analytics/react"
import { Github } from "lucide-react"
import { Roboto, Space_Grotesk } from "next/font/google"
import Link from "next/link"
import Script from "next/script"
import { type ReactNode } from "react"
import { DarkModeToggle } from "~/client/DarkModeToggle"
import { MainSideNav, MainSideNavMobile } from "~/client/MainSideNav"
import { MainTopNav } from "~/client/MainTopNav"
import { NavigationContextProvider } from "~/client/NavigationContext"
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

const spaceGrotesk = Space_Grotesk({
  display: "swap",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--space-grotesk",
})
const roboto = Roboto({
  display: "swap",
  weight: ["900", "400", "500", "300"],
  subsets: ["latin"],
  variable: "--roboto",
})

export default function RootLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" />
          <Script
            defer
            src="https://umami-sodefa.vercel.app/pathfinder"
            data-website-id="5b212f09-3561-46a5-9922-bb474ee1bc20"
            data-domains="docs.teampilot.ai"
          />
        </head>
        <body
          className={cn(
            "min-h-[100dvh] bg-background antialiased font-roboto",
            spaceGrotesk.variable,
            roboto.variable
            // font.className
          )}
        >
          <Script
            defer
            src="https://teampilot.ai/widget.js"
            data-launchpad-slug-id="teampilot-docs-20ee457cee3b099cca3b762da5ca7105"
          />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavigationContextProvider>
              <>
                <div className="sticky top-0 w-full z-10">
                  <div className="container flex flex-row items-center justify-between gap-6 py-6 bg-background w-full mx-auto">
                    <Link href="/" className="flex flex-row items-center gap-3">
                      <TeampilotLogo className="h-8 w-8" />
                      <div className="text-xl">
                        <strong className="font-spaceGrotesk">
                          Teampilot <span className="text-primary">Docs</span>
                        </strong>
                      </div>
                    </Link>
                    <div className="hidden flex-1 xl:flex">
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
                      <MainSideNavMobile />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="container mx-auto flex flex-row justify-center">
                  <div className="border-r max-md:hidden">
                    <div className="w-48 top-[89px] sticky max-h-[calc(100dvh-89px)] py-8 pr-6 overflow-y-auto scrollbar-hide">
                      <MainSideNav />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col flex-wrap gap-8 py-8 md:pl-6 lg:max-w-screen-lg">
                    <SuspenseLoader>{children}</SuspenseLoader>
                  </div>
                </div>
              </>
            </NavigationContextProvider>
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
