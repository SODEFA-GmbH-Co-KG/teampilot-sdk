import { Loader2 } from "lucide-react"
import { Suspense, type ReactNode } from "react"

export const SuspenseLoader = ({ children }: { children?: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
