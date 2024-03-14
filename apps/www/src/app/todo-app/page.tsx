import { TodoApp } from "~/client/examples/TodoApp/TodoApp"
import { ShowCase } from "~/client/ShowCase"

export default function Page() {
  return (
    <>
      <ShowCase
        title="Todo App"
        code={`
export const TodoApp = () => {
  // const abc = use(
  //   teampilot.todoApp.fetchData({
  //     message: "Get all todos",
  //     schema: z.array(
  //       z.object({
  //         id: z.string(),
  //         text: z.string(),
  //         status: z.enum(["completed", "todo", "rescheduled"]),
  //       })
  //     ),
  //   })
  // )

  // const seed = async () => {
  //   "use server"
  //   console.log("seed")
  //   await teampilot.todoApp.mutate(
  //     \`Create 10 Example Todos. With random title and status\`
  //   )
  //   console.log("seed done")
  // }

  return (
    <>
      {/* <form action={seed}>
        <Button type="submit">Seed</Button>
      </form> */}
    </>
  )
}
        `}
      >
        <TodoApp />
      </ShowCase>
    </>
  )
}
