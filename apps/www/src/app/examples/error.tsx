"use client"

import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/shadcn/components/ui/alert"

export default function Page({ error }: { error: Error }) {
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "An error occurred."}
      </AlertDescription>
      {/* {isTeampilotError(error) && (
        <Link href={error.response.chatroom.url} target="_blank">
          <AlertDescription className="underline">
            {error.response.chatroom.url}
          </AlertDescription>
        </Link>
      )} */}
    </Alert>
  )
}
