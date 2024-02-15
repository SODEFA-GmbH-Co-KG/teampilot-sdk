import { Send } from "lucide-react"
import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { submit } from "./notifyDiscord"

export const Form = async () => {
  return (
    <>
      <div className="mb-2 text-center font-bold">Register</div>
      <form className="flex flex-row items-center gap-1" action={submit}>
        <Input type="email" placeholder="Your Email" name="email" />
        <Button type="submit" size="sm">
          <Send />
        </Button>
      </form>
    </>
  )
}
