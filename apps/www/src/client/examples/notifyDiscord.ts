"use server"
import { teampilot } from "~/teampilot"

export const submit = async (data: FormData) => {
  const email = data.get("email")
  await teampilot.functions.fetch({
    message: `Notify me via discord that a new user has signed up with email: ${email}`,
    cacheTtlSeconds: 0,
  })
}
