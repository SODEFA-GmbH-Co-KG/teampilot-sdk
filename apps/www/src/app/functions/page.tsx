import { Form } from "~/client/examples/Form"
import { Time } from "~/client/examples/Time"
import { ShowCase } from "~/client/ShowCase"

export const revalidate = "force-cache"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Time"
        file="/src/client/examples/Time.tsx"
        layout="side-by-side"
      >
        <Time />
      </ShowCase>
      <ShowCase
        title="Form"
        code={`import { Send } from "lucide-react"
import { Button } from "~/shadcn/components/ui/button"
import { Input } from "~/shadcn/components/ui/input"
import { teampilot } from "~/teampilot"

export const Form = () => {
  const submit = async (data: FormData) => {
    "use server"
    const email = data.get("email")
    await teampilot.functions.fetch({
      message: \`Notify me via discord that a new user has signed up with email: \${email}\`,
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
`}
        layout="side-by-side"
      >
        <Form />
      </ShowCase>
    </>
  )
}
