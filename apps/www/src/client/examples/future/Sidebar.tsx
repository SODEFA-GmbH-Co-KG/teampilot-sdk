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
        <Button key={chat.id} action={`Navigate to chatroom ${id}`}>
          <img src={chat.authorImageUrl} />
          <strong>{chat.name}</strong>
          <p>{chat.lastMessage}</p>
        </Button>
      ))}
    </>
  )
}
