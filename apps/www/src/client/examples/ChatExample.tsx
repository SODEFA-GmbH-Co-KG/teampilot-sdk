import { teampilot } from "~/teampilot"

export const ChatExample = async () => {
  const firstAnswer = await teampilot.default.fetch({
    message: "Who landed on the moon first?",
    accessLevel: "LINK_WRITE",
  })
  const secondAnswer = await teampilot.default.fetch({
    message: "How old was the person when he did?",
    chatroomId: firstAnswer.chatroom.id,
  })
  return (
    <>
      <ol className="list-decimal">
        <li>{firstAnswer.message.content}</li>
        <li>{secondAnswer.message.content}</li>
      </ol>
    </>
  )
}
