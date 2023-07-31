import { redirect } from "next/navigation"
import { env } from "~/env.mjs"
import { teampilot } from "~/teampilot"

// http://localhost:4500/api/seed
// --> https://teampilot.ai/team/teampilot-sdk/chat/6c247b7dd69296454dd27e6143c2977d

export async function GET() {
  if (env.NODE_ENV !== "development") {
    throw new Error("This route is only available in development mode")
  }

  const response = await teampilot.todoApp.mutate(`
Create a Table todos in the Todo App Database with the following columns:
- id
- title
- status which can be open or done or remind
- remind_at
- created_at
- updated_at

if the table already exists delete it and start over

create 10 example todos with random status and remind_at
remind_at should be a date in the future

Afterwards explain the structure of the table and how to query it briefly.
`)

  redirect(response.chatroom.url)
}
