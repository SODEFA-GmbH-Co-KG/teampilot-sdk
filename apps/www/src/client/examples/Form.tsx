import { Send } from "lucide-react"
import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { teampilot } from "~/teampilot"

export const Form = async () => {
  const submit = async (data: FormData) => {
    "use server"
    const email = data.get("email")
    await teampilot.functions.fetch({
      message: `Notify me via discord that a new user has signed up with email: ${email}`,
      cacheTtlSeconds: 0,
    })
  }
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
