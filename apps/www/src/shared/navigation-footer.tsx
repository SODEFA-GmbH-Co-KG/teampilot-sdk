import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationFooterProps {
  prevHref?: string
  prevLabel?: string
  nextHref?: string
  nextLabel?: string
}

export function NavigationFooter({ prevHref, prevLabel, nextHref, nextLabel }: NavigationFooterProps) {
  return (
    <>
      <hr className="w-full"/>
      <footer className="flex items-center justify-between px-4 py-2">
        {prevHref ? (
          <Link href={prevHref} className="group no-underline">
            <div className="flex items-center gap-1">
                <ChevronLeft className="size-6 text-gray-400 group-hover:text-white" />
              <div className="flex flex-col text-gray-400 group-hover:text-white">
                <span className="text-sm">Previous</span>
                <span className="text-white"> {prevLabel}</span>
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextHref ? (
          <Link href={nextHref} className="group no-underline">
            <div className="flex items-center gap-1">
              <div className="flex flex-col text-gray-400 group-hover:text-white">
                <span className="text-sm">Next</span>
                <span className="text-white">{nextLabel}</span>
              </div>
                <ChevronRight className="size-6 text-gray-400 group-hover:text-white" />
            </div>
          </Link>
        ) : (
          <div />
        )}
      </footer>
    </>
  )
}

