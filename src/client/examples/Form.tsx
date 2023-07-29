import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { teampilot } from "~/teampilot"

export const Form = () => {
  const submit = async (data: any) => {
    "use server"
    const email = data.get("email") as string
    await teampilot.functions.fetch({
      message: `Notify me via discord that a new user has signed up with email: ${email}`,
    })
  }
  return (
    <>
      <form className="flex flex-col items-center gap-2" action={submit}>
        <Input type="text" placeholder="Your Email" name="email" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}
