import Image from "next/image"
import Link from "next/link"
import { DocsLinksGrid } from "~/client/DocsLink"
import { ShowCase } from "~/client/ShowCase"
import sidebar from "../../../public/examples/sidebar.png"

export const Future = async () => {
  return (
    <>
      <ShowCase
        title="A New way to write APIs"
        code={`
import { redirect } from "next/navigation"
import { env } from "~/env.mjs"
import { teampilot } from "~/teampilot"

export const dynamic = "force-dynamic"

// http://localhost:4500/api/seed
// --> https://teampilot.ai/team/teampilot-sdk/chat/6c247b7dd69296454dd27e6143c2977d

export async function GET() {
  if (env.NODE_ENV !== "development") {
    throw new Error("This route is only available in development mode")
  }

  const response = await teampilot.todoApp.mutate(\`
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
\`)

  redirect(response.chatroom.url)
}
`}
        layout="side-by-side"
      >
        <div className="flex flex-col items-center gap-6">
          <iframe
            src="https://teampilot.ai/widget/chat/6c247b7dd69296454dd27e6143c2977d"
            height={620}
            width={400}
            className="max-w-[calc(100vw-4rem)]"
          />
          <Link
            href="https://teampilot.ai/chat/6c247b7dd69296454dd27e6143c2977d"
            target="_blank"
            className="truncate text-blue-500 hover:underline"
          >
            Open Chat
          </Link>
        </div>
      </ShowCase>
      <ShowCase
        title="A New way to write UI"
        code={`
/* eslint-disable */
// @ts-nocheck

import { Button, Tab, Tabs } from "@teampilot/components"
import { teampilot } from "@teampilot/sdk"
import { use, useState } from "react"
import { z } from "zod"

export const Sidebar = () => {
  const [query, setQuery] = useState(
    "All Chatrooms from the last 12 hours that are not archived"
  )

  const chats = use(
    teampilot.fetchData({
      message: query,
      schema: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          lastMessage: z.string(),
          authorImageUrl: z.string(),
        })
      ),
    })
  )

  return (
    <>
      <Tabs value={query} onValueChange={setQuery}>
        <Tab value="All Chatrooms from the last 12 hours that are not archived">
          Recent
        </Tab>
        <Tab value="All Chatrooms created by the User">Mine</Tab>
        <Tab value="All Chatrooms">All-Time</Tab>
      </Tabs>

      <Button action="Create new Chatroom and navigate to it">+ New</Button>

      {chats.map((chat) => (
        <Button key={chat.id} action={\`Navigate to chatroom $\{id\}\`}>
          <img src={chat.authorImageUrl} />
          <strong>{chat.name}</strong>
          <p>{chat.lastMessage}</p>
        </Button>
      ))}
    </>
  )
}
`}
        layout="side-by-side"
      >
        <Image src={sidebar} alt="Sidebar" />
      </ShowCase>

      <DocsLinksGrid destinations={["/"]} />
    </>
  )
}
